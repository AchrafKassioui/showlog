////////////////////////////////////////////////////////////////////////
//
// showlog.js
// 1.0
// Current version: 26 February 2019
// First version: 10 March 2018
//
// www.achrafkassioui.com/showlog/
//
// Copyright (C) 2019 Achraf Kassioui
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// https://www.gnu.org/licenses/gpl-3.0.en.html
//
////////////////////////////////////////////////////////////////////////

(function(factory) {
    // Find the global object for export to both the browser and web workers
    var globalObject = typeof window === 'object' && window || typeof self === 'object' && self;

    // Setup showlog.js for different environments. First is Node.js or CommonJS
    if(typeof exports !== 'undefined') {
        factory(exports);
    } else if(globalObject) {
        // Export showlog globally even when using AMD for cases when this script
        // is loaded with others that may still expect a global showlog
        globalObject.showlog = factory({});

        // Finally register the global showlog with AMD
        if(typeof define === 'function' && define.amd) {
            define([], function() {
                return globalObject.showlog;
            });
        }
    }
}(function(showlog) {
    'use strict';

    ////////////////////////////////////////////////////////////////////////
    //
    // Variables
    //
    ////////////////////////////////////////////////////////////////////////

    var showlog = {};
    var debug;
    var bracket;
    var message_container;
    var indicator;
    var counter = 1;

    ////////////////////////////////////////////////////////////////////////
    //
    // DOM setup
    //
    ////////////////////////////////////////////////////////////////////////

    function createDebug(){
        debug = document.createElement('div');
        indicator = document.createElement('span');
        bracket = document.createElement('span');
        message_container = document.createElement('span');

        debug.id = 'Mobilog';
        debug.style.position = 'fixed';
        debug.style.width = '100%';
        debug.style.height = 'auto';
        debug.style.top = '0';
        debug.style.left = '0';
        debug.style.textAlign = 'center';
        debug.style.color = '#fff';
        debug.style.fontFamily = 'monospace';
        debug.style.fontWeight = 'bold';
        debug.style.fontSize = '20px';
        debug.style.lineHeight = '1.8';
        debug.style.textShadow = '0px 0px 9px #000, 0px 0px 10px #000';
        debug.style.pointerEvents = 'none';
        debug.style.zIndex = '+9999';

        indicator.style.color = '#fff';
        indicator.style.textShadow = '0px 0px 9px #3b7ff1, 0px 0px 10px #3b7ff1, 0px 0px 11px #3b7ff1';

        bracket.innerText = '> ';
        bracket.style.color = '#fff';
        bracket.style.textShadow = '0px 0px 9px #3b7ff1, 0px 0px 10px #3b7ff1, 0px 0px 11px #3b7ff1';
    
        debug.appendChild(indicator);
        debug.appendChild(bracket);
        debug.appendChild(message_container);
        document.body.appendChild(debug);
    }

    function removeDebug(){
        var debug = document.getElementById('Mobilog');
        if(debug) debug.parentNode.removeChild(debug);
    }

    ////////////////////////////////////////////////////////////////////////
    //
    // Private methods
    //
    ////////////////////////////////////////////////////////////////////////

    // Based on:
    // https://stackoverflow.com/questions/11403107/capturing-javascript-console-log

    function takeOverConsole(){
        var original = console.log;
        console.log = function (message) {
            showlog.log(message);
            original.apply(console, arguments);
        };
    }

    function restoreConsole(){
        // Unbind showlog from console.log
    }

    ////////////////////////////////////////////////////////////////////////
    //
    // API
    //
    ////////////////////////////////////////////////////////////////////////

    showlog.log = function(message){
            if(!debug) return;
            indicator.innerText = counter++;
            message_container.innerText = message;
    };

    showlog.stop = function(){
        if(!debug) return;
        removeDebug();
        debug = null;
        counter = 0;
        return console.log('Showlog.js has been destroyed');
    };

    showlog.start = function(){
        showlog.stop();
        createDebug();
        takeOverConsole();
        return console.log('Showlog.js is running');
    };

    ////////////////////////////////////////////////////////////////////////
    //
    // Initialize
    //
    ////////////////////////////////////////////////////////////////////////

    showlog.start();

    return showlog;
}));