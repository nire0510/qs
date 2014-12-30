/**
 *
 * @param strUrl {string} [strUrl] - Url to parse. If not specified then current URL is taken
 * @returns {{url: String, tokens: {}, has: Function, get: Function, getAll: Function, log: Function}}
 * @constructor
 */
function QS (strUrl) {
  var _qs = {
    /** @property {string} url - Url to parse */
    url: strUrl || window.location.href,

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
     * Gets query string token's value
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
  (function _init () {
    var re = /[?&](\w+)(?:=(\w+))?/g,
      match;

    match = re.exec(_qs.url);
    while (match !== null) {
      // Register _qs keys as object's properties:
      _qs.tokens[match[1]] = _cast(match[2] || null);
      match = re.exec(_qs.url);
    }

    // Cast values of tokens:
    function _cast (objValue) {
      // Null value:
      if (objValue === null) {
        return;
      }

      // Numeric value:
      if (objValue.match(/\d+/)) {
        return Number(objValue);
      }

      // Boolean value:
      if (objValue.match(/true|false/)) {
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

  // Reveal methods & properties:
  return _qs;
}