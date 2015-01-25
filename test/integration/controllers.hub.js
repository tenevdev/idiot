var request = require('supertest'),
    async = require('async'),
    Hub = require('../../server/models').Resources.Hub,
    User = require('../../server/models').Resources.User,
    Project = require('../../server/models').Resources.Project,
    hubData = [{
        name: 'testHub1',
        state: 'active',
        dataStream: {
            dataType: 'number',
            storeStrategy: 'none'
        }
    }, {
        name: 'testHub2',
        state: 'active',
        dataStream: {
            dataType: 'bool',
            storeStrategy: 'none'
        }
    }],
    projectData = {
        name: 'testProject1',
    },
    userData = {
        username: 'testUser1',
        email: 'test1@test.com',
        password: 'test1pass'
    },
    hub

describe('controllers.hub', function() {
    before(function(done) {
        request = request(require('../../server').app)
        async.waterfall([

            function(next) {
                Hub.remove({}, function(err) {
                    next(err)
                })
            },
            function(next) {
                Project.remove({}, function(err) {
                    next(err)
                })
            },
            function(next) {
                User.remove({}, function(err) {
                    next(err)
                })
            },
            function(next) {
                var user = new User(userData)
                user.save(next)
            },
            function(user, numberAffected, next) {
                userData.id = user.id
                projectData.owner = userData.id
                hubData[0].owner = userData.id
                next(null)
            },
            function(next) {
                var project = new Project(projectData)
                project.save(next)
            },
            function(project, numberAffected, next) {
                projectData.id = project.id
                next(null)
            }
        ], function(err) {
            if (err)
                throw err
            else
                done()
        })
    })
    beforeEach(function(done) {
        // Create a test hub
        var testHub = new Hub(hubData[0])
        testHub.save(function(err, hub) {
            if (err)
                throw err
            hubData[0].id = hub.id
            done()
        })
    })
    after(function(done) {
        User.remove({}, function(err) {
            if (err)
                throw err
            Project.remove({}, function(err) {
                if (err)
                    throw err
                done()
            })
        })
    })
    afterEach(function(done) {
        // Remove all hubs
        Hub.remove({}, function(err) {
            if (err)
                throw err
            done()
        })
    })
    it('creates a new hub', function(done) {
        hubData[1].owner = userData.id
        hub = hubData[1]
        request.post('/api/projects/testUser1/testProject1/hubs')
            .send(hub)
            .expect(201)
            .end(function(err, res) {
                expect(res.body).to.have.property('name', hub.name)
                expect(res.body).to.have.property('owner', hub.owner)
                expect(res.body).to.have.property('dataStream')
                done()
            })
    })
    it('attaches a hub to a project', function(done) {
        async.waterfall([

            function(next) {
                request.post('/api/projects/testUser1/testProject1/hubs')
                    .send(hubData[1])
                    .expect(201)
                    .end(next)
            },
            function(res, next) {
                expect(res.body).to.have.property('_id')
                next(null, res.body._id)
            },
            function(id, next) {
                request.get('/api/projects/testUser1/testProject1')
                    .expect(200)
                    .end(function(err, res) {
                        next(err, res, id)
                    })
            },
            function(res, id, next) {
                expect(res.body)
                    .to.have.property('hubs')
                    .that.has.deep.property('[0]._id', id)
                next()
            }
        ], function(err, res) {
            if (err)
                throw err
            done()
        })
    })
    it('creates a data point', function(done) {
        var dataPoint = {
            number: 1
        }
        request.post('/api/projects/testUser1/testProject1/hubs/' + hubData[0].id + '/datapoints')
            .send(dataPoint)
            .expect(201)
            .end(function(err, res) {
                expect(err).to.not.exist
                expect(res.body)
                    .to.have.property('data')
                    .that.is.an('object')
                    .that.deep.equals(dataPoint)
                expect(res.body).to.have.property('timeStamp')
                done()
            })
    })
    it('lists data points', function(done) {
        var dataPoint = {
            number: 1
        }
        async.waterfall([

            function(next) {
                request.post('/api/projects/testUser1/testProject1/hubs/' + hubData[0].id + '/datapoints')
                    .send(dataPoint)
                    .expect(201)
                    .end(next)
            },
            function(dataPointRes, next) {
                request.get('/api/projects/testUser1/testProject1/hubs/' + hubData[0].id + '/datapoints')
                    .expect(200)
                    .end(function(err, res) {
                        next(err, dataPointRes.body, res.body)
                    })
            }
        ], function(err, dataPoint, dataPointsList) {
            expect(err).to.not.exist
            expect(dataPointsList).to.have.length(1)
            expect(dataPointsList).to.include(dataPoint)
            done()
        })
    })
    it('gets an existing hub by id', function(done) {
        request.get('/api/projects/testUser1/testProject1/hubs/' + hubData[0].id)
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('dataStream')
                expect(res.body).to.have.property('owner')
                done()
            })
    })
    it('updates an existing hub', function(done) {
        var updateBody = {
            name: 'updatedName',
            state: 'suspended'
        }
        request.put('/api/projects/testUser1/testProject1/hubs/' + hubData[0].id)
            .send(updateBody)
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.have.property('name', updateBody.name)
                expect(res.body).to.have.property('state', updateBody.state)
                done()
            })
    })
    it('deletes an existing hub', function(done) {
        request.delete('/api/projects/testUser1/testProject1/hubs/' + hubData[0].id)
            .expect(204, done)
    })
})