console.log("Hello from the background!")
chrome.browserAction.onClicked.addListener(function(tab){
  console.log('clicked');
  debugger
  chrome.tabs.executeScript({file:"jquery.js"}, function(){
    chrome.tabs.executeScript({file:"myscript.js"});
  })
})
