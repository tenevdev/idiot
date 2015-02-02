var request = require('supertest'),
    testUtils = require('../helpers/utils'),
    async = require('async'),
    test = {}

describe('user.js', function() {
    var user, url
    before(function(done) {
        request = request(require('../../server').app)
        url = '/api/users'

        done()
    })
    beforeEach('create a user', function(done) {
        testUtils.createUser(function(err, createdUser, accessToken) {
            expect(err).to.not.exist

            user = createdUser
            user.accessToken = accessToken

            done()
        })
    })
    afterEach('remove all users', function(done) {
        testUtils.clear('User', done)
    })
    after('remove all users', function(done) {
        testUtils.clear('User', done)
    })
    describe('when not authorized', function() {
        describe('when updating a user', function() {
            beforeEach('send update request', function(done) {
                request.put(testUtils.buildUrl(url, user.username))
                    .expect(401)
                    .end(testUtils.getCallback(test, done))
            })
            it('should not be authorized', function() {
                expect(test.response.unauthorized)
            })
        })
        describe('when deleting a user', function() {
            beforeEach('send delete request', function(done) {
                request.delete(testUtils.buildUrl(url, user.username))
                    .expect(401)
                    .end(testUtils.getCallback(test, done))
            })
            it('should not be authorized', function() {
                expect(test.response.unauthorized)
            })
        })
    })
    describe('when public', function() {
        describe('when listing users', function() {
            beforeEach('send read request', function(done) {
                request.get(url)
                    .expect(200)
                    .end(testUtils.getCallback(test, done))
            })
            it('should return an array', function() {
                expect(test.result).to.be.an('array')
            })
        })
        describe('when getting a single user', function() {
            beforeEach('send read request', function(done) {
                request.get(testUtils.buildUrl(url, user.username))
                    .expect(200)
                    .end(testUtils.getCallback(test, done))
            })
            it('should have a name', function() {
                expect(test.result).to.have.property('username')
            })
            it('should not have password', function() {
                expect(test.result).to.not.have.property('password')
                expect(test.result).to.not.have.property('hashedPassword')
            })
        })
        describe('when creating a new user', function() {
            beforeEach('send create request', function(done) {
                request.post(url)
                    .send(testUtils.userData('user-creation'))
                    .expect(201)
                    .end(testUtils.getCallback(test, done))
            })
            it('should create a new user', function() {
                expect(test.result.username).to.be.ok
                expect(test.result._id).to.be.ok
            })
            describe('and a duplicate name exists', function() {
                beforeEach('send create request with the same name', function(done) {
                    request.post(url)
                        .send(testUtils.hubData('user-creation'))
                        .expect(400)
                        .end(testUtils.getCallback(test, done))
                })
                it('should be a bad request', function() {
                    expect(test.response.badRequest)
                })
            })
        })
    })
    describe('when authorized', function() {
        describe('when updating an existing user', function() {
            beforeEach('send update request', function(done) {
                request.put(testUtils.buildUrl(url, user.username))
                    .set('Authorization', user.accessToken)
                    .send({
                        username: 'updated-test-user'
                    })
                    .expect(200)
                    .end(testUtils.getCallback(test, done))

            })
            it('should update the user', function() {
                expect(test.result.username).to.equal('updated-test-user')
            })
        })
        describe('when deleting an exisiting user', function() {
            beforeEach('send delete request', function(done) {
                request.delete(testUtils.buildUrl(url, user.username))
                    .set('Authorization', user.accessToken)
                    .expect(204)
                    .end(testUtils.getCallback(test, done))
            })
            it('should delete the user', function(done) {
                request.get(testUtils.buildUrl(url, user.username))
                    .expect(404, done)
            })
        })
    })
})