/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function () {
    //Execute code in strict mode
    'use strict';

    //Declare variables
    /*try other variablename like options*/
    var myVariables = {
        landingPage : document.getElementById('start'),
        bestPractices : document.getElementById('bestpractices'),
        landingPageButton : document.querySelector('a[href="#start"]'),
        //selects all sections but the nav
        sections: document.querySelectorAll('section:not(:first-child)'),
        bestPracticesButton : document.querySelector('a[href="#bestpractices"]')
    };

    var app = {
        init: function init(){
            // loop  through all section, adds a class none
            for (var i = 0; i < myVariables.sections.length; i++) {
                myVariables.sections[i].classList.add("hidden");
            }
            // remove for the indexPage
            myVariables.landingPage.classList.remove("hidden");

            routes.init();
        }
    };

    var routes = {
        init: function init(){
            //window check if hash has changed, then put the hash in var x and execute sections.toggle(x). Source: Elton Goncalvez Gomez.
            window.addEventListener('hashchange', function(){
                var x = location.hash;
                sections.toggle(x);
            });
        }
    };

    var sections = {
        toggle: function toggle(route){
            var currentRoute = document.querySelector(route);

            for (var i = 0; i < myVariables.sections.length; i++) {
                myVariables.sections[i].classList.add("hidden");
            }

            currentRoute.classList.remove("hidden");
            /*wont work if you have other sections*/
            // if (route === "#start"){
            //     oldRoute.classList.add("block");
            // } else{
            //     oldRoute.classList.add("none");
            //     currentRoute.classList.add("block");
            // }
        }
    };

    app.init();

})();
