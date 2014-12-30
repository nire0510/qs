# QS - Simple query strings parser
QS helps you extract all query strings from a given or current url.

### Code samples:
```javascript
// Extract **foo** parameter from a given url:
new QS('http://www.somedomain.com/somepage?foo=bar').parse().foo
```