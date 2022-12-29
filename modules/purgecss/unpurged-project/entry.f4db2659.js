function ds(e, t) {
	const n = Object.create(null),
		l = e.split(',');
	for (let a = 0; a < l.length; a++) n[l[a]] = !0;
	return t ? (a) => !!n[a.toLowerCase()] : (a) => !!n[a];
}
function Co(e) {
	if (ce(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const l = e[n],
				a = He(l) ? Gv(l) : Co(l);
			if (a) for (const o in a) t[o] = a[o];
		}
		return t;
	} else {
		if (He(e)) return e;
		if (Pe(e)) return e;
	}
}
const qv = /;(?![^(]*\))/g,
	Yv = /:([^]+)/,
	Xv = /\/\*.*?\*\//gs;
function Gv(e) {
	const t = {};
	return (
		e
			.replace(Xv, '')
			.split(qv)
			.forEach((n) => {
				if (n) {
					const l = n.split(Yv);
					l.length > 1 && (t[l[0].trim()] = l[1].trim());
				}
			}),
		t
	);
}
function So(e) {
	let t = '';
	if (He(e)) t = e;
	else if (ce(e))
		for (let n = 0; n < e.length; n++) {
			const l = So(e[n]);
			l && (t += l + ' ');
		}
	else if (Pe(e)) for (const n in e) e[n] && (t += n + ' ');
	return t.trim();
}
function JC(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !He(t) && (e.class = So(t)), n && (e.style = Co(n)), e;
}
const Zv = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
	Jv = ds(Zv);
function Qu(e) {
	return !!e || e === '';
}
const QC = (e) =>
		He(e)
			? e
			: e == null
			? ''
			: ce(e) || (Pe(e) && (e.toString === lc || !me(e.toString)))
			? JSON.stringify(e, ec, 2)
			: String(e),
	ec = (e, t) =>
		t && t.__v_isRef
			? ec(e, t.value)
			: sl(t)
			? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [l, a]) => ((n[`${l} =>`] = a), n), {}) }
			: tc(t)
			? { [`Set(${t.size})`]: [...t.values()] }
			: Pe(t) && !ce(t) && !ac(t)
			? String(t)
			: t,
	Ee = {},
	il = [],
	Ot = () => {},
	Qv = () => !1,
	em = /^on[^a-z]/,
	ga = (e) => em.test(e),
	fs = (e) => e.startsWith('onUpdate:'),
	Ye = Object.assign,
	vs = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1);
	},
	tm = Object.prototype.hasOwnProperty,
	Ce = (e, t) => tm.call(e, t),
	ce = Array.isArray,
	sl = (e) => wo(e) === '[object Map]',
	tc = (e) => wo(e) === '[object Set]',
	me = (e) => typeof e == 'function',
	He = (e) => typeof e == 'string',
	ms = (e) => typeof e == 'symbol',
	Pe = (e) => e !== null && typeof e == 'object',
	nc = (e) => Pe(e) && me(e.then) && me(e.catch),
	lc = Object.prototype.toString,
	wo = (e) => lc.call(e),
	nm = (e) => wo(e).slice(8, -1),
	ac = (e) => wo(e) === '[object Object]',
	hs = (e) => He(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
	Kl = ds(
		',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
	),
	ko = (e) => {
		const t = Object.create(null);
		return (n) => t[n] || (t[n] = e(n));
	},
	lm = /-(\w)/g,
	It = ko((e) => e.replace(lm, (t, n) => (n ? n.toUpperCase() : ''))),
	am = /\B([A-Z])/g,
	_l = ko((e) => e.replace(am, '-$1').toLowerCase()),
	on = ko((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	qa = ko((e) => (e ? `on${on(e)}` : '')),
	na = (e, t) => !Object.is(e, t),
	Ya = (e, t) => {
		for (let n = 0; n < e.length; n++) e[n](t);
	},
	eo = (e, t, n) => {
		Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
	},
	fl = (e) => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	};
let pr;
const om = () =>
	pr ||
	(pr =
		typeof globalThis < 'u'
			? globalThis
			: typeof self < 'u'
			? self
			: typeof window < 'u'
			? window
			: typeof global < 'u'
			? global
			: {});
let wt;
class oc {
	constructor(t = !1) {
		(this.detached = t),
			(this.active = !0),
			(this.effects = []),
			(this.cleanups = []),
			(this.parent = wt),
			!t && wt && (this.index = (wt.scopes || (wt.scopes = [])).push(this) - 1);
	}
	run(t) {
		if (this.active) {
			const n = wt;
			try {
				return (wt = this), t();
			} finally {
				wt = n;
			}
		}
	}
	on() {
		wt = this;
	}
	off() {
		wt = this.parent;
	}
	stop(t) {
		if (this.active) {
			let n, l;
			for (n = 0, l = this.effects.length; n < l; n++) this.effects[n].stop();
			for (n = 0, l = this.cleanups.length; n < l; n++) this.cleanups[n]();
			if (this.scopes) for (n = 0, l = this.scopes.length; n < l; n++) this.scopes[n].stop(!0);
			if (!this.detached && this.parent && !t) {
				const a = this.parent.scopes.pop();
				a && a !== this && ((this.parent.scopes[this.index] = a), (a.index = this.index));
			}
			(this.parent = void 0), (this.active = !1);
		}
	}
}
function xo(e) {
	return new oc(e);
}
function im(e, t = wt) {
	t && t.active && t.effects.push(e);
}
function Gt(e) {
	wt && wt.cleanups.push(e);
}
const gs = (e) => {
		const t = new Set(e);
		return (t.w = 0), (t.n = 0), t;
	},
	ic = (e) => (e.w & _n) > 0,
	sc = (e) => (e.n & _n) > 0,
	sm = ({ deps: e }) => {
		if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= _n;
	},
	rm = (e) => {
		const { deps: t } = e;
		if (t.length) {
			let n = 0;
			for (let l = 0; l < t.length; l++) {
				const a = t[l];
				ic(a) && !sc(a) ? a.delete(e) : (t[n++] = a), (a.w &= ~_n), (a.n &= ~_n);
			}
			t.length = n;
		}
	},
	wi = new WeakMap();
let Ul = 0,
	_n = 1;
const ki = 30;
let Bt;
const Hn = Symbol(''),
	xi = Symbol('');
class ys {
	constructor(t, n = null, l) {
		(this.fn = t), (this.scheduler = n), (this.active = !0), (this.deps = []), (this.parent = void 0), im(this, l);
	}
	run() {
		if (!this.active) return this.fn();
		let t = Bt,
			n = bn;
		for (; t; ) {
			if (t === this) return;
			t = t.parent;
		}
		try {
			return (this.parent = Bt), (Bt = this), (bn = !0), (_n = 1 << ++Ul), Ul <= ki ? sm(this) : _r(this), this.fn();
		} finally {
			Ul <= ki && rm(this),
				(_n = 1 << --Ul),
				(Bt = this.parent),
				(bn = n),
				(this.parent = void 0),
				this.deferStop && this.stop();
		}
	}
	stop() {
		Bt === this ? (this.deferStop = !0) : this.active && (_r(this), this.onStop && this.onStop(), (this.active = !1));
	}
}
function _r(e) {
	const { deps: t } = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0;
	}
}
let bn = !0;
const rc = [];
function Cl() {
	rc.push(bn), (bn = !1);
}
function Sl() {
	const e = rc.pop();
	bn = e === void 0 ? !0 : e;
}
function gt(e, t, n) {
	if (bn && Bt) {
		let l = wi.get(e);
		l || wi.set(e, (l = new Map()));
		let a = l.get(n);
		a || l.set(n, (a = gs())), uc(a);
	}
}
function uc(e, t) {
	let n = !1;
	Ul <= ki ? sc(e) || ((e.n |= _n), (n = !ic(e))) : (n = !e.has(Bt)), n && (e.add(Bt), Bt.deps.push(e));
}
function tn(e, t, n, l, a, o) {
	const i = wi.get(e);
	if (!i) return;
	let s = [];
	if (t === 'clear') s = [...i.values()];
	else if (n === 'length' && ce(e)) {
		const r = fl(l);
		i.forEach((u, c) => {
			(c === 'length' || c >= r) && s.push(u);
		});
	} else
		switch ((n !== void 0 && s.push(i.get(n)), t)) {
			case 'add':
				ce(e) ? hs(n) && s.push(i.get('length')) : (s.push(i.get(Hn)), sl(e) && s.push(i.get(xi)));
				break;
			case 'delete':
				ce(e) || (s.push(i.get(Hn)), sl(e) && s.push(i.get(xi)));
				break;
			case 'set':
				sl(e) && s.push(i.get(Hn));
				break;
		}
	if (s.length === 1) s[0] && $i(s[0]);
	else {
		const r = [];
		for (const u of s) u && r.push(...u);
		$i(gs(r));
	}
}
function $i(e, t) {
	const n = ce(e) ? e : [...e];
	for (const l of n) l.computed && Cr(l);
	for (const l of n) l.computed || Cr(l);
}
function Cr(e, t) {
	(e !== Bt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const um = ds('__proto__,__v_isRef,__isVue'),
	cc = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter((e) => e !== 'arguments' && e !== 'caller')
			.map((e) => Symbol[e])
			.filter(ms),
	),
	cm = bs(),
	dm = bs(!1, !0),
	fm = bs(!0),
	Sr = vm();
function vm() {
	const e = {};
	return (
		['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
			e[t] = function (...n) {
				const l = Se(this);
				for (let o = 0, i = this.length; o < i; o++) gt(l, 'get', o + '');
				const a = l[t](...n);
				return a === -1 || a === !1 ? l[t](...n.map(Se)) : a;
			};
		}),
		['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
			e[t] = function (...n) {
				Cl();
				const l = Se(this)[t].apply(this, n);
				return Sl(), l;
			};
		}),
		e
	);
}
function bs(e = !1, t = !1) {
	return function (l, a, o) {
		if (a === '__v_isReactive') return !e;
		if (a === '__v_isReadonly') return e;
		if (a === '__v_isShallow') return t;
		if (a === '__v_raw' && o === (e ? (t ? Im : hc) : t ? mc : vc).get(l)) return l;
		const i = ce(l);
		if (!e && i && Ce(Sr, a)) return Reflect.get(Sr, a, o);
		const s = Reflect.get(l, a, o);
		return (ms(a) ? cc.has(a) : um(a)) || (e || gt(l, 'get', a), t)
			? s
			: Le(s)
			? i && hs(a)
				? s
				: s.value
			: Pe(s)
			? e
				? ya(s)
				: We(s)
			: s;
	};
}
const mm = dc(),
	hm = dc(!0);
function dc(e = !1) {
	return function (n, l, a, o) {
		let i = n[l];
		if (vl(i) && Le(i) && !Le(a)) return !1;
		if (!e && (!to(a) && !vl(a) && ((i = Se(i)), (a = Se(a))), !ce(n) && Le(i) && !Le(a))) return (i.value = a), !0;
		const s = ce(n) && hs(l) ? Number(l) < n.length : Ce(n, l),
			r = Reflect.set(n, l, a, o);
		return n === Se(o) && (s ? na(a, i) && tn(n, 'set', l, a) : tn(n, 'add', l, a)), r;
	};
}
function gm(e, t) {
	const n = Ce(e, t);
	e[t];
	const l = Reflect.deleteProperty(e, t);
	return l && n && tn(e, 'delete', t, void 0), l;
}
function ym(e, t) {
	const n = Reflect.has(e, t);
	return (!ms(t) || !cc.has(t)) && gt(e, 'has', t), n;
}
function bm(e) {
	return gt(e, 'iterate', ce(e) ? 'length' : Hn), Reflect.ownKeys(e);
}
const fc = { get: cm, set: mm, deleteProperty: gm, has: ym, ownKeys: bm },
	pm = {
		get: fm,
		set(e, t) {
			return !0;
		},
		deleteProperty(e, t) {
			return !0;
		},
	},
	_m = Ye({}, fc, { get: dm, set: hm }),
	ps = (e) => e,
	$o = (e) => Reflect.getPrototypeOf(e);
function Ta(e, t, n = !1, l = !1) {
	e = e.__v_raw;
	const a = Se(e),
		o = Se(t);
	n || (t !== o && gt(a, 'get', t), gt(a, 'get', o));
	const { has: i } = $o(a),
		s = l ? ps : n ? Ss : la;
	if (i.call(a, t)) return s(e.get(t));
	if (i.call(a, o)) return s(e.get(o));
	e !== a && e.get(t);
}
function Aa(e, t = !1) {
	const n = this.__v_raw,
		l = Se(n),
		a = Se(e);
	return t || (e !== a && gt(l, 'has', e), gt(l, 'has', a)), e === a ? n.has(e) : n.has(e) || n.has(a);
}
function Pa(e, t = !1) {
	return (e = e.__v_raw), !t && gt(Se(e), 'iterate', Hn), Reflect.get(e, 'size', e);
}
function wr(e) {
	e = Se(e);
	const t = Se(this);
	return $o(t).has.call(t, e) || (t.add(e), tn(t, 'add', e, e)), this;
}
function kr(e, t) {
	t = Se(t);
	const n = Se(this),
		{ has: l, get: a } = $o(n);
	let o = l.call(n, e);
	o || ((e = Se(e)), (o = l.call(n, e)));
	const i = a.call(n, e);
	return n.set(e, t), o ? na(t, i) && tn(n, 'set', e, t) : tn(n, 'add', e, t), this;
}
function xr(e) {
	const t = Se(this),
		{ has: n, get: l } = $o(t);
	let a = n.call(t, e);
	a || ((e = Se(e)), (a = n.call(t, e))), l && l.call(t, e);
	const o = t.delete(e);
	return a && tn(t, 'delete', e, void 0), o;
}
function $r() {
	const e = Se(this),
		t = e.size !== 0,
		n = e.clear();
	return t && tn(e, 'clear', void 0, void 0), n;
}
function Ba(e, t) {
	return function (l, a) {
		const o = this,
			i = o.__v_raw,
			s = Se(i),
			r = t ? ps : e ? Ss : la;
		return !e && gt(s, 'iterate', Hn), i.forEach((u, c) => l.call(a, r(u), r(c), o));
	};
}
function Oa(e, t, n) {
	return function (...l) {
		const a = this.__v_raw,
			o = Se(a),
			i = sl(o),
			s = e === 'entries' || (e === Symbol.iterator && i),
			r = e === 'keys' && i,
			u = a[e](...l),
			c = n ? ps : t ? Ss : la;
		return (
			!t && gt(o, 'iterate', r ? xi : Hn),
			{
				next() {
					const { value: f, done: d } = u.next();
					return d ? { value: f, done: d } : { value: s ? [c(f[0]), c(f[1])] : c(f), done: d };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function vn(e) {
	return function (...t) {
		return e === 'delete' ? !1 : this;
	};
}
function Cm() {
	const e = {
			get(o) {
				return Ta(this, o);
			},
			get size() {
				return Pa(this);
			},
			has: Aa,
			add: wr,
			set: kr,
			delete: xr,
			clear: $r,
			forEach: Ba(!1, !1),
		},
		t = {
			get(o) {
				return Ta(this, o, !1, !0);
			},
			get size() {
				return Pa(this);
			},
			has: Aa,
			add: wr,
			set: kr,
			delete: xr,
			clear: $r,
			forEach: Ba(!1, !0),
		},
		n = {
			get(o) {
				return Ta(this, o, !0);
			},
			get size() {
				return Pa(this, !0);
			},
			has(o) {
				return Aa.call(this, o, !0);
			},
			add: vn('add'),
			set: vn('set'),
			delete: vn('delete'),
			clear: vn('clear'),
			forEach: Ba(!0, !1),
		},
		l = {
			get(o) {
				return Ta(this, o, !0, !0);
			},
			get size() {
				return Pa(this, !0);
			},
			has(o) {
				return Aa.call(this, o, !0);
			},
			add: vn('add'),
			set: vn('set'),
			delete: vn('delete'),
			clear: vn('clear'),
			forEach: Ba(!0, !0),
		};
	return (
		['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
			(e[o] = Oa(o, !1, !1)), (n[o] = Oa(o, !0, !1)), (t[o] = Oa(o, !1, !0)), (l[o] = Oa(o, !0, !0));
		}),
		[e, n, t, l]
	);
}
const [Sm, wm, km, xm] = Cm();
function _s(e, t) {
	const n = t ? (e ? xm : km) : e ? wm : Sm;
	return (l, a, o) =>
		a === '__v_isReactive'
			? !e
			: a === '__v_isReadonly'
			? e
			: a === '__v_raw'
			? l
			: Reflect.get(Ce(n, a) && a in l ? n : l, a, o);
}
const $m = { get: _s(!1, !1) },
	Vm = { get: _s(!1, !0) },
	Lm = { get: _s(!0, !1) },
	vc = new WeakMap(),
	mc = new WeakMap(),
	hc = new WeakMap(),
	Im = new WeakMap();
function Em(e) {
	switch (e) {
		case 'Object':
		case 'Array':
			return 1;
		case 'Map':
		case 'Set':
		case 'WeakMap':
		case 'WeakSet':
			return 2;
		default:
			return 0;
	}
}
function Tm(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Em(nm(e));
}
function We(e) {
	return vl(e) ? e : Cs(e, !1, fc, $m, vc);
}
function gc(e) {
	return Cs(e, !1, _m, Vm, mc);
}
function ya(e) {
	return Cs(e, !0, pm, Lm, hc);
}
function Cs(e, t, n, l, a) {
	if (!Pe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const o = a.get(e);
	if (o) return o;
	const i = Tm(e);
	if (i === 0) return e;
	const s = new Proxy(e, i === 2 ? l : n);
	return a.set(e, s), s;
}
function rl(e) {
	return vl(e) ? rl(e.__v_raw) : !!(e && e.__v_isReactive);
}
function vl(e) {
	return !!(e && e.__v_isReadonly);
}
function to(e) {
	return !!(e && e.__v_isShallow);
}
function yc(e) {
	return rl(e) || vl(e);
}
function Se(e) {
	const t = e && e.__v_raw;
	return t ? Se(t) : e;
}
function bc(e) {
	return eo(e, '__v_skip', !0), e;
}
const la = (e) => (Pe(e) ? We(e) : e),
	Ss = (e) => (Pe(e) ? ya(e) : e);
function pc(e) {
	bn && Bt && ((e = Se(e)), uc(e.dep || (e.dep = gs())));
}
function _c(e, t) {
	(e = Se(e)), e.dep && $i(e.dep);
}
function Le(e) {
	return !!(e && e.__v_isRef === !0);
}
function R(e) {
	return Cc(e, !1);
}
function Am(e) {
	return Cc(e, !0);
}
function Cc(e, t) {
	return Le(e) ? e : new Pm(e, t);
}
class Pm {
	constructor(t, n) {
		(this.__v_isShallow = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = n ? t : Se(t)),
			(this._value = n ? t : la(t));
	}
	get value() {
		return pc(this), this._value;
	}
	set value(t) {
		const n = this.__v_isShallow || to(t) || vl(t);
		(t = n ? t : Se(t)), na(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : la(t)), _c(this));
	}
}
function Ge(e) {
	return Le(e) ? e.value : e;
}
const Bm = {
	get: (e, t, n) => Ge(Reflect.get(e, t, n)),
	set: (e, t, n, l) => {
		const a = e[t];
		return Le(a) && !Le(n) ? ((a.value = n), !0) : Reflect.set(e, t, n, l);
	},
};
function Sc(e) {
	return rl(e) ? e : new Proxy(e, Bm);
}
function ws(e) {
	const t = ce(e) ? new Array(e.length) : {};
	for (const n in e) t[n] = N(e, n);
	return t;
}
class Om {
	constructor(t, n, l) {
		(this._object = t), (this._key = n), (this._defaultValue = l), (this.__v_isRef = !0);
	}
	get value() {
		const t = this._object[this._key];
		return t === void 0 ? this._defaultValue : t;
	}
	set value(t) {
		this._object[this._key] = t;
	}
}
function N(e, t, n) {
	const l = e[t];
	return Le(l) ? l : new Om(e, t, n);
}
var wc;
class Rm {
	constructor(t, n, l, a) {
		(this._setter = n),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this[wc] = !1),
			(this._dirty = !0),
			(this.effect = new ys(t, () => {
				this._dirty || ((this._dirty = !0), _c(this));
			})),
			(this.effect.computed = this),
			(this.effect.active = this._cacheable = !a),
			(this.__v_isReadonly = l);
	}
	get value() {
		const t = Se(this);
		return pc(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value;
	}
	set value(t) {
		this._setter(t);
	}
}
wc = '__v_isReadonly';
function Mm(e, t, n = !1) {
	let l, a;
	const o = me(e);
	return o ? ((l = e), (a = Ot)) : ((l = e.get), (a = e.set)), new Rm(l, a, o || !a, n);
}
function pn(e, t, n, l) {
	let a;
	try {
		a = l ? e(...l) : e();
	} catch (o) {
		wl(o, t, n);
	}
	return a;
}
function $t(e, t, n, l) {
	if (me(e)) {
		const o = pn(e, t, n, l);
		return (
			o &&
				nc(o) &&
				o.catch((i) => {
					wl(i, t, n);
				}),
			o
		);
	}
	const a = [];
	for (let o = 0; o < e.length; o++) a.push($t(e[o], t, n, l));
	return a;
}
function wl(e, t, n, l = !0) {
	const a = t ? t.vnode : null;
	if (t) {
		let o = t.parent;
		const i = t.proxy,
			s = n;
		for (; o; ) {
			const u = o.ec;
			if (u) {
				for (let c = 0; c < u.length; c++) if (u[c](e, i, s) === !1) return;
			}
			o = o.parent;
		}
		const r = t.appContext.config.errorHandler;
		if (r) {
			pn(r, null, 10, [e, i, s]);
			return;
		}
	}
	Fm(e, n, a, l);
}
function Fm(e, t, n, l = !0) {
	console.error(e);
}
let aa = !1,
	Vi = !1;
const Ze = [];
let Wt = 0;
const ul = [];
let en = null,
	Tn = 0;
const kc = Promise.resolve();
let ks = null;
function Te(e) {
	const t = ks || kc;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Hm(e) {
	let t = Wt + 1,
		n = Ze.length;
	for (; t < n; ) {
		const l = (t + n) >>> 1;
		oa(Ze[l]) < e ? (t = l + 1) : (n = l);
	}
	return t;
}
function Vo(e) {
	(!Ze.length || !Ze.includes(e, aa && e.allowRecurse ? Wt + 1 : Wt)) &&
		(e.id == null ? Ze.push(e) : Ze.splice(Hm(e.id), 0, e), xc());
}
function xc() {
	!aa && !Vi && ((Vi = !0), (ks = kc.then(Vc)));
}
function Nm(e) {
	const t = Ze.indexOf(e);
	t > Wt && Ze.splice(t, 1);
}
function $c(e) {
	ce(e) ? ul.push(...e) : (!en || !en.includes(e, e.allowRecurse ? Tn + 1 : Tn)) && ul.push(e), xc();
}
function Vr(e, t = aa ? Wt + 1 : 0) {
	for (; t < Ze.length; t++) {
		const n = Ze[t];
		n && n.pre && (Ze.splice(t, 1), t--, n());
	}
}
function no(e) {
	if (ul.length) {
		const t = [...new Set(ul)];
		if (((ul.length = 0), en)) {
			en.push(...t);
			return;
		}
		for (en = t, en.sort((n, l) => oa(n) - oa(l)), Tn = 0; Tn < en.length; Tn++) en[Tn]();
		(en = null), (Tn = 0);
	}
}
const oa = (e) => (e.id == null ? 1 / 0 : e.id),
	Dm = (e, t) => {
		const n = oa(e) - oa(t);
		if (n === 0) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1;
		}
		return n;
	};
function Vc(e) {
	(Vi = !1), (aa = !0), Ze.sort(Dm);
	const t = Ot;
	try {
		for (Wt = 0; Wt < Ze.length; Wt++) {
			const n = Ze[Wt];
			n && n.active !== !1 && pn(n, null, 14);
		}
	} finally {
		(Wt = 0), (Ze.length = 0), no(), (aa = !1), (ks = null), (Ze.length || ul.length) && Vc();
	}
}
function jm(e, t, ...n) {
	if (e.isUnmounted) return;
	const l = e.vnode.props || Ee;
	let a = n;
	const o = t.startsWith('update:'),
		i = o && t.slice(7);
	if (i && i in l) {
		const c = `${i === 'modelValue' ? 'model' : i}Modifiers`,
			{ number: f, trim: d } = l[c] || Ee;
		d && (a = n.map((v) => (He(v) ? v.trim() : v))), f && (a = n.map(fl));
	}
	let s,
		r = l[(s = qa(t))] || l[(s = qa(It(t)))];
	!r && o && (r = l[(s = qa(_l(t)))]), r && $t(r, e, 6, a);
	const u = l[s + 'Once'];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		(e.emitted[s] = !0), $t(u, e, 6, a);
	}
}
function Lc(e, t, n = !1) {
	const l = t.emitsCache,
		a = l.get(e);
	if (a !== void 0) return a;
	const o = e.emits;
	let i = {},
		s = !1;
	if (!me(e)) {
		const r = (u) => {
			const c = Lc(u, t, !0);
			c && ((s = !0), Ye(i, c));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !o && !s
		? (Pe(e) && l.set(e, null), null)
		: (ce(o) ? o.forEach((r) => (i[r] = null)) : Ye(i, o), Pe(e) && l.set(e, i), i);
}
function Lo(e, t) {
	return !e || !ga(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, '')), Ce(e, t[0].toLowerCase() + t.slice(1)) || Ce(e, _l(t)) || Ce(e, t));
}
let mt = null,
	Io = null;
function lo(e) {
	const t = mt;
	return (mt = e), (Io = (e && e.type.__scopeId) || null), t;
}
function eS(e) {
	Io = e;
}
function tS() {
	Io = null;
}
function ft(e, t = mt, n) {
	if (!t || e._n) return e;
	const l = (...a) => {
		l._d && Hr(-1);
		const o = lo(t);
		let i;
		try {
			i = e(...a);
		} finally {
			lo(o), l._d && Hr(1);
		}
		return i;
	};
	return (l._n = !0), (l._c = !0), (l._d = !0), l;
}
function Jo(e) {
	const {
		type: t,
		vnode: n,
		proxy: l,
		withProxy: a,
		props: o,
		propsOptions: [i],
		slots: s,
		attrs: r,
		emit: u,
		render: c,
		renderCache: f,
		data: d,
		setupState: v,
		ctx: h,
		inheritAttrs: y,
	} = e;
	let V, p;
	const b = lo(e);
	try {
		if (n.shapeFlag & 4) {
			const x = a || l;
			(V = kt(c.call(x, x, f, o, v, d, h))), (p = r);
		} else {
			const x = t;
			(V = kt(x.length > 1 ? x(o, { attrs: r, slots: s, emit: u }) : x(o, null))), (p = t.props ? r : Um(r));
		}
	} catch (x) {
		(Gl.length = 0), wl(x, e, 1), (V = m(Vt));
	}
	let g = V;
	if (p && y !== !1) {
		const x = Object.keys(p),
			{ shapeFlag: S } = g;
		x.length && S & 7 && (i && x.some(fs) && (p = Wm(p, i)), (g = nn(g, p)));
	}
	return (
		n.dirs && ((g = nn(g)), (g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs)),
		n.transition && (g.transition = n.transition),
		(V = g),
		lo(b),
		V
	);
}
function zm(e) {
	let t;
	for (let n = 0; n < e.length; n++) {
		const l = e[n];
		if (io(l)) {
			if (l.type !== Vt || l.children === 'v-if') {
				if (t) return;
				t = l;
			}
		} else return;
	}
	return t;
}
const Um = (e) => {
		let t;
		for (const n in e) (n === 'class' || n === 'style' || ga(n)) && ((t || (t = {}))[n] = e[n]);
		return t;
	},
	Wm = (e, t) => {
		const n = {};
		for (const l in e) (!fs(l) || !(l.slice(9) in t)) && (n[l] = e[l]);
		return n;
	};
function Km(e, t, n) {
	const { props: l, children: a, component: o } = e,
		{ props: i, children: s, patchFlag: r } = t,
		u = o.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && r >= 0) {
		if (r & 1024) return !0;
		if (r & 16) return l ? Lr(l, i, u) : !!i;
		if (r & 8) {
			const c = t.dynamicProps;
			for (let f = 0; f < c.length; f++) {
				const d = c[f];
				if (i[d] !== l[d] && !Lo(u, d)) return !0;
			}
		}
	} else return (a || s) && (!s || !s.$stable) ? !0 : l === i ? !1 : l ? (i ? Lr(l, i, u) : !0) : !!i;
	return !1;
}
function Lr(e, t, n) {
	const l = Object.keys(t);
	if (l.length !== Object.keys(e).length) return !0;
	for (let a = 0; a < l.length; a++) {
		const o = l[a];
		if (t[o] !== e[o] && !Lo(n, o)) return !0;
	}
	return !1;
}
function xs({ vnode: e, parent: t }, n) {
	for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const qm = (e) => e.__isSuspense,
	Ym = {
		name: 'Suspense',
		__isSuspense: !0,
		process(e, t, n, l, a, o, i, s, r, u) {
			e == null ? Gm(t, n, l, a, o, i, s, r, u) : Zm(e, t, n, l, a, i, s, r, u);
		},
		hydrate: Jm,
		create: $s,
		normalize: Qm,
	},
	Xm = Ym;
function ia(e, t) {
	const n = e.props && e.props[t];
	me(n) && n();
}
function Gm(e, t, n, l, a, o, i, s, r) {
	const {
			p: u,
			o: { createElement: c },
		} = r,
		f = c('div'),
		d = (e.suspense = $s(e, a, l, t, f, n, o, i, s, r));
	u(null, (d.pendingBranch = e.ssContent), f, null, l, d, o, i),
		d.deps > 0
			? (ia(e, 'onPending'), ia(e, 'onFallback'), u(null, e.ssFallback, t, n, l, null, o, i), cl(d, e.ssFallback))
			: d.resolve();
}
function Zm(e, t, n, l, a, o, i, s, { p: r, um: u, o: { createElement: c } }) {
	const f = (t.suspense = e.suspense);
	(f.vnode = t), (t.el = e.el);
	const d = t.ssContent,
		v = t.ssFallback,
		{ activeBranch: h, pendingBranch: y, isInFallback: V, isHydrating: p } = f;
	if (y)
		(f.pendingBranch = d),
			Kt(d, y)
				? (r(y, d, f.hiddenContainer, null, a, f, o, i, s),
				  f.deps <= 0 ? f.resolve() : V && (r(h, v, n, l, a, null, o, i, s), cl(f, v)))
				: (f.pendingId++,
				  p ? ((f.isHydrating = !1), (f.activeBranch = y)) : u(y, a, f),
				  (f.deps = 0),
				  (f.effects.length = 0),
				  (f.hiddenContainer = c('div')),
				  V
						? (r(null, d, f.hiddenContainer, null, a, f, o, i, s),
						  f.deps <= 0 ? f.resolve() : (r(h, v, n, l, a, null, o, i, s), cl(f, v)))
						: h && Kt(d, h)
						? (r(h, d, n, l, a, f, o, i, s), f.resolve(!0))
						: (r(null, d, f.hiddenContainer, null, a, f, o, i, s), f.deps <= 0 && f.resolve()));
	else if (h && Kt(d, h)) r(h, d, n, l, a, f, o, i, s), cl(f, d);
	else if (
		(ia(t, 'onPending'),
		(f.pendingBranch = d),
		f.pendingId++,
		r(null, d, f.hiddenContainer, null, a, f, o, i, s),
		f.deps <= 0)
	)
		f.resolve();
	else {
		const { timeout: b, pendingId: g } = f;
		b > 0
			? setTimeout(() => {
					f.pendingId === g && f.fallback(v);
			  }, b)
			: b === 0 && f.fallback(v);
	}
}
function $s(e, t, n, l, a, o, i, s, r, u, c = !1) {
	const {
			p: f,
			m: d,
			um: v,
			n: h,
			o: { parentNode: y, remove: V },
		} = u,
		p = fl(e.props && e.props.timeout),
		b = {
			vnode: e,
			parent: t,
			parentComponent: n,
			isSVG: i,
			container: l,
			hiddenContainer: a,
			anchor: o,
			deps: 0,
			pendingId: 0,
			timeout: typeof p == 'number' ? p : -1,
			activeBranch: null,
			pendingBranch: null,
			isInFallback: !0,
			isHydrating: c,
			isUnmounted: !1,
			effects: [],
			resolve(g = !1) {
				const {
					vnode: x,
					activeBranch: S,
					pendingBranch: w,
					pendingId: k,
					effects: _,
					parentComponent: L,
					container: $,
				} = b;
				if (b.isHydrating) b.isHydrating = !1;
				else if (!g) {
					const O = S && w.transition && w.transition.mode === 'out-in';
					O &&
						(S.transition.afterLeave = () => {
							k === b.pendingId && d(w, $, B, 0);
						});
					let { anchor: B } = b;
					S && ((B = h(S)), v(S, L, b, !0)), O || d(w, $, B, 0);
				}
				cl(b, w), (b.pendingBranch = null), (b.isInFallback = !1);
				let T = b.parent,
					E = !1;
				for (; T; ) {
					if (T.pendingBranch) {
						T.effects.push(..._), (E = !0);
						break;
					}
					T = T.parent;
				}
				E || $c(_), (b.effects = []), ia(x, 'onResolve');
			},
			fallback(g) {
				if (!b.pendingBranch) return;
				const { vnode: x, activeBranch: S, parentComponent: w, container: k, isSVG: _ } = b;
				ia(x, 'onFallback');
				const L = h(S),
					$ = () => {
						!b.isInFallback || (f(null, g, k, L, w, null, _, s, r), cl(b, g));
					},
					T = g.transition && g.transition.mode === 'out-in';
				T && (S.transition.afterLeave = $), (b.isInFallback = !0), v(S, w, null, !0), T || $();
			},
			move(g, x, S) {
				b.activeBranch && d(b.activeBranch, g, x, S), (b.container = g);
			},
			next() {
				return b.activeBranch && h(b.activeBranch);
			},
			registerDep(g, x) {
				const S = !!b.pendingBranch;
				S && b.deps++;
				const w = g.vnode.el;
				g.asyncDep
					.catch((k) => {
						wl(k, g, 0);
					})
					.then((k) => {
						if (g.isUnmounted || b.isUnmounted || b.pendingId !== g.suspenseId) return;
						g.asyncResolved = !0;
						const { vnode: _ } = g;
						Pi(g, k, !1), w && (_.el = w);
						const L = !w && g.subTree.el;
						x(g, _, y(w || g.subTree.el), w ? null : h(g.subTree), b, i, r),
							L && V(L),
							xs(g, _.el),
							S && --b.deps === 0 && b.resolve();
					});
			},
			unmount(g, x) {
				(b.isUnmounted = !0),
					b.activeBranch && v(b.activeBranch, n, g, x),
					b.pendingBranch && v(b.pendingBranch, n, g, x);
			},
		};
	return b;
}
function Jm(e, t, n, l, a, o, i, s, r) {
	const u = (t.suspense = $s(t, l, n, e.parentNode, document.createElement('div'), null, a, o, i, s, !0)),
		c = r(e, (u.pendingBranch = t.ssContent), n, u, o, i);
	return u.deps === 0 && u.resolve(), c;
}
function Qm(e) {
	const { shapeFlag: t, children: n } = e,
		l = t & 32;
	(e.ssContent = Ir(l ? n.default : n)), (e.ssFallback = l ? Ir(n.fallback) : m(Vt));
}
function Ir(e) {
	let t;
	if (me(e)) {
		const n = hl && e._c;
		n && ((e._d = !1), Zl()), (e = e()), n && ((e._d = !0), (t = xt), Zc());
	}
	return (
		ce(e) && (e = zm(e)), (e = kt(e)), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)), e
	);
}
function Ic(e, t) {
	t && t.pendingBranch ? (ce(e) ? t.effects.push(...e) : t.effects.push(e)) : $c(e);
}
function cl(e, t) {
	e.activeBranch = t;
	const { vnode: n, parentComponent: l } = e,
		a = (n.el = t.el);
	l && l.subTree === n && ((l.vnode.el = a), xs(l, a));
}
function ze(e, t) {
	if (Ke) {
		let n = Ke.provides;
		const l = Ke.parent && Ke.parent.provides;
		l === n && (n = Ke.provides = Object.create(l)), (n[e] = t);
	}
}
function we(e, t, n = !1) {
	const l = Ke || mt;
	if (l) {
		const a = l.parent == null ? l.vnode.appContext && l.vnode.appContext.provides : l.parent.provides;
		if (a && e in a) return a[e];
		if (arguments.length > 1) return n && me(t) ? t.call(l.proxy) : t;
	}
}
function Mt(e, t) {
	return Vs(e, null, t);
}
const Ra = {};
function ae(e, t, n) {
	return Vs(e, t, n);
}
function Vs(e, t, { immediate: n, deep: l, flush: a, onTrack: o, onTrigger: i } = Ee) {
	const s = Ke;
	let r,
		u = !1,
		c = !1;
	if (
		(Le(e)
			? ((r = () => e.value), (u = to(e)))
			: rl(e)
			? ((r = () => e), (l = !0))
			: ce(e)
			? ((c = !0),
			  (u = e.some((g) => rl(g) || to(g))),
			  (r = () =>
					e.map((g) => {
						if (Le(g)) return g.value;
						if (rl(g)) return Bn(g);
						if (me(g)) return pn(g, s, 2);
					})))
			: me(e)
			? t
				? (r = () => pn(e, s, 2))
				: (r = () => {
						if (!(s && s.isUnmounted)) return f && f(), $t(e, s, 3, [d]);
				  })
			: (r = Ot),
		t && l)
	) {
		const g = r;
		r = () => Bn(g());
	}
	let f,
		d = (g) => {
			f = p.onStop = () => {
				pn(g, s, 4);
			};
		},
		v;
	if (yl)
		if (((d = Ot), t ? n && $t(t, s, 3, [r(), c ? [] : void 0, d]) : r(), a === 'sync')) {
			const g = zh();
			v = g.__watcherHandles || (g.__watcherHandles = []);
		} else return Ot;
	let h = c ? new Array(e.length).fill(Ra) : Ra;
	const y = () => {
		if (!!p.active)
			if (t) {
				const g = p.run();
				(l || u || (c ? g.some((x, S) => na(x, h[S])) : na(g, h))) &&
					(f && f(), $t(t, s, 3, [g, h === Ra ? void 0 : c && h[0] === Ra ? [] : h, d]), (h = g));
			} else p.run();
	};
	y.allowRecurse = !!t;
	let V;
	a === 'sync'
		? (V = y)
		: a === 'post'
		? (V = () => ot(y, s && s.suspense))
		: ((y.pre = !0), s && (y.id = s.uid), (V = () => Vo(y)));
	const p = new ys(r, V);
	t ? (n ? y() : (h = p.run())) : a === 'post' ? ot(p.run.bind(p), s && s.suspense) : p.run();
	const b = () => {
		p.stop(), s && s.scope && vs(s.scope.effects, p);
	};
	return v && v.push(b), b;
}
function eh(e, t, n) {
	const l = this.proxy,
		a = He(e) ? (e.includes('.') ? Ec(l, e) : () => l[e]) : e.bind(l, l);
	let o;
	me(t) ? (o = t) : ((o = t.handler), (n = t));
	const i = Ke;
	gl(this);
	const s = Vs(a, o.bind(l), n);
	return i ? gl(i) : Nn(), s;
}
function Ec(e, t) {
	const n = t.split('.');
	return () => {
		let l = e;
		for (let a = 0; a < n.length && l; a++) l = l[n[a]];
		return l;
	};
}
function Bn(e, t) {
	if (!Pe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
	if ((t.add(e), Le(e))) Bn(e.value, t);
	else if (ce(e)) for (let n = 0; n < e.length; n++) Bn(e[n], t);
	else if (tc(e) || sl(e))
		e.forEach((n) => {
			Bn(n, t);
		});
	else if (ac(e)) for (const n in e) Bn(e[n], t);
	return e;
}
function Tc() {
	const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
	return (
		lt(() => {
			e.isMounted = !0;
		}),
		Je(() => {
			e.isUnmounting = !0;
		}),
		e
	);
}
const Ct = [Function, Array],
	th = {
		name: 'BaseTransition',
		props: {
			mode: String,
			appear: Boolean,
			persisted: Boolean,
			onBeforeEnter: Ct,
			onEnter: Ct,
			onAfterEnter: Ct,
			onEnterCancelled: Ct,
			onBeforeLeave: Ct,
			onLeave: Ct,
			onAfterLeave: Ct,
			onLeaveCancelled: Ct,
			onBeforeAppear: Ct,
			onAppear: Ct,
			onAfterAppear: Ct,
			onAppearCancelled: Ct,
		},
		setup(e, { slots: t }) {
			const n = kn(),
				l = Tc();
			let a;
			return () => {
				const o = t.default && Ls(t.default(), !0);
				if (!o || !o.length) return;
				let i = o[0];
				if (o.length > 1) {
					for (const y of o)
						if (y.type !== Vt) {
							i = y;
							break;
						}
				}
				const s = Se(e),
					{ mode: r } = s;
				if (l.isLeaving) return Qo(i);
				const u = Er(i);
				if (!u) return Qo(i);
				const c = sa(u, s, l, n);
				ra(u, c);
				const f = n.subTree,
					d = f && Er(f);
				let v = !1;
				const { getTransitionKey: h } = u.type;
				if (h) {
					const y = h();
					a === void 0 ? (a = y) : y !== a && ((a = y), (v = !0));
				}
				if (d && d.type !== Vt && (!Kt(u, d) || v)) {
					const y = sa(d, s, l, n);
					if ((ra(d, y), r === 'out-in'))
						return (
							(l.isLeaving = !0),
							(y.afterLeave = () => {
								(l.isLeaving = !1), n.update.active !== !1 && n.update();
							}),
							Qo(i)
						);
					r === 'in-out' &&
						u.type !== Vt &&
						(y.delayLeave = (V, p, b) => {
							const g = Pc(l, d);
							(g[String(d.key)] = d),
								(V._leaveCb = () => {
									p(), (V._leaveCb = void 0), delete c.delayedLeave;
								}),
								(c.delayedLeave = b);
						});
				}
				return i;
			};
		},
	},
	Ac = th;
function Pc(e, t) {
	const { leavingVNodes: n } = e;
	let l = n.get(t.type);
	return l || ((l = Object.create(null)), n.set(t.type, l)), l;
}
function sa(e, t, n, l) {
	const {
			appear: a,
			mode: o,
			persisted: i = !1,
			onBeforeEnter: s,
			onEnter: r,
			onAfterEnter: u,
			onEnterCancelled: c,
			onBeforeLeave: f,
			onLeave: d,
			onAfterLeave: v,
			onLeaveCancelled: h,
			onBeforeAppear: y,
			onAppear: V,
			onAfterAppear: p,
			onAppearCancelled: b,
		} = t,
		g = String(e.key),
		x = Pc(n, e),
		S = (_, L) => {
			_ && $t(_, l, 9, L);
		},
		w = (_, L) => {
			const $ = L[1];
			S(_, L), ce(_) ? _.every((T) => T.length <= 1) && $() : _.length <= 1 && $();
		},
		k = {
			mode: o,
			persisted: i,
			beforeEnter(_) {
				let L = s;
				if (!n.isMounted)
					if (a) L = y || s;
					else return;
				_._leaveCb && _._leaveCb(!0);
				const $ = x[g];
				$ && Kt(e, $) && $.el._leaveCb && $.el._leaveCb(), S(L, [_]);
			},
			enter(_) {
				let L = r,
					$ = u,
					T = c;
				if (!n.isMounted)
					if (a) (L = V || r), ($ = p || u), (T = b || c);
					else return;
				let E = !1;
				const O = (_._enterCb = (B) => {
					E || ((E = !0), B ? S(T, [_]) : S($, [_]), k.delayedLeave && k.delayedLeave(), (_._enterCb = void 0));
				});
				L ? w(L, [_, O]) : O();
			},
			leave(_, L) {
				const $ = String(e.key);
				if ((_._enterCb && _._enterCb(!0), n.isUnmounting)) return L();
				S(f, [_]);
				let T = !1;
				const E = (_._leaveCb = (O) => {
					T || ((T = !0), L(), O ? S(h, [_]) : S(v, [_]), (_._leaveCb = void 0), x[$] === e && delete x[$]);
				});
				(x[$] = e), d ? w(d, [_, E]) : E();
			},
			clone(_) {
				return sa(_, t, n, l);
			},
		};
	return k;
}
function Qo(e) {
	if (ba(e)) return (e = nn(e)), (e.children = null), e;
}
function Er(e) {
	return ba(e) ? (e.children ? e.children[0] : void 0) : e;
}
function ra(e, t) {
	e.shapeFlag & 6 && e.component
		? ra(e.component.subTree, t)
		: e.shapeFlag & 128
		? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
		: (e.transition = t);
}
function Ls(e, t = !1, n) {
	let l = [],
		a = 0;
	for (let o = 0; o < e.length; o++) {
		let i = e[o];
		const s = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
		i.type === ge
			? (i.patchFlag & 128 && a++, (l = l.concat(Ls(i.children, t, s))))
			: (t || i.type !== Vt) && l.push(s != null ? nn(i, { key: s }) : i);
	}
	if (a > 1) for (let o = 0; o < l.length; o++) l[o].patchFlag = -2;
	return l;
}
function Eo(e) {
	return me(e) ? { setup: e, name: e.name } : e;
}
const ql = (e) => !!e.type.__asyncLoader;
function nh(e) {
	me(e) && (e = { loader: e });
	const {
		loader: t,
		loadingComponent: n,
		errorComponent: l,
		delay: a = 200,
		timeout: o,
		suspensible: i = !0,
		onError: s,
	} = e;
	let r = null,
		u,
		c = 0;
	const f = () => (c++, (r = null), d()),
		d = () => {
			let v;
			return (
				r ||
				(v = r =
					t()
						.catch((h) => {
							if (((h = h instanceof Error ? h : new Error(String(h))), s))
								return new Promise((y, V) => {
									s(
										h,
										() => y(f()),
										() => V(h),
										c + 1,
									);
								});
							throw h;
						})
						.then((h) =>
							v !== r && r
								? r
								: (h && (h.__esModule || h[Symbol.toStringTag] === 'Module') && (h = h.default), (u = h), h),
						))
			);
		};
	return Eo({
		name: 'AsyncComponentWrapper',
		__asyncLoader: d,
		get __asyncResolved() {
			return u;
		},
		setup() {
			const v = Ke;
			if (u) return () => ei(u, v);
			const h = (b) => {
				(r = null), wl(b, v, 13, !l);
			};
			if ((i && v.suspense) || yl)
				return d()
					.then((b) => () => ei(b, v))
					.catch((b) => (h(b), () => (l ? m(l, { error: b }) : null)));
			const y = R(!1),
				V = R(),
				p = R(!!a);
			return (
				a &&
					setTimeout(() => {
						p.value = !1;
					}, a),
				o != null &&
					setTimeout(() => {
						if (!y.value && !V.value) {
							const b = new Error(`Async component timed out after ${o}ms.`);
							h(b), (V.value = b);
						}
					}, o),
				d()
					.then(() => {
						(y.value = !0), v.parent && ba(v.parent.vnode) && Vo(v.parent.update);
					})
					.catch((b) => {
						h(b), (V.value = b);
					}),
				() => {
					if (y.value && u) return ei(u, v);
					if (V.value && l) return m(l, { error: V.value });
					if (n && !p.value) return m(n);
				}
			);
		},
	});
}
function ei(e, t) {
	const { ref: n, props: l, children: a, ce: o } = t.vnode,
		i = m(e, l, a);
	return (i.ref = n), (i.ce = o), delete t.vnode.ce, i;
}
const ba = (e) => e.type.__isKeepAlive;
function Bc(e, t) {
	Rc(e, 'a', t);
}
function Oc(e, t) {
	Rc(e, 'da', t);
}
function Rc(e, t, n = Ke) {
	const l =
		e.__wdc ||
		(e.__wdc = () => {
			let a = n;
			for (; a; ) {
				if (a.isDeactivated) return;
				a = a.parent;
			}
			return e();
		});
	if ((To(t, l, n), n)) {
		let a = n.parent;
		for (; a && a.parent; ) ba(a.parent.vnode) && lh(l, t, n, a), (a = a.parent);
	}
}
function lh(e, t, n, l) {
	const a = To(t, e, l, !0);
	Hc(() => {
		vs(l[t], a);
	}, n);
}
function To(e, t, n = Ke, l = !1) {
	if (n) {
		const a = n[e] || (n[e] = []),
			o =
				t.__weh ||
				(t.__weh = (...i) => {
					if (n.isUnmounted) return;
					Cl(), gl(n);
					const s = $t(t, n, e, i);
					return Nn(), Sl(), s;
				});
		return l ? a.unshift(o) : a.push(o), o;
	}
}
const sn =
		(e) =>
		(t, n = Ke) =>
			(!yl || e === 'sp') && To(e, (...l) => t(...l), n),
	Ao = sn('bm'),
	lt = sn('m'),
	Mc = sn('bu'),
	Fc = sn('u'),
	Je = sn('bum'),
	Hc = sn('um'),
	ah = sn('sp'),
	oh = sn('rtg'),
	ih = sn('rtc');
function Nc(e, t = Ke) {
	To('ec', e, t);
}
function Oe(e, t) {
	const n = mt;
	if (n === null) return e;
	const l = Bo(n) || n.proxy,
		a = e.dirs || (e.dirs = []);
	for (let o = 0; o < t.length; o++) {
		let [i, s, r, u = Ee] = t[o];
		i &&
			(me(i) && (i = { mounted: i, updated: i }),
			i.deep && Bn(s),
			a.push({ dir: i, instance: l, value: s, oldValue: void 0, arg: r, modifiers: u }));
	}
	return e;
}
function Ut(e, t, n, l) {
	const a = e.dirs,
		o = t && t.dirs;
	for (let i = 0; i < a.length; i++) {
		const s = a[i];
		o && (s.oldValue = o[i].value);
		let r = s.dir[l];
		r && (Cl(), $t(r, n, 8, [e.el, s, e, t]), Sl());
	}
}
const Is = 'components',
	sh = 'directives';
function at(e, t) {
	return Es(Is, e, !0, t) || e;
}
const Dc = Symbol();
function rh(e) {
	return He(e) ? Es(Is, e, !1) || e : e || Dc;
}
function yt(e) {
	return Es(sh, e);
}
function Es(e, t, n = !0, l = !1) {
	const a = mt || Ke;
	if (a) {
		const o = a.type;
		if (e === Is) {
			const s = Nh(o, !1);
			if (s && (s === t || s === It(t) || s === on(It(t)))) return o;
		}
		const i = Tr(a[e] || o[e], t) || Tr(a.appContext[e], t);
		return !i && l ? o : i;
	}
}
function Tr(e, t) {
	return e && (e[t] || e[It(t)] || e[on(It(t))]);
}
function ti(e, t) {
	const n = {};
	for (const l in e) n[t && /[A-Z]/.test(l) ? `on:${l}` : qa(l)] = e[l];
	return n;
}
const Li = (e) => (e ? (ed(e) ? Bo(e) || e.proxy : Li(e.parent)) : null),
	Yl = Ye(Object.create(null), {
		$: (e) => e,
		$el: (e) => e.vnode.el,
		$data: (e) => e.data,
		$props: (e) => e.props,
		$attrs: (e) => e.attrs,
		$slots: (e) => e.slots,
		$refs: (e) => e.refs,
		$parent: (e) => Li(e.parent),
		$root: (e) => Li(e.root),
		$emit: (e) => e.emit,
		$options: (e) => Ts(e),
		$forceUpdate: (e) => e.f || (e.f = () => Vo(e.update)),
		$nextTick: (e) => e.n || (e.n = Te.bind(e.proxy)),
		$watch: (e) => eh.bind(e),
	}),
	ni = (e, t) => e !== Ee && !e.__isScriptSetup && Ce(e, t),
	uh = {
		get({ _: e }, t) {
			const { ctx: n, setupState: l, data: a, props: o, accessCache: i, type: s, appContext: r } = e;
			let u;
			if (t[0] !== '$') {
				const v = i[t];
				if (v !== void 0)
					switch (v) {
						case 1:
							return l[t];
						case 2:
							return a[t];
						case 4:
							return n[t];
						case 3:
							return o[t];
					}
				else {
					if (ni(l, t)) return (i[t] = 1), l[t];
					if (a !== Ee && Ce(a, t)) return (i[t] = 2), a[t];
					if ((u = e.propsOptions[0]) && Ce(u, t)) return (i[t] = 3), o[t];
					if (n !== Ee && Ce(n, t)) return (i[t] = 4), n[t];
					Ii && (i[t] = 0);
				}
			}
			const c = Yl[t];
			let f, d;
			if (c) return t === '$attrs' && gt(e, 'get', t), c(e);
			if ((f = s.__cssModules) && (f = f[t])) return f;
			if (n !== Ee && Ce(n, t)) return (i[t] = 4), n[t];
			if (((d = r.config.globalProperties), Ce(d, t))) return d[t];
		},
		set({ _: e }, t, n) {
			const { data: l, setupState: a, ctx: o } = e;
			return ni(a, t)
				? ((a[t] = n), !0)
				: l !== Ee && Ce(l, t)
				? ((l[t] = n), !0)
				: Ce(e.props, t) || (t[0] === '$' && t.slice(1) in e)
				? !1
				: ((o[t] = n), !0);
		},
		has({ _: { data: e, setupState: t, accessCache: n, ctx: l, appContext: a, propsOptions: o } }, i) {
			let s;
			return (
				!!n[i] ||
				(e !== Ee && Ce(e, i)) ||
				ni(t, i) ||
				((s = o[0]) && Ce(s, i)) ||
				Ce(l, i) ||
				Ce(Yl, i) ||
				Ce(a.config.globalProperties, i)
			);
		},
		defineProperty(e, t, n) {
			return (
				n.get != null ? (e._.accessCache[t] = 0) : Ce(n, 'value') && this.set(e, t, n.value, null),
				Reflect.defineProperty(e, t, n)
			);
		},
	};
let Ii = !0;
function ch(e) {
	const t = Ts(e),
		n = e.proxy,
		l = e.ctx;
	(Ii = !1), t.beforeCreate && Ar(t.beforeCreate, e, 'bc');
	const {
		data: a,
		computed: o,
		methods: i,
		watch: s,
		provide: r,
		inject: u,
		created: c,
		beforeMount: f,
		mounted: d,
		beforeUpdate: v,
		updated: h,
		activated: y,
		deactivated: V,
		beforeDestroy: p,
		beforeUnmount: b,
		destroyed: g,
		unmounted: x,
		render: S,
		renderTracked: w,
		renderTriggered: k,
		errorCaptured: _,
		serverPrefetch: L,
		expose: $,
		inheritAttrs: T,
		components: E,
		directives: O,
		filters: B,
	} = t;
	if ((u && dh(u, l, null, e.appContext.config.unwrapInjectedRef), i))
		for (const P in i) {
			const H = i[P];
			me(H) && (l[P] = H.bind(n));
		}
	if (a) {
		const P = a.call(n, n);
		Pe(P) && (e.data = We(P));
	}
	if (((Ii = !0), o))
		for (const P in o) {
			const H = o[P],
				U = me(H) ? H.bind(n, n) : me(H.get) ? H.get.bind(n, n) : Ot,
				Y = !me(H) && me(H.set) ? H.set.bind(n) : Ot,
				Q = C({ get: U, set: Y });
			Object.defineProperty(l, P, {
				enumerable: !0,
				configurable: !0,
				get: () => Q.value,
				set: (ne) => (Q.value = ne),
			});
		}
	if (s) for (const P in s) jc(s[P], l, n, P);
	if (r) {
		const P = me(r) ? r.call(n) : r;
		Reflect.ownKeys(P).forEach((H) => {
			ze(H, P[H]);
		});
	}
	c && Ar(c, e, 'c');
	function M(P, H) {
		ce(H) ? H.forEach((U) => P(U.bind(n))) : H && P(H.bind(n));
	}
	if (
		(M(Ao, f),
		M(lt, d),
		M(Mc, v),
		M(Fc, h),
		M(Bc, y),
		M(Oc, V),
		M(Nc, _),
		M(ih, w),
		M(oh, k),
		M(Je, b),
		M(Hc, x),
		M(ah, L),
		ce($))
	)
		if ($.length) {
			const P = e.exposed || (e.exposed = {});
			$.forEach((H) => {
				Object.defineProperty(P, H, { get: () => n[H], set: (U) => (n[H] = U) });
			});
		} else e.exposed || (e.exposed = {});
	S && e.render === Ot && (e.render = S),
		T != null && (e.inheritAttrs = T),
		E && (e.components = E),
		O && (e.directives = O);
}
function dh(e, t, n = Ot, l = !1) {
	ce(e) && (e = Ei(e));
	for (const a in e) {
		const o = e[a];
		let i;
		Pe(o) ? ('default' in o ? (i = we(o.from || a, o.default, !0)) : (i = we(o.from || a))) : (i = we(o)),
			Le(i) && l
				? Object.defineProperty(t, a, {
						enumerable: !0,
						configurable: !0,
						get: () => i.value,
						set: (s) => (i.value = s),
				  })
				: (t[a] = i);
	}
}
function Ar(e, t, n) {
	$t(ce(e) ? e.map((l) => l.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function jc(e, t, n, l) {
	const a = l.includes('.') ? Ec(n, l) : () => n[l];
	if (He(e)) {
		const o = t[e];
		me(o) && ae(a, o);
	} else if (me(e)) ae(a, e.bind(n));
	else if (Pe(e))
		if (ce(e)) e.forEach((o) => jc(o, t, n, l));
		else {
			const o = me(e.handler) ? e.handler.bind(n) : t[e.handler];
			me(o) && ae(a, o, e);
		}
}
function Ts(e) {
	const t = e.type,
		{ mixins: n, extends: l } = t,
		{
			mixins: a,
			optionsCache: o,
			config: { optionMergeStrategies: i },
		} = e.appContext,
		s = o.get(t);
	let r;
	return (
		s
			? (r = s)
			: !a.length && !n && !l
			? (r = t)
			: ((r = {}), a.length && a.forEach((u) => ao(r, u, i, !0)), ao(r, t, i)),
		Pe(t) && o.set(t, r),
		r
	);
}
function ao(e, t, n, l = !1) {
	const { mixins: a, extends: o } = t;
	o && ao(e, o, n, !0), a && a.forEach((i) => ao(e, i, n, !0));
	for (const i in t)
		if (!(l && i === 'expose')) {
			const s = fh[i] || (n && n[i]);
			e[i] = s ? s(e[i], t[i]) : t[i];
		}
	return e;
}
const fh = {
	data: Pr,
	props: En,
	emits: En,
	methods: En,
	computed: En,
	beforeCreate: nt,
	created: nt,
	beforeMount: nt,
	mounted: nt,
	beforeUpdate: nt,
	updated: nt,
	beforeDestroy: nt,
	beforeUnmount: nt,
	destroyed: nt,
	unmounted: nt,
	activated: nt,
	deactivated: nt,
	errorCaptured: nt,
	serverPrefetch: nt,
	components: En,
	directives: En,
	watch: mh,
	provide: Pr,
	inject: vh,
};
function Pr(e, t) {
	return t
		? e
			? function () {
					return Ye(me(e) ? e.call(this, this) : e, me(t) ? t.call(this, this) : t);
			  }
			: t
		: e;
}
function vh(e, t) {
	return En(Ei(e), Ei(t));
}
function Ei(e) {
	if (ce(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function nt(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function En(e, t) {
	return e ? Ye(Ye(Object.create(null), e), t) : t;
}
function mh(e, t) {
	if (!e) return t;
	if (!t) return e;
	const n = Ye(Object.create(null), e);
	for (const l in t) n[l] = nt(e[l], t[l]);
	return n;
}
function hh(e, t, n, l = !1) {
	const a = {},
		o = {};
	eo(o, Po, 1), (e.propsDefaults = Object.create(null)), zc(e, t, a, o);
	for (const i in e.propsOptions[0]) i in a || (a[i] = void 0);
	n ? (e.props = l ? a : gc(a)) : e.type.props ? (e.props = a) : (e.props = o), (e.attrs = o);
}
function gh(e, t, n, l) {
	const {
			props: a,
			attrs: o,
			vnode: { patchFlag: i },
		} = e,
		s = Se(a),
		[r] = e.propsOptions;
	let u = !1;
	if ((l || i > 0) && !(i & 16)) {
		if (i & 8) {
			const c = e.vnode.dynamicProps;
			for (let f = 0; f < c.length; f++) {
				let d = c[f];
				if (Lo(e.emitsOptions, d)) continue;
				const v = t[d];
				if (r)
					if (Ce(o, d)) v !== o[d] && ((o[d] = v), (u = !0));
					else {
						const h = It(d);
						a[h] = Ti(r, s, h, v, e, !1);
					}
				else v !== o[d] && ((o[d] = v), (u = !0));
			}
		}
	} else {
		zc(e, t, a, o) && (u = !0);
		let c;
		for (const f in s)
			(!t || (!Ce(t, f) && ((c = _l(f)) === f || !Ce(t, c)))) &&
				(r ? n && (n[f] !== void 0 || n[c] !== void 0) && (a[f] = Ti(r, s, f, void 0, e, !0)) : delete a[f]);
		if (o !== s) for (const f in o) (!t || (!Ce(t, f) && !0)) && (delete o[f], (u = !0));
	}
	u && tn(e, 'set', '$attrs');
}
function zc(e, t, n, l) {
	const [a, o] = e.propsOptions;
	let i = !1,
		s;
	if (t)
		for (let r in t) {
			if (Kl(r)) continue;
			const u = t[r];
			let c;
			a && Ce(a, (c = It(r)))
				? !o || !o.includes(c)
					? (n[c] = u)
					: ((s || (s = {}))[c] = u)
				: Lo(e.emitsOptions, r) || ((!(r in l) || u !== l[r]) && ((l[r] = u), (i = !0)));
		}
	if (o) {
		const r = Se(n),
			u = s || Ee;
		for (let c = 0; c < o.length; c++) {
			const f = o[c];
			n[f] = Ti(a, r, f, u[f], e, !Ce(u, f));
		}
	}
	return i;
}
function Ti(e, t, n, l, a, o) {
	const i = e[n];
	if (i != null) {
		const s = Ce(i, 'default');
		if (s && l === void 0) {
			const r = i.default;
			if (i.type !== Function && me(r)) {
				const { propsDefaults: u } = a;
				n in u ? (l = u[n]) : (gl(a), (l = u[n] = r.call(null, t)), Nn());
			} else l = r;
		}
		i[0] && (o && !s ? (l = !1) : i[1] && (l === '' || l === _l(n)) && (l = !0));
	}
	return l;
}
function Uc(e, t, n = !1) {
	const l = t.propsCache,
		a = l.get(e);
	if (a) return a;
	const o = e.props,
		i = {},
		s = [];
	let r = !1;
	if (!me(e)) {
		const c = (f) => {
			r = !0;
			const [d, v] = Uc(f, t, !0);
			Ye(i, d), v && s.push(...v);
		};
		!n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
	}
	if (!o && !r) return Pe(e) && l.set(e, il), il;
	if (ce(o))
		for (let c = 0; c < o.length; c++) {
			const f = It(o[c]);
			Br(f) && (i[f] = Ee);
		}
	else if (o)
		for (const c in o) {
			const f = It(c);
			if (Br(f)) {
				const d = o[c],
					v = (i[f] = ce(d) || me(d) ? { type: d } : Object.assign({}, d));
				if (v) {
					const h = Mr(Boolean, v.type),
						y = Mr(String, v.type);
					(v[0] = h > -1), (v[1] = y < 0 || h < y), (h > -1 || Ce(v, 'default')) && s.push(f);
				}
			}
		}
	const u = [i, s];
	return Pe(e) && l.set(e, u), u;
}
function Br(e) {
	return e[0] !== '$';
}
function Or(e) {
	const t = e && e.toString().match(/^\s*function (\w+)/);
	return t ? t[1] : e === null ? 'null' : '';
}
function Rr(e, t) {
	return Or(e) === Or(t);
}
function Mr(e, t) {
	return ce(t) ? t.findIndex((n) => Rr(n, e)) : me(t) && Rr(t, e) ? 0 : -1;
}
const Wc = (e) => e[0] === '_' || e === '$stable',
	As = (e) => (ce(e) ? e.map(kt) : [kt(e)]),
	yh = (e, t, n) => {
		if (t._n) return t;
		const l = ft((...a) => As(t(...a)), n);
		return (l._c = !1), l;
	},
	Kc = (e, t, n) => {
		const l = e._ctx;
		for (const a in e) {
			if (Wc(a)) continue;
			const o = e[a];
			if (me(o)) t[a] = yh(a, o, l);
			else if (o != null) {
				const i = As(o);
				t[a] = () => i;
			}
		}
	},
	qc = (e, t) => {
		const n = As(t);
		e.slots.default = () => n;
	},
	bh = (e, t) => {
		if (e.vnode.shapeFlag & 32) {
			const n = t._;
			n ? ((e.slots = Se(t)), eo(t, '_', n)) : Kc(t, (e.slots = {}));
		} else (e.slots = {}), t && qc(e, t);
		eo(e.slots, Po, 1);
	},
	ph = (e, t, n) => {
		const { vnode: l, slots: a } = e;
		let o = !0,
			i = Ee;
		if (l.shapeFlag & 32) {
			const s = t._;
			s ? (n && s === 1 ? (o = !1) : (Ye(a, t), !n && s === 1 && delete a._)) : ((o = !t.$stable), Kc(t, a)), (i = t);
		} else t && (qc(e, t), (i = { default: 1 }));
		if (o) for (const s in a) !Wc(s) && !(s in i) && delete a[s];
	};
function Yc() {
	return {
		app: null,
		config: {
			isNativeTag: Qv,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let _h = 0;
function Ch(e, t) {
	return function (l, a = null) {
		me(l) || (l = Object.assign({}, l)), a != null && !Pe(a) && (a = null);
		const o = Yc(),
			i = new Set();
		let s = !1;
		const r = (o.app = {
			_uid: _h++,
			_component: l,
			_props: a,
			_container: null,
			_context: o,
			_instance: null,
			version: Os,
			get config() {
				return o.config;
			},
			set config(u) {},
			use(u, ...c) {
				return i.has(u) || (u && me(u.install) ? (i.add(u), u.install(r, ...c)) : me(u) && (i.add(u), u(r, ...c))), r;
			},
			mixin(u) {
				return o.mixins.includes(u) || o.mixins.push(u), r;
			},
			component(u, c) {
				return c ? ((o.components[u] = c), r) : o.components[u];
			},
			directive(u, c) {
				return c ? ((o.directives[u] = c), r) : o.directives[u];
			},
			mount(u, c, f) {
				if (!s) {
					const d = m(l, a);
					return (
						(d.appContext = o),
						c && t ? t(d, u) : e(d, u, f),
						(s = !0),
						(r._container = u),
						(u.__vue_app__ = r),
						Bo(d.component) || d.component.proxy
					);
				}
			},
			unmount() {
				s && (e(null, r._container), delete r._container.__vue_app__);
			},
			provide(u, c) {
				return (o.provides[u] = c), r;
			},
		});
		return r;
	};
}
function oo(e, t, n, l, a = !1) {
	if (ce(e)) {
		e.forEach((d, v) => oo(d, t && (ce(t) ? t[v] : t), n, l, a));
		return;
	}
	if (ql(l) && !a) return;
	const o = l.shapeFlag & 4 ? Bo(l.component) || l.component.proxy : l.el,
		i = a ? null : o,
		{ i: s, r } = e,
		u = t && t.r,
		c = s.refs === Ee ? (s.refs = {}) : s.refs,
		f = s.setupState;
	if ((u != null && u !== r && (He(u) ? ((c[u] = null), Ce(f, u) && (f[u] = null)) : Le(u) && (u.value = null)), me(r)))
		pn(r, s, 12, [i, c]);
	else {
		const d = He(r),
			v = Le(r);
		if (d || v) {
			const h = () => {
				if (e.f) {
					const y = d ? (Ce(f, r) ? f[r] : c[r]) : r.value;
					a
						? ce(y) && vs(y, o)
						: ce(y)
						? y.includes(o) || y.push(o)
						: d
						? ((c[r] = [o]), Ce(f, r) && (f[r] = c[r]))
						: ((r.value = [o]), e.k && (c[e.k] = r.value));
				} else d ? ((c[r] = i), Ce(f, r) && (f[r] = i)) : v && ((r.value = i), e.k && (c[e.k] = i));
			};
			i ? ((h.id = -1), ot(h, n)) : h();
		}
	}
}
let mn = !1;
const Ma = (e) => /svg/.test(e.namespaceURI) && e.tagName !== 'foreignObject',
	Fa = (e) => e.nodeType === 8;
function Sh(e) {
	const {
			mt: t,
			p: n,
			o: { patchProp: l, createText: a, nextSibling: o, parentNode: i, remove: s, insert: r, createComment: u },
		} = e,
		c = (p, b) => {
			if (!b.hasChildNodes()) {
				n(null, p, b), no(), (b._vnode = p);
				return;
			}
			(mn = !1),
				f(b.firstChild, p, null, null, null),
				no(),
				(b._vnode = p),
				mn && console.error('Hydration completed but contains mismatches.');
		},
		f = (p, b, g, x, S, w = !1) => {
			const k = Fa(p) && p.data === '[',
				_ = () => y(p, b, g, x, S, k),
				{ type: L, ref: $, shapeFlag: T, patchFlag: E } = b;
			let O = p.nodeType;
			(b.el = p), E === -2 && ((w = !1), (b.dynamicChildren = null));
			let B = null;
			switch (L) {
				case ml:
					O !== 3
						? b.children === ''
							? (r((b.el = a('')), i(p), p), (B = p))
							: (B = _())
						: (p.data !== b.children && ((mn = !0), (p.data = b.children)), (B = o(p)));
					break;
				case Vt:
					O !== 8 || k ? (B = _()) : (B = o(p));
					break;
				case Xa:
					if ((k && ((p = o(p)), (O = p.nodeType)), O === 1 || O === 3)) {
						B = p;
						const D = !b.children.length;
						for (let M = 0; M < b.staticCount; M++)
							D && (b.children += B.nodeType === 1 ? B.outerHTML : B.data),
								M === b.staticCount - 1 && (b.anchor = B),
								(B = o(B));
						return k ? o(B) : B;
					} else _();
					break;
				case ge:
					k ? (B = h(p, b, g, x, S, w)) : (B = _());
					break;
				default:
					if (T & 1)
						O !== 1 || b.type.toLowerCase() !== p.tagName.toLowerCase() ? (B = _()) : (B = d(p, b, g, x, S, w));
					else if (T & 6) {
						b.slotScopeIds = S;
						const D = i(p);
						if (
							(t(b, D, null, g, x, Ma(D), w),
							(B = k ? V(p) : o(p)),
							B && Fa(B) && B.data === 'teleport end' && (B = o(B)),
							ql(b))
						) {
							let M;
							k
								? ((M = m(ge)), (M.anchor = B ? B.previousSibling : D.lastChild))
								: (M = p.nodeType === 3 ? Sn('') : m('div')),
								(M.el = p),
								(b.component.subTree = M);
						}
					} else
						T & 64
							? O !== 8
								? (B = _())
								: (B = b.type.hydrate(p, b, g, x, S, w, e, v))
							: T & 128 && (B = b.type.hydrate(p, b, g, x, Ma(i(p)), S, w, e, f));
			}
			return $ != null && oo($, null, x, b), B;
		},
		d = (p, b, g, x, S, w) => {
			w = w || !!b.dynamicChildren;
			const { type: k, props: _, patchFlag: L, shapeFlag: $, dirs: T } = b,
				E = (k === 'input' && T) || k === 'option';
			if (E || L !== -1) {
				if ((T && Ut(b, null, g, 'created'), _))
					if (E || !w || L & 48)
						for (const B in _) ((E && B.endsWith('value')) || (ga(B) && !Kl(B))) && l(p, B, null, _[B], !1, void 0, g);
					else _.onClick && l(p, 'onClick', null, _.onClick, !1, void 0, g);
				let O;
				if (
					((O = _ && _.onVnodeBeforeMount) && St(O, g, b),
					T && Ut(b, null, g, 'beforeMount'),
					((O = _ && _.onVnodeMounted) || T) &&
						Ic(() => {
							O && St(O, g, b), T && Ut(b, null, g, 'mounted');
						}, x),
					$ & 16 && !(_ && (_.innerHTML || _.textContent)))
				) {
					let B = v(p.firstChild, b, p, g, x, S, w);
					for (; B; ) {
						mn = !0;
						const D = B;
						(B = B.nextSibling), s(D);
					}
				} else $ & 8 && p.textContent !== b.children && ((mn = !0), (p.textContent = b.children));
			}
			return p.nextSibling;
		},
		v = (p, b, g, x, S, w, k) => {
			k = k || !!b.dynamicChildren;
			const _ = b.children,
				L = _.length;
			for (let $ = 0; $ < L; $++) {
				const T = k ? _[$] : (_[$] = kt(_[$]));
				if (p) p = f(p, T, x, S, w, k);
				else {
					if (T.type === ml && !T.children) continue;
					(mn = !0), n(null, T, g, null, x, S, Ma(g), w);
				}
			}
			return p;
		},
		h = (p, b, g, x, S, w) => {
			const { slotScopeIds: k } = b;
			k && (S = S ? S.concat(k) : k);
			const _ = i(p),
				L = v(o(p), b, _, g, x, S, w);
			return L && Fa(L) && L.data === ']' ? o((b.anchor = L)) : ((mn = !0), r((b.anchor = u(']')), _, L), L);
		},
		y = (p, b, g, x, S, w) => {
			if (((mn = !0), (b.el = null), w)) {
				const L = V(p);
				for (;;) {
					const $ = o(p);
					if ($ && $ !== L) s($);
					else break;
				}
			}
			const k = o(p),
				_ = i(p);
			return s(p), n(null, b, _, k, g, x, Ma(_), S), k;
		},
		V = (p) => {
			let b = 0;
			for (; p; )
				if (((p = o(p)), p && Fa(p) && (p.data === '[' && b++, p.data === ']'))) {
					if (b === 0) return o(p);
					b--;
				}
			return p;
		};
	return [c, f];
}
const ot = Ic;
function wh(e) {
	return Xc(e);
}
function kh(e) {
	return Xc(e, Sh);
}
function Xc(e, t) {
	const n = om();
	n.__VUE__ = !0;
	const {
			insert: l,
			remove: a,
			patchProp: o,
			createElement: i,
			createText: s,
			createComment: r,
			setText: u,
			setElementText: c,
			parentNode: f,
			nextSibling: d,
			setScopeId: v = Ot,
			insertStaticContent: h,
		} = e,
		y = (I, A, F, z = null, j = null, G = null, te = !1, X = null, Z = !!A.dynamicChildren) => {
			if (I === A) return;
			I && !Kt(I, A) && ((z = Ne(I)), ne(I, j, G, !0), (I = null)),
				A.patchFlag === -2 && ((Z = !1), (A.dynamicChildren = null));
			const { type: W, ref: ie, shapeFlag: oe } = A;
			switch (W) {
				case ml:
					V(I, A, F, z);
					break;
				case Vt:
					p(I, A, F, z);
					break;
				case Xa:
					I == null && b(A, F, z, te);
					break;
				case ge:
					E(I, A, F, z, j, G, te, X, Z);
					break;
				default:
					oe & 1
						? S(I, A, F, z, j, G, te, X, Z)
						: oe & 6
						? O(I, A, F, z, j, G, te, X, Z)
						: (oe & 64 || oe & 128) && W.process(I, A, F, z, j, G, te, X, Z, ct);
			}
			ie != null && j && oo(ie, I && I.ref, G, A || I, !A);
		},
		V = (I, A, F, z) => {
			if (I == null) l((A.el = s(A.children)), F, z);
			else {
				const j = (A.el = I.el);
				A.children !== I.children && u(j, A.children);
			}
		},
		p = (I, A, F, z) => {
			I == null ? l((A.el = r(A.children || '')), F, z) : (A.el = I.el);
		},
		b = (I, A, F, z) => {
			[I.el, I.anchor] = h(I.children, A, F, z, I.el, I.anchor);
		},
		g = ({ el: I, anchor: A }, F, z) => {
			let j;
			for (; I && I !== A; ) (j = d(I)), l(I, F, z), (I = j);
			l(A, F, z);
		},
		x = ({ el: I, anchor: A }) => {
			let F;
			for (; I && I !== A; ) (F = d(I)), a(I), (I = F);
			a(A);
		},
		S = (I, A, F, z, j, G, te, X, Z) => {
			(te = te || A.type === 'svg'), I == null ? w(A, F, z, j, G, te, X, Z) : L(I, A, j, G, te, X, Z);
		},
		w = (I, A, F, z, j, G, te, X) => {
			let Z, W;
			const { type: ie, props: oe, shapeFlag: se, transition: ve, dirs: pe } = I;
			if (
				((Z = I.el = i(I.type, G, oe && oe.is, oe)),
				se & 8 ? c(Z, I.children) : se & 16 && _(I.children, Z, null, z, j, G && ie !== 'foreignObject', te, X),
				pe && Ut(I, null, z, 'created'),
				oe)
			) {
				for (const xe in oe) xe !== 'value' && !Kl(xe) && o(Z, xe, null, oe[xe], G, I.children, z, j, ue);
				'value' in oe && o(Z, 'value', null, oe.value), (W = oe.onVnodeBeforeMount) && St(W, z, I);
			}
			k(Z, I, I.scopeId, te, z), pe && Ut(I, null, z, 'beforeMount');
			const Ve = (!j || (j && !j.pendingBranch)) && ve && !ve.persisted;
			Ve && ve.beforeEnter(Z),
				l(Z, A, F),
				((W = oe && oe.onVnodeMounted) || Ve || pe) &&
					ot(() => {
						W && St(W, z, I), Ve && ve.enter(Z), pe && Ut(I, null, z, 'mounted');
					}, j);
		},
		k = (I, A, F, z, j) => {
			if ((F && v(I, F), z)) for (let G = 0; G < z.length; G++) v(I, z[G]);
			if (j) {
				let G = j.subTree;
				if (A === G) {
					const te = j.vnode;
					k(I, te, te.scopeId, te.slotScopeIds, j.parent);
				}
			}
		},
		_ = (I, A, F, z, j, G, te, X, Z = 0) => {
			for (let W = Z; W < I.length; W++) {
				const ie = (I[W] = X ? yn(I[W]) : kt(I[W]));
				y(null, ie, A, F, z, j, G, te, X);
			}
		},
		L = (I, A, F, z, j, G, te) => {
			const X = (A.el = I.el);
			let { patchFlag: Z, dynamicChildren: W, dirs: ie } = A;
			Z |= I.patchFlag & 16;
			const oe = I.props || Ee,
				se = A.props || Ee;
			let ve;
			F && Vn(F, !1),
				(ve = se.onVnodeBeforeUpdate) && St(ve, F, A, I),
				ie && Ut(A, I, F, 'beforeUpdate'),
				F && Vn(F, !0);
			const pe = j && A.type !== 'foreignObject';
			if ((W ? $(I.dynamicChildren, W, X, F, z, pe, G) : te || H(I, A, X, null, F, z, pe, G, !1), Z > 0)) {
				if (Z & 16) T(X, A, oe, se, F, z, j);
				else if (
					(Z & 2 && oe.class !== se.class && o(X, 'class', null, se.class, j),
					Z & 4 && o(X, 'style', oe.style, se.style, j),
					Z & 8)
				) {
					const Ve = A.dynamicProps;
					for (let xe = 0; xe < Ve.length; xe++) {
						const De = Ve[xe],
							Pt = oe[De],
							Qn = se[De];
						(Qn !== Pt || De === 'value') && o(X, De, Pt, Qn, j, I.children, F, z, ue);
					}
				}
				Z & 1 && I.children !== A.children && c(X, A.children);
			} else !te && W == null && T(X, A, oe, se, F, z, j);
			((ve = se.onVnodeUpdated) || ie) &&
				ot(() => {
					ve && St(ve, F, A, I), ie && Ut(A, I, F, 'updated');
				}, z);
		},
		$ = (I, A, F, z, j, G, te) => {
			for (let X = 0; X < A.length; X++) {
				const Z = I[X],
					W = A[X],
					ie = Z.el && (Z.type === ge || !Kt(Z, W) || Z.shapeFlag & 70) ? f(Z.el) : F;
				y(Z, W, ie, null, z, j, G, te, !0);
			}
		},
		T = (I, A, F, z, j, G, te) => {
			if (F !== z) {
				if (F !== Ee) for (const X in F) !Kl(X) && !(X in z) && o(I, X, F[X], null, te, A.children, j, G, ue);
				for (const X in z) {
					if (Kl(X)) continue;
					const Z = z[X],
						W = F[X];
					Z !== W && X !== 'value' && o(I, X, W, Z, te, A.children, j, G, ue);
				}
				'value' in z && o(I, 'value', F.value, z.value);
			}
		},
		E = (I, A, F, z, j, G, te, X, Z) => {
			const W = (A.el = I ? I.el : s('')),
				ie = (A.anchor = I ? I.anchor : s(''));
			let { patchFlag: oe, dynamicChildren: se, slotScopeIds: ve } = A;
			ve && (X = X ? X.concat(ve) : ve),
				I == null
					? (l(W, F, z), l(ie, F, z), _(A.children, F, ie, j, G, te, X, Z))
					: oe > 0 && oe & 64 && se && I.dynamicChildren
					? ($(I.dynamicChildren, se, F, j, G, te, X), (A.key != null || (j && A === j.subTree)) && Ps(I, A, !0))
					: H(I, A, F, ie, j, G, te, X, Z);
		},
		O = (I, A, F, z, j, G, te, X, Z) => {
			(A.slotScopeIds = X),
				I == null ? (A.shapeFlag & 512 ? j.ctx.activate(A, F, z, te, Z) : B(A, F, z, j, G, te, Z)) : D(I, A, Z);
		},
		B = (I, A, F, z, j, G, te) => {
			const X = (I.component = Oh(I, z, j));
			if ((ba(I) && (X.ctx.renderer = ct), Rh(X), X.asyncDep)) {
				if ((j && j.registerDep(X, M), !I.el)) {
					const Z = (X.subTree = m(Vt));
					p(null, Z, A, F);
				}
				return;
			}
			M(X, I, A, F, j, G, te);
		},
		D = (I, A, F) => {
			const z = (A.component = I.component);
			if (Km(I, A, F))
				if (z.asyncDep && !z.asyncResolved) {
					P(z, A, F);
					return;
				} else (z.next = A), Nm(z.update), z.update();
			else (A.el = I.el), (z.vnode = A);
		},
		M = (I, A, F, z, j, G, te) => {
			const X = () => {
					if (I.isMounted) {
						let { next: ie, bu: oe, u: se, parent: ve, vnode: pe } = I,
							Ve = ie,
							xe;
						Vn(I, !1),
							ie ? ((ie.el = pe.el), P(I, ie, te)) : (ie = pe),
							oe && Ya(oe),
							(xe = ie.props && ie.props.onVnodeBeforeUpdate) && St(xe, ve, ie, pe),
							Vn(I, !0);
						const De = Jo(I),
							Pt = I.subTree;
						(I.subTree = De),
							y(Pt, De, f(Pt.el), Ne(Pt), I, j, G),
							(ie.el = De.el),
							Ve === null && xs(I, De.el),
							se && ot(se, j),
							(xe = ie.props && ie.props.onVnodeUpdated) && ot(() => St(xe, ve, ie, pe), j);
					} else {
						let ie;
						const { el: oe, props: se } = A,
							{ bm: ve, m: pe, parent: Ve } = I,
							xe = ql(A);
						if (
							(Vn(I, !1), ve && Ya(ve), !xe && (ie = se && se.onVnodeBeforeMount) && St(ie, Ve, A), Vn(I, !0), oe && Ml)
						) {
							const De = () => {
								(I.subTree = Jo(I)), Ml(oe, I.subTree, I, j, null);
							};
							xe ? A.type.__asyncLoader().then(() => !I.isUnmounted && De()) : De();
						} else {
							const De = (I.subTree = Jo(I));
							y(null, De, F, z, I, j, G), (A.el = De.el);
						}
						if ((pe && ot(pe, j), !xe && (ie = se && se.onVnodeMounted))) {
							const De = A;
							ot(() => St(ie, Ve, De), j);
						}
						(A.shapeFlag & 256 || (Ve && ql(Ve.vnode) && Ve.vnode.shapeFlag & 256)) && I.a && ot(I.a, j),
							(I.isMounted = !0),
							(A = F = z = null);
					}
				},
				Z = (I.effect = new ys(X, () => Vo(W), I.scope)),
				W = (I.update = () => Z.run());
			(W.id = I.uid), Vn(I, !0), W();
		},
		P = (I, A, F) => {
			A.component = I;
			const z = I.vnode.props;
			(I.vnode = A), (I.next = null), gh(I, A.props, z, F), ph(I, A.children, F), Cl(), Vr(), Sl();
		},
		H = (I, A, F, z, j, G, te, X, Z = !1) => {
			const W = I && I.children,
				ie = I ? I.shapeFlag : 0,
				oe = A.children,
				{ patchFlag: se, shapeFlag: ve } = A;
			if (se > 0) {
				if (se & 128) {
					Y(W, oe, F, z, j, G, te, X, Z);
					return;
				} else if (se & 256) {
					U(W, oe, F, z, j, G, te, X, Z);
					return;
				}
			}
			ve & 8
				? (ie & 16 && ue(W, j, G), oe !== W && c(F, oe))
				: ie & 16
				? ve & 16
					? Y(W, oe, F, z, j, G, te, X, Z)
					: ue(W, j, G, !0)
				: (ie & 8 && c(F, ''), ve & 16 && _(oe, F, z, j, G, te, X, Z));
		},
		U = (I, A, F, z, j, G, te, X, Z) => {
			(I = I || il), (A = A || il);
			const W = I.length,
				ie = A.length,
				oe = Math.min(W, ie);
			let se;
			for (se = 0; se < oe; se++) {
				const ve = (A[se] = Z ? yn(A[se]) : kt(A[se]));
				y(I[se], ve, F, null, j, G, te, X, Z);
			}
			W > ie ? ue(I, j, G, !0, !1, oe) : _(A, F, z, j, G, te, X, Z, oe);
		},
		Y = (I, A, F, z, j, G, te, X, Z) => {
			let W = 0;
			const ie = A.length;
			let oe = I.length - 1,
				se = ie - 1;
			for (; W <= oe && W <= se; ) {
				const ve = I[W],
					pe = (A[W] = Z ? yn(A[W]) : kt(A[W]));
				if (Kt(ve, pe)) y(ve, pe, F, null, j, G, te, X, Z);
				else break;
				W++;
			}
			for (; W <= oe && W <= se; ) {
				const ve = I[oe],
					pe = (A[se] = Z ? yn(A[se]) : kt(A[se]));
				if (Kt(ve, pe)) y(ve, pe, F, null, j, G, te, X, Z);
				else break;
				oe--, se--;
			}
			if (W > oe) {
				if (W <= se) {
					const ve = se + 1,
						pe = ve < ie ? A[ve].el : z;
					for (; W <= se; ) y(null, (A[W] = Z ? yn(A[W]) : kt(A[W])), F, pe, j, G, te, X, Z), W++;
				}
			} else if (W > se) for (; W <= oe; ) ne(I[W], j, G, !0), W++;
			else {
				const ve = W,
					pe = W,
					Ve = new Map();
				for (W = pe; W <= se; W++) {
					const dt = (A[W] = Z ? yn(A[W]) : kt(A[W]));
					dt.key != null && Ve.set(dt.key, W);
				}
				let xe,
					De = 0;
				const Pt = se - pe + 1;
				let Qn = !1,
					gr = 0;
				const Fl = new Array(Pt);
				for (W = 0; W < Pt; W++) Fl[W] = 0;
				for (W = ve; W <= oe; W++) {
					const dt = I[W];
					if (De >= Pt) {
						ne(dt, j, G, !0);
						continue;
					}
					let zt;
					if (dt.key != null) zt = Ve.get(dt.key);
					else
						for (xe = pe; xe <= se; xe++)
							if (Fl[xe - pe] === 0 && Kt(dt, A[xe])) {
								zt = xe;
								break;
							}
					zt === void 0
						? ne(dt, j, G, !0)
						: ((Fl[zt - pe] = W + 1), zt >= gr ? (gr = zt) : (Qn = !0), y(dt, A[zt], F, null, j, G, te, X, Z), De++);
				}
				const yr = Qn ? xh(Fl) : il;
				for (xe = yr.length - 1, W = Pt - 1; W >= 0; W--) {
					const dt = pe + W,
						zt = A[dt],
						br = dt + 1 < ie ? A[dt + 1].el : z;
					Fl[W] === 0 ? y(null, zt, F, br, j, G, te, X, Z) : Qn && (xe < 0 || W !== yr[xe] ? Q(zt, F, br, 2) : xe--);
				}
			}
		},
		Q = (I, A, F, z, j = null) => {
			const { el: G, type: te, transition: X, children: Z, shapeFlag: W } = I;
			if (W & 6) {
				Q(I.component.subTree, A, F, z);
				return;
			}
			if (W & 128) {
				I.suspense.move(A, F, z);
				return;
			}
			if (W & 64) {
				te.move(I, A, F, ct);
				return;
			}
			if (te === ge) {
				l(G, A, F);
				for (let oe = 0; oe < Z.length; oe++) Q(Z[oe], A, F, z);
				l(I.anchor, A, F);
				return;
			}
			if (te === Xa) {
				g(I, A, F);
				return;
			}
			if (z !== 2 && W & 1 && X)
				if (z === 0) X.beforeEnter(G), l(G, A, F), ot(() => X.enter(G), j);
				else {
					const { leave: oe, delayLeave: se, afterLeave: ve } = X,
						pe = () => l(G, A, F),
						Ve = () => {
							oe(G, () => {
								pe(), ve && ve();
							});
						};
					se ? se(G, pe, Ve) : Ve();
				}
			else l(G, A, F);
		},
		ne = (I, A, F, z = !1, j = !1) => {
			const { type: G, props: te, ref: X, children: Z, dynamicChildren: W, shapeFlag: ie, patchFlag: oe, dirs: se } = I;
			if ((X != null && oo(X, null, F, I, !0), ie & 256)) {
				A.ctx.deactivate(I);
				return;
			}
			const ve = ie & 1 && se,
				pe = !ql(I);
			let Ve;
			if ((pe && (Ve = te && te.onVnodeBeforeUnmount) && St(Ve, A, I), ie & 6)) _e(I.component, F, z);
			else {
				if (ie & 128) {
					I.suspense.unmount(F, z);
					return;
				}
				ve && Ut(I, null, A, 'beforeUnmount'),
					ie & 64
						? I.type.remove(I, A, F, j, ct, z)
						: W && (G !== ge || (oe > 0 && oe & 64))
						? ue(W, A, F, !1, !0)
						: ((G === ge && oe & 384) || (!j && ie & 16)) && ue(Z, A, F),
					z && be(I);
			}
			((pe && (Ve = te && te.onVnodeUnmounted)) || ve) &&
				ot(() => {
					Ve && St(Ve, A, I), ve && Ut(I, null, A, 'unmounted');
				}, F);
		},
		be = (I) => {
			const { type: A, el: F, anchor: z, transition: j } = I;
			if (A === ge) {
				J(F, z);
				return;
			}
			if (A === Xa) {
				x(I);
				return;
			}
			const G = () => {
				a(F), j && !j.persisted && j.afterLeave && j.afterLeave();
			};
			if (I.shapeFlag & 1 && j && !j.persisted) {
				const { leave: te, delayLeave: X } = j,
					Z = () => te(F, G);
				X ? X(I.el, G, Z) : Z();
			} else G();
		},
		J = (I, A) => {
			let F;
			for (; I !== A; ) (F = d(I)), a(I), (I = F);
			a(A);
		},
		_e = (I, A, F) => {
			const { bum: z, scope: j, update: G, subTree: te, um: X } = I;
			z && Ya(z),
				j.stop(),
				G && ((G.active = !1), ne(te, I, A, F)),
				X && ot(X, A),
				ot(() => {
					I.isUnmounted = !0;
				}, A),
				A &&
					A.pendingBranch &&
					!A.isUnmounted &&
					I.asyncDep &&
					!I.asyncResolved &&
					I.suspenseId === A.pendingId &&
					(A.deps--, A.deps === 0 && A.resolve());
		},
		ue = (I, A, F, z = !1, j = !1, G = 0) => {
			for (let te = G; te < I.length; te++) ne(I[te], A, F, z, j);
		},
		Ne = (I) =>
			I.shapeFlag & 6 ? Ne(I.component.subTree) : I.shapeFlag & 128 ? I.suspense.next() : d(I.anchor || I.el),
		ut = (I, A, F) => {
			I == null ? A._vnode && ne(A._vnode, null, null, !0) : y(A._vnode || null, I, A, null, null, null, F),
				Vr(),
				no(),
				(A._vnode = I);
		},
		ct = { p: y, um: ne, m: Q, r: be, mt: B, mc: _, pc: H, pbc: $, n: Ne, o: e };
	let jt, Ml;
	return t && ([jt, Ml] = t(ct)), { render: ut, hydrate: jt, createApp: Ch(ut, jt) };
}
function Vn({ effect: e, update: t }, n) {
	e.allowRecurse = t.allowRecurse = n;
}
function Ps(e, t, n = !1) {
	const l = e.children,
		a = t.children;
	if (ce(l) && ce(a))
		for (let o = 0; o < l.length; o++) {
			const i = l[o];
			let s = a[o];
			s.shapeFlag & 1 &&
				!s.dynamicChildren &&
				((s.patchFlag <= 0 || s.patchFlag === 32) && ((s = a[o] = yn(a[o])), (s.el = i.el)), n || Ps(i, s)),
				s.type === ml && (s.el = i.el);
		}
}
function xh(e) {
	const t = e.slice(),
		n = [0];
	let l, a, o, i, s;
	const r = e.length;
	for (l = 0; l < r; l++) {
		const u = e[l];
		if (u !== 0) {
			if (((a = n[n.length - 1]), e[a] < u)) {
				(t[l] = a), n.push(l);
				continue;
			}
			for (o = 0, i = n.length - 1; o < i; ) (s = (o + i) >> 1), e[n[s]] < u ? (o = s + 1) : (i = s);
			u < e[n[o]] && (o > 0 && (t[l] = n[o - 1]), (n[o] = l));
		}
	}
	for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
	return n;
}
const $h = (e) => e.__isTeleport,
	Xl = (e) => e && (e.disabled || e.disabled === ''),
	Fr = (e) => typeof SVGElement < 'u' && e instanceof SVGElement,
	Ai = (e, t) => {
		const n = e && e.to;
		return He(n) ? (t ? t(n) : null) : n;
	},
	Vh = {
		__isTeleport: !0,
		process(e, t, n, l, a, o, i, s, r, u) {
			const {
					mc: c,
					pc: f,
					pbc: d,
					o: { insert: v, querySelector: h, createText: y, createComment: V },
				} = u,
				p = Xl(t.props);
			let { shapeFlag: b, children: g, dynamicChildren: x } = t;
			if (e == null) {
				const S = (t.el = y('')),
					w = (t.anchor = y(''));
				v(S, n, l), v(w, n, l);
				const k = (t.target = Ai(t.props, h)),
					_ = (t.targetAnchor = y(''));
				k && (v(_, k), (i = i || Fr(k)));
				const L = ($, T) => {
					b & 16 && c(g, $, T, a, o, i, s, r);
				};
				p ? L(n, w) : k && L(k, _);
			} else {
				t.el = e.el;
				const S = (t.anchor = e.anchor),
					w = (t.target = e.target),
					k = (t.targetAnchor = e.targetAnchor),
					_ = Xl(e.props),
					L = _ ? n : w,
					$ = _ ? S : k;
				if (
					((i = i || Fr(w)),
					x ? (d(e.dynamicChildren, x, L, a, o, i, s), Ps(e, t, !0)) : r || f(e, t, L, $, a, o, i, s, !1),
					p)
				)
					_ || Ha(t, n, S, u, 1);
				else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
					const T = (t.target = Ai(t.props, h));
					T && Ha(t, T, null, u, 0);
				} else _ && Ha(t, w, k, u, 1);
			}
			Gc(t);
		},
		remove(e, t, n, l, { um: a, o: { remove: o } }, i) {
			const { shapeFlag: s, children: r, anchor: u, targetAnchor: c, target: f, props: d } = e;
			if ((f && o(c), (i || !Xl(d)) && (o(u), s & 16)))
				for (let v = 0; v < r.length; v++) {
					const h = r[v];
					a(h, t, n, !0, !!h.dynamicChildren);
				}
		},
		move: Ha,
		hydrate: Lh,
	};
function Ha(e, t, n, { o: { insert: l }, m: a }, o = 2) {
	o === 0 && l(e.targetAnchor, t, n);
	const { el: i, anchor: s, shapeFlag: r, children: u, props: c } = e,
		f = o === 2;
	if ((f && l(i, t, n), (!f || Xl(c)) && r & 16)) for (let d = 0; d < u.length; d++) a(u[d], t, n, 2);
	f && l(s, t, n);
}
function Lh(e, t, n, l, a, o, { o: { nextSibling: i, parentNode: s, querySelector: r } }, u) {
	const c = (t.target = Ai(t.props, r));
	if (c) {
		const f = c._lpa || c.firstChild;
		if (t.shapeFlag & 16)
			if (Xl(t.props)) (t.anchor = u(i(e), t, s(e), n, l, a, o)), (t.targetAnchor = f);
			else {
				t.anchor = i(e);
				let d = f;
				for (; d; )
					if (((d = i(d)), d && d.nodeType === 8 && d.data === 'teleport anchor')) {
						(t.targetAnchor = d), (c._lpa = t.targetAnchor && i(t.targetAnchor));
						break;
					}
				u(f, t, c, n, l, a, o);
			}
		Gc(t);
	}
	return t.anchor && i(t.anchor);
}
const Ih = Vh;
function Gc(e) {
	const t = e.ctx;
	if (t && t.ut) {
		let n = e.children[0].el;
		for (; n !== e.targetAnchor; ) n.nodeType === 1 && n.setAttribute('data-v-owner', t.uid), (n = n.nextSibling);
		t.ut();
	}
}
const ge = Symbol(void 0),
	ml = Symbol(void 0),
	Vt = Symbol(void 0),
	Xa = Symbol(void 0),
	Gl = [];
let xt = null;
function Zl(e = !1) {
	Gl.push((xt = e ? null : []));
}
function Zc() {
	Gl.pop(), (xt = Gl[Gl.length - 1] || null);
}
let hl = 1;
function Hr(e) {
	hl += e;
}
function Jc(e) {
	return (e.dynamicChildren = hl > 0 ? xt || il : null), Zc(), hl > 0 && xt && xt.push(e), e;
}
function Eh(e, t, n, l, a, o) {
	return Jc(Cn(e, t, n, l, a, o, !0));
}
function li(e, t, n, l, a) {
	return Jc(m(e, t, n, l, a, !0));
}
function io(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Kt(e, t) {
	return e.type === t.type && e.key === t.key;
}
const Po = '__vInternal',
	Qc = ({ key: e }) => (e != null ? e : null),
	Ga = ({ ref: e, ref_key: t, ref_for: n }) =>
		e != null ? (He(e) || Le(e) || me(e) ? { i: mt, r: e, k: t, f: !!n } : e) : null;
function Cn(e, t = null, n = null, l = 0, a = null, o = e === ge ? 0 : 1, i = !1, s = !1) {
	const r = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Qc(t),
		ref: t && Ga(t),
		scopeId: Io,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: o,
		patchFlag: l,
		dynamicProps: a,
		dynamicChildren: null,
		appContext: null,
		ctx: mt,
	};
	return (
		s ? (Bs(r, n), o & 128 && e.normalize(r)) : n && (r.shapeFlag |= He(n) ? 8 : 16),
		hl > 0 && !i && xt && (r.patchFlag > 0 || o & 6) && r.patchFlag !== 32 && xt.push(r),
		r
	);
}
const m = Th;
function Th(e, t = null, n = null, l = 0, a = null, o = !1) {
	if (((!e || e === Dc) && (e = Vt), io(e))) {
		const s = nn(e, t, !0);
		return (
			n && Bs(s, n),
			hl > 0 && !o && xt && (s.shapeFlag & 6 ? (xt[xt.indexOf(e)] = s) : xt.push(s)),
			(s.patchFlag |= -2),
			s
		);
	}
	if ((Dh(e) && (e = e.__vccOpts), t)) {
		t = Ah(t);
		let { class: s, style: r } = t;
		s && !He(s) && (t.class = So(s)), Pe(r) && (yc(r) && !ce(r) && (r = Ye({}, r)), (t.style = Co(r)));
	}
	const i = He(e) ? 1 : qm(e) ? 128 : $h(e) ? 64 : Pe(e) ? 4 : me(e) ? 2 : 0;
	return Cn(e, t, n, l, a, i, o, !0);
}
function Ah(e) {
	return e ? (yc(e) || Po in e ? Ye({}, e) : e) : null;
}
function nn(e, t, n = !1) {
	const { props: l, ref: a, patchFlag: o, children: i } = e,
		s = t ? le(l || {}, t) : l;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: s,
		key: s && Qc(s),
		ref: t && t.ref ? (n && a ? (ce(a) ? a.concat(Ga(t)) : [a, Ga(t)]) : Ga(t)) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: i,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== ge ? (o === -1 ? 16 : o | 16) : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && nn(e.ssContent),
		ssFallback: e.ssFallback && nn(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
	};
}
function Sn(e = ' ', t = 0) {
	return m(ml, null, e, t);
}
function kt(e) {
	return e == null || typeof e == 'boolean'
		? m(Vt)
		: ce(e)
		? m(ge, null, e.slice())
		: typeof e == 'object'
		? yn(e)
		: m(ml, null, String(e));
}
function yn(e) {
	return (e.el === null && e.patchFlag !== -1) || e.memo ? e : nn(e);
}
function Bs(e, t) {
	let n = 0;
	const { shapeFlag: l } = e;
	if (t == null) t = null;
	else if (ce(t)) n = 16;
	else if (typeof t == 'object')
		if (l & 65) {
			const a = t.default;
			a && (a._c && (a._d = !1), Bs(e, a()), a._c && (a._d = !0));
			return;
		} else {
			n = 32;
			const a = t._;
			!a && !(Po in t)
				? (t._ctx = mt)
				: a === 3 && mt && (mt.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		me(t)
			? ((t = { default: t, _ctx: mt }), (n = 32))
			: ((t = String(t)), l & 64 ? ((n = 16), (t = [Sn(t)])) : (n = 8));
	(e.children = t), (e.shapeFlag |= n);
}
function le(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const l = e[n];
		for (const a in l)
			if (a === 'class') t.class !== l.class && (t.class = So([t.class, l.class]));
			else if (a === 'style') t.style = Co([t.style, l.style]);
			else if (ga(a)) {
				const o = t[a],
					i = l[a];
				i && o !== i && !(ce(o) && o.includes(i)) && (t[a] = o ? [].concat(o, i) : i);
			} else a !== '' && (t[a] = l[a]);
	}
	return t;
}
function St(e, t, n, l = null) {
	$t(e, t, 7, [n, l]);
}
const Ph = Yc();
let Bh = 0;
function Oh(e, t, n) {
	const l = e.type,
		a = (t ? t.appContext : e.appContext) || Ph,
		o = {
			uid: Bh++,
			vnode: e,
			type: l,
			parent: t,
			appContext: a,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new oc(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(a.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: Uc(l, a),
			emitsOptions: Lc(l, a),
			emit: null,
			emitted: null,
			propsDefaults: Ee,
			inheritAttrs: l.inheritAttrs,
			ctx: Ee,
			data: Ee,
			props: Ee,
			attrs: Ee,
			slots: Ee,
			refs: Ee,
			setupState: Ee,
			setupContext: null,
			suspense: n,
			suspenseId: n ? n.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (o.ctx = { _: o }), (o.root = t ? t.root : o), (o.emit = jm.bind(null, o)), e.ce && e.ce(o), o;
}
let Ke = null;
const kn = () => Ke || mt,
	gl = (e) => {
		(Ke = e), e.scope.on();
	},
	Nn = () => {
		Ke && Ke.scope.off(), (Ke = null);
	};
function ed(e) {
	return e.vnode.shapeFlag & 4;
}
let yl = !1;
function Rh(e, t = !1) {
	yl = t;
	const { props: n, children: l } = e.vnode,
		a = ed(e);
	hh(e, n, a, t), bh(e, l);
	const o = a ? Mh(e, t) : void 0;
	return (yl = !1), o;
}
function Mh(e, t) {
	const n = e.type;
	(e.accessCache = Object.create(null)), (e.proxy = bc(new Proxy(e.ctx, uh)));
	const { setup: l } = n;
	if (l) {
		const a = (e.setupContext = l.length > 1 ? Hh(e) : null);
		gl(e), Cl();
		const o = pn(l, e, 0, [e.props, a]);
		if ((Sl(), Nn(), nc(o))) {
			if ((o.then(Nn, Nn), t))
				return o
					.then((i) => {
						Pi(e, i, t);
					})
					.catch((i) => {
						wl(i, e, 0);
					});
			e.asyncDep = o;
		} else Pi(e, o, t);
	} else td(e, t);
}
function Pi(e, t, n) {
	me(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : Pe(t) && (e.setupState = Sc(t)), td(e, n);
}
let Nr;
function td(e, t, n) {
	const l = e.type;
	if (!e.render) {
		if (!t && Nr && !l.render) {
			const a = l.template || Ts(e).template;
			if (a) {
				const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
					{ delimiters: s, compilerOptions: r } = l,
					u = Ye(Ye({ isCustomElement: o, delimiters: s }, i), r);
				l.render = Nr(a, u);
			}
		}
		e.render = l.render || Ot;
	}
	gl(e), Cl(), ch(e), Sl(), Nn();
}
function Fh(e) {
	return new Proxy(e.attrs, {
		get(t, n) {
			return gt(e, 'get', '$attrs'), t[n];
		},
	});
}
function Hh(e) {
	const t = (l) => {
		e.exposed = l || {};
	};
	let n;
	return {
		get attrs() {
			return n || (n = Fh(e));
		},
		slots: e.slots,
		emit: e.emit,
		expose: t,
	};
}
function Bo(e) {
	if (e.exposed)
		return (
			e.exposeProxy ||
			(e.exposeProxy = new Proxy(Sc(bc(e.exposed)), {
				get(t, n) {
					if (n in t) return t[n];
					if (n in Yl) return Yl[n](e);
				},
				has(t, n) {
					return n in t || n in Yl;
				},
			}))
		);
}
function Nh(e, t = !0) {
	return me(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Dh(e) {
	return me(e) && '__vccOpts' in e;
}
const C = (e, t) => Mm(e, t, yl);
function Rt(e, t, n) {
	const l = arguments.length;
	return l === 2
		? Pe(t) && !ce(t)
			? io(t)
				? m(e, null, [t])
				: m(e, t)
			: m(e, null, t)
		: (l > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : l === 3 && io(n) && (n = [n]), m(e, t, n));
}
const jh = Symbol(''),
	zh = () => we(jh),
	Os = '3.2.45',
	Uh = 'http://www.w3.org/2000/svg',
	An = typeof document < 'u' ? document : null,
	Dr = An && An.createElement('template'),
	Wh = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null);
		},
		remove: (e) => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, n, l) => {
			const a = t ? An.createElementNS(Uh, e) : An.createElement(e, n ? { is: n } : void 0);
			return e === 'select' && l && l.multiple != null && a.setAttribute('multiple', l.multiple), a;
		},
		createText: (e) => An.createTextNode(e),
		createComment: (e) => An.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: (e) => e.parentNode,
		nextSibling: (e) => e.nextSibling,
		querySelector: (e) => An.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, '');
		},
		insertStaticContent(e, t, n, l, a, o) {
			const i = n ? n.previousSibling : t.lastChild;
			if (a && (a === o || a.nextSibling))
				for (; t.insertBefore(a.cloneNode(!0), n), !(a === o || !(a = a.nextSibling)); );
			else {
				Dr.innerHTML = l ? `<svg>${e}</svg>` : e;
				const s = Dr.content;
				if (l) {
					const r = s.firstChild;
					for (; r.firstChild; ) s.appendChild(r.firstChild);
					s.removeChild(r);
				}
				t.insertBefore(s, n);
			}
			return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
		},
	};
function Kh(e, t, n) {
	const l = e._vtc;
	l && (t = (t ? [t, ...l] : [...l]).join(' ')),
		t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t);
}
function qh(e, t, n) {
	const l = e.style,
		a = He(n);
	if (n && !a) {
		for (const o in n) Bi(l, o, n[o]);
		if (t && !He(t)) for (const o in t) n[o] == null && Bi(l, o, '');
	} else {
		const o = l.display;
		a ? t !== n && (l.cssText = n) : t && e.removeAttribute('style'), '_vod' in e && (l.display = o);
	}
}
const jr = /\s*!important$/;
function Bi(e, t, n) {
	if (ce(n)) n.forEach((l) => Bi(e, t, l));
	else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
	else {
		const l = Yh(e, t);
		jr.test(n) ? e.setProperty(_l(l), n.replace(jr, ''), 'important') : (e[l] = n);
	}
}
const zr = ['Webkit', 'Moz', 'ms'],
	ai = {};
function Yh(e, t) {
	const n = ai[t];
	if (n) return n;
	let l = It(t);
	if (l !== 'filter' && l in e) return (ai[t] = l);
	l = on(l);
	for (let a = 0; a < zr.length; a++) {
		const o = zr[a] + l;
		if (o in e) return (ai[t] = o);
	}
	return t;
}
const Ur = 'http://www.w3.org/1999/xlink';
function Xh(e, t, n, l, a) {
	if (l && t.startsWith('xlink:'))
		n == null ? e.removeAttributeNS(Ur, t.slice(6, t.length)) : e.setAttributeNS(Ur, t, n);
	else {
		const o = Jv(t);
		n == null || (o && !Qu(n)) ? e.removeAttribute(t) : e.setAttribute(t, o ? '' : n);
	}
}
function Gh(e, t, n, l, a, o, i) {
	if (t === 'innerHTML' || t === 'textContent') {
		l && i(l, a, o), (e[t] = n == null ? '' : n);
		return;
	}
	if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
		e._value = n;
		const r = n == null ? '' : n;
		(e.value !== r || e.tagName === 'OPTION') && (e.value = r), n == null && e.removeAttribute(t);
		return;
	}
	let s = !1;
	if (n === '' || n == null) {
		const r = typeof e[t];
		r === 'boolean'
			? (n = Qu(n))
			: n == null && r === 'string'
			? ((n = ''), (s = !0))
			: r === 'number' && ((n = 0), (s = !0));
	}
	try {
		e[t] = n;
	} catch {}
	s && e.removeAttribute(t);
}
function al(e, t, n, l) {
	e.addEventListener(t, n, l);
}
function Zh(e, t, n, l) {
	e.removeEventListener(t, n, l);
}
function Jh(e, t, n, l, a = null) {
	const o = e._vei || (e._vei = {}),
		i = o[t];
	if (l && i) i.value = l;
	else {
		const [s, r] = Qh(t);
		if (l) {
			const u = (o[t] = ng(l, a));
			al(e, s, u, r);
		} else i && (Zh(e, s, i, r), (o[t] = void 0));
	}
}
const Wr = /(?:Once|Passive|Capture)$/;
function Qh(e) {
	let t;
	if (Wr.test(e)) {
		t = {};
		let l;
		for (; (l = e.match(Wr)); ) (e = e.slice(0, e.length - l[0].length)), (t[l[0].toLowerCase()] = !0);
	}
	return [e[2] === ':' ? e.slice(3) : _l(e.slice(2)), t];
}
let oi = 0;
const eg = Promise.resolve(),
	tg = () => oi || (eg.then(() => (oi = 0)), (oi = Date.now()));
function ng(e, t) {
	const n = (l) => {
		if (!l._vts) l._vts = Date.now();
		else if (l._vts <= n.attached) return;
		$t(lg(l, n.value), t, 5, [l]);
	};
	return (n.value = e), (n.attached = tg()), n;
}
function lg(e, t) {
	if (ce(t)) {
		const n = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				n.call(e), (e._stopped = !0);
			}),
			t.map((l) => (a) => !a._stopped && l && l(a))
		);
	} else return t;
}
const Kr = /^on[a-z]/,
	ag = (e, t, n, l, a = !1, o, i, s, r) => {
		t === 'class'
			? Kh(e, l, a)
			: t === 'style'
			? qh(e, n, l)
			: ga(t)
			? fs(t) || Jh(e, t, n, l, i)
			: (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : og(e, t, l, a))
			? Gh(e, t, l, o, i, s, r)
			: (t === 'true-value' ? (e._trueValue = l) : t === 'false-value' && (e._falseValue = l), Xh(e, t, l, a));
	};
function og(e, t, n, l) {
	return l
		? !!(t === 'innerHTML' || t === 'textContent' || (t in e && Kr.test(t) && me(n)))
		: t === 'spellcheck' ||
		  t === 'draggable' ||
		  t === 'translate' ||
		  t === 'form' ||
		  (t === 'list' && e.tagName === 'INPUT') ||
		  (t === 'type' && e.tagName === 'TEXTAREA') ||
		  (Kr.test(t) && He(n))
		? !1
		: t in e;
}
const hn = 'transition',
	Hl = 'animation',
	Xt = (e, { slots: t }) => Rt(Ac, ld(e), t);
Xt.displayName = 'Transition';
const nd = {
		name: String,
		type: String,
		css: { type: Boolean, default: !0 },
		duration: [String, Number, Object],
		enterFromClass: String,
		enterActiveClass: String,
		enterToClass: String,
		appearFromClass: String,
		appearActiveClass: String,
		appearToClass: String,
		leaveFromClass: String,
		leaveActiveClass: String,
		leaveToClass: String,
	},
	ig = (Xt.props = Ye({}, Ac.props, nd)),
	Ln = (e, t = []) => {
		ce(e) ? e.forEach((n) => n(...t)) : e && e(...t);
	},
	qr = (e) => (e ? (ce(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function ld(e) {
	const t = {};
	for (const E in e) E in nd || (t[E] = e[E]);
	if (e.css === !1) return t;
	const {
			name: n = 'v',
			type: l,
			duration: a,
			enterFromClass: o = `${n}-enter-from`,
			enterActiveClass: i = `${n}-enter-active`,
			enterToClass: s = `${n}-enter-to`,
			appearFromClass: r = o,
			appearActiveClass: u = i,
			appearToClass: c = s,
			leaveFromClass: f = `${n}-leave-from`,
			leaveActiveClass: d = `${n}-leave-active`,
			leaveToClass: v = `${n}-leave-to`,
		} = e,
		h = sg(a),
		y = h && h[0],
		V = h && h[1],
		{
			onBeforeEnter: p,
			onEnter: b,
			onEnterCancelled: g,
			onLeave: x,
			onLeaveCancelled: S,
			onBeforeAppear: w = p,
			onAppear: k = b,
			onAppearCancelled: _ = g,
		} = t,
		L = (E, O, B) => {
			gn(E, O ? c : s), gn(E, O ? u : i), B && B();
		},
		$ = (E, O) => {
			(E._isLeaving = !1), gn(E, f), gn(E, v), gn(E, d), O && O();
		},
		T = (E) => (O, B) => {
			const D = E ? k : b,
				M = () => L(O, E, B);
			Ln(D, [O, M]),
				Yr(() => {
					gn(O, E ? r : o), Qt(O, E ? c : s), qr(D) || Xr(O, l, y, M);
				});
		};
	return Ye(t, {
		onBeforeEnter(E) {
			Ln(p, [E]), Qt(E, o), Qt(E, i);
		},
		onBeforeAppear(E) {
			Ln(w, [E]), Qt(E, r), Qt(E, u);
		},
		onEnter: T(!1),
		onAppear: T(!0),
		onLeave(E, O) {
			E._isLeaving = !0;
			const B = () => $(E, O);
			Qt(E, f),
				od(),
				Qt(E, d),
				Yr(() => {
					!E._isLeaving || (gn(E, f), Qt(E, v), qr(x) || Xr(E, l, V, B));
				}),
				Ln(x, [E, B]);
		},
		onEnterCancelled(E) {
			L(E, !1), Ln(g, [E]);
		},
		onAppearCancelled(E) {
			L(E, !0), Ln(_, [E]);
		},
		onLeaveCancelled(E) {
			$(E), Ln(S, [E]);
		},
	});
}
function sg(e) {
	if (e == null) return null;
	if (Pe(e)) return [ii(e.enter), ii(e.leave)];
	{
		const t = ii(e);
		return [t, t];
	}
}
function ii(e) {
	return fl(e);
}
function Qt(e, t) {
	t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = new Set())).add(t);
}
function gn(e, t) {
	t.split(/\s+/).forEach((l) => l && e.classList.remove(l));
	const { _vtc: n } = e;
	n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Yr(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
let rg = 0;
function Xr(e, t, n, l) {
	const a = (e._endId = ++rg),
		o = () => {
			a === e._endId && l();
		};
	if (n) return setTimeout(o, n);
	const { type: i, timeout: s, propCount: r } = ad(e, t);
	if (!i) return l();
	const u = i + 'end';
	let c = 0;
	const f = () => {
			e.removeEventListener(u, d), o();
		},
		d = (v) => {
			v.target === e && ++c >= r && f();
		};
	setTimeout(() => {
		c < r && f();
	}, s + 1),
		e.addEventListener(u, d);
}
function ad(e, t) {
	const n = window.getComputedStyle(e),
		l = (h) => (n[h] || '').split(', '),
		a = l(`${hn}Delay`),
		o = l(`${hn}Duration`),
		i = Gr(a, o),
		s = l(`${Hl}Delay`),
		r = l(`${Hl}Duration`),
		u = Gr(s, r);
	let c = null,
		f = 0,
		d = 0;
	t === hn
		? i > 0 && ((c = hn), (f = i), (d = o.length))
		: t === Hl
		? u > 0 && ((c = Hl), (f = u), (d = r.length))
		: ((f = Math.max(i, u)), (c = f > 0 ? (i > u ? hn : Hl) : null), (d = c ? (c === hn ? o.length : r.length) : 0));
	const v = c === hn && /\b(transform|all)(,|$)/.test(l(`${hn}Property`).toString());
	return { type: c, timeout: f, propCount: d, hasTransform: v };
}
function Gr(e, t) {
	for (; e.length < t.length; ) e = e.concat(e);
	return Math.max(...t.map((n, l) => Zr(n) + Zr(e[l])));
}
function Zr(e) {
	return Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function od() {
	return document.body.offsetHeight;
}
const id = new WeakMap(),
	sd = new WeakMap(),
	ug = {
		name: 'TransitionGroup',
		props: Ye({}, ig, { tag: String, moveClass: String }),
		setup(e, { slots: t }) {
			const n = kn(),
				l = Tc();
			let a, o;
			return (
				Fc(() => {
					if (!a.length) return;
					const i = e.moveClass || `${e.name || 'v'}-move`;
					if (!mg(a[0].el, n.vnode.el, i)) return;
					a.forEach(dg), a.forEach(fg);
					const s = a.filter(vg);
					od(),
						s.forEach((r) => {
							const u = r.el,
								c = u.style;
							Qt(u, i), (c.transform = c.webkitTransform = c.transitionDuration = '');
							const f = (u._moveCb = (d) => {
								(d && d.target !== u) ||
									((!d || /transform$/.test(d.propertyName)) &&
										(u.removeEventListener('transitionend', f), (u._moveCb = null), gn(u, i)));
							});
							u.addEventListener('transitionend', f);
						});
				}),
				() => {
					const i = Se(e),
						s = ld(i);
					let r = i.tag || ge;
					(a = o), (o = t.default ? Ls(t.default()) : []);
					for (let u = 0; u < o.length; u++) {
						const c = o[u];
						c.key != null && ra(c, sa(c, s, l, n));
					}
					if (a)
						for (let u = 0; u < a.length; u++) {
							const c = a[u];
							ra(c, sa(c, s, l, n)), id.set(c, c.el.getBoundingClientRect());
						}
					return m(r, null, o);
				}
			);
		},
	},
	cg = ug;
function dg(e) {
	const t = e.el;
	t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function fg(e) {
	sd.set(e, e.el.getBoundingClientRect());
}
function vg(e) {
	const t = id.get(e),
		n = sd.get(e),
		l = t.left - n.left,
		a = t.top - n.top;
	if (l || a) {
		const o = e.el.style;
		return (o.transform = o.webkitTransform = `translate(${l}px,${a}px)`), (o.transitionDuration = '0s'), e;
	}
}
function mg(e, t, n) {
	const l = e.cloneNode();
	e._vtc &&
		e._vtc.forEach((i) => {
			i.split(/\s+/).forEach((s) => s && l.classList.remove(s));
		}),
		n.split(/\s+/).forEach((i) => i && l.classList.add(i)),
		(l.style.display = 'none');
	const a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(l);
	const { hasTransform: o } = ad(l);
	return a.removeChild(l), o;
}
const Jr = (e) => {
	const t = e.props['onUpdate:modelValue'] || !1;
	return ce(t) ? (n) => Ya(t, n) : t;
};
function hg(e) {
	e.target.composing = !0;
}
function Qr(e) {
	const t = e.target;
	t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')));
}
const gg = {
		created(e, { modifiers: { lazy: t, trim: n, number: l } }, a) {
			e._assign = Jr(a);
			const o = l || (a.props && a.props.type === 'number');
			al(e, t ? 'change' : 'input', (i) => {
				if (i.target.composing) return;
				let s = e.value;
				n && (s = s.trim()), o && (s = fl(s)), e._assign(s);
			}),
				n &&
					al(e, 'change', () => {
						e.value = e.value.trim();
					}),
				t || (al(e, 'compositionstart', hg), al(e, 'compositionend', Qr), al(e, 'change', Qr));
		},
		mounted(e, { value: t }) {
			e.value = t == null ? '' : t;
		},
		beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: l, number: a } }, o) {
			if (
				((e._assign = Jr(o)),
				e.composing ||
					(document.activeElement === e &&
						e.type !== 'range' &&
						(n || (l && e.value.trim() === t) || ((a || e.type === 'number') && fl(e.value) === t))))
			)
				return;
			const i = t == null ? '' : t;
			e.value !== i && (e.value = i);
		},
	},
	Zt = {
		beforeMount(e, { value: t }, { transition: n }) {
			(e._vod = e.style.display === 'none' ? '' : e.style.display), n && t ? n.beforeEnter(e) : Nl(e, t);
		},
		mounted(e, { value: t }, { transition: n }) {
			n && t && n.enter(e);
		},
		updated(e, { value: t, oldValue: n }, { transition: l }) {
			!t != !n &&
				(l
					? t
						? (l.beforeEnter(e), Nl(e, !0), l.enter(e))
						: l.leave(e, () => {
								Nl(e, !1);
						  })
					: Nl(e, t));
		},
		beforeUnmount(e, { value: t }) {
			Nl(e, t);
		},
	};
function Nl(e, t) {
	e.style.display = t ? e._vod : 'none';
}
const rd = Ye({ patchProp: ag }, Wh);
let Jl,
	eu = !1;
function yg() {
	return Jl || (Jl = wh(rd));
}
function bg() {
	return (Jl = eu ? Jl : kh(rd)), (eu = !0), Jl;
}
const pg = (...e) => {
		const t = yg().createApp(...e),
			{ mount: n } = t;
		return (
			(t.mount = (l) => {
				const a = ud(l);
				if (!a) return;
				const o = t._component;
				!me(o) && !o.render && !o.template && (o.template = a.innerHTML), (a.innerHTML = '');
				const i = n(a, !1, a instanceof SVGElement);
				return a instanceof Element && (a.removeAttribute('v-cloak'), a.setAttribute('data-v-app', '')), i;
			}),
			t
		);
	},
	_g = (...e) => {
		const t = bg().createApp(...e),
			{ mount: n } = t;
		return (
			(t.mount = (l) => {
				const a = ud(l);
				if (a) return n(a, !0, a instanceof SVGElement);
			}),
			t
		);
	};
function ud(e) {
	return He(e) ? document.querySelector(e) : e;
}
const Cg =
		/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	Sg =
		/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	wg = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function kg(e, t) {
	if (e !== '__proto__' && !(e === 'constructor' && t && typeof t == 'object' && 'prototype' in t)) return t;
}
function xg(e, t = {}) {
	if (typeof e != 'string') return e;
	const n = e.toLowerCase().trim();
	if (n === 'true') return !0;
	if (n === 'false') return !1;
	if (n === 'null') return null;
	if (n === 'nan') return Number.NaN;
	if (n === 'infinity') return Number.POSITIVE_INFINITY;
	if (n !== 'undefined') {
		if (!wg.test(e)) {
			if (t.strict) throw new SyntaxError('Invalid JSON');
			return e;
		}
		try {
			return Cg.test(e) || Sg.test(e) ? JSON.parse(e, kg) : JSON.parse(e);
		} catch (l) {
			if (t.strict) throw l;
			return e;
		}
	}
}
const $g = /#/g,
	Vg = /&/g,
	Lg = /=/g,
	cd = /\+/g,
	Ig = /%5b/gi,
	Eg = /%5d/gi,
	Tg = /%5e/gi,
	Ag = /%60/gi,
	Pg = /%7b/gi,
	Bg = /%7c/gi,
	Og = /%7d/gi,
	Rg = /%20/gi;
function Mg(e) {
	return encodeURI('' + e)
		.replace(Bg, '|')
		.replace(Ig, '[')
		.replace(Eg, ']');
}
function Oi(e) {
	return Mg(e)
		.replace(cd, '%2B')
		.replace(Rg, '+')
		.replace($g, '%23')
		.replace(Vg, '%26')
		.replace(Ag, '`')
		.replace(Pg, '{')
		.replace(Og, '}')
		.replace(Tg, '^');
}
function si(e) {
	return Oi(e).replace(Lg, '%3D');
}
function so(e = '') {
	try {
		return decodeURIComponent('' + e);
	} catch {
		return '' + e;
	}
}
function Fg(e) {
	return so(e.replace(cd, ' '));
}
function dd(e = '') {
	const t = {};
	e[0] === '?' && (e = e.slice(1));
	for (const n of e.split('&')) {
		const l = n.match(/([^=]+)=?(.*)/) || [];
		if (l.length < 2) continue;
		const a = so(l[1]);
		if (a === '__proto__' || a === 'constructor') continue;
		const o = Fg(l[2] || '');
		typeof t[a] < 'u' ? (Array.isArray(t[a]) ? t[a].push(o) : (t[a] = [t[a], o])) : (t[a] = o);
	}
	return t;
}
function Hg(e, t) {
	return (
		(typeof t == 'number' || typeof t == 'boolean') && (t = String(t)),
		t ? (Array.isArray(t) ? t.map((n) => `${si(e)}=${Oi(n)}`).join('&') : `${si(e)}=${Oi(t)}`) : si(e)
	);
}
function fd(e) {
	return Object.keys(e)
		.filter((t) => e[t] !== void 0)
		.map((t) => Hg(t, e[t]))
		.join('&');
}
const Ng = /^\w{2,}:(\/\/)?/,
	Dg = /^\/\/[^/]+/;
function Oo(e, t = !1) {
	return Ng.test(e) || (t && Dg.test(e));
}
const jg = /\/$|\/\?/;
function Ri(e = '', t = !1) {
	return t ? jg.test(e) : e.endsWith('/');
}
function vd(e = '', t = !1) {
	if (!t) return (Ri(e) ? e.slice(0, -1) : e) || '/';
	if (!Ri(e, !0)) return e || '/';
	const [n, ...l] = e.split('?');
	return (n.slice(0, -1) || '/') + (l.length > 0 ? `?${l.join('?')}` : '');
}
function Mi(e = '', t = !1) {
	if (!t) return e.endsWith('/') ? e : e + '/';
	if (Ri(e, !0)) return e || '/';
	const [n, ...l] = e.split('?');
	return n + '/' + (l.length > 0 ? `?${l.join('?')}` : '');
}
function md(e = '') {
	return e.startsWith('/');
}
function zg(e = '') {
	return (md(e) ? e.slice(1) : e) || '/';
}
function tu(e = '') {
	return md(e) ? e : '/' + e;
}
function Ug(e, t) {
	if (hd(t) || Oo(e)) return e;
	const n = vd(t);
	return e.startsWith(n) ? e : pa(n, e);
}
function Wg(e, t) {
	if (hd(t)) return e;
	const n = vd(t);
	if (!e.startsWith(n)) return e;
	const l = e.slice(n.length);
	return l[0] === '/' ? l : '/' + l;
}
function Kg(e, t) {
	const n = _a(e),
		l = { ...dd(n.search), ...t };
	return (n.search = fd(l)), gd(n);
}
function hd(e) {
	return !e || e === '/';
}
function qg(e) {
	return e && e !== '/';
}
function pa(e, ...t) {
	let n = e || '';
	for (const l of t.filter((a) => qg(a))) n = n ? Mi(n) + zg(l) : l;
	return n;
}
function Yg(e, t, n = {}) {
	return (
		n.trailingSlash || ((e = Mi(e)), (t = Mi(t))),
		n.leadingSlash || ((e = tu(e)), (t = tu(t))),
		n.encoding || ((e = so(e)), (t = so(t))),
		e === t
	);
}
function _a(e = '', t) {
	if (!Oo(e, !0)) return t ? _a(t + e) : nu(e);
	const [n = '', l, a = ''] = (e.replace(/\\/g, '/').match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1),
		[o = '', i = ''] = (a.match(/([^#/?]*)(.*)?/) || []).splice(1),
		{ pathname: s, search: r, hash: u } = nu(i.replace(/\/(?=[A-Za-z]:)/, ''));
	return {
		protocol: n,
		auth: l ? l.slice(0, Math.max(0, l.length - 1)) : '',
		host: o,
		pathname: s,
		search: r,
		hash: u,
	};
}
function nu(e = '') {
	const [t = '', n = '', l = ''] = (e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
	return { pathname: t, search: n, hash: l };
}
function gd(e) {
	const t = e.pathname + (e.search ? (e.search.startsWith('?') ? '' : '?') + e.search : '') + e.hash;
	return e.protocol ? e.protocol + '//' + (e.auth ? e.auth + '@' : '') + e.host + t : t;
}
class Xg extends Error {
	constructor() {
		super(...arguments), (this.name = 'FetchError');
	}
}
function Gg(e, t, n) {
	let l = '';
	e && n && (l = `${n.status} ${n.statusText} (${e.toString()})`), t && (l = `${t.message} (${l})`);
	const a = new Xg(l);
	return (
		Object.defineProperty(a, 'request', {
			get() {
				return e;
			},
		}),
		Object.defineProperty(a, 'response', {
			get() {
				return n;
			},
		}),
		Object.defineProperty(a, 'data', {
			get() {
				return n && n._data;
			},
		}),
		Object.defineProperty(a, 'status', {
			get() {
				return n && n.status;
			},
		}),
		Object.defineProperty(a, 'statusText', {
			get() {
				return n && n.statusText;
			},
		}),
		Object.defineProperty(a, 'statusCode', {
			get() {
				return n && n.status;
			},
		}),
		Object.defineProperty(a, 'statusMessage', {
			get() {
				return n && n.statusText;
			},
		}),
		a
	);
}
const Zg = new Set(Object.freeze(['PATCH', 'POST', 'PUT', 'DELETE']));
function lu(e = 'GET') {
	return Zg.has(e.toUpperCase());
}
function Jg(e) {
	if (e === void 0) return !1;
	const t = typeof e;
	return t === 'string' || t === 'number' || t === 'boolean' || t === null
		? !0
		: t !== 'object'
		? !1
		: Array.isArray(e)
		? !0
		: (e.constructor && e.constructor.name === 'Object') || typeof e.toJSON == 'function';
}
const Qg = new Set(['image/svg', 'application/xml', 'application/xhtml', 'application/html']),
	ey = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function ty(e = '') {
	if (!e) return 'json';
	const t = e.split(';').shift();
	return ey.test(t) ? 'json' : Qg.has(t) || t.startsWith('text/') ? 'text' : 'blob';
}
const ny = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function yd(e) {
	const { fetch: t, Headers: n } = e;
	function l(i) {
		const s = (i.error && i.error.name === 'AbortError') || !1;
		if (i.options.retry !== !1 && !s) {
			const u = typeof i.options.retry == 'number' ? i.options.retry : lu(i.options.method) ? 0 : 1,
				c = (i.response && i.response.status) || 500;
			if (u > 0 && ny.has(c)) return a(i.request, { ...i.options, retry: u - 1 });
		}
		const r = Gg(i.request, i.error, i.response);
		throw (Error.captureStackTrace && Error.captureStackTrace(r, a), r);
	}
	const a = async function (s, r = {}) {
			const u = { request: s, options: { ...e.defaults, ...r }, response: void 0, error: void 0 };
			u.options.onRequest && (await u.options.onRequest(u)),
				typeof u.request == 'string' &&
					(u.options.baseURL && (u.request = Ug(u.request, u.options.baseURL)),
					(u.options.query || u.options.params) &&
						(u.request = Kg(u.request, { ...u.options.params, ...u.options.query })),
					u.options.body &&
						lu(u.options.method) &&
						Jg(u.options.body) &&
						((u.options.body = typeof u.options.body == 'string' ? u.options.body : JSON.stringify(u.options.body)),
						(u.options.headers = new n(u.options.headers)),
						u.options.headers.has('content-type') || u.options.headers.set('content-type', 'application/json'),
						u.options.headers.has('accept') || u.options.headers.set('accept', 'application/json'))),
				(u.response = await t(u.request, u.options).catch(
					async (f) => ((u.error = f), u.options.onRequestError && (await u.options.onRequestError(u)), l(u)),
				));
			const c =
				(u.options.parseResponse ? 'json' : u.options.responseType) || ty(u.response.headers.get('content-type') || '');
			if (c === 'json') {
				const f = await u.response.text(),
					d = u.options.parseResponse || xg;
				u.response._data = d(f);
			} else c === 'stream' ? (u.response._data = u.response.body) : (u.response._data = await u.response[c]());
			return (
				u.options.onResponse && (await u.options.onResponse(u)),
				u.response.status >= 400 && u.response.status < 600
					? (u.options.onResponseError && (await u.options.onResponseError(u)), l(u))
					: u.response
			);
		},
		o = function (s, r) {
			return a(s, r).then((u) => u._data);
		};
	return (o.raw = a), (o.native = t), (o.create = (i = {}) => yd({ ...e, defaults: { ...e.defaults, ...i } })), o;
}
const bd = (function () {
		if (typeof globalThis < 'u') return globalThis;
		if (typeof self < 'u') return self;
		if (typeof window < 'u') return window;
		if (typeof global < 'u') return global;
		throw new Error('unable to locate global object');
	})(),
	ly = bd.fetch || (() => Promise.reject(new Error('[ofetch] global.fetch is not supported!'))),
	ay = bd.Headers,
	oy = yd({ fetch: ly, Headers: ay }),
	iy = oy,
	sy = () => {
		var e;
		return ((e = window == null ? void 0 : window.__NUXT__) == null ? void 0 : e.config) || {};
	},
	ro = sy().app,
	ry = () => ro.baseURL,
	uy = () => ro.buildAssetsDir,
	cy = (...e) => pa(pd(), uy(), ...e),
	pd = (...e) => {
		const t = ro.cdnURL || ro.baseURL;
		return e.length ? pa(t, ...e) : t;
	};
(globalThis.__buildAssetsURL = cy), (globalThis.__publicAssetsURL = pd);
function Fi(e, t = {}, n) {
	for (const l in e) {
		const a = e[l],
			o = n ? `${n}:${l}` : l;
		typeof a == 'object' && a !== null ? Fi(a, t, o) : typeof a == 'function' && (t[o] = a);
	}
	return t;
}
function dy(e, t) {
	return e.reduce((n, l) => n.then(() => l.apply(void 0, t)), Promise.resolve());
}
function fy(e, t) {
	return Promise.all(e.map((n) => n.apply(void 0, t)));
}
function ri(e, t) {
	for (const n of e) n(t);
}
class vy {
	constructor() {
		(this._hooks = {}),
			(this._before = void 0),
			(this._after = void 0),
			(this._deprecatedMessages = void 0),
			(this._deprecatedHooks = {}),
			(this.hook = this.hook.bind(this)),
			(this.callHook = this.callHook.bind(this)),
			(this.callHookWith = this.callHookWith.bind(this));
	}
	hook(t, n, l = {}) {
		if (!t || typeof n != 'function') return () => {};
		const a = t;
		let o;
		for (; this._deprecatedHooks[t]; ) (o = this._deprecatedHooks[t]), (t = o.to);
		if (o && !l.allowDeprecated) {
			let i = o.message;
			i || (i = `${a} hook has been deprecated` + (o.to ? `, please use ${o.to}` : '')),
				this._deprecatedMessages || (this._deprecatedMessages = new Set()),
				this._deprecatedMessages.has(i) || (console.warn(i), this._deprecatedMessages.add(i));
		}
		return (
			(this._hooks[t] = this._hooks[t] || []),
			this._hooks[t].push(n),
			() => {
				n && (this.removeHook(t, n), (n = void 0));
			}
		);
	}
	hookOnce(t, n) {
		let l,
			a = (...o) => (typeof l == 'function' && l(), (l = void 0), (a = void 0), n(...o));
		return (l = this.hook(t, a)), l;
	}
	removeHook(t, n) {
		if (this._hooks[t]) {
			const l = this._hooks[t].indexOf(n);
			l !== -1 && this._hooks[t].splice(l, 1), this._hooks[t].length === 0 && delete this._hooks[t];
		}
	}
	deprecateHook(t, n) {
		this._deprecatedHooks[t] = typeof n == 'string' ? { to: n } : n;
		const l = this._hooks[t] || [];
		this._hooks[t] = void 0;
		for (const a of l) this.hook(t, a);
	}
	deprecateHooks(t) {
		Object.assign(this._deprecatedHooks, t);
		for (const n in t) this.deprecateHook(n, t[n]);
	}
	addHooks(t) {
		const n = Fi(t),
			l = Object.keys(n).map((a) => this.hook(a, n[a]));
		return () => {
			for (const a of l.splice(0, l.length)) a();
		};
	}
	removeHooks(t) {
		const n = Fi(t);
		for (const l in n) this.removeHook(l, n[l]);
	}
	callHook(t, ...n) {
		return this.callHookWith(dy, t, ...n);
	}
	callHookParallel(t, ...n) {
		return this.callHookWith(fy, t, ...n);
	}
	callHookWith(t, n, ...l) {
		const a = this._before || this._after ? { name: n, args: l, context: {} } : void 0;
		this._before && ri(this._before, a);
		const o = t(this._hooks[n] || [], l);
		return o instanceof Promise
			? o.finally(() => {
					this._after && a && ri(this._after, a);
			  })
			: (this._after && a && ri(this._after, a), o);
	}
	beforeEach(t) {
		return (
			(this._before = this._before || []),
			this._before.push(t),
			() => {
				const n = this._before.indexOf(t);
				n !== -1 && this._before.splice(n, 1);
			}
		);
	}
	afterEach(t) {
		return (
			(this._after = this._after || []),
			this._after.push(t),
			() => {
				const n = this._after.indexOf(t);
				n !== -1 && this._after.splice(n, 1);
			}
		);
	}
}
function _d() {
	return new vy();
}
function my() {
	let e,
		t = !1;
	const n = (l) => {
		if (e && e !== l) throw new Error('Context conflict');
	};
	return {
		use: () => {
			if (e === void 0) throw new Error('Context is not available');
			return e;
		},
		tryUse: () => e,
		set: (l, a) => {
			a || n(l), (e = l), (t = !0);
		},
		unset: () => {
			(e = void 0), (t = !1);
		},
		call: (l, a) => {
			n(l), (e = l);
			try {
				return a();
			} finally {
				t || (e = void 0);
			}
		},
		async callAsync(l, a) {
			e = l;
			const o = () => {
					e = l;
				},
				i = () => (e === l ? o : void 0);
			iu.add(i);
			try {
				const s = a();
				return t || (e = void 0), await s;
			} finally {
				iu.delete(i);
			}
		},
	};
}
function hy() {
	const e = {};
	return {
		get(t) {
			return e[t] || (e[t] = my()), e[t], e[t];
		},
	};
}
const uo =
		typeof globalThis < 'u'
			? globalThis
			: typeof self < 'u'
			? self
			: typeof global < 'u'
			? global
			: typeof window < 'u'
			? window
			: {},
	au = '__unctx__',
	gy = uo[au] || (uo[au] = hy()),
	yy = (e) => gy.get(e),
	ou = '__unctx_async_handlers__',
	iu = uo[ou] || (uo[ou] = new Set()),
	Cd = yy('nuxt-app'),
	by = '__nuxt_plugin';
function py(e) {
	let t = 0;
	const n = {
		provide: void 0,
		globalName: 'nuxt',
		payload: We({ data: {}, state: {}, _errors: {}, ...window.__NUXT__ }),
		static: { data: {} },
		isHydrating: !0,
		deferHydration() {
			if (!n.isHydrating) return () => {};
			t++;
			let o = !1;
			return () => {
				if (!o && ((o = !0), t--, t === 0)) return (n.isHydrating = !1), n.callHook('app:suspense:resolve');
			};
		},
		_asyncDataPromises: {},
		_asyncData: {},
		...e,
	};
	(n.hooks = _d()),
		(n.hook = n.hooks.hook),
		(n.callHook = n.hooks.callHook),
		(n.provide = (o, i) => {
			const s = '$' + o;
			Na(n, s, i), Na(n.vueApp.config.globalProperties, s, i);
		}),
		Na(n.vueApp, '$nuxt', n),
		Na(n.vueApp.config.globalProperties, '$nuxt', n);
	const l = We(n.payload.config),
		a = new Proxy(l, {
			get(o, i) {
				var s;
				return i === 'public' ? o.public : (s = o[i]) != null ? s : o.public[i];
			},
			set(o, i, s) {
				return i === 'public' || i === 'app' ? !1 : ((o[i] = s), (o.public[i] = s), !0);
			},
		});
	return n.provide('config', a), n;
}
async function _y(e, t) {
	if (typeof t != 'function') return;
	const { provide: n } = (await Ql(e, t, [e])) || {};
	if (n && typeof n == 'object') for (const l in n) e.provide(l, n[l]);
}
async function Cy(e, t) {
	for (const n of t) await _y(e, n);
}
function Sy(e) {
	return e.map((n) => (typeof n != 'function' ? null : n.length > 1 ? (l) => n(l, l.provide) : n)).filter(Boolean);
}
function Ca(e) {
	return (e[by] = !0), e;
}
function Ql(e, t, n) {
	const l = () => (n ? t(...n) : t());
	return Cd.set(e), l();
}
function st() {
	const e = Cd.tryUse();
	if (!e) {
		const t = kn();
		if (!t) throw new Error('nuxt instance unavailable');
		return t.appContext.app.$nuxt;
	}
	return e;
}
function Hi() {
	return st().$config;
}
function Na(e, t, n) {
	Object.defineProperty(e, t, { get: () => n });
}
class Ni extends Error {
	constructor() {
		super(...arguments),
			(this.statusCode = 500),
			(this.fatal = !1),
			(this.unhandled = !1),
			(this.statusMessage = void 0);
	}
	toJSON() {
		const t = { message: this.message, statusCode: this.statusCode };
		return (
			this.statusMessage && (t.statusMessage = this.statusMessage), this.data !== void 0 && (t.data = this.data), t
		);
	}
}
Ni.__h3_error__ = !0;
function wy(e) {
	var n;
	if (typeof e == 'string') return new Ni(e);
	if (ky(e)) return e;
	const t = new Ni((n = e.message) != null ? n : e.statusMessage, e.cause ? { cause: e.cause } : void 0);
	if ('stack' in e)
		try {
			Object.defineProperty(t, 'stack', {
				get() {
					return e.stack;
				},
			});
		} catch {
			try {
				t.stack = e.stack;
			} catch {}
		}
	return (
		e.data && (t.data = e.data),
		e.statusCode ? (t.statusCode = e.statusCode) : e.status && (t.statusCode = e.status),
		e.statusMessage ? (t.statusMessage = e.statusMessage) : e.statusText && (t.statusMessage = e.statusText),
		e.fatal !== void 0 && (t.fatal = e.fatal),
		e.unhandled !== void 0 && (t.unhandled = e.unhandled),
		t
	);
}
function ky(e) {
	var t;
	return ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.__h3_error__) === !0;
}
const Rs = () => N(st().payload, 'error'),
	xy = (e) => {
		const t = Ly(e);
		try {
			st().callHook('app:error', t);
			const l = Rs();
			l.value = l.value || t;
		} catch {
			throw t;
		}
		return t;
	},
	$y = async (e = {}) => {
		const t = st(),
			n = Rs();
		t.callHook('app:error:cleared', e), e.redirect && (await t.$router.replace(e.redirect)), (n.value = null);
	},
	Vy = (e) => !!(e && typeof e == 'object' && '__nuxt_error' in e),
	Ly = (e) => {
		const t = wy(e);
		return (t.__nuxt_error = !0), t;
	};
function Iy(...e) {
	const t = typeof e[e.length - 1] == 'string' ? e.pop() : void 0;
	typeof e[0] != 'string' && e.unshift(t);
	const [n, l] = e;
	if (!n || typeof n != 'string') throw new TypeError('[nuxt] [useState] key must be a string: ' + n);
	if (l !== void 0 && typeof l != 'function') throw new Error('[nuxt] [useState] init must be a function: ' + l);
	const a = '$s' + n,
		o = st(),
		i = N(o.payload.state, a);
	if (i.value === void 0 && l) {
		const s = l();
		if (Le(s)) return (o.payload.state[a] = s), s;
		i.value = s;
	}
	return i;
}
const Ro = () => {
		var e;
		return (e = st()) == null ? void 0 : e.$router;
	},
	Ey = () => (kn() ? we('_route', st()._route) : st()._route),
	Ty = () => {
		try {
			if (st()._processingMiddleware) return !0;
		} catch {
			return !0;
		}
		return !1;
	},
	Sd = (e, t) => {
		e || (e = '/');
		const n = typeof e == 'string' ? e : e.path || '/',
			l = Oo(n, !0);
		if (l && !(t != null && t.external))
			throw new Error(
				'Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.',
			);
		if (l && _a(n).protocol === 'script:') throw new Error('Cannot navigate to an URL with script protocol.');
		if (!l && Ty()) return e;
		const a = Ro();
		return l
			? (t != null && t.replace ? location.replace(n) : (location.href = n), Promise.resolve())
			: t != null && t.replace
			? a.replace(e)
			: a.push(e);
	};
async function wd(e, t = Ro()) {
	if ((t._routePreloaded || (t._routePreloaded = new Set()), t._routePreloaded.has(e))) return;
	t._routePreloaded.add(e);
	const n = (t._preloadPromises = t._preloadPromises || []);
	if (n.length > 4) return Promise.all(n).then(() => wd(e, t));
	const l = t
		.resolve(e)
		.matched.map((a) => {
			var o;
			return (o = a.components) == null ? void 0 : o.default;
		})
		.filter((a) => typeof a == 'function');
	for (const a of l) {
		const o = Promise.resolve(a())
			.catch(() => {})
			.finally(() => n.splice(n.indexOf(o)));
		n.push(o);
	}
	await Promise.all(n);
}
const Ay = 'modulepreload',
	Py = function (e, t) {
		return e.startsWith('.') ? new URL(e, t).href : e;
	},
	su = {},
	kd = function (t, n, l) {
		if (!n || n.length === 0) return t();
		const a = document.getElementsByTagName('link');
		return Promise.all(
			n.map((o) => {
				if (((o = Py(o, l)), o in su)) return;
				su[o] = !0;
				const i = o.endsWith('.css'),
					s = i ? '[rel="stylesheet"]' : '';
				if (!!l)
					for (let c = a.length - 1; c >= 0; c--) {
						const f = a[c];
						if (f.href === o && (!i || f.rel === 'stylesheet')) return;
					}
				else if (document.querySelector(`link[href="${o}"]${s}`)) return;
				const u = document.createElement('link');
				if (
					((u.rel = i ? 'stylesheet' : Ay),
					i || ((u.as = 'script'), (u.crossOrigin = '')),
					(u.href = o),
					document.head.appendChild(u),
					i)
				)
					return new Promise((c, f) => {
						u.addEventListener('load', c),
							u.addEventListener('error', () => f(new Error(`Unable to preload CSS for ${o}`)));
					});
			}),
		).then(() => t());
	};
function ru(e, t = {}) {
	const n = By(e, t),
		l = st(),
		a = (l._payloadCache = l._payloadCache || {});
	return a[e] || (a[e] = Oy(n).then((o) => o || (delete a[e], null))), a[e];
}
function By(e, t = {}) {
	const n = new URL(e, 'http://localhost');
	if (n.search) throw new Error('Payload URL cannot contain search params: ' + e);
	if (n.host !== 'localhost') throw new Error('Payload URL cannot contain host: ' + e);
	const l = t.hash || (t.fresh ? Date.now() : '');
	return pa(Hi().app.baseURL, n.pathname, l ? `_payload.${l}.js` : '_payload.js');
}
async function Oy(e) {
	const t = await kd(() => import(e), [], import.meta.url).catch((n) => {
		console.warn('[nuxt] Cannot load payload ', e, n);
	});
	return (t == null ? void 0 : t.default) || null;
}
function Ry() {
	return !!st().payload.prerenderedAt;
}
const My = (...e) => e.find((t) => t !== void 0),
	Fy = 'noopener noreferrer',
	Hy =
		globalThis.requestIdleCallback ||
		((e) => {
			const t = Date.now(),
				n = { didTimeout: !1, timeRemaining: () => Math.max(0, 50 - (Date.now() - t)) };
			return setTimeout(() => {
				e(n);
			}, 1);
		}),
	Ny =
		globalThis.cancelIdleCallback ||
		((e) => {
			clearTimeout(e);
		});
function Dy(e) {
	const t = e.componentName || 'NuxtLink';
	return Eo({
		name: t,
		props: {
			to: { type: [String, Object], default: void 0, required: !1 },
			href: { type: [String, Object], default: void 0, required: !1 },
			target: { type: String, default: void 0, required: !1 },
			rel: { type: String, default: void 0, required: !1 },
			noRel: { type: Boolean, default: void 0, required: !1 },
			prefetch: { type: Boolean, default: void 0, required: !1 },
			noPrefetch: { type: Boolean, default: void 0, required: !1 },
			activeClass: { type: String, default: void 0, required: !1 },
			exactActiveClass: { type: String, default: void 0, required: !1 },
			prefetchedClass: { type: String, default: void 0, required: !1 },
			replace: { type: Boolean, default: void 0, required: !1 },
			ariaCurrentValue: { type: String, default: void 0, required: !1 },
			external: { type: Boolean, default: void 0, required: !1 },
			custom: { type: Boolean, default: void 0, required: !1 },
		},
		setup(n, { slots: l }) {
			const a = Ro(),
				o = C(() => n.to || n.href || ''),
				i = C(() =>
					n.external || (n.target && n.target !== '_self')
						? !0
						: typeof o.value == 'object'
						? !1
						: o.value === '' || Oo(o.value, !0),
				),
				s = R(!1),
				r = R(null);
			if (n.prefetch !== !1 && n.noPrefetch !== !0 && typeof o.value == 'string' && n.target !== '_blank' && !zy()) {
				const c = st(),
					f = jy();
				let d,
					v = null;
				lt(() => {
					d = Hy(() => {
						var h;
						(h = r == null ? void 0 : r.value) != null &&
							h.tagName &&
							(v = f.observe(r.value, async () => {
								v == null || v(),
									(v = null),
									await Promise.all([
										c.hooks.callHook('link:prefetch', o.value).catch(() => {}),
										!i.value && wd(o.value, a).catch(() => {}),
									]),
									(s.value = !0);
							}));
					});
				}),
					Je(() => {
						d && Ny(d), v == null || v(), (v = null);
					});
			}
			return () => {
				var v, h, y;
				if (!i.value)
					return Rt(
						at('RouterLink'),
						{
							ref: (V) => {
								r.value = V == null ? void 0 : V.$el;
							},
							to: o.value,
							...(s.value && !n.custom ? { class: n.prefetchedClass || e.prefetchedClass } : {}),
							activeClass: n.activeClass || e.activeClass,
							exactActiveClass: n.exactActiveClass || e.exactActiveClass,
							replace: n.replace,
							ariaCurrentValue: n.ariaCurrentValue,
							custom: n.custom,
						},
						l.default,
					);
				const u =
						typeof o.value == 'object'
							? (h = (v = a.resolve(o.value)) == null ? void 0 : v.href) != null
								? h
								: null
							: o.value || null,
					c = n.target || null,
					f = n.noRel ? null : My(n.rel, e.externalRelAttribute, u ? Fy : '') || null,
					d = () => Sd(u, { replace: n.replace });
				return n.custom
					? l.default
						? l.default({
								href: u,
								navigate: d,
								route: a.resolve(u),
								rel: f,
								target: c,
								isExternal: i.value,
								isActive: !1,
								isExactActive: !1,
						  })
						: null
					: Rt('a', { ref: r, href: u, rel: f, target: c }, (y = l.default) == null ? void 0 : y.call(l));
			};
		},
	});
}
const nS = Dy({ componentName: 'NuxtLink' });
function jy() {
	const e = st();
	if (e._observer) return e._observer;
	let t = null;
	const n = new Map(),
		l = (o, i) => (
			t ||
				(t = new IntersectionObserver((s) => {
					for (const r of s) {
						const u = n.get(r.target);
						(r.isIntersecting || r.intersectionRatio > 0) && u && u();
					}
				})),
			n.set(o, i),
			t.observe(o),
			() => {
				n.delete(o), t.unobserve(o), n.size === 0 && (t.disconnect(), (t = null));
			}
		);
	return (e._observer = { observe: l });
}
function zy() {
	const e = navigator.connection;
	return !!(e && (e.saveData || /2g/.test(e.effectiveType)));
}
function ui(e) {
	return e !== null && typeof e == 'object';
}
function Di(e, t, n = '.', l) {
	if (!ui(t)) return Di(e, {}, n, l);
	const a = Object.assign({}, t);
	for (const o in e) {
		if (o === '__proto__' || o === 'constructor') continue;
		const i = e[o];
		i != null &&
			((l && l(a, o, i, n)) ||
				(Array.isArray(i) && Array.isArray(a[o])
					? (a[o] = [...i, ...a[o]])
					: ui(i) && ui(a[o])
					? (a[o] = Di(i, a[o], (n ? `${n}.` : '') + o.toString(), l))
					: (a[o] = i)));
	}
	return a;
}
function Uy(e) {
	return (...t) => t.reduce((n, l) => Di(n, l, '', e), {});
}
const Wy = Uy((e, t, n, l) => {
		if (typeof e[t] < 'u' && typeof n == 'function') return (e[t] = n(e[t])), !0;
	}),
	Ky = {};
Wy(Ky);
const ci = {},
	qy = Ca((e) => {
		for (const t in ci) e.vueApp.component(t, ci[t]), e.vueApp.component('Lazy' + t, ci[t]);
	}),
	Yy = ['script', 'style', 'noscript'],
	Xy = ['base', 'meta', 'link', 'style', 'script', 'noscript'],
	Gy = ['base', 'title', 'titleTemplate', 'bodyAttrs', 'htmlAttrs'];
function Zy(e, t) {
	const { props: n, tag: l } = e;
	if (Gy.includes(l)) return l;
	if (l === 'link' && n.rel === 'canonical') return 'canonical';
	if (n.charset) return 'charset';
	const a = ['id'];
	l === 'meta' && a.push('name', 'property', 'http-equiv');
	for (const o of a)
		if (typeof n[o] < 'u') {
			const i = String(n[o]);
			return t && !t(i) ? !1 : `${l}:${o}:${i}`;
		}
	return !1;
}
const Da = (e, t) => {
	const { tag: n, $el: l } = e;
	!l ||
		(Object.entries(n.props).forEach(([a, o]) => {
			o = String(o);
			const i = `attr:${a}`;
			if (a === 'class') {
				if (!o) return;
				for (const s of o.split(' ')) {
					const r = `${i}:${s}`;
					t && t(e, r, () => l.classList.remove(s)), l.classList.contains(s) || l.classList.add(s);
				}
				return;
			}
			t && !a.startsWith('data-h-') && t(e, i, () => l.removeAttribute(a)),
				l.getAttribute(a) !== o && l.setAttribute(a, o);
		}),
		Yy.includes(n.tag) && l.innerHTML !== (n.children || '') && (l.innerHTML = n.children || ''));
};
function Ms(e) {
	let t = 9;
	for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
	return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function xd(e, t = {}) {
	var c, f;
	const n = { shouldRender: !0 };
	if ((await e.hooks.callHook('dom:beforeRender', n), !n.shouldRender)) return;
	const l = t.document || window.document,
		a = e._popSideEffectQueue();
	e.headEntries()
		.map((d) => d._sde)
		.forEach((d) => {
			Object.entries(d).forEach(([v, h]) => {
				a[v] = h;
			});
		});
	const o = async (d) => {
			const v = e.headEntries().find((y) => y._i === d._e),
				h = {
					renderId: d._d || Ms(JSON.stringify({ ...d, _e: void 0, _p: void 0 })),
					$el: null,
					shouldRender: !0,
					tag: d,
					entry: v,
					staleSideEffects: a,
				};
			return await e.hooks.callHook('dom:beforeRenderTag', h), h;
		},
		i = [],
		s = { body: [], head: [] },
		r = (d, v, h) => {
			(v = `${d.renderId}:${v}`), d.entry && (d.entry._sde[v] = h), delete a[v];
		},
		u = (d) => {
			(e._elMap[d.renderId] = d.$el),
				i.push(d),
				r(d, 'el', () => {
					var v;
					(v = d.$el) == null || v.remove(), delete e._elMap[d.renderId];
				});
		};
	for (const d of await e.resolveTags()) {
		const v = await o(d);
		if (!v.shouldRender) continue;
		const { tag: h } = v;
		if (h.tag === 'title') {
			(l.title = h.children || ''), i.push(v);
			continue;
		}
		if (h.tag === 'htmlAttrs' || h.tag === 'bodyAttrs') {
			(v.$el = l[h.tag === 'htmlAttrs' ? 'documentElement' : 'body']), Da(v, r), i.push(v);
			continue;
		}
		if (
			((v.$el = e._elMap[v.renderId]),
			!v.$el &&
				h._hash &&
				(v.$el = l.querySelector(
					`${(c = h.tagPosition) != null && c.startsWith('body') ? 'body' : 'head'} > ${h.tag}[data-h-${h._hash}]`,
				)),
			v.$el)
		) {
			v.tag._d && Da(v), u(v);
			continue;
		}
		(v.$el = l.createElement(h.tag)),
			Da(v),
			s[(f = h.tagPosition) != null && f.startsWith('body') ? 'body' : 'head'].push(v);
	}
	Object.entries(s).forEach(([d, v]) => {
		if (!!v.length) {
			for (const h of [...l[d].children].reverse()) {
				const y = h.tagName.toLowerCase();
				if (!Xy.includes(y)) continue;
				const V = Zy({ tag: y, props: h.getAttributeNames().reduce((b, g) => ({ ...b, [g]: h.getAttribute(g) }), {}) }),
					p = v.findIndex((b) => b && (b.tag._d === V || h.isEqualNode(b.$el)));
				if (p !== -1) {
					const b = v[p];
					(b.$el = h), Da(b), u(b), delete v[p];
				}
			}
			v.forEach((h) => {
				if (!!h.$el) {
					switch (h.tag.tagPosition) {
						case 'bodyClose':
							l.body.appendChild(h.$el);
							break;
						case 'bodyOpen':
							l.body.insertBefore(h.$el, l.body.firstChild);
							break;
						case 'head':
						default:
							l.head.appendChild(h.$el);
							break;
					}
					u(h);
				}
			});
		}
	});
	for (const d of i) await e.hooks.callHook('dom:renderTag', d);
	Object.values(a).forEach((d) => d());
}
let Za = null;
async function Jy(e, t = {}) {
	function n() {
		return (Za = null), xd(e, t);
	}
	const l = t.delayFn || ((a) => setTimeout(a, 10));
	return (Za = Za || new Promise((a) => l(() => a(n()))));
}
const Qy = {
		__proto__: null,
		debouncedRenderDOMHead: Jy,
		get domUpdatePromise() {
			return Za;
		},
		hashCode: Ms,
		renderDOMHead: xd,
	},
	eb = ['title', 'titleTemplate', 'base', 'htmlAttrs', 'bodyAttrs', 'meta', 'link', 'style', 'script', 'noscript'],
	tb = ['tagPosition', 'tagPriority', 'tagDuplicateStrategy'];
async function nb(e, t) {
	const n = { tag: e, props: {} };
	return e === 'title' || e === 'titleTemplate'
		? ((n.children = t instanceof Promise ? await t : t), n)
		: ((n.props = await lb({ ...t })),
		  ['children', 'innerHtml', 'innerHTML'].forEach((l) => {
				typeof n.props[l] < 'u' &&
					((n.children = n.props[l]),
					typeof n.children == 'object' && (n.children = JSON.stringify(n.children)),
					delete n.props[l]);
		  }),
		  Object.keys(n.props)
				.filter((l) => tb.includes(l))
				.forEach((l) => {
					(n[l] = n.props[l]), delete n.props[l];
				}),
		  typeof n.props.class == 'object' &&
				!Array.isArray(n.props.class) &&
				(n.props.class = Object.keys(n.props.class).filter((l) => n.props.class[l])),
		  Array.isArray(n.props.class) && (n.props.class = n.props.class.join(' ')),
		  n.props.content && Array.isArray(n.props.content)
				? n.props.content.map((l, a) => {
						const o = { ...n, props: { ...n.props } };
						return (o.props.content = l), (o.key = `${n.props.name || n.props.property}:${a}`), o;
				  })
				: n);
}
async function lb(e) {
	for (const t of Object.keys(e))
		e[t] instanceof Promise && (e[t] = await e[t]),
			String(e[t]) === 'true' ? (e[t] = '') : String(e[t]) === 'false' && delete e[t];
	return e;
}
const uu = (e) => {
		if (typeof e.tagPriority == 'number') return e.tagPriority;
		switch (e.tagPriority) {
			case 'critical':
				return 2;
			case 'high':
				return 9;
			case 'low':
				return 12;
		}
		switch (e.tag) {
			case 'base':
				return -1;
			case 'title':
				return 1;
			case 'meta':
				return e.props.charset ? -2 : e.props['http-equiv'] === 'content-security-policy' ? 0 : 10;
			default:
				return 10;
		}
	},
	ab = (e, t) => uu(e) - uu(t),
	ob = ['base', 'title', 'titleTemplate', 'bodyAttrs', 'htmlAttrs'];
function ib(e, t) {
	const { props: n, tag: l } = e;
	if (ob.includes(l)) return l;
	if (l === 'link' && n.rel === 'canonical') return 'canonical';
	if (n.charset) return 'charset';
	const a = ['id'];
	l === 'meta' && a.push('name', 'property', 'http-equiv');
	for (const o of a)
		if (typeof n[o] < 'u') {
			const i = String(n[o]);
			return t && !t(i) ? !1 : `${l}:${o}:${i}`;
		}
	return !1;
}
const cu = (e, t) => (e == null ? t || null : typeof e == 'function' ? e(t) : e.replace('%s', t != null ? t : ''));
function sb(e) {
	let t = e.findIndex((l) => l.tag === 'titleTemplate');
	const n = e.findIndex((l) => l.tag === 'title');
	if (n !== -1 && t !== -1) {
		const l = cu(e[t].children, e[n].children);
		l !== null ? (e[n].children = l || e[n].children) : delete e[n];
	} else if (t !== -1) {
		const l = cu(e[t].children);
		l !== null && ((e[t].children = l), (e[t].tag = 'title'), (t = -1));
	}
	return t !== -1 && delete e[t], e.filter(Boolean);
}
const rb = (e) => {
		e = e || {};
		const t = e.dedupeKeys || ['hid', 'vmid', 'key'];
		return {
			hooks: {
				'tag:normalise': function ({ tag: n }) {
					t.forEach((a) => {
						n.props[a] && ((n.key = n.props[a]), delete n.props[a]);
					});
					const l = n.key ? `${n.tag}:${n.key}` : ib(n);
					l && (n._d = l);
				},
				'tags:resolve': function (n) {
					const l = {};
					n.tags.forEach((a) => {
						let o = a._d || a._p;
						const i = l[o];
						if (i) {
							let s = a == null ? void 0 : a.tagDuplicateStrategy;
							if ((!s && (a.tag === 'htmlAttrs' || a.tag === 'bodyAttrs') && (s = 'merge'), s === 'merge')) {
								const u = i.props;
								['class', 'style'].forEach((c) => {
									a.props[c] &&
										u[c] &&
										(c === 'style' && !u[c].endsWith(';') && (u[c] += ';'), (a.props[c] = `${u[c]} ${a.props[c]}`));
								}),
									(l[o].props = { ...u, ...a.props });
								return;
							} else a._e === i._e && (o = a._d = `${o}:${a._p}`);
							const r = Object.keys(a.props).length;
							if ((r === 0 || (r === 1 && typeof a.props['data-h-key'] < 'u')) && !a.children) {
								delete l[o];
								return;
							}
						}
						l[o] = a;
					}),
						(n.tags = Object.values(l));
				},
			},
		};
	},
	ub = () => ({
		hooks: {
			'tags:resolve': (e) => {
				const t = (n) => {
					var l;
					return (l = e.tags.find((a) => a._d === n)) == null ? void 0 : l._p;
				};
				for (const n of e.tags) {
					if (!n.tagPriority || typeof n.tagPriority == 'number') continue;
					const l = [
						{ prefix: 'before:', offset: -1 },
						{ prefix: 'after:', offset: 1 },
					];
					for (const { prefix: a, offset: o } of l)
						if (n.tagPriority.startsWith(a)) {
							const i = n.tagPriority.replace(a, ''),
								s = t(i);
							typeof s < 'u' && (n._p = s + o);
						}
				}
				e.tags.sort((n, l) => n._p - l._p).sort(ab);
			},
		},
	}),
	cb = () => ({
		hooks: {
			'tags:resolve': (e) => {
				e.tags = sb(e.tags);
			},
		},
	}),
	db = () => ({
		hooks: {
			'tag:normalise': function ({ tag: e }) {
				typeof e.props.body < 'u' && ((e.tagPosition = 'bodyClose'), delete e.props.body);
			},
		},
	}),
	fb = typeof window < 'u',
	vb = () => ({
		hooks: {
			'tag:normalise': (e) => {
				var a, o;
				const { tag: t, entry: n } = e,
					l = typeof t.props._dynamic < 'u';
				!$d.includes(t.tag) ||
					!t.key ||
					((t._hash = Ms(JSON.stringify({ tag: t.tag, key: t.key }))),
					!(fb || ((o = (a = Ld()) == null ? void 0 : a.resolvedOptions) == null ? void 0 : o.document)) &&
						(n._m === 'server' || l) &&
						(t.props[`data-h-${t._hash}`] = ''));
			},
			'tags:resolve': (e) => {
				e.tags = e.tags.map((t) => (delete t.props._dynamic, t));
			},
		},
	}),
	mb = (e) => ({
		hooks: {
			'entries:updated': function (t) {
				if (typeof (e == null ? void 0 : e.document) > 'u' && typeof window > 'u') return;
				let n = e == null ? void 0 : e.delayFn;
				!n && typeof requestAnimationFrame < 'u' && (n = requestAnimationFrame),
					Promise.resolve()
						.then(function () {
							return Qy;
						})
						.then(({ debouncedRenderDOMHead: l }) => {
							l(t, { document: (e == null ? void 0 : e.document) || window.document, delayFn: n });
						});
			},
		},
	}),
	hb = () => {
		const e = (t, n) => {
			const l = {},
				a = {};
			Object.entries(n.props).forEach(([i, s]) => {
				i.startsWith('on') && typeof s == 'function' ? (a[i] = s) : (l[i] = s);
			});
			let o;
			return (
				t === 'dom' &&
					n.tag === 'script' &&
					typeof l.src == 'string' &&
					typeof a.onload < 'u' &&
					((o = l.src), delete l.src),
				{ props: l, eventHandlers: a, delayedSrc: o }
			);
		};
		return {
			hooks: {
				'ssr:render': function (t) {
					t.tags = t.tags.map((n) => ((n.props = e('ssr', n).props), n));
				},
				'dom:beforeRenderTag': function (t) {
					const { props: n, eventHandlers: l, delayedSrc: a } = e('dom', t.tag);
					!Object.keys(l).length || ((t.tag.props = n), (t.tag._eventHandlers = l), (t.tag._delayedSrc = a));
				},
				'dom:renderTag': function (t) {
					const n = t.$el;
					if (!t.tag._eventHandlers || !n) return;
					const l = t.tag.tag === 'bodyAttrs' && typeof window < 'u' ? window : n;
					Object.entries(t.tag._eventHandlers).forEach(([a, o]) => {
						const i = `${t.tag._d || t.tag._p}:${a}`,
							s = a.slice(2).toLowerCase(),
							r = `data-h-${s}`;
						if ((delete t.staleSideEffects[i], n.hasAttribute(r))) return;
						const u = o;
						n.setAttribute(r, ''),
							l.addEventListener(s, u),
							t.entry &&
								(t.entry._sde[i] = () => {
									l.removeEventListener(s, u), n.removeAttribute(r);
								});
					}),
						t.tag._delayedSrc && n.setAttribute('src', t.tag._delayedSrc);
				},
			},
		};
	};
function gb(e) {
	return Array.isArray(e) ? e : [e];
}
const $d = ['base', 'meta', 'link', 'style', 'script', 'noscript'];
let Vd;
const yb = (e) => (Vd = e),
	Ld = () => Vd,
	bb = 10;
async function pb(e) {
	const t = [];
	return (
		Object.entries(e.resolvedInput || e.input)
			.filter(([n, l]) => typeof l < 'u' && eb.includes(n))
			.forEach(([n, l]) => {
				const a = gb(l);
				t.push(...a.map((o) => nb(n, o)).flat());
			}),
		(await Promise.all(t)).flat().map((n, l) => ((n._e = e._i), (n._p = (e._i << bb) + l), n))
	);
}
const _b = () => [rb(), ub(), cb(), vb(), hb(), db()],
	Cb = (e = {}) => [mb({ document: e == null ? void 0 : e.document, delayFn: e == null ? void 0 : e.domDelayFn })];
function Sb(e = {}) {
	const t = wb({ ...e, plugins: [...Cb(e), ...((e == null ? void 0 : e.plugins) || [])] });
	return yb(t), t;
}
function wb(e = {}) {
	let t = [],
		n = {},
		l = 0;
	const a = _d();
	e != null && e.hooks && a.addHooks(e.hooks),
		(e.plugins = [..._b(), ...((e == null ? void 0 : e.plugins) || [])]),
		e.plugins.forEach((s) => s.hooks && a.addHooks(s.hooks));
	const o = () => a.callHook('entries:updated', i),
		i = {
			resolvedOptions: e,
			headEntries() {
				return t;
			},
			get hooks() {
				return a;
			},
			use(s) {
				s.hooks && a.addHooks(s.hooks);
			},
			push(s, r) {
				const u = { _i: l++, input: s, _sde: {} };
				return (
					r != null && r.mode && (u._m = r == null ? void 0 : r.mode),
					t.push(u),
					o(),
					{
						dispose() {
							t = t.filter((c) => (c._i !== u._i ? !0 : ((n = { ...n, ...(c._sde || {}) }), (c._sde = {}), o(), !1)));
						},
						patch(c) {
							t = t.map((f) => (f._i === u._i && ((u.input = f.input = c), o()), f));
						},
					}
				);
			},
			async resolveTags() {
				const s = { tags: [], entries: [...t] };
				await a.callHook('entries:resolve', s);
				for (const r of s.entries)
					for (const u of await pb(r)) {
						const c = { tag: u, entry: r };
						await a.callHook('tag:normalise', c), s.tags.push(c.tag);
					}
				return await a.callHook('tags:resolve', s), s.tags;
			},
			_elMap: {},
			_popSideEffectQueue() {
				const s = { ...n };
				return (n = {}), s;
			},
		};
	return i.hooks.callHook('init', i), i;
}
function kb(e) {
	return typeof e == 'function' ? e() : Ge(e);
}
function co(e, t = '') {
	if (e instanceof Promise) return e;
	const n = kb(e);
	if (!e || !n) return n;
	if (Array.isArray(n)) return n.map((l) => co(l, t));
	if (typeof n == 'object') {
		let l = !1;
		const a = Object.fromEntries(
			Object.entries(n).map(([o, i]) =>
				o === 'titleTemplate' || o.startsWith('on')
					? [o, Ge(i)]
					: ((typeof i == 'function' || Le(i)) && (l = !0), [o, co(i, o)]),
			),
		);
		return l && $d.includes(String(t)) && (a._dynamic = !0), a;
	}
	return n;
}
const xb = Os.startsWith('3'),
	$b = typeof window < 'u',
	Id = 'usehead';
function Fs() {
	return (kn() && we(Id)) || Ld();
}
function Vb(e = {}) {
	const t = Sb({
			...e,
			domDelayFn: (l) => setTimeout(() => Te(() => l()), 10),
			plugins: [Lb(), ...((e == null ? void 0 : e.plugins) || [])],
		}),
		n = {
			install(l) {
				xb && ((l.config.globalProperties.$unhead = t), l.provide(Id, t));
			},
		};
	return (t.install = n.install), t;
}
const Lb = () => ({
	hooks: {
		'entries:resolve': function (e) {
			for (const t of e.entries) t.resolvedInput = co(t.input);
		},
	},
});
function Ib(e, t = {}) {
	const n = Fs(),
		l = R({});
	Mt(() => {
		l.value = co(e);
	});
	const a = n.push(l.value, t);
	return (
		ae(l, (i) => a.patch(i)),
		kn() &&
			Je(() => {
				a.dispose();
			}),
		a
	);
}
function Eb(e, t = {}) {
	return Fs().push(e, t);
}
function Ed(e, t = {}) {
	var l;
	const n = Fs();
	if (n) {
		const a = $b || !!((l = n.resolvedOptions) != null && l.document);
		return (t.mode === 'server' && a) || (t.mode === 'client' && !a) ? void 0 : a ? Ib(e, t) : Eb(e, t);
	}
}
const Tb = ['script', 'style', 'noscript'],
	Ab = ['base', 'meta', 'link', 'style', 'script', 'noscript'],
	Pb = ['base', 'title', 'titleTemplate', 'bodyAttrs', 'htmlAttrs'];
function Bb(e, t) {
	const { props: n, tag: l } = e;
	if (Pb.includes(l)) return l;
	if (l === 'link' && n.rel === 'canonical') return 'canonical';
	if (n.charset) return 'charset';
	const a = ['id'];
	l === 'meta' && a.push('name', 'property', 'http-equiv');
	for (const o of a)
		if (typeof n[o] < 'u') {
			const i = String(n[o]);
			return t && !t(i) ? !1 : `${l}:${o}:${i}`;
		}
	return !1;
}
const ja = (e, t) => {
	const { tag: n, $el: l } = e;
	!l ||
		(Object.entries(n.props).forEach(([a, o]) => {
			o = String(o);
			const i = `attr:${a}`;
			if (a === 'class') {
				if (!o) return;
				for (const s of o.split(' ')) {
					const r = `${i}:${s}`;
					t && t(e, r, () => l.classList.remove(s)), l.classList.contains(s) || l.classList.add(s);
				}
				return;
			}
			t && !a.startsWith('data-h-') && t(e, i, () => l.removeAttribute(a)),
				l.getAttribute(a) !== o && l.setAttribute(a, o);
		}),
		Tb.includes(n.tag) && l.innerHTML !== (n.children || '') && (l.innerHTML = n.children || ''));
};
function Ob(e) {
	let t = 9;
	for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
	return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
async function Td(e, t = {}) {
	var c, f;
	const n = { shouldRender: !0 };
	if ((await e.hooks.callHook('dom:beforeRender', n), !n.shouldRender)) return;
	const l = t.document || window.document,
		a = e._popSideEffectQueue();
	e.headEntries()
		.map((d) => d._sde)
		.forEach((d) => {
			Object.entries(d).forEach(([v, h]) => {
				a[v] = h;
			});
		});
	const o = async (d) => {
			const v = e.headEntries().find((y) => y._i === d._e),
				h = {
					renderId: d._d || Ob(JSON.stringify({ ...d, _e: void 0, _p: void 0 })),
					$el: null,
					shouldRender: !0,
					tag: d,
					entry: v,
					staleSideEffects: a,
				};
			return await e.hooks.callHook('dom:beforeRenderTag', h), h;
		},
		i = [],
		s = { body: [], head: [] },
		r = (d, v, h) => {
			(v = `${d.renderId}:${v}`), d.entry && (d.entry._sde[v] = h), delete a[v];
		},
		u = (d) => {
			(e._elMap[d.renderId] = d.$el),
				i.push(d),
				r(d, 'el', () => {
					var v;
					(v = d.$el) == null || v.remove(), delete e._elMap[d.renderId];
				});
		};
	for (const d of await e.resolveTags()) {
		const v = await o(d);
		if (!v.shouldRender) continue;
		const { tag: h } = v;
		if (h.tag === 'title') {
			(l.title = h.children || ''), i.push(v);
			continue;
		}
		if (h.tag === 'htmlAttrs' || h.tag === 'bodyAttrs') {
			(v.$el = l[h.tag === 'htmlAttrs' ? 'documentElement' : 'body']), ja(v, r), i.push(v);
			continue;
		}
		if (
			((v.$el = e._elMap[v.renderId]),
			!v.$el &&
				h._hash &&
				(v.$el = l.querySelector(
					`${(c = h.tagPosition) != null && c.startsWith('body') ? 'body' : 'head'} > ${h.tag}[data-h-${h._hash}]`,
				)),
			v.$el)
		) {
			v.tag._d && ja(v), u(v);
			continue;
		}
		(v.$el = l.createElement(h.tag)),
			ja(v),
			s[(f = h.tagPosition) != null && f.startsWith('body') ? 'body' : 'head'].push(v);
	}
	Object.entries(s).forEach(([d, v]) => {
		if (!!v.length) {
			for (const h of [...l[d].children].reverse()) {
				const y = h.tagName.toLowerCase();
				if (!Ab.includes(y)) continue;
				const V = Bb({ tag: y, props: h.getAttributeNames().reduce((b, g) => ({ ...b, [g]: h.getAttribute(g) }), {}) }),
					p = v.findIndex((b) => b && (b.tag._d === V || h.isEqualNode(b.$el)));
				if (p !== -1) {
					const b = v[p];
					(b.$el = h), ja(b), u(b), delete v[p];
				}
			}
			v.forEach((h) => {
				if (!!h.$el) {
					switch (h.tag.tagPosition) {
						case 'bodyClose':
							l.body.appendChild(h.$el);
							break;
						case 'bodyOpen':
							l.body.insertBefore(h.$el, l.body.firstChild);
							break;
						case 'head':
						default:
							l.head.appendChild(h.$el);
							break;
					}
					u(h);
				}
			});
		}
	});
	for (const d of i) await e.hooks.callHook('dom:renderTag', d);
	Object.values(a).forEach((d) => d());
}
let di = null;
async function Rb(e, t = {}) {
	function n() {
		return (di = null), Td(e, t);
	}
	const l = t.delayFn || ((a) => setTimeout(a, 10));
	return (di = di || new Promise((a) => l(() => a(n()))));
}
function Mb(e) {
	const t = Vb(),
		n = {
			unhead: t,
			install(l) {
				Os.startsWith('3') && ((l.config.globalProperties.$head = t), l.provide('usehead', t));
			},
			use(l) {
				t.use(l);
			},
			resolveTags() {
				return t.resolveTags();
			},
			headEntries() {
				return t.headEntries();
			},
			headTags() {
				return t.resolveTags();
			},
			push(l, a) {
				return t.push(l, a);
			},
			addEntry(l, a) {
				return t.push(l, a);
			},
			addHeadObjs(l, a) {
				return t.push(l, a);
			},
			addReactiveEntry(l, a) {
				const o = Ed(l, a);
				return typeof o < 'u' ? o.dispose : () => {};
			},
			removeHeadObjs() {},
			updateDOM(l, a) {
				a ? Td(t, { document: l }) : Rb(t, { delayFn: (o) => setTimeout(() => o(), 50), document: l });
			},
			internalHooks: t.hooks,
			hooks: { 'before:dom': [], 'resolved:tags': [], 'resolved:entries': [] },
		};
	return (
		(t.addHeadObjs = n.addHeadObjs),
		(t.updateDOM = n.updateDOM),
		t.hooks.hook('dom:beforeRender', (l) => {
			for (const a of n.hooks['before:dom']) a() === !1 && (l.shouldRender = !1);
		}),
		e && n.addHeadObjs(e),
		n
	);
}
const Fb = {
		meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
		link: [],
		style: [],
		script: [],
		noscript: [],
	},
	Hb = '__nuxt',
	Nb = Ca((e) => {
		const t = Mb();
		t.push(Fb), e.vueApp.use(t);
		{
			let n = !0;
			const l = () => {
				(n = !1), t.internalHooks.callHook('entries:updated', t.unhead);
			};
			t.internalHooks.hook('dom:beforeRender', (a) => {
				a.shouldRender = !n;
			}),
				e.hooks.hook('page:start', () => {
					n = !0;
				}),
				e.hooks.hook('page:finish', l),
				e.hooks.hook('app:mounted', l);
		}
		e._useHead = Ed;
	}),
	Db = [];
function fi(e) {
	typeof e == 'object' && (e = gd({ pathname: e.path || '', search: fd(e.query || {}), hash: e.hash || '' }));
	const t = _a(e.toString());
	return {
		path: t.pathname,
		fullPath: e,
		query: dd(t.search),
		hash: t.hash,
		params: {},
		name: void 0,
		matched: [],
		redirectedFrom: void 0,
		meta: {},
		href: e,
	};
}
const jb = Ca((e) => {
		const t = Wg(window.location.pathname, Hi().app.baseURL) + window.location.search + window.location.hash,
			n = [],
			l = { 'navigate:before': [], 'resolve:before': [], 'navigate:after': [], error: [] },
			a = (c, f) => (l[c].push(f), () => l[c].splice(l[c].indexOf(f), 1)),
			o = Hi().app.baseURL,
			i = We(fi(t));
		async function s(c, f) {
			try {
				const d = fi(c);
				for (const v of l['navigate:before']) {
					const h = await v(d, i);
					if (h === !1 || h instanceof Error) return;
					if (h) return s(h, !0);
				}
				for (const v of l['resolve:before']) await v(d, i);
				Object.assign(i, d),
					window.history[f ? 'replaceState' : 'pushState']({}, '', pa(o, d.fullPath)),
					e.isHydrating || (await Ql(e, $y));
				for (const v of l['navigate:after']) await v(d, i);
			} catch (d) {
				for (const v of l.error) await v(d);
			}
		}
		const r = {
			currentRoute: i,
			isReady: () => Promise.resolve(),
			options: {},
			install: () => Promise.resolve(),
			push: (c) => s(c, !1),
			replace: (c) => s(c, !0),
			back: () => window.history.go(-1),
			go: (c) => window.history.go(c),
			forward: () => window.history.go(1),
			beforeResolve: (c) => a('resolve:before', c),
			beforeEach: (c) => a('navigate:before', c),
			afterEach: (c) => a('navigate:after', c),
			onError: (c) => a('error', c),
			resolve: fi,
			addRoute: (c, f) => {
				n.push(f);
			},
			getRoutes: () => n,
			hasRoute: (c) => n.some((f) => f.name === c),
			removeRoute: (c) => {
				const f = n.findIndex((d) => d.name === c);
				f !== -1 && n.splice(f, 1);
			},
		};
		e.vueApp.component('RouterLink', {
			functional: !0,
			props: {
				to: String,
				custom: Boolean,
				replace: Boolean,
				activeClass: String,
				exactActiveClass: String,
				ariaCurrentValue: String,
			},
			setup: (c, { slots: f }) => {
				const d = () => s(c.to, c.replace);
				return () => {
					var h;
					const v = r.resolve(c.to);
					return c.custom
						? (h = f.default) == null
							? void 0
							: h.call(f, { href: c.to, navigate: d, route: v })
						: Rt('a', { href: c.to, onClick: (y) => (y.preventDefault(), d()) }, f);
				};
			},
		}),
			window.addEventListener('popstate', (c) => {
				const f = c.target.location;
				r.replace(f.href.replace(f.origin, ''));
			}),
			(e._route = i),
			(e._middleware = e._middleware || { global: [], named: {} });
		const u = Iy('_layout');
		return (
			e.hooks.hookOnce('app:created', async () => {
				r.beforeEach(async (c, f) => {
					var v;
					(c.meta = We(c.meta || {})),
						e.isHydrating && (c.meta.layout = (v = u.value) != null ? v : c.meta.layout),
						(e._processingMiddleware = !0);
					const d = new Set([...Db, ...e._middleware.global]);
					for (const h of d) {
						const y = await Ql(e, h, [c, f]);
						if (y || y === !1) return y;
					}
				}),
					r.afterEach(() => {
						delete e._processingMiddleware;
					}),
					await r.replace(t),
					Yg(i.fullPath, t) || (await Ql(e, Sd, [i.fullPath]));
			}),
			{ provide: { route: i, router: r } }
		);
	}),
	zb = Ca((e) => {
		!Ry() ||
			(e.hooks.hook('link:prefetch', (t) => {
				if (!_a(t).protocol) return ru(t);
			}),
			Ro().beforeResolve(async (t, n) => {
				if (t.path === n.path) return;
				const l = await ru(t.path);
				!l || Object.assign(e.static.data, l.data);
			}));
	});
function du(e, t, n) {
	Ub(e, t), t.set(e, n);
}
function Ub(e, t) {
	if (t.has(e)) throw new TypeError('Cannot initialize the same private elements twice on an object');
}
function Wb(e, t, n) {
	var l = Ad(e, t, 'set');
	return Kb(e, l, n), n;
}
function Kb(e, t, n) {
	if (t.set) t.set.call(e, n);
	else {
		if (!t.writable) throw new TypeError('attempted to set read only private field');
		t.value = n;
	}
}
function In(e, t) {
	var n = Ad(e, t, 'get');
	return qb(e, n);
}
function Ad(e, t, n) {
	if (!t.has(e)) throw new TypeError('attempted to ' + n + ' private field on non-instance');
	return t.get(e);
}
function qb(e, t) {
	return t.get ? t.get.call(e) : t.value;
}
function Pd(e, t, n) {
	const l = t.length - 1;
	if (l < 0) return e === void 0 ? n : e;
	for (let a = 0; a < l; a++) {
		if (e == null) return n;
		e = e[t[a]];
	}
	return e == null || e[t[l]] === void 0 ? n : e[t[l]];
}
function kl(e, t) {
	if (e === t) return !0;
	if ((e instanceof Date && t instanceof Date && e.getTime() !== t.getTime()) || e !== Object(e) || t !== Object(t))
		return !1;
	const n = Object.keys(e);
	return n.length !== Object.keys(t).length ? !1 : n.every((l) => kl(e[l], t[l]));
}
function ji(e, t, n) {
	return e == null || !t || typeof t != 'string'
		? n
		: e[t] !== void 0
		? e[t]
		: ((t = t.replace(/\[(\w+)\]/g, '.$1')), (t = t.replace(/^\./, '')), Pd(e, t.split('.'), n));
}
function qt(e, t, n) {
	if (t == null) return e === void 0 ? n : e;
	if (e !== Object(e)) {
		if (typeof t != 'function') return n;
		const a = t(e, n);
		return typeof a > 'u' ? n : a;
	}
	if (typeof t == 'string') return ji(e, t, n);
	if (Array.isArray(t)) return Pd(e, t, n);
	if (typeof t != 'function') return n;
	const l = t(e, n);
	return typeof l > 'u' ? n : l;
}
function On(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	return Array.from({ length: e }, (n, l) => t + l);
}
function ee(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'px';
	if (!(e == null || e === '')) return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function zi(e) {
	return e !== null && typeof e == 'object' && !Array.isArray(e);
}
function Yb(e) {
	return e == null ? void 0 : e.$el;
}
const fu = Object.freeze({
		enter: 13,
		tab: 9,
		delete: 46,
		esc: 27,
		space: 32,
		up: 38,
		down: 40,
		left: 37,
		right: 39,
		end: 35,
		home: 36,
		del: 46,
		backspace: 8,
		insert: 45,
		pageup: 33,
		pagedown: 34,
		shift: 16,
	}),
	Ui = Object.freeze({
		enter: 'Enter',
		tab: 'Tab',
		delete: 'Delete',
		esc: 'Escape',
		space: 'Space',
		up: 'ArrowUp',
		down: 'ArrowDown',
		left: 'ArrowLeft',
		right: 'ArrowRight',
		end: 'End',
		home: 'Home',
		del: 'Delete',
		backspace: 'Backspace',
		insert: 'Insert',
		pageup: 'PageUp',
		pagedown: 'PageDown',
		shift: 'Shift',
	});
function Bd(e) {
	return Object.keys(e);
}
function bt(e, t) {
	const n = Object.create(null),
		l = Object.create(null);
	for (const a in e) t.some((o) => (o instanceof RegExp ? o.test(a) : o === a)) ? (n[a] = e[a]) : (l[a] = e[a]);
	return [n, l];
}
function Un(e, t) {
	const n = { ...e };
	return t.forEach((l) => delete n[l]), n;
}
function Wn(e) {
	return bt(e, ['class', 'style', 'id', /^data-/]);
}
function Lt(e) {
	return e == null ? [] : Array.isArray(e) ? e : [e];
}
function ht(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
		n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
	return Math.max(t, Math.min(n, e));
}
function vi(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '0';
	return e + n.repeat(Math.max(0, t - e.length));
}
function Xb(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
	const n = [];
	let l = 0;
	for (; l < e.length; ) n.push(e.substr(l, t)), (l += t);
	return n;
}
function vu(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
	if (e < t) return `${e} B`;
	const n = t === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
	let l = -1;
	for (; Math.abs(e) >= t && l < n.length - 1; ) (e /= t), ++l;
	return `${e.toFixed(1)} ${n[l]}B`;
}
function ln() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
		t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
		n = arguments.length > 2 ? arguments[2] : void 0;
	const l = {};
	for (const a in e) l[a] = e[a];
	for (const a in t) {
		const o = e[a],
			i = t[a];
		if (zi(o) && zi(i)) {
			l[a] = ln(o, i, n);
			continue;
		}
		if (Array.isArray(o) && Array.isArray(i) && n) {
			l[a] = n(o, i);
			continue;
		}
		l[a] = i;
	}
	return l;
}
function Od(e) {
	return e.map((t) => (t.type === ge ? Od(t.children) : t)).flat();
}
function Mo() {
	return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '')
		.replace(/[^a-z]/gi, '-')
		.replace(/\B([A-Z])/g, '-$1')
		.toLowerCase();
}
function ea(e, t) {
	if (!t || typeof t != 'object') return [];
	if (Array.isArray(t)) return t.map((n) => ea(e, n)).flat(1);
	if (Array.isArray(t.children)) return t.children.map((n) => ea(e, n)).flat(1);
	if (t.component) {
		if (Object.getOwnPropertySymbols(t.component.provides).includes(e)) return [t.component];
		if (t.component.subTree) return ea(e, t.component.subTree).flat(1);
	}
	return [];
}
var za = new WeakMap(),
	el = new WeakMap();
class Gb {
	constructor(t) {
		du(this, za, { writable: !0, value: [] }), du(this, el, { writable: !0, value: 0 }), (this.size = t);
	}
	push(t) {
		(In(this, za)[In(this, el)] = t), Wb(this, el, (In(this, el) + 1) % this.size);
	}
	values() {
		return In(this, za)
			.slice(In(this, el))
			.concat(In(this, za).slice(0, In(this, el)));
	}
}
function Zb(e) {
	return 'touches' in e
		? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
		: { clientX: e.clientX, clientY: e.clientY };
}
function Hs(e) {
	const t = We({}),
		n = C(e);
	return (
		Mt(
			() => {
				for (const l in n.value) t[l] = n.value[l];
			},
			{ flush: 'sync' },
		),
		ws(t)
	);
}
function fo(e, t) {
	return e.includes(t);
}
const Jb = /^on[^a-z]/,
	Rd = (e) => Jb.test(e),
	Dn = [Function, Array];
function mu(e, t) {
	return (
		(t = 'on' + on(t)), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`])
	);
}
function vo(e) {
	for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++) n[l - 1] = arguments[l];
	if (Array.isArray(e)) for (const a of e) a(...n);
	else typeof e == 'function' && e(...n);
}
const Md = ['top', 'bottom'],
	Qb = ['start', 'end', 'left', 'right'];
function Wi(e, t) {
	let [n, l] = e.split(' ');
	return l || (l = fo(Md, n) ? 'start' : fo(Qb, n) ? 'top' : 'center'), { side: Ki(n, t), align: Ki(l, t) };
}
function Ki(e, t) {
	return e === 'start' ? (t ? 'right' : 'left') : e === 'end' ? (t ? 'left' : 'right') : e;
}
function mi(e) {
	return {
		side: { center: 'center', top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[e.side],
		align: e.align,
	};
}
function hi(e) {
	return {
		side: e.side,
		align: { center: 'center', top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[e.align],
	};
}
function hu(e) {
	return { side: e.align, align: e.side };
}
function gu(e) {
	return fo(Md, e.side) ? 'y' : 'x';
}
class dl {
	constructor(t) {
		let { x: n, y: l, width: a, height: o } = t;
		(this.x = n), (this.y = l), (this.width = a), (this.height = o);
	}
	get top() {
		return this.y;
	}
	get bottom() {
		return this.y + this.height;
	}
	get left() {
		return this.x;
	}
	get right() {
		return this.x + this.width;
	}
}
function yu(e, t) {
	return {
		x: { before: Math.max(0, t.left - e.left), after: Math.max(0, e.right - t.right) },
		y: { before: Math.max(0, t.top - e.top), after: Math.max(0, e.bottom - t.bottom) },
	};
}
function Ns(e) {
	const t = e.getBoundingClientRect(),
		n = getComputedStyle(e),
		l = n.transform;
	if (l) {
		let a, o, i, s, r;
		if (l.startsWith('matrix3d('))
			(a = l.slice(9, -1).split(/, /)), (o = +a[0]), (i = +a[5]), (s = +a[12]), (r = +a[13]);
		else if (l.startsWith('matrix('))
			(a = l.slice(7, -1).split(/, /)), (o = +a[0]), (i = +a[3]), (s = +a[4]), (r = +a[5]);
		else return new dl(t);
		const u = n.transformOrigin,
			c = t.x - s - (1 - o) * parseFloat(u),
			f = t.y - r - (1 - i) * parseFloat(u.slice(u.indexOf(' ') + 1)),
			d = o ? t.width / o : e.offsetWidth + 1,
			v = i ? t.height / i : e.offsetHeight + 1;
		return new dl({ x: c, y: f, width: d, height: v });
	} else return new dl(t);
}
function Rn(e, t, n) {
	if (typeof e.animate > 'u') return { finished: Promise.resolve() };
	const l = e.animate(t, n);
	return (
		typeof l.finished > 'u' &&
			(l.finished = new Promise((a) => {
				l.onfinish = () => {
					a(l);
				};
			})),
		l
	);
}
function Fd(e, t, n) {
	if ((n && (t = { __isVue: !0, $parent: n, $options: t }), t)) {
		if (((t.$_alreadyWarned = t.$_alreadyWarned || []), t.$_alreadyWarned.includes(e))) return;
		t.$_alreadyWarned.push(e);
	}
	return `[Vuetify] ${e}` + (t ? np(t) : '');
}
function jn(e, t, n) {
	const l = Fd(e, t, n);
	l != null && console.warn(l);
}
function qi(e, t, n) {
	const l = Fd(e, t, n);
	l != null && console.error(l);
}
const ep = /(?:^|[-_])(\w)/g,
	tp = (e) => e.replace(ep, (t) => t.toUpperCase()).replace(/[-_]/g, '');
function gi(e, t) {
	if (e.$root === e) return '<Root>';
	const n =
		typeof e == 'function' && e.cid != null ? e.options : e.__isVue ? e.$options || e.constructor.options : e || {};
	let l = n.name || n._componentTag;
	const a = n.__file;
	if (!l && a) {
		const o = a.match(/([^/\\]+)\.vue$/);
		l = o == null ? void 0 : o[1];
	}
	return (l ? `<${tp(l)}>` : '<Anonymous>') + (a && t !== !1 ? ` at ${a}` : '');
}
function np(e) {
	if (e.__isVue && e.$parent) {
		const t = [];
		let n = 0;
		for (; e; ) {
			if (t.length > 0) {
				const l = t[t.length - 1];
				if (l.constructor === e.constructor) {
					n++, (e = e.$parent);
					continue;
				} else n > 0 && ((t[t.length - 1] = [l, n]), (n = 0));
			}
			t.push(e), (e = e.$parent);
		}
		return (
			`

found in

` +
			t.map(
				(l, a) =>
					`${a === 0 ? '---> ' : ' '.repeat(5 + a * 2)}${
						Array.isArray(l) ? `${gi(l[0])}... (${l[1]} recursive calls)` : gi(l)
					}`,
			).join(`
`)
		);
	} else
		return `

(found in ${gi(e)})`;
}
const lp = [
		[3.2406, -1.5372, -0.4986],
		[-0.9689, 1.8758, 0.0415],
		[0.0557, -0.204, 1.057],
	],
	ap = (e) => (e <= 0.0031308 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055),
	op = [
		[0.4124, 0.3576, 0.1805],
		[0.2126, 0.7152, 0.0722],
		[0.0193, 0.1192, 0.9505],
	],
	ip = (e) => (e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4);
function Hd(e) {
	const t = Array(3),
		n = ap,
		l = lp;
	for (let a = 0; a < 3; ++a) t[a] = Math.round(ht(n(l[a][0] * e[0] + l[a][1] * e[1] + l[a][2] * e[2])) * 255);
	return { r: t[0], g: t[1], b: t[2] };
}
function Ds(e) {
	let { r: t, g: n, b: l } = e;
	const a = [0, 0, 0],
		o = ip,
		i = op;
	(t = o(t / 255)), (n = o(n / 255)), (l = o(l / 255));
	for (let s = 0; s < 3; ++s) a[s] = i[s][0] * t + i[s][1] * n + i[s][2] * l;
	return a;
}
const mo = 0.20689655172413793,
	sp = (e) => (e > mo ** 3 ? Math.cbrt(e) : e / (3 * mo ** 2) + 4 / 29),
	rp = (e) => (e > mo ? e ** 3 : 3 * mo ** 2 * (e - 4 / 29));
function Nd(e) {
	const t = sp,
		n = t(e[1]);
	return [116 * n - 16, 500 * (t(e[0] / 0.95047) - n), 200 * (n - t(e[2] / 1.08883))];
}
function Dd(e) {
	const t = rp,
		n = (e[0] + 16) / 116;
	return [t(n + e[1] / 500) * 0.95047, t(n), t(n - e[2] / 200) * 1.08883];
}
function bu(e) {
	return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Pn(e) {
	if (typeof e == 'number')
		return (
			(isNaN(e) || e < 0 || e > 16777215) && jn(`'${e}' is not a valid hex color`),
			{ r: (e & 16711680) >> 16, g: (e & 65280) >> 8, b: e & 255 }
		);
	if (typeof e == 'string') {
		let t = e.startsWith('#') ? e.slice(1) : e;
		[3, 4].includes(t.length)
			? (t = t
					.split('')
					.map((l) => l + l)
					.join(''))
			: [6, 8].includes(t.length) || jn(`'${e}' is not a valid hex(a) color`);
		const n = parseInt(t, 16);
		return (isNaN(n) || n < 0 || n > 4294967295) && jn(`'${e}' is not a valid hex(a) color`), Kd(t);
	} else
		throw new TypeError(
			`Colors can only be numbers or strings, recieved ${e == null ? e : e.constructor.name} instead`,
		);
}
function Fo(e) {
	const { h: t, s: n, v: l, a } = e,
		o = (s) => {
			const r = (s + t / 60) % 6;
			return l - l * n * Math.max(Math.min(r, 4 - r, 1), 0);
		},
		i = [o(5), o(3), o(1)].map((s) => Math.round(s * 255));
	return { r: i[0], g: i[1], b: i[2], a };
}
function js(e) {
	if (!e) return { h: 0, s: 1, v: 1, a: 1 };
	const t = e.r / 255,
		n = e.g / 255,
		l = e.b / 255,
		a = Math.max(t, n, l),
		o = Math.min(t, n, l);
	let i = 0;
	a !== o &&
		(a === t
			? (i = 60 * (0 + (n - l) / (a - o)))
			: a === n
			? (i = 60 * (2 + (l - t) / (a - o)))
			: a === l && (i = 60 * (4 + (t - n) / (a - o)))),
		i < 0 && (i = i + 360);
	const s = a === 0 ? 0 : (a - o) / a,
		r = [i, s, a];
	return { h: r[0], s: r[1], v: r[2], a: e.a };
}
function jd(e) {
	const { h: t, s: n, v: l, a } = e,
		o = l - (l * n) / 2,
		i = o === 1 || o === 0 ? 0 : (l - o) / Math.min(o, 1 - o);
	return { h: t, s: i, l: o, a };
}
function zd(e) {
	const { h: t, s: n, l, a } = e,
		o = l + n * Math.min(l, 1 - l),
		i = o === 0 ? 0 : 2 - (2 * l) / o;
	return { h: t, s: i, v: o, a };
}
function up(e) {
	let { r: t, g: n, b: l, a } = e;
	return a === void 0 ? `rgb(${t}, ${n}, ${l})` : `rgba(${t}, ${n}, ${l}, ${a})`;
}
function Ud(e) {
	return up(Fo(e));
}
function Ua(e) {
	const t = Math.round(e).toString(16);
	return ('00'.substr(0, 2 - t.length) + t).toUpperCase();
}
function Wd(e) {
	let { r: t, g: n, b: l, a } = e;
	return `#${[Ua(t), Ua(n), Ua(l), a !== void 0 ? Ua(Math.round(a * 255)) : 'FF'].join('')}`;
}
function Kd(e) {
	let [t, n, l, a] = Xb(e, 2).map((o) => parseInt(o, 16));
	return (a = a === void 0 ? a : Math.round((a / 255) * 100) / 100), { r: t, g: n, b: l, a };
}
function qd(e) {
	const t = Kd(e);
	return js(t);
}
function Yd(e) {
	return Wd(Fo(e));
}
function cp(e) {
	return (
		e.startsWith('#') && (e = e.slice(1)),
		(e = e.replace(/([^0-9a-f])/gi, 'F')),
		(e.length === 3 || e.length === 4) &&
			(e = e
				.split('')
				.map((t) => t + t)
				.join('')),
		e.length === 6 ? (e = vi(e, 8, 'F')) : (e = vi(vi(e, 6), 8, 'F')),
		e
	);
}
function dp(e, t) {
	const n = Nd(Ds(e));
	return (n[0] = n[0] + t * 10), Hd(Dd(n));
}
function fp(e, t) {
	const n = Nd(Ds(e));
	return (n[0] = n[0] - t * 10), Hd(Dd(n));
}
function Yi(e) {
	const t = Pn(e);
	return Ds(t)[1];
}
function vp(e, t) {
	const n = Yi(e),
		l = Yi(t),
		a = Math.max(n, l),
		o = Math.min(n, l);
	return (a + 0.05) / (o + 0.05);
}
function Qe(e, t) {
	const n = kn();
	if (!n) throw new Error(`[Vuetify] ${e} ${t || 'must be called from inside a setup function'}`);
	return n;
}
function rn() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'composables';
	const t = Qe(e).type;
	return Mo((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Xd = 0,
	Ja = new WeakMap();
function et() {
	const e = Qe('getUid');
	if (Ja.has(e)) return Ja.get(e);
	{
		const t = Xd++;
		return Ja.set(e, t), t;
	}
}
et.reset = () => {
	(Xd = 0), (Ja = new WeakMap());
};
function mp(e) {
	const { provides: t } = Qe('injectSelf');
	if (t && e in t) return t[e];
}
function bl(e, t) {
	let n;
	ae(
		e,
		(l) => {
			if (l && !n) (n = xo()), n.run(t);
			else if (!l) {
				var a;
				(a = n) == null || a.stop(), (n = void 0);
			}
		},
		{ immediate: !0 },
	),
		Gt(() => {
			var l;
			(l = n) == null || l.stop();
		});
}
function de(e, t) {
	return (n) =>
		Object.keys(e).reduce((l, a) => {
			const i = typeof e[a] == 'object' && e[a] != null && !Array.isArray(e[a]) ? e[a] : { type: e[a] };
			return n && a in n ? (l[a] = { ...i, default: n[a] }) : (l[a] = i), t && !l[a].source && (l[a].source = t), l;
		}, {});
}
function hp(e, t) {
	var n, l;
	return (
		((n = e.props) == null ? void 0 : n.hasOwnProperty(t)) || ((l = e.props) == null ? void 0 : l.hasOwnProperty(Mo(t)))
	);
}
const q = function (t) {
	var n, l;
	return (
		(t._setup = (n = t._setup) != null ? n : t.setup),
		t.name
			? (t._setup &&
					((t.props = (l = t.props) != null ? l : {}),
					(t.props = de(t.props, Mo(t.name))()),
					(t.props._as = String),
					(t.setup = function (o, i) {
						const s = kn(),
							r = Jd(),
							u = Am(),
							c = gc({ ...Se(o) });
						Mt(() => {
							var h, y, V;
							const d = r.value.global,
								v = r.value[(h = o._as) != null ? h : t.name];
							if (v) {
								const p = Object.entries(v).filter((b) => {
									let [g] = b;
									return g.startsWith(g[0].toUpperCase());
								});
								p.length && (u.value = Object.fromEntries(p));
							}
							for (const p of Object.keys(o)) {
								let b = o[p];
								hp(s.vnode, p) ||
									(b =
										(V = (y = v == null ? void 0 : v[p]) != null ? y : d == null ? void 0 : d[p]) != null ? V : o[p]),
									c[p] !== b && (c[p] = b);
							}
						});
						const f = t._setup(c, i);
						return (
							bl(u, () => {
								var v;
								var d;
								je(ln((v = (d = mp(ca)) == null ? void 0 : d.value) != null ? v : {}, u.value));
							}),
							f
						);
					})),
			  t)
			: (jn('The component is missing an explicit name, unable to generate default prop value'), t)
	);
};
function Ie() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
	return (t) => (e ? q : Eo)(t);
}
function Et(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'div',
		n = arguments.length > 2 ? arguments[2] : void 0;
	return q({
		name: n != null ? n : on(It(e.replace(/__/g, '-'))),
		props: { tag: { type: String, default: t } },
		setup(l, a) {
			let { slots: o } = a;
			return () => {
				var i;
				return Rt(l.tag, { class: e }, (i = o.default) == null ? void 0 : i.call(o));
			};
		},
	});
}
function Gd(e) {
	if (typeof e.getRootNode != 'function') {
		for (; e.parentNode; ) e = e.parentNode;
		return e !== document ? null : document;
	}
	const t = e.getRootNode();
	return t !== document && t.getRootNode({ composed: !0 }) !== document ? null : t;
}
const ua = 'cubic-bezier(0.4, 0, 0.2, 1)',
	gp = 'cubic-bezier(0.0, 0, 0.2, 1)',
	yp = 'cubic-bezier(0.4, 0, 1, 1)';
function Zd(e) {
	for (; e; ) {
		if (zs(e)) return e;
		e = e.parentElement;
	}
	return document.scrollingElement;
}
function ho(e, t) {
	const n = [];
	if (t && e && !t.contains(e)) return n;
	for (; e && (zs(e) && n.push(e), e !== t); ) e = e.parentElement;
	return n;
}
function zs(e) {
	if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
	const t = window.getComputedStyle(e);
	return t.overflowY === 'scroll' || (t.overflowY === 'auto' && e.scrollHeight > e.clientHeight);
}
const Be = typeof window < 'u',
	Us = Be && 'IntersectionObserver' in window,
	bp = Be && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0),
	Xi = Be && typeof CSS < 'u' && CSS.supports('selector(:focus-visible)');
function pp(e) {
	for (; e; ) {
		if (window.getComputedStyle(e).position === 'fixed') return !0;
		e = e.offsetParent;
	}
	return !1;
}
function K(e) {
	const t = Qe('useRender');
	t.render = e;
}
const ca = Symbol.for('vuetify:defaults');
function _p(e) {
	return R(e != null ? e : {});
}
function Jd() {
	const e = we(ca);
	if (!e) throw new Error('[Vuetify] Could not find defaults instance');
	return e;
}
function je(e, t) {
	const n = Jd(),
		l = R(e),
		a = C(() => {
			const o = Ge(t == null ? void 0 : t.scoped),
				i = Ge(t == null ? void 0 : t.reset),
				s = Ge(t == null ? void 0 : t.root);
			let r = ln(l.value, { prev: n.value });
			if (o) return r;
			if (i || s) {
				const u = Number(i || 1 / 0);
				for (let c = 0; c <= u && r.prev; c++) r = r.prev;
				return r;
			}
			return ln(r.prev, r);
		});
	return ze(ca, a), a;
}
const Gi = Symbol.for('vuetify:display'),
	pu = { mobileBreakpoint: 'lg', thresholds: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560 } },
	Cp = function () {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : pu;
		return ln(pu, e);
	};
function _u(e) {
	return Be && !e ? window.innerWidth : 0;
}
function Cu(e) {
	return Be && !e ? window.innerHeight : 0;
}
function Sp() {
	const e = Be ? window.navigator.userAgent : 'ssr';
	function t(h) {
		return Boolean(e.match(h));
	}
	const n = t(/android/i),
		l = t(/iphone|ipad|ipod/i),
		a = t(/cordova/i),
		o = t(/electron/i),
		i = t(/chrome/i),
		s = t(/edge/i),
		r = t(/firefox/i),
		u = t(/opera/i),
		c = t(/win/i),
		f = t(/mac/i),
		d = t(/linux/i),
		v = t(/ssr/i);
	return {
		android: n,
		ios: l,
		cordova: a,
		electron: o,
		chrome: i,
		edge: s,
		firefox: r,
		opera: u,
		win: c,
		mac: f,
		linux: d,
		touch: bp,
		ssr: v,
	};
}
function wp(e, t) {
	const { thresholds: n, mobileBreakpoint: l } = Cp(e),
		a = R(Cu(t)),
		o = Sp(),
		i = We({}),
		s = R(_u(t));
	function r() {
		(a.value = Cu()), (s.value = _u());
	}
	return (
		Mt(() => {
			const u = s.value < n.sm,
				c = s.value < n.md && !u,
				f = s.value < n.lg && !(c || u),
				d = s.value < n.xl && !(f || c || u),
				v = s.value < n.xxl && !(d || f || c || u),
				h = s.value >= n.xxl,
				y = u ? 'xs' : c ? 'sm' : f ? 'md' : d ? 'lg' : v ? 'xl' : 'xxl',
				V = typeof l == 'number' ? l : n[l],
				p = o.ssr ? o.android || o.ios || o.opera : s.value < V;
			(i.xs = u),
				(i.sm = c),
				(i.md = f),
				(i.lg = d),
				(i.xl = v),
				(i.xxl = h),
				(i.smAndUp = !u),
				(i.mdAndUp = !(u || c)),
				(i.lgAndUp = !(u || c || f)),
				(i.xlAndUp = !(u || c || f || d)),
				(i.smAndDown = !(f || d || v || h)),
				(i.mdAndDown = !(d || v || h)),
				(i.lgAndDown = !(v || h)),
				(i.xlAndDown = !h),
				(i.name = y),
				(i.height = a.value),
				(i.width = s.value),
				(i.mobile = p),
				(i.mobileBreakpoint = l),
				(i.platform = o),
				(i.thresholds = n);
		}),
		Be && window.addEventListener('resize', r, { passive: !0 }),
		{ ...ws(i), update: r, ssr: !!t }
	);
}
function Sa() {
	const e = we(Gi);
	if (!e) throw new Error('Could not find Vuetify display injection');
	return e;
}
const kp = {
		collapse: 'mdi-chevron-up',
		complete: 'mdi-check',
		cancel: 'mdi-close-circle',
		close: 'mdi-close',
		delete: 'mdi-close-circle',
		clear: 'mdi-close-circle',
		success: 'mdi-check-circle',
		info: 'mdi-information',
		warning: 'mdi-alert-circle',
		error: 'mdi-close-circle',
		prev: 'mdi-chevron-left',
		next: 'mdi-chevron-right',
		checkboxOn: 'mdi-checkbox-marked',
		checkboxOff: 'mdi-checkbox-blank-outline',
		checkboxIndeterminate: 'mdi-minus-box',
		delimiter: 'mdi-circle',
		sort: 'mdi-arrow-up',
		expand: 'mdi-chevron-down',
		menu: 'mdi-menu',
		subgroup: 'mdi-menu-down',
		dropdown: 'mdi-menu-down',
		radioOn: 'mdi-radiobox-marked',
		radioOff: 'mdi-radiobox-blank',
		edit: 'mdi-pencil',
		ratingEmpty: 'mdi-star-outline',
		ratingFull: 'mdi-star',
		ratingHalf: 'mdi-star-half-full',
		loading: 'mdi-cached',
		first: 'mdi-page-first',
		last: 'mdi-page-last',
		unfold: 'mdi-unfold-more-horizontal',
		file: 'mdi-paperclip',
		plus: 'mdi-plus',
		minus: 'mdi-minus',
	},
	xp = { component: (e) => Rt(Ks, { ...e, class: 'mdi' }) },
	re = [String, Function, Object],
	Zi = Symbol.for('vuetify:icons'),
	Ho = de({ icon: { type: re, required: !0 }, tag: { type: String, required: !0 } }, 'icon'),
	Qd = q({
		name: 'VComponentIcon',
		props: Ho(),
		setup(e) {
			return () => m(e.tag, null, { default: () => [m(e.icon, null, null)] });
		},
	}),
	Ws = q({
		name: 'VSvgIcon',
		inheritAttrs: !1,
		props: Ho(),
		setup(e, t) {
			let { attrs: n } = t;
			return () =>
				m(e.tag, le(n, { style: null }), {
					default: () => [
						m(
							'svg',
							{
								class: 'v-icon__svg',
								xmlns: 'http://www.w3.org/2000/svg',
								viewBox: '0 0 24 24',
								role: 'img',
								'aria-hidden': 'true',
							},
							[m('path', { d: e.icon }, null)],
						),
					],
				});
		},
	}),
	$p = q({
		name: 'VLigatureIcon',
		props: Ho(),
		setup(e) {
			return () => m(e.tag, null, { default: () => [e.icon] });
		},
	}),
	Ks = q({
		name: 'VClassIcon',
		props: Ho(),
		setup(e) {
			return () => m(e.tag, { class: e.icon }, null);
		},
	}),
	Vp = { svg: { component: Ws }, class: { component: Ks } };
function Lp(e) {
	return ln({ defaultSet: 'mdi', sets: { ...Vp, mdi: xp }, aliases: kp }, e);
}
const Ip = (e) => {
	const t = we(Zi);
	if (!t) throw new Error('Missing Vuetify Icons provide!');
	return {
		iconData: C(() => {
			const l = Le(e) ? e.value : e.icon;
			if (!l) throw new Error('Icon value is undefined or null');
			let a = l;
			if (typeof a == 'string' && ((a = a.trim()), a.startsWith('$'))) {
				var o;
				a = (o = t.aliases) == null ? void 0 : o[a.slice(1)];
			}
			if (!a) throw new Error(`Could not find aliased icon "${l}"`);
			if (typeof a != 'string') return { component: Qd, icon: a };
			const i = Object.keys(t.sets).find((u) => typeof a == 'string' && a.startsWith(`${u}:`)),
				s = i ? a.slice(i.length + 1) : a;
			return { component: t.sets[i != null ? i : t.defaultSet].component, icon: s };
		}),
	};
};
function he(e, t, n) {
	let l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f,
		a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
	const o = Qe('useProxiedModel'),
		i = R(e[t] !== void 0 ? e[t] : n),
		s = Mo(t),
		u = C(
			s !== t
				? () => {
						var f, d, v, h;
						return (
							e[t],
							!!(
								(((f = o.vnode.props) != null && f.hasOwnProperty(t)) ||
									((d = o.vnode.props) != null && d.hasOwnProperty(s))) &&
								(((v = o.vnode.props) != null && v.hasOwnProperty(`onUpdate:${t}`)) ||
									((h = o.vnode.props) != null && h.hasOwnProperty(`onUpdate:${s}`)))
							)
						);
				  }
				: () => {
						var f, d;
						return (
							e[t],
							!!(
								(f = o.vnode.props) != null &&
								f.hasOwnProperty(t) &&
								(d = o.vnode.props) != null &&
								d.hasOwnProperty(`onUpdate:${t}`)
							)
						);
				  },
		);
	bl(
		() => !u.value,
		() => {
			ae(
				() => e[t],
				(f) => {
					i.value = f;
				},
			);
		},
	);
	const c = C({
		get() {
			return l(u.value ? e[t] : i.value);
		},
		set(f) {
			const d = a(f);
			(u.value ? e[t] : i.value) === d ||
				l(u.value ? e[t] : i.value) === f ||
				((i.value = d), o == null || o.emit(`update:${t}`, d));
		},
	});
	return Object.defineProperty(c, 'externalValue', { get: () => (u.value ? e[t] : i.value) }), c;
}
const Ep = {
		badge: 'Badge',
		close: 'Close',
		dataIterator: { noResultsText: 'No matching records found', loadingText: 'Loading items...' },
		dataTable: {
			itemsPerPageText: 'Rows per page:',
			ariaLabel: {
				sortDescending: 'Sorted descending.',
				sortAscending: 'Sorted ascending.',
				sortNone: 'Not sorted.',
				activateNone: 'Activate to remove sorting.',
				activateDescending: 'Activate to sort descending.',
				activateAscending: 'Activate to sort ascending.',
			},
			sortBy: 'Sort by',
		},
		dataFooter: {
			itemsPerPageText: 'Items per page:',
			itemsPerPageAll: 'All',
			nextPage: 'Next page',
			prevPage: 'Previous page',
			firstPage: 'First page',
			lastPage: 'Last page',
			pageText: '{0}-{1} of {2}',
		},
		datePicker: {
			itemsSelected: '{0} selected',
			nextMonthAriaLabel: 'Next month',
			nextYearAriaLabel: 'Next year',
			prevMonthAriaLabel: 'Previous month',
			prevYearAriaLabel: 'Previous year',
		},
		noDataText: 'No data available',
		carousel: { prev: 'Previous visual', next: 'Next visual', ariaLabel: { delimiter: 'Carousel slide {0} of {1}' } },
		calendar: { moreEvents: '{0} more' },
		input: { clear: 'Clear {0}', prependAction: '{0} prepended action', appendAction: '{0} appended action' },
		fileInput: { counter: '{0} files', counterSize: '{0} files ({1} in total)' },
		timePicker: { am: 'AM', pm: 'PM' },
		pagination: {
			ariaLabel: {
				root: 'Pagination Navigation',
				next: 'Next page',
				previous: 'Previous page',
				page: 'Goto Page {0}',
				currentPage: 'Page {0}, Current Page',
				first: 'First page',
				last: 'Last page',
			},
		},
		rating: { ariaLabel: { item: 'Rating {0} of {1}' } },
	},
	Su = '$vuetify.',
	wu = (e, t) => e.replace(/\{(\d+)\}/g, (n, l) => String(t[+l])),
	ef = (e, t, n) =>
		function (l) {
			for (var a = arguments.length, o = new Array(a > 1 ? a - 1 : 0), i = 1; i < a; i++) o[i - 1] = arguments[i];
			if (!l.startsWith(Su)) return wu(l, o);
			const s = l.replace(Su, ''),
				r = e.value && n.value[e.value],
				u = t.value && n.value[t.value];
			let c = ji(r, s, null);
			return (
				c || (jn(`Translation key "${l}" not found in "${e.value}", trying fallback locale`), (c = ji(u, s, null))),
				c || (qi(`Translation key "${l}" not found in fallback`), (c = l)),
				typeof c != 'string' && (qi(`Translation key "${l}" has a non-string value`), (c = l)),
				wu(c, o)
			);
		};
function tf(e, t) {
	return (n, l) => new Intl.NumberFormat([e.value, t.value], l).format(n);
}
function yi(e, t, n) {
	var a, o;
	const l = he(e, t, (a = e[t]) != null ? a : n.value);
	return (
		(l.value = (o = e[t]) != null ? o : n.value),
		ae(n, (i) => {
			e[t] == null && (l.value = n.value);
		}),
		l
	);
}
function nf(e) {
	return (t) => {
		const n = yi(t, 'locale', e.current),
			l = yi(t, 'fallback', e.fallback),
			a = yi(t, 'messages', e.messages);
		return {
			name: 'vuetify',
			current: n,
			fallback: l,
			messages: a,
			t: ef(n, l, a),
			n: tf(n, l),
			provide: nf({ current: n, fallback: l, messages: a }),
		};
	};
}
function Tp(e) {
	var a, o;
	const t = R((a = e == null ? void 0 : e.locale) != null ? a : 'en'),
		n = R((o = e == null ? void 0 : e.fallback) != null ? o : 'en'),
		l = R({ en: Ep, ...(e == null ? void 0 : e.messages) });
	return {
		name: 'vuetify',
		current: t,
		fallback: n,
		messages: l,
		t: ef(t, n, l),
		n: tf(t, n),
		provide: nf({ current: t, fallback: n, messages: l }),
	};
}
const Ap = {
		af: !1,
		ar: !0,
		bg: !1,
		ca: !1,
		ckb: !1,
		cs: !1,
		de: !1,
		el: !1,
		en: !1,
		es: !1,
		et: !1,
		fa: !1,
		fi: !1,
		fr: !1,
		hr: !1,
		hu: !1,
		he: !0,
		id: !1,
		it: !1,
		ja: !1,
		ko: !1,
		lv: !1,
		lt: !1,
		nl: !1,
		no: !1,
		pl: !1,
		pt: !1,
		ro: !1,
		ru: !1,
		sk: !1,
		sl: !1,
		srCyrl: !1,
		srLatn: !1,
		sv: !1,
		th: !1,
		tr: !1,
		az: !1,
		uk: !1,
		vi: !1,
		zhHans: !1,
		zhHant: !1,
	},
	pl = Symbol.for('vuetify:locale');
function Pp(e) {
	return e.name != null;
}
function Bp(e) {
	const t = e != null && e.adapter && Pp(e == null ? void 0 : e.adapter) ? (e == null ? void 0 : e.adapter) : Tp(e),
		n = Rp(t, e);
	return { ...t, ...n };
}
function Ft() {
	const e = we(pl);
	if (!e) throw new Error('[Vuetify] Could not find injected locale instance');
	return e;
}
function Op(e) {
	const t = we(pl);
	if (!t) throw new Error('[Vuetify] Could not find injected locale instance');
	const n = t.provide(e),
		l = Mp(n, t.rtl, e),
		a = { ...n, ...l };
	return ze(pl, a), a;
}
function Rp(e, t) {
	var a;
	const n = R((a = t == null ? void 0 : t.rtl) != null ? a : Ap),
		l = C(() => {
			var o;
			return (o = n.value[e.current.value]) != null ? o : !1;
		});
	return { isRtl: l, rtl: n, rtlClasses: C(() => `v-locale--is-${l.value ? 'rtl' : 'ltr'}`) };
}
function Mp(e, t, n) {
	const l = C(() => {
		var a, o;
		return (o = (a = n.rtl) != null ? a : t.value[e.current.value]) != null ? o : !1;
	});
	return { isRtl: l, rtl: t, rtlClasses: C(() => `v-locale--is-${l.value ? 'rtl' : 'ltr'}`) };
}
function un() {
	const e = we(pl);
	if (!e) throw new Error('[Vuetify] Could not find injected rtl instance');
	return { isRtl: e.isRtl, rtlClasses: e.rtlClasses };
}
const tl = 2.4,
	ku = 0.2126729,
	xu = 0.7151522,
	$u = 0.072175,
	Fp = 0.55,
	Hp = 0.58,
	Np = 0.57,
	Dp = 0.62,
	Wa = 0.03,
	Vu = 1.45,
	jp = 5e-4,
	zp = 1.25,
	Up = 1.25,
	Lu = 0.078,
	Iu = 12.82051282051282,
	Ka = 0.06,
	Eu = 0.001;
function Tu(e, t) {
	const n = (e.r / 255) ** tl,
		l = (e.g / 255) ** tl,
		a = (e.b / 255) ** tl,
		o = (t.r / 255) ** tl,
		i = (t.g / 255) ** tl,
		s = (t.b / 255) ** tl;
	let r = n * ku + l * xu + a * $u,
		u = o * ku + i * xu + s * $u;
	if ((r <= Wa && (r += (Wa - r) ** Vu), u <= Wa && (u += (Wa - u) ** Vu), Math.abs(u - r) < jp)) return 0;
	let c;
	if (u > r) {
		const f = (u ** Fp - r ** Hp) * zp;
		c = f < Eu ? 0 : f < Lu ? f - f * Iu * Ka : f - Ka;
	} else {
		const f = (u ** Dp - r ** Np) * Up;
		c = f > -Eu ? 0 : f > -Lu ? f - f * Iu * Ka : f + Ka;
	}
	return c * 100;
}
const da = Symbol.for('vuetify:theme'),
	ye = de({ theme: String }, 'theme'),
	Dl = {
		defaultTheme: 'light',
		variations: { colors: [], lighten: 0, darken: 0 },
		themes: {
			light: {
				dark: !1,
				colors: {
					background: '#FFFFFF',
					surface: '#FFFFFF',
					'surface-variant': '#424242',
					'on-surface-variant': '#EEEEEE',
					primary: '#6200EE',
					'primary-darken-1': '#3700B3',
					secondary: '#03DAC6',
					'secondary-darken-1': '#018786',
					error: '#B00020',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FB8C00',
				},
				variables: {
					'border-color': '#000000',
					'border-opacity': 0.12,
					'high-emphasis-opacity': 0.87,
					'medium-emphasis-opacity': 0.6,
					'disabled-opacity': 0.38,
					'idle-opacity': 0.04,
					'hover-opacity': 0.04,
					'focus-opacity': 0.12,
					'selected-opacity': 0.08,
					'activated-opacity': 0.12,
					'pressed-opacity': 0.12,
					'dragged-opacity': 0.08,
					'theme-kbd': '#212529',
					'theme-on-kbd': '#FFFFFF',
					'theme-code': '#F5F5F5',
					'theme-on-code': '#000000',
				},
			},
			dark: {
				dark: !0,
				colors: {
					background: '#121212',
					surface: '#212121',
					'surface-variant': '#BDBDBD',
					'on-surface-variant': '#424242',
					primary: '#BB86FC',
					'primary-darken-1': '#3700B3',
					secondary: '#03DAC5',
					'secondary-darken-1': '#03DAC5',
					error: '#CF6679',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FB8C00',
				},
				variables: {
					'border-color': '#FFFFFF',
					'border-opacity': 0.12,
					'high-emphasis-opacity': 0.87,
					'medium-emphasis-opacity': 0.6,
					'disabled-opacity': 0.38,
					'idle-opacity': 0.1,
					'hover-opacity': 0.04,
					'focus-opacity': 0.12,
					'selected-opacity': 0.08,
					'activated-opacity': 0.12,
					'pressed-opacity': 0.16,
					'dragged-opacity': 0.08,
					'theme-kbd': '#212529',
					'theme-on-kbd': '#FFFFFF',
					'theme-code': '#343434',
					'theme-on-code': '#CCCCCC',
				},
			},
		},
	};
function Wp() {
	var a;
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Dl;
	if (!e) return { ...Dl, isDisabled: !0 };
	const t = {};
	for (const [o, i] of Object.entries((a = e.themes) != null ? a : {})) {
		var n, l;
		const s =
			i.dark || o === 'dark' ? ((n = Dl.themes) == null ? void 0 : n.dark) : (l = Dl.themes) == null ? void 0 : l.light;
		t[o] = ln(s, i);
	}
	return ln(Dl, { ...e, themes: t });
}
function Kp(e) {
	const t = We(Wp(e)),
		n = R(t.defaultTheme),
		l = R(t.themes),
		a = C(() => {
			const u = {};
			for (const [c, f] of Object.entries(l.value)) {
				const d = (u[c] = { ...f, colors: { ...f.colors } });
				if (t.variations)
					for (const v of t.variations.colors) {
						const h = d.colors[v];
						if (!!h)
							for (const y of ['lighten', 'darken']) {
								const V = y === 'lighten' ? dp : fp;
								for (const p of On(t.variations[y], 1)) d.colors[`${v}-${y}-${p}`] = Wd(V(Pn(h), p));
							}
					}
				for (const v of Object.keys(d.colors)) {
					if (/^on-[a-z]/.test(v) || d.colors[`on-${v}`]) continue;
					const h = `on-${v}`,
						y = Pn(d.colors[v]),
						V = Math.abs(Tu(Pn(0), y)),
						p = Math.abs(Tu(Pn(16777215), y));
					d.colors[h] = p > Math.min(V, 50) ? '#fff' : '#000';
				}
			}
			return u;
		}),
		o = C(() => a.value[n.value]),
		i = C(() => {
			const u = [];
			o.value.dark && nl(u, ':root', ['color-scheme: dark']);
			for (const [v, h] of Object.entries(a.value)) {
				const { variables: y, dark: V } = h;
				nl(u, `.v-theme--${v}`, [
					`color-scheme: ${V ? 'dark' : 'normal'}`,
					...qp(h),
					...Object.keys(y).map((p) => {
						const b = y[p],
							g = typeof b == 'string' && b.startsWith('#') ? Pn(b) : void 0,
							x = g ? `${g.r}, ${g.g}, ${g.b}` : void 0;
						return `--v-${p}: ${x != null ? x : b}`;
					}),
				]);
			}
			const c = [],
				f = [],
				d = new Set(Object.values(a.value).flatMap((v) => Object.keys(v.colors)));
			for (const v of d)
				/^on-[a-z]/.test(v)
					? nl(f, `.${v}`, [`color: rgb(var(--v-theme-${v})) !important`])
					: (nl(c, `.bg-${v}`, [
							`--v-theme-overlay-multiplier: var(--v-theme-${v}-overlay-multiplier)`,
							`background: rgb(var(--v-theme-${v})) !important`,
							`color: rgb(var(--v-theme-on-${v})) !important`,
					  ]),
					  nl(f, `.text-${v}`, [`color: rgb(var(--v-theme-${v})) !important`]),
					  nl(f, `.border-${v}`, [`--v-border-color: var(--v-theme-${v})`]));
			return u.push(...c, ...f), u.map((v, h) => (h === 0 ? v : `    ${v}`)).join('');
		});
	function s(u) {
		const c = u._context.provides.usehead;
		if (c)
			c.addHeadObjs(
				C(() => {
					const f = { children: i.value, type: 'text/css', id: 'vuetify-theme-stylesheet' };
					return t.cspNonce && (f.nonce = t.cspNonce), { style: [f] };
				}),
			),
				Be && Mt(() => c.updateDOM());
		else {
			let d = function () {
					if (!t.isDisabled) {
						if (typeof document < 'u' && !f) {
							const v = document.createElement('style');
							(v.type = 'text/css'),
								(v.id = 'vuetify-theme-stylesheet'),
								t.cspNonce && v.setAttribute('nonce', t.cspNonce),
								(f = v),
								document.head.appendChild(f);
						}
						f && (f.innerHTML = i.value);
					}
				},
				f = Be ? document.getElementById('vuetify-theme-stylesheet') : null;
			ae(i, d, { immediate: !0 });
		}
	}
	const r = C(() => (t.isDisabled ? void 0 : `v-theme--${n.value}`));
	return {
		install: s,
		isDisabled: t.isDisabled,
		name: n,
		themes: l,
		current: o,
		computedThemes: a,
		themeClasses: r,
		styles: i,
		global: { name: n, current: o },
	};
}
function ke(e) {
	Qe('provideTheme');
	const t = we(da, null);
	if (!t) throw new Error('Could not find Vuetify theme injection');
	const n = C(() => {
			var o;
			return (o = e.theme) != null ? o : t == null ? void 0 : t.name.value;
		}),
		l = C(() => (t.isDisabled ? void 0 : `v-theme--${n.value}`)),
		a = { ...t, name: n, themeClasses: l };
	return ze(da, a), a;
}
function lf() {
	Qe('useTheme');
	const e = we(da, null);
	if (!e) throw new Error('Could not find Vuetify theme injection');
	return e;
}
function nl(e, t, n) {
	e.push(
		`${t} {
`,
		...n.map(
			(l) => `  ${l};
`,
		),
		`}
`,
	);
}
function qp(e) {
	const t = e.dark ? 2 : 1,
		n = e.dark ? 1 : 2,
		l = [];
	for (const [a, o] of Object.entries(e.colors)) {
		const i = Pn(o);
		l.push(`--v-theme-${a}: ${i.r},${i.g},${i.b}`),
			a.startsWith('on-') || l.push(`--v-theme-${a}-overlay-multiplier: ${Yi(o) > 0.18 ? t : n}`);
	}
	return l;
}
function zn(e) {
	const t = R(),
		n = R();
	if (Be) {
		const l = new ResizeObserver((a) => {
			e == null || e(a, l), a.length && (n.value = a[0].contentRect);
		});
		Je(() => {
			l.disconnect();
		}),
			ae(
				t,
				(a, o) => {
					o && (l.unobserve(o), (n.value = void 0)), a && l.observe(a);
				},
				{ flush: 'post' },
			);
	}
	return { resizeRef: t, contentRect: ya(n) };
}
const go = Symbol.for('vuetify:layout'),
	af = Symbol.for('vuetify:layout-item'),
	Au = 1e3,
	of = de({ overlaps: { type: Array, default: () => [] }, fullHeight: Boolean }, 'layout'),
	xl = de({ name: { type: String }, order: { type: [Number, String], default: 0 }, absolute: Boolean }, 'layout-item');
function Yp() {
	const e = we(go);
	if (!e) throw new Error('[Vuetify] Could not find injected layout');
	return { getLayoutItem: e.getLayoutItem, mainRect: e.mainRect, mainStyles: e.mainStyles };
}
function $l(e) {
	var s;
	const t = we(go);
	if (!t) throw new Error('[Vuetify] Could not find injected layout');
	const n = (s = e.id) != null ? s : `layout-item-${et()}`,
		l = Qe('useLayoutItem');
	ze(af, { id: n });
	const a = R(!1);
	Oc(() => (a.value = !0)), Bc(() => (a.value = !1));
	const { layoutItemStyles: o, layoutItemScrimStyles: i } = t.register(l, {
		...e,
		active: C(() => (a.value ? !1 : e.active.value)),
		id: n,
	});
	return Je(() => t.unregister(n)), { layoutItemStyles: o, layoutRect: t.layoutRect, layoutItemScrimStyles: i };
}
const Xp = (e, t, n, l) => {
	let a = { top: 0, left: 0, right: 0, bottom: 0 };
	const o = [{ id: '', layer: { ...a } }];
	for (const i of e) {
		const s = t.get(i),
			r = n.get(i),
			u = l.get(i);
		if (!s || !r || !u) continue;
		const c = { ...a, [s.value]: parseInt(a[s.value], 10) + (u.value ? parseInt(r.value, 10) : 0) };
		o.push({ id: i, layer: c }), (a = c);
	}
	return o;
};
function sf(e) {
	const t = we(go, null),
		n = C(() => (t ? t.rootZIndex.value - 100 : Au)),
		l = R([]),
		a = We(new Map()),
		o = We(new Map()),
		i = We(new Map()),
		s = We(new Map()),
		r = We(new Map()),
		{ resizeRef: u, contentRect: c } = zn(),
		f = C(() => {
			var _;
			const w = new Map(),
				k = (_ = e.overlaps) != null ? _ : [];
			for (const L of k.filter(($) => $.includes(':'))) {
				const [$, T] = L.split(':');
				if (!l.value.includes($) || !l.value.includes(T)) continue;
				const E = a.get($),
					O = a.get(T),
					B = o.get($),
					D = o.get(T);
				!E ||
					!O ||
					!B ||
					!D ||
					(w.set(T, { position: E.value, amount: parseInt(B.value, 10) }),
					w.set($, { position: O.value, amount: -parseInt(D.value, 10) }));
			}
			return w;
		}),
		d = C(() => {
			const w = [...new Set([...i.values()].map((_) => _.value))].sort((_, L) => _ - L),
				k = [];
			for (const _ of w) {
				const L = l.value.filter(($) => {
					var T;
					return ((T = i.get($)) == null ? void 0 : T.value) === _;
				});
				k.push(...L);
			}
			return Xp(k, a, o, s);
		}),
		v = C(() => !Array.from(r.values()).some((w) => w.value)),
		h = C(() => d.value[d.value.length - 1].layer),
		y = C(() => ({
			'--v-layout-left': ee(h.value.left),
			'--v-layout-right': ee(h.value.right),
			'--v-layout-top': ee(h.value.top),
			'--v-layout-bottom': ee(h.value.bottom),
			...(v.value ? void 0 : { transition: 'none' }),
		})),
		V = C(() =>
			d.value.slice(1).map((w, k) => {
				let { id: _ } = w;
				const { layer: L } = d.value[k],
					$ = o.get(_),
					T = a.get(_);
				return { id: _, ...L, size: Number($.value), position: T.value };
			}),
		),
		p = (w) => V.value.find((k) => k.id === w),
		b = Qe('createLayout'),
		g = R(!1);
	lt(() => {
		g.value = !0;
	}),
		ze(go, {
			register: (w, k) => {
				let {
					id: _,
					order: L,
					position: $,
					layoutSize: T,
					elementSize: E,
					active: O,
					disableTransitions: B,
					absolute: D,
				} = k;
				i.set(_, L), a.set(_, $), o.set(_, T), s.set(_, O), B && r.set(_, B);
				const P = ea(af, b == null ? void 0 : b.vnode).indexOf(w);
				P > -1 ? l.value.splice(P, 0, _) : l.value.push(_);
				const H = C(() => V.value.findIndex((ne) => ne.id === _)),
					U = C(() => n.value + d.value.length * 2 - H.value * 2),
					Y = C(() => {
						const ne = $.value === 'left' || $.value === 'right',
							be = $.value === 'right',
							J = $.value === 'bottom',
							_e = {
								[$.value]: 0,
								zIndex: U.value,
								transform: `translate${ne ? 'X' : 'Y'}(${(O.value ? 0 : -110) * (be || J ? -1 : 1)}%)`,
								position: D.value || n.value !== Au ? 'absolute' : 'fixed',
								...(v.value ? void 0 : { transition: 'none' }),
							};
						if (!g.value) return _e;
						const ue = V.value[H.value];
						if (!ue) throw new Error(`[Vuetify] Could not find layout item "${_}"`);
						const Ne = f.value.get(_);
						return (
							Ne && (ue[Ne.position] += Ne.amount),
							{
								..._e,
								height: ne ? `calc(100% - ${ue.top}px - ${ue.bottom}px)` : E.value ? `${E.value}px` : void 0,
								left: be ? void 0 : `${ue.left}px`,
								right: be ? `${ue.right}px` : void 0,
								top: $.value !== 'bottom' ? `${ue.top}px` : void 0,
								bottom: $.value !== 'top' ? `${ue.bottom}px` : void 0,
								width: ne ? (E.value ? `${E.value}px` : void 0) : `calc(100% - ${ue.left}px - ${ue.right}px)`,
							}
						);
					}),
					Q = C(() => ({ zIndex: U.value - 1 }));
				return { layoutItemStyles: Y, layoutItemScrimStyles: Q, zIndex: U };
			},
			unregister: (w) => {
				i.delete(w), a.delete(w), o.delete(w), s.delete(w), r.delete(w), (l.value = l.value.filter((k) => k !== w));
			},
			mainRect: h,
			mainStyles: y,
			getLayoutItem: p,
			items: V,
			layoutRect: c,
			rootZIndex: n,
		});
	const x = C(() => ['v-layout', { 'v-layout--full-height': e.fullHeight }]),
		S = C(() => ({ zIndex: n.value, position: t ? 'relative' : void 0, overflow: t ? 'hidden' : void 0 }));
	return { layoutClasses: x, layoutStyles: S, getLayoutItem: p, items: V, layoutRect: c, layoutRef: u };
}
function rf() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	const { blueprint: t, ...n } = e,
		l = ln(t, n),
		{ aliases: a = {}, components: o = {}, directives: i = {} } = l,
		s = _p(l.defaults),
		r = wp(l.display, l.ssr),
		u = Kp(l.theme),
		c = Lp(l.icons),
		f = Bp(l.locale);
	return {
		install: (v) => {
			for (const h in i) v.directive(h, i[h]);
			for (const h in o) v.component(h, o[h]);
			for (const h in a) v.component(h, q({ ...a[h], name: h, aliasName: a[h].name }));
			if (
				(u.install(v),
				v.provide(ca, s),
				v.provide(Gi, r),
				v.provide(da, u),
				v.provide(Zi, c),
				v.provide(pl, f),
				Be && l.ssr)
			)
				if (v.$nuxt)
					v.$nuxt.hook('app:suspense:resolve', () => {
						r.update();
					});
				else {
					const { mount: h } = v;
					v.mount = function () {
						const y = h(...arguments);
						return Te(() => r.update()), (v.mount = h), y;
					};
				}
			et.reset(),
				v.mixin({
					computed: {
						$vuetify() {
							return We({
								defaults: jl.call(this, ca),
								display: jl.call(this, Gi),
								theme: jl.call(this, da),
								icons: jl.call(this, Zi),
								locale: jl.call(this, pl),
							});
						},
					},
				});
		},
		defaults: s,
		display: r,
		theme: u,
		icons: c,
		locale: f,
	};
}
const Gp = '3.0.6';
rf.version = Gp;
function jl(e) {
	var o;
	var t, n;
	const l = this.$,
		a =
			(o = (t = l.parent) == null ? void 0 : t.provides) != null
				? o
				: (n = l.vnode.appContext) == null
				? void 0
				: n.provides;
	if (a && e in a) return a[e];
}
const bi = {
		collapse: 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z',
		complete: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
		cancel:
			'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z',
		close:
			'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
		delete:
			'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z',
		clear:
			'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z',
		success:
			'M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z',
		info: 'M13,9H11V7H13M13,17H11V11H13M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z',
		warning: 'M11,4.5H13V15.5H11V4.5M13,17.5V19.5H11V17.5H13Z',
		error: 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z',
		prev: 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z',
		next: 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
		checkboxOn:
			'M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z',
		checkboxOff:
			'M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z',
		checkboxIndeterminate:
			'M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z',
		delimiter: 'M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z',
		sort: 'M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z',
		expand: 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z',
		menu: 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
		subgroup: 'M7,10L12,15L17,10H7Z',
		dropdown: 'M7,10L12,15L17,10H7Z',
		radioOn:
			'M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z',
		radioOff:
			'M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z',
		edit: 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
		ratingEmpty:
			'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
		ratingFull: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
		ratingHalf:
			'M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
		loading:
			'M19,8L15,12H18C18,15.31 15.31,18 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20C16.42,20 20,16.42 20,12H23M6,12C6,8.69 8.69,6 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4C7.58,4 4,7.58 4,12H1L5,16L9,12',
		first: 'M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z',
		last: 'M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z',
		unfold:
			'M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z',
		file: 'M16.5,6V17.5C16.5,19.71 14.71,21.5 12.5,21.5C10.29,21.5 8.5,19.71 8.5,17.5V5C8.5,3.62 9.62,2.5 11,2.5C12.38,2.5 13.5,3.62 13.5,5V15.5C13.5,16.05 13.05,16.5 12.5,16.5C11.95,16.5 11.5,16.05 11.5,15.5V6H10V15.5C10,16.88 11.12,18 12.5,18C13.88,18 15,16.88 15,15.5V5C15,2.79 13.21,1 11,1C8.79,1 7,2.79 7,5V17.5C7,20.54 9.46,23 12.5,23C15.54,23 18,20.54 18,17.5V6H16.5Z',
		plus: 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z',
		minus: 'M19,13H5V11H19V13Z',
	},
	Zp = { component: Ws };
const Jp = q({
	name: 'VApp',
	props: { ...of({ fullHeight: !0 }), ...ye() },
	setup(e, t) {
		let { slots: n } = t;
		const l = ke(e),
			{ layoutClasses: a, layoutStyles: o, getLayoutItem: i, items: s, layoutRef: r } = sf(e),
			{ rtlClasses: u } = un();
		return (
			K(() => {
				var c;
				return m('div', { ref: r, class: ['v-application', l.themeClasses.value, a.value, u.value], style: o.value }, [
					m('div', { class: 'v-application__wrap' }, [(c = n.default) == null ? void 0 : c.call(n)]),
				]);
			}),
			{ getLayoutItem: i, items: s, theme: l }
		);
	},
});
const $e = Eo({
	name: 'VDefaultsProvider',
	props: { defaults: Object, reset: [Number, String], root: Boolean, scoped: Boolean },
	setup(e, t) {
		let { slots: n } = t;
		const { defaults: l, reset: a, root: o, scoped: i } = ws(e);
		return (
			je(l, { reset: a, root: o, scoped: i }),
			() => {
				var s;
				return (s = n.default) == null ? void 0 : s.call(n);
			}
		);
	},
});
function pt(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'top center 0',
		n = arguments.length > 2 ? arguments[2] : void 0;
	return q({
		name: e,
		props: {
			group: Boolean,
			hideOnLeave: Boolean,
			leaveAbsolute: Boolean,
			mode: { type: String, default: n },
			origin: { type: String, default: t },
		},
		setup(l, a) {
			let { slots: o } = a;
			return () => {
				const i = l.group ? cg : Xt;
				return Rt(
					i,
					{
						name: e,
						mode: l.mode,
						onBeforeEnter(s) {
							s.style.transformOrigin = l.origin;
						},
						onLeave(s) {
							if (l.leaveAbsolute) {
								const { offsetTop: r, offsetLeft: u, offsetWidth: c, offsetHeight: f } = s;
								(s._transitionInitialStyles = {
									position: s.style.position,
									top: s.style.top,
									left: s.style.left,
									width: s.style.width,
									height: s.style.height,
								}),
									(s.style.position = 'absolute'),
									(s.style.top = `${r}px`),
									(s.style.left = `${u}px`),
									(s.style.width = `${c}px`),
									(s.style.height = `${f}px`);
							}
							l.hideOnLeave && s.style.setProperty('display', 'none', 'important');
						},
						onAfterLeave(s) {
							if (l.leaveAbsolute && s != null && s._transitionInitialStyles) {
								const { position: r, top: u, left: c, width: f, height: d } = s._transitionInitialStyles;
								delete s._transitionInitialStyles,
									(s.style.position = r || ''),
									(s.style.top = u || ''),
									(s.style.left = c || ''),
									(s.style.width = f || ''),
									(s.style.height = d || '');
							}
						},
					},
					o.default,
				);
			};
		},
	});
}
function uf(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 'in-out';
	return q({
		name: e,
		props: { mode: { type: String, default: n } },
		setup(l, a) {
			let { slots: o } = a;
			return () => Rt(Xt, { name: e, ...t }, o.default);
		},
	});
}
function cf() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
	const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? 'width' : 'height',
		l = It(`offset-${n}`);
	return {
		onBeforeEnter(i) {
			(i._parent = i.parentNode),
				(i._initialStyle = { transition: i.style.transition, overflow: i.style.overflow, [n]: i.style[n] });
		},
		onEnter(i) {
			const s = i._initialStyle;
			i.style.setProperty('transition', 'none', 'important'), (i.style.overflow = 'hidden');
			const r = `${i[l]}px`;
			(i.style[n] = '0'),
				i.offsetHeight,
				(i.style.transition = s.transition),
				e && i._parent && i._parent.classList.add(e),
				requestAnimationFrame(() => {
					i.style[n] = r;
				});
		},
		onAfterEnter: o,
		onEnterCancelled: o,
		onLeave(i) {
			(i._initialStyle = { transition: '', overflow: i.style.overflow, [n]: i.style[n] }),
				(i.style.overflow = 'hidden'),
				(i.style[n] = `${i[l]}px`),
				i.offsetHeight,
				requestAnimationFrame(() => (i.style[n] = '0'));
		},
		onAfterLeave: a,
		onLeaveCancelled: a,
	};
	function a(i) {
		e && i._parent && i._parent.classList.remove(e), o(i);
	}
	function o(i) {
		const s = i._initialStyle[n];
		(i.style.overflow = i._initialStyle.overflow), s != null && (i.style[n] = s), delete i._initialStyle;
	}
}
const No = q({
	name: 'VDialogTransition',
	props: { target: Object },
	setup(e, t) {
		let { slots: n } = t;
		const l = {
			onBeforeEnter(a) {
				(a.style.pointerEvents = 'none'), (a.style.visibility = 'hidden');
			},
			async onEnter(a, o) {
				var i;
				await new Promise((v) => requestAnimationFrame(v)),
					await new Promise((v) => requestAnimationFrame(v)),
					(a.style.visibility = '');
				const { x: s, y: r, sx: u, sy: c, speed: f } = Bu(e.target, a),
					d = Rn(a, [{ transform: `translate(${s}px, ${r}px) scale(${u}, ${c})`, opacity: 0 }, { transform: '' }], {
						duration: 225 * f,
						easing: gp,
					});
				(i = Pu(a)) == null ||
					i.forEach((v) => {
						Rn(v, [{ opacity: 0 }, { opacity: 0, offset: 0.33 }, { opacity: 1 }], {
							duration: 225 * 2 * f,
							easing: ua,
						});
					}),
					d.finished.then(() => o());
			},
			onAfterEnter(a) {
				a.style.removeProperty('pointer-events');
			},
			onBeforeLeave(a) {
				a.style.pointerEvents = 'none';
			},
			async onLeave(a, o) {
				var i;
				await new Promise((v) => requestAnimationFrame(v));
				const { x: s, y: r, sx: u, sy: c, speed: f } = Bu(e.target, a);
				Rn(a, [{ transform: '' }, { transform: `translate(${s}px, ${r}px) scale(${u}, ${c})`, opacity: 0 }], {
					duration: 125 * f,
					easing: yp,
				}).finished.then(() => o()),
					(i = Pu(a)) == null ||
						i.forEach((v) => {
							Rn(v, [{}, { opacity: 0, offset: 0.2 }, { opacity: 0 }], { duration: 125 * 2 * f, easing: ua });
						});
			},
			onAfterLeave(a) {
				a.style.removeProperty('pointer-events');
			},
		};
		return () =>
			e.target ? m(Xt, le({ name: 'dialog-transition' }, l, { css: !1 }), n) : m(Xt, { name: 'dialog-transition' }, n);
	},
});
function Pu(e) {
	var t;
	const n =
		(t = e.querySelector(':scope > .v-card, :scope > .v-sheet, :scope > .v-list')) == null ? void 0 : t.children;
	return n && [...n];
}
function Bu(e, t) {
	const n = e.getBoundingClientRect(),
		l = Ns(t),
		[a, o] = getComputedStyle(t)
			.transformOrigin.split(' ')
			.map((p) => parseFloat(p)),
		[i, s] = getComputedStyle(t).getPropertyValue('--v-overlay-anchor-origin').split(' ');
	let r = n.left + n.width / 2;
	i === 'left' || s === 'left' ? (r -= n.width / 2) : (i === 'right' || s === 'right') && (r += n.width / 2);
	let u = n.top + n.height / 2;
	i === 'top' || s === 'top' ? (u -= n.height / 2) : (i === 'bottom' || s === 'bottom') && (u += n.height / 2);
	const c = n.width / l.width,
		f = n.height / l.height,
		d = Math.max(1, c, f),
		v = c / d || 0,
		h = f / d || 0,
		y = (l.width * l.height) / (window.innerWidth * window.innerHeight),
		V = y > 0.12 ? Math.min(1.5, (y - 0.12) * 10 + 1) : 1;
	return { x: r - (a + l.left), y: u - (o + l.top), sx: v, sy: h, speed: V };
}
const Qp = pt('fab-transition', 'center center', 'out-in'),
	e0 = pt('dialog-bottom-transition'),
	t0 = pt('dialog-top-transition'),
	Ji = pt('fade-transition'),
	df = pt('scale-transition'),
	n0 = pt('scroll-x-transition'),
	l0 = pt('scroll-x-reverse-transition'),
	a0 = pt('scroll-y-transition'),
	o0 = pt('scroll-y-reverse-transition'),
	i0 = pt('slide-x-transition'),
	s0 = pt('slide-x-reverse-transition'),
	qs = pt('slide-y-transition'),
	r0 = pt('slide-y-reverse-transition'),
	Do = uf('expand-transition', cf()),
	Ys = uf('expand-x-transition', cf('', !0));
const Ht = de(
	{
		height: [Number, String],
		maxHeight: [Number, String],
		maxWidth: [Number, String],
		minHeight: [Number, String],
		minWidth: [Number, String],
		width: [Number, String],
	},
	'dimension',
);
function Nt(e) {
	return {
		dimensionStyles: C(() => ({
			height: ee(e.height),
			maxHeight: ee(e.maxHeight),
			maxWidth: ee(e.maxWidth),
			minHeight: ee(e.minHeight),
			minWidth: ee(e.minWidth),
			width: ee(e.width),
		})),
	};
}
function u0(e) {
	return {
		aspectStyles: C(() => {
			const t = Number(e.aspectRatio);
			return t ? { paddingBottom: String((1 / t) * 100) + '%' } : void 0;
		}),
	};
}
const ff = q({
	name: 'VResponsive',
	props: { aspectRatio: [String, Number], contentClass: String, ...Ht() },
	setup(e, t) {
		let { slots: n } = t;
		const { aspectStyles: l } = u0(e),
			{ dimensionStyles: a } = Nt(e);
		return (
			K(() => {
				var o;
				return m('div', { class: 'v-responsive', style: a.value }, [
					m('div', { class: 'v-responsive__sizer', style: l.value }, null),
					(o = n.additional) == null ? void 0 : o.call(n),
					n.default && m('div', { class: ['v-responsive__content', e.contentClass] }, [n.default()]),
				]);
			}),
			{}
		);
	},
});
function c0(e, t) {
	if (!Us) return;
	const n = t.modifiers || {},
		l = t.value,
		{ handler: a, options: o } = typeof l == 'object' ? l : { handler: l, options: {} },
		i = new IntersectionObserver(function () {
			var s;
			let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
				u = arguments.length > 1 ? arguments[1] : void 0;
			const c = (s = e._observe) == null ? void 0 : s[t.instance.$.uid];
			if (!c) return;
			const f = r.some((d) => d.isIntersecting);
			a && (!n.quiet || c.init) && (!n.once || f || c.init) && a(f, r, u), f && n.once ? vf(e, t) : (c.init = !0);
		}, o);
	(e._observe = Object(e._observe)), (e._observe[t.instance.$.uid] = { init: !1, observer: i }), i.observe(e);
}
function vf(e, t) {
	var n;
	const l = (n = e._observe) == null ? void 0 : n[t.instance.$.uid];
	!l || (l.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const wa = { mounted: c0, unmounted: vf },
	cn = de(
		{ transition: { type: [Boolean, String, Object], default: 'fade-transition', validator: (e) => e !== !0 } },
		'transition',
	),
	Yt = (e, t) => {
		let { slots: n } = t;
		const { transition: l, ...a } = e,
			{ component: o = Xt, ...i } = typeof l == 'object' ? l : {};
		return Rt(o, le(typeof l == 'string' ? { name: l } : i, a), n);
	},
	Vl = q({
		name: 'VImg',
		directives: { intersect: wa },
		props: {
			aspectRatio: [String, Number],
			alt: String,
			cover: Boolean,
			eager: Boolean,
			gradient: String,
			lazySrc: String,
			options: { type: Object, default: () => ({ root: void 0, rootMargin: void 0, threshold: void 0 }) },
			sizes: String,
			src: { type: [String, Object], default: '' },
			srcset: String,
			width: [String, Number],
			...cn(),
		},
		emits: { loadstart: (e) => !0, load: (e) => !0, error: (e) => !0 },
		setup(e, t) {
			let { emit: n, slots: l } = t;
			const a = R(''),
				o = R(),
				i = R(e.eager ? 'loading' : 'idle'),
				s = R(),
				r = R(),
				u = C(() =>
					e.src && typeof e.src == 'object'
						? {
								src: e.src.src,
								srcset: e.srcset || e.src.srcset,
								lazySrc: e.lazySrc || e.src.lazySrc,
								aspect: Number(e.aspectRatio || e.src.aspect || 0),
						  }
						: { src: e.src, srcset: e.srcset, lazySrc: e.lazySrc, aspect: Number(e.aspectRatio || 0) },
				),
				c = C(() => u.value.aspect || s.value / r.value || 0);
			ae(
				() => e.src,
				() => {
					f(i.value !== 'idle');
				},
			),
				ae(c, (_, L) => {
					!_ && L && o.value && V(o.value);
				}),
				Ao(() => f());
			function f(_) {
				if (!(e.eager && _) && !(Us && !_ && !e.eager)) {
					if (((i.value = 'loading'), u.value.lazySrc)) {
						const L = new Image();
						(L.src = u.value.lazySrc), V(L, null);
					}
					!u.value.src ||
						Te(() => {
							var L, $;
							if (
								(n('loadstart', ((L = o.value) == null ? void 0 : L.currentSrc) || u.value.src),
								($ = o.value) != null && $.complete)
							) {
								if ((o.value.naturalWidth || v(), i.value === 'error')) return;
								c.value || V(o.value, null), d();
							} else c.value || V(o.value), h();
						});
				}
			}
			function d() {
				var _;
				h(), (i.value = 'loaded'), n('load', ((_ = o.value) == null ? void 0 : _.currentSrc) || u.value.src);
			}
			function v() {
				var _;
				(i.value = 'error'), n('error', ((_ = o.value) == null ? void 0 : _.currentSrc) || u.value.src);
			}
			function h() {
				const _ = o.value;
				_ && (a.value = _.currentSrc || _.src);
			}
			let y = -1;
			function V(_) {
				let L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
				const $ = () => {
					clearTimeout(y);
					const { naturalHeight: T, naturalWidth: E } = _;
					T || E
						? ((s.value = E), (r.value = T))
						: !_.complete && i.value === 'loading' && L != null
						? (y = window.setTimeout($, L))
						: (_.currentSrc.endsWith('.svg') || _.currentSrc.startsWith('data:image/svg+xml')) &&
						  ((s.value = 1), (r.value = 1));
				};
				$();
			}
			const p = C(() => ({ 'v-img__img--cover': e.cover, 'v-img__img--contain': !e.cover })),
				b = () => {
					var _;
					if (!u.value.src || i.value === 'idle') return null;
					const L = m(
							'img',
							{
								class: ['v-img__img', p.value],
								src: u.value.src,
								srcset: u.value.srcset,
								alt: '',
								sizes: e.sizes,
								ref: o,
								onLoad: d,
								onError: v,
							},
							null,
						),
						$ = (_ = l.sources) == null ? void 0 : _.call(l);
					return m(
						Yt,
						{ transition: e.transition, appear: !0 },
						{
							default: () => [
								Oe($ ? m('picture', { class: 'v-img__picture' }, [$, L]) : L, [[Zt, i.value === 'loaded']]),
							],
						},
					);
				},
				g = () =>
					m(
						Yt,
						{ transition: e.transition },
						{
							default: () => [
								u.value.lazySrc &&
									i.value !== 'loaded' &&
									m(
										'img',
										{ class: ['v-img__img', 'v-img__img--preload', p.value], src: u.value.lazySrc, alt: '' },
										null,
									),
							],
						},
					),
				x = () =>
					l.placeholder
						? m(
								Yt,
								{ transition: e.transition, appear: !0 },
								{
									default: () => [
										(i.value === 'loading' || (i.value === 'error' && !l.error)) &&
											m('div', { class: 'v-img__placeholder' }, [l.placeholder()]),
									],
								},
						  )
						: null,
				S = () =>
					l.error
						? m(
								Yt,
								{ transition: e.transition, appear: !0 },
								{ default: () => [i.value === 'error' && m('div', { class: 'v-img__error' }, [l.error()])] },
						  )
						: null,
				w = () =>
					e.gradient
						? m('div', { class: 'v-img__gradient', style: { backgroundImage: `linear-gradient(${e.gradient})` } }, null)
						: null,
				k = R(!1);
			{
				const _ = ae(c, (L) => {
					L &&
						(requestAnimationFrame(() => {
							requestAnimationFrame(() => {
								k.value = !0;
							});
						}),
						_());
				});
			}
			return (
				K(() =>
					Oe(
						m(
							ff,
							{
								class: ['v-img', { 'v-img--booting': !k.value }],
								style: { width: ee(e.width === 'auto' ? s.value : e.width) },
								aspectRatio: c.value,
								'aria-label': e.alt,
								role: e.alt ? 'img' : void 0,
							},
							{
								additional: () =>
									m(ge, null, [
										m(b, null, null),
										m(g, null, null),
										m(w, null, null),
										m(x, null, null),
										m(S, null, null),
									]),
								default: l.default,
							},
						),
						[[yt('intersect'), { handler: f, options: e.options }, null, { once: !0 }]],
					),
				),
				{ currentSrc: a, image: o, state: i, naturalWidth: s, naturalHeight: r }
			);
		},
	}),
	fe = de({ tag: { type: String, default: 'div' } }, 'tag'),
	yo = Ie()({
		name: 'VToolbarTitle',
		props: { text: String, ...fe() },
		setup(e, t) {
			let { slots: n } = t;
			return (
				K(() => {
					var l;
					const a = !!(n.default || n.text || e.text);
					return m(
						e.tag,
						{ class: 'v-toolbar-title' },
						{
							default: () => [
								a &&
									m('div', { class: 'v-toolbar-title__placeholder' }, [
										n.text ? n.text() : e.text,
										(l = n.default) == null ? void 0 : l.call(n),
									]),
							],
						},
					);
				}),
				{}
			);
		},
	}),
	_t = de({ border: [Boolean, Number, String] }, 'border');
function Tt(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn();
	return {
		borderClasses: C(() => {
			const l = Le(e) ? e.value : e.border,
				a = [];
			if (l === !0 || l === '') a.push(`${t}--border`);
			else if (typeof l == 'string' || l === 0) for (const o of String(l).split(' ')) a.push(`border-${o}`);
			return a;
		}),
	};
}
const Ue = de(
	{
		elevation: {
			type: [Number, String],
			validator(e) {
				const t = parseInt(e);
				return !isNaN(t) && t >= 0 && t <= 24;
			},
		},
	},
	'elevation',
);
function Xe(e) {
	return {
		elevationClasses: C(() => {
			const n = Le(e) ? e.value : e.elevation,
				l = [];
			return n == null || l.push(`elevation-${n}`), l;
		}),
	};
}
const Ae = de({ rounded: { type: [Boolean, Number, String], default: void 0 } }, 'rounded');
function Me(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn();
	return {
		roundedClasses: C(() => {
			const l = Le(e) ? e.value : e.rounded,
				a = [];
			if (l === !0 || l === '') a.push(`${t}--rounded`);
			else if (typeof l == 'string' || l === 0) for (const o of String(l).split(' ')) a.push(`rounded-${o}`);
			return a;
		}),
	};
}
function Xs(e) {
	return Hs(() => {
		const t = [],
			n = {};
		return (
			e.value.background &&
				(bu(e.value.background) ? (n.backgroundColor = e.value.background) : t.push(`bg-${e.value.background}`)),
			e.value.text &&
				(bu(e.value.text) ? ((n.color = e.value.text), (n.caretColor = e.value.text)) : t.push(`text-${e.value.text}`)),
			{ colorClasses: t, colorStyles: n }
		);
	});
}
function rt(e, t) {
	const n = C(() => ({ text: Le(e) ? e.value : t ? e[t] : null })),
		{ colorClasses: l, colorStyles: a } = Xs(n);
	return { textColorClasses: l, textColorStyles: a };
}
function Re(e, t) {
	const n = C(() => ({ background: Le(e) ? e.value : t ? e[t] : null })),
		{ colorClasses: l, colorStyles: a } = Xs(n);
	return { backgroundColorClasses: l, backgroundColorStyles: a };
}
const d0 = [null, 'prominent', 'default', 'comfortable', 'compact'],
	mf = de(
		{
			absolute: Boolean,
			collapse: Boolean,
			color: String,
			density: { type: String, default: 'default', validator: (e) => d0.includes(e) },
			extended: Boolean,
			extensionHeight: { type: [Number, String], default: 48 },
			flat: Boolean,
			floating: Boolean,
			height: { type: [Number, String], default: 64 },
			image: String,
			title: String,
			..._t(),
			...Ue(),
			...Ae(),
			...fe({ tag: 'header' }),
			...ye(),
		},
		'v-toolbar',
	),
	bo = Ie()({
		name: 'VToolbar',
		props: mf(),
		setup(e, t) {
			var n;
			let { slots: l } = t;
			const { backgroundColorClasses: a, backgroundColorStyles: o } = Re(N(e, 'color')),
				{ borderClasses: i } = Tt(e),
				{ elevationClasses: s } = Xe(e),
				{ roundedClasses: r } = Me(e),
				{ themeClasses: u } = ke(e),
				c = R(!!(e.extended || ((n = l.extension) != null && n.call(l)))),
				f = C(() =>
					parseInt(
						Number(e.height) +
							(e.density === 'prominent' ? Number(e.height) : 0) -
							(e.density === 'comfortable' ? 8 : 0) -
							(e.density === 'compact' ? 16 : 0),
						10,
					),
				),
				d = C(() =>
					c.value
						? parseInt(
								Number(e.extensionHeight) +
									(e.density === 'prominent' ? Number(e.extensionHeight) : 0) -
									(e.density === 'comfortable' ? 4 : 0) -
									(e.density === 'compact' ? 8 : 0),
								10,
						  )
						: 0,
				);
			return (
				je({ VBtn: { variant: 'text' } }),
				K(() => {
					var v, h, y, V, p;
					const b = !!(e.title || l.title),
						g = !!(l.image || e.image),
						x = (v = l.extension) == null ? void 0 : v.call(l);
					return (
						(c.value = !!(e.extended || x)),
						m(
							e.tag,
							{
								class: [
									'v-toolbar',
									{
										'v-toolbar--absolute': e.absolute,
										'v-toolbar--collapse': e.collapse,
										'v-toolbar--flat': e.flat,
										'v-toolbar--floating': e.floating,
										[`v-toolbar--density-${e.density}`]: !0,
									},
									a.value,
									i.value,
									s.value,
									r.value,
									u.value,
								],
								style: [o.value],
							},
							{
								default: () => [
									g &&
										m('div', { key: 'image', class: 'v-toolbar__image' }, [
											m(
												$e,
												{ defaults: { VImg: { cover: !0, src: e.image } } },
												{ default: () => [l.image ? ((h = l.image) == null ? void 0 : h.call(l)) : m(Vl, null, null)] },
											),
										]),
									m(
										$e,
										{ defaults: { VTabs: { height: ee(f.value) } } },
										{
											default: () => [
												m('div', { class: 'v-toolbar__content', style: { height: ee(f.value) } }, [
													l.prepend &&
														m('div', { class: 'v-toolbar__prepend' }, [(y = l.prepend) == null ? void 0 : y.call(l)]),
													b && m(yo, { key: 'title', text: e.title }, { text: l.title }),
													(V = l.default) == null ? void 0 : V.call(l),
													l.append &&
														m('div', { class: 'v-toolbar__append' }, [(p = l.append) == null ? void 0 : p.call(l)]),
												]),
											],
										},
									),
									m(
										$e,
										{ defaults: { VTabs: { height: ee(d.value) } } },
										{
											default: () => [
												m(Do, null, {
													default: () => [
														c.value && m('div', { class: 'v-toolbar__extension', style: { height: ee(d.value) } }, [x]),
													],
												}),
											],
										},
									),
								],
							},
						)
					);
				}),
				{ contentHeight: f, extensionHeight: d }
			);
		},
	});
function f0(e) {
	var t;
	return bt(e, Object.keys((t = bo == null ? void 0 : bo.props) != null ? t : {}));
}
const v0 = Ie()({
	name: 'VAppBar',
	props: {
		modelValue: { type: Boolean, default: !0 },
		location: { type: String, default: 'top', validator: (e) => ['top', 'bottom'].includes(e) },
		...mf(),
		...xl(),
		height: { type: [Number, String], default: 64 },
	},
	emits: { 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { slots: n } = t;
		const l = R(),
			a = he(e, 'modelValue'),
			o = C(() => {
				var f, d;
				var s, r;
				const u = (f = (s = l.value) == null ? void 0 : s.contentHeight) != null ? f : 0,
					c = (d = (r = l.value) == null ? void 0 : r.extensionHeight) != null ? d : 0;
				return u + c;
			}),
			{ layoutItemStyles: i } = $l({
				id: e.name,
				order: C(() => parseInt(e.order, 10)),
				position: N(e, 'location'),
				layoutSize: o,
				elementSize: o,
				active: a,
				absolute: N(e, 'absolute'),
			});
		return (
			K(() => {
				const [s] = f0(e);
				return m(
					bo,
					le(
						{
							ref: l,
							class: ['v-app-bar', { 'v-app-bar--bottom': e.location === 'bottom' }],
							style: { ...i.value, height: void 0 },
						},
						s,
					),
					n,
				);
			}),
			{}
		);
	},
});
const m0 = [null, 'default', 'comfortable', 'compact'],
	qe = de({ density: { type: String, default: 'default', validator: (e) => m0.includes(e) } }, 'density');
function tt(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn();
	return { densityClasses: C(() => `${t}--density-${e.density}`) };
}
const h0 = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'];
function Kn(e, t) {
	return m(ge, null, [
		e && m('span', { key: 'overlay', class: `${t}__overlay` }, null),
		m('span', { key: 'underlay', class: `${t}__underlay` }, null),
	]);
}
const At = de(
	{ color: String, variant: { type: String, default: 'elevated', validator: (e) => h0.includes(e) } },
	'variant',
);
function qn(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn();
	const n = C(() => {
			const { variant: o } = Ge(e);
			return `${t}--variant-${o}`;
		}),
		{ colorClasses: l, colorStyles: a } = Xs(
			C(() => {
				const { variant: o, color: i } = Ge(e);
				return { [['elevated', 'flat'].includes(o) ? 'background' : 'text']: i };
			}),
		);
	return { colorClasses: l, colorStyles: a, variantClasses: n };
}
const hf = q({
		name: 'VBtnGroup',
		props: { divided: Boolean, ..._t(), ...qe(), ...Ue(), ...Ae(), ...fe(), ...ye(), ...At() },
		setup(e, t) {
			let { slots: n } = t;
			const { themeClasses: l } = ke(e),
				{ densityClasses: a } = tt(e),
				{ borderClasses: o } = Tt(e),
				{ elevationClasses: i } = Xe(e),
				{ roundedClasses: s } = Me(e);
			je({
				VBtn: { height: 'auto', color: N(e, 'color'), density: N(e, 'density'), flat: !0, variant: N(e, 'variant') },
			}),
				K(() =>
					m(
						e.tag,
						{
							class: [
								'v-btn-group',
								{ 'v-btn-group--divided': e.divided },
								l.value,
								o.value,
								a.value,
								i.value,
								s.value,
							],
						},
						n,
					),
				);
		},
	}),
	Ll = de(
		{
			modelValue: { type: null, default: void 0 },
			multiple: Boolean,
			mandatory: [Boolean, String],
			max: Number,
			selectedClass: String,
			disabled: Boolean,
		},
		'group',
	),
	Yn = de({ value: null, disabled: Boolean, selectedClass: String }, 'group-item');
function Il(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
	const l = Qe('useGroupItem');
	if (!l) throw new Error('[Vuetify] useGroupItem composable must be used inside a component setup function');
	const a = et();
	ze(Symbol.for(`${t.description}:id`), a);
	const o = we(t, null);
	if (!o) {
		if (!n) return o;
		throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
	}
	const i = N(e, 'value'),
		s = C(() => o.disabled.value || e.disabled);
	o.register({ id: a, value: i, disabled: s }, l),
		Je(() => {
			o.unregister(a);
		});
	const r = C(() => o.isSelected(a)),
		u = C(() => r.value && [o.selectedClass.value, e.selectedClass]);
	return (
		ae(r, (c) => {
			l.emit('group:selected', { value: c });
		}),
		{
			id: a,
			isSelected: r,
			toggle: () => o.select(a, !r.value),
			select: (c) => o.select(a, c),
			selectedClass: u,
			value: i,
			disabled: s,
			group: o,
		}
	);
}
function Xn(e, t) {
	let n = !1;
	const l = We([]),
		a = he(
			e,
			'modelValue',
			[],
			(d) => (d == null ? [] : gf(l, Lt(d))),
			(d) => {
				const v = y0(l, d);
				return e.multiple ? v : v[0];
			},
		),
		o = Qe('useGroup');
	function i(d, v) {
		const h = d,
			y = Symbol.for(`${t.description}:id`),
			p = ea(y, o == null ? void 0 : o.vnode).indexOf(v);
		p > -1 ? l.splice(p, 0, h) : l.push(h);
	}
	function s(d) {
		if (n) return;
		r();
		const v = l.findIndex((h) => h.id === d);
		l.splice(v, 1);
	}
	function r() {
		const d = l.find((v) => !v.disabled);
		d && e.mandatory === 'force' && !a.value.length && (a.value = [d.id]);
	}
	lt(() => {
		r();
	}),
		Je(() => {
			n = !0;
		});
	function u(d, v) {
		const h = l.find((y) => y.id === d);
		if (!(v && h != null && h.disabled))
			if (e.multiple) {
				const y = a.value.slice(),
					V = y.findIndex((b) => b === d),
					p = ~V;
				if (
					((v = v != null ? v : !p),
					(p && e.mandatory && y.length <= 1) || (!p && e.max != null && y.length + 1 > e.max))
				)
					return;
				V < 0 && v ? y.push(d) : V >= 0 && !v && y.splice(V, 1), (a.value = y);
			} else {
				const y = a.value.includes(d);
				if (e.mandatory && y) return;
				a.value = (v != null ? v : !y) ? [d] : [];
			}
	}
	function c(d) {
		if ((e.multiple && jn('This method is not supported when using "multiple" prop'), a.value.length)) {
			const v = a.value[0],
				h = l.findIndex((p) => p.id === v);
			let y = (h + d) % l.length,
				V = l[y];
			for (; V.disabled && y !== h; ) (y = (y + d) % l.length), (V = l[y]);
			if (V.disabled) return;
			a.value = [l[y].id];
		} else {
			const v = l.find((h) => !h.disabled);
			v && (a.value = [v.id]);
		}
	}
	const f = {
		register: i,
		unregister: s,
		selected: a,
		select: u,
		disabled: N(e, 'disabled'),
		prev: () => c(l.length - 1),
		next: () => c(1),
		isSelected: (d) => a.value.includes(d),
		selectedClass: C(() => e.selectedClass),
		items: C(() => l),
		getItemIndex: (d) => g0(l, d),
	};
	return ze(t, f), f;
}
function g0(e, t) {
	const n = gf(e, [t]);
	return n.length ? e.findIndex((l) => l.id === n[0]) : -1;
}
function gf(e, t) {
	const n = [];
	for (let l = 0; l < e.length; l++) {
		const a = e[l];
		a.value != null ? t.find((o) => kl(o, a.value)) != null && n.push(a.id) : t.includes(l) && n.push(a.id);
	}
	return n;
}
function y0(e, t) {
	const n = [];
	for (let l = 0; l < e.length; l++) {
		const a = e[l];
		t.includes(a.id) && n.push(a.value != null ? a.value : l);
	}
	return n;
}
const Gs = Symbol.for('vuetify:v-btn-toggle'),
	b0 = Ie()({
		name: 'VBtnToggle',
		props: Ll(),
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const { isSelected: l, next: a, prev: o, select: i, selected: s } = Xn(e, Gs);
			return (
				K(() => {
					var r;
					return m(
						hf,
						{ class: 'v-btn-toggle' },
						{
							default: () => [
								(r = n.default) == null
									? void 0
									: r.call(n, { isSelected: l, next: a, prev: o, select: i, selected: s }),
							],
						},
					);
				}),
				{ next: a, prev: o, select: i }
			);
		},
	});
const p0 = ['x-small', 'small', 'default', 'large', 'x-large'],
	dn = de({ size: { type: [String, Number], default: 'default' } }, 'size');
function El(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn();
	return Hs(() => {
		let n, l;
		return (
			fo(p0, e.size) ? (n = `${t}--size-${e.size}`) : e.size && (l = { width: ee(e.size), height: ee(e.size) }),
			{ sizeClasses: n, sizeStyles: l }
		);
	});
}
const _0 = de(
		{ color: String, start: Boolean, end: Boolean, icon: re, ...dn(), ...fe({ tag: 'i' }), ...ye() },
		'v-icon',
	),
	Fe = q({
		name: 'VIcon',
		props: _0(),
		setup(e, t) {
			let { attrs: n, slots: l } = t,
				a;
			l.default &&
				(a = C(() => {
					var c, f;
					const d = (c = l.default) == null ? void 0 : c.call(l);
					if (!!d)
						return (f = Od(d).filter((v) => v.children && typeof v.children == 'string')[0]) == null
							? void 0
							: f.children;
				}));
			const { themeClasses: o } = ke(e),
				{ iconData: i } = Ip(a || e),
				{ sizeClasses: s } = El(e),
				{ textColorClasses: r, textColorStyles: u } = rt(N(e, 'color'));
			return (
				K(() =>
					m(
						i.value.component,
						{
							tag: e.tag,
							icon: i.value.icon,
							class: [
								'v-icon',
								'notranslate',
								o.value,
								s.value,
								r.value,
								{ 'v-icon--clickable': !!n.onClick, 'v-icon--start': e.start, 'v-icon--end': e.end },
							],
							style: [s.value ? void 0 : { fontSize: ee(e.size), height: ee(e.size), width: ee(e.size) }, u.value],
							role: n.onClick ? 'button' : void 0,
							'aria-hidden': !n.onClick,
						},
						null,
					),
				),
				{}
			);
		},
	});
function Zs(e) {
	const t = R(),
		n = R(!1);
	if (Us) {
		const l = new IntersectionObserver((a) => {
			e == null || e(a, l), (n.value = !!a.find((o) => o.isIntersecting));
		});
		Je(() => {
			l.disconnect();
		}),
			ae(
				t,
				(a, o) => {
					o && (l.unobserve(o), (n.value = !1)), a && l.observe(a);
				},
				{ flush: 'post' },
			);
	}
	return { intersectionRef: t, isIntersecting: n };
}
const Js = q({
	name: 'VProgressCircular',
	props: {
		bgColor: String,
		color: String,
		indeterminate: [Boolean, String],
		modelValue: { type: [Number, String], default: 0 },
		rotate: { type: [Number, String], default: 0 },
		width: { type: [Number, String], default: 4 },
		...dn(),
		...fe({ tag: 'div' }),
		...ye(),
	},
	setup(e, t) {
		let { slots: n } = t;
		const l = 20,
			a = 2 * Math.PI * l,
			o = R(),
			{ themeClasses: i } = ke(e),
			{ sizeClasses: s, sizeStyles: r } = El(e),
			{ textColorClasses: u, textColorStyles: c } = rt(N(e, 'color')),
			{ textColorClasses: f, textColorStyles: d } = rt(N(e, 'bgColor')),
			{ intersectionRef: v, isIntersecting: h } = Zs(),
			{ resizeRef: y, contentRect: V } = zn(),
			p = C(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))),
			b = C(() => Number(e.width)),
			g = C(() => (r.value ? Number(e.size) : V.value ? V.value.width : Math.max(b.value, 32))),
			x = C(() => (l / (1 - b.value / g.value)) * 2),
			S = C(() => (b.value / g.value) * x.value),
			w = C(() => ee(((100 - p.value) / 100) * a));
		return (
			Mt(() => {
				(v.value = o.value), (y.value = o.value);
			}),
			K(() =>
				m(
					e.tag,
					{
						ref: o,
						class: [
							'v-progress-circular',
							{
								'v-progress-circular--indeterminate': !!e.indeterminate,
								'v-progress-circular--visible': h.value,
								'v-progress-circular--disable-shrink': e.indeterminate === 'disable-shrink',
							},
							i.value,
							s.value,
							u.value,
						],
						style: [r.value, c.value],
						role: 'progressbar',
						'aria-valuemin': '0',
						'aria-valuemax': '100',
						'aria-valuenow': e.indeterminate ? void 0 : p.value,
					},
					{
						default: () => [
							m(
								'svg',
								{
									style: { transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))` },
									xmlns: 'http://www.w3.org/2000/svg',
									viewBox: `0 0 ${x.value} ${x.value}`,
								},
								[
									m(
										'circle',
										{
											class: ['v-progress-circular__underlay', f.value],
											style: d.value,
											fill: 'transparent',
											cx: '50%',
											cy: '50%',
											r: l,
											'stroke-width': S.value,
											'stroke-dasharray': a,
											'stroke-dashoffset': 0,
										},
										null,
									),
									m(
										'circle',
										{
											class: 'v-progress-circular__overlay',
											fill: 'transparent',
											cx: '50%',
											cy: '50%',
											r: l,
											'stroke-width': S.value,
											'stroke-dasharray': a,
											'stroke-dashoffset': w.value,
										},
										null,
									),
								],
							),
							n.default && m('div', { class: 'v-progress-circular__content' }, [n.default({ value: p.value })]),
						],
					},
				),
			),
			{}
		);
	},
});
const Qi = Symbol('rippleStop'),
	C0 = 80;
function Ou(e, t) {
	(e.style.transform = t), (e.style.webkitTransform = t);
}
function pi(e, t) {
	e.style.opacity = `calc(${t} * var(--v-theme-overlay-multiplier))`;
}
function es(e) {
	return e.constructor.name === 'TouchEvent';
}
function yf(e) {
	return e.constructor.name === 'KeyboardEvent';
}
const S0 = function (e, t) {
		var n;
		let l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
			a = 0,
			o = 0;
		if (!yf(e)) {
			const d = t.getBoundingClientRect(),
				v = es(e) ? e.touches[e.touches.length - 1] : e;
			(a = v.clientX - d.left), (o = v.clientY - d.top);
		}
		let i = 0,
			s = 0.3;
		(n = t._ripple) != null && n.circle
			? ((s = 0.15), (i = t.clientWidth / 2), (i = l.center ? i : i + Math.sqrt((a - i) ** 2 + (o - i) ** 2) / 4))
			: (i = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2);
		const r = `${(t.clientWidth - i * 2) / 2}px`,
			u = `${(t.clientHeight - i * 2) / 2}px`,
			c = l.center ? r : `${a - i}px`,
			f = l.center ? u : `${o - i}px`;
		return { radius: i, scale: s, x: c, y: f, centerX: r, centerY: u };
	},
	po = {
		show(e, t) {
			var n;
			let l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
			if (!(t != null && (n = t._ripple) != null && n.enabled)) return;
			const a = document.createElement('span'),
				o = document.createElement('span');
			a.appendChild(o), (a.className = 'v-ripple__container'), l.class && (a.className += ` ${l.class}`);
			const { radius: i, scale: s, x: r, y: u, centerX: c, centerY: f } = S0(e, t, l),
				d = `${i * 2}px`;
			(o.className = 'v-ripple__animation'), (o.style.width = d), (o.style.height = d), t.appendChild(a);
			const v = window.getComputedStyle(t);
			v && v.position === 'static' && ((t.style.position = 'relative'), (t.dataset.previousPosition = 'static')),
				o.classList.add('v-ripple__animation--enter'),
				o.classList.add('v-ripple__animation--visible'),
				Ou(o, `translate(${r}, ${u}) scale3d(${s},${s},${s})`),
				pi(o, 0),
				(o.dataset.activated = String(performance.now())),
				setTimeout(() => {
					o.classList.remove('v-ripple__animation--enter'),
						o.classList.add('v-ripple__animation--in'),
						Ou(o, `translate(${c}, ${f}) scale3d(1,1,1)`),
						pi(o, 0.08);
				}, 0);
		},
		hide(e) {
			var t;
			if (!(e != null && (t = e._ripple) != null && t.enabled)) return;
			const n = e.getElementsByClassName('v-ripple__animation');
			if (n.length === 0) return;
			const l = n[n.length - 1];
			if (l.dataset.isHiding) return;
			l.dataset.isHiding = 'true';
			const a = performance.now() - Number(l.dataset.activated),
				o = Math.max(250 - a, 0);
			setTimeout(() => {
				l.classList.remove('v-ripple__animation--in'),
					l.classList.add('v-ripple__animation--out'),
					pi(l, 0),
					setTimeout(() => {
						e.getElementsByClassName('v-ripple__animation').length === 1 &&
							e.dataset.previousPosition &&
							((e.style.position = e.dataset.previousPosition), delete e.dataset.previousPosition),
							l.parentNode && e.removeChild(l.parentNode);
					}, 300);
			}, o);
		},
	};
function bf(e) {
	return typeof e > 'u' || !!e;
}
function fa(e) {
	const t = {},
		n = e.currentTarget;
	if (!(!(n != null && n._ripple) || n._ripple.touched || e[Qi])) {
		if (((e[Qi] = !0), es(e))) (n._ripple.touched = !0), (n._ripple.isTouch = !0);
		else if (n._ripple.isTouch) return;
		if (((t.center = n._ripple.centered || yf(e)), n._ripple.class && (t.class = n._ripple.class), es(e))) {
			if (n._ripple.showTimerCommit) return;
			(n._ripple.showTimerCommit = () => {
				po.show(e, n, t);
			}),
				(n._ripple.showTimer = window.setTimeout(() => {
					var l;
					n != null &&
						(l = n._ripple) != null &&
						l.showTimerCommit &&
						(n._ripple.showTimerCommit(), (n._ripple.showTimerCommit = null));
				}, C0));
		} else po.show(e, n, t);
	}
}
function Ru(e) {
	e[Qi] = !0;
}
function vt(e) {
	const t = e.currentTarget;
	if (!(!t || !t._ripple)) {
		if ((window.clearTimeout(t._ripple.showTimer), e.type === 'touchend' && t._ripple.showTimerCommit)) {
			t._ripple.showTimerCommit(),
				(t._ripple.showTimerCommit = null),
				(t._ripple.showTimer = window.setTimeout(() => {
					vt(e);
				}));
			return;
		}
		window.setTimeout(() => {
			t._ripple && (t._ripple.touched = !1);
		}),
			po.hide(t);
	}
}
function pf(e) {
	const t = e.currentTarget;
	!t ||
		!t._ripple ||
		(t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let va = !1;
function _f(e) {
	!va && (e.keyCode === fu.enter || e.keyCode === fu.space) && ((va = !0), fa(e));
}
function Cf(e) {
	(va = !1), vt(e);
}
function Sf(e) {
	va && ((va = !1), vt(e));
}
function wf(e, t, n) {
	var i;
	const { value: l, modifiers: a } = t,
		o = bf(l);
	if (
		(o || po.hide(e),
		(e._ripple = (i = e._ripple) != null ? i : {}),
		(e._ripple.enabled = o),
		(e._ripple.centered = a.center),
		(e._ripple.circle = a.circle),
		zi(l) && l.class && (e._ripple.class = l.class),
		o && !n)
	) {
		if (a.stop) {
			e.addEventListener('touchstart', Ru, { passive: !0 }), e.addEventListener('mousedown', Ru);
			return;
		}
		e.addEventListener('touchstart', fa, { passive: !0 }),
			e.addEventListener('touchend', vt, { passive: !0 }),
			e.addEventListener('touchmove', pf, { passive: !0 }),
			e.addEventListener('touchcancel', vt),
			e.addEventListener('mousedown', fa),
			e.addEventListener('mouseup', vt),
			e.addEventListener('mouseleave', vt),
			e.addEventListener('keydown', _f),
			e.addEventListener('keyup', Cf),
			e.addEventListener('blur', Sf),
			e.addEventListener('dragstart', vt, { passive: !0 });
	} else !o && n && kf(e);
}
function kf(e) {
	e.removeEventListener('mousedown', fa),
		e.removeEventListener('touchstart', fa),
		e.removeEventListener('touchend', vt),
		e.removeEventListener('touchmove', pf),
		e.removeEventListener('touchcancel', vt),
		e.removeEventListener('mouseup', vt),
		e.removeEventListener('mouseleave', vt),
		e.removeEventListener('keydown', _f),
		e.removeEventListener('keyup', Cf),
		e.removeEventListener('dragstart', vt),
		e.removeEventListener('blur', Sf);
}
function w0(e, t) {
	wf(e, t, !1);
}
function k0(e) {
	delete e._ripple, kf(e);
}
function x0(e, t) {
	if (t.value === t.oldValue) return;
	const n = bf(t.oldValue);
	wf(e, t, n);
}
const xn = { mounted: w0, unmounted: k0, updated: x0 };
const Qs = q({
		name: 'VProgressLinear',
		props: {
			active: { type: Boolean, default: !0 },
			bgColor: String,
			bgOpacity: [Number, String],
			bufferValue: { type: [Number, String], default: 0 },
			clickable: Boolean,
			color: String,
			height: { type: [Number, String], default: 4 },
			indeterminate: Boolean,
			max: { type: [Number, String], default: 100 },
			modelValue: { type: [Number, String], default: 0 },
			reverse: Boolean,
			stream: Boolean,
			striped: Boolean,
			roundedBar: Boolean,
			...Ae(),
			...fe(),
			...ye(),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = he(e, 'modelValue'),
				{ isRtl: a } = un(),
				{ themeClasses: o } = ke(e),
				{ textColorClasses: i, textColorStyles: s } = rt(e, 'color'),
				{ backgroundColorClasses: r, backgroundColorStyles: u } = Re(C(() => e.bgColor || e.color)),
				{ backgroundColorClasses: c, backgroundColorStyles: f } = Re(e, 'color'),
				{ roundedClasses: d } = Me(e),
				{ intersectionRef: v, isIntersecting: h } = Zs(),
				y = C(() => parseInt(e.max, 10)),
				V = C(() => parseInt(e.height, 10)),
				p = C(() => (parseFloat(e.bufferValue) / y.value) * 100),
				b = C(() => (parseFloat(l.value) / y.value) * 100),
				g = C(() => a.value !== e.reverse),
				x = C(() => (e.indeterminate ? 'fade-transition' : 'slide-x-transition')),
				S = C(() => (e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity)));
			function w(k) {
				if (!v.value) return;
				const { left: _, right: L, width: $ } = v.value.getBoundingClientRect(),
					T = g.value ? $ - k.clientX + (L - $) : k.clientX - _;
				l.value = Math.round((T / $) * y.value);
			}
			return (
				K(() =>
					m(
						e.tag,
						{
							ref: v,
							class: [
								'v-progress-linear',
								{
									'v-progress-linear--active': e.active && h.value,
									'v-progress-linear--reverse': g.value,
									'v-progress-linear--rounded': e.rounded,
									'v-progress-linear--rounded-bar': e.roundedBar,
									'v-progress-linear--striped': e.striped,
								},
								d.value,
								o.value,
							],
							style: { height: e.active ? ee(V.value) : 0, '--v-progress-linear-height': ee(V.value) },
							role: 'progressbar',
							'aria-hidden': e.active ? 'false' : 'true',
							'aria-valuemin': '0',
							'aria-valuemax': e.max,
							'aria-valuenow': e.indeterminate ? void 0 : b.value,
							onClick: e.clickable && w,
						},
						{
							default: () => [
								e.stream &&
									m(
										'div',
										{
											key: 'stream',
											class: ['v-progress-linear__stream', i.value],
											style: {
												...s.value,
												[g.value ? 'left' : 'right']: ee(-V.value),
												borderTop: `${ee(V.value / 2)} dotted`,
												opacity: S.value,
												top: `calc(50% - ${ee(V.value / 4)})`,
												width: ee(100 - p.value, '%'),
												'--v-progress-linear-stream-to': ee(V.value * (g.value ? 1 : -1)),
											},
										},
										null,
									),
								m(
									'div',
									{
										class: ['v-progress-linear__background', r.value],
										style: [u.value, { opacity: S.value, width: ee(e.stream ? p.value : 100, '%') }],
									},
									null,
								),
								m(
									Xt,
									{ name: x.value },
									{
										default: () => [
											e.indeterminate
												? m('div', { class: 'v-progress-linear__indeterminate' }, [
														['long', 'short'].map((k) =>
															m(
																'div',
																{ key: k, class: ['v-progress-linear__indeterminate', k, c.value], style: f.value },
																null,
															),
														),
												  ])
												: m(
														'div',
														{
															class: ['v-progress-linear__determinate', c.value],
															style: [f.value, { width: ee(b.value, '%') }],
														},
														null,
												  ),
										],
									},
								),
								n.default &&
									m('div', { class: 'v-progress-linear__content' }, [n.default({ value: b.value, buffer: p.value })]),
							],
						},
					),
				),
				{}
			);
		},
	}),
	er = de({ loading: [Boolean, String] }, 'loader');
function jo(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn();
	return { loaderClasses: C(() => ({ [`${t}--loading`]: e.loading })) };
}
function tr(e, t) {
	var n;
	let { slots: l } = t;
	return m('div', { class: `${e.name}__loader` }, [
		((n = l.default) == null ? void 0 : n.call(l, { color: e.color, isActive: e.active })) ||
			m(Qs, { active: e.active, color: e.color, height: '2', indeterminate: !0 }, null),
	]);
}
const Mu = { center: 'center', top: 'bottom', bottom: 'top', left: 'right', right: 'left' },
	Gn = de({ location: String }, 'location');
function Zn(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
		n = arguments.length > 2 ? arguments[2] : void 0;
	const { isRtl: l } = un();
	return {
		locationStyles: C(() => {
			if (!e.location) return {};
			const { side: o, align: i } = Wi(e.location.split(' ').length > 1 ? e.location : `${e.location} center`, l.value);
			function s(u) {
				return n ? n(u) : 0;
			}
			const r = {};
			return (
				o !== 'center' && (t ? (r[Mu[o]] = `calc(100% - ${s(o)}px)`) : (r[o] = 0)),
				i !== 'center'
					? t
						? (r[Mu[i]] = `calc(100% - ${s(i)}px)`)
						: (r[i] = 0)
					: (o === 'center'
							? (r.top = r.left = '50%')
							: (r[{ top: 'left', bottom: 'left', left: 'top', right: 'top' }[o]] = '50%'),
					  (r.transform = {
							top: 'translateX(-50%)',
							bottom: 'translateX(-50%)',
							left: 'translateY(-50%)',
							right: 'translateY(-50%)',
							center: 'translate(-50%, -50%)',
					  }[o])),
				r
			);
		}),
	};
}
const $0 = ['static', 'relative', 'fixed', 'absolute', 'sticky'],
	Tl = de({ position: { type: String, validator: (e) => $0.includes(e) } }, 'position');
function Al(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn();
	return { positionClasses: C(() => (e.position ? `${t}--${e.position}` : void 0)) };
}
function xf() {
	var e, t;
	return (e = Qe('useRouter')) == null || (t = e.proxy) == null ? void 0 : t.$router;
}
function ka(e, t) {
	const n = rh('RouterLink'),
		l = C(() => !!(e.href || e.to)),
		a = C(() => (l == null ? void 0 : l.value) || mu(t, 'click') || mu(e, 'click'));
	if (typeof n == 'string') return { isLink: l, isClickable: a, href: N(e, 'href') };
	const o = e.to ? n.useLink(e) : void 0;
	return {
		isLink: l,
		isClickable: a,
		route: o == null ? void 0 : o.route,
		navigate: o == null ? void 0 : o.navigate,
		isActive:
			o &&
			C(() => {
				var i, s;
				return e.exact
					? (i = o.isExactActive) == null
						? void 0
						: i.value
					: (s = o.isActive) == null
					? void 0
					: s.value;
			}),
		href: C(() => (e.to ? (o == null ? void 0 : o.route.value.href) : e.href)),
	};
}
const Pl = de({ href: String, replace: Boolean, to: [String, Object], exact: Boolean }, 'router');
let _i = !1;
function V0(e, t) {
	let n = !1,
		l,
		a;
	Be &&
		(Te(() => {
			window.addEventListener('popstate', o),
				(l =
					e == null
						? void 0
						: e.beforeEach((i, s, r) => {
								_i ? (n ? t(r) : r()) : setTimeout(() => (n ? t(r) : r())), (_i = !0);
						  })),
				(a =
					e == null
						? void 0
						: e.afterEach(() => {
								_i = !1;
						  }));
		}),
		Gt(() => {
			var i, s;
			window.removeEventListener('popstate', o), (i = l) == null || i(), (s = a) == null || s();
		}));
	function o(i) {
		var s;
		((s = i.state) != null && s.replaced) || ((n = !0), setTimeout(() => (n = !1)));
	}
}
function L0(e, t) {
	ae(
		() => {
			var n;
			return (n = e.isActive) == null ? void 0 : n.value;
		},
		(n) => {
			e.isLink.value &&
				n &&
				t &&
				Te(() => {
					t(!0);
				});
		},
		{ immediate: !0 },
	);
}
const it = q({
		name: 'VBtn',
		directives: { Ripple: xn },
		props: {
			active: { type: Boolean, default: void 0 },
			symbol: { type: null, default: Gs },
			flat: Boolean,
			icon: [Boolean, String, Function, Object],
			prependIcon: re,
			appendIcon: re,
			block: Boolean,
			stacked: Boolean,
			ripple: { type: Boolean, default: !0 },
			..._t(),
			...Ae(),
			...qe(),
			...Ht(),
			...Ue(),
			...Yn(),
			...er(),
			...Gn(),
			...Tl(),
			...Pl(),
			...dn(),
			...fe({ tag: 'button' }),
			...ye(),
			...At({ variant: 'elevated' }),
		},
		emits: { 'group:selected': (e) => !0 },
		setup(e, t) {
			let { attrs: n, slots: l } = t;
			const { themeClasses: a } = ke(e),
				{ borderClasses: o } = Tt(e),
				{ colorClasses: i, colorStyles: s, variantClasses: r } = qn(e),
				{ densityClasses: u } = tt(e),
				{ dimensionStyles: c } = Nt(e),
				{ elevationClasses: f } = Xe(e),
				{ loaderClasses: d } = jo(e),
				{ locationStyles: v } = Zn(e),
				{ positionClasses: h } = Al(e),
				{ roundedClasses: y } = Me(e),
				{ sizeClasses: V, sizeStyles: p } = El(e),
				b = Il(e, e.symbol, !1),
				g = ka(e, n),
				x = C(() => {
					var k;
					return (
						e.active !== !1 &&
						(e.active || ((k = g.isActive) == null ? void 0 : k.value) || (b == null ? void 0 : b.isSelected.value))
					);
				}),
				S = C(() => (b == null ? void 0 : b.disabled.value) || e.disabled),
				w = C(() => e.variant === 'elevated' && !(e.disabled || e.flat || e.border));
			return (
				L0(g, b == null ? void 0 : b.select),
				K(() => {
					var k, _, L, $;
					const T = g.isLink.value ? 'a' : e.tag,
						E = !b || b.isSelected.value,
						O = !!(e.prependIcon || l.prepend),
						B = !!(e.appendIcon || l.append),
						D = !!(e.icon && e.icon !== !0);
					return Oe(
						m(
							T,
							{
								type: T === 'a' ? void 0 : 'button',
								class: [
									'v-btn',
									b == null ? void 0 : b.selectedClass.value,
									{
										'v-btn--active': x.value,
										'v-btn--block': e.block,
										'v-btn--disabled': S.value,
										'v-btn--elevated': w.value,
										'v-btn--flat': e.flat,
										'v-btn--icon': !!e.icon,
										'v-btn--loading': e.loading,
										'v-btn--stacked': e.stacked,
									},
									a.value,
									o.value,
									E ? i.value : void 0,
									u.value,
									f.value,
									d.value,
									h.value,
									y.value,
									V.value,
									r.value,
								],
								style: [E ? s.value : void 0, c.value, v.value, p.value],
								disabled: S.value || void 0,
								href: g.href.value,
								onClick: (M) => {
									var P;
									S.value || ((P = g.navigate) == null || P.call(g, M), b == null || b.toggle());
								},
							},
							{
								default: () => {
									var M;
									return [
										Kn(!0, 'v-btn'),
										!e.icon &&
											O &&
											m(
												$e,
												{ key: 'prepend', defaults: { VIcon: { icon: e.prependIcon } } },
												{
													default: () => {
														var P;
														return [
															m('span', { class: 'v-btn__prepend' }, [
																(P = (k = l.prepend) == null ? void 0 : k.call(l)) != null ? P : m(Fe, null, null),
															]),
														];
													},
												},
											),
										m('span', { class: 'v-btn__content', 'data-no-activator': '' }, [
											m(
												$e,
												{ key: 'content', defaults: { VIcon: { icon: D ? e.icon : void 0 } } },
												{
													default: () => {
														var P;
														return [
															(P = (_ = l.default) == null ? void 0 : _.call(l)) != null
																? P
																: D && m(Fe, { key: 'icon' }, null),
														];
													},
												},
											),
										]),
										!e.icon &&
											B &&
											m(
												$e,
												{ key: 'append', defaults: { VIcon: { icon: e.appendIcon } } },
												{
													default: () => {
														var P;
														return [
															m('span', { class: 'v-btn__append' }, [
																(P = (L = l.append) == null ? void 0 : L.call(l)) != null ? P : m(Fe, null, null),
															]),
														];
													},
												},
											),
										!!e.loading &&
											m('span', { key: 'loader', class: 'v-btn__loader' }, [
												(M = ($ = l.loader) == null ? void 0 : $.call(l)) != null
													? M
													: m(
															Js,
															{
																color: typeof e.loading == 'boolean' ? void 0 : e.loading,
																indeterminate: !0,
																size: '23',
																width: '2',
															},
															null,
													  ),
											]),
									];
								},
							},
						),
						[[yt('ripple'), !S.value && e.ripple, null]],
					);
				}),
				{}
			);
		},
	}),
	I0 = q({
		name: 'VAppBarNavIcon',
		props: { icon: { type: re, default: '$menu' } },
		setup(e, t) {
			let { slots: n } = t;
			return K(() => m(it, { class: 'v-app-bar-nav-icon', icon: e.icon }, n)), {};
		},
	}),
	E0 = q({
		name: 'VToolbarItems',
		props: At({ variant: 'text' }),
		setup(e, t) {
			let { slots: n } = t;
			return (
				je({ VBtn: { color: N(e, 'color'), height: 'inherit', variant: N(e, 'variant') } }),
				K(() => {
					var l;
					return m('div', { class: 'v-toolbar-items' }, [(l = n.default) == null ? void 0 : l.call(n)]);
				}),
				{}
			);
		},
	}),
	T0 = q({
		name: 'VAppBarTitle',
		props: { ...yo.props },
		setup(e, t) {
			let { slots: n } = t;
			return K(() => m(yo, { class: 'v-app-bar-title' }, n)), {};
		},
	});
const $f = Et('v-alert-title'),
	A0 = ['success', 'info', 'warning', 'error'],
	P0 = q({
		name: 'VAlert',
		props: {
			border: {
				type: [Boolean, String],
				validator: (e) => typeof e == 'boolean' || ['top', 'end', 'bottom', 'start'].includes(e),
			},
			borderColor: String,
			closable: Boolean,
			closeIcon: { type: re, default: '$close' },
			closeLabel: { type: String, default: '$vuetify.close' },
			icon: { type: [Boolean, String, Function, Object], default: null },
			modelValue: { type: Boolean, default: !0 },
			prominent: Boolean,
			title: String,
			text: String,
			type: { type: String, validator: (e) => A0.includes(e) },
			...qe(),
			...Ht(),
			...Ue(),
			...Gn(),
			...Tl(),
			...Ae(),
			...fe(),
			...ye(),
			...At({ variant: 'flat' }),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = he(e, 'modelValue'),
				a = C(() => {
					var x;
					if (e.icon !== !1) return e.type ? ((x = e.icon) != null ? x : `$${e.type}`) : e.icon;
				}),
				o = C(() => {
					var x;
					return { color: (x = e.color) != null ? x : e.type, variant: e.variant };
				}),
				{ themeClasses: i } = ke(e),
				{ colorClasses: s, colorStyles: r, variantClasses: u } = qn(o),
				{ densityClasses: c } = tt(e),
				{ dimensionStyles: f } = Nt(e),
				{ elevationClasses: d } = Xe(e),
				{ locationStyles: v } = Zn(e),
				{ positionClasses: h } = Al(e),
				{ roundedClasses: y } = Me(e),
				{ textColorClasses: V, textColorStyles: p } = rt(N(e, 'borderColor')),
				{ t: b } = Ft(),
				g = C(() => ({
					'aria-label': b(e.closeLabel),
					onClick(x) {
						l.value = !1;
					},
				}));
			return () => {
				var x, S;
				const w = !!(n.prepend || a.value),
					k = !!(n.title || e.title),
					_ = !!(e.text || n.text),
					L = !!(n.close || e.closable);
				return (
					l.value &&
					m(
						e.tag,
						{
							class: [
								'v-alert',
								e.border && {
									'v-alert--border': !!e.border,
									[`v-alert--border-${e.border === !0 ? 'start' : e.border}`]: !0,
								},
								{ 'v-alert--prominent': e.prominent },
								i.value,
								s.value,
								c.value,
								d.value,
								h.value,
								y.value,
								u.value,
							],
							style: [r.value, f.value, v.value],
							role: 'alert',
						},
						{
							default: () => [
								Kn(!1, 'v-alert'),
								e.border && m('div', { key: 'border', class: ['v-alert__border', V.value], style: p.value }, null),
								w &&
									m(
										$e,
										{
											key: 'prepend',
											defaults: { VIcon: { density: e.density, icon: a.value, size: e.prominent ? 44 : 28 } },
										},
										{
											default: () => [
												m('div', { class: 'v-alert__prepend' }, [
													n.prepend ? n.prepend() : a.value && m(Fe, null, null),
												]),
											],
										},
									),
								m('div', { class: 'v-alert__content' }, [
									k && m($f, { key: 'title' }, { default: () => [n.title ? n.title() : e.title] }),
									_ && (n.text ? n.text() : e.text),
									(x = n.default) == null ? void 0 : x.call(n),
								]),
								n.append && m('div', { key: 'append', class: 'v-alert__append' }, [n.append()]),
								L &&
									m(
										$e,
										{ key: 'close', defaults: { VBtn: { icon: e.closeIcon, size: 'x-small', variant: 'text' } } },
										{
											default: () => {
												var $;
												return [
													m('div', { class: 'v-alert__close' }, [
														($ = (S = n.close) == null ? void 0 : S.call(n, { props: g.value })) != null
															? $
															: m(it, g.value, null),
													]),
												];
											},
										},
									),
							],
						},
					)
				);
			};
		},
	});
function Vf(e) {
	const { t } = Ft();
	function n(l) {
		var r;
		let { name: a } = l;
		const o = {
				prepend: 'prependAction',
				prependInner: 'prependAction',
				append: 'appendAction',
				appendInner: 'appendAction',
				clear: 'clear',
			}[a],
			i = e[`onClick:${a}`],
			s = i && o ? t(`$vuetify.input.${o}`, (r = e.label) != null ? r : '') : void 0;
		return m(Fe, { icon: e[`${a}Icon`], 'aria-label': s, onClick: i }, null);
	}
	return { InputIcon: n };
}
const Bl = q({
		name: 'VLabel',
		props: { text: String, clickable: Boolean, ...ye() },
		setup(e, t) {
			let { slots: n } = t;
			return (
				K(() => {
					var l;
					return m('label', { class: ['v-label', { 'v-label--clickable': e.clickable }] }, [
						e.text,
						(l = n.default) == null ? void 0 : l.call(n),
					]);
				}),
				{}
			);
		},
	}),
	Wl = q({
		name: 'VFieldLabel',
		props: { floating: Boolean },
		setup(e, t) {
			let { slots: n } = t;
			return (
				K(() =>
					m(
						Bl,
						{
							class: ['v-field-label', { 'v-field-label--floating': e.floating }],
							'aria-hidden': e.floating || void 0,
						},
						n,
					),
				),
				{}
			);
		},
	}),
	zo = de({ focused: Boolean }, 'focus');
function Jn(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn();
	const n = he(e, 'focused'),
		l = C(() => ({ [`${t}--focused`]: n.value }));
	function a() {
		n.value = !0;
	}
	function o() {
		n.value = !1;
	}
	return { focusClasses: l, isFocused: n, focus: a, blur: o };
}
const B0 = ['underlined', 'outlined', 'filled', 'solo', 'plain'],
	Uo = de(
		{
			appendInnerIcon: re,
			bgColor: String,
			clearable: Boolean,
			clearIcon: { type: re, default: '$clear' },
			active: Boolean,
			color: String,
			dirty: Boolean,
			disabled: Boolean,
			error: Boolean,
			label: String,
			persistentClear: Boolean,
			prependInnerIcon: re,
			reverse: Boolean,
			singleLine: Boolean,
			variant: { type: String, default: 'filled', validator: (e) => B0.includes(e) },
			'onClick:clear': Dn,
			'onClick:appendInner': Dn,
			'onClick:prependInner': Dn,
			...ye(),
			...er(),
		},
		'v-field',
	),
	xa = Ie()({
		name: 'VField',
		inheritAttrs: !1,
		props: { id: String, ...zo(), ...Uo() },
		emits: { 'click:control': (e) => !0, 'update:focused': (e) => !0, 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { attrs: n, emit: l, slots: a } = t;
			const { themeClasses: o } = ke(e),
				{ loaderClasses: i } = jo(e),
				{ focusClasses: s, isFocused: r, focus: u, blur: c } = Jn(e),
				{ InputIcon: f } = Vf(e),
				d = C(() => e.dirty || e.active),
				v = C(() => !e.singleLine && !!(e.label || a.label)),
				h = et(),
				y = C(() => e.id || `input-${h}`),
				V = R(),
				p = R(),
				b = R(),
				{ backgroundColorClasses: g, backgroundColorStyles: x } = Re(N(e, 'bgColor')),
				{ textColorClasses: S, textColorStyles: w } = rt(
					C(() => (d.value && r.value && !e.error && !e.disabled ? e.color : void 0)),
				);
			ae(
				d,
				(L) => {
					if (v.value) {
						const $ = V.value.$el,
							T = p.value.$el,
							E = Ns($),
							O = T.getBoundingClientRect(),
							B = O.x - E.x,
							D = O.y - E.y - (E.height / 2 - O.height / 2),
							M = O.width / 0.75,
							P = Math.abs(M - E.width) > 1 ? { maxWidth: ee(M) } : void 0,
							H = getComputedStyle($),
							U = getComputedStyle(T),
							Y = parseFloat(H.transitionDuration) * 1e3 || 150,
							Q = parseFloat(U.getPropertyValue('--v-field-label-scale')),
							ne = U.getPropertyValue('color');
						($.style.visibility = 'visible'),
							(T.style.visibility = 'hidden'),
							Rn(
								$,
								{ transform: `translate(${B}px, ${D}px) scale(${Q})`, color: ne, ...P },
								{ duration: Y, easing: ua, direction: L ? 'normal' : 'reverse' },
							).finished.then(() => {
								$.style.removeProperty('visibility'), T.style.removeProperty('visibility');
							});
					}
				},
				{ flush: 'post' },
			);
			const k = C(() => ({ isActive: d, isFocused: r, controlRef: b, blur: c, focus: u }));
			function _(L) {
				L.target !== document.activeElement && L.preventDefault(), l('click:control', L);
			}
			return (
				K(() => {
					var L, $, T;
					const E = e.variant === 'outlined',
						O = a['prepend-inner'] || e.prependInnerIcon,
						B = !!(e.clearable || a.clear),
						D = !!(a['append-inner'] || e.appendInnerIcon || B),
						M = a.label ? a.label({ label: e.label, props: { for: y.value } }) : e.label;
					return m(
						'div',
						le(
							{
								class: [
									'v-field',
									{
										'v-field--active': d.value,
										'v-field--appended': D,
										'v-field--disabled': e.disabled,
										'v-field--dirty': e.dirty,
										'v-field--error': e.error,
										'v-field--has-background': !!e.bgColor,
										'v-field--persistent-clear': e.persistentClear,
										'v-field--prepended': O,
										'v-field--reverse': e.reverse,
										'v-field--single-line': e.singleLine,
										'v-field--no-label': !M,
										[`v-field--variant-${e.variant}`]: !0,
									},
									o.value,
									g.value,
									s.value,
									i.value,
								],
								style: [x.value, w.value],
								onClick: _,
							},
							n,
						),
						[
							m('div', { class: 'v-field__overlay' }, null),
							m(
								tr,
								{ name: 'v-field', active: !!e.loading, color: e.error ? 'error' : e.color },
								{ default: a.loader },
							),
							O &&
								m('div', { key: 'prepend', class: 'v-field__prepend-inner' }, [
									e.prependInnerIcon && m(f, { key: 'prepend-icon', name: 'prependInner' }, null),
									(L = a['prepend-inner']) == null ? void 0 : L.call(a, k.value),
								]),
							m('div', { class: 'v-field__field', 'data-no-activator': '' }, [
								['solo', 'filled'].includes(e.variant) &&
									v.value &&
									m(
										Wl,
										{ key: 'floating-label', ref: p, class: [S.value], floating: !0, for: y.value },
										{ default: () => [M] },
									),
								m(Wl, { ref: V, for: y.value }, { default: () => [M] }),
								($ = a.default) == null
									? void 0
									: $.call(a, { ...k.value, props: { id: y.value, class: 'v-field__input' }, focus: u, blur: c }),
							]),
							B &&
								m(
									Ys,
									{ key: 'clear' },
									{
										default: () => [
											Oe(
												m('div', { class: 'v-field__clearable' }, [
													a.clear ? a.clear() : m(f, { name: 'clear' }, null),
												]),
												[[Zt, e.dirty]],
											),
										],
									},
								),
							D &&
								m('div', { key: 'append', class: 'v-field__append-inner' }, [
									(T = a['append-inner']) == null ? void 0 : T.call(a, k.value),
									e.appendInnerIcon && m(f, { key: 'append-icon', name: 'appendInner' }, null),
								]),
							m('div', { class: ['v-field__outline', S.value] }, [
								E &&
									m(ge, null, [
										m('div', { class: 'v-field__outline__start' }, null),
										v.value &&
											m('div', { class: 'v-field__outline__notch' }, [
												m(Wl, { ref: p, floating: !0, for: y.value }, { default: () => [M] }),
											]),
										m('div', { class: 'v-field__outline__end' }, null),
									]),
								['plain', 'underlined'].includes(e.variant) &&
									v.value &&
									m(Wl, { ref: p, floating: !0, for: y.value }, { default: () => [M] }),
							]),
						],
					);
				}),
				{ controlRef: b }
			);
		},
	});
function nr(e) {
	const t = Object.keys(xa.props).filter((n) => !Rd(n));
	return bt(e, t);
}
const Lf = q({
		name: 'VMessages',
		props: {
			active: Boolean,
			color: String,
			messages: { type: [Array, String], default: () => [] },
			...cn({ transition: { component: qs, leaveAbsolute: !0, group: !0 } }),
		},
		setup(e, t) {
			let { slots: n } = t;
			const l = C(() => Lt(e.messages)),
				{ textColorClasses: a, textColorStyles: o } = rt(C(() => e.color));
			return (
				K(() =>
					m(
						Yt,
						{ transition: e.transition, tag: 'div', class: ['v-messages', a.value], style: o.value },
						{
							default: () => [
								e.active &&
									l.value.map((i, s) =>
										m('div', { class: 'v-messages__message', key: `${s}-${l.value}` }, [
											n.message ? n.message({ message: i }) : i,
										]),
									),
							],
						},
					),
				),
				{}
			);
		},
	}),
	If = Symbol.for('vuetify:form'),
	O0 = de(
		{
			disabled: Boolean,
			fastFail: Boolean,
			lazyValidation: Boolean,
			readonly: Boolean,
			modelValue: { type: Boolean, default: null },
			validateOn: { type: String, default: 'input' },
		},
		'form',
	);
function R0(e) {
	const t = he(e, 'modelValue'),
		n = C(() => e.disabled),
		l = C(() => e.readonly),
		a = R(!1),
		o = R([]),
		i = R([]);
	async function s() {
		const c = [];
		let f = !0;
		(i.value = []), (a.value = !0);
		for (const d of o.value) {
			const v = await d.validate();
			if ((v.length > 0 && ((f = !1), c.push({ id: d.id, errorMessages: v })), !f && e.fastFail)) break;
		}
		return (i.value = c), (a.value = !1), { valid: f, errors: i.value };
	}
	function r() {
		o.value.forEach((c) => c.reset()), (t.value = null);
	}
	function u() {
		o.value.forEach((c) => c.resetValidation()), (i.value = []), (t.value = null);
	}
	return (
		ae(
			o,
			() => {
				let c = 0,
					f = 0;
				const d = [];
				for (const v of o.value)
					v.isValid === !1 ? (f++, d.push({ id: v.id, errorMessages: v.errorMessages })) : v.isValid === !0 && c++;
				(i.value = d), (t.value = f > 0 ? !1 : c === o.value.length ? !0 : null);
			},
			{ deep: !0 },
		),
		ze(If, {
			register: (c) => {
				let { id: f, validate: d, reset: v, resetValidation: h } = c;
				o.value.some((y) => y.id === f) && jn(`Duplicate input name "${f}"`),
					o.value.push({ id: f, validate: d, reset: v, resetValidation: h, isValid: null, errorMessages: [] });
			},
			unregister: (c) => {
				o.value = o.value.filter((f) => f.id !== c);
			},
			update: (c, f, d) => {
				const v = o.value.find((h) => h.id === c);
				!v || ((v.isValid = f), (v.errorMessages = d));
			},
			isDisabled: n,
			isReadonly: l,
			isValidating: a,
			items: o,
			validateOn: N(e, 'validateOn'),
		}),
		{ errors: i, isDisabled: n, isReadonly: l, isValidating: a, items: o, validate: s, reset: r, resetValidation: u }
	);
}
function M0() {
	return we(If, null);
}
const Ef = de(
	{
		disabled: Boolean,
		error: Boolean,
		errorMessages: { type: [Array, String], default: () => [] },
		maxErrors: { type: [Number, String], default: 1 },
		name: String,
		label: String,
		readonly: Boolean,
		rules: { type: Array, default: () => [] },
		modelValue: null,
		validateOn: String,
		validationValue: null,
		...zo(),
	},
	'validation',
);
function Tf(e) {
	let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : rn(),
		n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : et();
	const l = he(e, 'modelValue'),
		a = C(() => (e.validationValue === void 0 ? l.value : e.validationValue)),
		o = M0(),
		i = R([]),
		s = R(!0),
		r = C(() => !!(Lt(l.value === '' ? null : l.value).length || Lt(a.value === '' ? null : a.value).length)),
		u = C(() => !!(e.disabled || (o != null && o.isDisabled.value))),
		c = C(() => !!(e.readonly || (o != null && o.isReadonly.value))),
		f = C(() => (e.errorMessages.length ? Lt(e.errorMessages).slice(0, Math.max(0, +e.maxErrors)) : i.value)),
		d = C(() => (e.error || f.value.length ? !1 : e.rules.length && s.value ? null : !0)),
		v = R(!1),
		h = C(() => ({
			[`${t}--error`]: d.value === !1,
			[`${t}--dirty`]: r.value,
			[`${t}--disabled`]: u.value,
			[`${t}--readonly`]: c.value,
		})),
		y = C(() => {
			var x;
			return (x = e.name) != null ? x : Ge(n);
		});
	Ao(() => {
		o == null || o.register({ id: y.value, validate: g, reset: p, resetValidation: b });
	}),
		Je(() => {
			o == null || o.unregister(y.value);
		});
	const V = C(() => e.validateOn || (o == null ? void 0 : o.validateOn.value) || 'input');
	lt(() => (o == null ? void 0 : o.update(y.value, d.value, f.value))),
		bl(
			() => V.value === 'input',
			() => {
				ae(a, () => {
					if (a.value != null) g();
					else if (e.focused) {
						const x = ae(
							() => e.focused,
							(S) => {
								S || g(), x();
							},
						);
					}
				});
			},
		),
		bl(
			() => V.value === 'blur',
			() => {
				ae(
					() => e.focused,
					(x) => {
						x || g();
					},
				);
			},
		),
		ae(d, () => {
			o == null || o.update(y.value, d.value, f.value);
		});
	function p() {
		b(), (l.value = null);
	}
	function b() {
		(s.value = !0), (i.value = []);
	}
	async function g() {
		var S;
		const x = [];
		v.value = !0;
		for (const w of e.rules) {
			if (x.length >= ((S = e.maxErrors) != null ? S : 1)) break;
			const _ = await (typeof w == 'function' ? w : () => w)(a.value);
			if (_ !== !0) {
				if (typeof _ != 'string') {
					console.warn(`${_} is not a valid value. Rule functions must return boolean true or a string.`);
					continue;
				}
				x.push(_);
			}
		}
		return (i.value = x), (v.value = !1), (s.value = !1), i.value;
	}
	return {
		errorMessages: f,
		isDirty: r,
		isDisabled: u,
		isReadonly: c,
		isPristine: s,
		isValid: d,
		isValidating: v,
		reset: p,
		resetValidation: b,
		validate: g,
		validationClasses: h,
	};
}
const fn = de(
		{
			id: String,
			appendIcon: re,
			prependIcon: re,
			hideDetails: [Boolean, String],
			messages: { type: [Array, String], default: () => [] },
			direction: { type: String, default: 'horizontal', validator: (e) => ['horizontal', 'vertical'].includes(e) },
			'onClick:prepend': Dn,
			'onClick:append': Dn,
			...qe(),
			...Ef(),
		},
		'v-input',
	),
	Jt = Ie()({
		name: 'VInput',
		props: { ...fn() },
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { attrs: n, slots: l, emit: a } = t;
			const { densityClasses: o } = tt(e),
				{ InputIcon: i } = Vf(e),
				s = et(),
				r = C(() => e.id || `input-${s}`),
				{
					errorMessages: u,
					isDirty: c,
					isDisabled: f,
					isReadonly: d,
					isPristine: v,
					isValid: h,
					isValidating: y,
					reset: V,
					resetValidation: p,
					validate: b,
					validationClasses: g,
				} = Tf(e, 'v-input', r),
				x = C(() => ({
					id: r,
					isDirty: c,
					isDisabled: f,
					isReadonly: d,
					isPristine: v,
					isValid: h,
					isValidating: y,
					reset: V,
					resetValidation: p,
					validate: b,
				}));
			return (
				K(() => {
					var S, w, k, _, L;
					const $ = !!(l.prepend || e.prependIcon),
						T = !!(l.append || e.appendIcon),
						E = !!(((S = e.messages) != null && S.length) || u.value.length),
						O = !e.hideDetails || (e.hideDetails === 'auto' && (E || !!l.details));
					return m('div', { class: ['v-input', `v-input--${e.direction}`, o.value, g.value] }, [
						$ &&
							m('div', { key: 'prepend', class: 'v-input__prepend' }, [
								(w = l.prepend) == null ? void 0 : w.call(l, x.value),
								e.prependIcon && m(i, { key: 'prepend-icon', name: 'prepend' }, null),
							]),
						l.default &&
							m('div', { class: 'v-input__control' }, [(k = l.default) == null ? void 0 : k.call(l, x.value)]),
						T &&
							m('div', { key: 'append', class: 'v-input__append' }, [
								e.appendIcon && m(i, { key: 'append-icon', name: 'append' }, null),
								(_ = l.append) == null ? void 0 : _.call(l, x.value),
							]),
						O &&
							m('div', { class: 'v-input__details' }, [
								m(Lf, { active: E, messages: u.value.length > 0 ? u.value : e.messages }, { message: l.message }),
								(L = l.details) == null ? void 0 : L.call(l, x.value),
							]),
					]);
				}),
				{ reset: V, resetValidation: p, validate: b }
			);
		},
	});
function $n(e) {
	const t = Object.keys(Jt.props).filter((n) => !Rd(n));
	return bt(e, t);
}
const Wo = q({
		name: 'VCounter',
		functional: !0,
		props: {
			active: Boolean,
			max: [Number, String],
			value: { type: [Number, String], default: 0 },
			...cn({ transition: { component: qs } }),
		},
		setup(e, t) {
			let { slots: n } = t;
			const l = C(() => (e.max ? `${e.value} / ${e.max}` : String(e.value)));
			return (
				K(() =>
					m(
						Yt,
						{ transition: e.transition },
						{
							default: () => [
								Oe(
									m('div', { class: 'v-counter' }, [
										n.default ? n.default({ counter: l.value, max: e.max, value: e.value }) : l.value,
									]),
									[[Zt, e.active]],
								),
							],
						},
					),
				),
				{}
			);
		},
	}),
	Ci = Symbol('Forwarded refs');
function Dt(e) {
	for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++) n[l - 1] = arguments[l];
	return (
		(e[Ci] = n),
		new Proxy(e, {
			get(a, o) {
				if (Reflect.has(a, o)) return Reflect.get(a, o);
				for (const i of n)
					if (i.value && Reflect.has(i.value, o)) {
						const s = Reflect.get(i.value, o);
						return typeof s == 'function' ? s.bind(i.value) : s;
					}
			},
			getOwnPropertyDescriptor(a, o) {
				const i = Reflect.getOwnPropertyDescriptor(a, o);
				if (i) return i;
				if (!(typeof o == 'symbol' || o.startsWith('__'))) {
					for (const s of n) {
						if (!s.value) continue;
						const r = Reflect.getOwnPropertyDescriptor(s.value, o);
						if (r) return r;
						if ('_' in s.value && 'setupState' in s.value._) {
							const u = Reflect.getOwnPropertyDescriptor(s.value._.setupState, o);
							if (u) return u;
						}
					}
					for (const s of n) {
						let r = s.value && Object.getPrototypeOf(s.value);
						for (; r; ) {
							const u = Reflect.getOwnPropertyDescriptor(r, o);
							if (u) return u;
							r = Object.getPrototypeOf(r);
						}
					}
					for (const s of n) {
						const r = s.value && s.value[Ci];
						if (!r) continue;
						const u = r.slice();
						for (; u.length; ) {
							const c = u.shift(),
								f = Reflect.getOwnPropertyDescriptor(c.value, o);
							if (f) return f;
							const d = c.value && c.value[Ci];
							d && u.push(...d);
						}
					}
				}
			},
		})
	);
}
const F0 = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'],
	Ko = de(
		{
			autofocus: Boolean,
			counter: [Boolean, Number, String],
			counterValue: Function,
			hint: String,
			persistentHint: Boolean,
			prefix: String,
			placeholder: String,
			persistentPlaceholder: Boolean,
			persistentCounter: Boolean,
			suffix: String,
			type: { type: String, default: 'text' },
			...fn(),
			...Uo(),
		},
		'v-text-field',
	),
	$a = Ie()({
		name: 'VTextField',
		directives: { Intersect: wa },
		inheritAttrs: !1,
		props: Ko(),
		emits: {
			'click:control': (e) => !0,
			'click:input': (e) => !0,
			'update:focused': (e) => !0,
			'update:modelValue': (e) => !0,
		},
		setup(e, t) {
			let { attrs: n, emit: l, slots: a } = t;
			const o = he(e, 'modelValue'),
				{ isFocused: i, focus: s, blur: r } = Jn(e),
				u = C(() => {
					var S;
					return typeof e.counterValue == 'function'
						? e.counterValue(o.value)
						: ((S = o.value) != null ? S : '').toString().length;
				}),
				c = C(() => {
					if (n.maxlength) return n.maxlength;
					if (!(!e.counter || (typeof e.counter != 'number' && typeof e.counter != 'string'))) return e.counter;
				});
			function f(S, w) {
				var k, _;
				!e.autofocus || !S || (k = w[0].target) == null || (_ = k.focus) == null || _.call(k);
			}
			const d = R(),
				v = R(),
				h = R(),
				y = C(() => F0.includes(e.type) || e.persistentPlaceholder || i.value),
				V = C(() => (e.messages.length ? e.messages : i.value || e.persistentHint ? e.hint : ''));
			function p() {
				if (h.value !== document.activeElement) {
					var S;
					(S = h.value) == null || S.focus();
				}
				i.value || s();
			}
			function b(S) {
				p(), l('click:control', S);
			}
			function g(S) {
				S.stopPropagation(),
					p(),
					Te(() => {
						(o.value = null), vo(e['onClick:clear'], S);
					});
			}
			function x(S) {
				o.value = S.target.value;
			}
			return (
				K(() => {
					const S = !!(a.counter || e.counter || e.counterValue),
						w = !!(S || a.details),
						[k, _] = Wn(n),
						[{ modelValue: L, ...$ }] = $n(e),
						[T] = nr(e);
					return m(
						Jt,
						le(
							{
								ref: d,
								modelValue: o.value,
								'onUpdate:modelValue': (E) => (o.value = E),
								class: [
									'v-text-field',
									{
										'v-text-field--prefixed': e.prefix,
										'v-text-field--suffixed': e.suffix,
										'v-text-field--flush-details': ['plain', 'underlined'].includes(e.variant),
									},
								],
								'onClick:prepend': e['onClick:prepend'],
								'onClick:append': e['onClick:append'],
							},
							k,
							$,
							{ focused: i.value, messages: V.value },
						),
						{
							...a,
							default: (E) => {
								let { id: O, isDisabled: B, isDirty: D, isReadonly: M, isValid: P } = E;
								return m(
									xa,
									le(
										{
											ref: v,
											onMousedown: (H) => {
												H.target !== h.value && H.preventDefault();
											},
											'onClick:control': b,
											'onClick:clear': g,
											'onClick:prependInner': e['onClick:prependInner'],
											'onClick:appendInner': e['onClick:appendInner'],
											role: 'textbox',
										},
										T,
										{
											id: O.value,
											active: y.value || D.value,
											dirty: D.value || e.dirty,
											focused: i.value,
											error: P.value === !1,
										},
									),
									{
										...a,
										default: (H) => {
											let {
												props: { class: U, ...Y },
											} = H;
											const Q = Oe(
												m(
													'input',
													le(
														{
															ref: h,
															value: o.value,
															onInput: x,
															autofocus: e.autofocus,
															readonly: M.value,
															disabled: B.value,
															name: e.name,
															placeholder: e.placeholder,
															size: 1,
															type: e.type,
															onFocus: p,
															onBlur: r,
														},
														Y,
														_,
													),
													null,
												),
												[[yt('intersect'), { handler: f }, null, { once: !0 }]],
											);
											return m(ge, null, [
												e.prefix && m('span', { class: 'v-text-field__prefix' }, [e.prefix]),
												a.default
													? m('div', { class: U, onClick: (ne) => l('click:input', ne), 'data-no-activator': '' }, [
															a.default(),
															Q,
													  ])
													: nn(Q, { class: U }),
												e.suffix && m('span', { class: 'v-text-field__suffix' }, [e.suffix]),
											]);
										},
									},
								);
							},
							details: w
								? (E) => {
										var O;
										return m(ge, null, [
											(O = a.details) == null ? void 0 : O.call(a, E),
											S &&
												m(ge, null, [
													m('span', null, null),
													m(Wo, { active: e.persistentCounter || i.value, value: u.value, max: c.value }, a.counter),
												]),
										]);
								  }
								: void 0,
						},
					);
				}),
				Dt({}, d, v, h)
			);
		},
	});
function lr(e) {
	return bt(e, Object.keys($a.props));
}
const Af = Symbol.for('vuetify:selection-control-group'),
	ar = de(
		{
			color: String,
			disabled: Boolean,
			error: Boolean,
			id: String,
			inline: Boolean,
			falseIcon: re,
			trueIcon: re,
			ripple: { type: Boolean, default: !0 },
			multiple: { type: Boolean, default: null },
			name: String,
			readonly: Boolean,
			modelValue: null,
			type: String,
			valueComparator: { type: Function, default: kl },
			...ye(),
			...qe(),
		},
		'v-selection-control-group',
	),
	Pf = q({
		name: 'VSelectionControlGroup',
		props: { defaultsTarget: { type: String, default: 'VSelectionControl' }, ...ar() },
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = he(e, 'modelValue'),
				a = et(),
				o = C(() => e.id || `v-selection-control-group-${a}`),
				i = C(() => e.name || o.value);
			return (
				ze(Af, { modelValue: l }),
				je({
					[e.defaultsTarget]: {
						color: N(e, 'color'),
						disabled: N(e, 'disabled'),
						density: N(e, 'density'),
						error: N(e, 'error'),
						inline: N(e, 'inline'),
						modelValue: l,
						multiple: C(() => !!e.multiple || (e.multiple == null && Array.isArray(l.value))),
						name: i,
						falseIcon: N(e, 'falseIcon'),
						trueIcon: N(e, 'trueIcon'),
						readonly: N(e, 'readonly'),
						ripple: N(e, 'ripple'),
						type: N(e, 'type'),
						valueComparator: N(e, 'valueComparator'),
					},
				}),
				K(() => {
					var s;
					return m(
						'div',
						{
							class: ['v-selection-control-group', { 'v-selection-control-group--inline': e.inline }],
							'aria-labelled-by': e.type === 'radio' ? o.value : void 0,
							role: e.type === 'radio' ? 'radiogroup' : void 0,
						},
						[(s = n.default) == null ? void 0 : s.call(n)],
					);
				}),
				{}
			);
		},
	}),
	qo = de({ label: String, trueValue: null, falseValue: null, value: null, ...ar() }, 'v-selection-control');
function H0(e) {
	const t = we(Af, void 0),
		{ densityClasses: n } = tt(e),
		l = he(e, 'modelValue'),
		a = C(() => (e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0)),
		o = C(() => (e.falseValue !== void 0 ? e.falseValue : !1)),
		i = C(() => !!e.multiple || (e.multiple == null && Array.isArray(l.value))),
		s = C({
			get() {
				const f = t ? t.modelValue.value : l.value;
				return i.value ? f.some((d) => e.valueComparator(d, a.value)) : e.valueComparator(f, a.value);
			},
			set(f) {
				if (e.readonly) return;
				const d = f ? a.value : o.value;
				let v = d;
				i.value && (v = f ? [...Lt(l.value), d] : Lt(l.value).filter((h) => !e.valueComparator(h, a.value))),
					t ? (t.modelValue.value = v) : (l.value = v);
			},
		}),
		{ textColorClasses: r, textColorStyles: u } = rt(C(() => (s.value && !e.error && !e.disabled ? e.color : void 0))),
		c = C(() => (s.value ? e.trueIcon : e.falseIcon));
	return {
		group: t,
		densityClasses: n,
		trueValue: a,
		falseValue: o,
		model: s,
		textColorClasses: r,
		textColorStyles: u,
		icon: c,
	};
}
const Va = Ie()({
	name: 'VSelectionControl',
	directives: { Ripple: xn },
	inheritAttrs: !1,
	props: qo(),
	emits: { 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { attrs: n, slots: l } = t;
		const { densityClasses: a, icon: o, model: i, textColorClasses: s, textColorStyles: r, trueValue: u } = H0(e),
			c = et(),
			f = C(() => e.id || `input-${c}`),
			d = R(!1),
			v = R(!1),
			h = R();
		function y(b) {
			(d.value = !0), (!Xi || (Xi && b.target.matches(':focus-visible'))) && (v.value = !0);
		}
		function V() {
			(d.value = !1), (v.value = !1);
		}
		function p(b) {
			i.value = b.target.checked;
		}
		return (
			K(() => {
				var b, g;
				const x = l.label ? l.label({ label: e.label, props: { for: f.value } }) : e.label,
					[S, w] = Wn(n);
				return m(
					'div',
					le(
						{
							class: [
								'v-selection-control',
								{
									'v-selection-control--dirty': i.value,
									'v-selection-control--disabled': e.disabled,
									'v-selection-control--error': e.error,
									'v-selection-control--focused': d.value,
									'v-selection-control--focus-visible': v.value,
									'v-selection-control--inline': e.inline,
								},
								a.value,
							],
						},
						S,
					),
					[
						m('div', { class: ['v-selection-control__wrapper', s.value], style: r.value }, [
							(b = l.default) == null ? void 0 : b.call(l),
							Oe(
								m('div', { class: ['v-selection-control__input'] }, [
									o.value && m(Fe, { key: 'icon', icon: o.value }, null),
									m(
										'input',
										le(
											{
												ref: h,
												checked: i.value,
												disabled: e.disabled,
												id: f.value,
												onBlur: V,
												onFocus: y,
												onInput: p,
												'aria-readonly': e.readonly,
												type: e.type,
												value: u.value,
												name: e.name,
												'aria-checked': e.type === 'checkbox' ? i.value : void 0,
											},
											w,
										),
										null,
									),
									(g = l.input) == null
										? void 0
										: g.call(l, {
												model: i,
												textColorClasses: s,
												textColorStyles: r,
												props: { onFocus: y, onBlur: V, id: f.value },
										  }),
								]),
								[[yt('ripple'), e.ripple && [!e.disabled && !e.readonly, null, ['center', 'circle']]]],
							),
						]),
						x && m(Bl, { for: f.value, clickable: !0 }, { default: () => [x] }),
					],
				);
			}),
			{ isFocused: d, input: h }
		);
	},
});
function Bf(e) {
	return bt(e, Object.keys(Va.props));
}
const Of = de(
		{
			indeterminate: Boolean,
			indeterminateIcon: { type: re, default: '$checkboxIndeterminate' },
			...qo({ falseIcon: '$checkboxOff', trueIcon: '$checkboxOn' }),
		},
		'v-checkbox-btn',
	),
	Ol = q({
		name: 'VCheckboxBtn',
		props: Of(),
		emits: { 'update:modelValue': (e) => !0, 'update:indeterminate': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = he(e, 'indeterminate'),
				a = he(e, 'modelValue');
			function o(r) {
				l.value && (l.value = !1);
			}
			const i = C(() => (e.indeterminate ? e.indeterminateIcon : e.falseIcon)),
				s = C(() => (e.indeterminate ? e.indeterminateIcon : e.trueIcon));
			return (
				K(() =>
					m(
						Va,
						le(e, {
							modelValue: a.value,
							'onUpdate:modelValue': [(r) => (a.value = r), o],
							class: 'v-checkbox-btn',
							type: 'checkbox',
							inline: !0,
							falseIcon: i.value,
							trueIcon: s.value,
							'aria-checked': e.indeterminate ? 'mixed' : void 0,
						}),
						n,
					),
				),
				{}
			);
		},
	});
function N0(e) {
	return bt(e, Object.keys(Ol.props));
}
const D0 = q({
	name: 'VCheckbox',
	inheritAttrs: !1,
	props: { ...fn(), ...Of() },
	emits: { 'update:focused': (e) => !0 },
	setup(e, t) {
		let { attrs: n, slots: l } = t;
		const { isFocused: a, focus: o, blur: i } = Jn(e),
			s = et(),
			r = C(() => e.id || `checkbox-${s}`);
		return (
			K(() => {
				const [u, c] = Wn(n),
					[f, d] = $n(e),
					[v, h] = N0(e);
				return m(Jt, le({ class: 'v-checkbox' }, u, f, { id: r.value, focused: a.value }), {
					...l,
					default: (y) => {
						let { id: V, isDisabled: p, isReadonly: b } = y;
						return m(Ol, le(v, { id: V.value, disabled: p.value, readonly: b.value }, c, { onFocus: o, onBlur: i }), l);
					},
				});
			}),
			{}
		);
	},
});
const j0 = de(
		{
			start: Boolean,
			end: Boolean,
			icon: re,
			image: String,
			...qe(),
			...Ae(),
			...dn(),
			...fe(),
			...ye(),
			...At({ variant: 'flat' }),
		},
		'v-avatar',
	),
	wn = q({
		name: 'VAvatar',
		props: j0(),
		setup(e, t) {
			let { slots: n } = t;
			const { themeClasses: l } = ke(e),
				{ colorClasses: a, colorStyles: o, variantClasses: i } = qn(e),
				{ densityClasses: s } = tt(e),
				{ roundedClasses: r } = Me(e),
				{ sizeClasses: u, sizeStyles: c } = El(e);
			return (
				K(() => {
					var f;
					return m(
						e.tag,
						{
							class: [
								'v-avatar',
								{ 'v-avatar--start': e.start, 'v-avatar--end': e.end },
								l.value,
								a.value,
								s.value,
								r.value,
								u.value,
								i.value,
							],
							style: [o.value, c.value],
						},
						{
							default: () => [
								e.image
									? m(Vl, { key: 'image', src: e.image, alt: '' }, null)
									: e.icon
									? m(Fe, { key: 'icon', icon: e.icon }, null)
									: (f = n.default) == null
									? void 0
									: f.call(n),
								Kn(!1, 'v-avatar'),
							],
						},
					);
				}),
				{}
			);
		},
	});
const Rf = Symbol.for('vuetify:v-chip-group'),
	z0 = q({
		name: 'VChipGroup',
		props: {
			column: Boolean,
			filter: Boolean,
			valueComparator: { type: Function, default: kl },
			...Ll({ selectedClass: 'v-chip--selected' }),
			...fe(),
			...ye(),
			...At({ variant: 'tonal' }),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const { themeClasses: l } = ke(e),
				{ isSelected: a, select: o, next: i, prev: s, selected: r } = Xn(e, Rf);
			return (
				je({ VChip: { color: N(e, 'color'), filter: N(e, 'filter'), variant: N(e, 'variant') } }),
				K(() => {
					var u;
					return m(
						e.tag,
						{ class: ['v-chip-group', { 'v-chip-group--column': e.column }, l.value] },
						{
							default: () => [
								(u = n.default) == null
									? void 0
									: u.call(n, { isSelected: a, select: o, next: i, prev: s, selected: r.value }),
							],
						},
					);
				}),
				{}
			);
		},
	}),
	La = q({
		name: 'VChip',
		directives: { Ripple: xn },
		props: {
			activeClass: String,
			appendAvatar: String,
			appendIcon: re,
			closable: Boolean,
			closeIcon: { type: re, default: '$delete' },
			closeLabel: { type: String, default: '$vuetify.close' },
			draggable: Boolean,
			filter: Boolean,
			filterIcon: { type: String, default: '$complete' },
			label: Boolean,
			link: Boolean,
			pill: Boolean,
			prependAvatar: String,
			prependIcon: re,
			ripple: { type: Boolean, default: !0 },
			text: String,
			modelValue: { type: Boolean, default: !0 },
			..._t(),
			...qe(),
			...Ue(),
			...Yn(),
			...Ae(),
			...Pl(),
			...dn(),
			...fe({ tag: 'span' }),
			...ye(),
			...At({ variant: 'tonal' }),
		},
		emits: { 'click:close': (e) => !0, 'update:modelValue': (e) => !0, 'group:selected': (e) => !0, click: (e) => !0 },
		setup(e, t) {
			let { attrs: n, emit: l, slots: a } = t;
			const { borderClasses: o } = Tt(e),
				{ colorClasses: i, colorStyles: s, variantClasses: r } = qn(e),
				{ densityClasses: u } = tt(e),
				{ elevationClasses: c } = Xe(e),
				{ roundedClasses: f } = Me(e),
				{ sizeClasses: d } = El(e),
				{ themeClasses: v } = ke(e),
				h = he(e, 'modelValue'),
				y = Il(e, Rf, !1),
				V = ka(e, n),
				p = C(() => !e.disabled && (!!y || V.isClickable.value || e.link));
			function b(x) {
				(h.value = !1), l('click:close', x);
			}
			function g(x) {
				var S;
				l('click', x), p.value && ((S = V.navigate) == null || S.call(V, x), y == null || y.toggle());
			}
			return () => {
				var x;
				const S = V.isLink.value ? 'a' : e.tag,
					w = !!(a.append || e.appendIcon || e.appendAvatar),
					k = !!(a.close || e.closable),
					_ = !!(a.filter || e.filter) && y,
					L = !!(a.prepend || e.prependIcon || e.prependAvatar),
					$ = !y || y.isSelected.value;
				return (
					h.value &&
					Oe(
						m(
							S,
							{
								class: [
									'v-chip',
									{
										'v-chip--disabled': e.disabled,
										'v-chip--label': e.label,
										'v-chip--link': p.value,
										'v-chip--filter': _,
										'v-chip--pill': e.pill,
									},
									v.value,
									o.value,
									$ ? i.value : void 0,
									u.value,
									c.value,
									f.value,
									d.value,
									r.value,
									y == null ? void 0 : y.selectedClass.value,
								],
								style: [$ ? s.value : void 0],
								disabled: e.disabled || void 0,
								draggable: e.draggable,
								href: V.href.value,
								onClick: g,
							},
							{
								default: () => {
									var T;
									return [
										Kn(p.value, 'v-chip'),
										_ &&
											m(
												$e,
												{ key: 'filter', defaults: { VIcon: { icon: e.filterIcon } } },
												{
													default: () => [
														m(Ys, null, {
															default: () => [
																Oe(m('div', { class: 'v-chip__filter' }, [a.filter ? a.filter() : m(Fe, null, null)]), [
																	[Zt, y.isSelected.value],
																]),
															],
														}),
													],
												},
											),
										L &&
											m(
												$e,
												{
													key: 'prepend',
													defaults: { VAvatar: { image: e.prependAvatar }, VIcon: { icon: e.prependIcon } },
												},
												{
													default: () => [
														a.prepend
															? m('div', { class: 'v-chip__prepend' }, [a.prepend()])
															: e.prependAvatar
															? m(wn, { start: !0 }, null)
															: e.prependIcon
															? m(Fe, { start: !0 }, null)
															: void 0,
													],
												},
											),
										(T =
											(x = a.default) == null
												? void 0
												: x.call(a, {
														isSelected: y == null ? void 0 : y.isSelected.value,
														selectedClass: y == null ? void 0 : y.selectedClass.value,
														select: y == null ? void 0 : y.select,
														toggle: y == null ? void 0 : y.toggle,
														value: y == null ? void 0 : y.value.value,
														disabled: e.disabled,
												  })) != null
											? T
											: e.text,
										w &&
											m(
												$e,
												{
													key: 'append',
													defaults: { VAvatar: { image: e.appendAvatar }, VIcon: { icon: e.appendIcon } },
												},
												{
													default: () => [
														a.append
															? m('div', { class: 'v-chip__append' }, [a.append()])
															: e.appendAvatar
															? m(wn, { end: !0 }, null)
															: e.appendIcon
															? m(Fe, { end: !0 }, null)
															: void 0,
													],
												},
											),
										k &&
											m(
												$e,
												{ key: 'close', defaults: { VIcon: { icon: e.closeIcon, size: 'x-small' } } },
												{
													default: () => [
														m('div', { class: 'v-chip__close', onClick: b }, [a.close ? a.close() : m(Fe, null, null)]),
													],
												},
											),
									];
								},
							},
						),
						[[yt('ripple'), p.value && e.ripple, null]],
					)
				);
			};
		},
	});
const Mf = q({
		name: 'VDivider',
		props: {
			color: String,
			inset: Boolean,
			length: [Number, String],
			thickness: [Number, String],
			vertical: Boolean,
			...ye(),
		},
		setup(e, t) {
			let { attrs: n } = t;
			const { themeClasses: l } = ke(e),
				{ backgroundColorClasses: a, backgroundColorStyles: o } = Re(N(e, 'color')),
				i = C(() => {
					const s = {};
					return (
						e.length && (s[e.vertical ? 'maxHeight' : 'maxWidth'] = ee(e.length)),
						e.thickness && (s[e.vertical ? 'borderRightWidth' : 'borderTopWidth'] = ee(e.thickness)),
						s
					);
				});
			return (
				K(() =>
					m(
						'hr',
						{
							class: [
								{ 'v-divider': !0, 'v-divider--inset': e.inset, 'v-divider--vertical': e.vertical },
								l.value,
								a.value,
							],
							style: [i.value, o.value],
							'aria-orientation': !n.role || n.role === 'separator' ? (e.vertical ? 'vertical' : 'horizontal') : void 0,
							role: `${n.role || 'separator'}`,
						},
						null,
					),
				),
				{}
			);
		},
	}),
	ts = Symbol.for('vuetify:list');
function Ff() {
	const e = we(ts, { hasPrepend: R(!1), updateHasPrepend: () => null }),
		t = {
			hasPrepend: R(!1),
			updateHasPrepend: (n) => {
				n && (t.hasPrepend.value = n);
			},
		};
	return ze(ts, t), e;
}
function Hf() {
	return we(ts, null);
}
const U0 = {
		open: (e) => {
			let { id: t, value: n, opened: l, parents: a } = e;
			if (n) {
				const o = new Set();
				o.add(t);
				let i = a.get(t);
				for (; i != null; ) o.add(i), (i = a.get(i));
				return o;
			} else return l.delete(t), l;
		},
		select: () => null,
	},
	Nf = {
		open: (e) => {
			let { id: t, value: n, opened: l, parents: a } = e;
			if (n) {
				let o = a.get(t);
				for (l.add(t); o != null && o !== t; ) l.add(o), (o = a.get(o));
				return l;
			} else l.delete(t);
			return l;
		},
		select: () => null,
	},
	W0 = {
		open: Nf.open,
		select: (e) => {
			let { id: t, value: n, opened: l, parents: a } = e;
			if (!n) return l;
			const o = [];
			let i = a.get(t);
			for (; i != null; ) o.push(i), (i = a.get(i));
			return new Set(o);
		},
	},
	or = (e) => {
		const t = {
			select: (n) => {
				let { id: l, value: a, selected: o } = n;
				if (e && !a) {
					const i = Array.from(o.entries()).reduce((s, r) => {
						let [u, c] = r;
						return c === 'on' ? [...s, u] : s;
					}, []);
					if (i.length === 1 && i[0] === l) return o;
				}
				return o.set(l, a ? 'on' : 'off'), o;
			},
			in: (n, l, a) => {
				let o = new Map();
				for (const i of n || []) o = t.select({ id: i, value: !0, selected: new Map(o), children: l, parents: a });
				return o;
			},
			out: (n) => {
				const l = [];
				for (const [a, o] of n.entries()) o === 'on' && l.push(a);
				return l;
			},
		};
		return t;
	},
	Df = (e) => {
		const t = or(e);
		return {
			select: (l) => {
				let { selected: a, id: o, ...i } = l;
				const s = a.has(o) ? new Map([[o, a.get(o)]]) : new Map();
				return t.select({ ...i, id: o, selected: s });
			},
			in: (l, a, o) => {
				let i = new Map();
				return l != null && l.length && (i = t.in(l.slice(0, 1), a, o)), i;
			},
			out: (l, a, o) => t.out(l, a, o),
		};
	},
	K0 = (e) => {
		const t = or(e);
		return {
			select: (l) => {
				let { id: a, selected: o, children: i, ...s } = l;
				return i.has(a) ? o : t.select({ id: a, selected: o, children: i, ...s });
			},
			in: t.in,
			out: t.out,
		};
	},
	q0 = (e) => {
		const t = Df(e);
		return {
			select: (l) => {
				let { id: a, selected: o, children: i, ...s } = l;
				return i.has(a) ? o : t.select({ id: a, selected: o, children: i, ...s });
			},
			in: t.in,
			out: t.out,
		};
	},
	Y0 = (e) => {
		const t = {
			select: (n) => {
				let { id: l, value: a, selected: o, children: i, parents: s } = n;
				const r = new Map(o),
					u = [l];
				for (; u.length; ) {
					const f = u.shift();
					o.set(f, a ? 'on' : 'off'), i.has(f) && u.push(...i.get(f));
				}
				let c = s.get(l);
				for (; c; ) {
					const f = i.get(c),
						d = f.every((h) => o.get(h) === 'on'),
						v = f.every((h) => !o.has(h) || o.get(h) === 'off');
					o.set(c, d ? 'on' : v ? 'off' : 'indeterminate'), (c = s.get(c));
				}
				return e &&
					!a &&
					Array.from(o.entries()).reduce((d, v) => {
						let [h, y] = v;
						return y === 'on' ? [...d, h] : d;
					}, []).length === 0
					? r
					: o;
			},
			in: (n, l, a) => {
				let o = new Map();
				for (const i of n || []) o = t.select({ id: i, value: !0, selected: new Map(o), children: l, parents: a });
				return o;
			},
			out: (n, l) => {
				const a = [];
				for (const [o, i] of n.entries()) i === 'on' && !l.has(o) && a.push(o);
				return a;
			},
		};
		return t;
	},
	ma = Symbol.for('vuetify:nested'),
	jf = {
		id: R(),
		root: {
			register: () => null,
			unregister: () => null,
			parents: R(new Map()),
			children: R(new Map()),
			open: () => null,
			openOnSelect: () => null,
			select: () => null,
			opened: R(new Set()),
			selected: R(new Map()),
			selectedValues: R([]),
		},
	},
	X0 = de(
		{
			selectStrategy: [String, Function],
			openStrategy: [String, Object],
			opened: Array,
			selected: Array,
			mandatory: Boolean,
		},
		'nested',
	),
	G0 = (e) => {
		let t = !1;
		const n = R(new Map()),
			l = R(new Map()),
			a = he(
				e,
				'opened',
				e.opened,
				(f) => new Set(f),
				(f) => [...f.values()],
			),
			o = C(() => {
				if (typeof e.selectStrategy == 'object') return e.selectStrategy;
				switch (e.selectStrategy) {
					case 'single-leaf':
						return q0(e.mandatory);
					case 'leaf':
						return K0(e.mandatory);
					case 'independent':
						return or(e.mandatory);
					case 'single-independent':
						return Df(e.mandatory);
					case 'classic':
					default:
						return Y0(e.mandatory);
				}
			}),
			i = C(() => {
				if (typeof e.openStrategy == 'object') return e.openStrategy;
				switch (e.openStrategy) {
					case 'list':
						return W0;
					case 'single':
						return U0;
					case 'multiple':
					default:
						return Nf;
				}
			}),
			s = he(
				e,
				'selected',
				e.selected,
				(f) => o.value.in(f, n.value, l.value),
				(f) => o.value.out(f, n.value, l.value),
			);
		Je(() => {
			t = !0;
		});
		function r(f) {
			const d = [];
			let v = f;
			for (; v != null; ) d.unshift(v), (v = l.value.get(v));
			return d;
		}
		const u = Qe('nested'),
			c = {
				id: R(),
				root: {
					opened: a,
					selected: s,
					selectedValues: C(() => {
						const f = [];
						for (const [d, v] of s.value.entries()) v === 'on' && f.push(d);
						return f;
					}),
					register: (f, d, v) => {
						d && f !== d && l.value.set(f, d),
							v && n.value.set(f, []),
							d != null && n.value.set(d, [...(n.value.get(d) || []), f]);
					},
					unregister: (f) => {
						var v;
						if (t) return;
						n.value.delete(f);
						const d = l.value.get(f);
						if (d) {
							const h = (v = n.value.get(d)) != null ? v : [];
							n.value.set(
								d,
								h.filter((y) => y !== f),
							);
						}
						l.value.delete(f), a.value.delete(f);
					},
					open: (f, d, v) => {
						u.emit('click:open', { id: f, value: d, path: r(f), event: v });
						const h = i.value.open({
							id: f,
							value: d,
							opened: new Set(a.value),
							children: n.value,
							parents: l.value,
							event: v,
						});
						h && (a.value = h);
					},
					openOnSelect: (f, d, v) => {
						const h = i.value.select({
							id: f,
							value: d,
							selected: new Map(s.value),
							opened: new Set(a.value),
							children: n.value,
							parents: l.value,
							event: v,
						});
						h && (a.value = h);
					},
					select: (f, d, v) => {
						u.emit('click:select', { id: f, value: d, path: r(f), event: v });
						const h = o.value.select({
							id: f,
							value: d,
							selected: new Map(s.value),
							children: n.value,
							parents: l.value,
							event: v,
						});
						h && (s.value = h), c.root.openOnSelect(f, d, v);
					},
					children: n,
					parents: l,
				},
			};
		return ze(ma, c), c.root;
	},
	zf = (e, t) => {
		const n = we(ma, jf),
			l = C(() => {
				var o;
				return (o = e.value) != null ? o : Symbol(et());
			}),
			a = {
				...n,
				id: l,
				open: (o, i) => n.root.open(l.value, o, i),
				openOnSelect: (o, i) => n.root.openOnSelect(l.value, o, i),
				isOpen: C(() => n.root.opened.value.has(l.value)),
				parent: C(() => n.root.parents.value.get(l.value)),
				select: (o, i) => n.root.select(l.value, o, i),
				isSelected: C(() => n.root.selected.value.get(l.value) === 'on'),
				isIndeterminate: C(() => n.root.selected.value.get(l.value) === 'indeterminate'),
				isLeaf: C(() => !n.root.children.value.get(l.value)),
				isGroupActivator: n.isGroupActivator,
			};
		return (
			!n.isGroupActivator && n.root.register(l.value, n.id.value, t),
			Je(() => {
				!n.isGroupActivator && n.root.unregister(l.value);
			}),
			t && ze(ma, a),
			a
		);
	},
	Z0 = () => {
		const e = we(ma, jf);
		ze(ma, { ...e, isGroupActivator: !0 });
	},
	J0 = q({
		name: 'VListGroupActivator',
		setup(e, t) {
			let { slots: n } = t;
			return (
				Z0(),
				() => {
					var l;
					return (l = n.default) == null ? void 0 : l.call(n);
				}
			);
		},
	}),
	Q0 = de(
		{
			activeColor: String,
			color: String,
			collapseIcon: { type: re, default: '$collapse' },
			expandIcon: { type: re, default: '$expand' },
			prependIcon: re,
			appendIcon: re,
			fluid: Boolean,
			subgroup: Boolean,
			value: null,
			...fe(),
		},
		'v-list-group',
	),
	ir = Ie()({
		name: 'VListGroup',
		props: { title: String, ...Q0() },
		setup(e, t) {
			let { slots: n } = t;
			const { isOpen: l, open: a, id: o } = zf(N(e, 'value'), !0),
				i = C(() => `v-list-group--id-${String(o.value)}`),
				s = Hf();
			function r(f) {
				a(!l.value, f);
			}
			const u = C(() => ({ onClick: r, class: 'v-list-group__header', id: i.value })),
				c = C(() => (l.value ? e.collapseIcon : e.expandIcon));
			return (
				K(() => {
					var f;
					return m(
						e.tag,
						{
							class: [
								'v-list-group',
								{
									'v-list-group--prepend': s == null ? void 0 : s.hasPrepend.value,
									'v-list-group--fluid': e.fluid,
									'v-list-group--subgroup': e.subgroup,
									'v-list-group--open': l.value,
								},
							],
						},
						{
							default: () => [
								n.activator &&
									m(
										$e,
										{
											defaults: {
												VListItem: {
													active: l.value,
													activeColor: e.activeColor,
													color: e.color,
													prependIcon: e.prependIcon || (e.subgroup && c.value),
													appendIcon: e.appendIcon || (!e.subgroup && c.value),
													title: e.title,
													value: e.value,
												},
											},
										},
										{ default: () => [m(J0, null, { default: () => [n.activator({ props: u.value, isOpen: l })] })] },
									),
								m(Do, null, {
									default: () => [
										Oe(
											m('div', { class: 'v-list-group__items', role: 'group', 'aria-labelledby': i.value }, [
												(f = n.default) == null ? void 0 : f.call(n),
											]),
											[[Zt, l.value]],
										),
									],
								}),
							],
						},
					);
				}),
				{}
			);
		},
	});
function e1(e) {
	return bt(e, Object.keys(ir.props));
}
const Uf = Et('v-list-item-subtitle'),
	Wf = Et('v-list-item-title'),
	an = Ie()({
		name: 'VListItem',
		directives: { Ripple: xn },
		props: {
			active: { type: Boolean, default: void 0 },
			activeClass: String,
			activeColor: String,
			appendAvatar: String,
			appendIcon: re,
			disabled: Boolean,
			lines: String,
			link: { type: Boolean, default: void 0 },
			nav: Boolean,
			prependAvatar: String,
			prependIcon: re,
			subtitle: [String, Number, Boolean],
			title: [String, Number, Boolean],
			value: null,
			onClick: Dn,
			onClickOnce: Dn,
			..._t(),
			...qe(),
			...Ht(),
			...Ue(),
			...Ae(),
			...Pl(),
			...fe(),
			...ye(),
			...At({ variant: 'text' }),
		},
		emits: { click: (e) => !0 },
		setup(e, t) {
			let { attrs: n, slots: l, emit: a } = t;
			const o = ka(e, n),
				i = C(() => {
					var P;
					return (P = e.value) != null ? P : o.href.value;
				}),
				{
					select: s,
					isSelected: r,
					isIndeterminate: u,
					isGroupActivator: c,
					root: f,
					parent: d,
					openOnSelect: v,
				} = zf(i, !1),
				h = Hf(),
				y = C(() => {
					var P;
					return e.active !== !1 && (e.active || ((P = o.isActive) == null ? void 0 : P.value) || r.value);
				}),
				V = C(() => e.link !== !1 && o.isLink.value),
				p = C(() => !e.disabled && e.link !== !1 && (e.link || o.isClickable.value || (e.value != null && !!h))),
				b = C(() => e.rounded || e.nav),
				g = C(() => {
					var P;
					return { color: y.value && (P = e.activeColor) != null ? P : e.color, variant: e.variant };
				});
			ae(
				() => {
					var P;
					return (P = o.isActive) == null ? void 0 : P.value;
				},
				(P) => {
					P && d.value != null && f.open(d.value, !0), P && v(P);
				},
				{ immediate: !0 },
			);
			const { themeClasses: x } = ke(e),
				{ borderClasses: S } = Tt(e),
				{ colorClasses: w, colorStyles: k, variantClasses: _ } = qn(g),
				{ densityClasses: L } = tt(e),
				{ dimensionStyles: $ } = Nt(e),
				{ elevationClasses: T } = Xe(e),
				{ roundedClasses: E } = Me(b),
				O = C(() => (e.lines ? `v-list-item--${e.lines}-line` : void 0)),
				B = C(() => ({ isActive: y.value, select: s, isSelected: r.value, isIndeterminate: u.value }));
			function D(P) {
				var H;
				a('click', P),
					!(c || !p.value) && ((H = o.navigate) == null || H.call(o, P), e.value != null && s(!r.value, P));
			}
			function M(P) {
				(P.key === 'Enter' || P.key === ' ') && (P.preventDefault(), D(P));
			}
			return (
				K(() => {
					var P, H, U, Y, Q;
					const ne = V.value ? 'a' : e.tag,
						be = !h || r.value || y.value,
						J = l.title || e.title,
						_e = l.subtitle || e.subtitle,
						ue = !!(l.append || e.appendAvatar || e.appendIcon),
						Ne = !!(l.prepend || e.prependAvatar || e.prependIcon);
					return (
						h == null || h.updateHasPrepend(Ne),
						Oe(
							m(
								ne,
								{
									class: [
										'v-list-item',
										{
											'v-list-item--active': y.value,
											'v-list-item--disabled': e.disabled,
											'v-list-item--link': p.value,
											'v-list-item--nav': e.nav,
											'v-list-item--prepend': !Ne && (h == null ? void 0 : h.hasPrepend.value),
											[`${e.activeClass}`]: e.activeClass && y.value,
										},
										x.value,
										S.value,
										be ? w.value : void 0,
										L.value,
										T.value,
										O.value,
										E.value,
										_.value,
									],
									style: [be ? k.value : void 0, $.value],
									href: o.href.value,
									tabindex: p.value ? 0 : void 0,
									onClick: D,
									onKeydown: p.value && !V.value && M,
								},
								{
									default: () => [
										Kn(p.value || y.value, 'v-list-item'),
										Ne &&
											m(
												$e,
												{
													key: 'prepend',
													defaults: {
														VAvatar: { density: e.density, image: e.prependAvatar },
														VIcon: { density: e.density, icon: e.prependIcon },
														VListItemAction: { start: !0 },
													},
												},
												{
													default: () => [
														m('div', { class: 'v-list-item__prepend' }, [
															e.prependAvatar && m(wn, { key: 'prepend-avatar' }, null),
															e.prependIcon && m(Fe, { key: 'prepend-icon' }, null),
															(P = l.prepend) == null ? void 0 : P.call(l, B.value),
														]),
													],
												},
											),
										m('div', { class: 'v-list-item__content', 'data-no-activator': '' }, [
											J &&
												m(
													Wf,
													{ key: 'title' },
													{
														default: () => {
															var ut;
															return [
																(ut = (H = l.title) == null ? void 0 : H.call(l, { title: e.title })) != null
																	? ut
																	: e.title,
															];
														},
													},
												),
											_e &&
												m(
													Uf,
													{ key: 'subtitle' },
													{
														default: () => {
															var ut;
															return [
																(ut = (U = l.subtitle) == null ? void 0 : U.call(l, { subtitle: e.subtitle })) != null
																	? ut
																	: e.subtitle,
															];
														},
													},
												),
											(Y = l.default) == null ? void 0 : Y.call(l, B.value),
										]),
										ue &&
											m(
												$e,
												{
													key: 'append',
													defaults: {
														VAvatar: { density: e.density, image: e.appendAvatar },
														VIcon: { density: e.density, icon: e.appendIcon },
														VListItemAction: { end: !0 },
													},
												},
												{
													default: () => [
														m('div', { class: 'v-list-item__append' }, [
															(Q = l.append) == null ? void 0 : Q.call(l, B.value),
															e.appendIcon && m(Fe, { key: 'append-icon' }, null),
															e.appendAvatar && m(wn, { key: 'append-avatar' }, null),
														]),
													],
												},
											),
									],
								},
							),
							[[yt('ripple'), p.value]],
						)
					);
				}),
				{}
			);
		},
	}),
	Kf = q({
		name: 'VListSubheader',
		props: { color: String, inset: Boolean, sticky: Boolean, title: String, ...fe() },
		setup(e, t) {
			let { slots: n } = t;
			const { textColorClasses: l, textColorStyles: a } = rt(N(e, 'color'));
			return (
				K(() => {
					var o;
					const i = !!(n.default || e.title);
					return m(
						e.tag,
						{
							class: [
								'v-list-subheader',
								{ 'v-list-subheader--inset': e.inset, 'v-list-subheader--sticky': e.sticky },
								l.value,
							],
							style: { textColorStyles: a },
						},
						{
							default: () => {
								var s;
								return [
									i &&
										m('div', { class: 'v-list-subheader__text' }, [
											(s = (o = n.default) == null ? void 0 : o.call(n)) != null ? s : e.title,
										]),
								];
							},
						},
					);
				}),
				{}
			);
		},
	}),
	qf = Ie()({
		name: 'VListChildren',
		props: { items: Array },
		setup(e, t) {
			let { slots: n } = t;
			return (
				Ff(),
				() => {
					var o;
					var l, a;
					return (o = (l = n.default) == null ? void 0 : l.call(n)) != null
						? o
						: (a = e.items) == null
						? void 0
						: a.map((i) => {
								var V, p;
								let { children: s, props: r, type: u, raw: c } = i;
								if (u === 'divider') {
									var f;
									return (V = (f = n.divider) == null ? void 0 : f.call(n, { props: r })) != null ? V : m(Mf, r, null);
								}
								if (u === 'subheader') {
									var d;
									return (p = (d = n.subheader) == null ? void 0 : d.call(n, { props: r })) != null
										? p
										: m(Kf, r, { default: n.subheader });
								}
								const v = {
										subtitle: n.subtitle
											? (b) => {
													var g;
													return (g = n.subtitle) == null ? void 0 : g.call(n, { ...b, item: c });
											  }
											: void 0,
										prepend: n.prepend
											? (b) => {
													var g;
													return (g = n.prepend) == null ? void 0 : g.call(n, { ...b, item: c });
											  }
											: void 0,
										append: n.append
											? (b) => {
													var g;
													return (g = n.append) == null ? void 0 : g.call(n, { ...b, item: c });
											  }
											: void 0,
										default: n.default
											? (b) => {
													var g;
													return (g = n.default) == null ? void 0 : g.call(n, { ...b, item: c });
											  }
											: void 0,
										title: n.title
											? (b) => {
													var g;
													return (g = n.title) == null ? void 0 : g.call(n, { ...b, item: c });
											  }
											: void 0,
									},
									[h, y] = e1(r);
								return s
									? m(ir, le({ value: r == null ? void 0 : r.value }, h), {
											activator: (b) => {
												let { props: g } = b;
												return n.header ? n.header({ ...r, ...g }) : m(an, le(r, g), v);
											},
											default: () => m(qf, { items: s }, n),
									  })
									: n.item
									? n.item(r)
									: m(an, r, v);
						  });
				}
			);
		},
	}),
	Yf = de(
		{
			items: { type: Array, default: () => [] },
			itemTitle: { type: [String, Array, Function], default: 'title' },
			itemValue: { type: [String, Array, Function], default: 'value' },
			itemChildren: { type: [Boolean, String, Array, Function], default: 'children' },
			itemProps: { type: [Boolean, String, Array, Function], default: 'props' },
			returnObject: Boolean,
		},
		'item',
	);
function ol(e, t) {
	var s;
	const n = qt(t, e.itemTitle, t),
		l = e.returnObject ? t : qt(t, e.itemValue, n),
		a = qt(t, e.itemChildren),
		o =
			e.itemProps === !0
				? typeof t == 'object' && t != null && !Array.isArray(t)
					? 'children' in t
						? bt(t, ['children'])[1]
						: t
					: void 0
				: qt(t, e.itemProps),
		i = { title: n, value: l, ...o };
	return {
		title: String((s = i.title) != null ? s : ''),
		value: i.value,
		props: i,
		children: Array.isArray(a) ? Xf(e, a) : void 0,
		raw: t,
	};
}
function Xf(e, t) {
	const n = [];
	for (const l of t) n.push(ol(e, l));
	return n;
}
function sr(e) {
	const t = C(() => Xf(e, e.items));
	function n(a) {
		return a.map((o) => ol(e, o));
	}
	function l(a) {
		return a.map((o) => {
			let { props: i } = o;
			return i.value;
		});
	}
	return { items: t, transformIn: n, transformOut: l };
}
function t1(e, t) {
	const n = qt(t, e.itemType, 'item'),
		l = typeof t == 'string' ? t : qt(t, e.itemTitle),
		a = qt(t, e.itemValue, void 0),
		o = qt(t, e.itemChildren),
		i = e.itemProps === !0 ? bt(t, ['children'])[1] : qt(t, e.itemProps),
		s = { title: l, value: a, ...i };
	return { type: n, title: s.title, value: s.value, props: s, children: n === 'item' && o ? Gf(e, o) : void 0, raw: t };
}
function Gf(e, t) {
	const n = [];
	for (const l of t) n.push(t1(e, l));
	return n;
}
function n1(e) {
	return { items: C(() => Gf(e, e.items)) };
}
const Yo = Ie()({
		name: 'VList',
		props: {
			activeColor: String,
			activeClass: String,
			bgColor: String,
			disabled: Boolean,
			lines: { type: [Boolean, String], default: 'one' },
			nav: Boolean,
			...X0({ selectStrategy: 'single-leaf', openStrategy: 'list' }),
			..._t(),
			...qe(),
			...Ht(),
			...Ue(),
			itemType: { type: String, default: 'type' },
			...Yf(),
			...Ae(),
			...fe(),
			...ye(),
			...At({ variant: 'text' }),
		},
		emits: {
			'update:selected': (e) => !0,
			'update:opened': (e) => !0,
			'click:open': (e) => !0,
			'click:select': (e) => !0,
		},
		setup(e, t) {
			let { slots: n } = t;
			const { items: l } = n1(e),
				{ themeClasses: a } = ke(e),
				{ backgroundColorClasses: o, backgroundColorStyles: i } = Re(N(e, 'bgColor')),
				{ borderClasses: s } = Tt(e),
				{ densityClasses: r } = tt(e),
				{ dimensionStyles: u } = Nt(e),
				{ elevationClasses: c } = Xe(e),
				{ roundedClasses: f } = Me(e),
				{ open: d, select: v } = G0(e),
				h = C(() => (e.lines ? `v-list--${e.lines}-line` : void 0)),
				y = N(e, 'activeColor'),
				V = N(e, 'color');
			Ff(),
				je({
					VListGroup: { activeColor: y, color: V },
					VListItem: {
						activeClass: N(e, 'activeClass'),
						activeColor: y,
						color: V,
						density: N(e, 'density'),
						disabled: N(e, 'disabled'),
						lines: N(e, 'lines'),
						nav: N(e, 'nav'),
						variant: N(e, 'variant'),
					},
				});
			const p = R(!1),
				b = R();
			function g(_) {
				p.value = !0;
			}
			function x(_) {
				p.value = !1;
			}
			function S(_) {
				var L;
				!p.value && !(_.relatedTarget && (L = b.value) != null && L.contains(_.relatedTarget)) && k();
			}
			function w(_) {
				if (!!b.value) {
					if (_.key === 'ArrowDown') k('next');
					else if (_.key === 'ArrowUp') k('prev');
					else if (_.key === 'Home') k('first');
					else if (_.key === 'End') k('last');
					else return;
					_.preventDefault();
				}
			}
			function k(_) {
				if (!b.value) return;
				const L = [
						...b.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
					].filter((B) => !B.hasAttribute('disabled')),
					$ = L.indexOf(document.activeElement);
				if (_)
					if (_ === 'first') {
						var E;
						(E = L[0]) == null || E.focus();
					} else if (_ === 'last') {
						var O;
						(O = L.at(-1)) == null || O.focus();
					} else {
						let B,
							D = $;
						const M = _ === 'next' ? 1 : -1;
						do (D += M), (B = L[D]);
						while ((!B || B.offsetParent == null) && D < L.length && D >= 0);
						B ? B.focus() : k(_ === 'next' ? 'first' : 'last');
					}
				else if (!b.value.contains(document.activeElement)) {
					var T;
					(T = L[0]) == null || T.focus();
				}
			}
			return (
				K(() =>
					m(
						e.tag,
						{
							ref: b,
							class: [
								'v-list',
								{ 'v-list--disabled': e.disabled, 'v-list--nav': e.nav },
								a.value,
								o.value,
								s.value,
								r.value,
								c.value,
								h.value,
								f.value,
							],
							style: [i.value, u.value],
							role: 'listbox',
							'aria-activedescendant': void 0,
							onFocusin: g,
							onFocusout: x,
							onFocus: S,
							onKeydown: w,
						},
						{ default: () => [m(qf, { items: l.value }, n)] },
					),
				),
				{ open: d, select: v, focus: k }
			);
		},
	}),
	l1 = Et('v-list-img'),
	a1 = q({
		name: 'VListItemAction',
		props: { start: Boolean, end: Boolean, ...fe() },
		setup(e, t) {
			let { slots: n } = t;
			return (
				K(() =>
					m(
						e.tag,
						{
							class: ['v-list-item-action', { 'v-list-item-action--start': e.start, 'v-list-item-action--end': e.end }],
						},
						n,
					),
				),
				{}
			);
		},
	}),
	o1 = q({
		name: 'VListItemMedia',
		props: { start: Boolean, end: Boolean, ...fe() },
		setup(e, t) {
			let { slots: n } = t;
			return (
				K(() =>
					m(
						e.tag,
						{ class: ['v-list-item-media', { 'v-list-item-media--start': e.start, 'v-list-item-media--end': e.end }] },
						n,
					),
				),
				{}
			);
		},
	});
const Zf = de({ closeDelay: [Number, String], openDelay: [Number, String] }, 'delay');
function Jf(e, t) {
	const n = {},
		l = (a) => () => {
			if (!Be) return Promise.resolve(!0);
			const o = a === 'openDelay';
			return (
				n.closeDelay && window.clearTimeout(n.closeDelay),
				delete n.closeDelay,
				n.openDelay && window.clearTimeout(n.openDelay),
				delete n.openDelay,
				new Promise((i) => {
					var r;
					const s = parseInt((r = e[a]) != null ? r : 0, 10);
					n[a] = window.setTimeout(() => {
						t == null || t(o), i(o);
					}, s);
				})
			);
		};
	return { runCloseDelay: l('closeDelay'), runOpenDelay: l('openDelay') };
}
const ns = Symbol.for('vuetify:v-menu'),
	i1 = de(
		{
			activator: [String, Object],
			activatorProps: { type: Object, default: () => ({}) },
			openOnClick: { type: Boolean, default: void 0 },
			openOnHover: Boolean,
			openOnFocus: { type: Boolean, default: void 0 },
			closeOnContentClick: Boolean,
			...Zf(),
		},
		'v-overlay-activator',
	);
function s1(e, t) {
	let { isActive: n, isTop: l } = t;
	const a = R();
	let o = !1,
		i = !1,
		s = !0;
	const r = C(() => e.openOnFocus || (e.openOnFocus == null && e.openOnHover)),
		u = C(() => e.openOnClick || (e.openOnClick == null && !e.openOnHover && !r.value)),
		{ runOpenDelay: c, runCloseDelay: f } = Jf(e, (g) => {
			g === ((e.openOnHover && o) || (r.value && i)) &&
				!(e.openOnHover && n.value && !l.value) &&
				(n.value !== g && (s = !0), (n.value = g));
		}),
		d = {
			click: (g) => {
				g.stopPropagation(), (a.value = g.currentTarget || g.target), (n.value = !n.value);
			},
			mouseenter: (g) => {
				(o = !0), (a.value = g.currentTarget || g.target), c();
			},
			mouseleave: (g) => {
				(o = !1), f();
			},
			focus: (g) => {
				(Xi && !g.target.matches(':focus-visible')) ||
					((i = !0), g.stopPropagation(), (a.value = g.currentTarget || g.target), c());
			},
			blur: (g) => {
				(i = !1), g.stopPropagation(), f();
			},
		},
		v = C(() => {
			const g = {};
			return (
				u.value && (g.click = d.click),
				e.openOnHover && ((g.mouseenter = d.mouseenter), (g.mouseleave = d.mouseleave)),
				r.value && ((g.focus = d.focus), (g.blur = d.blur)),
				g
			);
		}),
		h = C(() => {
			const g = {};
			if (
				(e.openOnHover &&
					((g.mouseenter = () => {
						(o = !0), c();
					}),
					(g.mouseleave = () => {
						(o = !1), f();
					})),
				e.closeOnContentClick)
			) {
				const x = we(ns, null);
				g.click = () => {
					(n.value = !1), x == null || x.closeParents();
				};
			}
			return g;
		}),
		y = C(() => {
			const g = {};
			return (
				e.openOnHover &&
					((g.mouseenter = () => {
						s && ((o = !0), (s = !1), c());
					}),
					(g.mouseleave = () => {
						(o = !1), f();
					})),
				g
			);
		});
	ae(l, (g) => {
		g && ((e.openOnHover && !o && (!r.value || !i)) || (r.value && !i && (!e.openOnHover || !o))) && (n.value = !1);
	});
	const V = R();
	Mt(() => {
		!V.value ||
			Te(() => {
				const g = V.value;
				a.value = Yb(g) ? g.$el : g;
			});
	});
	const p = Qe('useActivator');
	let b;
	return (
		ae(
			() => !!e.activator,
			(g) => {
				g && Be
					? ((b = xo()),
					  b.run(() => {
							r1(e, p, { activatorEl: a, activatorEvents: v });
					  }))
					: b && b.stop();
			},
			{ flush: 'post', immediate: !0 },
		),
		Gt(() => {
			var g;
			(g = b) == null || g.stop();
		}),
		{ activatorEl: a, activatorRef: V, activatorEvents: v, contentEvents: h, scrimEvents: y }
	);
}
function r1(e, t, n) {
	let { activatorEl: l, activatorEvents: a } = n;
	ae(
		() => e.activator,
		(r, u) => {
			if (u && r !== u) {
				const c = s(u);
				c && i(c);
			}
			r && Te(() => o());
		},
		{ immediate: !0 },
	),
		ae(
			() => e.activatorProps,
			() => {
				o();
			},
		),
		Gt(() => {
			i();
		});
	function o() {
		let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(),
			u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
		!r ||
			(Object.entries(a.value).forEach((c) => {
				let [f, d] = c;
				r.addEventListener(f, d);
			}),
			Object.keys(u).forEach((c) => {
				u[c] == null ? r.removeAttribute(c) : r.setAttribute(c, u[c]);
			}));
	}
	function i() {
		let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : s(),
			u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
		!r ||
			(Object.entries(a.value).forEach((c) => {
				let [f, d] = c;
				r.removeEventListener(f, d);
			}),
			Object.keys(u).forEach((c) => {
				r.removeAttribute(c);
			}));
	}
	function s() {
		var r;
		let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator,
			c;
		if (u)
			if (u === 'parent') {
				var f, d;
				let v = t == null || (f = t.proxy) == null || (d = f.$el) == null ? void 0 : d.parentNode;
				for (; v.hasAttribute('data-no-activator'); ) v = v.parentNode;
				c = v;
			} else typeof u == 'string' ? (c = document.querySelector(u)) : '$el' in u ? (c = u.$el) : (c = u);
		return (l.value = ((r = c) == null ? void 0 : r.nodeType) === Node.ELEMENT_NODE ? c : null), l.value;
	}
}
const Xo = de({ eager: Boolean }, 'lazy');
function rr(e, t) {
	const n = R(!1),
		l = C(() => n.value || e.eager || t.value);
	ae(t, () => (n.value = !0));
	function a() {
		e.eager || (n.value = !1);
	}
	return { isBooted: n, hasContent: l, onAfterLeave: a };
}
function Si(e, t) {
	return { x: e.x + t.x, y: e.y + t.y };
}
function u1(e, t) {
	return { x: e.x - t.x, y: e.y - t.y };
}
function Fu(e, t) {
	if (e.side === 'top' || e.side === 'bottom') {
		const { side: n, align: l } = e,
			a = l === 'left' ? 0 : l === 'center' ? t.width / 2 : l === 'right' ? t.width : l,
			o = n === 'top' ? 0 : n === 'bottom' ? t.height : n;
		return Si({ x: a, y: o }, t);
	} else if (e.side === 'left' || e.side === 'right') {
		const { side: n, align: l } = e,
			a = n === 'left' ? 0 : n === 'right' ? t.width : n,
			o = l === 'top' ? 0 : l === 'center' ? t.height / 2 : l === 'bottom' ? t.height : l;
		return Si({ x: a, y: o }, t);
	}
	return Si({ x: t.width / 2, y: t.height / 2 }, t);
}
const Qf = { static: f1, connected: m1 },
	c1 = de(
		{
			locationStrategy: {
				type: [String, Function],
				default: 'static',
				validator: (e) => typeof e == 'function' || e in Qf,
			},
			location: { type: String, default: 'bottom' },
			origin: { type: String, default: 'auto' },
			offset: [Number, String, Array],
		},
		'v-overlay-location-strategies',
	);
function d1(e, t) {
	const n = R({}),
		l = R();
	let a;
	Mt(async () => {
		var i;
		(i = a) == null || i.stop(),
			(l.value = void 0),
			Be &&
				t.isActive.value &&
				e.locationStrategy &&
				((a = xo()),
				e.locationStrategy !== 'connected' && (await Te()),
				a.run(() => {
					if (typeof e.locationStrategy == 'function') {
						var s;
						l.value = (s = e.locationStrategy(t, e, n)) == null ? void 0 : s.updateLocation;
					} else {
						var r;
						l.value = (r = Qf[e.locationStrategy](t, e, n)) == null ? void 0 : r.updateLocation;
					}
				}));
	}),
		Be && window.addEventListener('resize', o, { passive: !0 }),
		Gt(() => {
			var i;
			Be && window.removeEventListener('resize', o), (l.value = void 0), (i = a) == null || i.stop();
		});
	function o(i) {
		var s;
		(s = l.value) == null || s.call(l, i);
	}
	return { contentStyles: n, updateLocation: l };
}
function f1() {}
function v1(e) {
	const t = Ns(e);
	return (t.x -= parseFloat(e.style.left || 0)), (t.y -= parseFloat(e.style.top || 0)), t;
}
function m1(e, t, n) {
	const l = pp(e.activatorEl.value);
	l && Object.assign(n.value, { position: 'fixed' });
	const { preferredAnchor: a, preferredOrigin: o } = Hs(() => {
			const h = Wi(t.location, e.isRtl.value),
				y = t.origin === 'overlap' ? h : t.origin === 'auto' ? mi(h) : Wi(t.origin, e.isRtl.value);
			return h.side === y.side && h.align === hi(y).align
				? { preferredAnchor: hu(h), preferredOrigin: hu(y) }
				: { preferredAnchor: h, preferredOrigin: y };
		}),
		[i, s, r, u] = ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'].map((h) =>
			C(() => {
				const y = parseFloat(t[h]);
				return isNaN(y) ? 1 / 0 : y;
			}),
		),
		c = C(() => {
			if (Array.isArray(t.offset)) return t.offset;
			if (typeof t.offset == 'string') {
				const h = t.offset.split(' ').map(parseFloat);
				return h.length < 2 && h.push(0), h;
			}
			return typeof t.offset == 'number' ? [t.offset, 0] : [0, 0];
		});
	let f = !1;
	const d = new ResizeObserver(() => {
		f && v();
	});
	ae(
		[e.activatorEl, e.contentEl],
		(h, y) => {
			let [V, p] = h,
				[b, g] = y;
			b && d.unobserve(b), V && d.observe(V), g && d.unobserve(g), p && d.observe(p);
		},
		{ immediate: !0 },
	),
		Gt(() => {
			d.disconnect();
		});
	function v() {
		if (
			((f = !1),
			requestAnimationFrame(() => {
				requestAnimationFrame(() => (f = !0));
			}),
			!e.activatorEl.value || !e.contentEl.value)
		)
			return;
		const h = e.activatorEl.value.getBoundingClientRect(),
			y = v1(e.contentEl.value),
			V = ho(e.contentEl.value),
			p = 12;
		V.length ||
			(V.push(document.documentElement),
			(e.contentEl.value.style.top && e.contentEl.value.style.left) ||
				((y.x += parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-x') || 0)),
				(y.y += parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-y') || 0))));
		const b = V.reduce((T, E) => {
			const O = E.getBoundingClientRect(),
				B = new dl({
					x: E === document.documentElement ? 0 : O.x,
					y: E === document.documentElement ? 0 : O.y,
					width: E.clientWidth,
					height: E.clientHeight,
				});
			return T
				? new dl({
						x: Math.max(T.left, B.left),
						y: Math.max(T.top, B.top),
						width: Math.min(T.right, B.right) - Math.max(T.left, B.left),
						height: Math.min(T.bottom, B.bottom) - Math.max(T.top, B.top),
				  })
				: B;
		}, void 0);
		(b.x += p), (b.y += p), (b.width -= p * 2), (b.height -= p * 2);
		let g = { anchor: a.value, origin: o.value };
		function x(T) {
			const E = new dl(y),
				O = Fu(T.anchor, h),
				B = Fu(T.origin, E);
			let { x: D, y: M } = u1(O, B);
			switch (T.anchor.side) {
				case 'top':
					M -= c.value[0];
					break;
				case 'bottom':
					M += c.value[0];
					break;
				case 'left':
					D -= c.value[0];
					break;
				case 'right':
					D += c.value[0];
					break;
			}
			switch (T.anchor.align) {
				case 'top':
					M -= c.value[1];
					break;
				case 'bottom':
					M += c.value[1];
					break;
				case 'left':
					D -= c.value[1];
					break;
				case 'right':
					D += c.value[1];
					break;
			}
			return (
				(E.x += D),
				(E.y += M),
				(E.width = Math.min(E.width, r.value)),
				(E.height = Math.min(E.height, u.value)),
				{ overflows: yu(E, b), x: D, y: M }
			);
		}
		let S = 0,
			w = 0;
		const k = { x: 0, y: 0 },
			_ = { x: !1, y: !1 };
		let L = -1;
		for (;;) {
			if (L++ > 10) {
				qi('Infinite loop detected in connectedLocationStrategy');
				break;
			}
			const { x: T, y: E, overflows: O } = x(g);
			(S += T), (w += E), (y.x += T), (y.y += E);
			{
				const B = gu(g.anchor),
					D = O.x.before || O.x.after,
					M = O.y.before || O.y.after;
				let P = !1;
				if (
					(['x', 'y'].forEach((H) => {
						if ((H === 'x' && D && !_.x) || (H === 'y' && M && !_.y)) {
							const U = { anchor: { ...g.anchor }, origin: { ...g.origin } },
								Y = H === 'x' ? (B === 'y' ? hi : mi) : B === 'y' ? mi : hi;
							(U.anchor = Y(U.anchor)), (U.origin = Y(U.origin));
							const { overflows: Q } = x(U);
							((Q[H].before <= O[H].before && Q[H].after <= O[H].after) ||
								Q[H].before + Q[H].after < (O[H].before + O[H].after) / 2) &&
								((g = U), (P = _[H] = !0));
						}
					}),
					P)
				)
					continue;
			}
			O.x.before && ((S += O.x.before), (y.x += O.x.before)),
				O.x.after && ((S -= O.x.after), (y.x -= O.x.after)),
				O.y.before && ((w += O.y.before), (y.y += O.y.before)),
				O.y.after && ((w -= O.y.after), (y.y -= O.y.after));
			{
				const B = yu(y, b);
				(k.x = b.width - B.x.before - B.x.after),
					(k.y = b.height - B.y.before - B.y.after),
					(S += B.x.before),
					(y.x += B.x.before),
					(w += B.y.before),
					(y.y += B.y.before);
			}
			break;
		}
		const $ = gu(g.anchor);
		Object.assign(n.value, {
			'--v-overlay-anchor-origin': `${g.anchor.side} ${g.anchor.align}`,
			transformOrigin: `${g.origin.side} ${g.origin.align}`,
			top: ee(Hu(w)),
			left: ee(Hu(S)),
			minWidth: ee($ === 'y' ? Math.min(i.value, h.width) : i.value),
			maxWidth: ee(Nu(ht(k.x, i.value === 1 / 0 ? 0 : i.value, r.value))),
			maxHeight: ee(Nu(ht(k.y, s.value === 1 / 0 ? 0 : s.value, u.value))),
		});
	}
	return (
		ae(
			() => [a.value, o.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight],
			() => v(),
			{ immediate: !l },
		),
		l && Te(() => v()),
		requestAnimationFrame(() => {
			n.value.maxHeight && v();
		}),
		{ updateLocation: v }
	);
}
function Hu(e) {
	return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Nu(e) {
	return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let ls = !0;
const _o = [];
function h1(e) {
	!ls || _o.length ? (_o.push(e), as()) : ((ls = !1), e(), as());
}
let Du = -1;
function as() {
	cancelAnimationFrame(Du),
		(Du = requestAnimationFrame(() => {
			const e = _o.shift();
			e && e(), _o.length ? as() : (ls = !0);
		}));
}
const os = { none: null, close: b1, block: p1, reposition: _1 },
	g1 = de(
		{
			scrollStrategy: {
				type: [String, Function],
				default: 'block',
				validator: (e) => typeof e == 'function' || e in os,
			},
		},
		'v-overlay-scroll-strategies',
	);
function y1(e, t) {
	if (!Be) return;
	let n;
	Mt(async () => {
		var l;
		(l = n) == null || l.stop(),
			t.isActive.value &&
				e.scrollStrategy &&
				((n = xo()),
				await Te(),
				n.run(() => {
					if (typeof e.scrollStrategy == 'function') e.scrollStrategy(t, e);
					else {
						var a;
						(a = os[e.scrollStrategy]) == null || a.call(os, t, e);
					}
				}));
	}),
		Gt(() => {
			var l;
			(l = n) == null || l.stop();
		});
}
function b1(e) {
	var n;
	function t(l) {
		e.isActive.value = !1;
	}
	ev((n = e.activatorEl.value) != null ? n : e.contentEl.value, t);
}
function p1(e, t) {
	var n;
	const l = (n = e.root.value) == null ? void 0 : n.offsetParent,
		a = [
			...new Set([
				...ho(e.activatorEl.value, t.contained ? l : void 0),
				...ho(e.contentEl.value, t.contained ? l : void 0),
			]),
		].filter((s) => !s.classList.contains('v-overlay-scroll-blocked')),
		o = window.innerWidth - document.documentElement.offsetWidth,
		i = ((s) => zs(s) && s)(l || document.documentElement);
	i && e.root.value.classList.add('v-overlay--scroll-blocked'),
		a.forEach((s, r) => {
			s.style.setProperty('--v-body-scroll-x', ee(-s.scrollLeft)),
				s.style.setProperty('--v-body-scroll-y', ee(-s.scrollTop)),
				s.style.setProperty('--v-scrollbar-offset', ee(o)),
				s.classList.add('v-overlay-scroll-blocked');
		}),
		Gt(() => {
			a.forEach((s, r) => {
				const u = parseFloat(s.style.getPropertyValue('--v-body-scroll-x')),
					c = parseFloat(s.style.getPropertyValue('--v-body-scroll-y'));
				s.style.removeProperty('--v-body-scroll-x'),
					s.style.removeProperty('--v-body-scroll-y'),
					s.style.removeProperty('--v-scrollbar-offset'),
					s.classList.remove('v-overlay-scroll-blocked'),
					(s.scrollLeft = -u),
					(s.scrollTop = -c);
			}),
				i && e.root.value.classList.remove('v-overlay--scroll-blocked');
		});
}
function _1(e) {
	var a;
	let t = !1,
		n = -1;
	function l(o) {
		h1(() => {
			var i, s;
			const r = performance.now();
			(i = (s = e.updateLocation).value) == null || i.call(s, o), (t = (performance.now() - r) / (1e3 / 60) > 2);
		});
	}
	ev((a = e.activatorEl.value) != null ? a : e.contentEl.value, (o) => {
		t
			? (cancelAnimationFrame(n),
			  (n = requestAnimationFrame(() => {
					n = requestAnimationFrame(() => {
						l(o);
					});
			  })))
			: l(o);
	});
}
function ev(e, t) {
	const n = [document, ...ho(e)];
	n.forEach((l) => {
		l.addEventListener('scroll', t, { passive: !0 });
	}),
		Gt(() => {
			n.forEach((l) => {
				l.removeEventListener('scroll', t);
			});
		});
}
function tv() {
	if (!Be) return R(!1);
	const { ssr: e } = Sa();
	if (e) {
		const t = R(!1);
		return (
			lt(() => {
				t.value = !0;
			}),
			t
		);
	} else return R(!0);
}
function Ia() {
	const t = Qe('useScopeId').vnode.scopeId;
	return { scopeId: t ? { [t]: '' } : void 0 };
}
const ju = Symbol.for('vuetify:stack'),
	zl = We([]);
function C1(e, t, n) {
	const l = Qe('useStack'),
		a = !n,
		o = we(ju, void 0),
		i = We({ activeChildren: new Set() });
	ze(ju, i);
	const s = R(+t.value);
	bl(e, () => {
		var c;
		const f = (c = zl.at(-1)) == null ? void 0 : c[1];
		(s.value = f ? f + 10 : +t.value),
			a && zl.push([l.uid, s.value]),
			o == null || o.activeChildren.add(l.uid),
			Gt(() => {
				if (a) {
					const d = zl.findIndex((v) => v[0] === l.uid);
					zl.splice(d, 1);
				}
				o == null || o.activeChildren.delete(l.uid);
			});
	});
	const r = R(!0);
	a &&
		Mt(() => {
			var c;
			const f = ((c = zl.at(-1)) == null ? void 0 : c[0]) === l.uid;
			setTimeout(() => (r.value = f));
		});
	const u = C(() => !i.activeChildren.size);
	return { globalTop: ya(r), localTop: u, stackStyles: C(() => ({ zIndex: s.value })) };
}
function ta(e) {
	return {
		teleportTarget: C(() => {
			const n = e.value;
			if (n === !0 || !Be) return;
			const l = n === !1 ? document.body : typeof n == 'string' ? document.querySelector(n) : n;
			if (l != null) {
				if (!ta.cache.has(l)) {
					const a = document.createElement('div');
					(a.className = 'v-overlay-container'), l.appendChild(a), ta.cache.set(l, a);
				}
				return ta.cache.get(l);
			}
		}),
	};
}
ta.cache = new WeakMap();
function S1() {
	return !0;
}
function nv(e, t, n) {
	if (!e || lv(e, n) === !1) return !1;
	const l = Gd(t);
	if (typeof ShadowRoot < 'u' && l instanceof ShadowRoot && l.host === e.target) return !1;
	const a = ((typeof n.value == 'object' && n.value.include) || (() => []))();
	return a.push(t), !a.some((o) => (o == null ? void 0 : o.contains(e.target)));
}
function lv(e, t) {
	return ((typeof t.value == 'object' && t.value.closeConditional) || S1)(e);
}
function w1(e, t, n) {
	const l = typeof n.value == 'function' ? n.value : n.value.handler;
	t._clickOutside.lastMousedownWasOutside &&
		nv(e, t, n) &&
		setTimeout(() => {
			lv(e, n) && l && l(e);
		}, 0);
}
function zu(e, t) {
	const n = Gd(e);
	t(document), typeof ShadowRoot < 'u' && n instanceof ShadowRoot && t(n);
}
const av = {
	mounted(e, t) {
		const n = (a) => w1(a, e, t),
			l = (a) => {
				e._clickOutside.lastMousedownWasOutside = nv(a, e, t);
			};
		zu(e, (a) => {
			a.addEventListener('click', n, !0), a.addEventListener('mousedown', l, !0);
		}),
			e._clickOutside || (e._clickOutside = { lastMousedownWasOutside: !0 }),
			(e._clickOutside[t.instance.$.uid] = { onClick: n, onMousedown: l });
	},
	unmounted(e, t) {
		!e._clickOutside ||
			(zu(e, (n) => {
				var l;
				if (!n || !((l = e._clickOutside) != null && l[t.instance.$.uid])) return;
				const { onClick: a, onMousedown: o } = e._clickOutside[t.instance.$.uid];
				n.removeEventListener('click', a, !0), n.removeEventListener('mousedown', o, !0);
			}),
			delete e._clickOutside[t.instance.$.uid]);
	},
};
function k1(e) {
	const { modelValue: t, color: n, ...l } = e;
	return m(
		Xt,
		{ name: 'fade-transition', appear: !0 },
		{
			default: () => [
				e.modelValue &&
					m(
						'div',
						le(
							{
								class: ['v-overlay__scrim', e.color.backgroundColorClasses.value],
								style: e.color.backgroundColorStyles.value,
							},
							l,
						),
						null,
					),
			],
		},
	);
}
const Ea = de(
		{
			absolute: Boolean,
			attach: [Boolean, String, Object],
			closeOnBack: { type: Boolean, default: !0 },
			contained: Boolean,
			contentClass: null,
			contentProps: null,
			disabled: Boolean,
			noClickAnimation: Boolean,
			modelValue: Boolean,
			persistent: Boolean,
			scrim: { type: [String, Boolean], default: !0 },
			zIndex: { type: [Number, String], default: 2e3 },
			...i1(),
			...Ht(),
			...Xo(),
			...c1(),
			...g1(),
			...ye(),
			...cn(),
		},
		'v-overlay',
	),
	Rl = Ie()({
		name: 'VOverlay',
		directives: { ClickOutside: av },
		inheritAttrs: !1,
		props: { _disableGlobalStack: Boolean, ...Ea() },
		emits: { 'click:outside': (e) => !0, 'update:modelValue': (e) => !0, afterLeave: () => !0 },
		setup(e, t) {
			let { slots: n, attrs: l, emit: a } = t;
			const o = he(e, 'modelValue'),
				i = C({
					get: () => o.value,
					set: (U) => {
						(U && e.disabled) || (o.value = U);
					},
				}),
				{ teleportTarget: s } = ta(C(() => e.attach || e.contained)),
				{ themeClasses: r } = ke(e),
				{ rtlClasses: u, isRtl: c } = un(),
				{ hasContent: f, onAfterLeave: d } = rr(e, i),
				v = Re(C(() => (typeof e.scrim == 'string' ? e.scrim : null))),
				{ globalTop: h, localTop: y, stackStyles: V } = C1(i, N(e, 'zIndex'), e._disableGlobalStack),
				{
					activatorEl: p,
					activatorRef: b,
					activatorEvents: g,
					contentEvents: x,
					scrimEvents: S,
				} = s1(e, { isActive: i, isTop: y }),
				{ dimensionStyles: w } = Nt(e),
				k = tv(),
				{ scopeId: _ } = Ia();
			ae(
				() => e.disabled,
				(U) => {
					U && (i.value = !1);
				},
			);
			const L = R(),
				$ = R(),
				{ contentStyles: T, updateLocation: E } = d1(e, { isRtl: c, contentEl: $, activatorEl: p, isActive: i });
			y1(e, { root: L, contentEl: $, activatorEl: p, isActive: i, updateLocation: E });
			function O(U) {
				a('click:outside', U), e.persistent ? H() : (i.value = !1);
			}
			function B() {
				return i.value && h.value;
			}
			Be &&
				ae(
					i,
					(U) => {
						U ? window.addEventListener('keydown', D) : window.removeEventListener('keydown', D);
					},
					{ immediate: !0 },
				);
			function D(U) {
				U.key === 'Escape' && h.value && (e.persistent ? H() : (i.value = !1));
			}
			const M = xf();
			bl(
				() => e.closeOnBack,
				() => {
					V0(M, (U) => {
						h.value && i.value ? (U(!1), e.persistent ? H() : (i.value = !1)) : U();
					});
				},
			);
			const P = R();
			ae(
				() => i.value && (e.absolute || e.contained) && s.value == null,
				(U) => {
					if (U) {
						const Y = Zd(L.value);
						Y && Y !== document.scrollingElement && (P.value = Y.scrollTop);
					}
				},
			);
			function H() {
				e.noClickAnimation ||
					($.value &&
						Rn($.value, [{ transformOrigin: 'center' }, { transform: 'scale(1.03)' }, { transformOrigin: 'center' }], {
							duration: 150,
							easing: ua,
						}));
			}
			return (
				K(() => {
					var U, Y;
					return m(ge, null, [
						(U = n.activator) == null
							? void 0
							: U.call(n, { isActive: i.value, props: le({ ref: b }, ti(g.value), e.activatorProps) }),
						k.value &&
							m(
								Ih,
								{ disabled: !s.value, to: s.value },
								{
									default: () => [
										f.value &&
											m(
												'div',
												le(
													{
														class: [
															'v-overlay',
															{
																'v-overlay--absolute': e.absolute || e.contained,
																'v-overlay--active': i.value,
																'v-overlay--contained': e.contained,
															},
															r.value,
															u.value,
														],
														style: [V.value, { top: ee(P.value) }],
														ref: L,
													},
													_,
													l,
												),
												[
													m(k1, le({ color: v, modelValue: i.value && !!e.scrim }, ti(S.value)), null),
													m(
														Yt,
														{
															appear: !0,
															persisted: !0,
															transition: e.transition,
															target: p.value,
															onAfterLeave: () => {
																d(), a('afterLeave');
															},
														},
														{
															default: () => [
																Oe(
																	m(
																		'div',
																		le(
																			{
																				ref: $,
																				class: ['v-overlay__content', e.contentClass],
																				style: [w.value, T.value],
																			},
																			ti(x.value),
																			e.contentProps,
																		),
																		[(Y = n.default) == null ? void 0 : Y.call(n, { isActive: i })],
																	),
																	[
																		[Zt, i.value],
																		[
																			yt('click-outside'),
																			{ handler: O, closeConditional: B, include: () => [p.value] },
																		],
																	],
																),
															],
														},
													),
												],
											),
									],
								},
							),
					]);
				}),
				{ activatorEl: p, animateClick: H, contentEl: $, globalTop: h, localTop: y, updateLocation: E }
			);
		},
	});
function Go(e) {
	return bt(e, Object.keys(Rl.props));
}
const Zo = Ie()({
		name: 'VMenu',
		props: {
			id: String,
			...Un(
				Ea({
					closeDelay: 250,
					closeOnContentClick: !0,
					locationStrategy: 'connected',
					openDelay: 300,
					scrim: !1,
					scrollStrategy: 'reposition',
					transition: { component: No },
				}),
				['absolute'],
			),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = he(e, 'modelValue'),
				{ scopeId: a } = Ia(),
				o = et(),
				i = C(() => e.id || `v-menu-${o}`),
				s = R(),
				r = we(ns, null);
			let u = 0;
			ze(ns, {
				register() {
					++u;
				},
				unregister() {
					--u;
				},
				closeParents() {
					setTimeout(() => {
						u || ((l.value = !1), r == null || r.closeParents());
					}, 40);
				},
			}),
				ae(l, (f) => {
					f ? r == null || r.register() : r == null || r.unregister();
				});
			function c() {
				r == null || r.closeParents();
			}
			return (
				K(() => {
					const [f] = Go(e);
					return m(
						Rl,
						le(
							{ ref: s, class: ['v-menu'] },
							f,
							{
								modelValue: l.value,
								'onUpdate:modelValue': (d) => (l.value = d),
								absolute: !0,
								activatorProps: le(
									{ 'aria-haspopup': 'menu', 'aria-expanded': String(l.value), 'aria-owns': i.value },
									e.activatorProps,
								),
								'onClick:outside': c,
							},
							a,
						),
						{
							activator: n.activator,
							default: function () {
								for (var d, v = arguments.length, h = new Array(v), y = 0; y < v; y++) h[y] = arguments[y];
								return m($e, { root: !0 }, { default: () => [(d = n.default) == null ? void 0 : d.call(n, ...h)] });
							},
						},
					);
				}),
				Dt({ id: i }, s)
			);
		},
	}),
	ur = de(
		{
			chips: Boolean,
			closableChips: Boolean,
			eager: Boolean,
			hideNoData: Boolean,
			hideSelected: Boolean,
			menu: Boolean,
			menuIcon: { type: re, default: '$dropdown' },
			menuProps: { type: Object },
			multiple: Boolean,
			noDataText: { type: String, default: '$vuetify.noDataText' },
			openOnClear: Boolean,
			valueComparator: { type: Function, default: kl },
			...Yf({ itemChildren: !1 }),
		},
		'v-select',
	),
	x1 = Ie()({
		name: 'VSelect',
		props: {
			...ur(),
			...Un(Ko({ modelValue: null }), ['validationValue', 'dirty', 'appendInnerIcon']),
			...cn({ transition: { component: No } }),
		},
		emits: { 'update:modelValue': (e) => !0, 'update:menu': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const { t: l } = Ft(),
				a = R(),
				o = he(e, 'menu'),
				{ items: i, transformIn: s, transformOut: r } = sr(e),
				u = he(
					e,
					'modelValue',
					[],
					(g) => s(Lt(g)),
					(g) => {
						var S;
						const x = r(g);
						return e.multiple ? x : (S = x[0]) != null ? S : null;
					},
				),
				c = C(() => u.value.map((g) => i.value.find((x) => e.valueComparator(x.value, g.value)) || g)),
				f = C(() => c.value.map((g) => g.props.value)),
				d = R();
			function v(g) {
				(u.value = []), e.openOnClear && (o.value = !0);
			}
			function h() {
				(e.hideNoData && !i.value.length) || e.readonly || (o.value = !o.value);
			}
			function y(g) {
				if (!e.readonly) {
					if (
						(['Enter', 'ArrowDown', ' '].includes(g.key) && (g.preventDefault(), (o.value = !0)),
						['Escape', 'Tab'].includes(g.key) && (o.value = !1),
						g.key === 'ArrowDown')
					) {
						var x;
						(x = d.value) == null || x.focus('next');
					} else if (g.key === 'ArrowUp') {
						var S;
						g.preventDefault(), (S = d.value) == null || S.focus('prev');
					} else if (g.key === 'Home') {
						var w;
						g.preventDefault(), (w = d.value) == null || w.focus('first');
					} else if (g.key === 'End') {
						var k;
						g.preventDefault(), (k = d.value) == null || k.focus('last');
					}
				}
			}
			function V(g) {
				if (e.multiple) {
					const x = f.value.findIndex((S) => S === g.value);
					if (x === -1) u.value = [...u.value, g];
					else {
						const S = [...u.value];
						S.splice(x, 1), (u.value = S);
					}
				} else (u.value = [g]), (o.value = !1);
			}
			function p(g) {
				var x;
				((x = d.value) != null && x.$el.contains(g.relatedTarget)) || (o.value = !1);
			}
			function b(g) {
				if (g.relatedTarget == null) {
					var x;
					(x = a.value) == null || x.focus();
				}
			}
			return (
				K(() => {
					const g = !!(e.chips || n.chip),
						[x] = lr(e);
					return m(
						$a,
						le({ ref: a }, x, {
							modelValue: u.value.map((S) => S.props.value).join(', '),
							'onUpdate:modelValue': (S) => {
								S == null && (u.value = []);
							},
							validationValue: u.externalValue,
							dirty: u.value.length > 0,
							class: [
								'v-select',
								{
									'v-select--active-menu': o.value,
									'v-select--chips': !!e.chips,
									[`v-select--${e.multiple ? 'multiple' : 'single'}`]: !0,
									'v-select--selected': u.value.length,
								},
							],
							appendInnerIcon: e.menuIcon,
							readonly: !0,
							'onClick:clear': v,
							'onClick:control': h,
							onBlur: p,
							onKeydown: y,
						}),
						{
							...n,
							default: () => {
								var S, w, k;
								return m(ge, null, [
									m(
										Zo,
										le(
											{
												modelValue: o.value,
												'onUpdate:modelValue': (_) => (o.value = _),
												activator: 'parent',
												contentClass: 'v-select__content',
												eager: e.eager,
												openOnClick: !1,
												closeOnContentClick: !1,
												transition: e.transition,
											},
											e.menuProps,
										),
										{
											default: () => [
												m(
													Yo,
													{
														ref: d,
														selected: f.value,
														selectStrategy: e.multiple ? 'independent' : 'single-independent',
														onMousedown: (_) => _.preventDefault(),
														onFocusout: b,
													},
													{
														default: () => {
															var _;
															return [
																!i.value.length &&
																	!e.hideNoData &&
																	((_ = (S = n['no-data']) == null ? void 0 : S.call(n)) != null
																		? _
																		: m(an, { title: l(e.noDataText) }, null)),
																(w = n['prepend-item']) == null ? void 0 : w.call(n),
																i.value.map((L, $) => {
																	var E;
																	var T;
																	return (E =
																		(T = n.item) == null
																			? void 0
																			: T.call(n, {
																					item: L,
																					index: $,
																					props: le(L.props, { onClick: () => V(L) }),
																			  })) != null
																		? E
																		: m(an, le({ key: $ }, L.props, { onClick: () => V(L) }), {
																				prepend: (O) => {
																					let { isSelected: B } = O;
																					return e.multiple && !e.hideSelected
																						? m(Ol, { modelValue: B, ripple: !1 }, null)
																						: void 0;
																				},
																		  });
																}),
																(k = n['append-item']) == null ? void 0 : k.call(n),
															];
														},
													},
												),
											],
										},
									),
									c.value.map((_, L) => {
										function $(E) {
											E.stopPropagation(), E.preventDefault(), V(_);
										}
										const T = { 'onClick:close': $, modelValue: !0, 'onUpdate:modelValue': void 0 };
										return m('div', { key: _.value, class: 'v-select__selection' }, [
											g
												? m(
														$e,
														{ defaults: { VChip: { closable: e.closableChips, size: 'small', text: _.title } } },
														{ default: () => [n.chip ? n.chip({ item: _, index: L, props: T }) : m(La, T, null)] },
												  )
												: n.selection
												? n.selection({ item: _, index: L })
												: m('span', { class: 'v-select__selection-text' }, [
														_.title,
														e.multiple &&
															L < c.value.length - 1 &&
															m('span', { class: 'v-select__selection-comma' }, [Sn(',')]),
												  ]),
										]);
									}),
								]);
							},
						},
					);
				}),
				Dt({ menu: o, select: V }, a)
			);
		},
	}),
	$1 = (e, t, n) =>
		e == null || t == null ? -1 : e.toString().toLocaleLowerCase().indexOf(t.toString().toLocaleLowerCase()),
	ov = de(
		{
			customFilter: Function,
			customKeyFilter: Object,
			filterKeys: [Array, String],
			filterMode: { type: String, default: 'intersection' },
			noFilter: Boolean,
		},
		'filter',
	);
function V1(e, t, n) {
	var r, u;
	const l = [],
		a = (r = n == null ? void 0 : n.default) != null ? r : $1,
		o = n != null && n.filterKeys ? Lt(n.filterKeys) : !1,
		i = Object.keys((u = n == null ? void 0 : n.customKeyFilter) != null ? u : {}).length;
	if (!(e != null && e.length)) return l;
	e: for (let c = 0; c < e.length; c++) {
		const f = e[c],
			d = {},
			v = {};
		let h = -1;
		if (t && !(n != null && n.noFilter)) {
			if (typeof f == 'object') {
				const p = o || Object.keys(f);
				for (const b of p) {
					var s;
					const g = qt(f, b, f),
						x = n == null || (s = n.customKeyFilter) == null ? void 0 : s[b];
					if (((h = x ? x(g, t, f) : a(g, t, f)), h !== -1 && h !== !1)) x ? (d[b] = h) : (v[b] = h);
					else if ((n == null ? void 0 : n.filterMode) === 'every') continue e;
				}
			} else (h = a(f, t, f)), h !== -1 && h !== !1 && (v.title = h);
			const y = Object.keys(v).length,
				V = Object.keys(d).length;
			if (
				(!y && !V) ||
				((n == null ? void 0 : n.filterMode) === 'union' && V !== i && !y) ||
				((n == null ? void 0 : n.filterMode) === 'intersection' && (V !== i || !y))
			)
				continue;
		}
		l.push({ index: c, matches: { ...v, ...d } });
	}
	return l;
}
function iv(e, t, n) {
	const l = C(() =>
		typeof (n == null ? void 0 : n.value) != 'string' && typeof (n == null ? void 0 : n.value) != 'number'
			? ''
			: String(n.value),
	);
	return {
		filteredItems: C(() => {
			const o = Ge(t);
			return V1(o, l.value, {
				customKeyFilter: e.customKeyFilter,
				default: e.customFilter,
				filterKeys: e.filterKeys,
				filterMode: e.filterMode,
				noFilter: e.noFilter,
			}).map((s) => {
				let { index: r, matches: u } = s;
				return { item: o[r], matches: u };
			});
		}),
	};
}
function L1(e, t, n) {
	if (Array.isArray(t)) throw new Error('Multiple matches is not implemented');
	return typeof t == 'number' && ~t
		? m(ge, null, [
				m('span', { class: 'v-autocomplete__unmask' }, [e.substr(0, t)]),
				m('span', { class: 'v-autocomplete__mask' }, [e.substr(t, n)]),
				m('span', { class: 'v-autocomplete__unmask' }, [e.substr(t + n)]),
		  ])
		: e;
}
const I1 = Ie()({
	name: 'VAutocomplete',
	props: {
		search: String,
		...ov({ filterKeys: ['title'] }),
		...ur(),
		...Un(Ko({ modelValue: null }), ['validationValue', 'dirty', 'appendInnerIcon']),
		...cn({ transition: !1 }),
	},
	emits: { 'update:search': (e) => !0, 'update:modelValue': (e) => !0, 'update:menu': (e) => !0 },
	setup(e, t) {
		let { slots: n } = t;
		const { t: l } = Ft(),
			a = R(),
			o = R(!1),
			i = R(!0),
			s = he(e, 'menu'),
			{ items: r, transformIn: u, transformOut: c } = sr(e),
			f = he(e, 'search', ''),
			d = he(
				e,
				'modelValue',
				[],
				($) => u(Lt($)),
				($) => {
					var E;
					const T = c($);
					return e.multiple ? T : (E = T[0]) != null ? E : null;
				},
			),
			{ filteredItems: v } = iv(
				e,
				r,
				C(() => (i.value ? void 0 : f.value)),
			),
			h = C(() => d.value.map(($) => r.value.find((T) => e.valueComparator(T.value, $.value)) || $)),
			y = C(() => h.value.map(($) => $.props.value)),
			V = R();
		function p($) {
			(d.value = []), e.openOnClear && (s.value = !0), (f.value = '');
		}
		function b() {
			(e.hideNoData && !r.value.length) || e.readonly || (s.value = !0);
		}
		function g($) {
			if (!e.readonly) {
				if (
					(['Enter', 'ArrowDown'].includes($.key) && (s.value = !0),
					['Escape'].includes($.key) && (s.value = !1),
					['Enter', 'Escape', 'Tab'].includes($.key) && (i.value = !0),
					$.key === 'ArrowDown')
				) {
					var T;
					$.preventDefault(), (T = V.value) == null || T.focus('next');
				} else if ($.key === 'ArrowUp') {
					var E;
					$.preventDefault(), (E = V.value) == null || E.focus('prev');
				}
			}
		}
		function x($) {
			f.value = $.target.value;
		}
		function S() {
			o.value && (i.value = !0);
		}
		function w($) {
			o.value = !0;
		}
		function k($) {
			if ($.relatedTarget == null) {
				var T;
				(T = a.value) == null || T.focus();
			}
		}
		const _ = R(!1);
		function L($) {
			if (e.multiple) {
				const T = y.value.findIndex((E) => E === $.value);
				if (T === -1) (d.value = [...d.value, $]), (f.value = '');
				else {
					const E = [...d.value];
					E.splice(T, 1), (d.value = E);
				}
			} else
				(d.value = [$]),
					(_.value = !0),
					n.selection || (f.value = $.title),
					(s.value = !1),
					(i.value = !0),
					Te(() => (_.value = !1));
		}
		return (
			ae(o, ($) => {
				var E;
				if ($) {
					var T;
					(_.value = !0),
						(f.value =
							e.multiple || !!n.selection
								? ''
								: String((E = (T = h.value.at(-1)) == null ? void 0 : T.props.title) != null ? E : '')),
						(i.value = !0),
						Te(() => (_.value = !1));
				} else (s.value = !1), (f.value = '');
			}),
			ae(f, ($) => {
				!o.value || _.value || ($ && (s.value = !0), (i.value = !$));
			}),
			K(() => {
				const $ = !!(e.chips || n.chip),
					[T] = lr(e);
				return m(
					$a,
					le({ ref: a }, T, {
						modelValue: f.value,
						'onUpdate:modelValue': (E) => {
							E == null && (d.value = []);
						},
						validationValue: d.externalValue,
						dirty: d.value.length > 0,
						onInput: x,
						class: [
							'v-autocomplete',
							{
								'v-autocomplete--active-menu': s.value,
								'v-autocomplete--chips': !!e.chips,
								[`v-autocomplete--${e.multiple ? 'multiple' : 'single'}`]: !0,
								'v-autocomplete--selection-slot': !!n.selection,
							},
						],
						appendInnerIcon: e.menuIcon,
						readonly: e.readonly,
						'onClick:clear': p,
						'onClick:control': b,
						'onClick:input': b,
						onFocus: () => (o.value = !0),
						onBlur: () => (o.value = !1),
						onKeydown: g,
					}),
					{
						...n,
						default: () => {
							var E, O, B;
							return m(ge, null, [
								m(
									Zo,
									le(
										{
											modelValue: s.value,
											'onUpdate:modelValue': (D) => (s.value = D),
											activator: 'parent',
											contentClass: 'v-autocomplete__content',
											eager: e.eager,
											openOnClick: !1,
											closeOnContentClick: !1,
											transition: e.transition,
											onAfterLeave: S,
										},
										e.menuProps,
									),
									{
										default: () => [
											m(
												Yo,
												{
													ref: V,
													selected: y.value,
													selectStrategy: e.multiple ? 'independent' : 'single-independent',
													onMousedown: (D) => D.preventDefault(),
													onFocusin: w,
													onFocusout: k,
												},
												{
													default: () => {
														var D;
														return [
															!v.value.length &&
																!e.hideNoData &&
																((D = (E = n['no-data']) == null ? void 0 : E.call(n)) != null
																	? D
																	: m(an, { title: l(e.noDataText) }, null)),
															(O = n['prepend-item']) == null ? void 0 : O.call(n),
															v.value.map((M, P) => {
																var Q;
																var H;
																let { item: U, matches: Y } = M;
																return (Q =
																	(H = n.item) == null
																		? void 0
																		: H.call(n, { item: U, index: P, props: le(U.props, { onClick: () => L(U) }) })) !=
																	null
																	? Q
																	: m(an, le({ key: P }, U.props, { onClick: () => L(U) }), {
																			prepend: (ne) => {
																				let { isSelected: be } = ne;
																				return e.multiple && !e.hideSelected
																					? m(Ol, { modelValue: be, ripple: !1 }, null)
																					: void 0;
																			},
																			title: () => {
																				var be;
																				var ne;
																				return i.value
																					? U.title
																					: L1(
																							U.title,
																							Y.title,
																							(be = (ne = f.value) == null ? void 0 : ne.length) != null ? be : 0,
																					  );
																			},
																	  });
															}),
															(B = n['append-item']) == null ? void 0 : B.call(n),
														];
													},
												},
											),
										],
									},
								),
								h.value.map((D, M) => {
									function P(U) {
										U.stopPropagation(), U.preventDefault(), L(D);
									}
									const H = { 'onClick:close': P, modelValue: !0, 'onUpdate:modelValue': void 0 };
									return m('div', { key: D.value, class: 'v-autocomplete__selection' }, [
										$
											? m(
													$e,
													{ defaults: { VChip: { closable: e.closableChips, size: 'small', text: D.title } } },
													{ default: () => [n.chip ? n.chip({ item: D, index: M, props: H }) : m(La, H, null)] },
											  )
											: n.selection
											? n.selection({ item: D, index: M })
											: m('span', { class: 'v-autocomplete__selection-text' }, [
													D.title,
													e.multiple &&
														M < h.value.length - 1 &&
														m('span', { class: 'v-autocomplete__selection-comma' }, [Sn(',')]),
											  ]),
									]);
								}),
							]);
						},
					},
				);
			}),
			Dt({ isFocused: o, isPristine: i, menu: s, search: f, filteredItems: v, select: L }, a)
		);
	},
});
const E1 = q({
	name: 'VBadge',
	inheritAttrs: !1,
	props: {
		bordered: Boolean,
		color: String,
		content: [Number, String],
		dot: Boolean,
		floating: Boolean,
		icon: re,
		inline: Boolean,
		label: { type: String, default: '$vuetify.badge' },
		max: [Number, String],
		modelValue: { type: Boolean, default: !0 },
		offsetX: [Number, String],
		offsetY: [Number, String],
		textColor: String,
		...Gn({ location: 'top end' }),
		...Ae(),
		...fe(),
		...ye(),
		...cn({ transition: 'scale-rotate-transition' }),
	},
	setup(e, t) {
		const { backgroundColorClasses: n, backgroundColorStyles: l } = Re(N(e, 'color')),
			{ roundedClasses: a } = Me(e),
			{ t: o } = Ft(),
			{ textColorClasses: i, textColorStyles: s } = rt(N(e, 'textColor')),
			{ themeClasses: r } = lf(),
			{ locationStyles: u } = Zn(e, !0, (c) => {
				var d, v;
				return (
					(e.floating ? (e.dot ? 2 : 4) : e.dot ? 8 : 12) +
					(['top', 'bottom'].includes(c)
						? +((d = e.offsetY) != null ? d : 0)
						: ['left', 'right'].includes(c)
						? +((v = e.offsetX) != null ? v : 0)
						: 0)
				);
			});
		return (
			K(() => {
				var c, f, d, v;
				const h = Number(e.content),
					y = !e.max || isNaN(h) ? e.content : h <= e.max ? h : `${e.max}+`,
					[V, p] = bt(t.attrs, ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']);
				return m(
					e.tag,
					le(
						{
							class: [
								'v-badge',
								{
									'v-badge--bordered': e.bordered,
									'v-badge--dot': e.dot,
									'v-badge--floating': e.floating,
									'v-badge--inline': e.inline,
								},
							],
						},
						p,
					),
					{
						default: () => [
							m('div', { class: 'v-badge__wrapper' }, [
								(c = (f = t.slots).default) == null ? void 0 : c.call(f),
								m(
									Yt,
									{ transition: e.transition },
									{
										default: () => [
											Oe(
												m(
													'span',
													le(
														{
															class: ['v-badge__badge', r.value, n.value, a.value, i.value],
															style: [l.value, s.value, e.inline ? {} : u.value],
															'aria-atomic': 'true',
															'aria-label': o(e.label, h),
															'aria-live': 'polite',
															role: 'status',
														},
														V,
													),
													[
														e.dot
															? void 0
															: t.slots.badge
															? (d = (v = t.slots).badge) == null
																? void 0
																: d.call(v)
															: e.icon
															? m(Fe, { icon: e.icon }, null)
															: y,
													],
												),
												[[Zt, e.modelValue]],
											),
										],
									},
								),
							]),
						],
					},
				);
			}),
			{}
		);
	},
});
const sv = q({
		name: 'VBannerActions',
		props: { color: String, density: String },
		setup(e, t) {
			let { slots: n } = t;
			return (
				je({ VBtn: { color: e.color, density: e.density, variant: 'text' } }),
				K(() => {
					var l;
					return m('div', { class: 'v-banner-actions' }, [(l = n.default) == null ? void 0 : l.call(n)]);
				}),
				{}
			);
		},
	}),
	rv = Et('v-banner-text'),
	T1 = q({
		name: 'VBanner',
		props: {
			avatar: String,
			color: String,
			icon: re,
			lines: String,
			stacked: Boolean,
			sticky: Boolean,
			text: String,
			..._t(),
			...qe(),
			...Ht(),
			...Ue(),
			...Gn(),
			...Tl(),
			...Ae(),
			...fe(),
			...ye(),
		},
		setup(e, t) {
			let { slots: n } = t;
			const { borderClasses: l } = Tt(e),
				{ densityClasses: a } = tt(e),
				{ mobile: o } = Sa(),
				{ dimensionStyles: i } = Nt(e),
				{ elevationClasses: s } = Xe(e),
				{ locationStyles: r } = Zn(e),
				{ positionClasses: u } = Al(e),
				{ roundedClasses: c } = Me(e),
				{ themeClasses: f } = ke(e),
				d = N(e, 'color'),
				v = N(e, 'density');
			je({ VBannerActions: { color: d, density: v } }),
				K(() => {
					var h;
					const y = !!(e.text || n.text),
						V = !!(n.prepend || e.avatar || e.icon);
					return m(
						e.tag,
						{
							class: [
								'v-banner',
								{
									'v-banner--stacked': e.stacked || o.value,
									'v-banner--sticky': e.sticky,
									[`v-banner--${e.lines}-line`]: !!e.lines,
								},
								l.value,
								a.value,
								s.value,
								u.value,
								c.value,
								f.value,
							],
							style: [i.value, r.value],
							role: 'banner',
						},
						{
							default: () => [
								V &&
									m(
										$e,
										{
											key: 'prepend',
											defaults: { VAvatar: { color: d.value, density: v.value, icon: e.icon, image: e.avatar } },
										},
										{
											default: () => [
												m('div', { class: 'v-banner__prepend' }, [
													n.prepend ? n.prepend() : (e.avatar || e.icon) && m(wn, null, null),
												]),
											],
										},
									),
								m('div', { class: 'v-banner__content' }, [
									y && m(rv, { key: 'text' }, { default: () => [n.text ? n.text() : e.text] }),
									(h = n.default) == null ? void 0 : h.call(n),
								]),
								n.actions && m(sv, null, { default: () => [n.actions()] }),
							],
						},
					);
				});
		},
	});
const A1 = q({
	name: 'VBottomNavigation',
	props: {
		bgColor: String,
		color: String,
		grow: Boolean,
		mode: { type: String, validator: (e) => !e || ['horizontal', 'shift'].includes(e) },
		height: { type: [Number, String], default: 56 },
		active: { type: Boolean, default: !0 },
		..._t(),
		...qe(),
		...Ue(),
		...Ae(),
		...xl({ name: 'bottom-navigation' }),
		...fe({ tag: 'header' }),
		...Ll({ modelValue: !0, selectedClass: 'v-btn--selected' }),
		...ye(),
	},
	emits: { 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { slots: n } = t;
		const { themeClasses: l } = lf(),
			{ borderClasses: a } = Tt(e),
			{ backgroundColorClasses: o, backgroundColorStyles: i } = Re(N(e, 'bgColor')),
			{ densityClasses: s } = tt(e),
			{ elevationClasses: r } = Xe(e),
			{ roundedClasses: u } = Me(e),
			c = C(() => Number(e.height) - (e.density === 'comfortable' ? 8 : 0) - (e.density === 'compact' ? 16 : 0)),
			f = N(e, 'active'),
			{ layoutItemStyles: d } = $l({
				id: e.name,
				order: C(() => parseInt(e.order, 10)),
				position: C(() => 'bottom'),
				layoutSize: C(() => (f.value ? c.value : 0)),
				elementSize: c,
				active: f,
				absolute: N(e, 'absolute'),
			});
		return (
			Xn(e, Gs),
			je(
				{
					VBtn: {
						color: N(e, 'color'),
						density: N(e, 'density'),
						stacked: C(() => e.mode !== 'horizontal'),
						variant: 'text',
					},
				},
				{ scoped: !0 },
			),
			K(() =>
				m(
					e.tag,
					{
						class: [
							'v-bottom-navigation',
							{
								'v-bottom-navigation--active': f.value,
								'v-bottom-navigation--grow': e.grow,
								'v-bottom-navigation--shift': e.mode === 'shift',
							},
							l.value,
							o.value,
							a.value,
							s.value,
							r.value,
							u.value,
						],
						style: [i.value, d.value, { height: ee(c.value), transform: `translateY(${ee(f.value ? 0 : 100, '%')})` }],
					},
					{ default: () => [n.default && m('div', { class: 'v-bottom-navigation__content' }, [n.default()])] },
				),
			),
			{}
		);
	},
});
const uv = Et('v-breadcrumbs-divider', 'li'),
	cv = q({
		name: 'VBreadcrumbsItem',
		props: {
			active: Boolean,
			activeClass: String,
			activeColor: String,
			color: String,
			disabled: Boolean,
			title: String,
			...Pl(),
			...fe({ tag: 'li' }),
		},
		setup(e, t) {
			let { slots: n, attrs: l } = t;
			const a = ka(e, l),
				o = C(() => {
					var u;
					return e.active || ((u = a.isActive) == null ? void 0 : u.value);
				}),
				i = C(() => (o.value ? e.activeColor : e.color)),
				{ textColorClasses: s, textColorStyles: r } = rt(i);
			return (
				K(() => {
					var u;
					const c = a.isLink.value ? 'a' : e.tag;
					return m(
						c,
						{
							class: [
								'v-breadcrumbs-item',
								{
									'v-breadcrumbs-item--active': o.value,
									'v-breadcrumbs-item--disabled': e.disabled,
									'v-breadcrumbs-item--link': a.isLink.value,
									[`${e.activeClass}`]: o.value && e.activeClass,
								},
								s.value,
							],
							style: [r.value],
							href: a.href.value,
							'aria-current': o.value ? 'page' : void 0,
							onClick: a.navigate,
						},
						{
							default: () => {
								var f;
								return [(f = (u = n.default) == null ? void 0 : u.call(n)) != null ? f : e.title];
							},
						},
					);
				}),
				{}
			);
		},
	}),
	P1 = Ie()({
		name: 'VBreadcrumbs',
		props: {
			activeClass: String,
			activeColor: String,
			bgColor: String,
			color: String,
			disabled: Boolean,
			divider: { type: String, default: '/' },
			icon: re,
			items: { type: Array, default: () => [] },
			...qe(),
			...Ae(),
			...fe({ tag: 'ul' }),
		},
		setup(e, t) {
			let { slots: n } = t;
			const { backgroundColorClasses: l, backgroundColorStyles: a } = Re(N(e, 'bgColor')),
				{ densityClasses: o } = tt(e),
				{ roundedClasses: i } = Me(e);
			return (
				je({
					VBreadcrumbsItem: {
						activeClass: N(e, 'activeClass'),
						activeColor: N(e, 'activeColor'),
						color: N(e, 'color'),
						disabled: N(e, 'disabled'),
					},
				}),
				K(() => {
					var s;
					const r = !!(n.prepend || e.icon);
					return m(
						e.tag,
						{ class: ['v-breadcrumbs', l.value, o.value, i.value], style: a.value },
						{
							default: () => [
								r &&
									m(
										$e,
										{ key: 'prepend', defaults: { VIcon: { icon: e.icon, start: !0 } } },
										{
											default: () => [
												m('div', { class: 'v-breadcrumbs__prepend' }, [
													n.prepend ? n.prepend() : e.icon && m(Fe, null, null),
												]),
											],
										},
									),
								e.items.map((u, c, f) => {
									var d;
									return m(ge, null, [
										m(cv, le({ key: c, disabled: c >= f.length - 1 }, typeof u == 'string' ? { title: u } : u), {
											default: n.title
												? () => {
														var v;
														return (v = n.title) == null ? void 0 : v.call(n, { item: u, index: c });
												  }
												: void 0,
										}),
										c < f.length - 1 &&
											m(uv, null, {
												default: () => {
													var v;
													return [
														(v = (d = n.divider) == null ? void 0 : d.call(n, { item: u, index: c })) != null
															? v
															: e.divider,
													];
												},
											}),
									]);
								}),
								(s = n.default) == null ? void 0 : s.call(n),
							],
						},
					);
				}),
				{}
			);
		},
	});
const dv = q({
		name: 'VCardActions',
		setup(e, t) {
			let { slots: n } = t;
			return (
				je({ VBtn: { variant: 'text' } }),
				K(() => {
					var l;
					return m('div', { class: 'v-card-actions' }, [(l = n.default) == null ? void 0 : l.call(n)]);
				}),
				{}
			);
		},
	}),
	fv = Et('v-card-subtitle'),
	vv = Et('v-card-title'),
	mv = q({
		name: 'VCardItem',
		props: {
			appendAvatar: String,
			appendIcon: re,
			prependAvatar: String,
			prependIcon: re,
			subtitle: String,
			title: String,
			...qe(),
		},
		setup(e, t) {
			let { slots: n } = t;
			return (
				K(() => {
					var l, a, o, i, s;
					const r = !!(e.prependAvatar || e.prependIcon || n.prepend),
						u = !!(e.appendAvatar || e.appendIcon || n.append),
						c = !!(e.title || n.title),
						f = !!(e.subtitle || n.subtitle);
					return m('div', { class: 'v-card-item' }, [
						r &&
							m(
								$e,
								{
									key: 'prepend',
									defaults: {
										VAvatar: { density: e.density, icon: e.prependIcon, image: e.prependAvatar },
										VIcon: { density: e.density, icon: e.prependIcon },
									},
								},
								{
									default: () => {
										var d;
										return [
											m('div', { class: 'v-card-item__prepend' }, [
												(d = (l = n.prepend) == null ? void 0 : l.call(n)) != null ? d : m(wn, null, null),
											]),
										];
									},
								},
							),
						m('div', { class: 'v-card-item__content' }, [
							c &&
								m(
									vv,
									{ key: 'title' },
									{
										default: () => {
											var d;
											return [(d = (a = n.title) == null ? void 0 : a.call(n)) != null ? d : e.title];
										},
									},
								),
							f &&
								m(
									fv,
									{ key: 'subtitle' },
									{
										default: () => {
											var d;
											return [(d = (o = n.subtitle) == null ? void 0 : o.call(n)) != null ? d : e.subtitle];
										},
									},
								),
							(i = n.default) == null ? void 0 : i.call(n),
						]),
						u &&
							m(
								$e,
								{
									key: 'append',
									defaults: {
										VAvatar: { density: e.density, icon: e.appendIcon, image: e.appendAvatar },
										VIcon: { density: e.density, icon: e.appendIcon },
									},
								},
								{
									default: () => {
										var d;
										return [
											m('div', { class: 'v-card-item__append' }, [
												(d = (s = n.append) == null ? void 0 : s.call(n)) != null ? d : m(wn, null, null),
											]),
										];
									},
								},
							),
					]);
				}),
				{}
			);
		},
	}),
	hv = Et('v-card-text'),
	B1 = q({
		name: 'VCard',
		directives: { Ripple: xn },
		props: {
			appendAvatar: String,
			appendIcon: re,
			disabled: Boolean,
			flat: Boolean,
			hover: Boolean,
			image: String,
			link: { type: Boolean, default: void 0 },
			prependAvatar: String,
			prependIcon: re,
			ripple: Boolean,
			subtitle: String,
			text: String,
			title: String,
			...ye(),
			..._t(),
			...qe(),
			...Ht(),
			...Ue(),
			...er(),
			...Gn(),
			...Tl(),
			...Ae(),
			...Pl(),
			...fe(),
			...At({ variant: 'elevated' }),
		},
		setup(e, t) {
			let { attrs: n, slots: l } = t;
			const { themeClasses: a } = ke(e),
				{ borderClasses: o } = Tt(e),
				{ colorClasses: i, colorStyles: s, variantClasses: r } = qn(e),
				{ densityClasses: u } = tt(e),
				{ dimensionStyles: c } = Nt(e),
				{ elevationClasses: f } = Xe(e),
				{ loaderClasses: d } = jo(e),
				{ locationStyles: v } = Zn(e),
				{ positionClasses: h } = Al(e),
				{ roundedClasses: y } = Me(e),
				V = ka(e, n),
				p = C(() => e.link !== !1 && V.isLink.value),
				b = C(() => !e.disabled && e.link !== !1 && (e.link || V.isClickable.value));
			return (
				K(() => {
					var g, x, S;
					const w = p.value ? 'a' : e.tag,
						k = !!(l.title || e.title),
						_ = !!(l.subtitle || e.subtitle),
						L = k || _,
						$ = !!(l.append || e.appendAvatar || e.appendIcon),
						T = !!(l.prepend || e.prependAvatar || e.prependIcon),
						E = !!(l.image || e.image),
						O = L || T || $,
						B = !!(l.text || e.text);
					return Oe(
						m(
							w,
							{
								class: [
									'v-card',
									{
										'v-card--disabled': e.disabled,
										'v-card--flat': e.flat,
										'v-card--hover': e.hover && !(e.disabled || e.flat),
										'v-card--link': b.value,
									},
									a.value,
									o.value,
									i.value,
									u.value,
									f.value,
									d.value,
									h.value,
									y.value,
									r.value,
								],
								style: [s.value, c.value, v.value],
								href: V.href.value,
								onClick: b.value && V.navigate,
								tabindex: e.disabled ? -1 : void 0,
							},
							{
								default: () => [
									E &&
										m(
											$e,
											{ key: 'image', defaults: { VImg: { cover: !0, src: e.image } } },
											{
												default: () => {
													var D;
													return [
														m('div', { class: 'v-card__image' }, [
															(D = (g = l.image) == null ? void 0 : g.call(l)) != null ? D : m(Vl, null, null),
														]),
													];
												},
											},
										),
									m(
										tr,
										{ name: 'v-card', active: !!e.loading, color: typeof e.loading == 'boolean' ? void 0 : e.loading },
										{ default: l.loader },
									),
									O &&
										m(
											mv,
											{
												key: 'item',
												prependAvatar: e.prependAvatar,
												prependIcon: e.prependIcon,
												title: e.title,
												subtitle: e.subtitle,
												appendAvatar: e.appendAvatar,
												appendIcon: e.appendIcon,
											},
											{ default: l.item, prepend: l.prepend, title: l.title, subtitle: l.subtitle, append: l.append },
										),
									B &&
										m(
											hv,
											{ key: 'text' },
											{
												default: () => {
													var D;
													return [(D = (x = l.text) == null ? void 0 : x.call(l)) != null ? D : e.text];
												},
											},
										),
									(S = l.default) == null ? void 0 : S.call(l),
									l.actions && m(dv, null, { default: l.actions }),
									Kn(b.value, 'v-card'),
								],
							},
						),
						[[yt('ripple'), b.value]],
					);
				}),
				{}
			);
		},
	});
const O1 = (e) => {
	const { touchstartX: t, touchendX: n, touchstartY: l, touchendY: a } = e,
		o = 0.5,
		i = 16;
	(e.offsetX = n - t),
		(e.offsetY = a - l),
		Math.abs(e.offsetY) < o * Math.abs(e.offsetX) &&
			(e.left && n < t - i && e.left(e), e.right && n > t + i && e.right(e)),
		Math.abs(e.offsetX) < o * Math.abs(e.offsetY) && (e.up && a < l - i && e.up(e), e.down && a > l + i && e.down(e));
};
function R1(e, t) {
	var n;
	const l = e.changedTouches[0];
	(t.touchstartX = l.clientX),
		(t.touchstartY = l.clientY),
		(n = t.start) == null || n.call(t, { originalEvent: e, ...t });
}
function M1(e, t) {
	var n;
	const l = e.changedTouches[0];
	(t.touchendX = l.clientX),
		(t.touchendY = l.clientY),
		(n = t.end) == null || n.call(t, { originalEvent: e, ...t }),
		O1(t);
}
function F1(e, t) {
	var n;
	const l = e.changedTouches[0];
	(t.touchmoveX = l.clientX), (t.touchmoveY = l.clientY), (n = t.move) == null || n.call(t, { originalEvent: e, ...t });
}
function H1() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	const t = {
		touchstartX: 0,
		touchstartY: 0,
		touchendX: 0,
		touchendY: 0,
		touchmoveX: 0,
		touchmoveY: 0,
		offsetX: 0,
		offsetY: 0,
		left: e.left,
		right: e.right,
		up: e.up,
		down: e.down,
		start: e.start,
		move: e.move,
		end: e.end,
	};
	return { touchstart: (n) => R1(n, t), touchend: (n) => M1(n, t), touchmove: (n) => F1(n, t) };
}
function N1(e, t) {
	var r, u;
	var n;
	const l = t.value,
		a = l != null && l.parent ? e.parentElement : e,
		o = (r = l == null ? void 0 : l.options) != null ? r : { passive: !0 },
		i = (n = t.instance) == null ? void 0 : n.$.uid;
	if (!a || !i) return;
	const s = H1(t.value);
	(a._touchHandlers = (u = a._touchHandlers) != null ? u : Object.create(null)),
		(a._touchHandlers[i] = s),
		Bd(s).forEach((c) => {
			a.addEventListener(c, s[c], o);
		});
}
function D1(e, t) {
	var n, l;
	const a = (n = t.value) != null && n.parent ? e.parentElement : e,
		o = (l = t.instance) == null ? void 0 : l.$.uid;
	if (!(a != null && a._touchHandlers) || !o) return;
	const i = a._touchHandlers[o];
	Bd(i).forEach((s) => {
		a.removeEventListener(s, i[s]);
	}),
		delete a._touchHandlers[o];
}
const cr = { mounted: N1, unmounted: D1 },
	gv = Symbol.for('vuetify:v-window'),
	yv = Symbol.for('vuetify:v-window-group'),
	bv = Ie()({
		name: 'VWindow',
		directives: { Touch: cr },
		props: {
			continuous: Boolean,
			nextIcon: { type: [Boolean, String, Function, Object], default: '$next' },
			prevIcon: { type: [Boolean, String, Function, Object], default: '$prev' },
			reverse: Boolean,
			showArrows: { type: [Boolean, String], validator: (e) => typeof e == 'boolean' || e === 'hover' },
			touch: { type: [Object, Boolean], default: void 0 },
			direction: { type: String, default: 'horizontal' },
			modelValue: null,
			disabled: Boolean,
			selectedClass: { type: String, default: 'v-window-item--active' },
			mandatory: { default: 'force' },
			...fe(),
			...ye(),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const { themeClasses: l } = ke(e),
				{ isRtl: a } = un(),
				{ t: o } = Ft(),
				i = Xn(e, yv),
				s = R(),
				r = C(() => (a.value ? !e.reverse : e.reverse)),
				u = R(!1),
				c = C(() => {
					const x = e.direction === 'vertical' ? 'y' : 'x',
						w = (r.value ? !u.value : u.value) ? '-reverse' : '';
					return `v-window-${x}${w}-transition`;
				}),
				f = R(0),
				d = R(void 0),
				v = C(() => i.items.value.findIndex((x) => i.selected.value.includes(x.id)));
			ae(v, (x, S) => {
				const w = i.items.value.length,
					k = w - 1;
				w <= 2
					? (u.value = x < S)
					: x === k && S === 0
					? (u.value = !0)
					: x === 0 && S === k
					? (u.value = !1)
					: (u.value = x < S);
			}),
				ze(gv, { transition: c, isReversed: u, transitionCount: f, transitionHeight: d, rootRef: s });
			const h = C(() => e.continuous || v.value !== 0),
				y = C(() => e.continuous || v.value !== i.items.value.length - 1);
			function V() {
				h.value && i.prev();
			}
			function p() {
				y.value && i.next();
			}
			const b = C(() => {
					const x = [],
						S = {
							icon: a.value ? e.nextIcon : e.prevIcon,
							class: `v-window__${r.value ? 'right' : 'left'}`,
							onClick: i.prev,
							ariaLabel: o('$vuetify.carousel.prev'),
						};
					x.push(h.value ? (n.prev ? n.prev({ props: S }) : m(it, S, null)) : m('div', null, null));
					const w = {
						icon: a.value ? e.prevIcon : e.nextIcon,
						class: `v-window__${r.value ? 'left' : 'right'}`,
						onClick: i.next,
						ariaLabel: o('$vuetify.carousel.next'),
					};
					return x.push(y.value ? (n.next ? n.next({ props: w }) : m(it, w, null)) : m('div', null, null)), x;
				}),
				g = C(() =>
					e.touch === !1
						? e.touch
						: {
								...{
									left: () => {
										r.value ? V() : p();
									},
									right: () => {
										r.value ? p() : V();
									},
									start: (S) => {
										let { originalEvent: w } = S;
										w.stopPropagation();
									},
								},
								...(e.touch === !0 ? {} : e.touch),
						  },
				);
			return (
				K(() => {
					var x, S;
					return Oe(
						m(
							e.tag,
							{ ref: s, class: ['v-window', { 'v-window--show-arrows-on-hover': e.showArrows === 'hover' }, l.value] },
							{
								default: () => [
									m('div', { class: 'v-window__container', style: { height: d.value } }, [
										(x = n.default) == null ? void 0 : x.call(n, { group: i }),
										e.showArrows !== !1 && m('div', { class: 'v-window__controls' }, [b.value]),
									]),
									(S = n.additional) == null ? void 0 : S.call(n, { group: i }),
								],
							},
						),
						[[yt('touch'), g.value]],
					);
				}),
				{ group: i }
			);
		},
	});
function dr() {
	const e = R(!1);
	return (
		lt(() => {
			window.requestAnimationFrame(() => {
				e.value = !0;
			});
		}),
		{ ssrBootStyles: C(() => (e.value ? void 0 : { transition: 'none !important' })), isBooted: ya(e) }
	);
}
const pv = q({
		name: 'VWindowItem',
		directives: { Touch: cr },
		props: {
			reverseTransition: { type: [Boolean, String], default: void 0 },
			transition: { type: [Boolean, String], default: void 0 },
			...Yn(),
			...Xo(),
		},
		emits: { 'group:selected': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = we(gv),
				a = Il(e, yv),
				{ isBooted: o } = dr();
			if (!l || !a) throw new Error('[Vuetify] VWindowItem must be used inside VWindow');
			const i = R(!1),
				s = C(() => (l.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
			function r() {
				!i.value ||
					!l ||
					((i.value = !1),
					l.transitionCount.value > 0 &&
						((l.transitionCount.value -= 1), l.transitionCount.value === 0 && (l.transitionHeight.value = void 0)));
			}
			function u() {
				if (!(i.value || !l)) {
					if (((i.value = !0), l.transitionCount.value === 0)) {
						var h;
						l.transitionHeight.value = ee((h = l.rootRef.value) == null ? void 0 : h.clientHeight);
					}
					l.transitionCount.value += 1;
				}
			}
			function c() {
				r();
			}
			function f(h) {
				!i.value ||
					Te(() => {
						!s.value || !i.value || !l || (l.transitionHeight.value = ee(h.clientHeight));
					});
			}
			const d = C(() => {
					const h = l.isReversed.value ? e.reverseTransition : e.transition;
					return s.value
						? {
								name: typeof h != 'string' ? l.transition.value : h,
								onBeforeEnter: u,
								onAfterEnter: r,
								onEnterCancelled: c,
								onBeforeLeave: u,
								onAfterLeave: r,
								onLeaveCancelled: c,
								onEnter: f,
						  }
						: !1;
				}),
				{ hasContent: v } = rr(e, a.isSelected);
			return (
				K(() => {
					var h;
					return m(
						Yt,
						{ transition: o.value && d.value },
						{
							default: () => [
								Oe(
									m('div', { class: ['v-window-item', a.selectedClass.value] }, [
										v.value && ((h = n.default) == null ? void 0 : h.call(n)),
									]),
									[[Zt, a.isSelected.value]],
								),
							],
						},
					);
				}),
				{}
			);
		},
	}),
	j1 = q({
		name: 'VCarousel',
		props: {
			color: String,
			cycle: Boolean,
			delimiterIcon: { type: re, default: '$delimiter' },
			height: { type: [Number, String], default: 500 },
			hideDelimiters: Boolean,
			hideDelimiterBackground: Boolean,
			interval: { type: [Number, String], default: 6e3, validator: (e) => e > 0 },
			modelValue: null,
			progress: [Boolean, String],
			showArrows: { type: [Boolean, String], default: !0, validator: (e) => typeof e == 'boolean' || e === 'hover' },
			verticalDelimiters: [Boolean, String],
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = he(e, 'modelValue'),
				{ t: a } = Ft(),
				o = R();
			let i = -1;
			ae(l, r),
				ae(() => e.interval, r),
				ae(
					() => e.cycle,
					(u) => {
						u ? r() : window.clearTimeout(i);
					},
				),
				lt(s);
			function s() {
				!e.cycle || !o.value || (i = window.setTimeout(o.value.group.next, +e.interval > 0 ? +e.interval : 6e3));
			}
			function r() {
				window.clearTimeout(i), window.requestAnimationFrame(s);
			}
			return (
				K(() =>
					m(
						bv,
						{
							ref: o,
							modelValue: l.value,
							'onUpdate:modelValue': (u) => (l.value = u),
							class: [
								'v-carousel',
								{
									'v-carousel--hide-delimiter-background': e.hideDelimiterBackground,
									'v-carousel--vertical-delimiters': e.verticalDelimiters,
								},
							],
							style: { height: ee(e.height) },
							continuous: !0,
							mandatory: 'force',
							showArrows: e.showArrows,
						},
						{
							default: n.default,
							additional: (u) => {
								let { group: c } = u;
								return m(ge, null, [
									!e.hideDelimiters &&
										m(
											'div',
											{
												class: 'v-carousel__controls',
												style: {
													left: e.verticalDelimiters === 'left' && e.verticalDelimiters ? 0 : 'auto',
													right: e.verticalDelimiters === 'right' ? 0 : 'auto',
												},
											},
											[
												c.items.value.length > 0 &&
													m(
														$e,
														{
															defaults: {
																VBtn: { color: e.color, icon: e.delimiterIcon, size: 'x-small', variant: 'text' },
															},
															scoped: !0,
														},
														{
															default: () => [
																c.items.value.map((f, d) => {
																	const v = {
																		'aria-label': a(
																			'$vuetify.carousel.ariaLabel.delimiter',
																			d + 1,
																			c.items.value.length,
																		),
																		class: [c.isSelected(f.id) && 'v-btn--active'],
																		onClick: () => c.select(f.id, !0),
																	};
																	return n.item ? n.item({ props: v, item: f }) : m(it, le(f, v), null);
																}),
															],
														},
													),
											],
										),
									e.progress &&
										m(
											Qs,
											{
												class: 'v-carousel__progress',
												color: typeof e.progress == 'string' ? e.progress : void 0,
												modelValue: ((c.getItemIndex(l.value) + 1) / c.items.value.length) * 100,
											},
											null,
										),
								]);
							},
							prev: n.prev,
							next: n.next,
						},
					),
				),
				{}
			);
		},
	}),
	z1 = q({
		name: 'VCarouselItem',
		inheritAttrs: !1,
		props: { value: null },
		setup(e, t) {
			let { slots: n, attrs: l } = t;
			K(() => m(pv, { class: 'v-carousel-item', value: e.value }, { default: () => [m(Vl, l, n)] }));
		},
	});
const U1 = Et('v-code');
const W1 = q({
	name: 'VColorPickerCanvas',
	props: {
		color: { type: Object },
		disabled: Boolean,
		dotSize: { type: [Number, String], default: 10 },
		height: { type: [Number, String], default: 150 },
		width: { type: [Number, String], default: 300 },
	},
	emits: { 'update:color': (e) => !0, 'update:position': (e) => !0 },
	setup(e, t) {
		let { emit: n } = t;
		const l = R(!1),
			a = R(!1),
			o = R({ x: 0, y: 0 }),
			i = C(() => {
				const { x: h, y } = o.value,
					V = parseInt(e.dotSize, 10) / 2;
				return { width: ee(e.dotSize), height: ee(e.dotSize), transform: `translate(${ee(h - V)}, ${ee(y - V)})` };
			}),
			s = R();
		function r(h, y, V) {
			const { left: p, top: b, width: g, height: x } = V;
			o.value = { x: ht(h - p, 0, g), y: ht(y - b, 0, x) };
		}
		function u(h) {
			e.disabled || !s.value || r(h.clientX, h.clientY, s.value.getBoundingClientRect());
		}
		function c(h) {
			h.preventDefault(),
				!e.disabled &&
					((l.value = !0),
					window.addEventListener('mousemove', f),
					window.addEventListener('mouseup', d),
					window.addEventListener('touchmove', f),
					window.addEventListener('touchend', d));
		}
		function f(h) {
			if (e.disabled || !s.value) return;
			l.value = !0;
			const y = Zb(h);
			r(y.clientX, y.clientY, s.value.getBoundingClientRect());
		}
		function d() {
			window.removeEventListener('mousemove', f),
				window.removeEventListener('mouseup', d),
				window.removeEventListener('touchmove', f),
				window.removeEventListener('touchend', d);
		}
		ae(o, () => {
			var x, S;
			var h, y;
			if (a.value) {
				a.value = !1;
				return;
			}
			if (!s.value) return;
			const { width: V, height: p } = s.value.getBoundingClientRect(),
				{ x: b, y: g } = o.value;
			n('update:color', {
				h: (x = (h = e.color) == null ? void 0 : h.h) != null ? x : 0,
				s: ht(b, 0, V) / V,
				v: 1 - ht(g, 0, p) / p,
				a: (S = (y = e.color) == null ? void 0 : y.a) != null ? S : 1,
			});
		});
		function v() {
			var g;
			var h;
			if (!s.value) return;
			const y = s.value,
				V = y.getContext('2d');
			if (!V) return;
			const p = V.createLinearGradient(0, 0, y.width, 0);
			p.addColorStop(0, 'hsla(0, 0%, 100%, 1)'),
				p.addColorStop(1, `hsla(${(g = (h = e.color) == null ? void 0 : h.h) != null ? g : 0}, 100%, 50%, 1)`),
				(V.fillStyle = p),
				V.fillRect(0, 0, y.width, y.height);
			const b = V.createLinearGradient(0, 0, 0, y.height);
			b.addColorStop(0, 'hsla(0, 0%, 100%, 0)'),
				b.addColorStop(1, 'hsla(0, 0%, 0%, 1)'),
				(V.fillStyle = b),
				V.fillRect(0, 0, y.width, y.height);
		}
		return (
			ae(
				() => {
					var h;
					return (h = e.color) == null ? void 0 : h.h;
				},
				v,
				{ immediate: !0 },
			),
			ae(
				() => e.color,
				() => {
					if (l.value) {
						l.value = !1;
						return;
					}
					!e.color ||
						((a.value = !0),
						(o.value = { x: e.color.s * parseInt(e.width, 10), y: (1 - e.color.v) * parseInt(e.height, 10) }));
				},
				{ deep: !0, immediate: !0 },
			),
			lt(() => v()),
			K(() =>
				m(
					'div',
					{
						class: 'v-color-picker-canvas',
						style: { width: ee(e.width), height: ee(e.height) },
						onClick: u,
						onMousedown: c,
						onTouchstart: c,
					},
					[
						m('canvas', { ref: s, width: e.width, height: e.height }, null),
						m(
							'div',
							{
								class: ['v-color-picker-canvas__dot', { 'v-color-picker-canvas__dot--disabled': e.disabled }],
								style: i.value,
							},
							null,
						),
					],
				),
			),
			{}
		);
	},
});
var Uu;
function Mn(e, t) {
	return t.every((n) => e.hasOwnProperty(n));
}
function _v(e) {
	var n;
	if (!e) return null;
	let t = null;
	if (typeof e == 'string') {
		const l = cp(e);
		t = qd(l);
	}
	return (
		typeof e == 'object' &&
			(Mn(e, ['r', 'g', 'b']) ? (t = js(e)) : Mn(e, ['h', 's', 'l']) ? (t = zd(e)) : Mn(e, ['h', 's', 'v']) && (t = e)),
		t != null ? { ...t, a: (n = t.a) != null ? n : 1 } : null
	);
}
function K1(e, t) {
	if (t) {
		const { a: n, ...l } = e;
		return l;
	}
	return e;
}
function q1(e, t) {
	if (t == null || typeof t == 'string') {
		const n = Yd(e);
		return e.a === 1 ? n.slice(0, 7) : n;
	}
	if (typeof t == 'object') {
		let n;
		return (
			Mn(t, ['r', 'g', 'b']) ? (n = Fo(e)) : Mn(t, ['h', 's', 'l']) ? (n = jd(e)) : Mn(t, ['h', 's', 'v']) && (n = e),
			K1(n, !Mn(t, ['a']))
		);
	}
	return e;
}
const Qa = { h: 0, s: 0, v: 1, a: 1 },
	is = {
		inputProps: { type: 'number', min: 0 },
		inputs: [
			{ label: 'R', max: 255, step: 1, getValue: (e) => Math.round(e.r), getColor: (e, t) => ({ ...e, r: Number(t) }) },
			{ label: 'G', max: 255, step: 1, getValue: (e) => Math.round(e.g), getColor: (e, t) => ({ ...e, g: Number(t) }) },
			{ label: 'B', max: 255, step: 1, getValue: (e) => Math.round(e.b), getColor: (e, t) => ({ ...e, b: Number(t) }) },
			{
				label: 'A',
				max: 1,
				step: 0.01,
				getValue: (e) => {
					let { a: t } = e;
					return t ? Math.round(t * 100) / 100 : 1;
				},
				getColor: (e, t) => ({ ...e, a: Number(t) }),
			},
		],
		to: Fo,
		from: js,
	},
	Y1 = { ...is, inputs: (Uu = is.inputs) == null ? void 0 : Uu.slice(0, 3) },
	ss = {
		inputProps: { type: 'number', min: 0 },
		inputs: [
			{ label: 'H', max: 360, step: 1, getValue: (e) => Math.round(e.h), getColor: (e, t) => ({ ...e, h: Number(t) }) },
			{
				label: 'S',
				max: 1,
				step: 0.01,
				getValue: (e) => Math.round(e.s * 100) / 100,
				getColor: (e, t) => ({ ...e, s: Number(t) }),
			},
			{
				label: 'L',
				max: 1,
				step: 0.01,
				getValue: (e) => Math.round(e.l * 100) / 100,
				getColor: (e, t) => ({ ...e, l: Number(t) }),
			},
			{
				label: 'A',
				max: 1,
				step: 0.01,
				getValue: (e) => {
					let { a: t } = e;
					return t ? Math.round(t * 100) / 100 : 1;
				},
				getColor: (e, t) => ({ ...e, a: Number(t) }),
			},
		],
		to: jd,
		from: zd,
	},
	X1 = { ...ss, inputs: ss.inputs.slice(0, 3) },
	Cv = {
		inputProps: { type: 'text' },
		inputs: [{ label: 'HEXA', getValue: (e) => e, getColor: (e, t) => t }],
		to: Yd,
		from: qd,
	},
	G1 = { ...Cv, inputs: [{ label: 'HEX', getValue: (e) => e.slice(0, 7), getColor: (e, t) => t }] },
	Fn = { rgb: Y1, rgba: is, hsl: X1, hsla: ss, hex: G1, hexa: Cv },
	Z1 = (e) => {
		let { label: t, ...n } = e;
		return m('div', { class: 'v-color-picker-edit__input' }, [m('input', n, null), m('span', null, [t])]);
	},
	J1 = q({
		name: 'VColorPickerEdit',
		props: {
			color: Object,
			disabled: Boolean,
			mode: { type: String, default: 'rgba', validator: (e) => Object.keys(Fn).includes(e) },
			modes: {
				type: Array,
				default: () => Object.keys(Fn),
				validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(Fn).includes(t)),
			},
		},
		emits: { 'update:color': (e) => !0, 'update:mode': (e) => !0 },
		setup(e, t) {
			let { emit: n } = t;
			const l = C(() => e.modes.map((o) => ({ ...Fn[o], name: o }))),
				a = C(() => {
					var o;
					const i = l.value.find((r) => r.name === e.mode);
					if (!i) return [];
					const s = e.color ? i.to(e.color) : {};
					return (o = i.inputs) == null
						? void 0
						: o.map((r) => {
								let { getValue: u, getColor: c, ...f } = r;
								return {
									...i.inputProps,
									...f,
									disabled: e.disabled,
									value: u(s),
									onChange: (d) => {
										const v = d.target;
										!v || n('update:color', i.from(c(s, v.value)));
									},
								};
						  });
				});
			return (
				K(() => {
					var o;
					return m('div', { class: 'v-color-picker-edit' }, [
						(o = a.value) == null ? void 0 : o.map((i) => m(Z1, i, null)),
						l.value.length > 1 &&
							m(
								it,
								{
									icon: '$unfold',
									size: 'x-small',
									variant: 'plain',
									onClick: () => {
										const i = l.value.findIndex((s) => s.name === e.mode);
										n('update:mode', l.value[(i + 1) % l.value.length].name);
									},
								},
								null,
							),
					]);
				}),
				{}
			);
		},
	});
const fr = Symbol.for('vuetify:v-slider');
function rs(e, t, n) {
	const l = n === 'vertical',
		a = t.getBoundingClientRect(),
		o = 'touches' in e ? e.touches[0] : e;
	return l ? o.clientY - (a.top + a.height / 2) : o.clientX - (a.left + a.width / 2);
}
function Q1(e, t) {
	return 'touches' in e && e.touches.length
		? e.touches[0][t]
		: 'changedTouches' in e && e.changedTouches.length
		? e.changedTouches[0][t]
		: e[t];
}
const Sv = de(
		{
			disabled: Boolean,
			error: Boolean,
			readonly: Boolean,
			max: { type: [Number, String], default: 100 },
			min: { type: [Number, String], default: 0 },
			step: { type: [Number, String], default: 0 },
			thumbColor: String,
			thumbLabel: {
				type: [Boolean, String],
				default: void 0,
				validator: (e) => typeof e == 'boolean' || e === 'always',
			},
			thumbSize: { type: [Number, String], default: 20 },
			showTicks: { type: [Boolean, String], default: !1, validator: (e) => typeof e == 'boolean' || e === 'always' },
			ticks: { type: [Array, Object] },
			tickSize: { type: [Number, String], default: 2 },
			color: String,
			trackColor: String,
			trackFillColor: String,
			trackSize: { type: [Number, String], default: 4 },
			direction: { type: String, default: 'horizontal', validator: (e) => ['vertical', 'horizontal'].includes(e) },
			reverse: Boolean,
			...Ae(),
			...Ue({ elevation: 2 }),
		},
		'slider',
	),
	wv = (e) => {
		let { props: t, handleSliderMouseUp: n, handleMouseMove: l, getActiveThumb: a } = e;
		const { isRtl: o } = un(),
			i = N(t, 'reverse'),
			s = C(() => {
				let J = o.value ? 'rtl' : 'ltr';
				return t.reverse && (J = J === 'rtl' ? 'ltr' : 'rtl'), J;
			}),
			r = C(() => parseFloat(t.min)),
			u = C(() => parseFloat(t.max)),
			c = C(() => (t.step > 0 ? parseFloat(t.step) : 0)),
			f = C(() => {
				const J = c.value.toString().trim();
				return J.includes('.') ? J.length - J.indexOf('.') - 1 : 0;
			}),
			d = C(() => parseInt(t.thumbSize, 10)),
			v = C(() => parseInt(t.tickSize, 10)),
			h = C(() => parseInt(t.trackSize, 10)),
			y = C(() => (u.value - r.value) / c.value),
			V = N(t, 'disabled'),
			p = C(() => t.direction === 'vertical'),
			b = C(() => {
				var J;
				return t.error || t.disabled ? void 0 : (J = t.thumbColor) != null ? J : t.color;
			}),
			g = C(() => {
				var J;
				return t.error || t.disabled ? void 0 : (J = t.trackColor) != null ? J : t.color;
			}),
			x = C(() => {
				var J;
				return t.error || t.disabled ? void 0 : (J = t.trackFillColor) != null ? J : t.color;
			}),
			S = R(!1),
			w = R(0),
			k = R(),
			_ = R();
		function L(J) {
			if (c.value <= 0) return J;
			const _e = ht(J, r.value, u.value),
				ue = r.value % c.value,
				Ne = Math.round((_e - ue) / c.value) * c.value + ue;
			return parseFloat(Math.min(Ne, u.value).toFixed(f.value));
		}
		function $(J) {
			var _e;
			const ue = t.direction === 'vertical',
				Ne = ue ? 'top' : 'left',
				ut = ue ? 'height' : 'width',
				ct = ue ? 'clientY' : 'clientX',
				{ [Ne]: jt, [ut]: Ml } = (_e = k.value) == null ? void 0 : _e.$el.getBoundingClientRect(),
				I = Q1(J, ct);
			let A = Math.min(Math.max((I - jt - w.value) / Ml, 0), 1) || 0;
			return (ue || s.value === 'rtl') && (A = 1 - A), L(r.value + A * (u.value - r.value));
		}
		let T = !1;
		const E = (J) => {
				T || ((w.value = 0), n($(J))), (S.value = !1), (T = !1), (w.value = 0);
			},
			O = (J) => {
				(_.value = a(J)),
					_.value &&
						(_.value.focus(),
						(S.value = !0),
						_.value.contains(J.target)
							? ((T = !0), (w.value = rs(J, _.value, t.direction)))
							: ((w.value = 0), l($(J))));
			},
			B = { passive: !0, capture: !0 };
		function D(J) {
			(T = !0), l($(J));
		}
		function M(J) {
			J.stopPropagation(),
				J.preventDefault(),
				E(J),
				window.removeEventListener('mousemove', D, B),
				window.removeEventListener('mouseup', M);
		}
		function P(J) {
			var _e;
			E(J),
				window.removeEventListener('touchmove', D, B),
				(_e = J.target) == null || _e.removeEventListener('touchend', P);
		}
		function H(J) {
			var _e;
			O(J),
				window.addEventListener('touchmove', D, B),
				(_e = J.target) == null || _e.addEventListener('touchend', P, { passive: !1 });
		}
		function U(J) {
			J.preventDefault(),
				O(J),
				window.addEventListener('mousemove', D, B),
				window.addEventListener('mouseup', M, { passive: !1 });
		}
		const Y = (J) => {
				const _e = ((J - r.value) / (u.value - r.value)) * 100;
				return ht(isNaN(_e) ? 0 : _e, 0, 100);
			},
			Q = C(() =>
				t.ticks
					? Array.isArray(t.ticks)
						? t.ticks.map((J) => ({ value: J, position: Y(J), label: J.toString() }))
						: Object.keys(t.ticks).map((J) => ({ value: parseFloat(J), position: Y(parseFloat(J)), label: t.ticks[J] }))
					: y.value !== 1 / 0
					? On(y.value + 1).map((J) => {
							const _e = r.value + J * c.value;
							return { value: _e, position: Y(_e) };
					  })
					: [],
			),
			ne = C(() =>
				Q.value.some((J) => {
					let { label: _e } = J;
					return !!_e;
				}),
			),
			be = {
				activeThumbRef: _,
				color: N(t, 'color'),
				decimals: f,
				disabled: V,
				direction: N(t, 'direction'),
				elevation: N(t, 'elevation'),
				hasLabels: ne,
				horizontalDirection: s,
				isReversed: i,
				min: r,
				max: u,
				mousePressed: S,
				numTicks: y,
				onSliderMousedown: U,
				onSliderTouchstart: H,
				parsedTicks: Q,
				parseMouseMove: $,
				position: Y,
				readonly: N(t, 'readonly'),
				rounded: N(t, 'rounded'),
				roundValue: L,
				showTicks: N(t, 'showTicks'),
				startOffset: w,
				step: c,
				thumbSize: d,
				thumbColor: b,
				thumbLabel: N(t, 'thumbLabel'),
				ticks: N(t, 'ticks'),
				tickSize: v,
				trackColor: g,
				trackContainerRef: k,
				trackFillColor: x,
				trackSize: h,
				vertical: p,
			};
		return ze(fr, be), be;
	},
	us = q({
		name: 'VSliderThumb',
		directives: { Ripple: xn },
		props: {
			focused: Boolean,
			max: { type: Number, required: !0 },
			min: { type: Number, required: !0 },
			modelValue: { type: Number, required: !0 },
			position: { type: Number, required: !0 },
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n, emit: l } = t;
			const a = we(fr);
			if (!a) throw new Error('[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider');
			const {
					thumbColor: o,
					step: i,
					vertical: s,
					disabled: r,
					thumbSize: u,
					thumbLabel: c,
					direction: f,
					readonly: d,
					elevation: v,
					isReversed: h,
					horizontalDirection: y,
					mousePressed: V,
					decimals: p,
				} = a,
				{ textColorClasses: b, textColorStyles: g } = rt(o),
				{ pageup: x, pagedown: S, end: w, home: k, left: _, right: L, down: $, up: T } = Ui,
				E = [x, S, w, k, _, L, $, T],
				O = C(() => (i.value ? [1, 2, 3] : [1, 5, 10]));
			function B(M, P) {
				if (!E.includes(M.key)) return;
				M.preventDefault();
				const H = i.value || 0.1,
					U = (e.max - e.min) / H;
				if ([_, L, $, T].includes(M.key)) {
					const Q = (y.value === 'rtl' ? [_, T] : [L, T]).includes(M.key) ? 1 : -1,
						ne = M.shiftKey ? 2 : M.ctrlKey ? 1 : 0;
					P = P + Q * H * O.value[ne];
				} else if (M.key === k) P = e.min;
				else if (M.key === w) P = e.max;
				else {
					const Y = M.key === S ? 1 : -1;
					P = P - Y * H * (U > 100 ? U / 10 : 10);
				}
				return Math.max(e.min, Math.min(e.max, P));
			}
			function D(M) {
				const P = B(M, e.modelValue);
				P != null && l('update:modelValue', P);
			}
			return (
				K(() => {
					var M;
					const P = ee(s.value || h.value ? 100 - e.position : e.position, '%'),
						{ elevationClasses: H } = Xe(C(() => (r.value ? void 0 : v.value)));
					return m(
						'div',
						{
							class: [
								'v-slider-thumb',
								{ 'v-slider-thumb--focused': e.focused, 'v-slider-thumb--pressed': e.focused && V.value },
							],
							style: { '--v-slider-thumb-position': P, '--v-slider-thumb-size': ee(u.value) },
							role: 'slider',
							tabindex: r.value ? -1 : 0,
							'aria-valuemin': e.min,
							'aria-valuemax': e.max,
							'aria-valuenow': e.modelValue,
							'aria-readonly': d.value,
							'aria-orientation': f.value,
							onKeydown: d.value ? void 0 : D,
						},
						[
							m('div', { class: ['v-slider-thumb__surface', b.value, H.value], style: { ...g.value } }, null),
							Oe(m('div', { class: ['v-slider-thumb__ripple', b.value], style: g.value }, null), [
								[yt('ripple'), !0, null, { circle: !0, center: !0 }],
							]),
							m(
								df,
								{ origin: 'bottom center' },
								{
									default: () => {
										var U;
										return [
											Oe(
												m('div', { class: 'v-slider-thumb__label-container' }, [
													m('div', { class: ['v-slider-thumb__label'] }, [
														m('div', null, [
															(U = (M = n['thumb-label']) == null ? void 0 : M.call(n, { modelValue: e.modelValue })) !=
															null
																? U
																: e.modelValue.toFixed(i.value ? p.value : 1),
														]),
													]),
												]),
												[[Zt, (c.value && e.focused) || c.value === 'always']],
											),
										];
									},
								},
							),
						],
					);
				}),
				{}
			);
		},
	});
const kv = q({
		name: 'VSliderTrack',
		props: { start: { type: Number, required: !0 }, stop: { type: Number, required: !0 } },
		emits: {},
		setup(e, t) {
			let { slots: n } = t;
			const l = we(fr);
			if (!l) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider');
			const {
					color: a,
					horizontalDirection: o,
					parsedTicks: i,
					rounded: s,
					showTicks: r,
					tickSize: u,
					trackColor: c,
					trackFillColor: f,
					trackSize: d,
					vertical: v,
					min: h,
					max: y,
				} = l,
				{ roundedClasses: V } = Me(s),
				{ backgroundColorClasses: p, backgroundColorStyles: b } = Re(f),
				{ backgroundColorClasses: g, backgroundColorStyles: x } = Re(c),
				S = C(() => `inset-${v.value ? 'block-end' : 'inline-start'}`),
				w = C(() => (v.value ? 'height' : 'width')),
				k = C(() => ({ [S.value]: '0%', [w.value]: '100%' })),
				_ = C(() => e.stop - e.start),
				L = C(() => ({ [S.value]: ee(e.start, '%'), [w.value]: ee(_.value, '%') })),
				$ = C(() =>
					(v.value ? i.value.slice().reverse() : i.value).map((E, O) => {
						var P;
						var B;
						const D = v.value ? 'bottom' : 'margin-inline-start',
							M = E.value !== h.value && E.value !== y.value ? ee(E.position, '%') : void 0;
						return m(
							'div',
							{
								key: E.value,
								class: [
									'v-slider-track__tick',
									{
										'v-slider-track__tick--filled': E.position >= e.start && E.position <= e.stop,
										'v-slider-track__tick--first': E.value === h.value,
										'v-slider-track__tick--last': E.value === y.value,
									},
								],
								style: { [D]: M },
							},
							[
								(E.label || n['tick-label']) &&
									m('div', { class: 'v-slider-track__tick-label' }, [
										(P = (B = n['tick-label']) == null ? void 0 : B.call(n, { tick: E, index: O })) != null
											? P
											: E.label,
									]),
							],
						);
					}),
				);
			return (
				K(() =>
					m(
						'div',
						{
							class: ['v-slider-track', V.value],
							style: {
								'--v-slider-track-size': ee(d.value),
								'--v-slider-tick-size': ee(u.value),
								direction: v.value ? void 0 : o.value,
							},
						},
						[
							m(
								'div',
								{
									class: [
										'v-slider-track__background',
										g.value,
										{ 'v-slider-track__background--opacity': !!a.value || !f.value },
									],
									style: { ...k.value, ...x.value },
								},
								null,
							),
							m('div', { class: ['v-slider-track__fill', p.value], style: { ...L.value, ...b.value } }, null),
							r.value &&
								m(
									'div',
									{ class: ['v-slider-track__ticks', { 'v-slider-track__ticks--always-show': r.value === 'always' }] },
									[$.value],
								),
						],
					),
				),
				{}
			);
		},
	}),
	cs = q({
		name: 'VSlider',
		props: { ...zo(), ...Sv(), ...fn(), modelValue: { type: [Number, String], default: 0 } },
		emits: { 'update:focused': (e) => !0, 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = R(),
				{
					min: a,
					max: o,
					mousePressed: i,
					roundValue: s,
					onSliderMousedown: r,
					onSliderTouchstart: u,
					trackContainerRef: c,
					position: f,
					hasLabels: d,
					readonly: v,
				} = wv({
					props: e,
					handleSliderMouseUp: (g) => (h.value = s(g)),
					handleMouseMove: (g) => (h.value = s(g)),
					getActiveThumb: () => {
						var g;
						return (g = l.value) == null ? void 0 : g.$el;
					},
				}),
				h = he(e, 'modelValue', void 0, (g) => {
					const x = typeof g == 'string' ? parseFloat(g) : g == null ? a.value : g;
					return s(x);
				}),
				{ isFocused: y, focus: V, blur: p } = Jn(e),
				b = C(() => f(h.value));
			return (
				K(() => {
					const [g, x] = $n(e),
						S = !!(e.label || n.label || n.prepend);
					return m(
						Jt,
						le(
							{
								class: [
									'v-slider',
									{
										'v-slider--has-labels': !!n['tick-label'] || d.value,
										'v-slider--focused': y.value,
										'v-slider--pressed': i.value,
										'v-slider--disabled': e.disabled,
									},
								],
							},
							g,
							{ focused: y.value },
						),
						{
							...n,
							prepend: S
								? (w) => {
										var L;
										var k, _;
										return m(ge, null, [
											((L = (k = n.label) == null ? void 0 : k.call(n, w)) != null ? L : e.label)
												? m(Bl, { class: 'v-slider__label', text: e.label }, null)
												: void 0,
											(_ = n.prepend) == null ? void 0 : _.call(n, w),
										]);
								  }
								: void 0,
							default: (w) => {
								let { id: k } = w;
								return m(
									'div',
									{
										class: 'v-slider__container',
										onMousedown: v.value ? void 0 : r,
										onTouchstartPassive: v.value ? void 0 : u,
									},
									[
										m(
											'input',
											{
												id: k.value,
												name: e.name || k.value,
												disabled: e.disabled,
												readonly: e.readonly,
												tabindex: '-1',
												value: h.value,
											},
											null,
										),
										m(kv, { ref: c, start: 0, stop: b.value }, { 'tick-label': n['tick-label'] }),
										m(
											us,
											{
												ref: l,
												focused: y.value,
												min: a.value,
												max: o.value,
												modelValue: h.value,
												'onUpdate:modelValue': (_) => (h.value = _),
												position: b.value,
												elevation: e.elevation,
												onFocus: V,
												onBlur: p,
											},
											{ 'thumb-label': n['thumb-label'] },
										),
									],
								);
							},
						},
					);
				}),
				{}
			);
		},
	}),
	e_ = q({
		name: 'VColorPickerPreview',
		props: { color: { type: Object }, disabled: Boolean, hideAlpha: Boolean },
		emits: { 'update:color': (e) => !0 },
		setup(e, t) {
			let { emit: n } = t;
			return (
				K(() => {
					var o;
					var l, a;
					return m(
						'div',
						{ class: ['v-color-picker-preview', { 'v-color-picker-preview--hide-alpha': e.hideAlpha }] },
						[
							m('div', { class: 'v-color-picker-preview__dot' }, [
								m('div', { style: { background: Ud((o = e.color) != null ? o : Qa) } }, null),
							]),
							m('div', { class: 'v-color-picker-preview__sliders' }, [
								m(
									cs,
									{
										class: 'v-color-picker-preview__track v-color-picker-preview__hue',
										modelValue: (l = e.color) == null ? void 0 : l.h,
										'onUpdate:modelValue': (i) => {
											var s;
											return n('update:color', { ...((s = e.color) != null ? s : Qa), h: i });
										},
										step: 0,
										min: 0,
										max: 360,
										disabled: e.disabled,
										thumbSize: 14,
										trackSize: 8,
										trackFillColor: 'white',
										hideDetails: !0,
									},
									null,
								),
								!e.hideAlpha &&
									m(
										cs,
										{
											class: 'v-color-picker-preview__track v-color-picker-preview__alpha',
											modelValue: (a = e.color) == null ? void 0 : a.a,
											'onUpdate:modelValue': (i) => {
												var s;
												return n('update:color', { ...((s = e.color) != null ? s : Qa), a: i });
											},
											step: 0,
											min: 0,
											max: 1,
											disabled: e.disabled,
											thumbSize: 14,
											trackSize: 8,
											trackFillColor: 'white',
											hideDetails: !0,
										},
										null,
									),
							]),
						],
					);
				}),
				{}
			);
		},
	});
const t_ = Object.freeze({
		base: '#f44336',
		lighten5: '#ffebee',
		lighten4: '#ffcdd2',
		lighten3: '#ef9a9a',
		lighten2: '#e57373',
		lighten1: '#ef5350',
		darken1: '#e53935',
		darken2: '#d32f2f',
		darken3: '#c62828',
		darken4: '#b71c1c',
		accent1: '#ff8a80',
		accent2: '#ff5252',
		accent3: '#ff1744',
		accent4: '#d50000',
	}),
	n_ = Object.freeze({
		base: '#e91e63',
		lighten5: '#fce4ec',
		lighten4: '#f8bbd0',
		lighten3: '#f48fb1',
		lighten2: '#f06292',
		lighten1: '#ec407a',
		darken1: '#d81b60',
		darken2: '#c2185b',
		darken3: '#ad1457',
		darken4: '#880e4f',
		accent1: '#ff80ab',
		accent2: '#ff4081',
		accent3: '#f50057',
		accent4: '#c51162',
	}),
	l_ = Object.freeze({
		base: '#9c27b0',
		lighten5: '#f3e5f5',
		lighten4: '#e1bee7',
		lighten3: '#ce93d8',
		lighten2: '#ba68c8',
		lighten1: '#ab47bc',
		darken1: '#8e24aa',
		darken2: '#7b1fa2',
		darken3: '#6a1b9a',
		darken4: '#4a148c',
		accent1: '#ea80fc',
		accent2: '#e040fb',
		accent3: '#d500f9',
		accent4: '#aa00ff',
	}),
	a_ = Object.freeze({
		base: '#673ab7',
		lighten5: '#ede7f6',
		lighten4: '#d1c4e9',
		lighten3: '#b39ddb',
		lighten2: '#9575cd',
		lighten1: '#7e57c2',
		darken1: '#5e35b1',
		darken2: '#512da8',
		darken3: '#4527a0',
		darken4: '#311b92',
		accent1: '#b388ff',
		accent2: '#7c4dff',
		accent3: '#651fff',
		accent4: '#6200ea',
	}),
	o_ = Object.freeze({
		base: '#3f51b5',
		lighten5: '#e8eaf6',
		lighten4: '#c5cae9',
		lighten3: '#9fa8da',
		lighten2: '#7986cb',
		lighten1: '#5c6bc0',
		darken1: '#3949ab',
		darken2: '#303f9f',
		darken3: '#283593',
		darken4: '#1a237e',
		accent1: '#8c9eff',
		accent2: '#536dfe',
		accent3: '#3d5afe',
		accent4: '#304ffe',
	}),
	i_ = Object.freeze({
		base: '#2196f3',
		lighten5: '#e3f2fd',
		lighten4: '#bbdefb',
		lighten3: '#90caf9',
		lighten2: '#64b5f6',
		lighten1: '#42a5f5',
		darken1: '#1e88e5',
		darken2: '#1976d2',
		darken3: '#1565c0',
		darken4: '#0d47a1',
		accent1: '#82b1ff',
		accent2: '#448aff',
		accent3: '#2979ff',
		accent4: '#2962ff',
	}),
	s_ = Object.freeze({
		base: '#03a9f4',
		lighten5: '#e1f5fe',
		lighten4: '#b3e5fc',
		lighten3: '#81d4fa',
		lighten2: '#4fc3f7',
		lighten1: '#29b6f6',
		darken1: '#039be5',
		darken2: '#0288d1',
		darken3: '#0277bd',
		darken4: '#01579b',
		accent1: '#80d8ff',
		accent2: '#40c4ff',
		accent3: '#00b0ff',
		accent4: '#0091ea',
	}),
	r_ = Object.freeze({
		base: '#00bcd4',
		lighten5: '#e0f7fa',
		lighten4: '#b2ebf2',
		lighten3: '#80deea',
		lighten2: '#4dd0e1',
		lighten1: '#26c6da',
		darken1: '#00acc1',
		darken2: '#0097a7',
		darken3: '#00838f',
		darken4: '#006064',
		accent1: '#84ffff',
		accent2: '#18ffff',
		accent3: '#00e5ff',
		accent4: '#00b8d4',
	}),
	u_ = Object.freeze({
		base: '#009688',
		lighten5: '#e0f2f1',
		lighten4: '#b2dfdb',
		lighten3: '#80cbc4',
		lighten2: '#4db6ac',
		lighten1: '#26a69a',
		darken1: '#00897b',
		darken2: '#00796b',
		darken3: '#00695c',
		darken4: '#004d40',
		accent1: '#a7ffeb',
		accent2: '#64ffda',
		accent3: '#1de9b6',
		accent4: '#00bfa5',
	}),
	c_ = Object.freeze({
		base: '#4caf50',
		lighten5: '#e8f5e9',
		lighten4: '#c8e6c9',
		lighten3: '#a5d6a7',
		lighten2: '#81c784',
		lighten1: '#66bb6a',
		darken1: '#43a047',
		darken2: '#388e3c',
		darken3: '#2e7d32',
		darken4: '#1b5e20',
		accent1: '#b9f6ca',
		accent2: '#69f0ae',
		accent3: '#00e676',
		accent4: '#00c853',
	}),
	d_ = Object.freeze({
		base: '#8bc34a',
		lighten5: '#f1f8e9',
		lighten4: '#dcedc8',
		lighten3: '#c5e1a5',
		lighten2: '#aed581',
		lighten1: '#9ccc65',
		darken1: '#7cb342',
		darken2: '#689f38',
		darken3: '#558b2f',
		darken4: '#33691e',
		accent1: '#ccff90',
		accent2: '#b2ff59',
		accent3: '#76ff03',
		accent4: '#64dd17',
	}),
	f_ = Object.freeze({
		base: '#cddc39',
		lighten5: '#f9fbe7',
		lighten4: '#f0f4c3',
		lighten3: '#e6ee9c',
		lighten2: '#dce775',
		lighten1: '#d4e157',
		darken1: '#c0ca33',
		darken2: '#afb42b',
		darken3: '#9e9d24',
		darken4: '#827717',
		accent1: '#f4ff81',
		accent2: '#eeff41',
		accent3: '#c6ff00',
		accent4: '#aeea00',
	}),
	v_ = Object.freeze({
		base: '#ffeb3b',
		lighten5: '#fffde7',
		lighten4: '#fff9c4',
		lighten3: '#fff59d',
		lighten2: '#fff176',
		lighten1: '#ffee58',
		darken1: '#fdd835',
		darken2: '#fbc02d',
		darken3: '#f9a825',
		darken4: '#f57f17',
		accent1: '#ffff8d',
		accent2: '#ffff00',
		accent3: '#ffea00',
		accent4: '#ffd600',
	}),
	m_ = Object.freeze({
		base: '#ffc107',
		lighten5: '#fff8e1',
		lighten4: '#ffecb3',
		lighten3: '#ffe082',
		lighten2: '#ffd54f',
		lighten1: '#ffca28',
		darken1: '#ffb300',
		darken2: '#ffa000',
		darken3: '#ff8f00',
		darken4: '#ff6f00',
		accent1: '#ffe57f',
		accent2: '#ffd740',
		accent3: '#ffc400',
		accent4: '#ffab00',
	}),
	h_ = Object.freeze({
		base: '#ff9800',
		lighten5: '#fff3e0',
		lighten4: '#ffe0b2',
		lighten3: '#ffcc80',
		lighten2: '#ffb74d',
		lighten1: '#ffa726',
		darken1: '#fb8c00',
		darken2: '#f57c00',
		darken3: '#ef6c00',
		darken4: '#e65100',
		accent1: '#ffd180',
		accent2: '#ffab40',
		accent3: '#ff9100',
		accent4: '#ff6d00',
	}),
	g_ = Object.freeze({
		base: '#ff5722',
		lighten5: '#fbe9e7',
		lighten4: '#ffccbc',
		lighten3: '#ffab91',
		lighten2: '#ff8a65',
		lighten1: '#ff7043',
		darken1: '#f4511e',
		darken2: '#e64a19',
		darken3: '#d84315',
		darken4: '#bf360c',
		accent1: '#ff9e80',
		accent2: '#ff6e40',
		accent3: '#ff3d00',
		accent4: '#dd2c00',
	}),
	y_ = Object.freeze({
		base: '#795548',
		lighten5: '#efebe9',
		lighten4: '#d7ccc8',
		lighten3: '#bcaaa4',
		lighten2: '#a1887f',
		lighten1: '#8d6e63',
		darken1: '#6d4c41',
		darken2: '#5d4037',
		darken3: '#4e342e',
		darken4: '#3e2723',
	}),
	b_ = Object.freeze({
		base: '#607d8b',
		lighten5: '#eceff1',
		lighten4: '#cfd8dc',
		lighten3: '#b0bec5',
		lighten2: '#90a4ae',
		lighten1: '#78909c',
		darken1: '#546e7a',
		darken2: '#455a64',
		darken3: '#37474f',
		darken4: '#263238',
	}),
	p_ = Object.freeze({
		base: '#9e9e9e',
		lighten5: '#fafafa',
		lighten4: '#f5f5f5',
		lighten3: '#eeeeee',
		lighten2: '#e0e0e0',
		lighten1: '#bdbdbd',
		darken1: '#757575',
		darken2: '#616161',
		darken3: '#424242',
		darken4: '#212121',
	}),
	__ = Object.freeze({ black: '#000000', white: '#ffffff', transparent: '#ffffff00' }),
	C_ = Object.freeze({
		red: t_,
		pink: n_,
		purple: l_,
		deepPurple: a_,
		indigo: o_,
		blue: i_,
		lightBlue: s_,
		cyan: r_,
		teal: u_,
		green: c_,
		lightGreen: d_,
		lime: f_,
		yellow: v_,
		amber: m_,
		orange: h_,
		deepOrange: g_,
		brown: y_,
		blueGrey: b_,
		grey: p_,
		shades: __,
	});
function S_(e) {
	return Object.keys(e).map((t) => {
		const n = e[t];
		return n.base
			? [n.base, n.darken4, n.darken3, n.darken2, n.darken1, n.lighten1, n.lighten2, n.lighten3, n.lighten4, n.lighten5]
			: [n.black, n.white, n.transparent];
	});
}
const w_ = q({
	name: 'VColorPickerSwatches',
	props: {
		swatches: { type: Array, default: () => S_(C_) },
		disabled: Boolean,
		color: Object,
		maxHeight: [Number, String],
	},
	emits: { 'update:color': (e) => !0 },
	setup(e, t) {
		let { emit: n } = t;
		return (
			K(() =>
				m('div', { class: 'v-color-picker-swatches', style: { maxHeight: ee(e.maxHeight) } }, [
					m('div', null, [
						e.swatches.map((l) =>
							m('div', { class: 'v-color-picker-swatches__swatch' }, [
								l.map((a) => {
									const o = _v(a);
									return m(
										'div',
										{ class: 'v-color-picker-swatches__color', onClick: () => o && n('update:color', o) },
										[
											m('div', { style: { background: a } }, [
												e.color && kl(e.color, o)
													? m(
															Fe,
															{ size: 'x-small', icon: '$success', color: vp(a, '#FFFFFF') > 2 ? 'white' : 'black' },
															null,
													  )
													: void 0,
											]),
										],
									);
								}),
							]),
						),
					]),
				]),
			),
			{}
		);
	},
});
const xv = q({
		name: 'VSheet',
		props: { color: String, ..._t(), ...Ht(), ...Ue(), ...Gn(), ...Tl(), ...Ae(), ...fe(), ...ye() },
		setup(e, t) {
			let { slots: n } = t;
			const { themeClasses: l } = ke(e),
				{ backgroundColorClasses: a, backgroundColorStyles: o } = Re(N(e, 'color')),
				{ borderClasses: i } = Tt(e),
				{ dimensionStyles: s } = Nt(e),
				{ elevationClasses: r } = Xe(e),
				{ locationStyles: u } = Zn(e),
				{ positionClasses: c } = Al(e),
				{ roundedClasses: f } = Me(e);
			return () =>
				m(
					e.tag,
					{
						class: ['v-sheet', l.value, a.value, i.value, r.value, c.value, f.value],
						style: [o.value, s.value, u.value],
					},
					n,
				);
		},
	}),
	k_ = q({
		name: 'VColorPicker',
		inheritAttrs: !1,
		props: {
			canvasHeight: { type: [String, Number], default: 150 },
			disabled: Boolean,
			dotSize: { type: [Number, String], default: 10 },
			hideCanvas: Boolean,
			hideSliders: Boolean,
			hideInputs: Boolean,
			mode: { type: String, default: 'rgba', validator: (e) => Object.keys(Fn).includes(e) },
			modes: {
				type: Array,
				default: () => Object.keys(Fn),
				validator: (e) => Array.isArray(e) && e.every((t) => Object.keys(Fn).includes(t)),
			},
			showSwatches: Boolean,
			swatches: Array,
			swatchesMaxHeight: { type: [Number, String], default: 150 },
			modelValue: { type: [Object, String] },
			width: { type: [Number, String], default: 300 },
			...Ue(),
			...Ae(),
			...ye(),
		},
		emits: { 'update:modelValue': (e) => !0, 'update:mode': (e) => !0 },
		setup(e) {
			const t = he(e, 'mode'),
				n = R(null),
				l = he(
					e,
					'modelValue',
					void 0,
					(o) => {
						let i = _v(o);
						return i ? (n.value && ((i = { ...i, h: n.value.h }), (n.value = null)), i) : null;
					},
					(o) => (o ? q1(o, e.modelValue) : null),
				),
				a = (o) => {
					(l.value = o), (n.value = o);
				};
			return (
				lt(() => {
					e.modes.includes(t.value) || (t.value = e.modes[0]);
				}),
				K(() => {
					var o;
					return m(
						xv,
						{
							rounded: e.rounded,
							elevation: e.elevation,
							theme: e.theme,
							class: ['v-color-picker'],
							style: { '--v-color-picker-color-hsv': Ud({ ...((o = l.value) != null ? o : Qa), a: 1 }) },
							maxWidth: e.width,
						},
						{
							default: () => [
								!e.hideCanvas &&
									m(
										W1,
										{
											key: 'canvas',
											color: l.value,
											'onUpdate:color': a,
											disabled: e.disabled,
											dotSize: e.dotSize,
											width: e.width,
											height: e.canvasHeight,
										},
										null,
									),
								(!e.hideSliders || !e.hideInputs) &&
									m('div', { key: 'controls', class: 'v-color-picker__controls' }, [
										!e.hideSliders &&
											m(
												e_,
												{
													key: 'preview',
													color: l.value,
													'onUpdate:color': a,
													hideAlpha: !t.value.endsWith('a'),
													disabled: e.disabled,
												},
												null,
											),
										!e.hideInputs &&
											m(
												J1,
												{
													key: 'edit',
													modes: e.modes,
													mode: t.value,
													'onUpdate:mode': (i) => (t.value = i),
													color: l.value,
													'onUpdate:color': a,
													disabled: e.disabled,
												},
												null,
											),
									]),
								e.showSwatches &&
									m(
										w_,
										{
											key: 'swatches',
											color: l.value,
											'onUpdate:color': a,
											maxHeight: e.swatchesMaxHeight,
											swatches: e.swatches,
											disabled: e.disabled,
										},
										null,
									),
							],
						},
					);
				}),
				{}
			);
		},
	});
function x_(e, t, n) {
	if (Array.isArray(t)) throw new Error('Multiple matches is not implemented');
	return typeof t == 'number' && ~t
		? m(ge, null, [
				m('span', { class: 'v-combobox__unmask' }, [e.substr(0, t)]),
				m('span', { class: 'v-combobox__mask' }, [e.substr(t, n)]),
				m('span', { class: 'v-combobox__unmask' }, [e.substr(t + n)]),
		  ])
		: e;
}
const $_ = Ie()({
	name: 'VCombobox',
	props: {
		delimiters: Array,
		...ov({ filterKeys: ['title'] }),
		...ur({ hideNoData: !0, returnObject: !0 }),
		...Un(Ko({ modelValue: null }), ['validationValue', 'dirty', 'appendInnerIcon']),
		...cn({ transition: !1 }),
	},
	emits: { 'update:modelValue': (e) => !0, 'update:search': (e) => !0, 'update:menu': (e) => !0 },
	setup(e, t) {
		var M;
		var n;
		let { emit: l, slots: a } = t;
		const { t: o } = Ft(),
			i = R(),
			s = R(!1),
			r = R(!0),
			u = he(e, 'menu'),
			c = R(-1),
			f = C(() => {
				var P;
				return (P = i.value) == null ? void 0 : P.color;
			}),
			{ items: d, transformIn: v, transformOut: h } = sr(e),
			{ textColorClasses: y, textColorStyles: V } = rt(f),
			p = he(
				e,
				'modelValue',
				[],
				(P) => v(Lt(P || [])),
				(P) => {
					var U;
					const H = h(P);
					return e.multiple ? H : (U = H[0]) != null ? U : null;
				},
			),
			b = R(e.multiple ? '' : (M = (n = p.value[0]) == null ? void 0 : n.title) != null ? M : ''),
			g = C({
				get: () => b.value,
				set: (P) => {
					var H;
					if (
						((b.value = P),
						e.multiple || (p.value = [ol(e, P)]),
						P && e.multiple && (H = e.delimiters) != null && H.length)
					) {
						const U = P.split(new RegExp(`(?:${e.delimiters.join('|')})+`));
						U.length > 1 &&
							(U.forEach((Y) => {
								(Y = Y.trim()), Y && O(ol(e, Y));
							}),
							(b.value = ''));
					}
					P || (c.value = -1), s.value && (u.value = !0), (r.value = !P);
				},
			});
		ae(b, (P) => {
			l('update:search', P);
		}),
			ae(p, (P) => {
				var U;
				if (!e.multiple) {
					var H;
					b.value = (U = (H = P[0]) == null ? void 0 : H.title) != null ? U : '';
				}
			});
		const { filteredItems: x } = iv(
				e,
				d,
				C(() => (r.value ? void 0 : g.value)),
			),
			S = C(() => p.value.map((P) => d.value.find((H) => e.valueComparator(H.value, P.value)) || P)),
			w = C(() => S.value.map((P) => P.props.value)),
			k = C(() => S.value[c.value]),
			_ = R();
		function L(P) {
			(p.value = []), e.openOnClear && (u.value = !0);
		}
		function $() {
			(e.hideNoData && !d.value.length) || e.readonly || (u.value = !0);
		}
		function T(P) {
			if (e.readonly) return;
			const H = i.value.selectionStart,
				U = w.value.length;
			if (
				(c.value > -1 && P.preventDefault(),
				['Enter', 'ArrowDown'].includes(P.key) && (u.value = !0),
				['Escape'].includes(P.key) && (u.value = !1),
				['Enter', 'Escape', 'Tab'].includes(P.key) && (r.value = !0),
				P.key === 'ArrowDown')
			) {
				var Y;
				P.preventDefault(), (Y = _.value) == null || Y.focus('next');
			} else if (P.key === 'ArrowUp') {
				var Q;
				P.preventDefault(), (Q = _.value) == null || Q.focus('prev');
			}
			if (!!e.multiple) {
				if (['Backspace', 'Delete'].includes(P.key)) {
					if (c.value < 0) {
						P.key === 'Backspace' && !g.value && (c.value = U - 1);
						return;
					}
					O(k.value), Te(() => !k.value && (c.value = U - 2));
				}
				if (P.key === 'ArrowLeft') {
					if (c.value < 0 && H > 0) return;
					const ne = c.value > -1 ? c.value - 1 : U - 1;
					S.value[ne] ? (c.value = ne) : ((c.value = -1), i.value.setSelectionRange(g.value.length, g.value.length));
				}
				if (P.key === 'ArrowRight') {
					if (c.value < 0) return;
					const ne = c.value + 1;
					S.value[ne] ? (c.value = ne) : ((c.value = -1), i.value.setSelectionRange(0, 0));
				}
				P.key === 'Enter' && (O(ol(e, g.value)), (g.value = ''));
			}
		}
		function E() {
			s.value && (r.value = !0);
		}
		function O(P) {
			if (e.multiple) {
				const H = w.value.findIndex((U) => U === P.value);
				if (H === -1) p.value = [...p.value, P];
				else {
					const U = [...p.value];
					U.splice(H, 1), (p.value = U);
				}
				g.value = '';
			} else
				(p.value = [P]),
					(b.value = P.title),
					Te(() => {
						(u.value = !1), (r.value = !0);
					});
		}
		function B(P) {
			s.value = !0;
		}
		function D(P) {
			if (P.relatedTarget == null) {
				var H;
				(H = i.value) == null || H.focus();
			}
		}
		return (
			ae(x, (P) => {
				!P.length && e.hideNoData && (u.value = !1);
			}),
			ae(s, (P) => {
				if (P) c.value = -1;
				else {
					if (((u.value = !1), !e.multiple || !g.value)) return;
					(p.value = [...p.value, ol(e, g.value)]), (g.value = '');
				}
			}),
			K(() => {
				const P = !!(e.chips || a.chip),
					[H] = lr(e);
				return m(
					$a,
					le({ ref: i }, H, {
						modelValue: g.value,
						'onUpdate:modelValue': [
							(U) => (g.value = U),
							(U) => {
								U == null && (p.value = []);
							},
						],
						validationValue: p.externalValue,
						dirty: p.value.length > 0,
						class: [
							'v-combobox',
							{
								'v-combobox--active-menu': u.value,
								'v-combobox--chips': !!e.chips,
								'v-combobox--selecting-index': c.value > -1,
								[`v-combobox--${e.multiple ? 'multiple' : 'single'}`]: !0,
							},
						],
						appendInnerIcon: e.items.length ? e.menuIcon : void 0,
						readonly: e.readonly,
						'onClick:clear': L,
						'onClick:control': $,
						'onClick:input': $,
						onFocus: () => (s.value = !0),
						onBlur: () => (s.value = !1),
						onKeydown: T,
					}),
					{
						...a,
						default: () => {
							var U, Y, Q;
							return m(ge, null, [
								m(
									Zo,
									le(
										{
											modelValue: u.value,
											'onUpdate:modelValue': (ne) => (u.value = ne),
											activator: 'parent',
											contentClass: 'v-combobox__content',
											eager: e.eager,
											openOnClick: !1,
											closeOnContentClick: !1,
											transition: e.transition,
											onAfterLeave: E,
										},
										e.menuProps,
									),
									{
										default: () => [
											m(
												Yo,
												{
													ref: _,
													selected: w.value,
													selectStrategy: e.multiple ? 'independent' : 'single-independent',
													onMousedown: (ne) => ne.preventDefault(),
													onFocusin: B,
													onFocusout: D,
												},
												{
													default: () => {
														var ne;
														return [
															!x.value.length &&
																!e.hideNoData &&
																((ne = (U = a['no-data']) == null ? void 0 : U.call(a)) != null
																	? ne
																	: m(an, { title: o(e.noDataText) }, null)),
															(Y = a['prepend-item']) == null ? void 0 : Y.call(a),
															x.value.map((be, J) => {
																var ut;
																var _e;
																let { item: ue, matches: Ne } = be;
																return (ut =
																	(_e = a.item) == null
																		? void 0
																		: _e.call(a, {
																				item: ue,
																				index: J,
																				props: le(ue.props, { onClick: () => O(ue) }),
																		  })) != null
																	? ut
																	: m(an, le({ key: J }, ue.props, { onClick: () => O(ue) }), {
																			prepend: (ct) => {
																				let { isSelected: jt } = ct;
																				return e.multiple && !e.hideSelected
																					? m(Ol, { modelValue: jt, ripple: !1 }, null)
																					: void 0;
																			},
																			title: () => {
																				var jt;
																				var ct;
																				return r.value
																					? ue.title
																					: x_(
																							ue.title,
																							Ne.title,
																							(jt = (ct = g.value) == null ? void 0 : ct.length) != null ? jt : 0,
																					  );
																			},
																	  });
															}),
															(Q = a['append-item']) == null ? void 0 : Q.call(a),
														];
													},
												},
											),
										],
									},
								),
								S.value.map((ne, be) => {
									function J(ue) {
										ue.stopPropagation(), ue.preventDefault(), O(ne);
									}
									const _e = { 'onClick:close': J, modelValue: !0, 'onUpdate:modelValue': void 0 };
									return m(
										'div',
										{
											key: ne.value,
											class: ['v-combobox__selection', be === c.value && ['v-combobox__selection--selected', y.value]],
											style: be === c.value ? V.value : {},
										},
										[
											P
												? m(
														$e,
														{ defaults: { VChip: { closable: e.closableChips, size: 'small', text: ne.title } } },
														{ default: () => [a.chip ? a.chip({ item: ne, index: be, props: _e }) : m(La, _e, null)] },
												  )
												: a.selection
												? a.selection({ item: ne, index: be })
												: m('span', { class: 'v-combobox__selection-text' }, [
														ne.title,
														e.multiple &&
															be < S.value.length - 1 &&
															m('span', { class: 'v-combobox__selection-comma' }, [Sn(',')]),
												  ]),
										],
									);
								}),
							]);
						},
					},
				);
			}),
			Dt({ isFocused: s, isPristine: r, menu: u, search: g, selectionIndex: c, filteredItems: x, select: O }, i)
		);
	},
});
const V_ = Ie()({
	name: 'VDialog',
	props: {
		fullscreen: Boolean,
		retainFocus: { type: Boolean, default: !0 },
		scrollable: Boolean,
		...Ea({ origin: 'center center', scrollStrategy: 'block', transition: { component: No }, zIndex: 2400 }),
	},
	emits: { 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { slots: n } = t;
		const l = he(e, 'modelValue'),
			{ scopeId: a } = Ia(),
			o = R();
		function i(s) {
			var r, u;
			const c = s.relatedTarget,
				f = s.target;
			if (
				c !== f &&
				(r = o.value) != null &&
				r.contentEl &&
				(u = o.value) != null &&
				u.globalTop &&
				![document, o.value.contentEl].includes(f) &&
				!o.value.contentEl.contains(f)
			) {
				const d = [
					...o.value.contentEl.querySelectorAll(
						'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])',
					),
				].filter((y) => !y.hasAttribute('disabled') && !y.matches('[tabindex="-1"]'));
				if (!d.length) return;
				const v = d[0],
					h = d[d.length - 1];
				c === v ? h.focus() : v.focus();
			}
		}
		return (
			Be &&
				ae(
					() => l.value && e.retainFocus,
					(s) => {
						s ? document.addEventListener('focusin', i) : document.removeEventListener('focusin', i);
					},
					{ immediate: !0 },
				),
			ae(l, async (s) => {
				if ((await Te(), s)) {
					var r;
					(r = o.value.contentEl) == null || r.focus({ preventScroll: !0 });
				} else {
					var u;
					(u = o.value.activatorEl) == null || u.focus({ preventScroll: !0 });
				}
			}),
			K(() => {
				const [s] = Go(e);
				return m(
					Rl,
					le(
						{
							ref: o,
							class: ['v-dialog', { 'v-dialog--fullscreen': e.fullscreen, 'v-dialog--scrollable': e.scrollable }],
						},
						s,
						{
							modelValue: l.value,
							'onUpdate:modelValue': (r) => (l.value = r),
							'aria-role': 'dialog',
							'aria-modal': 'true',
							activatorProps: le({ 'aria-haspopup': 'dialog', 'aria-expanded': String(l.value) }, e.activatorProps),
						},
						a,
					),
					{
						activator: n.activator,
						default: function () {
							for (var r, u = arguments.length, c = new Array(u), f = 0; f < u; f++) c[f] = arguments[f];
							return m($e, { root: !0 }, { default: () => [(r = n.default) == null ? void 0 : r.call(n, ...c)] });
						},
					},
				);
			}),
			Dt({}, o)
		);
	},
});
const ha = Symbol.for('vuetify:v-expansion-panel'),
	L_ = ['default', 'accordion', 'inset', 'popout'],
	I_ = q({
		name: 'VExpansionPanels',
		props: {
			color: String,
			variant: { type: String, default: 'default', validator: (e) => L_.includes(e) },
			readonly: Boolean,
			...Ll(),
			...fe(),
			...ye(),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			Xn(e, ha);
			const { themeClasses: l } = ke(e),
				a = C(() => e.variant && `v-expansion-panels--variant-${e.variant}`);
			return (
				je({ VExpansionPanel: { color: N(e, 'color') }, VExpansionPanelTitle: { readonly: N(e, 'readonly') } }),
				K(() => m(e.tag, { class: ['v-expansion-panels', l.value, a.value] }, n)),
				{}
			);
		},
	}),
	$v = de(
		{
			color: String,
			expandIcon: { type: re, default: '$expand' },
			collapseIcon: { type: re, default: '$collapse' },
			hideActions: Boolean,
			ripple: { type: [Boolean, Object], default: !1 },
			readonly: Boolean,
		},
		'v-expansion-panel-title',
	),
	Vv = q({
		name: 'VExpansionPanelTitle',
		directives: { Ripple: xn },
		props: { ...$v() },
		setup(e, t) {
			let { slots: n } = t;
			const l = we(ha);
			if (!l) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel');
			const { backgroundColorClasses: a, backgroundColorStyles: o } = Re(e, 'color'),
				i = C(() => ({
					collapseIcon: e.collapseIcon,
					disabled: l.disabled.value,
					expanded: l.isSelected.value,
					expandIcon: e.expandIcon,
					readonly: e.readonly,
				}));
			return (
				K(() => {
					var s;
					return Oe(
						m(
							'button',
							{
								class: ['v-expansion-panel-title', { 'v-expansion-panel-title--active': l.isSelected.value }, a.value],
								style: o.value,
								type: 'button',
								tabindex: l.disabled.value ? -1 : void 0,
								disabled: l.disabled.value,
								'aria-expanded': l.isSelected.value,
								onClick: e.readonly ? void 0 : l.toggle,
							},
							[
								m('span', { class: 'v-expansion-panel-title__overlay' }, null),
								(s = n.default) == null ? void 0 : s.call(n, i.value),
								!e.hideActions &&
									m('span', { class: 'v-expansion-panel-title__icon' }, [
										n.actions
											? n.actions(i.value)
											: m(Fe, { icon: l.isSelected.value ? e.collapseIcon : e.expandIcon }, null),
									]),
							],
						),
						[[yt('ripple'), e.ripple]],
					);
				}),
				{}
			);
		},
	}),
	Lv = q({
		name: 'VExpansionPanelText',
		props: { ...Xo() },
		setup(e, t) {
			let { slots: n } = t;
			const l = we(ha);
			if (!l) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel');
			const { hasContent: a, onAfterLeave: o } = rr(e, l.isSelected);
			return (
				K(() => {
					var i;
					return m(
						Do,
						{ onAfterLeave: o },
						{
							default: () => [
								Oe(
									m('div', { class: 'v-expansion-panel-text' }, [
										n.default &&
											a.value &&
											m('div', { class: 'v-expansion-panel-text__wrapper' }, [
												(i = n.default) == null ? void 0 : i.call(n),
											]),
									]),
									[[Zt, l.isSelected.value]],
								),
							],
						},
					);
				}),
				{}
			);
		},
	}),
	E_ = q({
		name: 'VExpansionPanel',
		props: { title: String, text: String, bgColor: String, ...Ue(), ...Yn(), ...Xo(), ...Ae(), ...fe(), ...$v() },
		emits: { 'group:selected': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = Il(e, ha),
				{ backgroundColorClasses: a, backgroundColorStyles: o } = Re(e, 'bgColor'),
				{ elevationClasses: i } = Xe(e),
				{ roundedClasses: s } = Me(e),
				r = C(() => (l == null ? void 0 : l.disabled.value) || e.disabled),
				u = C(() =>
					l.group.items.value.reduce((d, v, h) => (l.group.selected.value.includes(v.id) && d.push(h), d), []),
				),
				c = C(() => {
					const d = l.group.items.value.findIndex((v) => v.id === l.id);
					return !l.isSelected.value && u.value.some((v) => v - d === 1);
				}),
				f = C(() => {
					const d = l.group.items.value.findIndex((v) => v.id === l.id);
					return !l.isSelected.value && u.value.some((v) => v - d === -1);
				});
			return (
				ze(ha, l),
				K(() => {
					var d;
					const v = !!(n.text || e.text),
						h = !!(n.title || e.title);
					return m(
						e.tag,
						{
							class: [
								'v-expansion-panel',
								{
									'v-expansion-panel--active': l.isSelected.value,
									'v-expansion-panel--before-active': c.value,
									'v-expansion-panel--after-active': f.value,
									'v-expansion-panel--disabled': r.value,
								},
								s.value,
								a.value,
							],
							style: o.value,
							'aria-expanded': l.isSelected.value,
						},
						{
							default: () => [
								m('div', { class: ['v-expansion-panel__shadow', ...i.value] }, null),
								h &&
									m(
										Vv,
										{
											key: 'title',
											collapseIcon: e.collapseIcon,
											color: e.color,
											expandIcon: e.expandIcon,
											hideActions: e.hideActions,
											ripple: e.ripple,
										},
										{ default: () => [n.title ? n.title() : e.title] },
									),
								v && m(Lv, { key: 'text', eager: e.eager }, { default: () => [n.text ? n.text() : e.text] }),
								(d = n.default) == null ? void 0 : d.call(n),
							],
						},
					);
				}),
				{}
			);
		},
	});
const T_ = q({
	name: 'VFileInput',
	inheritAttrs: !1,
	props: {
		chips: Boolean,
		counter: Boolean,
		counterSizeString: { type: String, default: '$vuetify.fileInput.counterSize' },
		counterString: { type: String, default: '$vuetify.fileInput.counter' },
		multiple: Boolean,
		hint: String,
		persistentHint: Boolean,
		placeholder: String,
		showSize: {
			type: [Boolean, Number],
			default: !1,
			validator: (e) => typeof e == 'boolean' || [1e3, 1024].includes(e),
		},
		...fn({ prependIcon: '$file' }),
		modelValue: {
			type: Array,
			default: () => [],
			validator: (e) => Lt(e).every((t) => t != null && typeof t == 'object'),
		},
		...Uo({ clearable: !0 }),
	},
	emits: { 'click:control': (e) => !0, 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { attrs: n, emit: l, slots: a } = t;
		const { t: o } = Ft(),
			i = he(e, 'modelValue'),
			s = C(() => (typeof e.showSize != 'boolean' ? e.showSize : void 0)),
			r = C(() => {
				var S;
				return ((S = i.value) != null ? S : []).reduce((w, k) => {
					let { size: _ = 0 } = k;
					return w + _;
				}, 0);
			}),
			u = C(() => vu(r.value, s.value)),
			c = C(() => {
				var S;
				return ((S = i.value) != null ? S : []).map((w) => {
					const { name: k = '', size: _ = 0 } = w;
					return e.showSize ? `${k} (${vu(_, s.value)})` : k;
				});
			}),
			f = C(() => {
				var k;
				var S;
				const w = (k = (S = i.value) == null ? void 0 : S.length) != null ? k : 0;
				return e.showSize ? o(e.counterSizeString, w, u.value) : o(e.counterString, w);
			}),
			d = R(),
			v = R(),
			h = R(!1),
			y = R(),
			V = C(() => (e.messages.length ? e.messages : e.persistentHint ? e.hint : ''));
		function p() {
			if (y.value !== document.activeElement) {
				var S;
				(S = y.value) == null || S.focus();
			}
			h.value || (h.value = !0);
		}
		function b(S) {
			vo(e['onClick:prepend'], S), g(S);
		}
		function g(S) {
			var w;
			(w = y.value) == null || w.click(), l('click:control', S);
		}
		function x(S) {
			S.stopPropagation(),
				p(),
				Te(() => {
					(i.value = []), y != null && y.value && (y.value.value = ''), vo(e['onClick:clear'], S);
				});
		}
		return (
			K(() => {
				const S = !!(a.counter || e.counter),
					w = !!(S || a.details),
					[k, _] = Wn(n),
					[{ modelValue: L, ...$ }] = $n(e),
					[T] = nr(e);
				return m(
					Jt,
					le(
						{
							ref: d,
							modelValue: i.value,
							'onUpdate:modelValue': (E) => (i.value = E),
							class: 'v-file-input',
							'onClick:prepend': b,
							'onClick:append': e['onClick:append'],
						},
						k,
						$,
						{ focused: h.value, messages: V.value },
					),
					{
						...a,
						default: (E) => {
							let { isDisabled: O, isDirty: B, isReadonly: D, isValid: M } = E;
							return m(
								xa,
								le(
									{
										ref: v,
										'prepend-icon': e.prependIcon,
										'onClick:control': g,
										'onClick:clear': x,
										'onClick:prependInner': e['onClick:prependInner'],
										'onClick:appendInner': e['onClick:appendInner'],
									},
									T,
									{ active: B.value || h.value, dirty: B.value, focused: h.value, error: M.value === !1 },
								),
								{
									...a,
									default: (P) => {
										var H;
										let {
											props: { class: U, ...Y },
										} = P;
										return m(ge, null, [
											m(
												'input',
												le(
													{
														ref: y,
														type: 'file',
														readonly: D.value,
														disabled: O.value,
														multiple: e.multiple,
														name: e.name,
														onClick: (Q) => {
															Q.stopPropagation(), p();
														},
														onChange: (Q) => {
															var be;
															if (!Q.target) return;
															const ne = Q.target;
															i.value = [...((be = ne.files) != null ? be : [])];
														},
														onFocus: p,
														onBlur: () => (h.value = !1),
													},
													Y,
													_,
												),
												null,
											),
											m('div', { class: U }, [
												!!((H = i.value) != null && H.length) &&
													(a.selection
														? a.selection({ fileNames: c.value, totalBytes: r.value, totalBytesReadable: u.value })
														: e.chips
														? c.value.map((Q) =>
																m(La, { key: Q, size: 'small', color: e.color }, { default: () => [Q] }),
														  )
														: c.value.join(', ')),
											]),
										]);
									},
								},
							);
						},
						details: w
							? (E) => {
									var O, B;
									return m(ge, null, [
										(O = a.details) == null ? void 0 : O.call(a, E),
										S &&
											m(ge, null, [
												m('span', null, null),
												m(Wo, { active: !!((B = i.value) != null && B.length), value: f.value }, a.counter),
											]),
									]);
							  }
							: void 0,
					},
				);
			}),
			Dt({}, d, v, y)
		);
	},
});
const A_ = q({
		name: 'VFooter',
		props: {
			app: Boolean,
			color: String,
			height: { type: [Number, String], default: 'auto' },
			..._t(),
			...Ue(),
			...xl(),
			...Ae(),
			...fe({ tag: 'footer' }),
			...ye(),
		},
		setup(e, t) {
			let { slots: n } = t;
			const { themeClasses: l } = ke(e),
				{ backgroundColorClasses: a, backgroundColorStyles: o } = Re(N(e, 'color')),
				{ borderClasses: i } = Tt(e),
				{ elevationClasses: s } = Xe(e),
				{ roundedClasses: r } = Me(e),
				u = R(32),
				{ resizeRef: c } = zn((v) => {
					!v.length || (u.value = v[0].target.clientHeight);
				}),
				f = C(() => (e.height === 'auto' ? u.value : parseInt(e.height, 10))),
				{ layoutItemStyles: d } = $l({
					id: e.name,
					order: C(() => parseInt(e.order, 10)),
					position: C(() => 'bottom'),
					layoutSize: f,
					elementSize: C(() => (e.height === 'auto' ? void 0 : f.value)),
					active: C(() => e.app),
					absolute: N(e, 'absolute'),
				});
			return (
				K(() =>
					m(
						e.tag,
						{
							ref: c,
							class: ['v-footer', l.value, a.value, i.value, s.value, r.value],
							style: [o.value, e.app ? d.value : void 0],
						},
						n,
					),
				),
				{}
			);
		},
	}),
	P_ = q({
		name: 'VForm',
		props: { ...O0() },
		emits: { 'update:modelValue': (e) => !0, submit: (e) => !0 },
		setup(e, t) {
			let { slots: n, emit: l } = t;
			const a = R0(e),
				o = R();
			function i(r) {
				r.preventDefault(), a.reset();
			}
			function s(r) {
				const u = r,
					c = a.validate();
				(u.then = c.then.bind(c)),
					(u.catch = c.catch.bind(c)),
					(u.finally = c.finally.bind(c)),
					l('submit', u),
					u.defaultPrevented ||
						c.then((f) => {
							let { valid: d } = f;
							if (d) {
								var v;
								(v = o.value) == null || v.submit();
							}
						}),
					u.preventDefault();
			}
			return (
				K(() => {
					var r;
					return m('form', { ref: o, class: 'v-form', novalidate: !0, onReset: i, onSubmit: s }, [
						(r = n.default) == null ? void 0 : r.call(n, a),
					]);
				}),
				Dt(a, o)
			);
		},
	});
const B_ = q({
		name: 'VContainer',
		props: { fluid: { type: Boolean, default: !1 }, ...fe() },
		setup(e, t) {
			let { slots: n } = t;
			return K(() => m(e.tag, { class: ['v-container', { 'v-container--fluid': e.fluid }] }, n)), {};
		},
	}),
	vr = ['sm', 'md', 'lg', 'xl', 'xxl'],
	Iv = (() => vr.reduce((e, t) => ((e[t] = { type: [Boolean, String, Number], default: !1 }), e), {}))(),
	Ev = (() => vr.reduce((e, t) => ((e['offset' + on(t)] = { type: [String, Number], default: null }), e), {}))(),
	Tv = (() => vr.reduce((e, t) => ((e['order' + on(t)] = { type: [String, Number], default: null }), e), {}))(),
	Wu = { col: Object.keys(Iv), offset: Object.keys(Ev), order: Object.keys(Tv) };
function O_(e, t, n) {
	let l = e;
	if (!(n == null || n === !1)) {
		if (t) {
			const a = t.replace(e, '');
			l += `-${a}`;
		}
		return e === 'col' && (l = 'v-' + l), (e === 'col' && (n === '' || n === !0)) || (l += `-${n}`), l.toLowerCase();
	}
}
const R_ = ['auto', 'start', 'end', 'center', 'baseline', 'stretch'],
	M_ = q({
		name: 'VCol',
		props: {
			cols: { type: [Boolean, String, Number], default: !1 },
			...Iv,
			offset: { type: [String, Number], default: null },
			...Ev,
			order: { type: [String, Number], default: null },
			...Tv,
			alignSelf: { type: String, default: null, validator: (e) => R_.includes(e) },
			...fe(),
		},
		setup(e, t) {
			let { slots: n } = t;
			const l = C(() => {
				const a = [];
				let o;
				for (o in Wu)
					Wu[o].forEach((s) => {
						const r = e[s],
							u = O_(o, s, r);
						u && a.push(u);
					});
				const i = a.some((s) => s.startsWith('v-col-'));
				return (
					a.push({
						'v-col': !i || !e.cols,
						[`v-col-${e.cols}`]: e.cols,
						[`offset-${e.offset}`]: e.offset,
						[`order-${e.order}`]: e.order,
						[`align-self-${e.alignSelf}`]: e.alignSelf,
					}),
					a
				);
			});
			return () => {
				var a;
				return Rt(e.tag, { class: l.value }, (a = n.default) == null ? void 0 : a.call(n));
			};
		},
	}),
	F_ = ['sm', 'md', 'lg', 'xl', 'xxl'],
	mr = ['start', 'end', 'center'],
	Av = ['space-between', 'space-around', 'space-evenly'];
function hr(e, t) {
	return F_.reduce((n, l) => ((n[e + on(l)] = t()), n), {});
}
const H_ = [...mr, 'baseline', 'stretch'],
	Pv = (e) => H_.includes(e),
	Bv = hr('align', () => ({ type: String, default: null, validator: Pv })),
	N_ = [...mr, ...Av],
	Ov = (e) => N_.includes(e),
	Rv = hr('justify', () => ({ type: String, default: null, validator: Ov })),
	D_ = [...mr, ...Av, 'stretch'],
	Mv = (e) => D_.includes(e),
	Fv = hr('alignContent', () => ({ type: String, default: null, validator: Mv })),
	Ku = { align: Object.keys(Bv), justify: Object.keys(Rv), alignContent: Object.keys(Fv) },
	j_ = { align: 'align', justify: 'justify', alignContent: 'align-content' };
function z_(e, t, n) {
	let l = j_[e];
	if (n != null) {
		if (t) {
			const a = t.replace(e, '');
			l += `-${a}`;
		}
		return (l += `-${n}`), l.toLowerCase();
	}
}
const U_ = q({
		name: 'VRow',
		props: {
			dense: Boolean,
			noGutters: Boolean,
			align: { type: String, default: null, validator: Pv },
			...Bv,
			justify: { type: String, default: null, validator: Ov },
			...Rv,
			alignContent: { type: String, default: null, validator: Mv },
			...Fv,
			...fe(),
		},
		setup(e, t) {
			let { slots: n } = t;
			const l = C(() => {
				const a = [];
				let o;
				for (o in Ku)
					Ku[o].forEach((i) => {
						const s = e[i],
							r = z_(o, i, s);
						r && a.push(r);
					});
				return (
					a.push({
						'v-row--no-gutters': e.noGutters,
						'v-row--dense': e.dense,
						[`align-${e.align}`]: e.align,
						[`justify-${e.justify}`]: e.justify,
						[`align-content-${e.alignContent}`]: e.alignContent,
					}),
					a
				);
			});
			return () => {
				var a;
				return Rt(e.tag, { class: ['v-row', l.value] }, (a = n.default) == null ? void 0 : a.call(n));
			};
		},
	}),
	W_ = Et('flex-grow-1', 'div', 'VSpacer'),
	K_ = q({
		name: 'VHover',
		props: { disabled: Boolean, modelValue: { type: Boolean, default: void 0 }, ...Zf() },
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = he(e, 'modelValue'),
				{ runOpenDelay: a, runCloseDelay: o } = Jf(e, (i) => !e.disabled && (l.value = i));
			return () => {
				var i;
				return (i = n.default) == null
					? void 0
					: i.call(n, { isHovering: l.value, props: { onMouseenter: a, onMouseleave: o } });
			};
		},
	});
const Hv = Symbol.for('vuetify:v-item-group'),
	q_ = q({
		name: 'VItemGroup',
		props: { ...Ll({ selectedClass: 'v-item--selected' }), ...fe(), ...ye() },
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const { themeClasses: l } = ke(e),
				{ isSelected: a, select: o, next: i, prev: s, selected: r } = Xn(e, Hv);
			return () => {
				var u;
				return m(
					e.tag,
					{ class: ['v-item-group', l.value] },
					{
						default: () => [
							(u = n.default) == null
								? void 0
								: u.call(n, { isSelected: a, select: o, next: i, prev: s, selected: r.value }),
						],
					},
				);
			};
		},
	}),
	Y_ = Ie()({
		name: 'VItem',
		props: Yn(),
		emits: { 'group:selected': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const { isSelected: l, select: a, toggle: o, selectedClass: i, value: s, disabled: r } = Il(e, Hv);
			return () => {
				var u;
				return (u = n.default) == null
					? void 0
					: u.call(n, {
							isSelected: l.value,
							selectedClass: i.value,
							select: a,
							toggle: o,
							value: s.value,
							disabled: r.value,
					  });
			};
		},
	});
const X_ = Et('v-kbd');
const G_ = q({
	name: 'VLayout',
	props: of(),
	setup(e, t) {
		let { slots: n } = t;
		const { layoutClasses: l, layoutStyles: a, getLayoutItem: o, items: i, layoutRef: s } = sf(e);
		return (
			K(() => {
				var r;
				return m('div', { ref: s, class: l.value, style: a.value }, [(r = n.default) == null ? void 0 : r.call(n)]);
			}),
			{ getLayoutItem: o, items: i }
		);
	},
});
const Z_ = q({
		name: 'VLayoutItem',
		props: {
			position: { type: String, required: !0 },
			size: { type: [Number, String], default: 300 },
			modelValue: Boolean,
			...xl(),
		},
		setup(e, t) {
			let { slots: n } = t;
			const { layoutItemStyles: l } = $l({
				id: e.name,
				order: C(() => parseInt(e.order, 10)),
				position: N(e, 'position'),
				elementSize: N(e, 'size'),
				layoutSize: N(e, 'size'),
				active: N(e, 'modelValue'),
				absolute: N(e, 'absolute'),
			});
			return () => {
				var a;
				return m('div', { class: ['v-layout-item'], style: l.value }, [(a = n.default) == null ? void 0 : a.call(n)]);
			};
		},
	}),
	J_ = q({
		name: 'VLazy',
		directives: { intersect: wa },
		props: {
			modelValue: Boolean,
			options: { type: Object, default: () => ({ root: void 0, rootMargin: void 0, threshold: void 0 }) },
			...Ht(),
			...fe(),
			...cn({ transition: 'fade-transition' }),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const { dimensionStyles: l } = Nt(e),
				a = he(e, 'modelValue');
			function o(i) {
				a.value || (a.value = i);
			}
			return (
				K(() => {
					var i;
					return Oe(
						m(
							e.tag,
							{ class: 'v-lazy', style: l.value },
							{
								default: () => [
									a.value &&
										m(
											Yt,
											{ transition: e.transition, appear: !0 },
											{ default: () => [(i = n.default) == null ? void 0 : i.call(n)] },
										),
								],
							},
						),
						[[yt('intersect'), o, e.options]],
					);
				}),
				{}
			);
		},
	});
const Q_ = q({
	name: 'VLocaleProvider',
	props: { locale: String, fallbackLocale: String, messages: Object, rtl: { type: Boolean, default: void 0 } },
	setup(e, t) {
		let { slots: n } = t;
		const { rtlClasses: l } = Op(e);
		return (
			K(() => {
				var a;
				return m('div', { class: ['v-locale-provider', l.value] }, [(a = n.default) == null ? void 0 : a.call(n)]);
			}),
			{}
		);
	},
});
const eC = q({
	name: 'VMain',
	props: { scrollable: Boolean, ...fe({ tag: 'main' }) },
	setup(e, t) {
		let { slots: n } = t;
		const { mainStyles: l } = Yp(),
			{ ssrBootStyles: a } = dr();
		return (
			K(() => {
				var o, i;
				return m(
					e.tag,
					{ class: ['v-main', { 'v-main--scrollable': e.scrollable }], style: [l.value, a.value] },
					{
						default: () => [
							e.scrollable
								? m('div', { class: 'v-main__scroller' }, [(o = n.default) == null ? void 0 : o.call(n)])
								: (i = n.default) == null
								? void 0
								: i.call(n),
						],
					},
				);
			}),
			{}
		);
	},
});
function tC(e) {
	let { rootEl: t, isSticky: n, layoutItemStyles: l } = e;
	const a = R(!1),
		o = R(0),
		i = C(() => {
			const u = typeof a.value == 'boolean' ? 'top' : a.value;
			return [
				n.value ? { top: 'auto', bottom: 'auto', height: void 0 } : void 0,
				a.value ? { [u]: ee(o.value) } : { top: l.value.top },
			];
		});
	lt(() => {
		ae(
			n,
			(u) => {
				u ? window.addEventListener('scroll', r, { passive: !0 }) : window.removeEventListener('scroll', r);
			},
			{ immediate: !0 },
		);
	}),
		Je(() => {
			document.removeEventListener('scroll', r);
		});
	let s = 0;
	function r() {
		var h;
		const u = s > window.scrollY ? 'up' : 'down',
			c = t.value.getBoundingClientRect(),
			f = parseFloat((h = l.value.top) != null ? h : 0),
			d = window.scrollY - Math.max(0, o.value - f),
			v = c.height + Math.max(o.value, f) - window.scrollY - window.innerHeight;
		c.height < window.innerHeight - f
			? ((a.value = 'top'), (o.value = f))
			: (u === 'up' && a.value === 'bottom') || (u === 'down' && a.value === 'top')
			? ((o.value = window.scrollY + c.top), (a.value = !0))
			: u === 'down' && v <= 0
			? ((o.value = 0), (a.value = 'bottom'))
			: u === 'up' && d <= 0 && ((o.value = c.top + d), (a.value = 'top')),
			(s = window.scrollY);
	}
	return { isStuck: a, stickyStyles: i };
}
const nC = 100,
	lC = 20;
function qu(e) {
	const t = 1.41421356237;
	return (e < 0 ? -1 : 1) * Math.sqrt(Math.abs(e)) * t;
}
function Yu(e) {
	if (e.length < 2) return 0;
	if (e.length === 2) return e[1].t === e[0].t ? 0 : (e[1].d - e[0].d) / (e[1].t - e[0].t);
	let t = 0;
	for (let n = e.length - 1; n > 0; n--) {
		if (e[n].t === e[n - 1].t) continue;
		const l = qu(t),
			a = (e[n].d - e[n - 1].d) / (e[n].t - e[n - 1].t);
		(t += (a - l) * Math.abs(a)), n === e.length - 1 && (t *= 0.5);
	}
	return qu(t) * 1e3;
}
function aC() {
	const e = {};
	function t(a) {
		Array.from(a.changedTouches).forEach((o) => {
			var s;
			((s = e[o.identifier]) != null ? s : (e[o.identifier] = new Gb(lC))).push([a.timeStamp, o]);
		});
	}
	function n(a) {
		Array.from(a.changedTouches).forEach((o) => {
			delete e[o.identifier];
		});
	}
	function l(a) {
		var o;
		const i = (o = e[a]) == null ? void 0 : o.values().reverse();
		if (!i) throw new Error(`No samples for touch id ${a}`);
		const s = i[0],
			r = [],
			u = [];
		for (const c of i) {
			if (s[0] - c[0] > nC) break;
			r.push({ t: c[0], d: c[1].clientX }), u.push({ t: c[0], d: c[1].clientY });
		}
		return {
			x: Yu(r),
			y: Yu(u),
			get direction() {
				const { x: c, y: f } = this,
					[d, v] = [Math.abs(c), Math.abs(f)];
				return d > v && c >= 0
					? 'right'
					: d > v && c <= 0
					? 'left'
					: v > d && f >= 0
					? 'down'
					: v > d && f <= 0
					? 'up'
					: oC();
			},
		};
	}
	return { addMovement: t, endTouch: n, getVelocity: l };
}
function oC() {
	throw new Error();
}
function iC(e) {
	let { isActive: t, isTemporary: n, width: l, touchless: a, position: o } = e;
	lt(() => {
		window.addEventListener('touchstart', p, { passive: !0 }),
			window.addEventListener('touchmove', b, { passive: !1 }),
			window.addEventListener('touchend', g, { passive: !0 });
	}),
		Je(() => {
			window.removeEventListener('touchstart', p),
				window.removeEventListener('touchmove', b),
				window.removeEventListener('touchend', g);
		});
	const i = C(() => o.value !== 'bottom'),
		{ addMovement: s, endTouch: r, getVelocity: u } = aC();
	let c = !1;
	const f = R(!1),
		d = R(0),
		v = R(0);
	let h;
	function y(S, w) {
		return (
			(o.value === 'left'
				? S
				: o.value === 'right'
				? document.documentElement.clientWidth - S
				: o.value === 'bottom'
				? document.documentElement.clientHeight - S
				: ll()) - (w ? l.value : 0)
		);
	}
	function V(S) {
		let w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
		const k =
			o.value === 'left'
				? (S - v.value) / l.value
				: o.value === 'right'
				? (document.documentElement.clientWidth - S - v.value) / l.value
				: o.value === 'bottom'
				? (document.documentElement.clientHeight - S - v.value) / l.value
				: ll();
		return w ? Math.max(0, Math.min(1, k)) : k;
	}
	function p(S) {
		if (a.value) return;
		const w = S.changedTouches[0].clientX,
			k = S.changedTouches[0].clientY,
			_ = 25,
			L =
				o.value === 'left'
					? w < _
					: o.value === 'right'
					? w > document.documentElement.clientWidth - _
					: o.value === 'bottom'
					? k > document.documentElement.clientHeight - _
					: ll(),
			$ =
				t.value &&
				(o.value === 'left'
					? w < l.value
					: o.value === 'right'
					? w > document.documentElement.clientWidth - l.value
					: o.value === 'bottom'
					? k > document.documentElement.clientHeight - l.value
					: ll());
		(L || $ || (t.value && n.value)) &&
			((c = !0), (h = [w, k]), (v.value = y(i.value ? w : k, t.value)), (d.value = V(i.value ? w : k)), r(S), s(S));
	}
	function b(S) {
		const w = S.changedTouches[0].clientX,
			k = S.changedTouches[0].clientY;
		if (c) {
			if (!S.cancelable) {
				c = !1;
				return;
			}
			const L = Math.abs(w - h[0]),
				$ = Math.abs(k - h[1]);
			(i.value ? L > $ && L > 3 : $ > L && $ > 3) ? ((f.value = !0), (c = !1)) : (i.value ? $ : L) > 3 && (c = !1);
		}
		if (!f.value) return;
		S.preventDefault(), s(S);
		const _ = V(i.value ? w : k, !1);
		(d.value = Math.max(0, Math.min(1, _))),
			_ > 1 ? (v.value = y(i.value ? w : k, !0)) : _ < 0 && (v.value = y(i.value ? w : k, !1));
	}
	function g(S) {
		if (((c = !1), !f.value)) return;
		s(S), (f.value = !1);
		const w = u(S.changedTouches[0].identifier),
			k = Math.abs(w.x),
			_ = Math.abs(w.y);
		(i.value ? k > _ && k > 400 : _ > k && _ > 3)
			? (t.value = w.direction === ({ left: 'right', right: 'left', bottom: 'up' }[o.value] || ll()))
			: (t.value = d.value > 0.5);
	}
	const x = C(() =>
		f.value
			? {
					transform:
						o.value === 'left'
							? `translateX(calc(-100% + ${d.value * l.value}px))`
							: o.value === 'right'
							? `translateX(calc(100% - ${d.value * l.value}px))`
							: o.value === 'bottom'
							? `translateY(calc(100% - ${d.value * l.value}px))`
							: ll(),
					transition: 'none',
			  }
			: void 0,
	);
	return { isDragging: f, dragProgress: d, dragStyles: x };
}
function ll() {
	throw new Error();
}
const sC = ['start', 'end', 'left', 'right', 'bottom'],
	rC = q({
		name: 'VNavigationDrawer',
		props: {
			color: String,
			disableResizeWatcher: Boolean,
			disableRouteWatcher: Boolean,
			expandOnHover: Boolean,
			floating: Boolean,
			modelValue: { type: Boolean, default: null },
			permanent: Boolean,
			rail: Boolean,
			railWidth: { type: [Number, String], default: 56 },
			scrim: { type: [String, Boolean], default: !0 },
			image: String,
			temporary: Boolean,
			touchless: Boolean,
			width: { type: [Number, String], default: 256 },
			location: { type: String, default: 'start', validator: (e) => sC.includes(e) },
			sticky: Boolean,
			..._t(),
			...Ue(),
			...xl(),
			...Ae(),
			...fe({ tag: 'nav' }),
			...ye(),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { attrs: n, slots: l } = t;
			const { isRtl: a } = un(),
				{ themeClasses: o } = ke(e),
				{ borderClasses: i } = Tt(e),
				{ backgroundColorClasses: s, backgroundColorStyles: r } = Re(N(e, 'color')),
				{ elevationClasses: u } = Xe(e),
				{ mobile: c } = Sa(),
				{ roundedClasses: f } = Me(e),
				d = xf(),
				v = he(e, 'modelValue', null, (M) => !!M),
				{ ssrBootStyles: h } = dr(),
				y = R(),
				V = R(!1),
				p = C(() => (e.rail && e.expandOnHover && V.value ? Number(e.width) : Number(e.rail ? e.railWidth : e.width))),
				b = C(() => Ki(e.location, a.value)),
				g = C(() => !e.permanent && (c.value || e.temporary)),
				x = C(() => e.sticky && !g.value && b.value !== 'bottom');
			e.disableResizeWatcher || ae(g, (M) => !e.permanent && Te(() => (v.value = !M))),
				!e.disableRouteWatcher && d && ae(d.currentRoute, () => g.value && (v.value = !1)),
				ae(
					() => e.permanent,
					(M) => {
						M && (v.value = !0);
					},
				),
				Ao(() => {
					e.modelValue != null || g.value || (v.value = e.permanent || !c.value);
				});
			const {
					isDragging: S,
					dragProgress: w,
					dragStyles: k,
				} = iC({ isActive: v, isTemporary: g, width: p, touchless: N(e, 'touchless'), position: b }),
				_ = C(() => {
					const M = g.value ? 0 : e.rail && e.expandOnHover ? Number(e.railWidth) : p.value;
					return S.value ? M * w.value : M;
				}),
				{
					layoutItemStyles: L,
					layoutRect: $,
					layoutItemScrimStyles: T,
				} = $l({
					id: e.name,
					order: C(() => parseInt(e.order, 10)),
					position: b,
					layoutSize: _,
					elementSize: p,
					active: C(() => v.value || S.value),
					disableTransitions: C(() => S.value),
					absolute: C(() => e.absolute || (x.value && typeof E.value != 'string')),
				}),
				{ isStuck: E, stickyStyles: O } = tC({ rootEl: y, isSticky: x, layoutItemStyles: L }),
				B = Re(C(() => (typeof e.scrim == 'string' ? e.scrim : null))),
				D = C(() => ({
					...(S.value ? { opacity: w.value * 0.2, transition: 'none' } : void 0),
					...($.value
						? { left: ee($.value.left), right: ee($.value.right), top: ee($.value.top), bottom: ee($.value.bottom) }
						: void 0),
					...T.value,
				}));
			return (
				je({ VList: { bgColor: 'transparent' } }),
				K(() => {
					var M, P, H, U;
					const Y = l.image || e.image;
					return m(ge, null, [
						m(
							e.tag,
							le(
								{
									ref: y,
									onMouseenter: () => (V.value = !0),
									onMouseleave: () => (V.value = !1),
									class: [
										'v-navigation-drawer',
										`v-navigation-drawer--${b.value}`,
										{
											'v-navigation-drawer--expand-on-hover': e.expandOnHover,
											'v-navigation-drawer--floating': e.floating,
											'v-navigation-drawer--is-hovering': V.value,
											'v-navigation-drawer--rail': e.rail,
											'v-navigation-drawer--temporary': g.value,
											'v-navigation-drawer--active': v.value,
											'v-navigation-drawer--sticky': x.value,
										},
										o.value,
										s.value,
										i.value,
										u.value,
										f.value,
									],
									style: [r.value, L.value, k.value, h.value, O.value],
								},
								n,
							),
							{
								default: () => [
									Y &&
										m('div', { key: 'image', class: 'v-navigation-drawer__img' }, [
											l.image
												? (M = l.image) == null
													? void 0
													: M.call(l, { image: e.image })
												: m('img', { src: e.image, alt: '' }, null),
										]),
									l.prepend &&
										m('div', { class: 'v-navigation-drawer__prepend' }, [(P = l.prepend) == null ? void 0 : P.call(l)]),
									m('div', { class: 'v-navigation-drawer__content' }, [(H = l.default) == null ? void 0 : H.call(l)]),
									l.append &&
										m('div', { class: 'v-navigation-drawer__append' }, [(U = l.append) == null ? void 0 : U.call(l)]),
								],
							},
						),
						m(
							Xt,
							{ name: 'fade-transition' },
							{
								default: () => [
									g.value &&
										(S.value || v.value) &&
										!!e.scrim &&
										m(
											'div',
											{
												class: ['v-navigation-drawer__scrim', B.backgroundColorClasses.value],
												style: [D.value, B.backgroundColorStyles.value],
												onClick: () => (v.value = !1),
											},
											null,
										),
								],
							},
						),
					]);
				}),
				{ isStuck: E }
			);
		},
	}),
	uC = q({
		name: 'VNoSsr',
		setup(e, t) {
			let { slots: n } = t;
			const l = tv();
			return () => {
				var a;
				return l.value && ((a = n.default) == null ? void 0 : a.call(n));
			};
		},
	});
function cC() {
	const e = R([]);
	Mc(() => (e.value = []));
	function t(n, l) {
		e.value[l] = n;
	}
	return { refs: e, updateRef: t };
}
const dC = q({
	name: 'VPagination',
	props: {
		activeColor: String,
		start: { type: [Number, String], default: 1 },
		modelValue: { type: Number, default: (e) => e.start },
		disabled: Boolean,
		length: { type: [Number, String], default: 1, validator: (e) => e % 1 === 0 },
		totalVisible: [Number, String],
		firstIcon: { type: re, default: '$first' },
		prevIcon: { type: re, default: '$prev' },
		nextIcon: { type: re, default: '$next' },
		lastIcon: { type: re, default: '$last' },
		ariaLabel: { type: String, default: '$vuetify.pagination.ariaLabel.root' },
		pageAriaLabel: { type: String, default: '$vuetify.pagination.ariaLabel.page' },
		currentPageAriaLabel: { type: String, default: '$vuetify.pagination.ariaLabel.currentPage' },
		firstAriaLabel: { type: String, default: '$vuetify.pagination.ariaLabel.first' },
		previousAriaLabel: { type: String, default: '$vuetify.pagination.ariaLabel.previous' },
		nextAriaLabel: { type: String, default: '$vuetify.pagination.ariaLabel.next' },
		lastAriaLabel: { type: String, default: '$vuetify.pagination.ariaLabel.last' },
		ellipsis: { type: String, default: '...' },
		showFirstLastPage: Boolean,
		..._t(),
		...qe(),
		...Ue(),
		...Ae(),
		...dn(),
		...fe({ tag: 'nav' }),
		...ye(),
		...At({ variant: 'text' }),
	},
	emits: { 'update:modelValue': (e) => !0, first: (e) => !0, prev: (e) => !0, next: (e) => !0, last: (e) => !0 },
	setup(e, t) {
		let { slots: n, emit: l } = t;
		const a = he(e, 'modelValue'),
			{ t: o, n: i } = Ft(),
			{ isRtl: s } = un(),
			{ themeClasses: r } = ke(e),
			u = R(-1);
		je(void 0, { scoped: !0 });
		const { resizeRef: c } = zn((w) => {
				if (!w.length) return;
				const { target: k, contentRect: _ } = w[0],
					L = k.querySelector('.v-pagination__list > *');
				if (!L) return;
				const $ = _.width,
					T = L.offsetWidth + parseFloat(getComputedStyle(L).marginRight) * 2,
					E = e.showFirstLastPage ? 5 : 3;
				u.value = Math.max(0, Math.floor(+(($ - T * E) / T).toFixed(2)));
			}),
			f = C(() => parseInt(e.length, 10)),
			d = C(() => parseInt(e.start, 10)),
			v = C(() => (e.totalVisible ? parseInt(e.totalVisible, 10) : u.value >= 0 ? u.value : f.value)),
			h = C(() => {
				if (f.value <= 0 || isNaN(f.value) || f.value > Number.MAX_SAFE_INTEGER) return [];
				if (v.value <= 1) return [a.value];
				if (f.value <= v.value) return On(f.value, d.value);
				const w = v.value % 2 === 0,
					k = w ? v.value / 2 : Math.floor(v.value / 2),
					_ = w ? k : k + 1,
					L = f.value - k;
				if (_ - a.value >= 0) return [...On(Math.max(1, v.value - 1), d.value), e.ellipsis, f.value];
				if (a.value - L >= (w ? 1 : 0)) {
					const $ = v.value - 1,
						T = f.value - $ + d.value;
					return [d.value, e.ellipsis, ...On($, T)];
				} else {
					const $ = Math.max(1, v.value - 3),
						T = $ === 1 ? a.value : a.value - Math.ceil($ / 2) + d.value;
					return [d.value, e.ellipsis, ...On($, T), e.ellipsis, f.value];
				}
			});
		function y(w, k, _) {
			w.preventDefault(), (a.value = k), _ && l(_, k);
		}
		const { refs: V, updateRef: p } = cC();
		je({
			VPaginationBtn: {
				color: N(e, 'color'),
				border: N(e, 'border'),
				density: N(e, 'density'),
				size: N(e, 'size'),
				variant: N(e, 'variant'),
				rounded: N(e, 'rounded'),
				elevation: N(e, 'elevation'),
			},
		});
		const b = C(() =>
				h.value.map((w, k) => {
					const _ = (L) => p(L, k);
					if (typeof w == 'string')
						return {
							isActive: !1,
							key: `ellipsis-${k}`,
							page: w,
							props: { ref: _, ellipsis: !0, icon: !0, disabled: !0 },
						};
					{
						const L = w === a.value;
						return {
							isActive: L,
							key: w,
							page: i(w),
							props: {
								ref: _,
								ellipsis: !1,
								icon: !0,
								disabled: !!e.disabled || e.length < 2,
								color: L ? e.activeColor : e.color,
								ariaCurrent: L,
								ariaLabel: o(L ? e.currentPageAriaLabel : e.pageAriaLabel, k + 1),
								onClick: ($) => y($, w),
							},
						};
					}
				}),
			),
			g = C(() => {
				const w = !!e.disabled || a.value <= d.value,
					k = !!e.disabled || a.value >= d.value + f.value - 1;
				return {
					first: e.showFirstLastPage
						? {
								icon: s.value ? e.lastIcon : e.firstIcon,
								onClick: (_) => y(_, d.value, 'first'),
								disabled: w,
								ariaLabel: o(e.firstAriaLabel),
								ariaDisabled: w,
						  }
						: void 0,
					prev: {
						icon: s.value ? e.nextIcon : e.prevIcon,
						onClick: (_) => y(_, a.value - 1, 'prev'),
						disabled: w,
						ariaLabel: o(e.previousAriaLabel),
						ariaDisabled: w,
					},
					next: {
						icon: s.value ? e.prevIcon : e.nextIcon,
						onClick: (_) => y(_, a.value + 1, 'next'),
						disabled: k,
						ariaLabel: o(e.nextAriaLabel),
						ariaDisabled: k,
					},
					last: e.showFirstLastPage
						? {
								icon: s.value ? e.firstIcon : e.lastIcon,
								onClick: (_) => y(_, d.value + f.value - 1, 'last'),
								disabled: k,
								ariaLabel: o(e.lastAriaLabel),
								ariaDisabled: k,
						  }
						: void 0,
				};
			});
		function x() {
			var w;
			const k = a.value - d.value;
			(w = V.value[k]) == null || w.$el.focus();
		}
		function S(w) {
			w.key === Ui.left && !e.disabled && a.value > e.start
				? ((a.value = a.value - 1), Te(x))
				: w.key === Ui.right && !e.disabled && a.value < d.value + f.value - 1 && ((a.value = a.value + 1), Te(x));
		}
		return (
			K(() =>
				m(
					e.tag,
					{
						ref: c,
						class: ['v-pagination', r.value],
						role: 'navigation',
						'aria-label': o(e.ariaLabel),
						onKeydown: S,
						'data-test': 'v-pagination-root',
					},
					{
						default: () => [
							m('ul', { class: 'v-pagination__list' }, [
								e.showFirstLastPage &&
									m('li', { key: 'first', class: 'v-pagination__first', 'data-test': 'v-pagination-first' }, [
										n.first ? n.first(g.value.first) : m(it, le({ _as: 'VPaginationBtn' }, g.value.first), null),
									]),
								m('li', { key: 'prev', class: 'v-pagination__prev', 'data-test': 'v-pagination-prev' }, [
									n.prev ? n.prev(g.value.prev) : m(it, le({ _as: 'VPaginationBtn' }, g.value.prev), null),
								]),
								b.value.map((w, k) =>
									m(
										'li',
										{
											key: w.key,
											class: ['v-pagination__item', { 'v-pagination__item--is-active': w.isActive }],
											'data-test': 'v-pagination-item',
										},
										[n.item ? n.item(w) : m(it, le({ _as: 'VPaginationBtn' }, w.props), { default: () => [w.page] })],
									),
								),
								m('li', { key: 'next', class: 'v-pagination__next', 'data-test': 'v-pagination-next' }, [
									n.next ? n.next(g.value.next) : m(it, le({ _as: 'VPaginationBtn' }, g.value.next), null),
								]),
								e.showFirstLastPage &&
									m('li', { key: 'last', class: 'v-pagination__last', 'data-test': 'v-pagination-last' }, [
										n.last ? n.last(g.value.last) : m(it, le({ _as: 'VPaginationBtn' }, g.value.last), null),
									]),
							]),
						],
					},
				),
			),
			{}
		);
	},
});
function fC(e) {
	return Math.floor(Math.abs(e)) * Math.sign(e);
}
const vC = q({
		name: 'VParallax',
		props: { scale: { type: [Number, String], default: 0.5 } },
		setup(e, t) {
			let { slots: n } = t;
			const { intersectionRef: l, isIntersecting: a } = Zs(),
				{ resizeRef: o, contentRect: i } = zn(),
				{ height: s } = Sa(),
				r = R();
			Mt(() => {
				var v;
				l.value = o.value = (v = r.value) == null ? void 0 : v.$el;
			});
			let u;
			ae(a, (v) => {
				v
					? ((u = Zd(l.value)),
					  (u = u === document.scrollingElement ? document : u),
					  u.addEventListener('scroll', d, { passive: !0 }),
					  d())
					: u.removeEventListener('scroll', d);
			}),
				Je(() => {
					var v;
					(v = u) == null || v.removeEventListener('scroll', d);
				}),
				ae(s, d),
				ae(() => {
					var v;
					return (v = i.value) == null ? void 0 : v.height;
				}, d);
			const c = C(() => 1 - ht(+e.scale));
			let f = -1;
			function d() {
				!a.value ||
					(cancelAnimationFrame(f),
					(f = requestAnimationFrame(() => {
						var w, k;
						var v;
						const h = ((v = r.value) == null ? void 0 : v.$el).querySelector('.v-img__img');
						if (!h) return;
						const y = (w = u.clientHeight) != null ? w : document.documentElement.clientHeight,
							V = (k = u.scrollTop) != null ? k : window.scrollY,
							p = l.value.offsetTop,
							b = i.value.height,
							g = p + (b - y) / 2,
							x = fC((V - g) * c.value),
							S = Math.max(1, (c.value * (y - b) + b) / b);
						h.style.setProperty('transform', `translateY(${x}px) scale(${S})`);
					})));
			}
			return (
				K(() =>
					m(
						Vl,
						{ class: ['v-parallax', { 'v-parallax--active': a.value }], ref: r, cover: !0, onLoadstart: d, onLoad: d },
						n,
					),
				),
				{}
			);
		},
	}),
	mC = q({
		name: 'VRadio',
		props: { ...qo({ falseIcon: '$radioOff', trueIcon: '$radioOn' }) },
		setup(e, t) {
			let { slots: n } = t;
			return K(() => m(Va, le(e, { class: 'v-radio', type: 'radio' }), n)), {};
		},
	});
const hC = q({
		name: 'VRadioGroup',
		inheritAttrs: !1,
		props: {
			height: { type: [Number, String], default: 'auto' },
			...fn(),
			...Un(ar(), ['multiple']),
			trueIcon: { type: re, default: '$radioOn' },
			falseIcon: { type: re, default: '$radioOff' },
			type: { type: String, default: 'radio' },
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { attrs: n, slots: l } = t;
			const a = et(),
				o = C(() => e.id || `radio-group-${a}`),
				i = he(e, 'modelValue');
			return (
				K(() => {
					const [s, r] = Wn(n),
						[u, c] = $n(e),
						[f, d] = Bf({ ...e, multiple: !1 }),
						v = l.label ? l.label({ label: e.label, props: { for: o.value } }) : e.label;
					return m(
						Jt,
						le({ class: 'v-radio-group' }, s, u, {
							modelValue: i.value,
							'onUpdate:modelValue': (h) => (i.value = h),
							id: o.value,
						}),
						{
							...l,
							default: (h) => {
								let { id: y, isDisabled: V, isReadonly: p } = h;
								return m(ge, null, [
									v && m(Bl, { for: y.value }, { default: () => [v] }),
									m(
										Pf,
										le(
											f,
											{
												id: y.value,
												defaultsTarget: 'VRadio',
												trueIcon: e.trueIcon,
												falseIcon: e.falseIcon,
												type: e.type,
												disabled: V.value,
												readonly: p.value,
											},
											r,
											{ modelValue: i.value, 'onUpdate:modelValue': (b) => (i.value = b) },
										),
										l,
									),
								]);
							},
						},
					);
				}),
				{}
			);
		},
	}),
	gC = q({
		name: 'VRangeSlider',
		props: { ...zo(), ...fn(), ...Sv(), strict: Boolean, modelValue: { type: Array, default: () => [0, 0] } },
		emits: { 'update:focused': (e) => !0, 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = R(),
				a = R(),
				o = R();
			function i(k) {
				if (!l.value || !a.value) return;
				const _ = rs(k, l.value.$el, e.direction),
					L = rs(k, a.value.$el, e.direction),
					$ = Math.abs(_),
					T = Math.abs(L);
				return $ < T || ($ === T && _ < 0) ? l.value.$el : a.value.$el;
			}
			const {
					activeThumbRef: s,
					hasLabels: r,
					max: u,
					min: c,
					mousePressed: f,
					onSliderMousedown: d,
					onSliderTouchstart: v,
					position: h,
					roundValue: y,
					trackContainerRef: V,
				} = wv({
					props: e,
					handleSliderMouseUp: (k) => {
						var _;
						p.value = s.value === ((_ = l.value) == null ? void 0 : _.$el) ? [k, p.value[1]] : [p.value[0], k];
					},
					handleMouseMove: (k) => {
						var _;
						const [L, $] = p.value;
						if (!e.strict && L === $ && L !== c.value) {
							var T, E, O;
							(s.value = k > L ? ((T = a.value) == null ? void 0 : T.$el) : (E = l.value) == null ? void 0 : E.$el),
								(O = s.value) == null || O.focus();
						}
						s.value === ((_ = l.value) == null ? void 0 : _.$el)
							? (p.value = [Math.min(k, $), $])
							: (p.value = [L, Math.max(L, k)]);
					},
					getActiveThumb: i,
				}),
				p = he(e, 'modelValue', void 0, (k) => (!k || !k.length ? [0, 0] : k.map((_) => y(_)))),
				{ isFocused: b, focus: g, blur: x } = Jn(e),
				S = C(() => h(p.value[0])),
				w = C(() => h(p.value[1]));
			return (
				K(() => {
					const [k, _] = $n(e),
						L = !!(e.label || n.label || n.prepend);
					return m(
						Jt,
						le(
							{
								class: [
									'v-slider',
									'v-range-slider',
									{
										'v-slider--has-labels': !!n['tick-label'] || r.value,
										'v-slider--focused': b.value,
										'v-slider--pressed': f.value,
										'v-slider--disabled': e.disabled,
									},
								],
								ref: o,
							},
							k,
							{ focused: b.value },
						),
						{
							...n,
							prepend: L
								? ($) => {
										var O;
										var T, E;
										return m(ge, null, [
											((O = (T = n.label) == null ? void 0 : T.call(n, $)) != null ? O : e.label)
												? m(Bl, { class: 'v-slider__label', text: e.label }, null)
												: void 0,
											(E = n.prepend) == null ? void 0 : E.call(n, $),
										]);
								  }
								: void 0,
							default: ($) => {
								var T, E;
								let { id: O } = $;
								return m('div', { class: 'v-slider__container', onMousedown: d, onTouchstartPassive: v }, [
									m(
										'input',
										{
											id: `${O.value}_start`,
											name: e.name || O.value,
											disabled: e.disabled,
											readonly: e.readonly,
											tabindex: '-1',
											value: p.value[0],
										},
										null,
									),
									m(
										'input',
										{
											id: `${O.value}_stop`,
											name: e.name || O.value,
											disabled: e.disabled,
											readonly: e.readonly,
											tabindex: '-1',
											value: p.value[1],
										},
										null,
									),
									m(kv, { ref: V, start: S.value, stop: w.value }, { 'tick-label': n['tick-label'] }),
									m(
										us,
										{
											ref: l,
											focused: b && s.value === ((T = l.value) == null ? void 0 : T.$el),
											modelValue: p.value[0],
											'onUpdate:modelValue': (B) => (p.value = [B, p.value[1]]),
											onFocus: (B) => {
												var D, M;
												if (
													(g(),
													(s.value = (D = l.value) == null ? void 0 : D.$el),
													p.value[0] === p.value[1] &&
														p.value[1] === c.value &&
														B.relatedTarget !== ((M = a.value) == null ? void 0 : M.$el))
												) {
													var P, H;
													(P = l.value) == null || P.$el.blur(), (H = a.value) == null || H.$el.focus();
												}
											},
											onBlur: () => {
												x(), (s.value = void 0);
											},
											min: c.value,
											max: p.value[1],
											position: S.value,
										},
										{ 'thumb-label': n['thumb-label'] },
									),
									m(
										us,
										{
											ref: a,
											focused: b && s.value === ((E = a.value) == null ? void 0 : E.$el),
											modelValue: p.value[1],
											'onUpdate:modelValue': (B) => (p.value = [p.value[0], B]),
											onFocus: (B) => {
												var D, M;
												if (
													(g(),
													(s.value = (D = a.value) == null ? void 0 : D.$el),
													p.value[0] === p.value[1] &&
														p.value[0] === u.value &&
														B.relatedTarget !== ((M = l.value) == null ? void 0 : M.$el))
												) {
													var P, H;
													(P = a.value) == null || P.$el.blur(), (H = l.value) == null || H.$el.focus();
												}
											},
											onBlur: () => {
												x(), (s.value = void 0);
											},
											min: p.value[0],
											max: u.value,
											position: w.value,
										},
										{ 'thumb-label': n['thumb-label'] },
									),
								]);
							},
						},
					);
				}),
				{}
			);
		},
	});
const yC = Ie()({
	name: 'VRating',
	props: {
		name: String,
		itemAriaLabel: { type: String, default: '$vuetify.rating.ariaLabel.item' },
		activeColor: String,
		color: String,
		clearable: Boolean,
		disabled: Boolean,
		emptyIcon: { type: re, default: '$ratingEmpty' },
		fullIcon: { type: re, default: '$ratingFull' },
		halfIncrements: Boolean,
		hover: Boolean,
		length: { type: [Number, String], default: 5 },
		readonly: Boolean,
		modelValue: { type: [Number, String], default: 0 },
		itemLabels: Array,
		itemLabelPosition: { type: String, default: 'top', validator: (e) => ['top', 'bottom'].includes(e) },
		ripple: Boolean,
		...qe(),
		...dn(),
		...fe(),
		...ye(),
	},
	emits: { 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { slots: n } = t;
		const { t: l } = Ft(),
			{ themeClasses: a } = ke(e),
			o = he(e, 'modelValue'),
			i = C(() => ht(parseFloat(o.value), 0, +e.length)),
			s = C(() => On(Number(e.length), 1)),
			r = C(() => s.value.flatMap((x) => (e.halfIncrements ? [x - 0.5, x] : [x]))),
			u = R(-1),
			c = R(-1),
			f = R();
		let d = !1;
		const v = C(() =>
				r.value.map((x) => {
					var E;
					const S = e.hover && u.value > -1,
						w = i.value >= x,
						k = u.value >= x,
						L = (S ? k : w) ? e.fullIcon : e.emptyIcon,
						$ = (E = e.activeColor) != null ? E : e.color,
						T = w || k ? $ : e.color;
					return { isFilled: w, isHovered: k, icon: L, color: T };
				}),
			),
			h = C(() =>
				[0, ...r.value].map((x) => {
					function S() {
						u.value = x;
					}
					function w() {
						u.value = -1;
					}
					function k() {
						if (x === 0 && i.value === 0) {
							var $;
							($ = f.value) == null || $.focus();
						} else c.value = x;
					}
					function _() {
						d || (c.value = -1);
					}
					function L() {
						e.disabled || e.readonly || (o.value = i.value === x && e.clearable ? 0 : x);
					}
					return {
						onMouseenter: e.hover ? S : void 0,
						onMouseleave: e.hover ? w : void 0,
						onFocus: k,
						onBlur: _,
						onClick: L,
					};
				}),
			);
		function y() {
			d = !0;
		}
		function V() {
			d = !1;
		}
		const p = C(() => {
			var x;
			return (x = e.name) != null ? x : `v-rating-${et()}`;
		});
		function b(x) {
			var S, w;
			let { value: k, index: _, showStar: L = !0 } = x;
			const { onMouseenter: $, onMouseleave: T, onFocus: E, onBlur: O, onClick: B } = h.value[_ + 1],
				D = `${p.value}-${String(k).replace('.', '-')}`,
				M = {
					color: (S = v.value[_]) == null ? void 0 : S.color,
					density: e.density,
					disabled: e.disabled,
					icon: (w = v.value[_]) == null ? void 0 : w.icon,
					ripple: e.ripple,
					size: e.size,
					tag: 'span',
					variant: 'plain',
				};
			return m(ge, null, [
				m(
					'label',
					{
						for: D,
						class: {
							'v-rating__item--half': e.halfIncrements && k % 1 > 0,
							'v-rating__item--full': e.halfIncrements && k % 1 === 0,
						},
						onMousedown: y,
						onMouseup: V,
						onMouseenter: $,
						onMouseleave: T,
					},
					[
						m('span', { class: 'v-rating__hidden' }, [l(e.itemAriaLabel, k, e.length)]),
						L ? (n.item ? n.item({ ...v.value[_], props: M, value: k, index: _ }) : m(it, M, null)) : void 0,
					],
				),
				m(
					'input',
					{
						class: 'v-rating__hidden',
						name: p.value,
						id: D,
						type: 'radio',
						value: k,
						checked: i.value === k,
						onClick: B,
						onFocus: E,
						onBlur: O,
						ref: _ === 0 ? f : void 0,
						readonly: e.readonly,
						disabled: e.disabled,
					},
					null,
				),
			]);
		}
		function g(x) {
			return n['item-label']
				? n['item-label'](x)
				: x.label
				? m('span', null, [x.label])
				: m('span', null, [Sn('\xA0')]);
		}
		return (
			K(() => {
				var x;
				const S = !!((x = e.itemLabels) != null && x.length) || n['item-label'];
				return m(
					e.tag,
					{ class: ['v-rating', { 'v-rating--hover': e.hover, 'v-rating--readonly': e.readonly }, a.value] },
					{
						default: () => [
							m(b, { value: 0, index: -1, showStar: !1 }, null),
							s.value.map((w, k) => {
								var _, L;
								return m('div', { class: 'v-rating__wrapper' }, [
									S && e.itemLabelPosition === 'top'
										? g({ value: w, index: k, label: (_ = e.itemLabels) == null ? void 0 : _[k] })
										: void 0,
									m('div', { class: ['v-rating__item', { 'v-rating__item--focused': Math.ceil(c.value) === w }] }, [
										e.halfIncrements
											? m(ge, null, [
													m(b, { value: w - 0.5, index: k * 2 }, null),
													m(b, { value: w, index: k * 2 + 1 }, null),
											  ])
											: m(b, { value: w, index: k }, null),
									]),
									S && e.itemLabelPosition === 'bottom'
										? g({ value: w, index: k, label: (L = e.itemLabels) == null ? void 0 : L[k] })
										: void 0,
								]);
							}),
						],
					},
				);
			}),
			{}
		);
	},
});
function Xu(e) {
	const n = Math.abs(e);
	return Math.sign(e) * (n / ((1 / 0.501 - 2) * (1 - n) + 1));
}
function Gu(e) {
	let { selectedElement: t, containerSize: n, contentSize: l, isRtl: a, currentScrollOffset: o, isHorizontal: i } = e;
	const s = i ? t.clientWidth : t.clientHeight,
		r = i ? t.offsetLeft : t.offsetTop,
		u = a && i ? l - r - s : r,
		c = n + o,
		f = s + u,
		d = s * 0.4;
	return u <= o ? (o = Math.max(u - d, 0)) : c <= f && (o = Math.min(o - (c - f - d), l - n)), o;
}
function bC(e) {
	let { selectedElement: t, containerSize: n, contentSize: l, isRtl: a, isHorizontal: o } = e;
	const i = o ? t.clientWidth : t.clientHeight,
		s = o ? t.offsetLeft : t.offsetTop,
		r = a && o ? l - s - i / 2 - n / 2 : s + i / 2 - n / 2;
	return Math.min(l - n, Math.max(0, r));
}
const Nv = Symbol.for('vuetify:v-slide-group'),
	Dv = Ie()({
		name: 'VSlideGroup',
		props: {
			centerActive: Boolean,
			direction: { type: String, default: 'horizontal' },
			symbol: { type: null, default: Nv },
			nextIcon: { type: re, default: '$next' },
			prevIcon: { type: re, default: '$prev' },
			showArrows: {
				type: [Boolean, String],
				validator: (e) => typeof e == 'boolean' || ['always', 'desktop', 'mobile'].includes(e),
			},
			...fe(),
			...Ll({ selectedClass: 'v-slide-group-item--active' }),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const { isRtl: l } = un(),
				{ mobile: a } = Sa(),
				o = Xn(e, e.symbol),
				i = R(!1),
				s = R(0),
				r = R(0),
				u = R(0),
				c = C(() => e.direction === 'horizontal'),
				{ resizeRef: f, contentRect: d } = zn(),
				{ resizeRef: v, contentRect: h } = zn(),
				y = C(() => (o.selected.value.length ? o.items.value.findIndex((Y) => Y.id === o.selected.value[0]) : -1)),
				V = C(() =>
					o.selected.value.length
						? o.items.value.findIndex((Y) => Y.id === o.selected.value[o.selected.value.length - 1])
						: -1,
				);
			if (Be) {
				let Y = -1;
				ae(
					() => [o.selected.value, d.value, h.value, c.value],
					() => {
						cancelAnimationFrame(Y),
							(Y = requestAnimationFrame(() => {
								if (d.value && h.value) {
									const Q = c.value ? 'width' : 'height';
									(r.value = d.value[Q]), (u.value = h.value[Q]), (i.value = r.value + 1 < u.value);
								}
								if (y.value >= 0 && v.value) {
									const Q = v.value.children[V.value];
									y.value === 0 || !i.value
										? (s.value = 0)
										: e.centerActive
										? (s.value = bC({
												selectedElement: Q,
												containerSize: r.value,
												contentSize: u.value,
												isRtl: l.value,
												isHorizontal: c.value,
										  }))
										: i.value &&
										  (s.value = Gu({
												selectedElement: Q,
												containerSize: r.value,
												contentSize: u.value,
												isRtl: l.value,
												currentScrollOffset: s.value,
												isHorizontal: c.value,
										  }));
								}
							}));
					},
				);
			}
			const p = R(!1);
			let b = 0,
				g = 0;
			function x(Y) {
				const Q = c.value ? 'clientX' : 'clientY';
				(g = (l.value && c.value ? -1 : 1) * s.value), (b = Y.touches[0][Q]), (p.value = !0);
			}
			function S(Y) {
				if (!i.value) return;
				const Q = c.value ? 'clientX' : 'clientY',
					ne = l.value && c.value ? -1 : 1;
				s.value = ne * (g + b - Y.touches[0][Q]);
			}
			function w(Y) {
				const Q = u.value - r.value;
				s.value < 0 || !i.value ? (s.value = 0) : s.value >= Q && (s.value = Q), (p.value = !1);
			}
			function k() {
				!f.value || (f.value[c.value ? 'scrollLeft' : 'scrollTop'] = 0);
			}
			const _ = R(!1);
			function L(Y) {
				if (((_.value = !0), !(!i.value || !v.value))) {
					for (const Q of Y.composedPath())
						for (const ne of v.value.children)
							if (ne === Q) {
								s.value = Gu({
									selectedElement: ne,
									containerSize: r.value,
									contentSize: u.value,
									isRtl: l.value,
									currentScrollOffset: s.value,
									isHorizontal: c.value,
								});
								return;
							}
				}
			}
			function $(Y) {
				_.value = !1;
			}
			function T(Y) {
				var Q;
				!_.value && !(Y.relatedTarget && (Q = v.value) != null && Q.contains(Y.relatedTarget)) && O();
			}
			function E(Y) {
				!v.value ||
					(c.value
						? Y.key === 'ArrowRight'
							? O(l.value ? 'prev' : 'next')
							: Y.key === 'ArrowLeft' && O(l.value ? 'next' : 'prev')
						: Y.key === 'ArrowDown'
						? O('next')
						: Y.key === 'ArrowUp' && O('prev'),
					Y.key === 'Home' ? O('first') : Y.key === 'End' && O('last'));
			}
			function O(Y) {
				if (!!v.value)
					if (Y) {
						if (Y === 'next') {
							var ne;
							const ue = (ne = v.value.querySelector(':focus')) == null ? void 0 : ne.nextElementSibling;
							ue ? ue.focus() : O('first');
						} else if (Y === 'prev') {
							var be;
							const ue = (be = v.value.querySelector(':focus')) == null ? void 0 : be.previousElementSibling;
							ue ? ue.focus() : O('last');
						} else if (Y === 'first') {
							var J;
							(J = v.value.firstElementChild) == null || J.focus();
						} else if (Y === 'last') {
							var _e;
							(_e = v.value.lastElementChild) == null || _e.focus();
						}
					} else {
						var Q;
						(Q = [
							...v.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
						].filter((Ne) => !Ne.hasAttribute('disabled'))[0]) == null || Q.focus();
					}
			}
			function B(Y) {
				const Q = s.value + (Y === 'prev' ? -1 : 1) * r.value;
				s.value = ht(Q, 0, u.value - r.value);
			}
			const D = C(() => {
					let Y = s.value > u.value - r.value ? -(u.value - r.value) + Xu(u.value - r.value - s.value) : -s.value;
					s.value <= 0 && (Y = Xu(-s.value));
					const Q = l.value && c.value ? -1 : 1;
					return {
						transform: `translate${c.value ? 'X' : 'Y'}(${Q * Y}px)`,
						transition: p.value ? 'none' : '',
						willChange: p.value ? 'transform' : '',
					};
				}),
				M = C(() => ({ next: o.next, prev: o.prev, select: o.select, isSelected: o.isSelected })),
				P = C(() => {
					switch (e.showArrows) {
						case 'always':
							return !0;
						case 'desktop':
							return !a.value;
						case !0:
							return i.value || Math.abs(s.value) > 0;
						case 'mobile':
							return a.value || i.value || Math.abs(s.value) > 0;
						default:
							return !a.value && (i.value || Math.abs(s.value) > 0);
					}
				}),
				H = C(() => Math.abs(s.value) > 0),
				U = C(() => u.value > Math.abs(s.value) + r.value);
			return (
				K(() => {
					var Y, Q, ne;
					return m(
						e.tag,
						{
							class: [
								'v-slide-group',
								{
									'v-slide-group--vertical': !c.value,
									'v-slide-group--has-affixes': P.value,
									'v-slide-group--is-overflowing': i.value,
								},
							],
							tabindex: _.value || o.selected.value.length ? -1 : 0,
							onFocus: T,
						},
						{
							default: () => {
								var be, J;
								return [
									P.value &&
										m(
											'div',
											{
												key: 'prev',
												class: ['v-slide-group__prev', { 'v-slide-group__prev--disabled': !H.value }],
												onClick: () => B('prev'),
											},
											[
												(be = (Y = n.prev) == null ? void 0 : Y.call(n, M.value)) != null
													? be
													: m(Ji, null, { default: () => [m(Fe, { icon: l.value ? e.nextIcon : e.prevIcon }, null)] }),
											],
										),
									m('div', { key: 'container', ref: f, class: 'v-slide-group__container', onScroll: k }, [
										m(
											'div',
											{
												ref: v,
												class: 'v-slide-group__content',
												style: D.value,
												onTouchstartPassive: x,
												onTouchmovePassive: S,
												onTouchendPassive: w,
												onFocusin: L,
												onFocusout: $,
												onKeydown: E,
											},
											[(Q = n.default) == null ? void 0 : Q.call(n, M.value)],
										),
									]),
									P.value &&
										m(
											'div',
											{
												key: 'next',
												class: ['v-slide-group__next', { 'v-slide-group__next--disabled': !U.value }],
												onClick: () => B('next'),
											},
											[
												(J = (ne = n.next) == null ? void 0 : ne.call(n, M.value)) != null
													? J
													: m(Ji, null, { default: () => [m(Fe, { icon: l.value ? e.prevIcon : e.nextIcon }, null)] }),
											],
										),
								];
							},
						},
					);
				}),
				{ selected: o.selected, scrollTo: B, scrollOffset: s, focus: O }
			);
		},
	}),
	pC = Ie()({
		name: 'VSlideGroupItem',
		props: { ...Yn() },
		emits: { 'group:selected': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = Il(e, Nv);
			return () => {
				var a;
				return (a = n.default) == null
					? void 0
					: a.call(n, {
							isSelected: l.isSelected.value,
							select: l.select,
							toggle: l.toggle,
							selectedClass: l.selectedClass.value,
					  });
			};
		},
	});
const _C = Ie()({
	name: 'VSnackbar',
	props: {
		multiLine: Boolean,
		timeout: { type: [Number, String], default: 5e3 },
		vertical: Boolean,
		...Gn({ location: 'bottom' }),
		...Tl(),
		...Ae(),
		...At(),
		...ye(),
		...Un(Ea({ transition: 'v-snackbar-transition' }), ['persistent', 'noClickAnimation', 'scrim', 'scrollStrategy']),
	},
	emits: { 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { slots: n } = t;
		const l = he(e, 'modelValue'),
			{ locationStyles: a } = Zn(e),
			{ positionClasses: o } = Al(e),
			{ scopeId: i } = Ia(),
			{ themeClasses: s } = ke(e),
			{ colorClasses: r, colorStyles: u, variantClasses: c } = qn(e),
			{ roundedClasses: f } = Me(e),
			d = R();
		ae(l, h),
			ae(() => e.timeout, h),
			lt(() => {
				l.value && h();
			});
		let v = -1;
		function h() {
			window.clearTimeout(v);
			const V = Number(e.timeout);
			!l.value ||
				V === -1 ||
				(v = window.setTimeout(() => {
					l.value = !1;
				}, V));
		}
		function y() {
			window.clearTimeout(v);
		}
		return (
			K(() => {
				const [V] = Go(e);
				return m(
					Rl,
					le(
						{
							ref: d,
							class: [
								'v-snackbar',
								{
									'v-snackbar--active': l.value,
									'v-snackbar--multi-line': e.multiLine && !e.vertical,
									'v-snackbar--vertical': e.vertical,
								},
								o.value,
							],
						},
						V,
						{
							modelValue: l.value,
							'onUpdate:modelValue': (p) => (l.value = p),
							contentProps: le({ style: a.value }, V.contentProps),
							persistent: !0,
							noClickAnimation: !0,
							scrim: !1,
							scrollStrategy: 'none',
						},
						i,
					),
					{
						default: () => [
							m(
								'div',
								{
									class: ['v-snackbar__wrapper', s.value, r.value, f.value, c.value],
									style: [u.value],
									onPointerenter: y,
									onPointerleave: h,
								},
								[
									Kn(!1, 'v-snackbar'),
									n.default &&
										m('div', { class: 'v-snackbar__content', role: 'status', 'aria-live': 'polite' }, [n.default()]),
									n.actions &&
										m(
											$e,
											{ defaults: { VBtn: { variant: 'text', ripple: !1 } } },
											{ default: () => [m('div', { class: 'v-snackbar__actions' }, [n.actions()])] },
										),
								],
							),
						],
						activator: n.activator,
					},
				);
			}),
			Dt({}, d)
		);
	},
});
const CC = q({
	name: 'VSwitch',
	inheritAttrs: !1,
	props: {
		indeterminate: Boolean,
		inset: Boolean,
		flat: Boolean,
		loading: { type: [Boolean, String], default: !1 },
		...fn(),
		...qo(),
	},
	emits: { 'update:focused': (e) => !0, 'update:modelValue': () => !0, 'update:indeterminate': (e) => !0 },
	setup(e, t) {
		let { attrs: n, slots: l } = t;
		const a = he(e, 'indeterminate'),
			o = he(e, 'modelValue'),
			{ loaderClasses: i } = jo(e),
			{ isFocused: s, focus: r, blur: u } = Jn(e),
			c = C(() => (typeof e.loading == 'string' && e.loading !== '' ? e.loading : e.color)),
			f = et(),
			d = C(() => e.id || `switch-${f}`);
		function v() {
			a.value && (a.value = !1);
		}
		return (
			K(() => {
				const [h, y] = Wn(n),
					[V, p] = $n(e),
					[b, g] = Bf(e),
					x = R();
				function S() {
					var w, k;
					(w = x.value) == null || (k = w.input) == null || k.click();
				}
				return m(
					Jt,
					le(
						{ class: ['v-switch', { 'v-switch--inset': e.inset }, { 'v-switch--indeterminate': a.value }, i.value] },
						h,
						V,
						{ id: d.value, focused: s.value },
					),
					{
						...l,
						default: (w) => {
							let { id: k, isDisabled: _, isReadonly: L, isValid: $ } = w;
							return m(
								Va,
								le(
									{ ref: x },
									b,
									{
										modelValue: o.value,
										'onUpdate:modelValue': [(T) => (o.value = T), v],
										id: k.value,
										type: 'checkbox',
										'aria-checked': a.value ? 'mixed' : void 0,
										disabled: _.value,
										readonly: L.value,
										onFocus: r,
										onBlur: u,
									},
									y,
								),
								{
									...l,
									default: () => m('div', { class: 'v-switch__track', onClick: S }, null),
									input: (T) => {
										let { textColorClasses: E, textColorStyles: O } = T;
										return m('div', { class: ['v-switch__thumb', E.value], style: O.value }, [
											e.loading &&
												m(
													tr,
													{ name: 'v-switch', active: !0, color: $.value === !1 ? void 0 : c.value },
													{
														default: (B) =>
															l.loader
																? l.loader(B)
																: m(
																		Js,
																		{ active: B.isActive, color: B.color, indeterminate: !0, size: '16', width: '2' },
																		null,
																  ),
													},
												),
										]);
									},
								},
							);
						},
					},
				);
			}),
			{}
		);
	},
});
const SC = q({
	name: 'VSystemBar',
	props: { color: String, height: [Number, String], window: Boolean, ...Ue(), ...xl(), ...Ae(), ...fe(), ...ye() },
	setup(e, t) {
		let { slots: n } = t;
		const { themeClasses: l } = ke(e),
			{ backgroundColorClasses: a, backgroundColorStyles: o } = Re(N(e, 'color')),
			{ elevationClasses: i } = Xe(e),
			{ roundedClasses: s } = Me(e),
			r = C(() => {
				var c;
				return (c = e.height) != null ? c : e.window ? 32 : 24;
			}),
			{ layoutItemStyles: u } = $l({
				id: e.name,
				order: C(() => parseInt(e.order, 10)),
				position: R('top'),
				layoutSize: r,
				elementSize: r,
				active: C(() => !0),
				absolute: N(e, 'absolute'),
			});
		return (
			K(() =>
				m(
					e.tag,
					{
						class: ['v-system-bar', { 'v-system-bar--window': e.window }, l.value, a.value, i.value, s.value],
						style: [o.value, u.value],
					},
					n,
				),
			),
			{}
		);
	},
});
const jv = Symbol.for('vuetify:v-tabs'),
	zv = q({
		name: 'VTab',
		props: {
			fixed: Boolean,
			icon: [Boolean, String, Function, Object],
			prependIcon: re,
			appendIcon: re,
			stacked: Boolean,
			title: String,
			ripple: { type: Boolean, default: !0 },
			color: String,
			sliderColor: String,
			hideSlider: Boolean,
			direction: { type: String, default: 'horizontal' },
			...fe(),
			...Pl(),
			...Yn({ selectedClass: 'v-tab--selected' }),
			...ye(),
		},
		setup(e, t) {
			let { slots: n, attrs: l } = t;
			const { textColorClasses: a, textColorStyles: o } = rt(e, 'sliderColor'),
				i = C(() => e.direction === 'horizontal'),
				s = R(!1),
				r = R(),
				u = R();
			function c(f) {
				let { value: d } = f;
				if (((s.value = d), d)) {
					var v, h;
					const y =
							(v = r.value) == null || (h = v.$el.parentElement) == null
								? void 0
								: h.querySelector('.v-tab--selected .v-tab__slider'),
						V = u.value;
					if (!y || !V) return;
					const p = getComputedStyle(y).color,
						b = y.getBoundingClientRect(),
						g = V.getBoundingClientRect(),
						x = i.value ? 'x' : 'y',
						S = i.value ? 'X' : 'Y',
						w = i.value ? 'right' : 'bottom',
						k = i.value ? 'width' : 'height',
						_ = b[x],
						L = g[x],
						$ = _ > L ? b[w] - g[w] : b[x] - g[x],
						T =
							Math.sign($) > 0
								? i.value
									? 'right'
									: 'bottom'
								: Math.sign($) < 0
								? i.value
									? 'left'
									: 'top'
								: 'center',
						O = (Math.abs($) + (Math.sign($) < 0 ? b[k] : g[k])) / Math.max(b[k], g[k]),
						B = b[k] / g[k],
						D = 1.5;
					Rn(
						V,
						{
							backgroundColor: [p, ''],
							transform: [
								`translate${S}(${$}px) scale${S}(${B})`,
								`translate${S}(${$ / D}px) scale${S}(${(O - 1) / D + 1})`,
								'',
							],
							transformOrigin: Array(3).fill(T),
						},
						{ duration: 225, easing: ua },
					);
				}
			}
			return (
				K(() => {
					const [f] = bt(e, [
						'href',
						'to',
						'replace',
						'icon',
						'stacked',
						'prependIcon',
						'appendIcon',
						'ripple',
						'theme',
						'disabled',
						'selectedClass',
						'value',
						'color',
					]);
					return m(
						it,
						le(
							{
								_as: 'VTab',
								symbol: jv,
								ref: r,
								class: ['v-tab'],
								tabindex: s.value ? 0 : -1,
								role: 'tab',
								'aria-selected': String(s.value),
								active: !1,
								block: e.fixed,
								maxWidth: e.fixed ? 300 : void 0,
								variant: 'text',
								rounded: 0,
							},
							f,
							l,
							{ 'onGroup:selected': c },
						),
						{
							default: () => [
								n.default ? n.default() : e.title,
								!e.hideSlider && m('div', { ref: u, class: ['v-tab__slider', a.value], style: o.value }, null),
							],
						},
					);
				}),
				{}
			);
		},
	});
function wC(e) {
	return e ? e.map((t) => (typeof t == 'string' ? { title: t, value: t } : t)) : [];
}
const kC = q({
	name: 'VTabs',
	props: {
		alignTabs: { type: String, default: 'start' },
		color: String,
		direction: { type: String, default: 'horizontal' },
		fixedTabs: Boolean,
		items: { type: Array, default: () => [] },
		stacked: Boolean,
		bgColor: String,
		grow: Boolean,
		height: { type: [Number, String], default: void 0 },
		hideSlider: Boolean,
		sliderColor: String,
		modelValue: null,
		mandatory: { type: [Boolean, String], default: 'force' },
		...qe(),
		...fe(),
	},
	emits: { 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { slots: n } = t;
		const l = he(e, 'modelValue'),
			a = C(() => wC(e.items)),
			{ densityClasses: o } = tt(e),
			{ backgroundColorClasses: i, backgroundColorStyles: s } = Re(N(e, 'bgColor'));
		return (
			je({
				VTab: {
					color: N(e, 'color'),
					direction: N(e, 'direction'),
					stacked: N(e, 'stacked'),
					fixed: N(e, 'fixedTabs'),
					sliderColor: N(e, 'sliderColor'),
					hideSlider: N(e, 'hideSlider'),
				},
			}),
			K(() =>
				m(
					Dv,
					{
						modelValue: l.value,
						'onUpdate:modelValue': (r) => (l.value = r),
						class: [
							'v-tabs',
							`v-tabs--${e.direction}`,
							`v-tabs--align-tabs-${e.alignTabs}`,
							{ 'v-tabs--fixed-tabs': e.fixedTabs, 'v-tabs--grow': e.grow, 'v-tabs--stacked': e.stacked },
							o.value,
							i.value,
						],
						style: [{ '--v-tabs-height': ee(e.height) }, s.value],
						role: 'tablist',
						symbol: jv,
						mandatory: e.mandatory,
						direction: e.direction,
					},
					{ default: () => [n.default ? n.default() : a.value.map((r) => m(zv, le(r, { key: r.title }), null))] },
				),
			),
			{}
		);
	},
});
const xC = q({
	name: 'VTable',
	props: {
		fixedHeader: Boolean,
		fixedFooter: Boolean,
		height: [Number, String],
		hover: Boolean,
		...qe(),
		...fe(),
		...ye(),
	},
	setup(e, t) {
		let { slots: n } = t;
		const { themeClasses: l } = ke(e),
			{ densityClasses: a } = tt(e);
		return (
			K(() => {
				var o, i;
				return m(
					e.tag,
					{
						class: [
							'v-table',
							{
								'v-table--fixed-height': !!e.height,
								'v-table--fixed-header': e.fixedHeader,
								'v-table--fixed-footer': e.fixedFooter,
								'v-table--has-top': !!n.top,
								'v-table--has-bottom': !!n.bottom,
								'v-table--hover': e.hover,
							},
							l.value,
							a.value,
						],
					},
					{
						default: () => [
							(o = n.top) == null ? void 0 : o.call(n),
							n.default &&
								m('div', { class: 'v-table__wrapper', style: { height: ee(e.height) } }, [
									m('table', null, [n.default()]),
								]),
							(i = n.bottom) == null ? void 0 : i.call(n),
						],
					},
				);
			}),
			{}
		);
	},
});
const $C = q({
	name: 'VTextarea',
	directives: { Intersect: wa },
	inheritAttrs: !1,
	props: {
		autoGrow: Boolean,
		autofocus: Boolean,
		counter: [Boolean, Number, String],
		counterValue: Function,
		hint: String,
		persistentHint: Boolean,
		prefix: String,
		placeholder: String,
		persistentPlaceholder: Boolean,
		persistentCounter: Boolean,
		noResize: Boolean,
		rows: { type: [Number, String], default: 5, validator: (e) => !isNaN(parseFloat(e)) },
		maxRows: { type: [Number, String], validator: (e) => !isNaN(parseFloat(e)) },
		suffix: String,
		...fn(),
		...Uo(),
	},
	emits: { 'click:control': (e) => !0, 'update:focused': (e) => !0, 'update:modelValue': (e) => !0 },
	setup(e, t) {
		let { attrs: n, emit: l, slots: a } = t;
		const o = he(e, 'modelValue'),
			{ isFocused: i, focus: s, blur: r } = Jn(e),
			u = C(() => (typeof e.counterValue == 'function' ? e.counterValue(o.value) : (o.value || '').toString().length)),
			c = C(() => {
				if (n.maxlength) return n.maxlength;
				if (!(!e.counter || (typeof e.counter != 'number' && typeof e.counter != 'string'))) return e.counter;
			});
		function f(L, $) {
			var T, E;
			!e.autofocus || !L || (T = $[0].target) == null || (E = T.focus) == null || E.call(T);
		}
		const d = R(),
			v = R(),
			h = R(''),
			y = R(),
			V = C(() => i.value || e.persistentPlaceholder),
			p = C(() => (e.messages.length ? e.messages : V.value || e.persistentHint ? e.hint : ''));
		function b() {
			if (y.value !== document.activeElement) {
				var L;
				(L = y.value) == null || L.focus();
			}
			i.value || s();
		}
		function g(L) {
			b(), l('click:control', L);
		}
		function x(L) {
			L.stopPropagation(),
				b(),
				Te(() => {
					(o.value = ''), vo(e['onClick:clear'], L);
				});
		}
		function S(L) {
			o.value = L.target.value;
		}
		const w = R();
		function k() {
			!e.autoGrow ||
				Te(() => {
					if (!w.value || !v.value) return;
					const L = getComputedStyle(w.value),
						$ = getComputedStyle(v.value.$el),
						T =
							parseFloat(L.getPropertyValue('--v-field-padding-top')) +
							parseFloat(L.getPropertyValue('--v-input-padding-top')) +
							parseFloat(L.getPropertyValue('--v-field-padding-bottom')),
						E = w.value.scrollHeight,
						O = parseFloat(L.lineHeight),
						B = Math.max(parseFloat(e.rows) * O + T, parseFloat($.getPropertyValue('--v-input-control-height'))),
						D = parseFloat(e.maxRows) * O + T || 1 / 0;
					h.value = ee(ht(E != null ? E : 0, B, D));
				});
		}
		lt(k), ae(o, k), ae(() => e.rows, k), ae(() => e.maxRows, k), ae(() => e.density, k);
		let _;
		return (
			ae(w, (L) => {
				if (L) (_ = new ResizeObserver(k)), _.observe(w.value);
				else {
					var $;
					($ = _) == null || $.disconnect();
				}
			}),
			Je(() => {
				var L;
				(L = _) == null || L.disconnect();
			}),
			K(() => {
				const L = !!(a.counter || e.counter || e.counterValue),
					$ = !!(L || a.details),
					[T, E] = Wn(n),
					[{ modelValue: O, ...B }] = $n(e),
					[D] = nr(e);
				return m(
					Jt,
					le(
						{
							ref: d,
							modelValue: o.value,
							'onUpdate:modelValue': (M) => (o.value = M),
							class: [
								'v-textarea v-text-field',
								{
									'v-textarea--prefixed': e.prefix,
									'v-textarea--suffixed': e.suffix,
									'v-text-field--prefixed': e.prefix,
									'v-text-field--suffixed': e.suffix,
									'v-textarea--auto-grow': e.autoGrow,
									'v-textarea--no-resize': e.noResize || e.autoGrow,
									'v-text-field--flush-details': ['plain', 'underlined'].includes(e.variant),
								},
							],
							'onClick:prepend': e['onClick:prepend'],
							'onClick:append': e['onClick:append'],
						},
						T,
						B,
						{ focused: i.value, messages: p.value },
					),
					{
						...a,
						default: (M) => {
							let { isDisabled: P, isDirty: H, isReadonly: U, isValid: Y } = M;
							return m(
								xa,
								le(
									{
										ref: v,
										style: { '--v-textarea-control-height': h.value },
										'onClick:control': g,
										'onClick:clear': x,
										'onClick:prependInner': e['onClick:prependInner'],
										'onClick:appendInner': e['onClick:appendInner'],
										role: 'textbox',
									},
									D,
									{ active: V.value || H.value, dirty: H.value || e.dirty, focused: i.value, error: Y.value === !1 },
								),
								{
									...a,
									default: (Q) => {
										let {
											props: { class: ne, ...be },
										} = Q;
										return m(ge, null, [
											e.prefix && m('span', { class: 'v-text-field__prefix' }, [e.prefix]),
											Oe(
												m(
													'textarea',
													le(
														{
															ref: y,
															class: ne,
															value: o.value,
															onInput: S,
															autofocus: e.autofocus,
															readonly: U.value,
															disabled: P.value,
															placeholder: e.placeholder,
															rows: e.rows,
															name: e.name,
															onFocus: b,
															onBlur: r,
														},
														be,
														E,
													),
													null,
												),
												[[yt('intersect'), { handler: f }, null, { once: !0 }]],
											),
											e.autoGrow &&
												Oe(
													m(
														'textarea',
														{
															class: [ne, 'v-textarea__sizer'],
															'onUpdate:modelValue': (J) => (o.value = J),
															ref: w,
															readonly: !0,
															'aria-hidden': 'true',
														},
														null,
													),
													[[gg, o.value]],
												),
											e.suffix && m('span', { class: 'v-text-field__suffix' }, [e.suffix]),
										]);
									},
								},
							);
						},
						details: $
							? (M) => {
									var P;
									return m(ge, null, [
										(P = a.details) == null ? void 0 : P.call(a, M),
										L &&
											m(ge, null, [
												m('span', null, null),
												m(Wo, { active: e.persistentCounter || i.value, value: u.value, max: c.value }, a.counter),
											]),
									]);
							  }
							: void 0,
					},
				);
			}),
			Dt({}, d, v, y)
		);
	},
});
const VC = q({
	name: 'VThemeProvider',
	props: { withBackground: Boolean, ...ye(), ...fe() },
	setup(e, t) {
		let { slots: n } = t;
		const { themeClasses: l } = ke(e);
		return () => {
			var a, o;
			return e.withBackground
				? m(
						e.tag,
						{ class: ['v-theme-provider', l.value] },
						{ default: () => [(o = n.default) == null ? void 0 : o.call(n)] },
				  )
				: (a = n.default) == null
				? void 0
				: a.call(n);
		};
	},
});
const LC = q({
		name: 'VTimeline',
		props: {
			align: { type: String, default: 'center', validator: (e) => ['center', 'start'].includes(e) },
			direction: { type: String, default: 'vertical', validator: (e) => ['vertical', 'horizontal'].includes(e) },
			justify: { type: String, default: 'auto', validator: (e) => ['auto', 'center'].includes(e) },
			side: { type: String, validator: (e) => e == null || ['start', 'end'].includes(e) },
			lineInset: { type: [String, Number], default: 0 },
			lineThickness: { type: [String, Number], default: 2 },
			lineColor: String,
			truncateLine: { type: String, validator: (e) => ['start', 'end', 'both'].includes(e) },
			...qe(),
			...fe(),
			...ye(),
		},
		setup(e, t) {
			let { slots: n } = t;
			const { themeClasses: l } = ke(e),
				{ densityClasses: a } = tt(e);
			je({
				VTimelineDivider: { lineColor: N(e, 'lineColor') },
				VTimelineItem: { density: N(e, 'density'), lineInset: N(e, 'lineInset') },
			});
			const o = C(() => {
					const s = e.side ? e.side : e.density !== 'default' ? 'end' : null;
					return s && `v-timeline--side-${s}`;
				}),
				i = C(() => {
					const s = ['v-timeline--truncate-line-start', 'v-timeline--truncate-line-end'];
					switch (e.truncateLine) {
						case 'both':
							return s;
						case 'start':
							return s[0];
						case 'end':
							return s[1];
						default:
							return null;
					}
				});
			return (
				K(() =>
					m(
						e.tag,
						{
							class: [
								'v-timeline',
								`v-timeline--${e.direction}`,
								`v-timeline--align-${e.align}`,
								`v-timeline--justify-${e.justify}`,
								i.value,
								{ 'v-timeline--inset-line': !!e.lineInset },
								l.value,
								a.value,
								o.value,
							],
							style: { '--v-timeline-line-thickness': ee(e.lineThickness) },
						},
						n,
					),
				),
				{}
			);
		},
	}),
	IC = q({
		name: 'VTimelineDivider',
		props: {
			dotColor: String,
			fillDot: Boolean,
			hideDot: Boolean,
			icon: re,
			iconColor: String,
			lineColor: String,
			...Ae(),
			...dn(),
			...Ue(),
		},
		setup(e, t) {
			let { slots: n } = t;
			const { sizeClasses: l, sizeStyles: a } = El(e, 'v-timeline-divider__dot'),
				{ backgroundColorStyles: o, backgroundColorClasses: i } = Re(N(e, 'dotColor')),
				{ roundedClasses: s } = Me(e, 'v-timeline-divider__dot'),
				{ elevationClasses: r } = Xe(e),
				{ backgroundColorClasses: u, backgroundColorStyles: c } = Re(N(e, 'lineColor'));
			return (
				je({ VIcon: { color: N(e, 'iconColor'), icon: N(e, 'icon'), size: N(e, 'size') } }),
				K(() => {
					var d;
					var f;
					return m('div', { class: ['v-timeline-divider', { 'v-timeline-divider--fill-dot': e.fillDot }] }, [
						m('div', { class: ['v-timeline-divider__before', u.value], style: c.value }, null),
						!e.hideDot &&
							m('div', { key: 'dot', class: ['v-timeline-divider__dot', r.value, s.value, l.value], style: a.value }, [
								m('div', { class: ['v-timeline-divider__inner-dot', i.value, s.value], style: o.value }, [
									(d = (f = n.default) == null ? void 0 : f.call(n)) != null ? d : e.icon ? m(Fe, null, null) : void 0,
								]),
							]),
						m('div', { class: ['v-timeline-divider__after', u.value], style: c.value }, null),
					]);
				}),
				{}
			);
		},
	}),
	EC = q({
		name: 'VTimelineItem',
		props: {
			density: String,
			dotColor: String,
			fillDot: Boolean,
			hideDot: Boolean,
			hideOpposite: { type: Boolean, default: void 0 },
			icon: re,
			iconColor: String,
			lineInset: [Number, String],
			...Ae(),
			...Ue(),
			...dn(),
			...fe(),
			...Ht(),
		},
		setup(e, t) {
			let { slots: n } = t;
			const { dimensionStyles: l } = Nt(e),
				a = R(0),
				o = R();
			return (
				ae(
					o,
					(i) => {
						var r;
						var s;
						!i ||
							(a.value =
								(r =
									(s = i.$el.querySelector('.v-timeline-divider__dot')) == null
										? void 0
										: s.getBoundingClientRect().width) != null
									? r
									: 0);
					},
					{ flush: 'post' },
				),
				K(() => {
					var i, s;
					return m(
						'div',
						{
							class: ['v-timeline-item', { 'v-timeline-item--fill-dot': e.fillDot }],
							style: {
								'--v-timeline-dot-size': ee(a.value),
								'--v-timeline-line-inset': e.lineInset
									? `calc(var(--v-timeline-dot-size) / 2 + ${ee(e.lineInset)})`
									: ee(0),
							},
						},
						[
							m('div', { class: 'v-timeline-item__body', style: l.value }, [
								(i = n.default) == null ? void 0 : i.call(n),
							]),
							m(
								IC,
								{
									ref: o,
									hideDot: e.hideDot,
									icon: e.icon,
									iconColor: e.iconColor,
									size: e.size,
									elevation: e.elevation,
									dotColor: e.dotColor,
									fillDot: e.fillDot,
									rounded: e.rounded,
								},
								{ default: n.icon },
							),
							e.density !== 'compact' &&
								m('div', { class: 'v-timeline-item__opposite' }, [
									!e.hideOpposite && ((s = n.opposite) == null ? void 0 : s.call(n)),
								]),
						],
					);
				}),
				{}
			);
		},
	});
const TC = Ie()({
		name: 'VTooltip',
		props: {
			id: String,
			text: String,
			...Un(
				Ea({
					closeOnBack: !1,
					location: 'end',
					locationStrategy: 'connected',
					minWidth: 0,
					offset: 10,
					openOnClick: !1,
					openOnHover: !0,
					origin: 'auto',
					scrim: !1,
					scrollStrategy: 'reposition',
					transition: !1,
				}),
				['absolute', 'persistent', 'eager'],
			),
		},
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = he(e, 'modelValue'),
				{ scopeId: a } = Ia(),
				o = et(),
				i = C(() => e.id || `v-tooltip-${o}`),
				s = R(),
				r = C(() => (e.location.split(' ').length > 1 ? e.location : e.location + ' center')),
				u = C(() =>
					e.origin === 'auto' ||
					e.origin === 'overlap' ||
					e.origin.split(' ').length > 1 ||
					e.location.split(' ').length > 1
						? e.origin
						: e.origin + ' center',
				),
				c = C(() => (e.transition ? e.transition : l.value ? 'scale-transition' : 'fade-transition'));
			return (
				K(() => {
					const [f] = Go(e);
					return m(
						Rl,
						le(
							{ ref: s, class: ['v-tooltip'], id: i.value },
							f,
							{
								modelValue: l.value,
								'onUpdate:modelValue': (d) => (l.value = d),
								transition: c.value,
								absolute: !0,
								location: r.value,
								origin: u.value,
								persistent: !0,
								role: 'tooltip',
								eager: !0,
								activatorProps: le({ 'aria-describedby': i.value }, e.activatorProps),
								_disableGlobalStack: !0,
							},
							a,
						),
						{
							activator: n.activator,
							default: function () {
								var V;
								for (var d, v = arguments.length, h = new Array(v), y = 0; y < v; y++) h[y] = arguments[y];
								return (V = (d = n.default) == null ? void 0 : d.call(n, ...h)) != null ? V : e.text;
							},
						},
					);
				}),
				Dt({}, s)
			);
		},
	}),
	AC = q({
		name: 'VValidation',
		props: { ...Ef() },
		emits: { 'update:modelValue': (e) => !0 },
		setup(e, t) {
			let { slots: n } = t;
			const l = Tf(e, 'validation');
			return () => {
				var a;
				return (a = n.default) == null ? void 0 : a.call(n, l);
			};
		},
	}),
	PC = Object.freeze(
		Object.defineProperty(
			{
				__proto__: null,
				VApp: Jp,
				VAppBar: v0,
				VAppBarNavIcon: I0,
				VAppBarTitle: T0,
				VAlert: P0,
				VAlertTitle: $f,
				VAutocomplete: I1,
				VAvatar: wn,
				VBadge: E1,
				VBanner: T1,
				VBannerActions: sv,
				VBannerText: rv,
				VBottomNavigation: A1,
				VBreadcrumbs: P1,
				VBreadcrumbsItem: cv,
				VBreadcrumbsDivider: uv,
				VBtn: it,
				VBtnGroup: hf,
				VBtnToggle: b0,
				VCard: B1,
				VCardActions: dv,
				VCardItem: mv,
				VCardSubtitle: fv,
				VCardText: hv,
				VCardTitle: vv,
				VCarousel: j1,
				VCarouselItem: z1,
				VCheckbox: D0,
				VCheckboxBtn: Ol,
				VChip: La,
				VChipGroup: z0,
				VCode: U1,
				VColorPicker: k_,
				VCombobox: $_,
				VCounter: Wo,
				VDefaultsProvider: $e,
				VDialog: V_,
				VDivider: Mf,
				VExpansionPanels: I_,
				VExpansionPanel: E_,
				VExpansionPanelText: Lv,
				VExpansionPanelTitle: Vv,
				VField: xa,
				VFieldLabel: Wl,
				VFileInput: T_,
				VFooter: A_,
				VForm: P_,
				VContainer: B_,
				VCol: M_,
				VRow: U_,
				VSpacer: W_,
				VHover: K_,
				VIcon: Fe,
				VComponentIcon: Qd,
				VSvgIcon: Ws,
				VLigatureIcon: $p,
				VClassIcon: Ks,
				VImg: Vl,
				VInput: Jt,
				VItemGroup: q_,
				VItem: Y_,
				VKbd: X_,
				VLabel: Bl,
				VLayout: G_,
				VLayoutItem: Z_,
				VLazy: J_,
				VList: Yo,
				VListGroup: ir,
				VListImg: l1,
				VListItem: an,
				VListItemAction: a1,
				VListItemMedia: o1,
				VListItemSubtitle: Uf,
				VListItemTitle: Wf,
				VListSubheader: Kf,
				VLocaleProvider: Q_,
				VMain: eC,
				VMenu: Zo,
				VMessages: Lf,
				VNavigationDrawer: rC,
				VNoSsr: uC,
				VOverlay: Rl,
				VPagination: dC,
				VParallax: vC,
				VProgressCircular: Js,
				VProgressLinear: Qs,
				VRadio: mC,
				VRadioGroup: hC,
				VRangeSlider: gC,
				VRating: yC,
				VResponsive: ff,
				VSelect: x1,
				VSelectionControl: Va,
				VSelectionControlGroup: Pf,
				VSheet: xv,
				VSlideGroup: Dv,
				VSlideGroupItem: pC,
				VSlider: cs,
				VSnackbar: _C,
				VSwitch: CC,
				VSystemBar: SC,
				VTabs: kC,
				VTab: zv,
				VTable: xC,
				VTextarea: $C,
				VTextField: $a,
				VThemeProvider: VC,
				VTimeline: LC,
				VTimelineItem: EC,
				VToolbar: bo,
				VToolbarTitle: yo,
				VToolbarItems: E0,
				VTooltip: TC,
				VValidation: AC,
				VWindow: bv,
				VWindowItem: pv,
				VDialogTransition: No,
				VFabTransition: Qp,
				VDialogBottomTransition: e0,
				VDialogTopTransition: t0,
				VFadeTransition: Ji,
				VScaleTransition: df,
				VScrollXTransition: n0,
				VScrollXReverseTransition: l0,
				VScrollYTransition: a0,
				VScrollYReverseTransition: o0,
				VSlideXTransition: i0,
				VSlideXReverseTransition: s0,
				VSlideYTransition: qs,
				VSlideYReverseTransition: r0,
				VExpandTransition: Do,
				VExpandXTransition: Ys,
			},
			Symbol.toStringTag,
			{ value: 'Module' },
		),
	);
function BC(e, t) {
	var f, d, v, h;
	const n = t.modifiers || {},
		l = t.value,
		{ once: a, immediate: o, ...i } = n,
		s = !Object.keys(i).length,
		{ handler: r, options: u } =
			typeof l == 'object'
				? l
				: {
						handler: l,
						options: {
							attributes: (f = i == null ? void 0 : i.attr) != null ? f : s,
							characterData: (d = i == null ? void 0 : i.char) != null ? d : s,
							childList: (v = i == null ? void 0 : i.child) != null ? v : s,
							subtree: (h = i == null ? void 0 : i.sub) != null ? h : s,
						},
				  },
		c = new MutationObserver(function () {
			let y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
				V = arguments.length > 1 ? arguments[1] : void 0;
			r == null || r(y, V), a && Uv(e, t);
		});
	o && (r == null || r([], c)),
		(e._mutate = Object(e._mutate)),
		(e._mutate[t.instance.$.uid] = { observer: c }),
		c.observe(e, u);
}
function Uv(e, t) {
	var n;
	!((n = e._mutate) != null && n[t.instance.$.uid]) ||
		(e._mutate[t.instance.$.uid].observer.disconnect(), delete e._mutate[t.instance.$.uid]);
}
const OC = { mounted: BC, unmounted: Uv };
function RC(e, t) {
	var n, l;
	const a = t.value,
		o = { passive: !((n = t.modifiers) != null && n.active) };
	window.addEventListener('resize', a, o),
		(e._onResize = Object(e._onResize)),
		(e._onResize[t.instance.$.uid] = { handler: a, options: o }),
		((l = t.modifiers) != null && l.quiet) || a();
}
function MC(e, t) {
	var n;
	if (!((n = e._onResize) != null && n[t.instance.$.uid])) return;
	const { handler: l, options: a } = e._onResize[t.instance.$.uid];
	window.removeEventListener('resize', l, a), delete e._onResize[t.instance.$.uid];
}
const FC = { mounted: RC, unmounted: MC };
function Wv(e, t) {
	var s;
	const { self: n = !1 } = (s = t.modifiers) != null ? s : {},
		l = t.value,
		a = (typeof l == 'object' && l.options) || { passive: !0 },
		o = typeof l == 'function' || 'handleEvent' in l ? l : l.handler,
		i = n ? e : t.arg ? document.querySelector(t.arg) : window;
	!i ||
		(i.addEventListener('scroll', o, a),
		(e._onScroll = Object(e._onScroll)),
		(e._onScroll[t.instance.$.uid] = { handler: o, options: a, target: n ? void 0 : i }));
}
function Kv(e, t) {
	var n;
	if (!((n = e._onScroll) != null && n[t.instance.$.uid])) return;
	const { handler: l, options: a, target: o = e } = e._onScroll[t.instance.$.uid];
	o.removeEventListener('scroll', l, a), delete e._onScroll[t.instance.$.uid];
}
function HC(e, t) {
	t.value !== t.oldValue && (Kv(e, t), Wv(e, t));
}
const NC = { mounted: Wv, unmounted: Kv, updated: HC },
	DC = Object.freeze(
		Object.defineProperty(
			{ __proto__: null, ClickOutside: av, Intersect: wa, Mutate: OC, Resize: FC, Ripple: xn, Scroll: NC, Touch: cr },
			Symbol.toStringTag,
			{ value: 'Module' },
		),
	),
	jC = { menu: bi.menu, close: bi.close, info: bi.info },
	zC = Ca((e) => {
		const t = rf({ components: PC, directives: DC, icons: { defaultSet: 'mdi', aliases: jC, sets: { mdi: Zp } } });
		e.vueApp.use(t), console.log('\u27A1\uFE0F Initialized Vuetify object ', t);
	}),
	UC = [qy, Nb, jb, zb, zC];
const WC = { class: 'w-100 text-right' },
	KC = Cn('p', { class: 'text-center' }, [Cn('b', null, "I'm the drawer")], -1),
	qC = Cn('h1', { class: 'text-h5' }, 'Styled with text-h5', -1),
	YC = Cn('p', null, 'Default text in a paragraph', -1),
	XC = Cn('p', { class: 'my-auto' }, "I'm the footer", -1),
	GC = {
		__name: 'app',
		setup(e) {
			const t = R(!1),
				n = () => {
					console.log('usedToggle()'), (t.value = !t.value);
				};
			return (l, a) => {
				const o = at('v-btn'),
					i = at('v-navigation-drawer'),
					s = at('v-app-bar-nav-icon'),
					r = at('v-toolbar-title'),
					u = at('v-app-bar'),
					c = at('v-sheet'),
					f = at('v-container'),
					d = at('v-main'),
					v = at('v-spacer'),
					h = at('v-icon'),
					y = at('v-row'),
					V = at('v-footer'),
					p = at('v-app');
				return (
					Zl(),
					Eh('div', null, [
						m(p, null, {
							default: ft(() => [
								m(
									i,
									{
										temporary: '',
										modelValue: Ge(t),
										'onUpdate:modelValue': a[1] || (a[1] = (b) => (Le(t) ? (t.value = b) : null)),
										location: 'right',
									},
									{
										default: ft(() => [
											Cn('div', WC, [
												m(o, { flat: '', icon: '$close', size: 'x-large', onClick: a[0] || (a[0] = (b) => n()) }),
											]),
											KC,
										]),
										_: 1,
									},
									8,
									['modelValue'],
								),
								m(u, null, {
									default: ft(() => [
										m(s, { onClick: a[2] || (a[2] = (b) => n()) }),
										m(r, null, { default: ft(() => [Sn("I'm the header")]), _: 1 }),
									]),
									_: 1,
								}),
								m(
									d,
									{ class: 'd-flex align-center' },
									{
										default: ft(() => [
											m(f, null, {
												default: ft(() => [
													m(
														c,
														{ class: 'py-4 text-center elevation-5' },
														{
															default: ft(() => [
																qC,
																YC,
																m(o, { class: 'mt-4' }, { default: ft(() => [Sn('press me')]), _: 1 }),
															]),
															_: 1,
														},
													),
												]),
												_: 1,
											}),
										]),
										_: 1,
									},
								),
								m(
									V,
									{ app: '', class: 'elevation-5' },
									{
										default: ft(() => [
											m(
												y,
												{ 'no-gutters': '', class: 'justify-center text-overline font-weight-black' },
												{
													default: ft(() => [
														XC,
														m(v),
														m(
															o,
															{ icon: '', variant: 'plain' },
															{ default: ft(() => [m(h, { icon: '$info', class: 'text-green-accent-4' })]), _: 1 },
														),
													]),
													_: 1,
												},
											),
										]),
										_: 1,
									},
								),
							]),
							_: 1,
						}),
					])
				);
			};
		},
	},
	Zu = {
		__name: 'nuxt-root',
		setup(e) {
			const t = nh(() =>
					kd(() => import('./error-component.44c8138d.js'), [], import.meta.url).then((o) => o.default || o),
				),
				n = st(),
				l = n.deferHydration();
			ze('_route', Ey()), n.hooks.callHookWith((o) => o.map((i) => i()), 'vue:setup');
			const a = Rs();
			return (
				Nc((o, i, s) => {
					n.hooks.callHook('vue:error', o, i, s).catch((r) => console.error('[nuxt] Error in `vue:error` hook', r)),
						Vy(o) && (o.fatal || o.unhandled) && Ql(n, xy, [o]);
				}),
				(o, i) => (
					Zl(),
					li(
						Xm,
						{ onResolve: Ge(l) },
						{
							default: ft(() => [
								Ge(a)
									? (Zl(), li(Ge(t), { key: 0, error: Ge(a) }, null, 8, ['error']))
									: (Zl(), li(Ge(GC), { key: 1 })),
							]),
							_: 1,
						},
						8,
						['onResolve'],
					)
				)
			);
		},
	};
globalThis.$fetch || (globalThis.$fetch = iy.create({ baseURL: ry() }));
let Ju;
const ZC = Sy(UC);
(Ju = async function () {
	var a;
	const n = Boolean((a = window.__NUXT__) == null ? void 0 : a.serverRendered) ? _g(Zu) : pg(Zu),
		l = py({ vueApp: n });
	try {
		await Cy(l, ZC);
	} catch (o) {
		await l.callHook('app:error', o), (l.payload.error = l.payload.error || o);
	}
	try {
		await l.hooks.callHook('app:created', n),
			await l.hooks.callHook('app:beforeMount', n),
			n.mount('#' + Hb),
			await l.hooks.callHook('app:mounted', n),
			await Te();
	} catch (o) {
		await l.callHook('app:error', o), (l.payload.error = l.payload.error || o);
	}
}),
	Ju().catch((e) => {
		console.error('Error while mounting app:', e);
	});
export {
	kd as _,
	Eh as a,
	Cn as b,
	li as c,
	nh as d,
	m as e,
	Sn as f,
	Ah as g,
	nS as h,
	tS as i,
	st as j,
	JC as n,
	Zl as o,
	eS as p,
	QC as t,
	Ge as u,
	ft as w,
};

