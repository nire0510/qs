# QS - Simple query string tokens parser
QS helps you extract & manipulate all query string tokens from a given or current valid url: you can check if a specific query string key exists, then check its value.
You can also manipulate query string tokens by adding new ones, change values of existing tokens or removing them completely. After manipulation is done, just call `go()` to navigate to the modified URL.

### Installation:
* Install via **bower**: `bower install qs --save`  
Then add **qs.min.js** file to your website:  
`<script src="bower_components/qs/dist/qs.min.js"></script>`  

* Install via **npm**: `npm install qs-parser --save`  
Then add reference to library:  
`const QS = require('qs-parser');`  

### Code samples:

#### Read
```javascript
// Get **foo** query string decoded value from a given url:
QS('http://www.somedomain.com/somepage?foo=bar').get('foo');
// => 'bar'

// You may specify a default value in case query string is missing or empty:
QS('http://www.somedomain.com/somepage?bar=baz').get('foo', 'hello');
// => 'hello'

// Notice that URL should contain only valid characters, which means query string tokens should be encoded properly using encodeURIComponent.
// QS will decode them for you once you request for these tokens:
QS('http://www.somedomain.com/somepage?email=nire0510%40gmail.com').get('email');
// => 'nire0510@gmail.com'

QS('http://www.somedomain.com/somepage?number=345.678').get('number');
// => 345.678 // Notice that you get a number, not a string

// QS also knows how to parse arrays:
QS('http://www.somedomain.com/somepage?cars%5B%5D=BMW&cars%5B%5D=Audi').get('cars[]');
// => ['BMW', 'Audi'] // param name must end with [] if its an array

// You can also omit the URL if you want QS to parse current VALID encoded page's URL:
QS().get('someKey');
// => whatever...

// Get all query string tokens from a given VALID encoded url as an object:
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
// => url property will be changed to "http://www.somedomain.com/somepage?foo=2"

// Add a new query string token:
QS('http://www.somedomain.com/somepage?foo=bar').set('dal', 'mon');
// => url property will be changed to "http://www.somedomain.com/somepage?foo=bar&dal=mon"

// Remove a query string token:
QS('http://www.somedomain.com/somepage?foo=bar').remove('foo');
// => url property will be changed to "http://www.somedomain.com/somepage"

// Notice set & remove methods can be chained:
QS('http://www.somedomain.com/somepage?foo=bar').remove('foo').set('bar');
// => url property will be changed to "http://www.somedomain.com/somepage?bar"
```

#### Misc
```javascript
// After all these URL modifications you might want to navigate to the new URL; just call `go`:
QS('http://www.somedomain.com/somepage?foo=bar').remove('foo').set('bar').go();
// => navigate to "http://www.somedomain.com/somepage?bar"

// Log all query string tokens:
QS('http://www.somedomain.com/somepage?foo=bar').log();
// => Object {foo: "bar"}

// Print current version:
QS.version;
// => '0.4.7'
```
