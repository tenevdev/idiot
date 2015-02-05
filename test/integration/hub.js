var request = require('supertest'),
    testUtils = require('../helpers/utils'),
    async = require('async'),
    testCase = {}

describe('hub.js', function() {
    var user, project, hub, dataPoint, baseRoute
    before('create a user and a project', function(done) {
        request = request(require('../../server').app)
        async.waterfall([

            function(next) {
                // Create a user
                testUtils.createUser(next)
            },
            function(createdUser, accessToken, next) {
                user = createdUser
                user.accessToken = accessToken

                // Create a project
                testUtils.createProject(user.id, next)
            }
        ], function(err, createdProject) {
            expect(err).to.not.exist()
            project = createdProject

            // Set base baseRoute for requests
            baseRoute = testUtils.buildRoute('api', user.username, project.name, 'hubs')
            done()
        })
    })
    beforeEach('create a hub and a data point', function(done) {
        async.waterfall([

            function(next) {
                // Create a hub
                testUtils.createHub(project.id, user.id, next)
            },
            function(createdHub, next) {
                hub = createdHub

                // Create a data point
                testUtils.createDataPoint(hub, next)
            }
        ], function(err, createdDataPoint) {
            expect(err).to.not.exist()
            dataPoint = createdDataPoint

            done()
        })
    })
    afterEach('remove all hubs', function(done) {
        testUtils.clear('Hub', done)
    })
    after('remove all users and projects', function(done) {
        testUtils.clear(['User', 'Project'], done)
    })
    describe('when not authorized', function() {
        describe('when creating a hub', function() {
            beforeEach('send create request', function(done) {
                request.post(baseRoute)
                    .expect(401)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should not be authorized', function() {
                expect(testCase.response.unauthorized)
            })
        })
        describe('when updating a hub', function() {
            beforeEach('send update request', function(done) {
                request.put(baseRoute + '/' + hub.id)
                    .expect(401)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should not be authorized', function() {
                expect(testCase.response.unauthorized)
            })
        })
        describe('when deleting a hub', function() {
            beforeEach('send delete request', function(done) {
                request.delete(baseRoute + '/' + hub.id)
                    .expect(401)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should not be authorized', function() {
                expect(testCase.response.unauthorized)
            })
        })
    })
    describe('when public', function() {
        describe('when listing hubs by project', function() {
            beforeEach('send read request', function(done) {
                request.get(baseRoute)
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should return an array', function() {
                expect(testCase.result).to.be.an('array')
            })
        })
        describe('when listing data points', function() {
            beforeEach('send read request', function(done) {
                request.get(testUtils.attachToRoute(baseRoute, hub.id, 'datapoints'))
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should return an array', function() {
                expect(testCase.result).to.be.an('array')
            })
            it.skip('should contain data point', function() {})
        })
        describe('when getting a single hub', function() {
            beforeEach('send read request', function(done) {
                request.get(baseRoute + hub.id)
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should have a name', function() {
                expect(testCase.result).to.have.property('name')
            })
            it('should have a populated owner', function() {
                expect(testCase.result)
                    .to.have.property('owner')
                    .that.is.an('object')
            })
        })
    })
    describe('when authorized', function() {
        describe('when creating a new hub', function() {
            beforeEach('send create request', function(done) {
                // Create a new hub
                request.post(baseRoute)
                    .set('Authorization', user.accessToken)
                    .send(testUtils.hubData('hub-creation'))
                    .expect(201)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should create a new hub', function() {
                expect(testCase.result.name).to.be.ok()
                expect(testCase.result.state).to.be.ok()
                expect(testCase.result._id).to.be.ok()
            })
            it('should have owner', function() {
                expect(testCase.result.owner)
                    .to.equal(user.id)
            })
        })
        describe('when creating a new data point', function() {
            beforeEach('send create request', function(done) {
                request.post(testUtils.attachToRoute(baseRoute, hub.id, 'datapoints'))
                    .set('Authorization', user.accessToken)
                    .expect(201)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should create a new data point', function() {
                expect(testCase.result).to.have.property('timeStamp')
            })
        })
        describe('when updating an existing hub', function() {
            beforeEach('send update request', function(done) {
                request.put(baseRoute + hub.id)
                    .set('Authorization', user.accessToken)
                    .send({
                        name: 'updated-test-hub'
                    })
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))

            })
            it('should update the hub', function() {
                expect(testCase.result.name).to.equal('updated-test-hub')
            })
        })
        describe('when deleting an exisiting hub', function() {
            beforeEach('send delete request', function(done) {
                request.delete(baseRoute + hub.id)
                    .set('Authorization', user.accessToken)
                    .expect(204)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should delete the hub', function(done) {
                request.get(baseRoute + hub.id)
                    .expect(404, done)
            })
            it('should detach hub from project', function() {

            })
        })
    })
})