var file = "";
var filebase64 = "";

function build() {
  var fileobject = document.getElementById("fileid");
  file = fileobject.files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(event) {
    filebase64 = fileReader.result.replace('data:', '').replace(/^.+,/, '');
    generatehtml();
  }
  fileReader.readAsDataURL(file);
}

function xor(input) {
  var result = "";
  var password = document.getElementById("passwordid").value;
  for (i = 0; i < input.length; ++i) {
    result += String.fromCharCode(password.charCodeAt(i % password.length) ^ input.charCodeAt(i));
  }
  return result;
}

function generatehtml() {
  let css = `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f4;
  }

  header {
    background-color: #0056b3;
    color: white;
    padding: 20px;
    text-align: center;
    width: 100%;
  }

  main {
    flex: 1;
    padding: 20px;
    max-width: 800px;
    width: 100%;
  }

  h1 {
    color: #fffada; /* Changed color to #bf2c34 */
  }

  h2 {
    color: #fffada; /* Changed color to #bf2c34 */
  }

  input[type="file"], input[type="password"], input[type="text"] {
    display: block;
    margin: 10px 0;
    padding: 10px;
    width: 100%;
  }

  button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  footer {
    background-color: #0056b3;
    color: white;
    padding: 10px;
    text-align: center;
    width: 100%;
    margin-top: auto;
  }

  #output {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  `;

  let htmlstring = `<!DOCTYPE html>
  <html>
  <head>
  <meta charset='UTF-8'>
  <title>${file.name}</title>
  <style>${css}</style>
  </head>
  <body>
  <header>
      <h1>HTML Smug</h1>
  </header>
  <main>
      <h2>Retrieve your file</h2>
      <table border=0>
      <tr>
        <td>File: </td>
        <td>${file.name}</td>
      </tr>
      <tr>
        <td>Size: </td>
        <td>${file.size.toLocaleString()} bytes</td>
      </tr>
      <tr>
        <td>Message: </td>
        <td>${document.getElementById("textid").value}</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><input type=password id=passwordid placeholder=password><br><button onclick="retrieve()">Retrieve File</button></td>
      </tr>
      </table>
      <div id="output"></div>
  </main>
  <footer>
      <p>© 2024 Krishna Gopal Jha</p>
  </footer>
  <script>
  function b64toarray(base64) {
    var bin_string = window.atob(base64);
    var len = bin_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = bin_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function retrieve() {
    var binary = xor(atob('${btoa(xor(filebase64))}'));
    var data = b64toarray(binary);
    var bobject = new Blob([data], { type: 'octet/stream' });
    var targetfilename = '${file.name}';
    var hiddenobject = document.createElement(String.fromCharCode(97));
    document.body.appendChild(hiddenobject);
    hiddenobject.style = 'display: none';
    var url = window.URL.createObjectURL(bobject);
    hiddenobject.href = url;
    eval('hiddenobject' + String.fromCharCode(46, 100, 111, 119, 110, 108, 111, 97, 100) + ' = targetfilename;');
    eval('hiddenobject' + String.fromCharCode(46, 99, 108, 105, 99, 107, 40, 41) + ';');
    window.URL.revokeObjectURL(url);
  }

  function xor(input) {
    var result = '';
    var password = document.getElementById('passwordid').value;
    for (i = 0; i < input.length; ++i) {
      result += String.fromCharCode(password.charCodeAt(i % password.length) ^ input.charCodeAt(i));
    }
    return result;
  }
  </script>
  </body>
  </html>`;

  var targetfilename = file.name + ".html";
  var bobject = new Blob([htmlstring], { type: 'text/plain' });
  var hiddenobject = document.createElement(String.fromCharCode(97));
  document.body.appendChild(hiddenobject);
  hiddenobject.style = 'display: none';
  var url = window.URL.createObjectURL(bobject);
  hiddenobject.href = url;
  eval('hiddenobject' + String.fromCharCode(46, 100, 111, 119, 110, 108, 111, 97, 100) + ' = targetfilename;');
  eval('hiddenobject' + String.fromCharCode(46, 99, 108, 105, 99, 107, 40, 41) + ';');
  window.URL.revokeObjectURL(url);
  document.getElementById("output").innerText = file.name + " is converted and downloaded as " + file.name + ".html";
}
