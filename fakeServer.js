(function() {

  var server = sinon.fakeServer.create({
    autoRespond: true
  });
  server.respondWith('GET', '/api', JSON.stringify({
    "msg": "OK"
  }) ) ;
  server.respondWith('GET', '/api/todos', JSON.stringify([
    {
      "id": "1",
      "title": "read emails",
      "completed": true
    },
    {
      "id": "2",
      "title": "read news",
      "completed": true
    },
    {
      "id": "3",
      "title": "take a break",
      "completed": false
    }
  ]));
  server.respondWith('PUT', /\/api\/todos\/(\d+)/, function(xhrFake, id) {
    var response;
    response = JSON.parse( xhrFake.requestBody );
    response.completed = !response.completed;
    xhrFake.respond( 200, {}, JSON.stringify( response ) );
  } );
  server.respondWith('POST', '/api/todos', function(xhrFake) {
    var response;
    response = JSON.parse( xhrFake.requestBody );
    response.id = Date.now();
    xhrFake.respond( 200, {}, JSON.stringify( response ) );
  } );
  server.respondWith('DELETE', '/api/todos', function(xhrFake) {
    xhrFake.respond( 200, {}, JSON.stringify( {
      "msg": "OK"
    } ) );
  });
  server.respondWith('DELETE', /\/api\/todos\/(\d+)/, function(xhrFake, id) {
    xhrFake.respond( 200, {}, JSON.stringify( {
      "msg": "OK"
    } ) );
  });

})();
