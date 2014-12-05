/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */

// MIT license

/**
 * Basic parser for URL properties
 * @author Miller Medeiros
 * @version 0.1.0 (2011/12/06)
 * MIT license
 */

/** @license
 * RequireJS plugin for loading web fonts using the WebFont Loader
 * Author: Miller Medeiros
 * Version: 0.2.0 (2011/12/06)
 * Released under the MIT license
 */

define("domReady",[],function(){function u(e){var t;for(t=0;t<e.length;t+=1)e[t](s)}function a(){var e=o;i&&e.length&&(o=[],u(e))}function f(){i||(i=!0,n&&clearInterval(n),a())}function c(e){return i?e(s):o.push(e),c}var e,t,n,r=typeof window!="undefined"&&window.document,i=!r,s=r?document:null,o=[];if(r){if(document.addEventListener)document.addEventListener("DOMContentLoaded",f,!1),window.addEventListener("load",f,!1);else if(window.attachEvent){window.attachEvent("onload",f),t=document.createElement("div");try{e=window.frameElement===null}catch(l){}t.doScroll&&e&&window.external&&(n=setInterval(function(){try{t.doScroll(),f()}catch(e){}},30))}document.readyState==="complete"&&f()}return c.version="2.0.1",c.load=function(e,t,n,r){r.isBuild?n(null):c(n)},c}),define("app/numberUtils",[],function(){function e(e,t){var n=t-e,r=Math.floor(Math.random()*n),i=Math.floor(e),s=i+r;return s}return{getRandomInteger:e}}),define("app/Tile",["./Tile"],function(e){function e(e,t,n,r,i){this.fontSize=e,this.cellX=t,this.cellY=n,this.fillStyle=r,this.lineStyle=i}return e.prototype.draw=function(e){var t=this.getX(),n=this.getY(),r=this.getSize(),i=this.getFillStyle(),s=this.getLineStyle();e.drawRect(t,n,r,r,i,s)},e.prototype.getSize=function(){return this.fontSize},e.prototype.getX=function(){return this.cellX*this.fontSize},e.prototype.getY=function(){return this.cellY*this.fontSize},e.prototype.getCellX=function(){return this.cellX},e.prototype.setCellX=function(e,t){var n=e.getCellsWidth();this.cellX=(t+n)%n},e.prototype.getCellY=function(){return this.cellY},e.prototype.setCellY=function(e,t){var n=e.getCellsHeight();this.cellY=(t+n)%n},e.prototype.setFillStyle=function(e){this.fillStyle=e},e.prototype.getFillStyle=function(){return this.fillStyle},e.prototype.setLineStyle=function(e){this.lineStyle=e},e.prototype.getLineStyle=function(){return this.lineStyle},e.prototype.doesCollideWith=function(e){var t=this.cellX===e.cellX,n=this.cellY===e.cellY;return t&&n},e}),define("app/Apple",["./numberUtils","./Tile"],function(e,t){function r(e,n,r){var i="#8f0",s="#fff";t.call(this,e,n,r,i,s)}var n=e.getRandomInteger;return r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype.placeRandomly=function(e){var t=e.getCellsWidth(),r=e.getCellsHeight();this.setCellX(e,n(0,t)),this.setCellY(e,n(0,r))},r}),define("app/CommandCode",[],function(){return{TURN_SNAKE_LEFT:"turnSnakeLeft",TURN_SNAKE_UP:"turnSnakeUp",TURN_SNAKE_RIGHT:"turnSnakeRight",TURN_SNAKE_DOWN:"turnSnakeDown",TOGGLE_PAUSE:"togglePause",NULL_COMMAND:"nullCommand"}}),define("app/Direction",[],function(){return{LEFT:0,UP:1,RIGHT:2,DOWN:3}}),define("app/htmlUtils",[],function(){function e(e){var t=document.documentElement.clientWidth,n=document.documentElement.clientHeight;e.style.position="absolute",e.style.left=(t-e.offsetWidth)/2+"px",e.style.top=(n-e.offsetHeight)/2+window.pageYOffset+"px"}return{centreElement:e}}),define("app/InputEvent",[],function(){return{KEY_DOWN:"keydown",KEY_UP:"keyup",RESIZE:"resize",CLICK:"click"}}),define("app/GameGraphics",["./htmlUtils","./InputEvent"],function(e,t){function r(e,n){this.canvas=document.createElement("canvas"),this.width,this.setWidth(e),this.height,this.setHeight(n),this.canvas.class="gameGraphics",this.canvas.style.backgroundColor="#333333",this.canvas.style.zIndex=8;var r=this.getContext();r.translate(1,1),r.scale(2,2),r.lineWidth=.75;var s=document.getElementsByTagName("body")[0];s.appendChild(this.canvas);var o=this;window.addEventListener(t.RESIZE,function(){i(o)}),i(o)}function i(e){n(e.canvas)}var n=e.centreElement;return r.prototype.reset=function(){var e=this.getContext();e.save(),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,this.canvas.width,this.canvas.height),e.restore()},r.prototype.setWidth=function(e){this.width=e,this.canvas.width=2*e,this.canvas.style.width=e+"px"},r.prototype.getWidth=function(){return this.width},r.prototype.setHeight=function(e){this.height=e,this.canvas.height=2*e,this.canvas.style.height=e+"px"},r.prototype.getHeight=function(){return this.canvas.height},r.prototype.getContext=function(){var e=this.canvas.getContext("2d");return e},r.prototype.drawRect=function(e,t,n,r,i,s){var o=this.getContext();o.beginPath(),o.rect(e,t,n,r),o.fillStyle=i,o.fill(),o.strokeStyle=s,o.stroke()},r.prototype.buildFontString=function(e,t){var n=""+e+"px "+t;return n},r.prototype.drawText=function(e,t,n,r,i,s,o){var u=this.getContext();u.beginPath(),u.font=this.buildFontString(r,i),u.textAlign="left",u.fillStyle=s,u.fillText(n,e,t,o)},r}),define("app/KeyCode",[],function(){return{NULL_KEY:0,LEFT:37,UP:38,RIGHT:39,DOWN:40,SPACE:32}}),define("app/InputMap",["./KeyCode"],function(e){function t(){this.keyDownCommandMap={},this.keyUpCommandMap={}}return t.prototype.bindKeyDown=function(e,t){this.keyDownCommandMap[e]=t},t.prototype.getKeyDownBinding=function(e){return this.keyDownCommandMap[e]},t.prototype.unbindKeyDown=function(t){this.keyDownCommandMap[t]=e.NULL_KEY},t.prototype.bindKeyUp=function(e,t){this.keyUpCommandMap[e]=t},t.prototype.getKeyUpBinding=function(e){return this.keyUpCommandMap[e]},t.prototype.unbindKeyUp=function(t){this.keyUpCommandMap[t]=e.NULL_KEY},t}),define("app/timeUtils",[],function(){function e(){var e=window.performance.now?performance.now()+performance.timing.navigationStart:Date.now();return e}return Date.now||(Date.now=function(){(new Date).getTime()}),function(){var t=["webkit","moz"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n){var r=t[n];window.requestAnimationFrame=window[r+"RequestAnimationFrame"],window.cancelAnimationFrame=window[r+"CancelAnimationFrame"]||window[r+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var n=e(),r=Math.max(i+16,n);return setTimeout(function(){t(i=r)},r-n)},window.cancelAnimationFrame=clearTimeout}}(),{timeNow:e,requestAnimationFrame:window.requestAnimationFrame,cancelAnimationFrame:window.cancelAnimationFrame}}),define("app/Manipulator",["./InputEvent","./InputMap","./KeyCode","./timeUtils"],function(e,t,n,r){function s(){this.nullCommandCode="nullCommand",this.commandListener=null,this.commandListenerArguments=null,this.inputMap=new t,this.keysPressed={};var n=this;window.addEventListener(e.KEY_DOWN,function(e){n.onKeyDown(e)},!1),window.addEventListener(e.KEY_UP,function(e){n.onKeyUp(e)},!1)}function o(t,n){var r=n.keyCode,i=n.type,s=t.nullCommandCode,o=t.inputMap;switch(i){case e.KEY_DOWN:s=o.getKeyDownBinding(r);break;case e.KEY_UP:s=o.getKeyUpBinding(r);break;default:}return s}function u(e,t){var n=e.commandListener,r=o(e,t);if(r!==this.nullCommandCode){var i=Array.prototype.slice.call(e.commandListenerArguments);i.push(r),n.apply(n,i)}}var i=r.timeNow;return s.prototype.isKeyDown=function(e){return this.keysPressed[e]},s.prototype.setCommandListener=function(){var e=Array.prototype.slice.call(arguments);this.commandListener=e[0],this.commandListenerArguments=e.slice(1,e.length)},s.prototype.onKeyDown=function(e){this.keysPressed[e.keyCode]=i(),u(this,e)},s.prototype.onKeyUp=function(e){this.keysPressed[e.keyCode]=0,u(this,e)},s.prototype.bindKeyDown=function(e,t){this.inputMap.bindKeyDown(e,t)},s.prototype.unbindKeyDown=function(e){this.inputMap.unbindKeyDown(e)},s.prototype.bindKeyUp=function(e,t){this.inputMap.bindKeyUp(e,t)},s.prototype.unbindKeyUp=function(e){this.inputMap.unbindKeyUp(e)},s.prototype.setNullCommandCode=function(e){this.nullCommandCode=e},s}),define("app/graphicUtils",["./numberUtils"],function(e){function n(){var e="0123456789ABCDEF".split(""),n="#";for(var r=0;r<6;r++){var i=t(0,16);n+=e[i]}return n}var t=e.getRandomInteger;return{getRandomColor:n}}),define("app/SnakePart",["./graphicUtils","./Tile"],function(e,t){function r(e,r,i){var s=n(),o="#fff";t.call(this,e,r,i,s,o)}var n=e.getRandomColor;return r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype.incrementCellX=function(e){this.setCellX(e,this.cellX+1)},r.prototype.decrementCellX=function(e){this.setCellX(e,this.cellX-1)},r.prototype.incrementCellY=function(e){this.setCellY(e,this.cellY+1)},r.prototype.decrementCellY=function(e){this.setCellY(e,this.cellY-1)},r.prototype.dragTo=function(e,t){this.setCellX(e,t.getCellX()),this.setCellY(e,t.getCellY())},r.prototype.draw=function(e){var r=n();this.setFillStyle(r),t.prototype.draw.call(this,e)},r}),define("app/TextObject",[],function(){function e(e,t,n,r,i,s,o){this.x=e,this.y=t,this.text=n,this.fontSize=r||12,this.fontFamily=i||"Arial",this.fontColor=s||"black",this.maxWidth=o||5*r,this.width=0}return e.prototype.setText=function(e){this.text=e},e.prototype.getText=function(){return this.text},e.prototype.setFontSize=function(e){this.fontSize=e},e.prototype.getFontSize=function(){return this.fontSize},e.prototype.setFontName=function(e){this.fontFamily=e},e.prototype.getFontName=function(){return this.fontFamily},e.prototype.setFontColor=function(e){this.fontColor=e},e.prototype.getFontColor=function(){return this.fontColor},e.prototype.setMaxWidth=function(e){this.maxWidth=e},e.prototype.getMaxWidth=function(){return this.maxWidth},e.prototype.updateWidth=function(e){var t=e.getContext();t.font=e.buildFontString(this.fontSize,this.fontFamily),this.width=t.measureText(this.text).width},e.prototype.getWidth=function(){return this.width},e.prototype.getHeight=function(){return this.fontSize},e.prototype.draw=function(e){e.drawText(this.x,this.y,this.text,this.fontSize,this.fontFamily,this.fontColor,this.maxWidth)},e}),define("propertyParser",[],function(){function n(t){var n,i={};while(n=e.exec(t))i[n[1]]=r(n[2]||n[3]);return i}function r(e){return t.test(e)?e=e.replace(t,"$1").split(","):e==="null"?e=null:e==="false"?e=!1:e==="true"?e=!0:e===""||e==="''"||e==='""'?e="":isNaN(e)||(e=+e),e}var e=/([\w-]+)\s*:\s*(?:(\[[^\]]+\])|([^,]+)),?/g,t=/^\[([^\]]+)\]$/;return{parseProperties:n,typecastVal:r}}),define("font",["propertyParser"],function(e){function n(n){var r={},i=n.split("|"),s=i.length,o;while(s--)o=t.exec(i[s]),r[o[1]]=e.parseProperties(o[2]);return r}var t=/^([^,]+),([^\|]+)\|?/;return{load:function(e,t,r,i){if(i.isBuild)r(null);else{var s=n(e);s.active=r,s.inactive=function(){r(!1)},t([(document.location.protocol==="https:"?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"],function(){WebFont.load(s)})}}}}),define("app/Game",["./Apple","./CommandCode","./Direction","./GameGraphics","./InputEvent","./KeyCode","./Manipulator","./SnakePart","./TextObject","./timeUtils","font!custom,families:[Wendy],urls:[style/style.css]"],function(e,t,n,r,i,s,o,u,a,f){function p(e,u,f){this.cellSize=e,this.cellsWidth=u,this.cellsHeight=f,this.stopped=!0,this.lastRequestId=0,this.then=h();var l=u*e+1,c=f*e+1;this.graphics=new r(l,c),this.score=0;var p=72,d=20,m=p/2+20,y=""+this.score,b="#999999",w="Wendy";this.scoreScreen=new a(d,m,y,p,w,b),this.currentDirection=n.LEFT,this.manipulator=new o,this.manipulator.setCommandListener(T,this),this.manipulator.bindKeyDown(s.LEFT,t.TURN_SNAKE_LEFT),this.manipulator.bindKeyDown(s.UP,t.TURN_SNAKE_UP),this.manipulator.bindKeyDown(s.RIGHT,t.TURN_SNAKE_RIGHT),this.manipulator.bindKeyDown(s.DOWN,t.TURN_SNAKE_DOWN),this.manipulator.bindKeyDown(s.SPACE,t.TOGGLE_PAUSE);var E=this;this.graphics.canvas.addEventListener(i.CLICK,function(e){v(E,e)}),this.snake=[],N(this),N(this),N(this),N(this),this.apple=null,g(this)}function d(e,t){var n=0,r=0,i=0,s=0,o=e;do n+=o.offsetLeft-o.scrollLeft,r+=o.offsetTop-o.scrollTop;while(o=o.offsetParent);return i=t.pageX-n,s=t.pageY-r,{x:i,y:s}}function v(e,t){var r=d(e.graphics.canvas,t),i=e.graphics.width/2,s=e.graphics.height/2,o=r.x-i,u=-r.y+s;-o<=u&&o<=u?e.currentDirection=n.UP:-o<u&&o>u?e.currentDirection=n.RIGHT:-o>=u&&o>=u?e.currentDirection=n.DOWN:e.currentDirection=n.LEFT}function m(e){e.score++,e.scoreScreen.text=""+e.score}function g(t){t.apple=new e(t.cellSize,-1,-1),t.apple.placeRandomly(t)}function y(e,t){return e.snake[t]}function b(e){return e.snake[0]}function w(e){return e.snake[e.snake.length-1]}function E(e){for(var t=e.snake.length-1;t>0;t--){var n=y(e,t),r=y(e,t-1);n.dragTo(e,r)}x(e)}function S(e){e.graphics.reset(),e.scoreScreen.draw(e.graphics),e.apple.draw(e.graphics);for(var t=0;t<e.snake.length;t++){var n=e.snake[t];n.draw(e.graphics)}}function x(e){var t=b(e);switch(e.currentDirection){case n.LEFT:t.decrementCellX(e);break;case n.UP:t.decrementCellY(e);break;case n.RIGHT:t.incrementCellX(e);break;case n.DOWN:t.incrementCellY(e);break;default:}var r=t.doesCollideWith(e.apple);r&&(N(e),g(e),m(e))}function T(e,r){switch(r){case t.TOGGLE_PAUSE:e.isStopped()?e.start():e.pause();break;default:}if(!e.isStopped())switch(r){case t.TURN_SNAKE_LEFT:e.currentDirection=n.LEFT;break;case t.TURN_SNAKE_UP:e.currentDirection=n.UP;break;case t.TURN_SNAKE_RIGHT:e.currentDirection=n.RIGHT;break;case t.TURN_SNAKE_DOWN:e.currentDirection=n.DOWN;break;default:}}function N(e){var t;if(e.snake.length>0){var n=w(e);t=new u(e.cellSize,n.getCellX(),n.getCellY())}else{var r=Math.round(e.cellsWidth/2),i=Math.round(e.cellsHeight/2);t=new u(e.cellSize,r,i)}e.snake.push(t)}var l=f.requestAnimationFrame,c=f.cancelAnimationFrame,h=f.timeNow;return p.prototype.pause=function(){var e=this.lastRequestId;e&&c(e),this.stopped=!0},p.prototype.isStopped=function(){return this.stopped},p.prototype.start=function(){this.stopped=!1,this.then=h(),this.run()},p.prototype.run=function(){var e=this.run.bind(this),t=this,n=h()-t.then;t.isStopped()||setTimeout(function(){t.then=h(),t.lastRequestId=l(e),E(t),S(t)},50-n)},p.prototype.getCellsWidth=function(){return this.cellsWidth},p.prototype.getCellsHeight=function(){return this.cellsHeight},p}),define("app/main",["domReady","./Game"],function(e,t){function u(){s=new t(n,r,i),s.start()}var n=20,r=40,i=30,s,o={dom:!1,fonts:!1};e(u)}),requirejs.config({baseUrl:"lib",paths:{app:"../app",style:"../style"}}),requirejs(["app/main"]),define("apptest",function(){});