/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function () {
    //Execute code in strict mode
    'use strict';
    
    //Declare variables
    var myVariables = {
        landingPage : document.getElementById('start'),
        bestPractices : document.getElementById('bestpractices'),
        landingPageButton : document.querySelector('a[href="#start"]'),
        bestPracticesButton : document.querySelector('a[href="#bestpractices"]')
    };
    
    var app = {
        init: function init(){
            myVariables.landingPage.style.display = 'block';
            myVariables.bestPractices.style.display = 'none';
            
            routes.init();
        }
    };
    
    var routes = {
        init: function init(){  
            //window check if hash has changed, then put the hash in var x and execute sections.toggle(x). Source: Elton Goncalvez Gomez.
            window.addEventListener('hashchange', function(){
                /* What is X? Not wrong but not clear to me */
                var x = location.hash;
                sections.toggle(x);
            });
        }
    };
    
    var sections = {
        toggle: function toggle(route){
            if (route == '#start'){
                myVariables.landingPage.style.display = 'block';
                myVariables.bestPractices.style.display = 'none';
            } else if (route == '#bestpractices'){
                myVariables.bestPractices.style.display = 'block';
                myVariables.landingPage.style.display = 'none';
            }
        }
    };
    
    app.init();
    
})();
