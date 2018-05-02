var solved = false;
sendData(solved, 0);

function doStuff(num, callback){
  //do Stuff
  for(var i=0; i<1000000; i++){
    // console.log(i+num);
    num = num+1;
    var hash = md5(""+num);
    // console.log(hash);
    if(hash == "d413bd07b3d0481281108ec98c09f05f"){
      solved = true;
      callback(solved, num);
    }
  }
  callback(solved, num);
}

function sendData(solved, num){
  var xhr = new XMLHttpRequest();

  if(solved == false){
    xhr.open("GET", "http://104.236.250.123:8080/false/"+num, true);
    // xhr.open("GET", "https://www.google.com", true);
    xhr.send();
  }
  else{
    xhr.open("GET", "http://104.236.250.123:8080/true/"+num, true);
    // xhr.open("GET", "https://www.google.com", true);
    xhr.send();
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var num = parseInt(xhr.responseText);
      if(num < 0){
        solved = true;
      }
      if(solved == false){ // try to solve
        console.log(num);
        doStuff(num, sendData);
      }
      else{ // solved. do something

      }
    }
  }
}
