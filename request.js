
// The following will call a POST call to register for code2040
function register(){
  var myUrl = "http://challenge.code2040.org/api/register";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
    "github" : "https://github.com/josueguzman2698/code2040project"
  };
  $.ajax({
    type: "POST",
    url: myUrl,
    data: myData,
  });
}

//this will recieve a string which needs to be reversed
function getString(){
  var myUrl ="http://challenge.code2040.org/api/reverse"
  var myData={
    "token" : "391d758b4e5cf621c44f4f0410695886"
  };
  $.ajax({
    type: "POST",
    url: myUrl,
    data: myData,
    complete: function(r) {
        var text = r.responseText;
        console.log(text);
        var backwards = reverseText(text);
        console.log(backwards);
        sendReversedString(reverseText(text));
    }
  });
}

function reverseText(str){
  var reversed = "";
  var length = str.length - 1;
  for(var i = length; i >= 0; i--){
    reversed = reversed + str[i];
  }
  return reversed;
}

function sendReversedString(datum){
  var myUrl = "http://challenge.code2040.org/api/reverse/validate"
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
    "string" : datum
  };
  $.ajax({
    type: "POST",
    url: myUrl,
    data: myData,
    complete: function(r){}
  });
}

function findNeedle(){
  var myUrl = "http://challenge.code2040.org/api/haystack"
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
  }
  $.ajax({
    type: "POST",
    url: myUrl,
    data: myData,
    complete: function(r){
      var parsedR = JSON.parse(r.responseText);
      var needleAndHaystack = parsedR;
      console.log(needleAndHaystack);
      var need = needleAndHaystack["needle"];
      var hay = needleAndHaystack["haystack"];
      console.log(need, hay);
      var location = locationInHaystack(need, hay);
      console.log(location);
      sendLocation(location);
    }
  });
}
function locationInHaystack(need, hay){
  for ( i=0; i<hay.length; i++){
    if(hay[i] == need){
      return i;
    }
  }
}
function sendLocation(loc){
  var myUrl = "http://challenge.code2040.org/api/haystack/validate";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
    "needle" : loc
  };
  $.ajax({
    type: "POST",
    url: myUrl,
    data: myData,
  });
}
