```js
var join = require('async-spy').join;

it('test must trigger multiple callbacks', function (done) {
    var j = join(done);
    asyncCall(j.expectCall()); // creates a source callback
    syncCall(j.expectCall());  // creates a source callback

    asyncCall(j.expectCall(function(arg) {
        assert(arg);
    }));  // creates a source callback that also calls callback within

    // `done` will not be called until both asyncCall and syncCall
    // complete, triggering their callbacks
});

it('another test using alias', function (done) {
    var j = join(done);

    asyncCall(j()); // j() is alias for j.expectCall()
});
```
