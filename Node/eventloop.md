# event loop

A `process.nextTick` callback is added to `process.nextTick queue.`

A `Promise.then()` callback is added to `promises microtask queue.`

A `setTimeout, setImmediate` callback is added to `macrotask queue.`

Event loop executes tasks in `process.nextTick queue` first, and then executes `promises microtask queue`, and then executes `macrotask queue`.
