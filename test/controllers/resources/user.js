var sinon = require('sinon'),
    mongoose = require('mongoose'),
    User = require('../../../server/models').Resources.User,
    UserController = require('../../../server/controllers').Resources.UserController

describe('Controllers', function() {
    describe('User', function() {
        describe('#list', function() {
            var users = [{
                    name: 'joe',
                    email: 'joe@example.com'
                }, {
                    name: 'joe',
                    email: 'joe@example.com'
                }],
                err = new Error('getPage error'),
                req = {
                    query: {
                        page: 1,
                        perPage: 5
                    }
                },
                res = {
                    status: function() {}
                },
                spy,
                statusStub,
                getPageStub
            before(function(done) {
                spy = res.json = sinon.spy(),
                statusStub = sinon.stub(res, 'status').returns(res)
                getPageStub = sinon.stub(User, 'getPage')
                done()
            })


            it('should respond', function(done) {
                getPageStub.yields(null, users)

                UserController.list(req, res, function(err) {
                    expect(spy.calledOnce).true
                    expect(spy.calledWith(users)).true
                    done()
                })
            })
            it('should respond with error status code on error from model', function(done) {
                getPageStub.yields(err)

                UserController.list(req, res, function(err) {
                    expect(err).equal(err)
                    expect(spy.calledWith(err)).true
                    done()
                })
            })
            it('should pass query parameters for pagination', function(done) {
                UserController.list(req, res, function(err) {
                    expect(getPageStub.calledWith({}, req.query)).true
                    done()
                })
            })
            it('should pass default parameters for pagination when there are no query parameters', function(done) {
                req.query = {}

                UserController.list(req, res, function(err) {
                    expect(getPageStub.calledWith({}, {
                        page: 1,
                        perPage: 30
                    })).true
                    done()
                })
            })

            after(function(done) {
                User.getPage.restore()
                res.status.restore()
                done()
            })
        })
    })
})