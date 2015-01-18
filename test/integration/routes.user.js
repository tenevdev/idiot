var request = require('supertest'),
    bcrypt = require('bcrypt'),
    sinon = require('sinon'),
    User = require('../../server/models').Resources.User,
    userData = [{
        username: 'test1',
        email: 'test1@test.com',
        password: 'test1pass'
    }, {
        username: 'test2',
        email: 'test2@test.com',
        password: 'test2pass'
    }],
    user

describe('Routes', function() {
    before(function() {
        request = request(require('../../server').app)
    })
    describe('User', function() {
        before(function(done) {
            //Check db
            sinon.stub(bcrypt, 'genSalt').yields(null, 'salt')
            sinon.stub(bcrypt, 'hash').yields(null, 'hash')
            User.remove({}, function(err) {
                if (err)
                    throw err
                else
                    done()
            })
        })
        beforeEach(function(done) {
            // Create a test user
            var user = new User(userData[0])
            user.save(function(err) {
                if (err)
                    throw err
                else
                    done()
            })
        })
        after(function(done) {
            //Drop db
            bcrypt.genSalt.restore()
            bcrypt.hash.restore()
            done()
        })
        afterEach(function(done) {
            // Remove all users
            User.remove({}, function(err) {
                if (err)
                    throw err
                else
                    done()
            })
        })
        describe('POST /api/users', function() {
            it('creates a new user', function(done) {
                user = userData[1]
                request.post('/api/users')
                    .send(user)
                    .expect(201)
                    .end(function(err, res) {
                        expect(err).to.not.exist
                        expect(res.body).to.exist
                        expect(res.body).to.have.property('username', user.username)
                        expect(res.body).to.have.property('email', user.email)
                        expect(res.body).to.not.have.property('hashedPassword')
                        done()
                    })
            })
            it('does not allow users with the same name/email to be created', function(done) {
                // Create the same user twice
                request.post('/api/users')
                    .send(userData[1])
                    .expect(201, function() {
                        request.post('/api/users')
                            .send(userData[1])
                            .expect(400, done)
                    })


            })
        })
        describe('GET /api/users/:user', function() {
            it('gets an existing user by name', function(done) {
                user = userData[0]
                request.get('/api/users/test1')
                    .expect(200)
                    .end(function(err, res) {
                        expect(err).to.not.exist
                        expect(res.body).to.exist
                        expect(res.body).to.have.property('username', user.username)
                        expect(res.body).to.have.property('email', user.email)
                        expect(res.body).to.not.have.property('hashedPassword')
                        done()
                    })
            })
        })
        describe('PUT /api/users/:user', function() {
            it('updates username', function(done) {
                request.put('/api/users/test1')
                    .send({
                        username: 'test1updated'
                    })
                    .expect(200)
                    .end(function(err, res) {
                        expect(err).to.not.exist
                        expect(res.body).to.exist
                        expect(res.body).to.have.property('username', 'test1updated')
                        done()
                    })
            })
        })
        describe('GET /api/users', function() {
            it('gets an array of users', function(done) {
                request.get('/api/users')
                    .expect(200)
                    .end(function(err, res) {
                        expect(err).to.not.exist
                        expect(res.body).to.exist
                        expect(res.body).to.be.an('array')
                        done()
                    })
            })
        })
        describe('DELETE /api/users/:user', function() {
            it('deletes a user', function(done) {
                request.delete('/api/users/test1')
                    .expect(204, done)
            })
        })
    })
})