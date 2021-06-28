/**
 *
 * @description Query Big-5 Code
 *
 * @version 2017/02/20 ace 初始版本。
 *
 * @author ace
 *
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link https://jquery.com/|jQuery}
 *
 * @see {@link https://getbootstrap.com/|Bootstrap · The most popular HTML, CSS, and JS library in the world.}
 *
 * @see {@link http://underscorejs.org/|Underscore.js}
 * @see {@link https://github.com/jashkenas/underscore|jashkenas/underscore: JavaScript's utility _ belt}
 *
 * @see {@link http://backbonejs.org/|Backbone.js}
 * @see {@link https://github.com/jashkenas/backbone|jashkenas/backbone: Give your JS App some Backbone with Models, Views, Collections, and Events}
 * @see {@link https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites|Tutorials, blog posts and example sites · jashkenas/backbone Wiki}
 *
 * @see {@link http://billor.chsh.chc.edu.tw/php/Tools/qBig5.php|BIG5查碼系統}
 * @see {@link https://openhome.cc/Gossip/Encoding/JavaScript.html|JavaScript 編碼基礎}
 * @see {@link https://openhome.cc/Gossip/Encoding/Big5Unicode.html|Big5 網頁難字}
 * @see {@link https://ithelp.ithome.com.tw/questions/10055026|javascript 轉碼問題 utf-8 轉成 big5 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
 * @see {@link https://blog.longwin.com.tw/2010/01/javascript-encodeuri-component-utf-8-2010/|JavaScript 的 encodeURIComponent() 會將字串轉換成 UTF-8 編碼 | Tsung's Blog}
 * @see {@link https://dotblogs.com.tw/ricochen/2010/07/18/16624|[Javascript]Big5&lt;Switch&gt;Utf8 | RiCo技術農場 - 點部落}
 * @see {@link http://computer.jges.mlc.edu.tw/index.php/css_category/114-bootstrap%E7%9A%84%E8%A1%A8%E5%96%AE|bootstrap的表單}
 *
 */

