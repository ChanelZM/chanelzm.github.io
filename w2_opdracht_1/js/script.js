/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

(function () {
    //Execute code in strict mode
    'use strict';
    
    var allData = [];
    
    //Select elements in DOM and store them in selectedElements
    var selectedElements = {
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
    
    //Store data of api's in data.
    var data = {
//             Om geen herhaling van code te voorkomen zou je een functie hiervoor kunnnen schrijven met een parameter over
//             het onderwerp die de api moet ophalen (science, history, music) zo zorg je voor DRY code. Hier is een voorbeeld.
//         function retrieveQuestions(subject) {
//         aja()
//                 .method('get')
//                 //API from https://opentdb.com/api_config.php
//                 .url('https://opentdb.com/api.php?amount=20&category=14&difficulty=easy&type=multiple')
//                 .type('json')
//                 .on('200', function(subject){ //If the API is succesful, store the data in tv
//                     localStorage.setItem(subject, JSON.stringify(subject)); //Source 1, put the data into local storage
//                     sections.render(tv, 'api'); //Execute function sections.render with the parameter that has the data from the api and a string to tell where the data is being loaded from
//                     //sections.renderAllQuestions(subject);
//                 tv.results.map(function(val){
//                     allData.push(val);
//                 });
//                 })
//                 .go(); 
//         }
        tv : function(){
            aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=14&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(tv){ //If the API is succesful, store the data in tv
                    localStorage.setItem('tv', JSON.stringify(tv)); //Source 1, put the data into local storage
                    sections.render(tv, 'api'); //Execute function sections.render with the parameter that has the data from the api and a string to tell where the data is being loaded from
                    //sections.renderAllQuestions(tv);
                tv.results.map(function(val){
                    allData.push(val);
                });
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
                    //sections.renderAllQuestions(scienceNature);
                scienceNature.results.map(function(val){
                    allData.push(val);
                });
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
                    //sections.renderAllQuestions(history);
                history.results.map(function(val){
                    allData.push(val);
                });
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
                    //sections.renderAllQuestions(music);
                music.results.map(function(val){
                    allData.push(val);
                });
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
    
    //Default settings, initiate toggle, if hash changes again initiate toggle 
    var routes = {
        init: function(){ 
            location.hash = '#home';
            
            routie({
                'home': function() {
                    sections.toggle('home');
                },
                'categories': function(){
                    selectedElements.categoryList.hidden = false;
                    selectedElements.questionPanel.hidden = true;
                    selectedElements.filterOptions.hidden = true;
                    sections.renderCategories();
                    sections.toggle('categories');
                },
                'quizgenerator': function(){
                    sections.toggle('quizgenerator');
                    selectedElements.allQuestions.hidden = false;
                    data.tv();
                    data.music();
                    data.scienceNature();
                    data.history();
                    sections.renderAllQuestions();
                },
                'categories/:name': function(name) {
                    selectedElements.categoryList.hidden = true;
                    selectedElements.questionPanel.hidden = false;
                    selectedElements.filterOptions.hidden = false;
                    localStorage.getItem(name) ? sections.render(JSON.parse(localStorage.getItem(name)), 'local') : data[name]();
                }
            });
        }
    };
    var sections = {
        renderAllQuestions: function(){
            console.log(allData);
            
            selectedElements.questionSection.hidden = false;
            
            var rolledUpData = allData.results.map(function(val){
                return [
                    val.question,
                    val.incorrect_answers[0],
                    val.incorrect_answers[1],
                    val.incorrect_answers[2],
                    val.correct_answer
                ];
            });
            var directives = {
                question : {
                    text: function(params){
                        return this[0];
                    }
                },
                answer1 : {
                    text : function(params){
                        return this[1];
                    }
                },
                answer2 : {
                    text : function(params){
                        return this[2];
                    }
                },
                answer3 : {
                    text : function(params){
                        return this[3];
                    }
                },
                correctanswer : {
                    text : function(params){
                        return this[4];
                    }
                }
            };
            
            Transparency.render(selectedElements.questionSection, rolledUpData, directives);
        },
        renderCategories: function(){
            var categoryNames = [
                Object.getOwnPropertyNames(data)[0], 
                Object.getOwnPropertyNames(data)[1], 
                Object.getOwnPropertyNames(data)[2], 
                Object.getOwnPropertyNames(data)[3]
            ];

            var directives = {
                category : {
                    href: function(params){
                        return '#categories/' + this.value;
                    },
                    text : function(params){
                        return this.value;
                    }
                }
            };

            Transparency.render(selectedElements.categoryList, categoryNames, directives);
        },
        render: function(data, source) {
            var rolledUpData = data.results.map(function(val){
                return [
                    val.question,
                    val.incorrect_answers[0],
                    val.incorrect_answers[1],
                    val.incorrect_answers[2],
                    val.correct_answer
                ];
            });

            var directives = {
                question : {
                    text: function(params){
                        return this[0];
                    }
                },
                answer1 : {
                    text : function(params){
                        return this[1];
                    }
                },
                answer2 : {
                    text : function(params){
                        return this[2];
                    }
                },
                answer3 : {
                    text : function(params){
                        return this[3];
                    }
                },
                correctanswer : {
                    text : function(params){
                        return this[4];
                    }
                }
            };
            
            Transparency.render(selectedElements.questionPanel, rolledUpData, directives);
            
        }, 
        toggle: function(route){
            //Change all the other sections to hidden, except the active tab. Source: Shyanta Vleugel
            var currentSection = document.querySelector('#' + route),
                unactiveSections = document.querySelectorAll('section:not(#' + route + ')');
            
            unactiveSections.forEach(function(unactiveSections){
                unactiveSections.hidden = true;
                currentSection.hidden = false;
            });
        }
    };
    
    //Initiate app
    app.init();
    
})();

//Sources:
//1 : Stackoverflow. (2010). Storing Objects in HTML5 localStorage. Source:
//http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
