//helper function
function simplePost( myUrl, myData, myFunc){
  $.ajax({
    type: "POST",
    url: myUrl,
    data: myData,
    complete: myFunc
  });
}

// The following will call a POST call to register for code2040
function register(){
  var myUrl = "http://challenge.code2040.org/api/register";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
    "github" : "https://github.com/josueguzman2698/code2040project"
  };
  simplePost( myUrl, myData, function(){});
}

//this will recieve a string which needs to be reversed
function getReverse(){
  //set up necessary variables
  var myUrl ="http://challenge.code2040.org/api/reverse";
  var myData={
    "token" : "391d758b4e5cf621c44f4f0410695886"
  };
  simplePost( myUrl, myData, function(r){
    sendReversedString(reverseText(r.responseText));
  });
}

function reverseText(str){
  var reversed = "",
      length = str.length - 1;
  for(var i = length; i >= 0; i--){
    reversed = reversed + str[i];
  }
  return reversed;
}

function sendReversedString(datum){
  var myUrl = "http://challenge.code2040.org/api/reverse/validate";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
    "string" : datum
  };
  simplePost( myUrl, myData, function(){});
}

function getNeedleAndHaystack(){
  var myUrl = "http://challenge.code2040.org/api/haystack";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
  }
  simplePost( myUrl, myData,   function (r){
      var needleAndHaystack = JSON.parse(r.responseText),
          need = needleAndHaystack["needle"],
          hay = needleAndHaystack["haystack"],
          location = findLocationInHaystack(need, hay);
      sendLocation(location);
    });
}

function findLocationInHaystack(need, hay){
  for ( i=0; i<hay.length; i++){
    if(hay[i] == need)
      return i;
  }
}

function sendLocation(loc){
  var myUrl = "http://challenge.code2040.org/api/haystack/validate";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
    "needle" : loc
  };
  simplePost( myUrl, myData, function(){});
}

function getPrefix(){
  var myUrl = "http://challenge.code2040.org/api/prefix";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
  }
  simplePost( myUrl, myData, function(r) {
    var response = JSON.parse(r.responseText),
        prefix = response.prefix,
        arr = response.array,
        arrayWithRemovedPrefixes = removePrefixes(prefix, arr);
    sendPrefix(arrayWithRemovedPrefixes);
  });
}

function removePrefixes(pre, arr){
  var modifiedArray = [];
  for( var i = 0; i < arr.length; i++){
    if (arr[i].length < pre.length)
      modifiedArray.push(arr[i]);
    else if (!(pre == arr[i].substring(0, pre.length)))
      modifiedArray.push(arr[i]);
  }
  return modifiedArray;
}

function sendPrefix(arr){
  var myUrl = "http://challenge.code2040.org/api/prefix/validate";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
    "array" : arr
  };
  simplePost( myUrl, myData, function(){});
}





// IMPORTANT SECTION
function getDateStamp(){
  var myUrl = "http://challenge.code2040.org/api/dating";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886"
  };
  simplePost( myUrl, myData, function(r){
    var response = JSON.parse(r.responseText),
        //converts the ISO 8601 to a Unix timestamp
        date = Date.parse(response.datestamp),
        //converts interval to milliseconds
        interval = response.interval*1000;
    var sumDate  = date + interval,
        convertedDate = new Date(sumDate);
    finalDate = moment(convertedDate).format("YYYY-MM-DDThh:mm:ss");
    console.log(finalDate);
    finalDate = moment(finalDate).add(5, "hours").format("YYYY-MM-DDThh:mm:ss");
    console.log( convertedDate, finalDate);
    sendDateStamp(finalDate + "Z");
  });
}

function sendDateStamp(time){
  var myUrl = "http://challenge.code2040.org/api/dating/validate";
  var myData = {
    "token" : "391d758b4e5cf621c44f4f0410695886",
    "datestamp" : time
  };
  simplePost( myUrl, myData, function(){});
}
