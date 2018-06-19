const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

describe('## Company APIs', () => {
    let company = {
        company_name: 'Test Compant',
        company_address: 'First Street',
        website: 'http://google.com',
        access_token: 'tsttingdfdfd'
    };

    // describe('when the schema contains an invalid reference to the request object', function () {
    //     it('should return a 400 response', function (done) {
    //         request(app)
    //             .post('/api/company')
    //             .send(company)
    //             .expect(httpStatus.OK)
    //             .end(function (err, res) {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 done();
    //             });
    //     });
    // });

    describe('# POST /api/company', () => {
        it('should create a new company', (done) => {
            request(app)
                .post('/api/company')
                .send(company)
                .expect(httpStatus.OK)
                .then((res, err) => {
                    if(err) {
                        return done(err);
                    }
                    expect(res.body.company_name).to.equal(company.company_name);
                    expect(res.body.company_address).to.equal(company.company_address);
                    expect(res.body.website).to.equal(company.website);
                    expect(res.body.access_token).to.equal(company.access_token);
                    company = res.body;
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/company/:companyId', () => {
        it('should get company details', (done) => {
            request(app)
                .get(`/api/company/${company._id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.company_name).to.equal(user.company_name);
                    expect(res.body.company_address).to.equal(user.company_address);
                    done();
                })
                .catch(done);
        });

        it('should report error with message - Not found, when user does not exists', (done) => {
            request(app)
                .get('/api/company/56c787ccc67fc16ccc1a5e92')
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.message).to.equal('Not Found');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /api/company/:companyId', () => {
        it('should update company details', (done) => {
            user.company_name = 'KK';
            request(app)
                .put(`/api/company/${company._id}`)
                .send(company)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.company_name).to.equal('KK');
                    expect(res.body.company_address).to.equal(user.company_address);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/company/', () => {
        it('should get all companyies', (done) => {
            request(app)
                .get('/api/company')
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });

        it('should get all companyies (with limit and skip)', (done) => {
            request(app)
                .get('/api/company')
                .query({limit: 10, skip: 1})
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /api/company/', () => {
        it('should delete company', (done) => {
            request(app)
                .delete(`/api/company/${company._id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.company_name).to.equal('KK');
                    expect(res.body.company_address).to.equal(user.company_address);
                    done();
                })
                .catch(done);
        });
    });
});
