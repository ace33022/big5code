/**
 *
 * Query Big-5 Code
 *
 * @description
 *
 * @version 2017/02/20 初始版本。
 *
 * @author ace
 *
 * @see <a href="http://requirejs.org/">RequireJS</a>
 *
 * @see <a href="https://jquery.com/">jQuery</a>
 *
 * @see <a href="http://underscorejs.org/">Underscore.js</a>
 * @see <a href="https://github.com/jashkenas/underscore">jashkenas/underscore: JavaScript's utility _ belt</a>
 * @see <a href="http://backbonejs.org/">Backbone.js</a>
 * @see <a href="https://github.com/jashkenas/backbone">jashkenas/backbone: Give your JS App some Backbone with Models, Views, Collections, and Events</a>
 * @see <a href="https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites">Tutorials, blog posts and example sites · jashkenas/backbone Wiki</a>
 *
 * @see <a href="https://getbootstrap.com/">Bootstrap · The most popular HTML, CSS, and JS library in the world.</a>
 *
 * @see <a href="https://stackoverflow.com/questions/19858412/jquery-each-line-in-textarea">jQuery each line in textarea - Stack Overflow</a>
 *
 * @comment
 *
 * @todo
 *
 */

Configurations.loadJS(Configurations.requirejsFile, function() {

	requirejs.config(tw.ace33022.RequireJSConfig);

	requirejs(["tw.ace33022.util.browser.FormUtils", "tw.ace33022.util.browser.ReUtils"], function(FormUtils, ReUtils) {

		jQuery(document).ready(function() {
		
			var saveFile = function(data, filename) {
			
				requirejs(["filesaver"], function() {
				
					try {
						
						saveAs(data, filename);
					} 
					catch(e) {
						
						FormUtils.showMessage('存檔過程有誤！訊息：' + e.message);
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
		
			var txtContentId = 'txtContent' + Math.random().toString(36).substr(2, 6);
			var btnQueryId = 'btnQuery' + Math.random().toString(36).substr(2, 6);

			var tag = '<div class="container-fluid" style="padding-top: 5px;">'
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
			
			window.addEventListener('beforeunload', function(event) {

				var confirmationMessage = 'Abort playing video?';

				// event.returnValue = confirmationMessage;

				return confirmationMessage;
			});

			// 這個寫法只有在轉換瀏覽器的Tab時才有作用，轉換不同程式時則無用！？
			document.addEventListener('visibilitychange',

				function() {

					// if (!document.hidden) initInsertStatus(false);
					// console.log(document.visibilityState);
				},
				false
			);
		
			jQuery(window).on('focus', function(event) {

				if ((jQuery('.modal-open').length === 0) && (jQuery('.modal-backdrop').length === 0)) {
				
					jQuery('#' + txtContentId).focus();
				}
			});

			jQuery(window).on('blur', function(event) {});

			ReUtils.beforeInitEnv(function() {
					
				document.getElementById(txtContentId).addEventListener('keypress', function(event) {

					if (event.keyCode === 13) document.getElementById(btnQueryId).click();
				});
				
				jQuery('#' + txtContentId).on('focus', function(event) { jQuery(this).select(); });
		
				jQuery('#' + btnQueryId).on('click', function(event) {
				
					jQuery('.row').each(function(index, element) { if (index != 0) jQuery(element).remove(); });
				
					if (jQuery('#' + txtContentId).val() != '') {
					
						FormUtils.showProgressbar('編碼資料查詢中，請稍候‧‧‧', 
						
							function(closeProgressbar) {
					
								requirejs(["tw.ace33022.util.StringUtils"], function(StringUtils) {
				
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
												+ '  <td style="text-align: center;">' + (StringUtils.encodeUTF8ToBig5(encodeURI(content[index]))).replace(/%/g, '') + '</td>'
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
	});
});