```js
var join = require('async-spy').join;

it('test must trigger multiple callbacks', function (done) {
    var j = join(done);
    asyncCall(j()); // creates a source callback
    syncCall(j());  // creates a source callback

    // `done` will not be called until both asyncCall and syncCall
    // complete, triggering their callbacks
});
```
