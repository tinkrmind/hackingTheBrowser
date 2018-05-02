var solved = false;
var password = -1;
sendData(solved, 0);

function doStuff(num, callback){
  //do Stuff
  for(var i=0; i<1000000; i++){
    // console.log(i+num);
    num = num+1;
    var hash = md5(""+num);
    // console.log(hash);
    // if(hash == "e2ffa1458e17ca5ba93db1eea71bc3e8"){ // ~1 billion
    if(hash == "655f7cff3e9532f4a034500bb3205a5f"){ // ~40 million
    // if(hash == "f58decb455e9937c6b8f54a237a2ca05"){ // ~4 million
      console.log(num);
      solved = true;
      password = num;
      callback(solved, num);
    }
  }

  callback(solved, num);
}

function sendData(solved, num){
  // doStuff(num, sendData);
  var xhr = new XMLHttpRequest();

  if(solved == false){
    xhr.open("GET", "http://104.236.250.123:8080/false/"+num, true);
    // xhr.open("GET", "https://www.google.com", true);
    xhr.send();
  }
  else{
    xhr.open("GET", "http://104.236.250.123:8080/true/"+password, true);
    // xhr.open("GET", "https://www.google.com", true);
    xhr.send();
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var num = parseInt(xhr.responseText);
      if(num < 0){
        solved = true;
        console.log("HURRAY! The password is "+password)
        var newURL = "http://104.236.250.123:8080/hurray";
        chrome.tabs.create({ url: newURL });
      }
      if(solved == false){ // try to solve
        console.log(num);
        doStuff(num, sendData);
      }
      else{ // TODO: solved. do something

      }
    }
  }
}
