/**
 * @param {string} [strUrl] Url to parse. If null than current url is taken
 */
function QS (strUrl) {
  var qs = {
    /** @property  */
    url: strUrl || window.location.href,
    /** @property  */
    tokens: {},
    /**
     * Checks if url contains specific query string
     * @name log
     */
    has: function (strKey) {
      return qs.tokens.hasOwnProperty(strKey);
    },
    /**
     * Logs query strings dictionary
     * @name log
     */
    log: function () {
      console.log(qs.tokens);
    }
  }

  // Parse URL:
  function _parse () {
    var re = /[?&](\w+)(?:=(\w+))?/g,
      match;

    // Extract tokens:
    match = re.exec(qs.url);
    while (match !== null) {
      var objValue = _cast(match[2] || null);
      // Add to global qs object:
      qs[match[1]] = objValue;
      // Register qs keys as object's properties:
      qs.tokens[match[1]] = objValue;
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

  _parse();

  return qs;
}