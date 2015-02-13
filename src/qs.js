/**
 *
 * @param strUrl {string} [strUrl] - Url to parse. If not specified then current URL is taken
 * @returns {{url: String, tokens: {}, has: Function, get: Function, getAll: Function, log: Function}}
 * @constructor
 */
function QS(strUrl) {
  var _qs = {
    /** @property {string} url - Url to parse */
    url: strUrl || (window && window.location.href),

    /** @property {string} url - Query string tokens object */
    tokens: {},

    /**
     * Checks if url contains specific query string token's key
     * @name has
     * @example
     * // returns true
     * QS('http://www.somedomain.com/somepage?foo=bar').has('foo');
     * @param {string} strKey - Query string token's key to search
     * @returns {boolean} True if key exists, false otherwise
     */
    has: function (strKey) {
      return _qs.tokens.hasOwnProperty(strKey);
    },

    /**
     * Gets query string token's decoded value
     * @name get
     * @example
     * // returns 'bar'
     * QS('http://www.somedomain.com/somepage?foo=bar').get('foo');
     * @param {string} strKey - Query string token's key to search
     * @returns {object} Query string token's value if key exists, otherwise null
     */
    get: function (strKey) {
      return _qs.tokens[strKey] ? decodeURIComponent(_qs.tokens[strKey]) : undefined;
    },

    /**
     * Gets all query string tokens object
     * @name getAll
     * @example
     * // returns {foo: "bar"}
     * QS('http://www.somedomain.com/somepage?foo=bar').getAll();
     * @returns {*} Query string keys & values collection
     */
    getAll: function () {
      return _qs.tokens;
    },

    /**
     * Sets (update or insert) a query string token after encoding it and then updates URL property
     * @name set
     * @param {string} strKey - Query string key name to set (update or insert)
     * @param {object} objValue - Query string value
     * @example
     * QS('http://www.somedomain.com/somepage?foo=bar').set('dom', true);
     * @returns QS (for chaining purposes)
     */
    set: function (strKey, objValue) {
      _qs.tokens[strKey] = objValue ? encodeURIComponent(objValue) : null;
      _updateURL();
      return _qs;
    },

    /**
     * Removes a query string token from URL
     * @name remove
     * @param {string} strKey - Query string key name to remove
     * @example
     * QS('http://www.somedomain.com/somepage?foo=bar').remove('foo');
     * @returns QS (for chaining purposes)
     */
    remove: function (strKey) {
      delete _qs.tokens[strKey];
      _updateURL();
      return _qs;
    },

    /**
     * Changes browser location to QS url (usually after manipulating query string tokens)
     * @name go
     * @example
     * QS('http://www.somedomain.com/somepage?foo=bar').set('rob', 5).go();
     */
    go: function () {
      document.location.href = _qs.url;
    },

    /**
     * Logs all query string tokens to browser's console
     * @name log
     * @example
     * QS('http://www.somedomain.com/somepage?foo=bar').log();
     */
    log: function () {
      console.log(_qs.tokens);
    }
  };

  /**
   * Extracts all query string tokens from url
   * @constructs
   */
  (function _init() {
    var re = /[?&]([\w-~\._]+)(?:=([\w-~\._]+))?/g,
      match;

    match = re.exec(_qs.url);
    while (match !== null) {
      // Register _qs keys as object's properties:
      _qs.tokens[match[1]] = _cast(match[2] || null);
      match = re.exec(_qs.url);
    }

    // Cast values of tokens:
    function _cast(objValue) {
      // Null value:
      if (objValue === null) {
        return;
      }

      // Numeric value:
      if (objValue.match(/^\d+$/)) {
        return Number(objValue);
      }

      // Boolean value:
      if (objValue.match(/^true|false$/)) {
        return Boolean(objValue);
      }

      // Undefined:
      if (objValue === 'undefined') {
        return undefined;
      }

      // Null value:
      if (objValue === 'null') {
        return null;
      }

      // String value:
      return objValue;
    }
  })();

  /**
   * Update url property (usually after manipulating query string tokens)
   * @name _updateURL
   * @ignore
   * @private
   */
  function _updateURL() {
    var strUpdatedURL = _qs.url.substr(0, (_qs.url.indexOf('?') > 0 && _qs.url.indexOf('?')) || _qs.url.length),
      arrTokens = [];

    // Compose query strings:
    for (var key in _qs.tokens) {
      if (_qs.tokens.hasOwnProperty(key)) {
        arrTokens.push(key + (_qs.tokens[key] ? '=' + _qs.tokens[key] : ''));
      }
    }

    // Concat base url and query strings:
    if (arrTokens.length > 0) {
      strUpdatedURL += '?' + arrTokens.join('&');
    }

    // Update QS url property:
    _qs.url = strUpdatedURL;
  }

  // Reveal methods & properties:
  return _qs;
}