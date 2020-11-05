```js
function add(a, ...args) {
  let sum = [a, ...args].reduce((prev, current) => prev + current, 0)
  function s(c, ...args1) {
    let sum1 = [c, ...args1].reduce((p, c) => p + c, 0)
    sum += sum1
    return s
  }
  s.toString = function() {
    return sum
  }
  return s
}
```
