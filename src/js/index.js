(function() {
	const TIME_FLAG = 'Own JavaScript execute time consuming';
	console.time(TIME_FLAG);

	window.addEventListener('load', function(ev) {
		const kyrieliu = new KKKyrie();
		kyrieliu.init();
		window.kyrieliu = kyrieliu;
	}, false);

	window.addEventListener('visibilitychange', function() {
		document.title = document.hidden ? '你要走了吗？' : 'Kyrie On';
	}, false);

	const KKKyrie = function() {};

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
			const _mtac = {
				'senseHash': 0,
				'autoReport': 0
			};
			const mta = document.createElement('script');
			mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4';
			mta.setAttribute('name', 'MTAH5');
			mta.setAttribute('sid', '500545346');
			mta.setAttribute('cid', '500545354');
			const s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(mta, s);
		},

		_judgeIsPhone: function() {
			let flag = false;
			const ua = navigator.userAgent;
			const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			for (let i = 0; i < Agents.length; i++) {
				if (ua.indexOf(Agents[i]) > 0) {
					flag = true;
					break;
				}
			}
			this._data._isPhone = flag;
		},

		_generateRainbow: function() {
			let c = this._find('#rainbow'),
				x = c.getContext('2d'),
				pr = window.devicePixelRatio || 1,
				w = window.innerWidth,
				h = window.innerHeight,
				f = 90,
				q,
				m = Math,
				r = 0,
				u = m.PI * 2,
				v = m.cos,
				z = m.random;
			c.width = w * pr;
      c.height = h * pr;
      x.scale(pr, pr);
			x.globalAlpha = 0.6;
			const y = (p) => {
				var t = p + (z() * 2 - 1.1) * f
				return (t > h || t < 0) ? y(p) : t
			}
			const d = (i, j) => {
				x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        var k = j.x + (z() * 2 - 0.25) * f,
          n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r -= u / -50
        x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = { x: k, y: n }
			}
			return () => {
				x.clearRect(0, 0, w, h)
        q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
        while (q[1].x < w + f) d(q[0], q[1])
			}
		},

		_bindEvent: function() {
			const that = this;
			const changeRainbow = that._generateRainbow();
			document.onclick = changeRainbow;
			changeRainbow();
			
			const button = that._find('#enter_btn');
			if (!button) return;
			button.addEventListener('click', function(ev) {
				ev.preventDefault();
				ev.stopPropagation();
				if (typeof MtaH5 !== 'undefined') {
					MtaH5.clickStat('enter_btn_click');
				}

				const jump_url = that._data._isPhone ?
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