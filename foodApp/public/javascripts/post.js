function SendData(api, json) {
  
  if(api == 1) {
    apiLink = 'http://localhost:52170/api/1';
  }
  else if(api == 2) {
    apiLink = 'http://localhost:52170/api/2';
  }

  async function f() {
    const response = await fetch(apiLink, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(json)
    });
    var results = await response.json()

    if(api == 1 && results.result == 1) {
      var text = document.getElementById("userExists");
      text.classList.remove("this-is-hidden");
    }
  }

  var Redirect = () => {
    console.log("done")
  }
  f().then(Redirect);
}
