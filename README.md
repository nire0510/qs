# QS - Simple query strings parser
QS helps you extract all query string tokens from a given or current url.
Version 0.2.9

### Code samples:
```javascript
// Get **foo** query string value from a given url:
QS('http://www.somedomain.com/somepage?foo=bar').get('foo');
// => 'bar'

// You can also omit the URL if you want QS to parse current page's URL:
QS().get('someKey');
// => whatever...

// Get all query string tokens from a given url as an object:
QS('http://www.somedomain.com/somepage?foo=bar').getAll();
// => Object {foo: "bar"}

// Check if **foo** query string key exists:
QS('http://www.somedomain.com/somepage?foo=bar').has('foo');
// => true

// Log all qury string tokens:
QS('http://www.somedomain.com/somepage?foo=bar').log();
// => Object {foo: "bar"}
```