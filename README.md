# QS - Simple query strings parser
QS helps you extract all query string tokens from a given or current url.
Version 0.3.0

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

// Change the value of **foo** query string key:
QS('http://www.somedomain.com/somepage?foo=bar').set('foo', 2);
// => url property will bechanged to "http://www.somedomain.com/somepage?foo=2"

// Add a new query string token:
QS('http://www.somedomain.com/somepage?foo=bar').set('dal', 'mon');
// => url property will bechanged to "http://www.somedomain.com/somepage?foo=bar&dal=mon"

// Remove a query string token:
QS('http://www.somedomain.com/somepage?foo=bar').remove('foo');
// => url property will bechanged to "http://www.somedomain.com/somepage"

// Notice set & remove methods can be chained:
QS('http://www.somedomain.com/somepage?foo=bar').remove('foo').set('bar');
// => url property will bechanged to "http://www.somedomain.com/somepage?bar"

// After all these URL modifications you might want to navigate to the new URL; just call `go`:
QS('http://www.somedomain.com/somepage?foo=bar').remove('foo').set('bar').go();
// => navigate to "http://www.somedomain.com/somepage?bar"

// Log all qury string tokens:
QS('http://www.somedomain.com/somepage?foo=bar').log();
// => Object {foo: "bar"}
```