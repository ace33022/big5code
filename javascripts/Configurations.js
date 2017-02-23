/**
 *
 * Configuratons
 *
 * @author ace
 *
 * @version 2015/11/13 初始版本。
 *
 * @description 執行環境設定。
 *
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof - JavaScript | MDN</a>
 *
 * @see <a href="http://www.javascriptkit.com/javatutors/trycatch2.shtml">The Error object and throwing your own errors</a>
 *
 */
 
(function(root) {

	var result;
	
	var aceDir = 'tw/ace33022';
	var acePath = aceDir + '/';
	
	var Database = function() {return null;};
	
	if (typeof process !== 'undefined') {
	
		// nodeJS執行環境
		result = require('tw/ace33022/DefaultConfigurations.js');
		
		module.exports = result;
	}
	else {
	
		if (typeof Packages !== 'undefined') {

			// Rhino執行環境
			if (Packages.java.lang.System.getProperty('JSLibDir') == null) throw new Error('JSLibDir is undefined!');
			print('JSLibDir:' + Packages.java.lang.System.getProperty('JSLibDir'));
			
			print('load NameSpace...');
			load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/NameSpace.js');
			
			print('load DefaultConfigurations...');
			load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/DefaultConfigurations.js');
		}

		if (typeof root.tw === 'undefined') throw new Error('NameSpace is undefined!');
		if (typeof root.tw.ace33022.DefaultConfigurations === 'undefined') throw new Error('DefaultConfigurations is undefined!');
		
		result = root.tw.ace33022.DefaultConfigurations;
		
		result['Database'] = new Database();
		// result['JSLibDir'] = 'javascripts';
		result['JSLibDir'] = 'https://ace33022.github.io';
		result['JSLibPath'] = result['JSLibDir'] + '/';
		result['DAODir'] = acePath + 'dao/http/browser';

		result["paths"]["underscore"] = 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min';
		result["paths"]["backbone"] = 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min';
		
		result["paths"]["jquery"] = 'https://code.jquery.com/jquery-1.12.3.min';
		result["paths"]["bootstrap"] = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min';
		
		result["paths"]["moment"] = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment';
		result["paths"]["sprintfjs"] = 'https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.0.3/sprintf.min';
		result["paths"]["papaparse"] = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.2/papaparse.min';
		
		result["paths"]["bootbox"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min';
		
		result["paths"]["firebase"] = 'https://www.gstatic.com/firebasejs/live/3.0/firebase';
		result["paths"]["tw.ace33022.util.browser.FormUtils"] = acePath + 'util/browser/bootstrap/FormUtils';
		
		root.Configurations = result;
		
		if (typeof Packages !== 'undefined') load(root.Configurations.JSLibDir + '/tw/ace33022/utils/Rhino/InitEnv.js');
	}
})(this);