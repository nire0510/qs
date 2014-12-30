# QS - Simple query strings parser
QS helps you extract all query strings from a given or current url.

### Code samples:
```javascript
// Extract **foo** query string key from a given url:
new QS('http://www.somedomain.com/somepage?foo=bar').foo
// => 'bar'

// Check if **foo** query string key exists:
new QS('http://www.somedomain.com/somepage?foo=bar').has('foo')
// => true
```