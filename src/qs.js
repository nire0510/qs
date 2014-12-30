function QS (strUrl) {
  var _qs = {
    /** @property  */
    url: strUrl || window.location.href,
    /** @property  */
    tokens: {},
    /**
     * Checks if url contains specific query string token's key
     * @name log
     * @param {string} strKey Query string token's key to search
     * @returns {boolean} True if key exists, false otherwise
     */
    has: function (strKey) {
      return _qs.tokens.hasOwnProperty(strKey);
    },
    /**
     * Gets query string token's value
     * @name get
     * @param {string} strKey Query string token's key to search
     * @returns {object} Query string token's value if key exists, otherwise null
     */
    get: function (strKey) {
      return _qs.tokens[strKey];
    },
    /**
     * Gets all query string tokens object
     * @name getAll
     * @returns {*} Query string keys & values collection
     */
    getAll: function () {
      return _qs.tokens;
    },
    /**
     * Logs all query string tokens to browser's console
     * @name log
     */
    log: function () {
      console.log(_qs.tokens);
    }
  }

  // Extracts all query string tokens from url:
  function _init () {
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
  }

  // Initialize library:
  _init();

  // Reveal methods & properties:
  return _qs;
}