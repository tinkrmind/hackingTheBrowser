# Hacking the Browser

This is my code repo and blog for [Hacking the Browser](www.hackingthebrowser.com) class at ITP, Spring 2018.

# Class Presentation

### [Pure CSS Minesweeper](https://github.com/tinkrmind/hackingTheBrowser/tree/master/pureCSSminesweeper)

# Final Project: won't you join my botnet?

Citizen Science projects like the [@home](https://en.wikipedia.org/wiki/List_of_distributed_computing_projects) projects using [BOINC](https://boinc.berkeley.edu/), electric sheep and more allow anyone to lend some compute power to science projects. I myself have lent my old laptop to [LHC@home](https://en.wikipedia.org/wiki/LHC@home). But this process is rarely seamless and involves installing additional software. Since installing chrome extensions is a painless process, I thought it'd be nice to do the same with an extension. Of course, this is an age old concept. But, I couldn't find any examples of citizen science extensions.

As a cheeky demo of this idea I have made an extension tat allows you to join my botnet.. ahem, shared compute power resource. I'm using shared compute to brute-force a md5 hashed password. The brute-forcing function expects input in the form of a string. It runs through the next 10,000 alphanumeric characters on the string and returns true/false depending if the password was found. When you install the extension, a background script establishes connection to the handler server which keeps track of which strings have been tried. If the server does not receive a response from the extension in 10 minutes, it marks the string as untried. This continues until the password is cracked.

JS is not a language best suited for scientific computing. It's just not designed for close to the metal use. But there are some JS libraries like [WebGL](https://docs.unity3d.com/Manual/webgl-performance.html) that are fairly efficient for some calculations. But given the ease of installation and relative ease of development, citizen science extensions have non-zero potential.

### References/interesting links:

* [MD5 lirary for JS](https://github.com/blueimp/JavaScript-MD5)
* [Electric sheep: crowd sourced art](https://electricsheep.org/)

### What I'd like to improve upon

* Monitor number of users
* Display realtime stats on the popup window
* If a user does not return compute result for a long time, resend it to the next user
*

# Week 4

### [Homework](https://github.com/tinkrmind/hackingTheBrowser/tree/master/warning)

Turned the bookmarklet into a Chrome extension. Clicking on the extension button makes the page unresponsive by calling a print function repeatedly, keeping the stack busy so for example the click events are never executed.

*Warning*: A few times this made Chrome unresponsive to the point where I could not even close the tab. So I had to close Chrome from the Activity Monitor. If you have any important tabs open, I'd suggest you not to try it.

### Show Password

is a simple bookmarklet that shows the saved passwords normally shown as asterisks.

```
href="javascript:(function(){var%20s,F,j,f,i;%20s%20=%20"";%20F%20=%20document.forms;%20for(j=0;%20j<F.length;%20++j)%20{%20f%20=%20F[j];%20for%20(i=0;%20i<f.length;%20++i)%20{%20if%20(f[i].type.toLowerCase()%20==%20"password")%20s%20+=%20f[i].value%20+%20"\n";%20}%20}%20if%20(s)%20alert("Passwords%20in%20forms%20on%20this%20page:\n\n"%20+%20s);%20else%20alert("There%20are%20no%20passwords%20in%20forms%20on%20this%20page.");})();"

```
Here is the code in better format:
```
'use strict';
javascript: {
  (function() {
    var s;
    var forms;
    var j;
    var form;
    var i;
    /** @type {string} */
    s = "";
    /** @type {!HTMLCollection<HTMLFormElement>} */
    forms = document.forms;
    /** @type {number} */
    j = 0;
    for (; j < forms.length; ++j) {
      /** @type {!HTMLFormElement} */
      form = forms[j];
      /** @type {number} */
      i = 0;
      for (; i < form.length; ++i) {
        if (form[i].type.toLowerCase() == "password") {
          /** @type {string} */
          s = s + (form[i].value + "\n");
        }
      }
    }
    if (s) {
      alert("Passwords in forms on this page:\n\n" + s);
    } else {
      alert("There are no passwords in forms on this page.");
    }
  })();
};
```
It is simply checking for forms in the DOM and finding the form elements of type password. It then displays the value of that element as a string in a pop-up. Easypeasy.

### An interesting Chrome extension: [Video Speed controller](https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk)

It allows you to change the playback speed of HTML5 videos. So, youtube, netflix, vimeo.. pretty much anything. I use it regularly and find it to be quite useful!

# Week 3

### [Homework](https://codepen.io/tinkrmind/pen/BxozGz)

I was making a bookmarklet to delete prices from items on Amazon. While experimenting with it, I realized that I had created an infinite loop of console.log, which made the page completely unresponsive. Since the aim was to make a bookmarklet that works against the user, I figured my job is done!

*Warning*: A few times this made Chrome unresponsive to the point where I could not even close the tab. So I had to close Chrome from the Activity Monitor. If you have any important tabs open, I'd suggest you not to try it.

# Week 2

### [Homework](https://codepen.io/tinkrmind/pen/yKqpeJ)

[When the cat is away](https://codepen.io/tinkrmind/pen/yKqpeJ) is a webpage that behaves differently when you're around vs when you're away. It uses the webcam to detect faces, and when no one is around, it reveals a secret. I was influenced by the in class demos of webpages behaving differently when they're off focus. And there's some influence from toy story as well.

# Week 1

### [Homework](https://codepen.io/tinkrmind/pen/yKpXov)

Toggles the background color of a HTML document between yellow and a random color when a button is pressed.
