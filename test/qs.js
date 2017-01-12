describe('QS Library', function() {
  var strURLNoQS = 'http://www.site.com',
    strURLSingleQS = strURLNoQS + '?foo=bar',
    strURLMultipleQS = strURLNoQS + '?foo=bar&nir=baz',
    strURLWithSpecialCharactersQS = strURLNoQS + '?email=nire0510%40gmail.com',
    strURLMultipleAndValueOnlyQS = strURLNoQS + '?foo=bar&nir';
    strURLWithFalseValue = strURLNoQS + '?flag=false';
    strURLWithArray = strURLNoQS + '?cars[]=Audi&cars[]=BMW&cars[]=Opel';

  it('QS object', function() {
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

  it('has function', function() {
    expect(QS(strURLNoQS).has('foo')).toBeFalsy();
    expect(QS(strURLSingleQS).has('foo')).toBeTruthy();
    expect(QS(strURLMultipleQS).has('foo')).toBeTruthy();
    expect(QS(strURLMultipleQS).has('nir')).toBeTruthy();
    expect(QS(strURLWithArray).has('cars[]')).toBeTruthy();
  });

  it('get function', function() {
    expect(QS(strURLNoQS).get('foo')).toBeUndefined();
    expect(QS(strURLSingleQS).get('foo')).toEqual('bar');
    expect(QS(strURLSingleQS).get('bar', 'baz')).toEqual('baz');
    expect(QS(strURLMultipleQS).get('foo')).toEqual('bar');
    expect(QS(strURLMultipleQS).get('nir')).toEqual('baz');
    expect(QS(strURLWithSpecialCharactersQS).get('email')).toEqual('nire0510@gmail.com');
    expect(QS(strURLWithFalseValue).get('flag')).toBeFalsy();
    expect(QS(strURLWithArray).get('cars[]')).toEqual([ 'Audi', 'BMW', 'Opel' ]);
    // Check casting:
    expect(QS(strURLNoQS).set('num', 345).get('num')).toEqual(345);
    expect(QS(strURLNoQS).set('num', 345.56).get('num')).toEqual(345.56);
    expect(QS(strURLNoQS).set('bool', true).get('bool')).toBeTruthy();
    expect(QS(strURLNoQS).set('bool', false).get('bool')).toBeFalsy();
    expect(QS(strURLNoQS).set('nullval', null).get('nullval')).toBeUndefined();
    expect(QS(strURLNoQS).set('undefinedval', undefined).get('undefinedval')).toBeUndefined();
  });

  it('getAll function', function() {
    expect(JSON.stringify(QS(strURLNoQS).getAll())).toEqual('{}');
    expect(QS(strURLMultipleQS).getAll().hasOwnProperty('foo')).toBeTruthy();
  });

  it('remove function', function() {
    expect(QS(strURLNoQS).remove('bla').url).toEqual(strURLNoQS);
    expect(QS(strURLSingleQS).remove('foo').url).toEqual(strURLNoQS);
    expect(QS(strURLSingleQS).remove('notexists').url).toEqual(strURLSingleQS);
    expect(QS(strURLMultipleQS).remove('nir').url).toEqual(strURLSingleQS);
  });

  it('set function', function() {
    expect(QS(strURLNoQS).set('foo', 'bar').url).toEqual(strURLSingleQS);
    expect(QS(strURLSingleQS).set('nir', 'baz').url).toEqual(strURLMultipleQS);
    expect(QS(strURLSingleQS).set('nir').url).toEqual(strURLMultipleAndValueOnlyQS);
    expect(QS(strURLMultipleQS).set('mon', 'ger').url).toEqual(strURLMultipleQS + '&mon=ger');
  });

  it('version property', function() {
    expect(QS().version).toEqual('0.4.7');
    expect(QS.version).toEqual('0.4.7');
  });
});
