function SendData(api, json) {
  
  if(api == 1) {
    apiLink = '/api/1';
  }
  else if(api == 2) {
    apiLink = '/api/2';
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
      authInfo = {};
      authInfo.plaintext = results.ptPass;
      authInfo.encrypted = results.ePass;
      window.localStorage.setItem("user", json.username);
      window.localStorage.setItem("auth", authInfo);
      document.location.href = ("/authenticate/" + results.ptPass + "/" + results.ePass + "/" + json.username)
    }
  }

  var Redirect = () => {
    console.log("done")
  }
  f().then(Redirect);
}