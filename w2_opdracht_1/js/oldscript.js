/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

(function () {
    //Execute code in strict mode
    'use strict';
    
    //Later on this variable will contain all the questions of every category
    var rolledUpData = [];
    
    //Select elements in DOM and store them in variable elements
    var elements = {
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
        filterOptions : document.querySelector('.filteroptions')
    };
    
    //Store API calls in variable questions.
    var questions = {
        tv : function(){
            aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=14&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(tv){ //If the API is succesful, store the data in tv
                    localStorage.setItem('tv', JSON.stringify(tv)); //Source 1, put the data into local storage
                    sections.render(tv, 'api'); //Execute function sections.render with the parameter that has the data from the api and a string to tell where the data is being loaded from
                })
                .go(); 
        },
        scienceNature : function(){
            aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=17&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(scienceNature){
                    localStorage.setItem('scienceNature', JSON.stringify(scienceNature)); //source 1
                    sections.render(scienceNature, 'api');
                })
                .go();
        },
        history : function(){
            aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=23&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(history){
                    localStorage.setItem('history', JSON.stringify(history)); //source 1
                    sections.render(history, 'api');
                })
                .go();
        },
        music : function(){
            aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=12&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(music){
                    localStorage.setItem('music', JSON.stringify(music)); //source 1
                    sections.render(music, 'api');
                })
                .go();
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
            //On load show the home page
            location.hash = '#home';
            
            routie({
                'home': function() {
                    //Execute toggle
                    sections.toggle('home');
                },
                'categories': function(){
                    //Hide all other elements except categoryList
                    elements.categoryList.hidden = false;
                    elements.questionPanel.hidden = true;
                    
                    //Render the available categories and toggle the sections
                    sections.renderCategories();
                    sections.toggle('categories');
                },
                'quizgenerator': function(){
                    //Show the title that the user gave.
                    elements.givenTitle.innerHTML = elements.titleInput.value;
                    //Toggle the visibilty of sections
                    sections.toggle('quizgenerator');
                    
                    //Call every api
                    localStorage.getItem('tv') ? sections.render(JSON.parse(localStorage.getItem('tv')), 'local') : questions.tv();
                    localStorage.getItem('music') ? sections.render(JSON.parse(localStorage.getItem('music')), 'local') : questions.music();
                    localStorage.getItem('scienceNature') ? sections.render(JSON.parse(localStorage.getItem('scienceNature')), 'local') : questions.scienceNature();
                    localStorage.getItem('history') ? sections.render(JSON.parse(localStorage.getItem('history')), 'local') : questions.history();
                    
                    //Loading API takes times so the script executes selectQuestions while loading API, to prevent that, used setTimeout to delay this.
                    setTimeout(sections.selectQuestions, 3000);
                    
                    sections.filter();
                },
                'categories/:name': function(name) {
                    //Hide all other elements except questionPanel and filterOptions
                    elements.categoryList.hidden = true;
                    elements.questionPanel.hidden = false;
                    
                    //If the data you seek is in Local Storage, parse it and execute sections.render. Else execute the function where the api is loaded.
                    localStorage.getItem(name) ? sections.render(JSON.parse(localStorage.getItem(name)), 'local') : questions[name]();
                }
            });
        }
    };
    
//    function filterCategories(){
//        var filteredData;
//        if(document.querySelector('#tv').checked){
//            filteredData += rolledUpData.filter(function(val){
//                return val.category == 'Entertainment: Television';
//            });
//        }
//        if(document.querySelector('#sciencenature').checked){
//            filteredData += rolledUpData.filter(function(val){
//                return val.category == 'Science & Nature';
//            });
//        }
//        if(document.querySelector('#history').checked){
//            filteredData += rolledUpData.filter(function(val){
//                return val.category == 'History';
//            });
//        }
//        if(document.querySelector('#music').checked){
//            filteredData += rolledUpData.filter(function(val){
//                return val.category == 'Entertainment: Music';
//            });
//        }
//        
//        sections.render(filteredData, 'bla');
//    }
    
    var sections = {
        renderCategories: function(){
            //Render the category names  into the elements and link them to their page
            var categoryNames = [
                Object.getOwnPropertyNames(questions)[0], 
                Object.getOwnPropertyNames(questions)[1], 
                Object.getOwnPropertyNames(questions)[2], 
                Object.getOwnPropertyNames(questions)[3]
            ];

            var categoryDirectives = {
                category : {
                    href: function(){
                        return '#categories/' + this.value;
                    },
                    text : function(){
                        return this.value;
                    }
                }
            };

            Transparency.render(elements.categoryList, categoryNames, categoryDirectives);
        },
        render: function(data, source) {
            rolledUpData || data.results.map(function(val){
                //rolledUpData will contain all questions of every category
                return rolledUpData.push([
                    val.question,
                    val.incorrect_answers[0],
                    val.incorrect_answers[1],
                    val.incorrect_answers[2],
                    val.correct_answer,
                    val.category
                ]);
            });
            
            var selectedData = data.results.map(function(val){
                return [
                    val.question,
                    val.incorrect_answers[0],
                    val.incorrect_answers[1],
                    val.incorrect_answers[2],
                    val.correct_answer,
                    val.category
                ];
            });
            
            //Use the data from rolledUpData and selectedData to fill the elements in the section. Loop through all the data and add elements for them too.
            var directives = {
                question : {
                    text: function(){
                        return this[0];
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
            
            Transparency.render(elements.questionPanel, selectedData, directives); 
            Transparency.render(elements.questionSection, rolledUpData, directives);
            
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
            var question = document.querySelectorAll('.questionsection .question');
            console.log(question);
            
            question.forEach(function(element){
                element.addEventListener('click', function(){
                    if(element.className !== 'question selected'){
                        element.className += ' selected';
                    } else {
                        element.classList.remove('selected');
                    }
                });
            });
        },
        filter: function(){
            console.log(rolledUpData);
            var checkbox = {
                tv : document.querySelector('#tv'),
                scienceNature : document.querySelector('#sciencenature'),
                history : document.querySelector('#history'),
                music : document.querySelector('#music')
            };
            
//            checkbox.tv.addEventListener('click', function(){
//                if(!checkbox.tv.checked){
//                    rolledUpData = rolledUpData.filter(function)
//                } else {
//                    document.getElementsByClassName(Object.getOwnPropertyNames(questions)[0]).hidden = true;
//                }
//            });
        }
    };
    
    //Initiate app
    app.init();
    
})();

//Sources:
//1 : Stackoverflow. (2010). Storing Objects in HTML5 localStorage. Source:
//http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage