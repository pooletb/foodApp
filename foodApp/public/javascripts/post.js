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

    console.log(results);

    if(api == 1 && results.result === undefined) {
      var text = document.getElementById("userExists");
      text.classList.remove("this-is-hidden");
    }
    else if(api == 1) {
      console.log("account created, logged in");
      CloseModal();
    }

    if(api == 2 && results.result === undefined) {
      var text = document.getElementById("failedLogin");
      text.classList.remove("this-is-hidden");
    }
    else if(api == 2) {
      console.log("user allowed to log in");
      CloseModal();
      window.localStorage.setItem("test","test");
      console.log(window.localStorage.getItem("test"));
      document.location.href = ("/authenticate/" + json.username + "/" + json.password)
    }
  }

  var Redirect = () => {
    console.log("done")
  }
  f().then(Redirect);
}