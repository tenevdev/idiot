var request = require('supertest'),
    testUtils = require('../helpers/utils'),
    async = require('async'),
    test = {}

describe('project.js', function() {
    var user, project, url
    before('create a user', function(done) {
        request = request(require('../../server').app)
        // Create a user
        testUtils.createUser(function(err, createdUser, accessToken) {
            expect(err).to.not.exist

            user = createdUser
            user.accessToken = accessToken

            url = '/api/projects'
            done()
        })
    })
    beforeEach('create a project', function(done) {
        testUtils.createProject(user.id, function(err, createdProject) {
            expect(err).to.not.exist

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
                request.post(testUtils.buildUrl(url, user.username))
                    .expect(401)
                    .end(testUtils.getCallback(test, done))
            })
            it('should not be authorized', function() {
                expect(test.response.unauthorized)
            })
        })
        describe('when updating a project', function() {
            beforeEach('send update request', function(done) {
                request.put(testUtils.buildUrl(url, user.username, project.id))
                    .expect(401)
                    .end(testUtils.getCallback(test, done))
            })
            it('should not be authorized', function() {
                expect(test.response.unauthorized)
            })
        })
        describe('when deleting a project', function() {
            beforeEach('send delete request', function(done) {
                request.delete(testUtils.buildUrl(url, user.username, project.id))
                    .expect(401)
                    .end(testUtils.getCallback(test, done))
            })
            it('should not be authorized', function() {
                expect(test.response.unauthorized)
            })
        })
    })
    describe('when public', function() {
        describe('when listing projects', function() {
            beforeEach('send read request', function(done) {
                request.get(url)
                    .expect(200)
                    .end(testUtils.getCallback(test, done))
            })
            it('should return an array', function() {
                expect(test.result).to.be.an('array')
            })
        })
        describe('when listing projects by user', function() {
            beforeEach('send read request', function(done) {
                request.get(testUtils.buildUrl(url, user.username))
                    .expect(200)
                    .end(testUtils.getCallback(test, done))
            })
            it('should return an array', function() {
                expect(test.result).to.be.an('array')
            })
            it.skip('should contain project', function() {})
        })
        describe('when getting a single project', function() {
            beforeEach('send read request', function(done) {
                request.get(testUtils.buildUrl(url, user.username, project.name))
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
        describe('when creating a new project', function() {
            beforeEach('send create request', function(done) {
                request.post(testUtils.buildUrl(url, user.username))
                    .set('Authorization', user.accessToken)
                    .send(testUtils.projectData('project-creation'))
                    .expect(201)
                    .end(testUtils.getCallback(test, done))
            })
            it('should create a new project', function() {
                expect(test.result.name).to.be.ok
                expect(test.result._id).to.be.ok
            })
            it('should have owner', function() {
                expect(test.result.owner)
                    .to.equal(user.id)
            })
            describe('and a duplicate name exists', function() {
                beforeEach('send create request with the same name', function(done) {
                    request.post(testUtils.buildUrl(url, user.username))
                        .set('Authorization', user.accessToken)
                        .send(testUtils.hubData('project-creation'))
                        .expect(400)
                        .end(testUtils.getCallback(test, done))
                })
                it('should be a bad request', function() {
                    expect(test.response.badRequest)
                })
            })
        })
        describe('when updating an existing project', function() {
            beforeEach('send update request', function(done) {
                request.put(testUtils.buildUrl(url, user.username, project.name))
                    .set('Authorization', user.accessToken)
                    .send({
                        name: 'updated-test-project'
                    })
                    .expect(200)
                    .end(testUtils.getCallback(test, done))

            })
            it('should update the project', function() {
                expect(test.result.name).to.equal('updated-test-project')
            })
        })
        describe('when deleting an exisiting project', function() {
            beforeEach('send delete request', function(done) {
                request.delete(testUtils.buildUrl(url, user.username, project.name))
                    .set('Authorization', user.accessToken)
                    .expect(204)
                    .end(testUtils.getCallback(test, done))
            })
            it('should delete the project', function(done) {
                request.get(testUtils.buildUrl(url, user.username, project.name))
                    .expect(404, done)
            })
        })
    })
})