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

    it('Call with number', () => {
        let threw = false;

        try {
            const ret = SingleSpace(42, () => {
                expect.fail('Should not call');
            });
        } catch(err) {
            expect(err.message).to.equal('Namespace parameter must be a string with 1 or more characters.');
            threw = true;
        }

        expect(threw).to.be.true();

        let called = false;
    });

    it('Call with boolean', () => {
        let threw = false;

        try {
            const ret = SingleSpace(true, () => {
                expect.fail('Should not call');
            });
        } catch(err) {
            expect(err.message).to.equal('Namespace parameter must be a string with 1 or more characters.');
            threw = true;
        }

        expect(threw).to.be.true();

        let called = false;
    });

    it('Call with empty string', () => {
        let threw = false;

        try {
            const ret = SingleSpace('', () => {
                expect.fail('Should not call');
            });
        } catch(err) {
            expect(err.message).to.equal('Namespace parameter must be a string with 1 or more characters.');
            threw = true;
        }

        expect(threw).to.be.true();

        let called = false;
    });

    it('Call with object', () => {
        let threw = false;

        try {
            const ret = SingleSpace({}, () => {
                expect.fail('Should not call');
            });
        } catch(err) {
            expect(err.message).to.equal('Namespace parameter must be a string with 1 or more characters.');
            threw = true;
        }

        expect(threw).to.be.true();

        let called = false;
    });

    it('Call with function', () => {
        let threw = false;

        try {
            const ret = SingleSpace(() => {}, () => {
                expect.fail('Should not call');
            });
        } catch(err) {
            expect(err.message).to.equal('Namespace parameter must be a string with 1 or more characters.');
            threw = true;
        }

        expect(threw).to.be.true();

        let called = false;
    });

    it('When function returns null', () => {
        const ret1 = SingleSpace('test5.foo.bar', () => {
            return null;
        });

        expect(ret1).to.not.exist();

        const ret2 = SingleSpace('test5.foo.bar', () => {
            return 42;
        });

        expect(ret2).to.equal(42);
    });

    it('When function returns undefined', () => {
        const ret1 = SingleSpace('test6.foo.bar', () => {
            return;
        });

        expect(ret1).to.not.exist();

        const ret2 = SingleSpace('test6.foo.bar', () => {
            return 42;
        });

        expect(ret2).to.equal(42);
    });

    it('When function throws', () => {
        let threw = false;
        const error = new Error('Test error');

        try {
            SingleSpace('test7.foo.bar', () => {
                throw error;
            });
        } catch (err) {
            threw = true;

            expect(err).to.equal(error);
        }

        expect(threw).to.be.true();
    });

    it('When not a function', () => {
        let threw = false;

        try {
            SingleSpace('test', 42);
        } catch (err) {
            threw = true;

            expect(err.message).to.equal('Callback must be a function');
        }

        expect(threw).to.be.true();
    });
});
