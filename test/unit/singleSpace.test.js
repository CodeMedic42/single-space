const chai = require('chai');
const dirtyChai = require('dirty-chai');
const _ = require('lodash');
const SingleSpace = require('../../src/singleSpace.js');

chai.use(dirtyChai);

const expect = chai.expect;

describe('Single-Space', function mainTest() {
    it('Correctly defines and returns value', () => {
        const ret = SingleSpace('test1.foo.bar', () => {
            return 42;
        });

        expect(ret).to.equal(42);
    });

    it('Call without function before defined', () => {
        const ret = SingleSpace('test2.foo.bar');

        expect(ret).to.not.exist();
    });

    it('Call without function after defined', () => {
        const ret = SingleSpace('test3.foo.bar', () => {
            return 42;
        });

        expect(ret).to.equal(42);

        const ret2 = SingleSpace('test3.foo.bar');

        expect(ret2).to.equal(42);
    });


    it('Will not redefine the value', () => {
        const ret = SingleSpace('test4.foo.bar', () => {
            return 42;
        });

        expect(ret).to.equal(42);

        let called = false;

        const ret2 = SingleSpace('test4.foo.bar', () => {
            called = true;

            return 43;
        });

        expect(ret2).to.equal(42);
        expect(called).to.be.false();
    });
});
