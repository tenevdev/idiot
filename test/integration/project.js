var request = require('supertest'),
    testUtils = require('../helpers/utils'),
    async = require('async'),
    testCase = {}

describe('project.js', function() {
    var user, project, baseRoute
    before('create a user', function(done) {
        request = request(require('../../server').app)
        // Create a user
        testUtils.createUser(function(err, createdUser, accessToken) {
            expect(err).to.not.exist()

            user = createdUser
            user.accessToken = accessToken

            baseRoute = testUtils.buildRoute('api', user.username, 'projects')
            done()
        })
    })
    beforeEach('create a project', function(done) {
        testUtils.createProject(user.id, function(err, createdProject) {
            expect(err).to.not.exist()

            project = createdProject
            done()
        })
    })
    afterEach('remove all projects', function(done) {
        testUtils.clear('Project', done)
    })
    after('remove all users', function(done) {
        testUtils.clear('User', done)
    })
    describe('when not authorized', function() {
        describe('when creating a project', function() {
            beforeEach('send create request', function(done) {
                request.post(baseRoute)
                    .expect(401)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should not be authorized', function() {
                expect(testCase.response.unauthorized)
            })
        })
        describe('when updating a project', function() {
            beforeEach('send update request', function(done) {
                request.put(baseRoute + project.name)
                    .expect(401)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should not be authorized', function() {
                expect(testCase.response.unauthorized)
            })
        })
        describe('when deleting a project', function() {
            beforeEach('send delete request', function(done) {
                request.delete(baseRoute + project.name)
                    .expect(401)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should not be authorized', function() {
                expect(testCase.response.unauthorized)
            })
        })
    })
    describe('when public', function() {
        describe('when listing projects', function() {
            beforeEach('send read request', function(done) {
                request.get('/api/projects')
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should return an array', function() {
                expect(testCase.result).to.be.an('array')
            })
        })
        describe('when listing projects by user', function() {
            beforeEach('send read request', function(done) {
                request.get(baseRoute)
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should return an array', function() {
                expect(testCase.result).to.be.an('array')
            })
            it.skip('should contain project', function() {})
        })
        describe('when getting a single project', function() {
            beforeEach('send read request', function(done) {
                request.get(baseRoute + project.name)
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
        describe('when creating a new project', function() {
            beforeEach('send create request', function(done) {
                request.post(baseRoute)
                    .set('Authorization', user.accessToken)
                    .send(testUtils.projectData('project-creation'))
                    .expect(201)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should create a new project', function() {
                expect(testCase.result.name).to.be.ok()
                expect(testCase.result._id).to.be.ok()
            })
            it('should have owner', function() {
                expect(testCase.result.owner)
                    .to.equal(user.id)
            })
            describe('and a duplicate name exists', function() {
                beforeEach('send create request with the same name', function(done) {
                    request.post(baseRoute)
                        .set('Authorization', user.accessToken)
                        .send(testUtils.hubData('project-creation'))
                        .expect(400)
                        .end(testUtils.getCallback(testCase, done))
                })
                it('should be a bad request', function() {
                    expect(testCase.response.badRequest)
                })
            })
        })
        describe('when updating an existing project', function() {
            beforeEach('send update request', function(done) {
                request.put(baseRoute + project.name)
                    .set('Authorization', user.accessToken)
                    .send({
                        name: 'updated-test-project'
                    })
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))

            })
            it('should update the project', function() {
                expect(testCase.result.name).to.equal('updated-test-project')
            })
        })
        describe('when deleting an exisiting project', function() {
            beforeEach('send delete request', function(done) {
                request.delete(baseRoute + project.name)
                    .set('Authorization', user.accessToken)
                    .expect(204)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should delete the project', function(done) {
                request.get(baseRoute + project.name)
                    .expect(404, done)
            })
        })
    })
})