Configuration.loadJS(Configuration.requirejsFile, function() {

	requirejs.config(tw.ace33022.RequireJSConfig);

	requirejs(["tw.ace33022.util.browser.CommonForm"], function(CommonForm) {

		var saveFile = function(data, filename) {
		
			requirejs(["filesaver"], function() {
			
				try {
					
					saveAs(data, filename);
				} 
				catch(e) {
					
					CommonForm.showMessage('存檔過程有誤！訊息：' + e.message);
				}
			});
		};
	
		var updateCode = function() {
		
			requirejs(["blob"], function() {
			
				var key1, key2, key3;
				var obj1, obj2;
				var change;
				
				var blob;
				
				for (key1 in EncodedUTF8ToBig5TABLE) {
				
					if (typeof EncodedUTF8ToBig5TABLE[key1] == 'object') {
					
						obj1 = EncodedUTF8ToBig5TABLE[key1];
						for (key2 in obj1) {
						
							if (typeof obj1[key2] == 'string') {
							
								if ((obj1[key2]).length == 6) {
								
									// console.log(obj1[key2]);
								}
								else {
								
									change = obj1[key2].substring(0, 3) + '%' + (parseInt(obj1[key2].charCodeAt(obj1[key2].length - 1))).toString(16);
									
									console.log(obj1[key2] + '=>' + change);
									
									obj1[key2] = change;
								}
							}
							else {
							
								obj2 = obj1[key2];
								for (key3 in obj2) {
								
									if (typeof obj2[key3] == 'string') {
									
										if ((obj2[key3]).length == 6) {
								
											// console.log(obj2[key3]);
										}
										else {
								
											change = obj2[key3].substring(0, 3) + '%' + (parseInt(obj2[key3].charCodeAt(obj2[key3].length - 1))).toString(16);
									
											console.log(obj2[key3] + '=>' + change);
											
											obj2[key3] = change;
										}
									}
									else {
									
										console.log('still object');
									}
								}
							}
						}
					}
				}
				
				blob = new Blob([JSON.stringify(EncodedUTF8ToBig5TABLE)], {type: 'text/plain;charset=' + document.characterSet});
				
				saveFile(blob, 'code_map.json');
			});
		};
		
		// InitReSetUtil.beforeInitEnv(function() {});
		
		var txtContentId = 'txtContent' + Math.random().toString(36).substr(2, 6);
		var btnQueryId = 'btnQuery' + Math.random().toString(36).substr(2, 6);

		var tag;

		if ((location.protocol == 'http:') || (location.protocol == 'https:')) {

			tag = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
					+ '<!-- big5code -->'
					+ '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2244483882494685"	data-ad-slot="5888442730"	data-ad-format="auto" data-full-width-responsive="true"></ins>'
					+ '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
			jQuery('body').append(tag);
		}

		tag = '<div class="container-fluid" style="padding-top: 5px;">'
				+ '  <div class="row">'
				+ '    <div class="col-md-offset-4 col-md-4">'
				+ '      <div class="input-group">'
				+ '        <input type="text" id="' + txtContentId + '" class="form-control" tabindex="0" placeholder="中文字" />'
				+ '        <span class="input-group-btn"><input type="button" id="' + btnQueryId + '" class="btn btn-primary" tabindex="0" value="查詢" /></span>'
				+ '      </div>'
				+ '    </div>'
				+ '  </div>'
				+ '</div>';
		jQuery('body').append(tag);

		jQuery(window).on('focus', function(event) {

			if ((jQuery('.modal-open').length === 0) && (jQuery('.modal-backdrop').length === 0)) {

				jQuery('#' + txtContentId).focus();
			}
		});

		jQuery('#' + txtContentId).on('focus', function(event) { jQuery(this).select(); });

		document.getElementById(txtContentId).addEventListener('keypress', function(event) {

			if (event.keyCode === 13) document.getElementById(btnQueryId).click();
		});

		jQuery('#' + btnQueryId).on('click', function(event) {

			jQuery('.row').each(function(index, element) { if (index != 0) jQuery(element).remove(); });

			if (jQuery('#' + txtContentId).val() !== '') {

				CommonForm.showProgressbar('編碼資料查詢中，請稍候‧‧‧', 

					function(closeProgressbar) {

						requirejs(["tw.ace33022.util.StringUtil"], function(StringUtil) {

							var table = jQuery('<table class="center table table-hover table-striped table-bordered"></table>');
							var thead = jQuery('<thead></thead>');
							var tbody = jQuery('<tbody></tbody>');

							var content = jQuery('#' + txtContentId).val();

							var index;
							var tag;

							tag = '<tr>'
									+ '  <th style="text-align: center;">中文字</th>'
									+ '  <th style="text-align: center;">UTF8</th>'
									+ '  <th style="text-align: center;">BIG5</th>'
									+ '</tr>'
							thead.append(tag);

							for (index = 0; index <= content.length - 1; index++) {

								tag = '<tr>'
										+ '  <td style="text-align: center;">' + content[index] + '</td>'
										+ '  <td style="text-align: center;">' + (encodeURI(content[index])).replace(/%/g, '') + '</td>'
										+ '  <td style="text-align: center;">' + (StringUtil.encodeUTF8ToBig5(encodeURI(content[index]))).replace(/%/g, '') + '</td>'
										+ '</tr>';
								tbody.append(tag);
							}

							table.append(thead).append(tbody);

							jQuery('<div class="row" style="padding-top: 5px;"></div>').append(jQuery('<div class="col-md-offset-3 col-md-6"></div>').append(table)).appendTo(jQuery('.container-fluid'));

							closeProgressbar();
						});
					},
					function() {

						jQuery('#' + txtContentId).focus().select();
					}
				);
			}
		});

		jQuery('#' + txtContentId).focus();
		
		
	});
});
