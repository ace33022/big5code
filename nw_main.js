/**
 *
 * @description Initialize
 *
 * @version 2017/09/29 初始版本。
 *
 * @author ace
 * 
 * @see {@link http://nwjs.io/|NW.js}
 * @see {@link https://github.com/nwjs/nw.js|nwjs/nw.js: Call all Node.js modules directly from DOM/WebWorker and enable a new way of writing applications with all Web technologies.}
 * @see {@link http://docs.nwjs.io/|NW.js Documentation}
 * @see {@link http://docs.nwjs.io/en/latest/For%20Users/Migration/From%200.12%20to%200.13/|From 0.12 to 0.13 - NW.js Documentation}
 *
 * @see {@link https://github.com/nwjs/nw.js/wiki|Home · nwjs/nw.js Wiki}
 * @see {@link https://github.com/nwjs/nw.js/wiki/Manifest-format|Manifest format · nwjs/nw.js Wiki}
 * @see {@link https://github.com/nwjs/nw.js/wiki/window|Window · nwjs/nw.js Wiki}
 * @see {@link https://github.com/nwjs/nw.js/wiki/Handling-files-and-arguments|Handling files and arguments · nwjs/nw.js Wiki}
 * @see {@link https://github.com/nwjs/nw.js/wiki/Differences-of-JavaScript-contexts|Differences of JavaScript contexts · nwjs/nw.js Wiki}
 * @see {@link https://github.com/nwjs/nw.js/wiki/Using-Node-modules|Using Node modules · nwjs/nw.js Wiki}
 * @see {@link https://github.com/nwjs/nw.js/wiki/Changes-related-to-node|Changes related to node · nwjs/nw.js Wiki}
 * @see {@link https://github.com/nwjs/nw.js/wiki/About-Node.js-server-side-script-in-nw.js|About Node.js server side script in nw.js · nwjs/nw.js Wiki}
 * @see {@link https://github.com/nwjs/nw.js/wiki/faq-name-conflict|Faq name conflict · nwjs/nw.js Wiki}
 *
 * @comment 2017/09/30 ace 透過package.json指定由此處啟動app，則原本在package.json中設定的window參數將不會發生作用。
 * @comment 2017/09/30 ace 指定toolbar參數會造成無法開啟app？
 *
 * @todo 2017/09/30 ace win.on('loaded', function() {})於何時觸發？
 * 
 */
 
var win = nw.Window.open('index.html', {

	// "toolbar": true,
	// "title": "Hello",
	// "icon": "icons/favicon.ico",
	"width": 800,
	"height": 600,
	"inject_js_start": "nw_inject_start.js",
	"inject_js_end": "nw_inject_end.js",
	"frame": true
});

/*
win.on('loaded', function() {

  // the native onload event has just occurred
  var document = win.window.document;
	
	console.log('win on loaded');
});
*/