# QS - Simple query string tokens parser
current version: Version 0.3.0
QS helps you extract & manipulate all query string tokens from a given or current url: you can check if a specific query strink key exists, then check its value.
You can also manipulate query string tokens by adding new ones, change values of existing tokens or removing them completely. After manipulation is done, just call `go()` to navigate to the modified URL.

### Code samples:

#### Read
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
```

#### Write
```javascript
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
```

#### Misc
```javascript
// After all these URL modifications you might want to navigate to the new URL; just call `go`:
QS('http://www.somedomain.com/somepage?foo=bar').remove('foo').set('bar').go();
// => navigate to "http://www.somedomain.com/somepage?bar"

// Log all qury string tokens:
QS('http://www.somedomain.com/somepage?foo=bar').log();
// => Object {foo: "bar"}
```

### Installation:
* Instal via bower: `bower install qs --save`  
Then add qs.min.js file to your website `<script src='bower_components/qs/dist/qs.min.js'></script>`