var request = require('supertest'),
    Project = require('../../server/models').Resources.Project,
    projectData = [{
        name: 'test1',
    }, {
        name: 'test2'
    }],
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
    project

describe('controllers.project', function() {
    before(function(done) {
        request = request(require('../../server').app)

        //Check db
        Project.remove({}, function(err) {
            if (err)
                throw err
            else
                User.remove({}, function(err) {
                    if (err)
                        throw err
                    else {
                        // Create a test user to own projects
                        var user = new User(userData[0])
                        user.save(function(err, user) {
                            if (err)
                                throw err
                            else {
                                userData[0].id = user.id
                                projectData[0].owner = userData[0].id
                                done()
                            }
                        })
                    }
                })
        })
    })
    beforeEach(function(done) {
        // Create a test project
        var testProject = new Project(projectData[0])
        testProject.save(function(err) {
            if (err)
                throw err
            else
                done()
        })
    })
    after(function(done) {
        //Drop db
        done()
    })
    afterEach(function(done) {
        // Remove all projects
        Project.remove({}, function(err) {
            if (err)
                throw err
            else
                done()
        })
    })
    it('creates a new project', function(done) {
        projectData[1].owner = userData[0].id
        project = projectData[1]
        request.post('/api/projects')
            .send(project)
            .expect(201)
            .end(function(err, res) {
                expect(err).to.not.exist
                expect(res.body).to.exist
                expect(res.body).to.have.property('name', project.name)
                expect(res.body).to.have.property('owner', project.owner)
                done()
            })
        it('does not allow projects with the same name to be created', function(done) {
            // Create the same user twice
            request.post('/api/projects')
                .send(projectData[1])
                .expect(201, function() {
                    request.post('/api/projects')
                        .send(projectData[1])
                        .expect(400, done)
                })


        })
    })
    it('gets an existing project by name', function(done) {
        project = projectData[0]
        request.get('/api/projects/test1/test1')
            .expect(200)
            .end(function(err, res) {
                expect(err).to.not.exist
                expect(res.body).to.exist
                expect(res.body).to.have.property('name', project.name)
                expect(res.body)
                    .to.have.property('owner')
                    .that.is.an('object')
                    .with.property('username')
                expect(res.body)
                    .to.have.property('hubs')
                    .that.is.an('array')
                done()
            })
    })
    it('updates project name', function(done) {
        request.put('/api/projects/test1/test1')
            .send({
                name: 'test1updated'
            })
            .expect(200)
            .end(function(err, res) {
                expect(err).to.not.exist
                expect(res.body).to.exist
                expect(res.body).to.have.property('name', 'test1updated')
                done()
            })
    })
    it('gets an array of projects', function(done) {
        request.get('/api/projects')
            .expect(200)
            .end(function(err, res) {
                expect(err).to.not.exist
                expect(res.body).to.exist
                expect(res.body).to.be.an('array')
                done()
            })
    })
    it('deletes a project', function(done) {
        request.delete('/api/projects/test1/test1')
            .expect(204, done)
    })
})