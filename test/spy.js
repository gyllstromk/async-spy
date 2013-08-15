var spy = require('../index');

var assert = require('assert');

describe('spy callback for test support', function () {
    it('empty spy triggered asynchronously', function (done) {
        process.nextTick(spy().on(done));
    });

    it('callback triggered asynchronously', function (done) {
        var firstCalled;

        var f1 = function () {
            firstCalled = true;
        };

        var f2 = function () {
            assert(firstCalled, 'f1 not called');
            done();
        };

        process.nextTick(spy(f2).on(f1));
    });
});
