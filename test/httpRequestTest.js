const chai = require('chai');
const chaiHttp = require('chai-http');
const httpReq = require('./../src/httpRequest');

// assertion style
chai.should();
chai.use(chaiHttp);

describe.skip('httpRequest.js => Htpp requests tests', function () {
	describe('getData()', () => {
		it('Should return a todo obj', (done) => {
			function callBack(err, resp) {
				if (err) {
					console.log(err);
				} else {
					resp.should.have.status(200);
					const body = JSON.parse(resp.body);
					body.should.be.a('object');
					body.should.have.property('id');
					body.should.have.property('userId');
					body.should.have.property('completed');
					body.should.have.property('title');
					done();
				}
			}
			httpReq.getData(callBack);
		});
	});

	describe('getDataPromise()', () => {
		it('getDataPromise: Should return a todo obj', function (done) {
			httpReq
				.getDataPromise()
				.then((resp) => {
					resp.should.have.status(200);
					const body = JSON.parse(resp.body);
					// console.log(body);
					body.should.be.a('object');
					body.should.have.property('id');
					body.should.have.property('userId');
					body.should.have.property('completed');
					body.should.have.property('title');
					done();
				})
				.catch((err) => {
					console.log(err);
				});
		});
	});
});
