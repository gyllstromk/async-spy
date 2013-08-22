var spy = module.exports = function (callback) {
    /**
     * Allow spying on asynchronous callbacks.
     *
     * This is useful for testing asynchronous calls to ensure that callbacks
     * are fired. It has similar functionality to `spy`.
     *
     * Usage example:
     *
     *   var s = spy(myCallback);
     *   s.on(/* ... );
     *
     * Here, we trap that the call was triggered (via `spy.on`), but the
     * original callback passed to it is still called.
     */

    var f = function () {
        var args = [].slice.call(arguments);

        [ f.callback, callback ].forEach(function (callback) {
            if (callback) {
                callback.apply(null, args);
            }
        });
    };

    f.on = function (callback) {
        f.callback = callback;
        return f;
    };

    return f;
};
