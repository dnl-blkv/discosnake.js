// MIT license

define("app/numberUtils",[],function(){function e(e,t){var n=t-e,r=Math.floor(Math.random()*n),i=Math.floor(e),s=i+r;return s}return{getRandomInteger:e}}),define("app/Tile",["./Tile"],function(e){function e(e,t,n,r,i){this.size=e,this.cellX=t,this.cellY=n,this.fillStyle=r,this.lineStyle=i}return e.prototype.draw=function(e){var t=this.getX(),n=this.getY(),r=this.getSize(),i=this.getFillStyle(),s=this.getLineStyle();e.drawRect(t,n,r,r,i,s)},e.prototype.getSize=function(){return this.size},e.prototype.getX=function(){return this.cellX*this.size},e.prototype.getY=function(){return this.cellY*this.size},e.prototype.getCellX=function(){return this.cellX},e.prototype.setCellX=function(e,t){var n=e.getCellsWidth();this.cellX=(t+n)%n},e.prototype.getCellY=function(){return this.cellY},e.prototype.setCellY=function(e,t){var n=e.getCellsHeight();this.cellY=(t+n)%n},e.prototype.setFillStyle=function(e){this.fillStyle=e},e.prototype.getFillStyle=function(){return this.fillStyle},e.prototype.setLineStyle=function(e){this.lineStyle=e},e.prototype.getLineStyle=function(){return this.lineStyle},e.prototype.doesCollideWith=function(e){var t=this.cellX===e.cellX,n=this.cellY===e.cellY;return t&&n},e}),define("app/Apple",["./numberUtils","./Tile"],function(e,t){function r(e,n,r){var i="#8f0",s="#fff";t.call(this,e,n,r,i,s)}var n=e.getRandomInteger;return r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype.placeRandomly=function(e){var t=e.getCellsWidth(),r=e.getCellsHeight();this.setCellX(e,n(0,t)),this.setCellY(e,n(0,r))},r}),define("app/CommandCode",[],function(){return{TURN_SNAKE_LEFT:"turnSnakeLeft",TURN_SNAKE_UP:"turnSnakeUp",TURN_SNAKE_RIGHT:"turnSnakeRight",TURN_SNAKE_DOWN:"turnSnakeDown",TOGGLE_PAUSE:"togglePause",NULL_COMMAND:"nullCommand"}}),define("app/Direction",[],function(){return{LEFT:0,UP:1,RIGHT:2,DOWN:3}}),define("app/htmlUtils",[],function(){function e(e){var t=document.documentElement.clientWidth,n=document.documentElement.clientHeight;e.style.position="absolute",e.style.left=(t-e.offsetWidth)/2+"px",e.style.top=(n-e.offsetHeight)/2+window.pageYOffset+"px"}return{centreElement:e}}),define("app/InputEvent",[],function(){return{KEY_DOWN:"keydown",KEY_UP:"keyup",RESIZE:"resize"}}),define("app/GameGraphics",["./htmlUtils","./InputEvent"],function(e,t){function r(e,n){this.canvas=document.createElement("canvas"),this.width,this.setWidth(e),this.height,this.setHeight(n),this.canvas.class="gameGraphics",this.canvas.style.backgroundColor="#333333",this.canvas.style.zIndex=8;var r=this.getContext();r.translate(1,1),r.scale(2,2),r.lineWidth=.75;var s=document.getElementsByTagName("body")[0];s.appendChild(this.canvas);var o=this;window.addEventListener(t.RESIZE,function(){i(o)}),i(o)}function i(e){n(e.canvas)}var n=e.centreElement;return r.prototype.reset=function(){var e=this.getContext();e.save(),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,this.canvas.width,this.canvas.height),e.restore()},r.prototype.setWidth=function(e){this.width=e,this.canvas.width=2*e,this.canvas.style.width=e+"px"},r.prototype.getWidth=function(){return this.canvas.width},r.prototype.setHeight=function(e){this.height=e,this.canvas.height=2*e,this.canvas.style.heigth=e+"px"},r.prototype.getHeight=function(){return this.canvas.height},r.prototype.getContext=function(){var e=this.canvas.getContext("2d");return e},r.prototype.drawRect=function(e,t,n,r,i,s){var o=this.getContext();o.beginPath(),o.rect(e,t,n,r),o.fillStyle=i,o.fill(),o.strokeStyle=s,o.stroke()},r}),define("app/KeyCode",[],function(){return{NULL_KEY:0,LEFT:37,UP:38,RIGHT:39,DOWN:40,SPACE:32}}),define("app/InputMap",["./KeyCode"],function(e){function t(){this.keyDownCommandMap={},this.keyUpCommandMap={}}return t.prototype.bindKeyDown=function(e,t){this.keyDownCommandMap[e]=t},t.prototype.getKeyDownBinding=function(e){return this.keyDownCommandMap[e]},t.prototype.unbindKeyDown=function(t){this.keyDownCommandMap[t]=e.NULL_KEY},t.prototype.bindKeyUp=function(e,t){this.keyUpCommandMap[e]=t},t.prototype.getKeyUpBinding=function(e){return this.keyUpCommandMap[e]},t.prototype.unbindKeyUp=function(t){this.keyUpCommandMap[t]=e.NULL_KEY},t}),define("app/timeUtils",[],function(){function e(){var e=window.performance.now?performance.now()+performance.timing.navigationStart:Date.now();return e}return Date.now||(Date.now=function(){return(new Date).getTime()}),function(){var t=["webkit","moz"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n){var r=t[n];window.requestAnimationFrame=window[r+"RequestAnimationFrame"],window.cancelAnimationFrame=window[r+"CancelAnimationFrame"]||window[r+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var n=e(),r=Math.max(i+16,n);return setTimeout(function(){t(i=r)},r-n)},window.cancelAnimationFrame=clearTimeout}}(),{timeNow:e,requestAnimationFrame:window.requestAnimationFrame,cancelAnimationFrame:window.cancelAnimationFrame}}),define("app/Manipulator",["./InputEvent","./InputMap","./KeyCode","./timeUtils"],function(e,t,n,r){function s(){this.nullCommandCode="nullCommand",this.commandListener=null,this.commandListenerArguments=null,this.inputMap=new t,this.keysPressed={};var n=this;window.addEventListener(e.KEY_DOWN,function(e){n.onKeyDown(e)},!1),window.addEventListener(e.KEY_UP,function(e){n.onKeyUp(e)},!1)}function o(t,n){var r=n.keyCode,i=n.type,s=t.nullCommandCode,o=t.inputMap;switch(i){case e.KEY_DOWN:s=o.getKeyDownBinding(r);break;case e.KEY_UP:s=o.getKeyUpBinding(r);break;default:}return s}function u(e,t){var n=e.commandListener,r=o(e,t);if(r!==this.nullCommandCode){var i=Array.prototype.slice.call(e.commandListenerArguments);i.push(r),n.apply(n,i)}}var i=r.timeNow;return s.prototype.isKeyDown=function(e){return this.keysPressed[e]},s.prototype.setCommandListener=function(){var e=Array.prototype.slice.call(arguments);this.commandListener=e[0],this.commandListenerArguments=e.slice(1,e.length)},s.prototype.onKeyDown=function(e){this.keysPressed[e.keyCode]=i(),u(this,e)},s.prototype.onKeyUp=function(e){this.keysPressed[e.keyCode]=0,u(this,e)},s.prototype.bindKeyDown=function(e,t){this.inputMap.bindKeyDown(e,t)},s.prototype.unbindKeyDown=function(e){this.inputMap.unbindKeyDown(e)},s.prototype.bindKeyUp=function(e,t){this.inputMap.bindKeyUp(e,t)},s.prototype.unbindKeyUp=function(e){this.inputMap.unbindKeyUp(e)},s.prototype.setNullCommandCode=function(e){this.nullCommandCode=e},s}),define("app/graphicUtils",["./numberUtils"],function(e){function n(){var e="0123456789ABCDEF".split(""),n="#";for(var r=0;r<6;r++){var i=t(0,16);n+=e[i]}return n}var t=e.getRandomInteger;return{getRandomColor:n}}),define("app/SnakePart",["./graphicUtils","./Tile"],function(e,t){function r(e,r,i){var s=n(),o="#fff";t.call(this,e,r,i,s,o)}var n=e.getRandomColor;return r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype.incrementCellX=function(e){this.setCellX(e,this.cellX+1)},r.prototype.decrementCellX=function(e){this.setCellX(e,this.cellX-1)},r.prototype.incrementCellY=function(e){this.setCellY(e,this.cellY+1)},r.prototype.decrementCellY=function(e){this.setCellY(e,this.cellY-1)},r.prototype.dragTo=function(e,t){this.setCellX(e,t.getCellX()),this.setCellY(e,t.getCellY())},r.prototype.draw=function(e){var r=n();this.setFillStyle(r),t.prototype.draw.call(this,e)},r}),define("app/Game",["./Apple","./CommandCode","./Direction","./GameGraphics","./KeyCode","./Manipulator","./SnakePart","./timeUtils"],function(e,t,n,r,i,s,o,u){function c(e,o,u){this.cellSize=e,this.cellsWidth=o,this.cellsHeight=u,this.stopped=!0,this.lastRequestId=0;var a=o*e,f=u*e;this.graphics=new r(a,f),this.currentDirection=n.LEFT,this.manipulator=new s,this.manipulator.setCommandListener(b,this),this.manipulator.bindKeyDown(i.LEFT,t.TURN_SNAKE_LEFT),this.manipulator.bindKeyDown(i.UP,t.TURN_SNAKE_UP),this.manipulator.bindKeyDown(i.RIGHT,t.TURN_SNAKE_RIGHT),this.manipulator.bindKeyDown(i.DOWN,t.TURN_SNAKE_DOWN),this.manipulator.bindKeyDown(i.SPACE,t.TOGGLE_PAUSE),this.snake=[],w(this),w(this),w(this),w(this),this.apple=null,h(this)}function h(t){t.apple=new e(t.cellSize,-1,-1),t.apple.placeRandomly(t)}function p(e,t){return e.snake[t]}function d(e){return e.snake[0]}function v(e){return e.snake[e.snake.length-1]}function m(e){for(var t=e.snake.length-1;t>0;t--){var n=p(e,t),r=p(e,t-1);n.dragTo(e,r)}y(e)}function g(e){e.graphics.reset(),e.apple.draw(e.graphics);for(var t=0;t<e.snake.length;t++){var n=e.snake[t];n.draw(e.graphics)}}function y(e){var t=d(e);switch(e.currentDirection){case n.LEFT:t.decrementCellX(e);break;case n.UP:t.decrementCellY(e);break;case n.RIGHT:t.incrementCellX(e);break;case n.DOWN:t.incrementCellY(e);break;default:}var r=t.doesCollideWith(e.apple);r&&(w(e),h(e))}function b(e,r){switch(r){case t.TOGGLE_PAUSE:e.isStopped()?e.start():e.pause();break;default:}if(!e.isStopped())switch(r){case t.TURN_SNAKE_LEFT:e.currentDirection=n.LEFT;break;case t.TURN_SNAKE_UP:e.currentDirection=n.UP;break;case t.TURN_SNAKE_RIGHT:e.currentDirection=n.RIGHT;break;case t.TURN_SNAKE_DOWN:e.currentDirection=n.DOWN;break;default:}}function w(e){var t;if(e.snake.length>0){var n=v(e);t=new o(e.cellSize,n.getCellX(),n.getCellY())}else{var r=Math.round(e.cellsWidth/2),i=Math.round(e.cellsHeight/2);t=new o(e.cellSize,r,i)}e.snake.push(t)}var a=u.requestAnimationFrame,f=u.cancelAnimationFrame,l=u.timeNow;return c.prototype.pause=function(){var e=this.lastRequestId;e&&f(e),this.stopped=!0},c.prototype.isStopped=function(){return this.stopped},c.prototype.start=function(){this.stopped=!1,this.run()},c.prototype.run=function(){var e=this.run.bind(this),t=this;t.isStopped()||setTimeout(function(){t.lastRequestId=a(e),m(t),g(t)},50)},c.prototype.getCellsWidth=function(){return this.cellsWidth},c.prototype.getCellsHeight=function(){return this.cellsHeight},c}),define("app/main",["./Game"],function(e){var t=20,n=40,r=30,i=new e(20,40,30);i.start()}),requirejs.config({baseUrl:"lib",paths:{app:"../app"}}),requirejs(["app/main"]),define("app-test",function(){});