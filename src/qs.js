/**
 * @param {string} [strUrl] Url to parse. If null than current url is taken
 * @constructor
 */
function QS (strUrl) {
  this.url = strUrl || window.location.href;
  this.qs = {};

  return this;
}

/**
 * Extracts query string tokens from url
 * @name extract
 */
QS.prototype.extract = function () {
  var re = /[?&](\w+)(?:=(\w+))?/g,
    match;

  match = re.exec(this.url);
  while (match !== null) {
    this.qs[match[1]] = match[2] || null;
    this[match[1]] = match[2] || null;
    match = re.exec(this.url);
  }

  return this;
}

/**
 * Logs query strings dictionary
 * @name log
 */
QS.prototype.log = function () {
  console.log(this.qs);
  return this;
}