////////////////////////////////////////////////////////////////////////
//
// Showlog.js
// 1.0
// Current version: 28 February 2019
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

    var original_console = console.log;
    var showlog = {};
    var showlog_container;
    var counter = 0;
    var indicator;
    var bracket;
    var message_container;

    ////////////////////////////////////////////////////////////////////////
    //
    // DOM setup
    //
    ////////////////////////////////////////////////////////////////////////

    function createUI(){
        showlog_container = document.createElement('div');
        indicator = document.createElement('span');
        bracket = document.createElement('span');
        message_container = document.createElement('span');

        showlog_container.id = 'showlog_container';
        showlog_container.style.position = 'fixed';
        showlog_container.style.width = '100%';
        showlog_container.style.height = 'auto';
        showlog_container.style.top = '0';
        showlog_container.style.left = '0';
        showlog_container.style.textAlign = 'center';
        showlog_container.style.color = '#fff';
        showlog_container.style.fontFamily = 'monospace';
        showlog_container.style.fontWeight = 'bold';
        showlog_container.style.fontSize = '20px';
        showlog_container.style.lineHeight = '1.8';
        showlog_container.style.textShadow = '0px 0px 9px #000, 0px 0px 10px #000';
        showlog_container.style.pointerEvents = 'none';
        showlog_container.style.zIndex = '+9999';

        indicator.style.color = '#fff';
        indicator.style.textShadow = '0px 0px 9px #3b7ff1, 0px 0px 10px #3b7ff1, 0px 0px 11px #3b7ff1';

        bracket.innerText = '> ';
        bracket.style.color = '#fff';
        bracket.style.textShadow = '0px 0px 9px #3b7ff1, 0px 0px 10px #3b7ff1, 0px 0px 11px #3b7ff1';
    
        showlog_container.appendChild(indicator);
        showlog_container.appendChild(bracket);
        showlog_container.appendChild(message_container);
        document.body.appendChild(showlog_container);
    }

    function removeUI(){
        var showlog_container = document.getElementById('showlog_container');
        if(showlog_container) showlog_container.parentNode.removeChild(showlog_container);
    }

    ////////////////////////////////////////////////////////////////////////
    //
    // Private methods
    //
    ////////////////////////////////////////////////////////////////////////

    // Based on:
    // https://stackoverflow.com/questions/11403107/capturing-javascript-console-log

    function takeOverConsole(){
        console.log = function (message) {
            showlog.log(message);
            original_console.apply(console, arguments);
        };
    }

    function restoreConsole(){
        console.log = original_console;
    }

    ////////////////////////////////////////////////////////////////////////
    //
    // API
    //
    ////////////////////////////////////////////////////////////////////////

    showlog.log = function(message){
        if(!showlog_container) return;
        indicator.innerText = ++counter;
        message_container.innerText = message;
    };

    showlog.stop = function(){
        if(!showlog_container) return;
        restoreConsole();
        removeUI();
        showlog_container = null;
        counter = 0;
        showlog.running = false;
        console.log('Showlog has been stopped');
    };

    showlog.start = function(){
        showlog.stop();
        createUI();
        takeOverConsole();
        showlog.running = true;
        console.log('Showlog is running');
    };

    ////////////////////////////////////////////////////////////////////////
    //
    // Initialize
    //
    ////////////////////////////////////////////////////////////////////////

    showlog.start();

    return showlog;
}));
