/**
 *
 * @param strUrl {string} [strUrl] - A valid Url to parse. If not specified then current URL is taken. Make sure that query string tokens are encoded (use encodeURIComponent)
 * @returns {{url: String, tokens: {}, has: Function, get: Function, getAll: Function, log: Function}}
 * @constructor
 */
function QS(strUrl) {
  var _qs = {
    /** @property {string} version - Current library version */
    version: QS.version,

    /** @property {string} url - Url to parse */
    url: (strUrl || (window && window.location.href)),

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
      return _qs.tokens[strKey];
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
     * Sets (update or insert) a query string token and then updates URL property
     * @name set
     * @param {string} strKey - Query string key name to set (update or insert)
     * @param {object} objValue - Query string value (plain, decoded)
     * @example
     * QS('http://www.somedomain.com/somepage?foo=bar').set('dom', true);
     * @returns QS (for chaining purposes)
     */
    set: function (strKey, objValue) {
      _qs.tokens[strKey] = objValue;
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

  // Cast values of tokens:
  function _cast(objValue) {
    // Null value:
    if (objValue === null) {
      return;
    }

    // Numeric value:
    if (!isNaN(objValue)) {
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

  QS.version = '0.3.8';

  /**
   * Update url property (usually after manipulating query string tokens)
   * @name _updateURL
   * @ignore
   * @private
   */
  function _updateURL() {
    var strUpdatedUrl = '',
      strBaseURL = _qs.url.substr(0, (_qs.url.indexOf('?') > 0 && _qs.url.indexOf('?')) || _qs.url.length),
      strHash = _qs.url.indexOf('#') > 0 && _qs.url.substr(_qs.url.indexOf('#'));
      arrTokens = [];

    // Compose query strings:
    for (var key in _qs.tokens) {
      if (_qs.tokens.hasOwnProperty(key)) {
        arrTokens.push(encodeURIComponent(key) + (_qs.tokens[key] ? '=' + encodeURIComponent(_qs.tokens[key]) : ''));
      }
    }

    // Set updated url to base + qs + hash:
    strUpdatedUrl = strBaseURL;
    strUpdatedUrl += (arrTokens.length > 0 ? '?' + arrTokens.join('&') : '');
    strUpdatedUrl += (strHash && strHash.length > 0 ? strHash : '');

    _qs.url = strUpdatedUrl;
  }

  /**
   * Extracts all query string tokens from url
   * @constructs
   */
  (function _init() {
    var re = /[?&]([^=&#]+)(?:=([^&#]+))?/g,
      match;

    match = re.exec(_qs.url);
    while (match !== null) {
      // Register _qs keys as object's properties:
      _qs.tokens[decodeURIComponent(match[1])] = match[2] ? _cast(decodeURIComponent(match[2])) : null;
      match = re.exec(_qs.url);
    }

    // We update URL to apply encoded query string token, if user hasn't done it:
    _updateURL();
  })();

  // Reveal methods & properties:
  return _qs;
}