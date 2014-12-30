/**
 * @param {string} [strUrl] Url to parse. If null than current url is taken
 * @constructor
 */
function QS (strUrl) {
  this.url = strUrl || window.location.href;
  this.qs = {};

  // Extracts all tokens:
  function parse () {
    var re = /[?&](\w+)(?:=(\w+))?/g,
      match;

    match = re.exec(this.url);
    console.log(this.url);
    while (match !== null) {
      // Add to global qs object:
      this.qs[match[1]] = match[2] || null;
      // Register qs keys as object's properties:
      this[match[1]] = match[2] || null;
      match = re.exec(this.url);
    }
  }

  // Parse URL with current object context:
  parse.call(this);

  return this;
}

/**
 * Logs query strings dictionary
 * @name log
 */
QS.prototype.log = function () {
  console.log(this.qs);
}

/**
 * Checks if url contains specific query string
 * @name log
 */
QS.prototype.has = function (strKey) {
  return this.qs.hasOwnProperty(strKey);
}