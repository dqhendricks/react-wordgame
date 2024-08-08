# react-wordgame
Word game created from scratch using react, tailwind, and framer-motion.

What better way to show expertise in using React and app design than a crossword puzzle game? Built in four days, this game was my first ever attempt at using framer-motion. I have to say it was a lot of fun, though there were a few unexpected quirks in the framer-motion library I had to find a way to work around. I seem to have discovered a bug, where, if an animation strictly animates x and y coordinates, any set onAnimationComplete handlers will run immediately instead of waiting until the animation completes (for this I ended up having to add a scale parameter to the animation variant, that did nothing to the animation, but fixed the onAnimationComplete bug 😅).

Give the game a try now by [clicking here](https://dustinhendricks.com/wordgame).

Cheers!

![A screenshot of "word game"](https://dustinhendricks.com/wordgame/screenshot.jpg)
