var join = module.exports = function (fn) {
    /**
     * Wraps function `fn`, which will not be called until all dependent
     * functions are called. This is especially useful for tests where multiple
     * callbacks must complete before a success condition.
     *
     * e.g.:
     *
     *   var j = join(done);
     *   asyncCall(j()); // creates a source callback
     *   syncCall(j());  // creates a source callback
     *   asyncCall(j(function (err, result) {
     *      // triggers source callback, also executing callback code here
     *   }));
     *
     *   // `done` will not be called until both asyncCall and syncCall
     *   // complete, triggering their callbacks
     *
     * Note: once all source functions have been called, any time a source
     * function is called additionally, the joined call (i.e. `fn`) will be
     * called again.
     */

    var fun = function (callback) {
        var inner = function (index) {
            return function () {
                fun.seen[index] = true;

                if (callback) {
                    callback.apply(null, arguments);
                }

                if (Object.keys(fun.seen).length === fun.expected) {
                    return fun.fn && fun.fn();
                }
            };
        };

        return inner(fun.expected++);
    };

    fun.expectCall = function () {
        return fun();
    };

    fun.seen = {};
    fun.expected = 0;

    fun.join = function (fn) {
        fun.fn = fn;

        if (Object.keys(fun.seen).length === fun.expected) {
            fun.fn();
        }
    };

    if (fn) {
        process.nextTick(function () {
            fun.join(fn);
        });
    }

    return fun;
};
