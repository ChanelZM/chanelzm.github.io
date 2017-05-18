/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

(function () {
    //Execute code in strict mode
    'use strict';

    //Later on this variable will contain all the questions of every category
    var rolledUpData = [];

    //Select elements in DOM and store them in variable elements
    var elements = {
        navigation: document.querySelector('.mainnavigation'),
        landingPage : document.getElementById('start'),
        quiz : document.getElementById('categories'),
        categoryList : document.querySelector('#categorylist'),
        titleInput : document.querySelector('input[name="title"]'),
        generateQuizButton : document.querySelector('button[type="submit"]'),
        quizGenerator : document.querySelector('#quizgenerator'),
        allQuestions : document.querySelector('.allquestions'),
        givenTitle : document.querySelector('.mytitle'),
        questionPanel : document.querySelector('.questionpanel'),
        questionSection : document.querySelector('.questionsection'),
        filterOptions : document.querySelector('.filteroptions'),
        filterButton : document.querySelector('.filterbutton')
    };


    //When javascript is loaded toggle hide/show filter
    elements.filterButton.classList.remove('hide');
    elements.filterButton.classList.add('show');
    elements.filterOptions.hidden = true;

    elements.filterButton.addEventListener('click', function(){
        if(elements.filterOptions.hidden == true){
            elements.filterOptions.hidden = false;
        } else {
            elements.filterOptions.hidden = true;
        }
    });

    //Get the data
    var get = {
        data: function(){
            var fills = [
                {name: 'tv',
                 number: 14},
                {name: 'scienceNature',
                 number: 17},
                {name: 'history',
                 number: 23},
                {name: 'music',
                 number: 12}
            ];

            //Load in 4 API's with categories
            fills.forEach(function(obj){
                //Check if the data is already in localStorage then execute map.data()
                if(localStorage.getItem(obj.name)){
                    map.data(obj.name);
                } else {//Otherwise load data from URL
                    aja()
                    .method('get')
                    //API from https://opentdb.com/api_config.php
                    .url('https://opentdb.com/api.php?amount=20&category=' + obj.number + '&difficulty=easy&type=multiple')
                    .type('json')
                    .on('200', function(response){
                        //If the dataload is succesful, store into localStorage
                        localStorage.setItem(obj.name, JSON.stringify(response)); //Source 1, put the data into local storage
                        map.data(obj.name);
                    })
                    .on('error', function(response){ //Ian helped me with this
                        location.href = '#errorpage'; //Source 3: redirect to error page
                    })
                    .go();
                }
            });
        }
 };
    //Filter the properties you dont need and place everything into one array
    var map = {
        data : function(data){
            var parsedData = JSON.parse(localStorage.getItem(data));
            var mappedData = parsedData.results.map(function(val){
                //Return an array with the question, incorrect answers and correct answer.
                return [
                    val.question,
                    val.incorrect_answers[0],
                    val.incorrect_answers[1],
                    val.incorrect_answers[2],
                    val.correct_answer,
                    val.category.replace(' ', '-')//Remove possible spaces
                ];
            });

            //Without forEach, rolledUpData will contain an array for every category, with it, it will be one array with all categories
            mappedData.forEach(function(item){
                rolledUpData.push(item);
            });
        }
    };

    //Settings for starting app.
    var app = {
        init: function(){
            routes.init();
        }
    };

    //After initiation, var routes handles the routes of the SPA
    var routes = {
        init: function(){
            //Load data
            get.data();

            document.querySelector('.submitname').addEventListener('click', function(){
                location.hash = '#quizgenerator';
            });

            routie({
                'home': function() {
                    sections.toggle('home');
                },
                'categories': function(){
                    //Hide all other elements except categoryList
                    elements.categoryList.classList.remove('hide');
                    elements.questionPanel.classList.add('hide');
                    elements.categoryList.hidden = false;
                    elements.questionPanel.hidden = true;

                    //Render the available categories and toggle the sections
                    sections.toggle('categories');
                    sections.render(rolledUpData, 'local');
                },
                'quizgenerator': function(){
                    //Show the title that the user gave.
                    elements.givenTitle.innerHTML = elements.titleInput.value;

                    sections.toggle('quizgenerator');
                    sections.render(rolledUpData, 'local');
                },
                'categories/:name': function(name) {
                    elements.categoryList.classList.add('hide');
                    elements.questionPanel.classList.remove('hide');
                    elements.questionPanel.hidden = false;

                    var selectedCategory = rolledUpData.filter(function(val){
                        return val[5] == name;
                    });

                    sections.render(selectedCategory, 'local');
                },
                'errorpage': function(){
                    elements.navigation.hidden = true;
                    sections.toggle('error');
                },
                //If nothing matches reroute to home
                '*': function(){
                    sections.toggle('home');
                }
            });
        }
    };

    var sections = {
        //Render the API data into different HTML elements using Transparency
        render: function(data, source) {
            var categories = rolledUpData.map(function(val){
                return val[5];
            }).filter(function(item, index, inputArray){//Source 2: remove all duplicates
                return inputArray.indexOf(item) == index;
            });

            //Use the data parameter to fill the elements in the section. Loop through all the data and add elements for them too.
            var directives = {
                question : {
                    text: function(){
                        return this[0].replace(/(&quot\;)/g,"\"");
                    },
                    class: function(){
                        return 'question ' + this[5];
                    }
                },
                answers : {
                    class: function(){
                        return 'answers ' + this[5];
                    }
                },
                answer1 : {
                    text : function(){
                        return this[1];
                    }
                },
                answer2 : {
                    text : function(){
                        return this[2];
                    }
                },
                answer3 : {
                    text : function(){
                        return this[3];
                    }
                },
                correctanswer : {
                    text : function(){
                        return this[4];
                    }
                }
            };

            var categoryDirectives = {
                category : {
                    href: function(){
                        return '#categories/' + this.value;
                    },
                    text : function(){
                        return this.value.replace('-', ' ');
                    }
                }
            };

            //Create checkboxes and labels for every category
            var values = {
                filtercategory : {
                    value: function(){
                        return this.value;
                    },
                    id: function(){
                        return this.value;
                    }
                },
                label : {
                    text: function(){
                        return this.value.replace('-', ' ');
                    },
                    for: function(){
                        return this.value;
                    }
                }
            };

            Transparency.render(elements.questionPanel, data, directives);
            Transparency.render(elements.questionSection, data, directives);
            Transparency.render(elements.filterOptions, categories, values);
            Transparency.render(elements.categoryList, categories, categoryDirectives);

            //Filter through the data everytime the user clicks on a checkbox
            elements.filterOptions.addEventListener('click', function(){
                //Creates object with checkbox values and if they are checked.
                var filterValues = {
                    'Entertainment:-Television' : document.querySelector('input[value="' + categories[0] + '"]').checked,
                    'Science-& Nature' : document.querySelector('input[value="' + categories[1] + '"]').checked,
                    'History' : document.querySelector('input[value="' + categories[2] + '"]').checked,
                    'Entertainment:-Music' : document.querySelector('input[value="' + categories[3] + '"]').checked
                };

                function categorySelection(dataArray){
                    return filterValues[dataArray[5]];
                }

                var filteredData = rolledUpData.filter(categorySelection);

                //Render only the filtered data
                sections.render(filteredData, 'local');
            });

            sections.selectQuestions();
        },
        toggle: function(route){
            //Change all the other sections to hidden, except the active tab. Source: Shyanta Vleugel
            var currentSection = document.querySelector('#' + route),
                unactiveSections = document.querySelectorAll('body > section:not(#' + route + ')');

            unactiveSections.forEach(function(unactiveSections){
                unactiveSections.hidden = true;
                currentSection.hidden = false;
            });
        },
        selectQuestions: function(){
            //User can select questions for their own quiz
            var questionandanswer = document.querySelectorAll('.questionsection .questionandanswer');

            questionandanswer.forEach(function(element){
                element.addEventListener('click', function(){
                    if(element.className !== 'questionandanswer selected'){
                        element.className += ' selected';
                    } else {
                        element.classList.remove('selected');
                    }
                });
            });
        }
    };

    //Initiate app
    app.init();

})();

//Sources:
//1 : Stackoverflow. (2010). Storing Objects in HTML5 localStorage. Source:
//http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
//2 : Stackoverflow. (2014). Remove Duplicate item from array Javascript [duplicate]. Source:
//http://stackoverflow.com/questions/18008025/remove-duplicate-item-from-array-javascript
//3 : Stackoverflow. (2009). How do I redirect to another page in Javascript/Jquery. soruce:
//http://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-page-in-javascript-jquery
