# Pure CSS Minesweeper

I analysed the [pure CSS minesweeper](https://codepen.io/bali_balo/pen/BLJONk) game by [Bali Balo](https://codepen.io/bali_balo/) at codepen. It's a wonderful game, which reminds me of windows XP and being a kid. CSS is not generally thought of as a 'programming' language, which makes the code so much more interesting. It uses CSS features in very unintentional manners.

<p align="center">
  <img width=600px  src="https://imgur.com/4cCBSa2.png">
</p>

## Method of Analysis

The game is writted in Haml and SCSS which are both just user friendly ways of writing HTML and CSS respectively. But they also provide some additional functionality, e.g. variables in SCSS which are absent in CSS. The variables are replaced with their value when the actual CSS is compiled. I wanted to make sure that I was studying the pure CSS and not SCSS, so I looked only at the compiled CSS and that is what I will be discussing today. I also used [this](https://github.com/imsun/CSS-Minesweeper) CSS minesweeper game to get a better understanding of the game. I found it helpful to consider a simpler version of the game comprising of a minefield of 2x1 boxes.

<p align="center">
  <img width=600px  src="https://i.imgur.com/mU7EwEd.jpg">
</p>

The HTML code is pretty basic, it simply enlists all the elements and gives them id and class that CSS can then modify.

## Analysis of the CSS

The minesweeper game can be divided into the following essential components:

### *Timer*

<p align="center">
  <img width=600px  src="https://imgur.com/ODPV6pe.png">
</p>

This is disconnected from all the other game elements and works independently. Many pure CSS timers exist and more or less all of them depend on the animate property of CSS. And they are fairly accurate. The timer on minesweeper was accurate to <5 seconds over two hours(0.07% or 700ppm) typical quartz clocks are 0.001% or 10 ppm accurate.
    * https://codepen.io/toaster99/pen/zNgdgo
    * https://codepen.io/stikoo/pen/GpGgdd?editors=1100

<p align="center">
  <img width=600px  src="https://i.imgur.com/2sdZsEn.jpg">
</p>

The timer can be thought of as a list of numbers. Most of the list is outside the field of the timer and is therefore not rendered. To show a number, the list is slid up to that number. This is done using animation.

In this particular case, timer is implemented using [keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes). If keyframes were not defined, the timer would roll like Each second/tens of second/minute digit is a long list of digits. The animation slides the list up by one digit per keyframe. The animation is infinitely long but will eventually repeat from 000:00 after 999min 99 sec().

Note that the content of the digit is added in CSS, not in the HTML. This is done by using the [content](https://developer.mozilla.org/en-US/docs/Web/CSS/content) and [:after](https://developer.mozilla.org/en-US/docs/Web/CSS/::after) or [:before](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) property. It essentially allows us to add text before or after some HTML element. This text can be styled/animated natively in CSS.

    .timer .digit:before {
      content: "0";
      visibility: hidden;
    }

This code adds a '0' before every digit in timer and hides it. For more complicated selections, the [:nth-last-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-child) property is used. As the name suggests, it selects the n'th last child of the class, reading from top of the HTML.

    .timer .digit:nth-last-child(4):after {
      animation-duration: 600s;
    }

This selects the 4th last digit from the HTML and sets it's animation-duration to 600s. It is in fact the minutes display counter which should roll over 10 digits in ten minutes(600s).

Finally, [animation play state](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state) property is used to stop and start the timer.

To understand the timer better, I extracted just the timer CSS bits and modified them a bit. The pure CSS timer that resulted can be found [here.](https://codepen.io/tinkrmind/pen/dmmPYy)

<p align="center">
  <img width=600px  src="https://i.imgur.com/COVQz95.png">
</p>

### *Action selector*

<p align="center">
  <img width=600px   src="https://imgur.com/Alm9Bm3.png">
</p>

Radio buttons to toggle between mining and flagging. These are relatively simple. But are used very cleverly. The two positions are #modeFlag and #modeMine. Since the action selector is radio type check-box, only one can be selected at a time.

### *Grid*

<p align="center">
  <img width=600px  src="https://imgur.com/8fYeZmd.png">
</p>

The main play arena is a field of what amounts to check-boxes. There are in fact two checkboxes for each mine block. One that keeps track of the flags and another that keeps tracks of the clicks. They are id'ed #c$ and #f$ for clicks and flags and $ is  anumber from 1 to the total number of boxes.

The [tilde selector](https://stackoverflow.com/questions/10782054/what-does-the-tilde-squiggle-twiddle-css-selector-mean) is used to select particular divs. .a ~ .b will match all b elements that appear next to and after a elements. It's used to show the flag check-boxes when the flag action selector is used in this manner:

    #modeFlag:checked ~ .grid .flags {
      visibility: visible;
    }

Here we select all grid flags that appear after a checked #modeFlag id(the action selector) and make them visible. If the #modeFlag id is not checked, then none of the grid flags will be selected and therefore will remain invisible, revealing the mine type check-boxes underneath.

Mine positions are hard-coded in the compiled CSS, but the SCSS offers a random() function which is used to set the mine positions randomly in codepen.

Victory and Defeat are simply buttons at the same location as the grid and are generally hidden. On error or victory condition they are shown. Victory condition for example is if all the flags are on top of mines and none of the others. In case of a simple two box minesweeper the condition looks like this:

    #f1:checked ~ #f2:not(:checked) ~ .grid .victory {
      opacity: 1;
      visibility: visible;
    }

For a 6x6 game there are 36 flags to check. Yeah, the CSS does not look pretty.

    #f1:not(:checked) ~ #f2:not(:checked) ~ #f3:not(:checked) ~ #f4:not(:checked) ~ #f5:checked ~ #f6:not(:checked) ~ #f7:not(:checked) ~ #f8:not(:checked) ~ #f9:not(:checked) ~ #f10:checked ~ #f11:checked ~ #f12:not(:checked) ~ #f13:not(:checked) ~ #f14:not(:checked) ~ #f15:not(:checked) ~ #f16:not(:checked) ~ #f17:checked ~ #f18:not(:checked) ~ #f19:not(:checked) ~ #f20:not(:checked) ~ #f21:not(:checked) ~ #f22:not(:checked) ~ #f23:not(:checked) ~ #f24:not(:checked) ~ #f25:not(:checked) ~ #f26:not(:checked) ~ #f27:not(:checked) ~ #f28:not(:checked) ~ #f29:checked ~ #f30:not(:checked) ~ #f31:not(:checked) ~ #f32:not(:checked) ~ #f33:not(:checked) ~ #f34:not(:checked) ~ #f35:not(:checked) ~ #f36:not(:checked) ~ .grid .victory {
      opacity: 1;
      visibility: visible;
    }

Similarly, the end game or error condition is detected when a check-box on a mine is clicked. It's easy to detect that with the following code:

    #c1:checked ~ .grid .error {
      opacity: 1;
      visibility: visible;
    }

This doesn't get quite as complicated with scale. Instead of having more complicated checks, there are simply more of them. One for every mine.

### *Counter*

<p align="center">
  <img width=600px  src="https://imgur.com/s2nDh2z.png">
</p>
To count the number of remaining flags. CSS has support for [counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters), generally used to number headings for example.

The total number of mines is hard-coded as the starting position of the counter. The counter is decremented by selecting all the flag checkboxes that are selected and decrementing the counter by one for each.

    input[id^="f"]:checked {
      counter-increment: mines -1;
    }

[You can use RegEx in selectors!](https://stackoverflow.com/questions/8903313/using-regular-expression-in-css). That's what's done in all the id^='f' business. It selects any id that starts with 'f'; i.e. the flag check-boxes.
