/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
aja()
    .method('get')
//API from https://opentdb.com/api_config.php
    .url('https://opentdb.com/api.php?amount=20&category=14&difficulty=easy&type=multiple')
    .type('json')
    .on('200', function(data){
        localStorage.setItem('data', JSON.stringify(data)); //source 1
    })
    .go();

var data = JSON.parse(localStorage.getItem('data'));

console.log(data.results);
console.log(data.results.length);
console.log(data.results.map(function(){return data.results.difficulty;}));

(function () {
    //Execute code in strict mode
    'use strict';
    
    //Declare variables
    var selectedElements = {
        landingPage : document.getElementById('start'),
        quiz : document.getElementById('quiz'),
        quizList : document.querySelector('ol')
    };
    
    var app = {
        init: function(){
            routes.init();
        }
    };
    
    var routes = {
        init: function(){  
            location.hash = '#start';
            selectedElements.quiz.setAttribute('hidden', true);
            
            //window check if hash has changed, then put the hash in var x and execute sections.toggle(x). Source: Elton Goncalvez Gomez.
            var urlHash = location.hash;
            sections.toggle(urlHash);
        }
    };
    
    //Output all the questions
    (function(){
        for(var i=0; i < data.results.length; i++){
        selectedElements.quizList.innerHTML += '<li id="question' + [i] + '">' + data.results[i].question + '</li>';
        }
    })();
    
    var sections = {
        toggle: function(route){
            routie({
                'quiz': function() {
                    selectedElements.quiz.removeAttribute('hidden');
                    selectedElements.landingPage.setAttribute('hidden', true);
                },
                'start': function() {
                    selectedElements.landingPage.removeAttribute('hidden');
                    selectedElements.quiz.setAttribute('hidden', true);
                }
});
            
        }
    };
    
    app.init();
    
})();

//Sources:
//1 : Stackoverflow. (2010). Storing Objects in HTML5 localStorage. Source:
//http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
