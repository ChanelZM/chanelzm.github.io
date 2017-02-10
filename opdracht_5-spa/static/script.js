/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function () {
    //Execute code in strict mode
    'use strict';
    
    //Declare variables
    var myVariables = {
        landingPage : document.getElementById('start'),
        guacemole : document.getElementById('guacemole'),
        landingPageButton : document.querySelector('a[href="#start"]'),
        guacemoleButton : document.querySelector('a[href="#guacemole"]')
    };
    
    var app = {
        init: function init(){
            myVariables.guacemole.setAttribute('hidden', true);
            
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
            if (route == '#guacemole'){
                myVariables.guacemole.removeAttribute('hidden');
                myVariables.landingPage.setAttribute('hidden', true);
            } else if (route == '#start'){
                myVariables.landingPage.removeAttribute('hidden');
                myVariables.guacemole.setAttribute('hidden', true);
            } 
        }
    };
    
    app.init();
    
})();
