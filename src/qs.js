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
  function parse () {
    var re = /[?&](\w+)(?:=(\w+))?/g,
      match;

    match = re.exec(qs.url);
    while (match !== null) {
      // Add to global qs object:
      qs[match[1]] = match[2] || null;
      // Register qs keys as object's properties:
      qs.tokens[match[1]] = match[2] || null;
      match = re.exec(qs.url);
    }
  };

  parse();

  return qs;
}