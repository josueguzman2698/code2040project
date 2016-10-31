// The following will call a POST call to register for code2040
var registrationUrl = "http://challenge.code2040.org/api/register";
var registerMethod = "POST";
var data = {
  "token" : "391d758b4e5cf621c44f4f0410695886",
  "github" : "https://github.com/josueguzman2698/code2040project"
};
var request = new XMLHttpRequest();
request.onload = function() {
  // info that gets sent back
  var status = request.status;
  var data = request.responseText;
}
request.open(method, url, true);
request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
request.send(data);
