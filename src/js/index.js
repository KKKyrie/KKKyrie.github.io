(function() {
	var TIME_FLAG = 'Own JavaScript execute time consuming';
	console.time(TIME_FLAG);

	window.addEventListener('load', function(ev) {
		var kyrieliu = new KKKyrie();
		kyrieliu.init();
		window.kyrieliu = kyrieliu;
	}, false);

	var KKKyrie = function() {};

	KKKyrie.prototype = {

		_data: {
			_isPhone: false,
			_subscriptionUrl: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzIwNTU3NTI4Ng==&hid=1&sn=aa0799da2f2abe970373526219ce6d50#wechat_redirect',
			_blogUrl: 'https://kyrieliu.cn/blog/'
		},

		_find: function(element) {
			return document.querySelector(element);
		},

		/* tencent statistics */
		_addStatistics: function() {
			var _mtac = {
				'senseHash': 0,
				'autoReport': 0
			};
			var mta = document.createElement('script');
			mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4';
			mta.setAttribute('name', 'MTAH5');
			mta.setAttribute('sid', '500545346');
			mta.setAttribute('cid', '500545354');
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(mta, s);
		},

		_judgeIsPhone: function() {
			var flag = false;
			var ua = navigator.userAgent;
			var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			for (var i = 0; i < Agents.length; i++) {
				if (ua.indexOf(Agents[i]) > 0) {
					flag = true;
					break;
				}
			}
			this._data._isPhone = flag;
		},

		_bindEvent: function() {
			var that = this;
			var button = that._find('#enter_btn');
			if (!button) return;
			button.addEventListener('click', function(ev) {
				ev.preventDefault();
				if (typeof MtaH5 !== 'undefined') {
					MtaH5.clickStat('enter_btn_click');
				}

				var jump_url = that._data._isPhone ?
					that._data._subscriptionUrl :
					that._data._blogUrl;
				location.href = jump_url;
			}, false);
		},

		init: function() {
			this._judgeIsPhone();
			this._addStatistics();
			this._bindEvent();
		}
	};

	console.timeEnd(TIME_FLAG);

})();