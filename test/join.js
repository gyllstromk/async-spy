var join = require('../lib/join');

describe('join', function () {
    var sync = function (callback) {
        callback();
    };

    var async = function (callback) {
        process.nextTick(callback);
    };

    var nAsync = function (n, callback) {
        process.nextTick(function () {
            while (n-- > 0) {
                callback();
            }
        });
    };

    it('synchronous', function (done) {
        var j = join(done);
        sync(j());
        sync(j());
    });

    it('asynchronous', function (done) {
        var j = join(done);
        async(j());
        async(j());
    });

    it('mixed', function (done) {
        var j = join(done);
        sync(j());
        async(j());
    });

    it('time out if not all called', function (done) {
        var j = join(done);

        setTimeout(done, 100);
        j();
        sync(j());
    });

    it('one called twice triggers callback twice', function (done) {
        var count = 0;
        var j = join(function () {
            count += 1;
            if (count === 2) {
                done();
            }
        });

        nAsync(2, j());
    });

    it('one called twice does not make up for one not called', function (done) {
        var j = join(done);

        setTimeout(done, 100);

        nAsync(2, j());
        j();
    });
});
