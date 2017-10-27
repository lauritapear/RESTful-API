var Client = require('node-rest-client').Client;

var client = new Client();

// direct way
client.get("http://localhost:3005/v1/restaurant", function (data, response) {
    // parsed response body as js object
    //console.log(data);
    // raw response
    //console.log(response);

    if(response.statusCode === 200){
      try {
        // var parsedData = JSON.parse(data);
        console.log(data)
      } catch(error) {
        console.log(error);
      }
    }
    else {
      console.log(http.STATUS_CODES[response.statusCode]);
    }
  });


  // set content-type header and data as json in args parameter
  var args = {
      data: { name: "Havana Rumba" },
      headers: { "Content-Type": "application/json" }
  };

  client.post(" http://localhost:3005/v1/restaurant/add", args, function (data, response) {
      // parsed response body as js object
      console.log(data);
      // raw response
      console.log(response);
  });
