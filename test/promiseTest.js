const { assert } = require("chai");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const promiseFn = require("./../src/promise");

chai.use(chaiAsPromised);

describe.skip("promise.js => Promise Tests", function() {
    it("Promise test case", function(done) {
        this.timeout(0); // when its 0, waits for infinite time till done is called. When non-zero, waits for that many ms
        promiseFn()
            .then(num => {
                assert.equal(num, 6);
                done();
            })
    })
});