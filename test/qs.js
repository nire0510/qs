describe("QS Library", function() {
  var strURLNoQS = 'http://www.site.com',
    strURLSingleQS = strURLNoQS + '?foo=bar',
    strURLMultipleQS = strURLNoQS + '?foo=bar&nir=baz',
    strURLMultipleAndValueOnlyQS = strURLNoQS + '?foo=bar&nir';

  it("QS object", function() {
    expect(QS).toBeDefined();
    expect(QS().url).toBeDefined();
    expect(QS(strURLNoQS).url).toEqual(strURLNoQS);
    expect(QS().tokens).toBeDefined();
    expect(typeof QS().has).toEqual('function');
    expect(typeof QS().get).toEqual('function');
    expect(typeof QS().getAll).toEqual('function');
    expect(typeof QS().log).toEqual('function');
    expect(typeof QS().set).toEqual('function');
    expect(typeof QS().remove).toEqual('function');
    expect(typeof QS().go).toEqual('function');
  });

  it("has function", function() {
    expect(QS(strURLNoQS).has('foo')).toBeFalsy();
    expect(QS(strURLSingleQS).has('foo')).toBeTruthy();
    expect(QS(strURLMultipleQS).has('foo')).toBeTruthy();
    expect(QS(strURLMultipleQS).has('nir')).toBeTruthy();
  });

  it("get function", function() {
    expect(QS(strURLNoQS).get('foo')).toBeUndefined();
    expect(QS(strURLSingleQS).get('foo')).toEqual('bar');
    expect(QS(strURLMultipleQS).get('foo')).toEqual('bar');
    expect(QS(strURLMultipleQS).get('nir')).toEqual('baz');
  });

  it("getAll function", function() {
    expect(JSON.stringify(QS(strURLNoQS).getAll())).toEqual('{}');
    expect(QS(strURLMultipleQS).getAll().hasOwnProperty('foo')).toBeTruthy();
  });

  it("remove function", function() {
    expect(QS(strURLNoQS).remove('bla').url).toEqual(strURLNoQS);
    expect(QS(strURLSingleQS).remove('foo').url).toEqual(strURLNoQS);
    expect(QS(strURLSingleQS).remove('notexists').url).toEqual(strURLSingleQS);
    expect(QS(strURLMultipleQS).remove('nir').url).toEqual(strURLSingleQS);
  });

  it("set function", function() {
    expect(QS(strURLNoQS).set('foo', 'bar').url).toEqual(strURLSingleQS);
    expect(QS(strURLSingleQS).set('nir', 'baz').url).toEqual(strURLMultipleQS);
    expect(QS(strURLSingleQS).set('nir').url).toEqual(strURLMultipleAndValueOnlyQS);
    expect(QS(strURLMultipleQS).set('mon', 'ger').url).toEqual(strURLMultipleQS + '&mon=ger');
  });
});