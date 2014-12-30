function QS (strUrl) {
  var qs = {
    /** @property  */
    url: strUrl || window.location.href,
    /** @property  */
    tokens: {},
    /**
     * Checks if url contains specific query string token's key
     * @name log
     */
    has: function (strKey) {
      return qs.tokens.hasOwnProperty(strKey);
    },
    /**
     * Gets query string token's value
     * @name get
     */
    get: function (strKey) {
      return qs.tokens[strKey];
    },
    /**
     * Logs all query string tokens
     * @name log
     */
    log: function () {
      console.log(qs.tokens);
    }
  }

  // Extracts all query string tokens from url:
  function _init () {
    var re = /[?&](\w+)(?:=(\w+))?/g,
      match;

    match = re.exec(qs.url);
    while (match !== null) {
      // Register qs keys as object's properties:
      qs.tokens[match[1]] = _cast(match[2] || null);
      match = re.exec(qs.url);
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

  _init();

  return qs;
}