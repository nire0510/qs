# QS - Simple query strings parser
QS helps you extract all query strings from a given or current url.
Version 0.1.1

### Code samples:
```javascript
// Extract **foo** query string key from a given url:
QS('http://www.somedomain.com/somepage?foo=bar').get('foo')
// => 'bar'

// Check if **foo** query string key exists:
QS('http://www.somedomain.com/somepage?foo=bar').has('foo')
// => true

// Log all qury string tokens:
QS('http://www.somedomain.com/somepage?foo=bar').log()
// => Object {foo: "bar"}
```