# Webapp from scratch
## Introduction
Quizpose is a webapplication for creating your own quizzes instead of making up the questions yourself. Quizpose uses a Quiz API to load questions from four different categories. You can add a title to your quiz, select the questions you want to use, bundle them and send them to your email. If you don't want to use this option you can just take a look at the questions.

## Live Demo
https://chanelzm.github.io/webapp_from_scratch/

## How to use
SPA Actor Diagram
![Actor Diagram](https://github.com/ChanelZM/webapp_from_scratch/blob/master/jpg/SPA_actor_diagram.png)

Flowchart Quiz Generator
![Flowchart Quiz Generator](https://github.com/ChanelZM/webapp_from_scratch/blob/master/jpg/flowchartquizgenerator.png)

Flowchart Categories
![Flowchart Categories](https://github.com/ChanelZM/webapp_from_scratch/blob/master/jpg/Flowchartcategories.png)

Flowchart On Load
![Flowchart On Load](https://github.com/ChanelZM/webapp_from_scratch/blob/master/jpg/Flowchartonload.png)

## Wishlist
- [ ] More Styling
- [ ] When generate quiz is clicked, removing the non selected questions
- [ ] Sending the user the selected questions to email
- [ ] filterValues not remotely typed
- [ ] Questions in random order

## Features
- Get questions by using API calls.

## Get Started
### Packages
- [Aja](http://krampstudio.com/aja.js/), for api calls
- [Transparency](https://github.com/leonidas/transparency), for templating

### Create yourself
#### Setup folder and html
- Create different folders for js, css and fonts.
- Create index.html file and create sections for home, quizgenerator, categories and error page. Give them an id with corresponding names. Add all other elements needed (view my html file).
- Execute `npm init` inside root folder in the terminal.
- Execute `npm install --save aja` and `npm install --save transparency`.
- Get [routie](http://projects.jga.me/routie/) script file and place in the js folder
- Create a script where you will be doing your own coding.
- Add a footer and add all the scripts:

```html
<footer>
    <script src="./node_modules/transparency/dist/transparency.min.js"></script>
    <script src="./node_modules/aja/aja.min.js"></script>
    <script src="js/routie.js"></script>
    <script src="js/{yourscriptfile}"></script>
</footer>
```

#### Javascript
- Create a function using routie that will trigger something when the location.hash changes. Use the ID's of the sections

```javascript
routie({
'home': function() {
},
    'categories': function(){
},
    'quizgenerator': function(){
},
    'categories/:name': function(name) {
},
    'errorpage': function(){
},
'*': function(){
}
});
```

- Create a function that will toggle sections on and off. When the location.hash changes all sections accept the section matching the location.hash will not be displayed. Call the toggle function in routie.

```javascript
var currentSection = document.querySelector('#' + route),
    unactiveSections = document.querySelectorAll('body > section:not(#' + route + ')');

unactiveSections.forEach(function(unactiveSections){
    unactiveSections.hidden = true;
    currentSection.hidden = false;
});
```

- Create render function for the sections where questions need to be added to the html. Use transparency documentation for this.
- Create a function that handles selecting questions.
- Create a function to get the data from the api.

## References
*Clears throat*
I would like to thank my classmates for helping me through tough code blocks that set me back for hours. If they weren't here, my SPA would be much more crappy.

I would like to thank the people of Stack Overflow. If I forgot something or something small wasn't working I could always count on answers there.

## License
MIT/X11.
