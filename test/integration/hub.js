var request = require('supertest'),
    testUtils = require('../helpers/utils'),
    async = require('async'),
    test = {}

describe('hub.js', function() {
    var user, project, hub, dataPoint, url
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
            expect(err).to.not.exist
            project = createdProject

            // Set base url for requests
            url = '/api/projects/' + user.username + '/' + project.name + '/hubs'
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
            expect(err).to.not.exist
            dataPoint = createdDataPoint

            // Set base url for requests
            url = '/api/projects/' + user.username + '/' + project.name + '/hubs'
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
                request.post(url)
                    .expect(401)
                    .end(testUtils.getCallback(test, done))
            })
            it('should not be authorized', function() {
                expect(test.response.unauthorized)
            })
        })
        describe('when updating a hub', function() {
            beforeEach('send update request', function(done) {
                request.put(url + '/' + hub.id)
                    .expect(401)
                    .end(testUtils.getCallback(test, done))
            })
            it('should not be authorized', function() {
                expect(test.response.unauthorized)
            })
        })
        describe('when deleting a hub', function() {
            beforeEach('send delete request', function(done) {
                request.delete(url + '/' + hub.id)
                    .expect(401)
                    .end(testUtils.getCallback(test, done))
            })
            it('should not be authorized', function() {
                expect(test.response.unauthorized)
            })
        })
    })
    describe('when public', function() {
        describe('when listing hubs by project', function() {
            beforeEach('send read request', function(done) {
                request.get(url)
                    .expect(200)
                    .end(testUtils.getCallback(test, done))
            })
            it('should return an array', function() {
                expect(test.result).to.be.an('array')
            })
        })
        describe('when listing data points', function() {
            beforeEach('send read request', function(done) {
                request.get(url + '/' + hub.id + '/datapoints')
                    .expect(200)
                    .end(testUtils.getCallback(test, done))
            })
            it('should return an array', function() {
                expect(test.result).to.be.an('array')
            })
            it.skip('should contain data point', function() {})
        })
        describe('when getting a single hub', function() {
            beforeEach('send read request', function(done) {
                request.get(url + '/' + hub.id)
                    .expect(200)
                    .end(testUtils.getCallback(test, done))
            })
            it('should have a name', function() {
                expect(test.result).to.have.property('name')
            })
            it('should have a populated owner', function() {
                expect(test.result)
                    .to.have.property('owner')
                    .that.is.an('object')
            })
        })
    })
    describe('when authorized', function() {
        describe('when creating a new hub', function() {
            beforeEach('send create request', function(done) {
                // Create a new hub
                request.post(url)
                    .set('Authorization', user.accessToken)
                    .send(testUtils.hubData('hub-creation'))
                    .expect(201)
                    .end(testUtils.getCallback(test, done))
            })
            it('should create a new hub', function() {
                expect(test.result.name).to.be.ok
                expect(test.result.state).to.be.ok
                expect(test.result._id).to.be.ok
            })
            it('should have owner', function() {
                expect(test.result.owner)
                    .to.equal(user.id)
            })
        })
        describe('when creating a new data point', function() {
            beforeEach('send create request', function(done) {
                request.post(url + '/' + hub.id + '/datapoints')
                    .set('Authorization', user.accessToken)
                    .expect(201)
                    .end(testUtils.getCallback(test, done))
            })
            it('should create a new data point', function() {
                expect(test.result).to.have.property('timeStamp')
            })
        })
        describe('when updating an existing hub', function() {
            beforeEach('send update request', function(done) {
                request.put(url + '/' + hub.id)
                    .set('Authorization', user.accessToken)
                    .send({
                        name: 'updated-test-hub'
                    })
                    .expect(200)
                    .end(testUtils.getCallback(test, done))

            })
            it('should update the hub', function() {
                expect(test.result.name).to.equal('updated-test-hub')
            })
        })
        describe('when deleting an exisiting hub', function() {
            beforeEach('send delete request', function(done) {
                request.delete(url + '/' + hub.id)
                    .set('Authorization', user.accessToken)
                    .expect(204)
                    .end(testUtils.getCallback(test, done))
            })
            it('should delete the hub', function(done) {
                request.get(url + '/' + hub.id)
                    .expect(404, done)
            })
            it('should detach hub from project', function() {

            })
        })
    })
})