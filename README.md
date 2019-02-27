# Showlog.js

**Show `console.log` messages on screen.**

## Setup

Include the JavaScript file in your HTML:

```
<script type="text/javascript" src="showlog.js"></script>
``` 
Showlog will start automatically.

## Usage

Use `console.log` as usual and the message will get displayed on screen.

## Options

Stop logging messages on screen with the stop method:

```
showlog.stop();
```

Start logging messages on screen with the start method:

```
showlog.start();
```

Display messages on screen only with the log method:

```
showlog.log('Hi');
```

A boolean attached to showlog tells whether Showlog is running or not:

```
showlog.running // true or false
```
