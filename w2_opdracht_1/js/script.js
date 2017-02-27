/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

(function () {
    //Execute code in strict mode
    'use strict';

//
//    var rolledUpData = [];
//    
//    //Select elements in DOM and store them in selectedElements
//    var selectedElements = {
//        landingPage : document.getElementById('start'),
//        quiz : document.getElementById('categories'),
//        categoryList : document.querySelector('#categorylist'),
//        titleInput : document.querySelector('input[name="title"]'),
//        generateQuizButton : document.querySelector('button[type="submit"]'),
//        quizGenerator : document.querySelector('#quizgenerator'),
//        allQuestions : document.querySelector('.allquestions'),
//        givenTitle : document.querySelector('.mytitle'),
//        questionPanel : document.querySelector('.questionpanel'),
//        questionSection : document.querySelector('.questionsection'),
//        filterOptions : document.querySelector('.filteroptions'),
//        tvCheckbox : document.querySelector('#tv'),
//        scienceNatureCheckbox : document.querySelector('#sciencenature'),
//        historyCheckbox : document.querySelector('#history'),
//        musicCheckbox : document.querySelector('music')
//    };
    
    //Store data of api's in data.
    (function(){
        aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=14&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(tv){ //If the API is succesful, store the data in tv
                    localStorage.setItem('tv', JSON.stringify(tv)); //Source 1, put the data into local storage
                })
                .go();
        aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=17&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(scienceNature){
                    localStorage.setItem('scienceNature', JSON.stringify(scienceNature)); //source 1
                })
                .go();
        aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=23&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(history){
                    localStorage.setItem('history', JSON.stringify(history)); //source 1
                })
                .go();
        aja()
                .method('get')
                //API from https://opentdb.com/api_config.php
                .url('https://opentdb.com/api.php?amount=20&category=12&difficulty=easy&type=multiple')
                .type('json')
                .on('200', function(music){
                    localStorage.setItem('music', JSON.stringify(music)); //source 1
                })
                .go();
        mapData();
    })();
    
    var rolledUpData;
    
    function mapData(){
        var tv = JSON.parse(localStorage.getItem('tv')), 
            scienceNature = JSON.parse(localStorage.getItem('scienceNature')), 
            history = JSON.parse(localStorage.getItem('history')), 
            music = JSON.parse(localStorage.getItem('music'));
        
        var newTv = tv.results.map(function(val){
            //Return an array with the question, incorrect answers and correct answer.
            return [
                val.question,
                val.incorrect_answers[0],
                val.incorrect_answers[1],
                val.incorrect_answers[2],
                val.correct_answer,
                val.category
            ];
        });
        
        var newScienceNature = scienceNature.results.map(function(val){
            //Return an array with the question, incorrect answers and correct answer.
            return [
                val.question,
                val.incorrect_answers[0],
                val.incorrect_answers[1],
                val.incorrect_answers[2],
                val.correct_answer,
                val.category
            ];
        });
        
        var newHistory = history.results.map(function(val){
            //Return an array with the question, incorrect answers and correct answer.
            return [
                val.question,
                val.incorrect_answers[0],
                val.incorrect_answers[1],
                val.incorrect_answers[2],
                val.correct_answer,
                val.category
            ];
        });
        
        var newMusic = music.results.map(function(val){
            //Return an array with the question, incorrect answers and correct answer.
            return [
                val.question,
                val.incorrect_answers[0],
                val.incorrect_answers[1],
                val.incorrect_answers[2],
                val.correct_answer,
                val.category
            ];
        });
        
        rolledUpData = newTv.concat(newScienceNature, newHistory, newMusic);
    }
    
    console.log(rolledUpData);
    
    //var data = {
//        tv : function(){
//            aja()
//                .method('get')
//                //API from https://opentdb.com/api_config.php
//                .url('https://opentdb.com/api.php?amount=20&category=14&difficulty=easy&type=multiple')
//                .type('json')
//                .on('200', function(tv){ //If the API is succesful, store the data in tv
//                    localStorage.setItem('tv', JSON.stringify(tv)); //Source 1, put the data into local storage
//                console.log(JSON.parse(localStorage.getItem(tv)));
//                    sections.render(tv, 'api'); //Execute function sections.render with the parameter that has the data from the api and a string to tell where the data is being loaded from
//                })
//                .go(); 
//        },
//        scienceNature : function(){
//            aja()
//                .method('get')
//                //API from https://opentdb.com/api_config.php
//                .url('https://opentdb.com/api.php?amount=20&category=17&difficulty=easy&type=multiple')
//                .type('json')
//                .on('200', function(scienceNature){
//                    localStorage.setItem('scienceNature', JSON.stringify(scienceNature)); //source 1
//                    sections.render(scienceNature, 'api');
//                })
//                .go();
//        },
//        history : function(){
//            aja()
//                .method('get')
//                //API from https://opentdb.com/api_config.php
//                .url('https://opentdb.com/api.php?amount=20&category=23&difficulty=easy&type=multiple')
//                .type('json')
//                .on('200', function(history){
//                    localStorage.setItem('history', JSON.stringify(history)); //source 1
//                    sections.render(history, 'api');
//                })
//                .go();
//        },
//        music : function(){
//            aja()
//                .method('get')
//                //API from https://opentdb.com/api_config.php
//                .url('https://opentdb.com/api.php?amount=20&category=12&difficulty=easy&type=multiple')
//                .type('json')
//                .on('200', function(music){
//                    localStorage.setItem('music', JSON.stringify(music)); //source 1
//                    sections.render(music, 'api');
//                })
//                .go();
//        }
//    };
    
