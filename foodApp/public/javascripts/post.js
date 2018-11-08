function SendData(username, password) {
  sendme = {};
  sendme.username = username;
  sendme.password = password;
  
  api = 'http://localhost:52170/api/1';

  async function f() {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(sendme)
    });
    var results = await response.json()
    console.log(results)
  }

  var Redirect = () => {
    console.log("done")
  }
  f().then(Redirect);
}