//    function mapData(){
//        
//    }
    //-----------------------------------------------------------------------------------------
    //Settings for starting app.
//    var app = {
//        init: function(){
//            routes.init();
//        }
//    };
//    
//    //Default settings, initiate toggle, if hash changes again initiate toggle 
//    var routes = {
//        init: function(){ 
//            //On load only show home
//            location.hash = '#home';
//            
//            routie({
//                'home': function() {
//                    //Execute toggle
//                    sections.toggle('home');
//                },
//                'categories': function(){
//                    //Hide all other elements except categoryList
//                    selectedElements.categoryList.hidden = false;
//                    selectedElements.questionPanel.hidden = true;
//                    sections.renderCategories();
//                    sections.toggle('categories');
//                },
//                'quizgenerator': function(){
//                    //Toggle the visibilty of sections
//                    selectedElements.givenTitle.innerHTML = selectedElements.titleInput.value;
//                    sections.toggle('quizgenerator');
//                    
//                    //Call every api
//                    data.tv();
//                    data.music();
//                    data.scienceNature();
//                    data.history();
//                    
//                    //filterCategories();
//                },
//                'categories/:name': function(name) {
//                    //Hide all other elements except questionPanel and filterOptions
//                    selectedElements.categoryList.hidden = true;
//                    selectedElements.questionPanel.hidden = false;
//                    //If the data you seek is in Local Storage, parse it and execute sections.render. Else execute the function where the api is loaded.
//                    localStorage.getItem(name) ? sections.render(JSON.parse(localStorage.getItem(name)), 'local') : data[name]();
//                }
//            });
//        }
//    };
//    
////    function filterCategories(){
////        var filteredData;
////        if(document.querySelector('#tv').checked){
////            filteredData += rolledUpData.filter(function(val){
////                return val.category == 'Entertainment: Television';
////            });
////        }
////        if(document.querySelector('#sciencenature').checked){
////            filteredData += rolledUpData.filter(function(val){
////                return val.category == 'Science & Nature';
////            });
////        }
////        if(document.querySelector('#history').checked){
////            filteredData += rolledUpData.filter(function(val){
////                return val.category == 'History';
////            });
////        }
////        if(document.querySelector('#music').checked){
////            filteredData += rolledUpData.filter(function(val){
////                return val.category == 'Entertainment: Music';
////            });
////        }
////        
////        sections.render(filteredData, 'bla');
////    }
//    
//    var sections = {
//        renderCategories: function(){
//            //Render the category names  into the elements and link them to their page
//            var categoryNames = [
//                Object.getOwnPropertyNames(data)[0], 
//                Object.getOwnPropertyNames(data)[1], 
//                Object.getOwnPropertyNames(data)[2], 
//                Object.getOwnPropertyNames(data)[3]
//            ];
//
//            var categoryDirectives = {
//                category : {
//                    href: function(params){
//                        return '#categories/' + this.value;
//                    },
//                    text : function(params){
//                        return this.value;
//                    }
//                }
//            };
//
//            Transparency.render(selectedElements.categoryList, categoryNames, categoryDirectives);
//        },
//        render: function(data, source) {
//            //Only save the properties I need in rolledUpData
//            data.results.map(function(val){
//                //Return an array with the question, incorrect answers and correct answer.
//                return rolledUpData.push([
//                    val.question,
//                    val.incorrect_answers[0],
//                    val.incorrect_answers[1],
//                    val.incorrect_answers[2],
//                    val.correct_answer,
//                    val.category
//                ]);
//            });
//            
//            var selectedData = data.results.map(function(val){
//                //Return an array with the question, incorrect answers and correct answer.
//                return [
//                    val.question,
//                    val.incorrect_answers[0],
//                    val.incorrect_answers[1],
//                    val.incorrect_answers[2],
//                    val.correct_answer
//                ];
//            });
//            
//            //Use the data from rolledUpData to fill the elements in the section. Loop through all the data and add elements for them too.
//            var directives = {
//                question : {
//                    text: function(params){
//                        return this[0];
//                    }
//                },
//                answer1 : {
//                    text : function(params){
//                        return this[1];
//                    }
//                },
//                answer2 : {
//                    text : function(params){
//                        return this[2];
//                    }
//                },
//                answer3 : {
//                    text : function(params){
//                        return this[3];
//                    }
//                },
//                correctanswer : {
//                    text : function(params){
//                        return this[4];
//                    }
//                }
//            };
//            
//            Transparency.render(selectedElements.questionPanel, selectedData, directives); 
//            Transparency.render(selectedElements.questionSection, rolledUpData, directives);
//            
//        }, 
//        toggle: function(route){
//            //Change all the other sections to hidden, except the active tab. Source: Shyanta Vleugel
//            var currentSection = document.querySelector('#' + route),
//                unactiveSections = document.querySelectorAll('body > section:not(#' + route + ')');
//            
//            unactiveSections.forEach(function(unactiveSections){
//                unactiveSections.hidden = true;
//                currentSection.hidden = false;
//            });
//        }
//    };
//    
//    //Initiate app
//    app.init();
//    
})();

//Sources:
//1 : Stackoverflow. (2010). Storing Objects in HTML5 localStorage. Source:
//http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage