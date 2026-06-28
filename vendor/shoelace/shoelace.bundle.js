var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e10) {
    throw err = [e10], e10;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e10) {
    throw mod = 0, e10;
  }
};

// node_modules/@lit/reactive-element/css-tag.js
var t, e, s, o, n, r, i, S, c;
var init_css_tag = __esm({
  "node_modules/@lit/reactive-element/css-tag.js"() {
    t = globalThis;
    e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    s = /* @__PURE__ */ Symbol();
    o = /* @__PURE__ */ new WeakMap();
    n = class {
      constructor(t6, e10, o10) {
        if (this._$cssResult$ = true, o10 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t6, this.t = e10;
      }
      get styleSheet() {
        let t6 = this.o;
        const s4 = this.t;
        if (e && void 0 === t6) {
          const e10 = void 0 !== s4 && 1 === s4.length;
          e10 && (t6 = o.get(s4)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e10 && o.set(s4, t6));
        }
        return t6;
      }
      toString() {
        return this.cssText;
      }
    };
    r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
    i = (t6, ...e10) => {
      const o10 = 1 === t6.length ? t6[0] : e10.reduce((e11, s4, o11) => e11 + ((t7) => {
        if (true === t7._$cssResult$) return t7.cssText;
        if ("number" == typeof t7) return t7;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s4) + t6[o11 + 1], t6[0]);
      return new n(o10, t6, s);
    };
    S = (s4, o10) => {
      if (e) s4.adoptedStyleSheets = o10.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
      else for (const e10 of o10) {
        const o11 = document.createElement("style"), n7 = t.litNonce;
        void 0 !== n7 && o11.setAttribute("nonce", n7), o11.textContent = e10.cssText, s4.appendChild(o11);
      }
    };
    c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
      let e10 = "";
      for (const s4 of t7.cssRules) e10 += s4.cssText;
      return r(e10);
    })(t6) : t6;
  }
});

// node_modules/@lit/reactive-element/reactive-element.js
var i2, e2, h, r2, o2, n2, a, c2, l, p, d, u, f, b, y;
var init_reactive_element = __esm({
  "node_modules/@lit/reactive-element/reactive-element.js"() {
    init_css_tag();
    init_css_tag();
    ({ is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object);
    a = globalThis;
    c2 = a.trustedTypes;
    l = c2 ? c2.emptyScript : "";
    p = a.reactiveElementPolyfillSupport;
    d = (t6, s4) => t6;
    u = { toAttribute(t6, s4) {
      switch (s4) {
        case Boolean:
          t6 = t6 ? l : null;
          break;
        case Object:
        case Array:
          t6 = null == t6 ? t6 : JSON.stringify(t6);
      }
      return t6;
    }, fromAttribute(t6, s4) {
      let i9 = t6;
      switch (s4) {
        case Boolean:
          i9 = null !== t6;
          break;
        case Number:
          i9 = null === t6 ? null : Number(t6);
          break;
        case Object:
        case Array:
          try {
            i9 = JSON.parse(t6);
          } catch (t7) {
            i9 = null;
          }
      }
      return i9;
    } };
    f = (t6, s4) => !i2(t6, s4);
    b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
    Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
    y = class extends HTMLElement {
      static addInitializer(t6) {
        this._$Ei(), (this.l ?? (this.l = [])).push(t6);
      }
      static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()];
      }
      static createProperty(t6, s4 = b) {
        if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t6) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t6, s4), !s4.noAccessor) {
          const i9 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t6, i9, s4);
          void 0 !== h3 && e2(this.prototype, t6, h3);
        }
      }
      static getPropertyDescriptor(t6, s4, i9) {
        const { get: e10, set: r8 } = h(this.prototype, t6) ?? { get() {
          return this[s4];
        }, set(t7) {
          this[s4] = t7;
        } };
        return { get: e10, set(s5) {
          const h3 = e10?.call(this);
          r8?.call(this, s5), this.requestUpdate(t6, h3, i9);
        }, configurable: true, enumerable: true };
      }
      static getPropertyOptions(t6) {
        return this.elementProperties.get(t6) ?? b;
      }
      static _$Ei() {
        if (this.hasOwnProperty(d("elementProperties"))) return;
        const t6 = n2(this);
        t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
      }
      static finalize() {
        if (this.hasOwnProperty(d("finalized"))) return;
        if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
          const t7 = this.properties, s4 = [...r2(t7), ...o2(t7)];
          for (const i9 of s4) this.createProperty(i9, t7[i9]);
        }
        const t6 = this[Symbol.metadata];
        if (null !== t6) {
          const s4 = litPropertyMetadata.get(t6);
          if (void 0 !== s4) for (const [t7, i9] of s4) this.elementProperties.set(t7, i9);
        }
        this._$Eh = /* @__PURE__ */ new Map();
        for (const [t7, s4] of this.elementProperties) {
          const i9 = this._$Eu(t7, s4);
          void 0 !== i9 && this._$Eh.set(i9, t7);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
      }
      static finalizeStyles(s4) {
        const i9 = [];
        if (Array.isArray(s4)) {
          const e10 = new Set(s4.flat(1 / 0).reverse());
          for (const s5 of e10) i9.unshift(c(s5));
        } else void 0 !== s4 && i9.push(c(s4));
        return i9;
      }
      static _$Eu(t6, s4) {
        const i9 = s4.attribute;
        return false === i9 ? void 0 : "string" == typeof i9 ? i9 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
      }
      constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
      }
      _$Ev() {
        this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t6) => t6(this));
      }
      addController(t6) {
        (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t6), void 0 !== this.renderRoot && this.isConnected && t6.hostConnected?.();
      }
      removeController(t6) {
        this._$EO?.delete(t6);
      }
      _$E_() {
        const t6 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
        for (const i9 of s4.keys()) this.hasOwnProperty(i9) && (t6.set(i9, this[i9]), delete this[i9]);
        t6.size > 0 && (this._$Ep = t6);
      }
      createRenderRoot() {
        const t6 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S(t6, this.constructor.elementStyles), t6;
      }
      connectedCallback() {
        this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t6) => t6.hostConnected?.());
      }
      enableUpdating(t6) {
      }
      disconnectedCallback() {
        this._$EO?.forEach((t6) => t6.hostDisconnected?.());
      }
      attributeChangedCallback(t6, s4, i9) {
        this._$AK(t6, i9);
      }
      _$ET(t6, s4) {
        const i9 = this.constructor.elementProperties.get(t6), e10 = this.constructor._$Eu(t6, i9);
        if (void 0 !== e10 && true === i9.reflect) {
          const h3 = (void 0 !== i9.converter?.toAttribute ? i9.converter : u).toAttribute(s4, i9.type);
          this._$Em = t6, null == h3 ? this.removeAttribute(e10) : this.setAttribute(e10, h3), this._$Em = null;
        }
      }
      _$AK(t6, s4) {
        const i9 = this.constructor, e10 = i9._$Eh.get(t6);
        if (void 0 !== e10 && this._$Em !== e10) {
          const t7 = i9.getPropertyOptions(e10), h3 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : u;
          this._$Em = e10;
          const r8 = h3.fromAttribute(s4, t7.type);
          this[e10] = r8 ?? this._$Ej?.get(e10) ?? r8, this._$Em = null;
        }
      }
      requestUpdate(t6, s4, i9, e10 = false, h3) {
        if (void 0 !== t6) {
          const r8 = this.constructor;
          if (false === e10 && (h3 = this[t6]), i9 ?? (i9 = r8.getPropertyOptions(t6)), !((i9.hasChanged ?? f)(h3, s4) || i9.useDefault && i9.reflect && h3 === this._$Ej?.get(t6) && !this.hasAttribute(r8._$Eu(t6, i9)))) return;
          this.C(t6, s4, i9);
        }
        false === this.isUpdatePending && (this._$ES = this._$EP());
      }
      C(t6, s4, { useDefault: i9, reflect: e10, wrapped: h3 }, r8) {
        i9 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t6) && (this._$Ej.set(t6, r8 ?? s4 ?? this[t6]), true !== h3 || void 0 !== r8) || (this._$AL.has(t6) || (this.hasUpdated || i9 || (s4 = void 0), this._$AL.set(t6, s4)), true === e10 && this._$Em !== t6 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t6));
      }
      async _$EP() {
        this.isUpdatePending = true;
        try {
          await this._$ES;
        } catch (t7) {
          Promise.reject(t7);
        }
        const t6 = this.scheduleUpdate();
        return null != t6 && await t6, !this.isUpdatePending;
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
          if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
            for (const [t8, s5] of this._$Ep) this[t8] = s5;
            this._$Ep = void 0;
          }
          const t7 = this.constructor.elementProperties;
          if (t7.size > 0) for (const [s5, i9] of t7) {
            const { wrapped: t8 } = i9, e10 = this[s5];
            true !== t8 || this._$AL.has(s5) || void 0 === e10 || this.C(s5, void 0, i9, e10);
          }
        }
        let t6 = false;
        const s4 = this._$AL;
        try {
          t6 = this.shouldUpdate(s4), t6 ? (this.willUpdate(s4), this._$EO?.forEach((t7) => t7.hostUpdate?.()), this.update(s4)) : this._$EM();
        } catch (s5) {
          throw t6 = false, this._$EM(), s5;
        }
        t6 && this._$AE(s4);
      }
      willUpdate(t6) {
      }
      _$AE(t6) {
        this._$EO?.forEach((t7) => t7.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
      }
      _$EM() {
        this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this._$ES;
      }
      shouldUpdate(t6) {
        return true;
      }
      update(t6) {
        this._$Eq && (this._$Eq = this._$Eq.forEach((t7) => this._$ET(t7, this[t7]))), this._$EM();
      }
      updated(t6) {
      }
      firstUpdated(t6) {
      }
    };
    y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.2");
  }
});

// node_modules/lit-html/lit-html.js
function V(t6, i9) {
  if (!u2(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i9) : i9;
}
function M(t6, i9, s4 = t6, e10) {
  if (i9 === E) return i9;
  let h3 = void 0 !== e10 ? s4._$Co?.[e10] : s4._$Cl;
  const o10 = a2(i9) ? void 0 : i9._$litDirective$;
  return h3?.constructor !== o10 && (h3?._$AO?.(false), void 0 === o10 ? h3 = void 0 : (h3 = new o10(t6), h3._$AT(t6, s4, e10)), void 0 !== e10 ? (s4._$Co ?? (s4._$Co = []))[e10] = h3 : s4._$Cl = h3), void 0 !== h3 && (i9 = M(t6, h3._$AS(t6, i9.values), h3, e10)), i9;
}
var t2, i3, s2, e3, h2, o3, n3, r3, l2, c3, a2, u2, d2, f2, v, _, m, p2, g, $, y2, x, b2, w, T, E, A, C, P, N, S2, R, k, H, I, L, z, Z, j, B, D;
var init_lit_html = __esm({
  "node_modules/lit-html/lit-html.js"() {
    t2 = globalThis;
    i3 = (t6) => t6;
    s2 = t2.trustedTypes;
    e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
    h2 = "$lit$";
    o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
    n3 = "?" + o3;
    r3 = `<${n3}>`;
    l2 = document;
    c3 = () => l2.createComment("");
    a2 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
    u2 = Array.isArray;
    d2 = (t6) => u2(t6) || "function" == typeof t6?.[Symbol.iterator];
    f2 = "[ 	\n\f\r]";
    v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
    _ = /-->/g;
    m = />/g;
    p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
    g = /'/g;
    $ = /"/g;
    y2 = /^(?:script|style|textarea|title)$/i;
    x = (t6) => (i9, ...s4) => ({ _$litType$: t6, strings: i9, values: s4 });
    b2 = x(1);
    w = x(2);
    T = x(3);
    E = /* @__PURE__ */ Symbol.for("lit-noChange");
    A = /* @__PURE__ */ Symbol.for("lit-nothing");
    C = /* @__PURE__ */ new WeakMap();
    P = l2.createTreeWalker(l2, 129);
    N = (t6, i9) => {
      const s4 = t6.length - 1, e10 = [];
      let n7, l6 = 2 === i9 ? "<svg>" : 3 === i9 ? "<math>" : "", c5 = v;
      for (let i10 = 0; i10 < s4; i10++) {
        const s5 = t6[i10];
        let a4, u4, d3 = -1, f3 = 0;
        for (; f3 < s5.length && (c5.lastIndex = f3, u4 = c5.exec(s5), null !== u4); ) f3 = c5.lastIndex, c5 === v ? "!--" === u4[1] ? c5 = _ : void 0 !== u4[1] ? c5 = m : void 0 !== u4[2] ? (y2.test(u4[2]) && (n7 = RegExp("</" + u4[2], "g")), c5 = p2) : void 0 !== u4[3] && (c5 = p2) : c5 === p2 ? ">" === u4[0] ? (c5 = n7 ?? v, d3 = -1) : void 0 === u4[1] ? d3 = -2 : (d3 = c5.lastIndex - u4[2].length, a4 = u4[1], c5 = void 0 === u4[3] ? p2 : '"' === u4[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n7 = void 0);
        const x2 = c5 === p2 && t6[i10 + 1].startsWith("/>") ? " " : "";
        l6 += c5 === v ? s5 + r3 : d3 >= 0 ? (e10.push(a4), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i10 : x2);
      }
      return [V(t6, l6 + (t6[s4] || "<?>") + (2 === i9 ? "</svg>" : 3 === i9 ? "</math>" : "")), e10];
    };
    S2 = class _S {
      constructor({ strings: t6, _$litType$: i9 }, e10) {
        let r8;
        this.parts = [];
        let l6 = 0, a4 = 0;
        const u4 = t6.length - 1, d3 = this.parts, [f3, v2] = N(t6, i9);
        if (this.el = _S.createElement(f3, e10), P.currentNode = this.el.content, 2 === i9 || 3 === i9) {
          const t7 = this.el.content.firstChild;
          t7.replaceWith(...t7.childNodes);
        }
        for (; null !== (r8 = P.nextNode()) && d3.length < u4; ) {
          if (1 === r8.nodeType) {
            if (r8.hasAttributes()) for (const t7 of r8.getAttributeNames()) if (t7.endsWith(h2)) {
              const i10 = v2[a4++], s4 = r8.getAttribute(t7).split(o3), e11 = /([.?@])?(.*)/.exec(i10);
              d3.push({ type: 1, index: l6, name: e11[2], strings: s4, ctor: "." === e11[1] ? I : "?" === e11[1] ? L : "@" === e11[1] ? z : H }), r8.removeAttribute(t7);
            } else t7.startsWith(o3) && (d3.push({ type: 6, index: l6 }), r8.removeAttribute(t7));
            if (y2.test(r8.tagName)) {
              const t7 = r8.textContent.split(o3), i10 = t7.length - 1;
              if (i10 > 0) {
                r8.textContent = s2 ? s2.emptyScript : "";
                for (let s4 = 0; s4 < i10; s4++) r8.append(t7[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l6 });
                r8.append(t7[i10], c3());
              }
            }
          } else if (8 === r8.nodeType) if (r8.data === n3) d3.push({ type: 2, index: l6 });
          else {
            let t7 = -1;
            for (; -1 !== (t7 = r8.data.indexOf(o3, t7 + 1)); ) d3.push({ type: 7, index: l6 }), t7 += o3.length - 1;
          }
          l6++;
        }
      }
      static createElement(t6, i9) {
        const s4 = l2.createElement("template");
        return s4.innerHTML = t6, s4;
      }
    };
    R = class {
      constructor(t6, i9) {
        this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i9;
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      u(t6) {
        const { el: { content: i9 }, parts: s4 } = this._$AD, e10 = (t6?.creationScope ?? l2).importNode(i9, true);
        P.currentNode = e10;
        let h3 = P.nextNode(), o10 = 0, n7 = 0, r8 = s4[0];
        for (; void 0 !== r8; ) {
          if (o10 === r8.index) {
            let i10;
            2 === r8.type ? i10 = new k(h3, h3.nextSibling, this, t6) : 1 === r8.type ? i10 = new r8.ctor(h3, r8.name, r8.strings, this, t6) : 6 === r8.type && (i10 = new Z(h3, this, t6)), this._$AV.push(i10), r8 = s4[++n7];
          }
          o10 !== r8?.index && (h3 = P.nextNode(), o10++);
        }
        return P.currentNode = l2, e10;
      }
      p(t6) {
        let i9 = 0;
        for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t6, s4, i9), i9 += s4.strings.length - 2) : s4._$AI(t6[i9])), i9++;
      }
    };
    k = class _k {
      get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
      }
      constructor(t6, i9, s4, e10) {
        this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t6, this._$AB = i9, this._$AM = s4, this.options = e10, this._$Cv = e10?.isConnected ?? true;
      }
      get parentNode() {
        let t6 = this._$AA.parentNode;
        const i9 = this._$AM;
        return void 0 !== i9 && 11 === t6?.nodeType && (t6 = i9.parentNode), t6;
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t6, i9 = this) {
        t6 = M(this, t6, i9), a2(t6) ? t6 === A || null == t6 || "" === t6 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t6 !== this._$AH && t6 !== E && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : d2(t6) ? this.k(t6) : this._(t6);
      }
      O(t6) {
        return this._$AA.parentNode.insertBefore(t6, this._$AB);
      }
      T(t6) {
        this._$AH !== t6 && (this._$AR(), this._$AH = this.O(t6));
      }
      _(t6) {
        this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(l2.createTextNode(t6)), this._$AH = t6;
      }
      $(t6) {
        const { values: i9, _$litType$: s4 } = t6, e10 = "number" == typeof s4 ? this._$AC(t6) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
        if (this._$AH?._$AD === e10) this._$AH.p(i9);
        else {
          const t7 = new R(e10, this), s5 = t7.u(this.options);
          t7.p(i9), this.T(s5), this._$AH = t7;
        }
      }
      _$AC(t6) {
        let i9 = C.get(t6.strings);
        return void 0 === i9 && C.set(t6.strings, i9 = new S2(t6)), i9;
      }
      k(t6) {
        u2(this._$AH) || (this._$AH = [], this._$AR());
        const i9 = this._$AH;
        let s4, e10 = 0;
        for (const h3 of t6) e10 === i9.length ? i9.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i9[e10], s4._$AI(h3), e10++;
        e10 < i9.length && (this._$AR(s4 && s4._$AB.nextSibling, e10), i9.length = e10);
      }
      _$AR(t6 = this._$AA.nextSibling, s4) {
        for (this._$AP?.(false, true, s4); t6 !== this._$AB; ) {
          const s5 = i3(t6).nextSibling;
          i3(t6).remove(), t6 = s5;
        }
      }
      setConnected(t6) {
        void 0 === this._$AM && (this._$Cv = t6, this._$AP?.(t6));
      }
    };
    H = class {
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      constructor(t6, i9, s4, e10, h3) {
        this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t6, this.name = i9, this._$AM = e10, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
      }
      _$AI(t6, i9 = this, s4, e10) {
        const h3 = this.strings;
        let o10 = false;
        if (void 0 === h3) t6 = M(this, t6, i9, 0), o10 = !a2(t6) || t6 !== this._$AH && t6 !== E, o10 && (this._$AH = t6);
        else {
          const e11 = t6;
          let n7, r8;
          for (t6 = h3[0], n7 = 0; n7 < h3.length - 1; n7++) r8 = M(this, e11[s4 + n7], i9, n7), r8 === E && (r8 = this._$AH[n7]), o10 || (o10 = !a2(r8) || r8 !== this._$AH[n7]), r8 === A ? t6 = A : t6 !== A && (t6 += (r8 ?? "") + h3[n7 + 1]), this._$AH[n7] = r8;
        }
        o10 && !e10 && this.j(t6);
      }
      j(t6) {
        t6 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 ?? "");
      }
    };
    I = class extends H {
      constructor() {
        super(...arguments), this.type = 3;
      }
      j(t6) {
        this.element[this.name] = t6 === A ? void 0 : t6;
      }
    };
    L = class extends H {
      constructor() {
        super(...arguments), this.type = 4;
      }
      j(t6) {
        this.element.toggleAttribute(this.name, !!t6 && t6 !== A);
      }
    };
    z = class extends H {
      constructor(t6, i9, s4, e10, h3) {
        super(t6, i9, s4, e10, h3), this.type = 5;
      }
      _$AI(t6, i9 = this) {
        if ((t6 = M(this, t6, i9, 0) ?? A) === E) return;
        const s4 = this._$AH, e10 = t6 === A && s4 !== A || t6.capture !== s4.capture || t6.once !== s4.once || t6.passive !== s4.passive, h3 = t6 !== A && (s4 === A || e10);
        e10 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
      }
      handleEvent(t6) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
      }
    };
    Z = class {
      constructor(t6, i9, s4) {
        this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i9, this.options = s4;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t6) {
        M(this, t6);
      }
    };
    j = { M: h2, P: o3, A: n3, C: 1, L: N, R, D: d2, V: M, I: k, H, N: L, U: z, B: I, F: Z };
    B = t2.litHtmlPolyfillSupport;
    B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.3");
    D = (t6, i9, s4) => {
      const e10 = s4?.renderBefore ?? i9;
      let h3 = e10._$litPart$;
      if (void 0 === h3) {
        const t7 = s4?.renderBefore ?? null;
        e10._$litPart$ = h3 = new k(i9.insertBefore(c3(), t7), t7, void 0, s4 ?? {});
      }
      return h3._$AI(t6), h3;
    };
  }
});

// node_modules/lit-element/lit-element.js
var s3, i4, o4;
var init_lit_element = __esm({
  "node_modules/lit-element/lit-element.js"() {
    init_reactive_element();
    init_reactive_element();
    init_lit_html();
    init_lit_html();
    s3 = globalThis;
    i4 = class extends y {
      constructor() {
        super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
      }
      createRenderRoot() {
        var _a;
        const t6 = super.createRenderRoot();
        return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t6.firstChild), t6;
      }
      update(t6) {
        const r8 = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = D(r8, this.renderRoot, this.renderOptions);
      }
      connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(true);
      }
      disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(false);
      }
      render() {
        return E;
      }
    };
    i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
    o4 = s3.litElementPolyfillSupport;
    o4?.({ LitElement: i4 });
    (s3.litElementVersions ?? (s3.litElementVersions = [])).push("4.2.2");
  }
});

// node_modules/lit-html/is-server.js
var init_is_server = __esm({
  "node_modules/lit-html/is-server.js"() {
  }
});

// node_modules/lit/index.js
var init_lit = __esm({
  "node_modules/lit/index.js"() {
    init_reactive_element();
    init_lit_html();
    init_lit_element();
    init_is_server();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DUCI5S4.js
var spinner_styles_default;
var init_chunk_7DUCI5S4 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DUCI5S4.js"() {
    init_lit();
    spinner_styles_default = i`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;
  }
});

// node_modules/@shoelace-style/localize/dist/index.js
function registerTranslation(...translation2) {
  translation2.map((t6) => {
    const code = t6.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t6));
    } else {
      translations.set(code, t6);
    }
    if (!fallback) {
      fallback = t6;
    }
  });
  update();
}
function update() {
  if (isClient) {
    documentDirection = document.documentElement.dir || "ltr";
    documentLanguage = document.documentElement.lang || navigator.language;
  }
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var connectedElements, translations, fallback, documentDirection, documentLanguage, isClient, LocalizeController;
var init_dist = __esm({
  "node_modules/@shoelace-style/localize/dist/index.js"() {
    connectedElements = /* @__PURE__ */ new Set();
    translations = /* @__PURE__ */ new Map();
    documentDirection = "ltr";
    documentLanguage = "en";
    isClient = typeof MutationObserver !== "undefined" && typeof document !== "undefined" && typeof document.documentElement !== "undefined";
    if (isClient) {
      const documentElementObserver = new MutationObserver(update);
      documentDirection = document.documentElement.dir || "ltr";
      documentLanguage = document.documentElement.lang || navigator.language;
      documentElementObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir", "lang"]
      });
    }
    LocalizeController = class {
      constructor(host) {
        this.host = host;
        this.host.addController(this);
      }
      hostConnected() {
        connectedElements.add(this.host);
      }
      hostDisconnected() {
        connectedElements.delete(this.host);
      }
      dir() {
        return `${this.host.dir || documentDirection}`.toLowerCase();
      }
      lang() {
        return `${this.host.lang || documentLanguage}`.toLowerCase();
      }
      getTranslationData(lang) {
        var _a, _b;
        let locale;
        try {
          locale = new Intl.Locale(lang.replace(/_/g, "-"));
        } catch (_c) {
          return { locale: void 0, language: "", region: "", primary: void 0, secondary: void 0 };
        }
        const language = locale.language.toLowerCase();
        const region = (_b = (_a = locale.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
        const primary = translations.get(`${language}-${region}`);
        const secondary = translations.get(language);
        return { locale, language, region, primary, secondary };
      }
      exists(key, options) {
        var _a;
        const { primary, secondary } = this.getTranslationData((_a = options.lang) !== null && _a !== void 0 ? _a : this.lang());
        options = Object.assign({ includeFallback: false }, options);
        if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
          return true;
        }
        return false;
      }
      term(key, ...args) {
        const { primary, secondary } = this.getTranslationData(this.lang());
        let term;
        if (primary && primary[key]) {
          term = primary[key];
        } else if (secondary && secondary[key]) {
          term = secondary[key];
        } else if (fallback && fallback[key]) {
          term = fallback[key];
        } else {
          console.error(`No translation found for: ${String(key)}`);
          return String(key);
        }
        if (typeof term === "function") {
          return term(...args);
        }
        return term;
      }
      date(dateToFormat, options) {
        dateToFormat = new Date(dateToFormat);
        return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
      }
      number(numberToFormat, options) {
        numberToFormat = Number(numberToFormat);
        return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
      }
      relativeTime(value, unit, options) {
        return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
      }
    };
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BTDLTNI.js
var translation, en_default;
var init_chunk_7BTDLTNI = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BTDLTNI.js"() {
    init_dist();
    translation = {
      $code: "en",
      $name: "English",
      $dir: "ltr",
      carousel: "Carousel",
      clearEntry: "Clear entry",
      close: "Close",
      copied: "Copied",
      copy: "Copy",
      currentValue: "Current value",
      error: "Error",
      goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
      hidePassword: "Hide password",
      loading: "Loading",
      nextSlide: "Next slide",
      numOptionsSelected: (num) => {
        if (num === 0) return "No options selected";
        if (num === 1) return "1 option selected";
        return `${num} options selected`;
      },
      previousSlide: "Previous slide",
      progress: "Progress",
      remove: "Remove",
      resize: "Resize",
      scrollToEnd: "Scroll to end",
      scrollToStart: "Scroll to start",
      selectAColorFromTheScreen: "Select a color from the screen",
      showPassword: "Show password",
      slideNum: (slide) => `Slide ${slide}`,
      toggleColorFormat: "Toggle color format"
    };
    registerTranslation(translation);
    en_default = translation;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CTB5ZDJ.js
var LocalizeController2;
var init_chunk_6CTB5ZDJ = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CTB5ZDJ.js"() {
    init_chunk_7BTDLTNI();
    init_dist();
    init_dist();
    LocalizeController2 = class extends LocalizeController {
    };
    registerTranslation(en_default);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js
var component_styles_default;
var init_chunk_TUVJKY7S = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js"() {
    init_lit();
    component_styles_default = i`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js
var __defProp, __defProps, __getOwnPropDesc, __getOwnPropDescs, __getOwnPropSymbols, __hasOwnProp, __propIsEnum, __typeError, __defNormalProp, __spreadValues, __spreadProps, __decorateClass, __accessCheck, __privateGet, __privateAdd, __privateSet;
var init_chunk_KAW7D32O = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js"() {
    __defProp = Object.defineProperty;
    __defProps = Object.defineProperties;
    __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols = Object.getOwnPropertySymbols;
    __hasOwnProp = Object.prototype.hasOwnProperty;
    __propIsEnum = Object.prototype.propertyIsEnumerable;
    __typeError = (msg) => {
      throw TypeError(msg);
    };
    __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    __spreadValues = (a4, b3) => {
      for (var prop in b3 || (b3 = {}))
        if (__hasOwnProp.call(b3, prop))
          __defNormalProp(a4, prop, b3[prop]);
      if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b3)) {
          if (__propIsEnum.call(b3, prop))
            __defNormalProp(a4, prop, b3[prop]);
        }
      return a4;
    };
    __spreadProps = (a4, b3) => __defProps(a4, __getOwnPropDescs(b3));
    __decorateClass = (decorators, target, key, kind) => {
      var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
      for (var i9 = decorators.length - 1, decorator; i9 >= 0; i9--)
        if (decorator = decorators[i9])
          result = (kind ? decorator(target, key, result) : decorator(result)) || result;
      if (kind && result) __defProp(target, key, result);
      return result;
    };
    __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
    __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
    __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  }
});

// node_modules/@lit/reactive-element/decorators/custom-element.js
var init_custom_element = __esm({
  "node_modules/@lit/reactive-element/decorators/custom-element.js"() {
  }
});

// node_modules/@lit/reactive-element/decorators/property.js
function n4(t6) {
  return (e10, o10) => "object" == typeof o10 ? r4(t6, e10, o10) : ((t7, e11, o11) => {
    const r8 = e11.hasOwnProperty(o11);
    return e11.constructor.createProperty(o11, t7), r8 ? Object.getOwnPropertyDescriptor(e11, o11) : void 0;
  })(t6, e10, o10);
}
var o5, r4;
var init_property = __esm({
  "node_modules/@lit/reactive-element/decorators/property.js"() {
    init_reactive_element();
    o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
    r4 = (t6 = o5, e10, r8) => {
      const { kind: n7, metadata: i9 } = r8;
      let s4 = globalThis.litPropertyMetadata.get(i9);
      if (void 0 === s4 && globalThis.litPropertyMetadata.set(i9, s4 = /* @__PURE__ */ new Map()), "setter" === n7 && ((t6 = Object.create(t6)).wrapped = true), s4.set(r8.name, t6), "accessor" === n7) {
        const { name: o10 } = r8;
        return { set(r9) {
          const n8 = e10.get.call(this);
          e10.set.call(this, r9), this.requestUpdate(o10, n8, t6, true, r9);
        }, init(e11) {
          return void 0 !== e11 && this.C(o10, void 0, t6, e11), e11;
        } };
      }
      if ("setter" === n7) {
        const { name: o10 } = r8;
        return function(r9) {
          const n8 = this[o10];
          e10.call(this, r9), this.requestUpdate(o10, n8, t6, true, r9);
        };
      }
      throw Error("Unsupported decorator location: " + n7);
    };
  }
});

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r8) {
  return n4({ ...r8, state: true, attribute: false });
}
var init_state = __esm({
  "node_modules/@lit/reactive-element/decorators/state.js"() {
    init_property();
  }
});

// node_modules/@lit/reactive-element/decorators/event-options.js
function t3(t6) {
  return (n7, o10) => {
    const c5 = "function" == typeof n7 ? n7 : n7[o10];
    Object.assign(c5, t6);
  };
}
var init_event_options = __esm({
  "node_modules/@lit/reactive-element/decorators/event-options.js"() {
  }
});

// node_modules/@lit/reactive-element/decorators/base.js
var e4;
var init_base = __esm({
  "node_modules/@lit/reactive-element/decorators/base.js"() {
    e4 = (e10, t6, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t6 && Object.defineProperty(e10, t6, c5), c5);
  }
});

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e10, r8) {
  return (n7, s4, i9) => {
    const o10 = (t6) => t6.renderRoot?.querySelector(e10) ?? null;
    if (r8) {
      const { get: e11, set: r9 } = "object" == typeof s4 ? n7 : i9 ?? /* @__PURE__ */ (() => {
        const t6 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t6];
        }, set(e12) {
          this[t6] = e12;
        } };
      })();
      return e4(n7, s4, { get() {
        let t6 = e11.call(this);
        return void 0 === t6 && (t6 = o10(this), (null !== t6 || this.hasUpdated) && r9.call(this, t6)), t6;
      } });
    }
    return e4(n7, s4, { get() {
      return o10(this);
    } });
  };
}
var init_query = __esm({
  "node_modules/@lit/reactive-element/decorators/query.js"() {
    init_base();
  }
});

// node_modules/@lit/reactive-element/decorators/query-all.js
var init_query_all = __esm({
  "node_modules/@lit/reactive-element/decorators/query-all.js"() {
    init_base();
  }
});

// node_modules/@lit/reactive-element/decorators/query-async.js
var init_query_async = __esm({
  "node_modules/@lit/reactive-element/decorators/query-async.js"() {
    init_base();
  }
});

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var init_query_assigned_elements = __esm({
  "node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"() {
    init_base();
  }
});

// node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var init_query_assigned_nodes = __esm({
  "node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"() {
    init_base();
  }
});

// node_modules/lit/decorators.js
var init_decorators = __esm({
  "node_modules/lit/decorators.js"() {
    init_custom_element();
    init_property();
    init_state();
    init_event_options();
    init_query();
    init_query_all();
    init_query_async();
    init_query_assigned_elements();
    init_query_assigned_nodes();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js
var _hasRecordedInitialProperties, ShoelaceElement;
var init_chunk_4TUIT776 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js"() {
    init_chunk_KAW7D32O();
    init_lit();
    init_decorators();
    ShoelaceElement = class extends i4 {
      constructor() {
        super();
        __privateAdd(this, _hasRecordedInitialProperties, false);
        this.initialReflectedProperties = /* @__PURE__ */ new Map();
        Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
          this.constructor.define(name, component);
        });
      }
      emit(name, options) {
        const event = new CustomEvent(name, __spreadValues({
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {}
        }, options));
        this.dispatchEvent(event);
        return event;
      }
      /* eslint-enable */
      static define(name, elementConstructor = this, options = {}) {
        const currentlyRegisteredConstructor = customElements.get(name);
        if (!currentlyRegisteredConstructor) {
          try {
            customElements.define(name, elementConstructor, options);
          } catch (_err) {
            customElements.define(name, class extends elementConstructor {
            }, options);
          }
          return;
        }
        let newVersion = " (unknown version)";
        let existingVersion = newVersion;
        if ("version" in elementConstructor && elementConstructor.version) {
          newVersion = " v" + elementConstructor.version;
        }
        if ("version" in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
          existingVersion = " v" + currentlyRegisteredConstructor.version;
        }
        if (newVersion && existingVersion && newVersion === existingVersion) {
          return;
        }
        console.warn(
          `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
        );
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (!__privateGet(this, _hasRecordedInitialProperties)) {
          this.constructor.elementProperties.forEach(
            (obj, prop) => {
              if (obj.reflect && this[prop] != null) {
                this.initialReflectedProperties.set(prop, this[prop]);
              }
            }
          );
          __privateSet(this, _hasRecordedInitialProperties, true);
        }
        super.attributeChangedCallback(name, oldValue, newValue);
      }
      willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        this.initialReflectedProperties.forEach((value, prop) => {
          if (changedProperties.has(prop) && this[prop] == null) {
            this[prop] = value;
          }
        });
      }
    };
    _hasRecordedInitialProperties = /* @__PURE__ */ new WeakMap();
    ShoelaceElement.version = "2.20.1";
    ShoelaceElement.dependencies = {};
    __decorateClass([
      n4()
    ], ShoelaceElement.prototype, "dir", 2);
    __decorateClass([
      n4()
    ], ShoelaceElement.prototype, "lang", 2);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.36O46B5H.js
var SlSpinner;
var init_chunk_36O46B5H = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.36O46B5H.js"() {
    init_chunk_7DUCI5S4();
    init_chunk_6CTB5ZDJ();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_lit();
    SlSpinner = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.localize = new LocalizeController2(this);
      }
      render() {
        return b2`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
      }
    };
    SlSpinner.styles = [component_styles_default, spinner_styles_default];
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3RPBFEDE.js
var formCollections, reportValidityOverloads, checkValidityOverloads, userInteractedControls, interactions, FormControlController, validValidityState, valueMissingValidityState, customErrorValidityState;
var init_chunk_3RPBFEDE = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3RPBFEDE.js"() {
    init_chunk_KAW7D32O();
    formCollections = /* @__PURE__ */ new WeakMap();
    reportValidityOverloads = /* @__PURE__ */ new WeakMap();
    checkValidityOverloads = /* @__PURE__ */ new WeakMap();
    userInteractedControls = /* @__PURE__ */ new WeakSet();
    interactions = /* @__PURE__ */ new WeakMap();
    FormControlController = class {
      constructor(host, options) {
        this.handleFormData = (event) => {
          const disabled = this.options.disabled(this.host);
          const name = this.options.name(this.host);
          const value = this.options.value(this.host);
          const isButton = this.host.tagName.toLowerCase() === "sl-button";
          if (this.host.isConnected && !disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
            if (Array.isArray(value)) {
              value.forEach((val) => {
                event.formData.append(name, val.toString());
              });
            } else {
              event.formData.append(name, value.toString());
            }
          }
        };
        this.handleFormSubmit = (event) => {
          var _a;
          const disabled = this.options.disabled(this.host);
          const reportValidity = this.options.reportValidity;
          if (this.form && !this.form.noValidate) {
            (_a = formCollections.get(this.form)) == null ? void 0 : _a.forEach((control) => {
              this.setUserInteracted(control, true);
            });
          }
          if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        };
        this.handleFormReset = () => {
          this.options.setValue(this.host, this.options.defaultValue(this.host));
          this.setUserInteracted(this.host, false);
          interactions.set(this.host, []);
        };
        this.handleInteraction = (event) => {
          const emittedEvents = interactions.get(this.host);
          if (!emittedEvents.includes(event.type)) {
            emittedEvents.push(event.type);
          }
          if (emittedEvents.length === this.options.assumeInteractionOn.length) {
            this.setUserInteracted(this.host, true);
          }
        };
        this.checkFormValidity = () => {
          if (this.form && !this.form.noValidate) {
            const elements = this.form.querySelectorAll("*");
            for (const element of elements) {
              if (typeof element.checkValidity === "function") {
                if (!element.checkValidity()) {
                  return false;
                }
              }
            }
          }
          return true;
        };
        this.reportFormValidity = () => {
          if (this.form && !this.form.noValidate) {
            const elements = this.form.querySelectorAll("*");
            for (const element of elements) {
              if (typeof element.reportValidity === "function") {
                if (!element.reportValidity()) {
                  return false;
                }
              }
            }
          }
          return true;
        };
        (this.host = host).addController(this);
        this.options = __spreadValues({
          form: (input) => {
            const formId = input.form;
            if (formId) {
              const root = input.getRootNode();
              const form = root.querySelector(`#${formId}`);
              if (form) {
                return form;
              }
            }
            return input.closest("form");
          },
          name: (input) => input.name,
          value: (input) => input.value,
          defaultValue: (input) => input.defaultValue,
          disabled: (input) => {
            var _a;
            return (_a = input.disabled) != null ? _a : false;
          },
          reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
          checkValidity: (input) => typeof input.checkValidity === "function" ? input.checkValidity() : true,
          setValue: (input, value) => input.value = value,
          assumeInteractionOn: ["sl-input"]
        }, options);
      }
      hostConnected() {
        const form = this.options.form(this.host);
        if (form) {
          this.attachForm(form);
        }
        interactions.set(this.host, []);
        this.options.assumeInteractionOn.forEach((event) => {
          this.host.addEventListener(event, this.handleInteraction);
        });
      }
      hostDisconnected() {
        this.detachForm();
        interactions.delete(this.host);
        this.options.assumeInteractionOn.forEach((event) => {
          this.host.removeEventListener(event, this.handleInteraction);
        });
      }
      hostUpdated() {
        const form = this.options.form(this.host);
        if (!form) {
          this.detachForm();
        }
        if (form && this.form !== form) {
          this.detachForm();
          this.attachForm(form);
        }
        if (this.host.hasUpdated) {
          this.setValidity(this.host.validity.valid);
        }
      }
      attachForm(form) {
        if (form) {
          this.form = form;
          if (formCollections.has(this.form)) {
            formCollections.get(this.form).add(this.host);
          } else {
            formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
          }
          this.form.addEventListener("formdata", this.handleFormData);
          this.form.addEventListener("submit", this.handleFormSubmit);
          this.form.addEventListener("reset", this.handleFormReset);
          if (!reportValidityOverloads.has(this.form)) {
            reportValidityOverloads.set(this.form, this.form.reportValidity);
            this.form.reportValidity = () => this.reportFormValidity();
          }
          if (!checkValidityOverloads.has(this.form)) {
            checkValidityOverloads.set(this.form, this.form.checkValidity);
            this.form.checkValidity = () => this.checkFormValidity();
          }
        } else {
          this.form = void 0;
        }
      }
      detachForm() {
        if (!this.form) return;
        const formCollection = formCollections.get(this.form);
        if (!formCollection) {
          return;
        }
        formCollection.delete(this.host);
        if (formCollection.size <= 0) {
          this.form.removeEventListener("formdata", this.handleFormData);
          this.form.removeEventListener("submit", this.handleFormSubmit);
          this.form.removeEventListener("reset", this.handleFormReset);
          if (reportValidityOverloads.has(this.form)) {
            this.form.reportValidity = reportValidityOverloads.get(this.form);
            reportValidityOverloads.delete(this.form);
          }
          if (checkValidityOverloads.has(this.form)) {
            this.form.checkValidity = checkValidityOverloads.get(this.form);
            checkValidityOverloads.delete(this.form);
          }
          this.form = void 0;
        }
      }
      setUserInteracted(el, hasInteracted) {
        if (hasInteracted) {
          userInteractedControls.add(el);
        } else {
          userInteractedControls.delete(el);
        }
        el.requestUpdate();
      }
      doAction(type, submitter) {
        if (this.form) {
          const button = document.createElement("button");
          button.type = type;
          button.style.position = "absolute";
          button.style.width = "0";
          button.style.height = "0";
          button.style.clipPath = "inset(50%)";
          button.style.overflow = "hidden";
          button.style.whiteSpace = "nowrap";
          if (submitter) {
            button.name = submitter.name;
            button.value = submitter.value;
            ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
              if (submitter.hasAttribute(attr)) {
                button.setAttribute(attr, submitter.getAttribute(attr));
              }
            });
          }
          this.form.append(button);
          button.click();
          button.remove();
        }
      }
      /** Returns the associated `<form>` element, if one exists. */
      getForm() {
        var _a;
        return (_a = this.form) != null ? _a : null;
      }
      /** Resets the form, restoring all the control to their default value */
      reset(submitter) {
        this.doAction("reset", submitter);
      }
      /** Submits the form, triggering validation and form data injection. */
      submit(submitter) {
        this.doAction("submit", submitter);
      }
      /**
       * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
       * the host element immediately, i.e. before Lit updates the component in the next update.
       */
      setValidity(isValid) {
        const host = this.host;
        const hasInteracted = Boolean(userInteractedControls.has(host));
        const required = Boolean(host.required);
        host.toggleAttribute("data-required", required);
        host.toggleAttribute("data-optional", !required);
        host.toggleAttribute("data-invalid", !isValid);
        host.toggleAttribute("data-valid", isValid);
        host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
        host.toggleAttribute("data-user-valid", isValid && hasInteracted);
      }
      /**
       * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
       * that affects constraint validation changes so the component receives the correct validity states.
       */
      updateValidity() {
        const host = this.host;
        this.setValidity(host.validity.valid);
      }
      /**
       * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
       * If the `sl-invalid` event will be cancelled then the original `invalid`
       * event (which may have been passed as argument) will also be cancelled.
       * If no original `invalid` event has been passed then the `sl-invalid`
       * event will be cancelled before being dispatched.
       */
      emitInvalidEvent(originalInvalidEvent) {
        const slInvalidEvent = new CustomEvent("sl-invalid", {
          bubbles: false,
          composed: false,
          cancelable: true,
          detail: {}
        });
        if (!originalInvalidEvent) {
          slInvalidEvent.preventDefault();
        }
        if (!this.host.dispatchEvent(slInvalidEvent)) {
          originalInvalidEvent == null ? void 0 : originalInvalidEvent.preventDefault();
        }
      }
    };
    validValidityState = Object.freeze({
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: true,
      valueMissing: false
    });
    valueMissingValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
      valid: false,
      valueMissing: true
    }));
    customErrorValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
      valid: false,
      customError: true
    }));
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAQXLKQ7.js
var button_styles_default;
var init_chunk_MAQXLKQ7 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAQXLKQ7.js"() {
    init_lit();
    button_styles_default = i`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js
var HasSlotController;
var init_chunk_NYIIDP5N = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js"() {
    HasSlotController = class {
      constructor(host, ...slotNames) {
        this.slotNames = [];
        this.handleSlotChange = (event) => {
          const slot = event.target;
          if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
            this.host.requestUpdate();
          }
        };
        (this.host = host).addController(this);
        this.slotNames = slotNames;
      }
      hasDefaultSlot() {
        return [...this.host.childNodes].some((node) => {
          if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
            return true;
          }
          if (node.nodeType === node.ELEMENT_NODE) {
            const el = node;
            const tagName = el.tagName.toLowerCase();
            if (tagName === "sl-visually-hidden") {
              return false;
            }
            if (!el.hasAttribute("slot")) {
              return true;
            }
          }
          return false;
        });
      }
      hasNamedSlot(name) {
        return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
      }
      test(slotName) {
        return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
      }
      hostConnected() {
        this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
      }
      hostDisconnected() {
        this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
      }
    };
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js
function setBasePath(path) {
  basePath = path;
}
function getBasePath(subpath = "") {
  if (!basePath) {
    const scripts = [...document.getElementsByTagName("script")];
    const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
    if (configScript) {
      setBasePath(configScript.getAttribute("data-shoelace"));
    } else {
      const fallbackScript = scripts.find((s4) => {
        return /shoelace(\.min)?\.js($|\?)/.test(s4.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(s4.src);
      });
      let path = "";
      if (fallbackScript) {
        path = fallbackScript.getAttribute("src");
      }
      setBasePath(path.split("/").slice(0, -1).join("/"));
    }
  }
  return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
}
var basePath;
var init_chunk_3Y6SB6QS = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js"() {
    basePath = "";
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js
var library, library_default_default;
var init_chunk_P7ZG6EMR = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js"() {
    init_chunk_3Y6SB6QS();
    library = {
      name: "default",
      resolver: (name) => getBasePath(`assets/icons/${name}.svg`)
    };
    library_default_default = library;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js
var icons, systemLibrary, library_system_default;
var init_chunk_3TFKS637 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js"() {
    icons = {
      caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
      check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
      "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
      "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
      "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
      copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
      eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
      "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
      eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
      "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
      indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
      "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
      "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
      "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
      radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
      "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
      "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
      "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
    };
    systemLibrary = {
      name: "system",
      resolver: (name) => {
        if (name in icons) {
          return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
        }
        return "";
      }
    };
    library_system_default = systemLibrary;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}
var registry, watchedIcons;
var init_chunk_ZL53POKZ = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js"() {
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    registry = [library_default_default, library_system_default];
    watchedIcons = [];
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QLXRCYS4.js
var icon_styles_default;
var init_chunk_QLXRCYS4 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QLXRCYS4.js"() {
    init_lit();
    icon_styles_default = i`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GMYPQTFK.js
function watch(propertyName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update: update2 } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
    proto.update = function(changedProps) {
      watchedProperties.forEach((property) => {
        const key = property;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
      });
      update2.call(this, changedProps);
    };
  };
}
var init_chunk_GMYPQTFK = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GMYPQTFK.js"() {
    init_chunk_KAW7D32O();
  }
});

// node_modules/lit-html/directive-helpers.js
var t4, l3, r6, m2, p3;
var init_directive_helpers = __esm({
  "node_modules/lit-html/directive-helpers.js"() {
    init_lit_html();
    ({ I: t4 } = j);
    l3 = (o10, t6) => void 0 === t6 ? void 0 !== o10?._$litType$ : o10?._$litType$ === t6;
    r6 = (o10) => void 0 === o10.strings;
    m2 = {};
    p3 = (o10, t6 = m2) => o10._$AH = t6;
  }
});

// node_modules/lit/directive-helpers.js
var init_directive_helpers2 = __esm({
  "node_modules/lit/directive-helpers.js"() {
    init_directive_helpers();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.YHLNUJ7P.js
var CACHEABLE_ERROR, RETRYABLE_ERROR, parser, iconCache, SlIcon;
var init_chunk_YHLNUJ7P = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.YHLNUJ7P.js"() {
    init_chunk_ZL53POKZ();
    init_chunk_QLXRCYS4();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_lit();
    init_directive_helpers2();
    init_decorators();
    CACHEABLE_ERROR = /* @__PURE__ */ Symbol();
    RETRYABLE_ERROR = /* @__PURE__ */ Symbol();
    iconCache = /* @__PURE__ */ new Map();
    SlIcon = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.initialRender = false;
        this.svg = null;
        this.label = "";
        this.library = "default";
      }
      /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
      async resolveIcon(url, library2) {
        var _a;
        let fileData;
        if (library2 == null ? void 0 : library2.spriteSheet) {
          this.svg = b2`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
          return this.svg;
        }
        try {
          fileData = await fetch(url, { mode: "cors" });
          if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
        } catch (e10) {
          return RETRYABLE_ERROR;
        }
        try {
          const div = document.createElement("div");
          div.innerHTML = await fileData.text();
          const svg = div.firstElementChild;
          if (((_a = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a.toLowerCase()) !== "svg") return CACHEABLE_ERROR;
          if (!parser) parser = new DOMParser();
          const doc = parser.parseFromString(svg.outerHTML, "text/html");
          const svgEl = doc.body.querySelector("svg");
          if (!svgEl) return CACHEABLE_ERROR;
          svgEl.part.add("svg");
          return document.adoptNode(svgEl);
        } catch (e10) {
          return CACHEABLE_ERROR;
        }
      }
      connectedCallback() {
        super.connectedCallback();
        watchIcon(this);
      }
      firstUpdated() {
        this.initialRender = true;
        this.setIcon();
      }
      disconnectedCallback() {
        super.disconnectedCallback();
        unwatchIcon(this);
      }
      getIconSource() {
        const library2 = getIconLibrary(this.library);
        if (this.name && library2) {
          return {
            url: library2.resolver(this.name),
            fromLibrary: true
          };
        }
        return {
          url: this.src,
          fromLibrary: false
        };
      }
      handleLabelChange() {
        const hasLabel = typeof this.label === "string" && this.label.length > 0;
        if (hasLabel) {
          this.setAttribute("role", "img");
          this.setAttribute("aria-label", this.label);
          this.removeAttribute("aria-hidden");
        } else {
          this.removeAttribute("role");
          this.removeAttribute("aria-label");
          this.setAttribute("aria-hidden", "true");
        }
      }
      async setIcon() {
        var _a;
        const { url, fromLibrary } = this.getIconSource();
        const library2 = fromLibrary ? getIconLibrary(this.library) : void 0;
        if (!url) {
          this.svg = null;
          return;
        }
        let iconResolver = iconCache.get(url);
        if (!iconResolver) {
          iconResolver = this.resolveIcon(url, library2);
          iconCache.set(url, iconResolver);
        }
        if (!this.initialRender) {
          return;
        }
        const svg = await iconResolver;
        if (svg === RETRYABLE_ERROR) {
          iconCache.delete(url);
        }
        if (url !== this.getIconSource().url) {
          return;
        }
        if (l3(svg)) {
          this.svg = svg;
          if (library2) {
            await this.updateComplete;
            const shadowSVG = this.shadowRoot.querySelector("[part='svg']");
            if (typeof library2.mutator === "function" && shadowSVG) {
              library2.mutator(shadowSVG);
            }
          }
          return;
        }
        switch (svg) {
          case RETRYABLE_ERROR:
          case CACHEABLE_ERROR:
            this.svg = null;
            this.emit("sl-error");
            break;
          default:
            this.svg = svg.cloneNode(true);
            (_a = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _a.call(library2, this.svg);
            this.emit("sl-load");
        }
      }
      render() {
        return this.svg;
      }
    };
    SlIcon.styles = [component_styles_default, icon_styles_default];
    __decorateClass([
      r5()
    ], SlIcon.prototype, "svg", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlIcon.prototype, "name", 2);
    __decorateClass([
      n4()
    ], SlIcon.prototype, "src", 2);
    __decorateClass([
      n4()
    ], SlIcon.prototype, "label", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlIcon.prototype, "library", 2);
    __decorateClass([
      watch("label")
    ], SlIcon.prototype, "handleLabelChange", 1);
    __decorateClass([
      watch(["name", "src", "library"])
    ], SlIcon.prototype, "setIcon", 1);
  }
});

// node_modules/lit-html/directive.js
var t5, e6, i5;
var init_directive = __esm({
  "node_modules/lit-html/directive.js"() {
    t5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
    e6 = (t6) => (...e10) => ({ _$litDirective$: t6, values: e10 });
    i5 = class {
      constructor(t6) {
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AT(t6, e10, i9) {
        this._$Ct = t6, this._$AM = e10, this._$Ci = i9;
      }
      _$AS(t6, e10) {
        return this.update(t6, e10);
      }
      update(t6, e10) {
        return this.render(...e10);
      }
    };
  }
});

// node_modules/lit-html/directives/class-map.js
var e7;
var init_class_map = __esm({
  "node_modules/lit-html/directives/class-map.js"() {
    init_lit_html();
    init_directive();
    e7 = e6(class extends i5 {
      constructor(t6) {
        if (super(t6), t6.type !== t5.ATTRIBUTE || "class" !== t6.name || t6.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
      }
      render(t6) {
        return " " + Object.keys(t6).filter((s4) => t6[s4]).join(" ") + " ";
      }
      update(s4, [i9]) {
        if (void 0 === this.st) {
          this.st = /* @__PURE__ */ new Set(), void 0 !== s4.strings && (this.nt = new Set(s4.strings.join(" ").split(/\s/).filter((t6) => "" !== t6)));
          for (const t6 in i9) i9[t6] && !this.nt?.has(t6) && this.st.add(t6);
          return this.render(i9);
        }
        const r8 = s4.element.classList;
        for (const t6 of this.st) t6 in i9 || (r8.remove(t6), this.st.delete(t6));
        for (const t6 in i9) {
          const s5 = !!i9[t6];
          s5 === this.st.has(t6) || this.nt?.has(t6) || (s5 ? (r8.add(t6), this.st.add(t6)) : (r8.remove(t6), this.st.delete(t6)));
        }
        return E;
      }
    });
  }
});

// node_modules/lit/directives/class-map.js
var init_class_map2 = __esm({
  "node_modules/lit/directives/class-map.js"() {
    init_class_map();
  }
});

// node_modules/lit-html/static.js
var a3, o6, i6, l4, n5, u3, c4, $2;
var init_static = __esm({
  "node_modules/lit-html/static.js"() {
    init_lit_html();
    a3 = /* @__PURE__ */ Symbol.for("");
    o6 = (t6) => {
      if (t6?.r === a3) return t6?._$litStatic$;
    };
    i6 = (t6, ...r8) => ({ _$litStatic$: r8.reduce((r9, e10, a4) => r9 + ((t7) => {
      if (void 0 !== t7._$litStatic$) return t7._$litStatic$;
      throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t7}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
    })(e10) + t6[a4 + 1], t6[0]), r: a3 });
    l4 = /* @__PURE__ */ new Map();
    n5 = (t6) => (r8, ...e10) => {
      const a4 = e10.length;
      let s4, i9;
      const n7 = [], u4 = [];
      let c5, $3 = 0, f3 = false;
      for (; $3 < a4; ) {
        for (c5 = r8[$3]; $3 < a4 && void 0 !== (i9 = e10[$3], s4 = o6(i9)); ) c5 += s4 + r8[++$3], f3 = true;
        $3 !== a4 && u4.push(i9), n7.push(c5), $3++;
      }
      if ($3 === a4 && n7.push(r8[a4]), f3) {
        const t7 = n7.join("$$lit$$");
        void 0 === (r8 = l4.get(t7)) && (n7.raw = n7, l4.set(t7, r8 = n7)), e10 = u4;
      }
      return t6(r8, ...e10);
    };
    u3 = n5(b2);
    c4 = n5(w);
    $2 = n5(T);
  }
});

// node_modules/lit/static-html.js
var init_static_html = __esm({
  "node_modules/lit/static-html.js"() {
    init_static();
  }
});

// node_modules/lit-html/directives/if-defined.js
var o7;
var init_if_defined = __esm({
  "node_modules/lit-html/directives/if-defined.js"() {
    init_lit_html();
    o7 = (o10) => o10 ?? A;
  }
});

// node_modules/lit/directives/if-defined.js
var init_if_defined2 = __esm({
  "node_modules/lit/directives/if-defined.js"() {
    init_if_defined();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SBCFYC2S.js
var SlButton;
var init_chunk_SBCFYC2S = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SBCFYC2S.js"() {
    init_chunk_36O46B5H();
    init_chunk_3RPBFEDE();
    init_chunk_MAQXLKQ7();
    init_chunk_NYIIDP5N();
    init_chunk_6CTB5ZDJ();
    init_chunk_YHLNUJ7P();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_static_html();
    init_if_defined2();
    init_decorators();
    SlButton = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.formControlController = new FormControlController(this, {
          assumeInteractionOn: ["click"]
        });
        this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
        this.localize = new LocalizeController2(this);
        this.hasFocus = false;
        this.invalid = false;
        this.title = "";
        this.variant = "default";
        this.size = "medium";
        this.caret = false;
        this.disabled = false;
        this.loading = false;
        this.outline = false;
        this.pill = false;
        this.circle = false;
        this.type = "button";
        this.name = "";
        this.value = "";
        this.href = "";
        this.rel = "noreferrer noopener";
      }
      /** Gets the validity state object */
      get validity() {
        if (this.isButton()) {
          return this.button.validity;
        }
        return validValidityState;
      }
      /** Gets the validation message */
      get validationMessage() {
        if (this.isButton()) {
          return this.button.validationMessage;
        }
        return "";
      }
      firstUpdated() {
        if (this.isButton()) {
          this.formControlController.updateValidity();
        }
      }
      handleBlur() {
        this.hasFocus = false;
        this.emit("sl-blur");
      }
      handleFocus() {
        this.hasFocus = true;
        this.emit("sl-focus");
      }
      handleClick() {
        if (this.type === "submit") {
          this.formControlController.submit(this);
        }
        if (this.type === "reset") {
          this.formControlController.reset(this);
        }
      }
      handleInvalid(event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
      }
      isButton() {
        return this.href ? false : true;
      }
      isLink() {
        return this.href ? true : false;
      }
      handleDisabledChange() {
        if (this.isButton()) {
          this.formControlController.setValidity(this.disabled);
        }
      }
      /** Simulates a click on the button. */
      click() {
        this.button.click();
      }
      /** Sets focus on the button. */
      focus(options) {
        this.button.focus(options);
      }
      /** Removes focus from the button. */
      blur() {
        this.button.blur();
      }
      /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
      checkValidity() {
        if (this.isButton()) {
          return this.button.checkValidity();
        }
        return true;
      }
      /** Gets the associated form, if one exists. */
      getForm() {
        return this.formControlController.getForm();
      }
      /** Checks for validity and shows the browser's validation message if the control is invalid. */
      reportValidity() {
        if (this.isButton()) {
          return this.button.reportValidity();
        }
        return true;
      }
      /** Sets a custom validation message. Pass an empty string to restore validity. */
      setCustomValidity(message) {
        if (this.isButton()) {
          this.button.setCustomValidity(message);
          this.formControlController.updateValidity();
        }
      }
      render() {
        const isLink = this.isLink();
        const tag = isLink ? i6`a` : i6`button`;
        return u3`
      <${tag}
        part="base"
        class=${e7({
          button: true,
          "button--default": this.variant === "default",
          "button--primary": this.variant === "primary",
          "button--success": this.variant === "success",
          "button--neutral": this.variant === "neutral",
          "button--warning": this.variant === "warning",
          "button--danger": this.variant === "danger",
          "button--text": this.variant === "text",
          "button--small": this.size === "small",
          "button--medium": this.size === "medium",
          "button--large": this.size === "large",
          "button--caret": this.caret,
          "button--circle": this.circle,
          "button--disabled": this.disabled,
          "button--focused": this.hasFocus,
          "button--loading": this.loading,
          "button--standard": !this.outline,
          "button--outline": this.outline,
          "button--pill": this.pill,
          "button--rtl": this.localize.dir() === "rtl",
          "button--has-label": this.hasSlotController.test("[default]"),
          "button--has-prefix": this.hasSlotController.test("prefix"),
          "button--has-suffix": this.hasSlotController.test("suffix")
        })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o7(isLink ? void 0 : this.name)}
        value=${o7(isLink ? void 0 : this.value)}
        href=${o7(isLink && !this.disabled ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink ? this.rel : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? u3` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? u3`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${tag}>
    `;
      }
    };
    SlButton.styles = [component_styles_default, button_styles_default];
    SlButton.dependencies = {
      "sl-icon": SlIcon,
      "sl-spinner": SlSpinner
    };
    __decorateClass([
      e5(".button")
    ], SlButton.prototype, "button", 2);
    __decorateClass([
      r5()
    ], SlButton.prototype, "hasFocus", 2);
    __decorateClass([
      r5()
    ], SlButton.prototype, "invalid", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "title", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlButton.prototype, "variant", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlButton.prototype, "size", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlButton.prototype, "caret", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlButton.prototype, "disabled", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlButton.prototype, "loading", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlButton.prototype, "outline", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlButton.prototype, "pill", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlButton.prototype, "circle", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "type", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "name", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "value", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "href", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "target", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "rel", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "download", 2);
    __decorateClass([
      n4()
    ], SlButton.prototype, "form", 2);
    __decorateClass([
      n4({ attribute: "formaction" })
    ], SlButton.prototype, "formAction", 2);
    __decorateClass([
      n4({ attribute: "formenctype" })
    ], SlButton.prototype, "formEnctype", 2);
    __decorateClass([
      n4({ attribute: "formmethod" })
    ], SlButton.prototype, "formMethod", 2);
    __decorateClass([
      n4({ attribute: "formnovalidate", type: Boolean })
    ], SlButton.prototype, "formNoValidate", 2);
    __decorateClass([
      n4({ attribute: "formtarget" })
    ], SlButton.prototype, "formTarget", 2);
    __decorateClass([
      watch("disabled", { waitUntilFirstUpdate: true })
    ], SlButton.prototype, "handleDisabledChange", 1);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.JCXLDPQF.js
var init_chunk_JCXLDPQF = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.JCXLDPQF.js"() {
    init_chunk_SBCFYC2S();
    SlButton.define("sl-button");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/button/button.js
var init_button = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/button/button.js"() {
    init_chunk_JCXLDPQF();
    init_chunk_SBCFYC2S();
    init_chunk_36O46B5H();
    init_chunk_7DUCI5S4();
    init_chunk_3RPBFEDE();
    init_chunk_MAQXLKQ7();
    init_chunk_NYIIDP5N();
    init_chunk_6CTB5ZDJ();
    init_chunk_7BTDLTNI();
    init_chunk_YHLNUJ7P();
    init_chunk_ZL53POKZ();
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    init_chunk_QLXRCYS4();
    init_chunk_3Y6SB6QS();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2OUC42YY.js
var button_group_styles_default;
var init_chunk_2OUC42YY = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2OUC42YY.js"() {
    init_lit();
    button_group_styles_default = i`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.A36OXQYR.js
function findButton(el) {
  var _a;
  const selector = "sl-button, sl-radio-button";
  return (_a = el.closest(selector)) != null ? _a : el.querySelector(selector);
}
var SlButtonGroup;
var init_chunk_A36OXQYR = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.A36OXQYR.js"() {
    init_chunk_2OUC42YY();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_lit();
    init_decorators();
    SlButtonGroup = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.disableRole = false;
        this.label = "";
      }
      handleFocus(event) {
        const button = findButton(event.target);
        button == null ? void 0 : button.toggleAttribute("data-sl-button-group__button--focus", true);
      }
      handleBlur(event) {
        const button = findButton(event.target);
        button == null ? void 0 : button.toggleAttribute("data-sl-button-group__button--focus", false);
      }
      handleMouseOver(event) {
        const button = findButton(event.target);
        button == null ? void 0 : button.toggleAttribute("data-sl-button-group__button--hover", true);
      }
      handleMouseOut(event) {
        const button = findButton(event.target);
        button == null ? void 0 : button.toggleAttribute("data-sl-button-group__button--hover", false);
      }
      handleSlotChange() {
        const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
        slottedElements.forEach((el) => {
          const index = slottedElements.indexOf(el);
          const button = findButton(el);
          if (button) {
            button.toggleAttribute("data-sl-button-group__button", true);
            button.toggleAttribute("data-sl-button-group__button--first", index === 0);
            button.toggleAttribute("data-sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
            button.toggleAttribute("data-sl-button-group__button--last", index === slottedElements.length - 1);
            button.toggleAttribute(
              "data-sl-button-group__button--radio",
              button.tagName.toLowerCase() === "sl-radio-button"
            );
          }
        });
      }
      render() {
        return b2`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
      }
    };
    SlButtonGroup.styles = [component_styles_default, button_group_styles_default];
    __decorateClass([
      e5("slot")
    ], SlButtonGroup.prototype, "defaultSlot", 2);
    __decorateClass([
      r5()
    ], SlButtonGroup.prototype, "disableRole", 2);
    __decorateClass([
      n4()
    ], SlButtonGroup.prototype, "label", 2);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DQT3C4BS.js
var init_chunk_DQT3C4BS = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DQT3C4BS.js"() {
    init_chunk_A36OXQYR();
    SlButtonGroup.define("sl-button-group");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/button-group/button-group.js
var init_button_group = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/button-group/button-group.js"() {
    init_chunk_DQT3C4BS();
    init_chunk_A36OXQYR();
    init_chunk_2OUC42YY();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V2OL7VMD.js
var tag_styles_default;
var init_chunk_V2OL7VMD = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V2OL7VMD.js"() {
    init_lit();
    tag_styles_default = i`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js
var icon_button_styles_default;
var init_chunk_6I2T3DLI = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js"() {
    init_lit();
    icon_button_styles_default = i`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7E4JTYWU.js
var SlIconButton;
var init_chunk_7E4JTYWU = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7E4JTYWU.js"() {
    init_chunk_6I2T3DLI();
    init_chunk_YHLNUJ7P();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_static_html();
    init_if_defined2();
    init_decorators();
    SlIconButton = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.hasFocus = false;
        this.label = "";
        this.disabled = false;
      }
      handleBlur() {
        this.hasFocus = false;
        this.emit("sl-blur");
      }
      handleFocus() {
        this.hasFocus = true;
        this.emit("sl-focus");
      }
      handleClick(event) {
        if (this.disabled) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
      /** Simulates a click on the icon button. */
      click() {
        this.button.click();
      }
      /** Sets focus on the icon button. */
      focus(options) {
        this.button.focus(options);
      }
      /** Removes focus from the icon button. */
      blur() {
        this.button.blur();
      }
      render() {
        const isLink = this.href ? true : false;
        const tag = isLink ? i6`a` : i6`button`;
        return u3`
      <${tag}
        part="base"
        class=${e7({
          "icon-button": true,
          "icon-button--disabled": !isLink && this.disabled,
          "icon-button--focused": this.hasFocus
        })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : "button")}
        href=${o7(isLink ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${o7(this.name)}
          library=${o7(this.library)}
          src=${o7(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
      }
    };
    SlIconButton.styles = [component_styles_default, icon_button_styles_default];
    SlIconButton.dependencies = { "sl-icon": SlIcon };
    __decorateClass([
      e5(".icon-button")
    ], SlIconButton.prototype, "button", 2);
    __decorateClass([
      r5()
    ], SlIconButton.prototype, "hasFocus", 2);
    __decorateClass([
      n4()
    ], SlIconButton.prototype, "name", 2);
    __decorateClass([
      n4()
    ], SlIconButton.prototype, "library", 2);
    __decorateClass([
      n4()
    ], SlIconButton.prototype, "src", 2);
    __decorateClass([
      n4()
    ], SlIconButton.prototype, "href", 2);
    __decorateClass([
      n4()
    ], SlIconButton.prototype, "target", 2);
    __decorateClass([
      n4()
    ], SlIconButton.prototype, "download", 2);
    __decorateClass([
      n4()
    ], SlIconButton.prototype, "label", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlIconButton.prototype, "disabled", 2);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6R4LM7O6.js
var SlTag;
var init_chunk_6R4LM7O6 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6R4LM7O6.js"() {
    init_chunk_V2OL7VMD();
    init_chunk_7E4JTYWU();
    init_chunk_6CTB5ZDJ();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_decorators();
    SlTag = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.localize = new LocalizeController2(this);
        this.variant = "neutral";
        this.size = "medium";
        this.pill = false;
        this.removable = false;
      }
      handleRemoveClick() {
        this.emit("sl-remove");
      }
      render() {
        return b2`
      <span
        part="base"
        class=${e7({
          tag: true,
          // Types
          "tag--primary": this.variant === "primary",
          "tag--success": this.variant === "success",
          "tag--neutral": this.variant === "neutral",
          "tag--warning": this.variant === "warning",
          "tag--danger": this.variant === "danger",
          "tag--text": this.variant === "text",
          // Sizes
          "tag--small": this.size === "small",
          "tag--medium": this.size === "medium",
          "tag--large": this.size === "large",
          // Modifiers
          "tag--pill": this.pill,
          "tag--removable": this.removable
        })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable ? b2`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </span>
    `;
      }
    };
    SlTag.styles = [component_styles_default, tag_styles_default];
    SlTag.dependencies = { "sl-icon-button": SlIconButton };
    __decorateClass([
      n4({ reflect: true })
    ], SlTag.prototype, "variant", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlTag.prototype, "size", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlTag.prototype, "pill", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlTag.prototype, "removable", 2);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CGWZTF5.js
var init_chunk_6CGWZTF5 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CGWZTF5.js"() {
    init_chunk_6R4LM7O6();
    SlTag.define("sl-tag");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/tag/tag.js
var init_tag = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/tag/tag.js"() {
    init_chunk_6CGWZTF5();
    init_chunk_6R4LM7O6();
    init_chunk_V2OL7VMD();
    init_chunk_7E4JTYWU();
    init_chunk_6I2T3DLI();
    init_chunk_6CTB5ZDJ();
    init_chunk_7BTDLTNI();
    init_chunk_YHLNUJ7P();
    init_chunk_ZL53POKZ();
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    init_chunk_QLXRCYS4();
    init_chunk_3Y6SB6QS();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FKMWLPHV.js
var radio_styles_default;
var init_chunk_FKMWLPHV = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FKMWLPHV.js"() {
    init_lit();
    radio_styles_default = i`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZSG32LO3.js
var SlRadio;
var init_chunk_ZSG32LO3 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZSG32LO3.js"() {
    init_chunk_FKMWLPHV();
    init_chunk_YHLNUJ7P();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_decorators();
    SlRadio = class extends ShoelaceElement {
      constructor() {
        super();
        this.checked = false;
        this.hasFocus = false;
        this.size = "medium";
        this.disabled = false;
        this.handleBlur = () => {
          this.hasFocus = false;
          this.emit("sl-blur");
        };
        this.handleClick = () => {
          if (!this.disabled) {
            this.checked = true;
          }
        };
        this.handleFocus = () => {
          this.hasFocus = true;
          this.emit("sl-focus");
        };
        this.addEventListener("blur", this.handleBlur);
        this.addEventListener("click", this.handleClick);
        this.addEventListener("focus", this.handleFocus);
      }
      connectedCallback() {
        super.connectedCallback();
        this.setInitialAttributes();
      }
      setInitialAttributes() {
        this.setAttribute("role", "radio");
        this.setAttribute("tabindex", "-1");
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
      }
      handleCheckedChange() {
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
        this.setAttribute("tabindex", this.checked ? "0" : "-1");
      }
      handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
      }
      render() {
        return b2`
      <span
        part="base"
        class=${e7({
          radio: true,
          "radio--checked": this.checked,
          "radio--disabled": this.disabled,
          "radio--focused": this.hasFocus,
          "radio--small": this.size === "small",
          "radio--medium": this.size === "medium",
          "radio--large": this.size === "large"
        })}
      >
        <span part="${`control${this.checked ? " control--checked" : ""}`}" class="radio__control">
          ${this.checked ? b2` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> ` : ""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `;
      }
    };
    SlRadio.styles = [component_styles_default, radio_styles_default];
    SlRadio.dependencies = { "sl-icon": SlIcon };
    __decorateClass([
      r5()
    ], SlRadio.prototype, "checked", 2);
    __decorateClass([
      r5()
    ], SlRadio.prototype, "hasFocus", 2);
    __decorateClass([
      n4()
    ], SlRadio.prototype, "value", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlRadio.prototype, "size", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlRadio.prototype, "disabled", 2);
    __decorateClass([
      watch("checked")
    ], SlRadio.prototype, "handleCheckedChange", 1);
    __decorateClass([
      watch("disabled", { waitUntilFirstUpdate: true })
    ], SlRadio.prototype, "handleDisabledChange", 1);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MSKEYBDI.js
var init_chunk_MSKEYBDI = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MSKEYBDI.js"() {
    init_chunk_ZSG32LO3();
    SlRadio.define("sl-radio");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/radio/radio.js
var init_radio = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/radio/radio.js"() {
    init_chunk_MSKEYBDI();
    init_chunk_ZSG32LO3();
    init_chunk_FKMWLPHV();
    init_chunk_YHLNUJ7P();
    init_chunk_ZL53POKZ();
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    init_chunk_QLXRCYS4();
    init_chunk_3Y6SB6QS();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B63YXDJO.js
var radio_group_styles_default;
var init_chunk_B63YXDJO = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B63YXDJO.js"() {
    init_lit();
    radio_group_styles_default = i`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SI4ACBFK.js
var form_control_styles_default;
var init_chunk_SI4ACBFK = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SI4ACBFK.js"() {
    init_lit();
    form_control_styles_default = i`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZJNIZFRS.js
var SlRadioGroup;
var init_chunk_ZJNIZFRS = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZJNIZFRS.js"() {
    init_chunk_B63YXDJO();
    init_chunk_SI4ACBFK();
    init_chunk_A36OXQYR();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_decorators();
    SlRadioGroup = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.formControlController = new FormControlController(this);
        this.hasSlotController = new HasSlotController(this, "help-text", "label");
        this.customValidityMessage = "";
        this.hasButtonGroup = false;
        this.errorMessage = "";
        this.defaultValue = "";
        this.label = "";
        this.helpText = "";
        this.name = "option";
        this.value = "";
        this.size = "medium";
        this.form = "";
        this.required = false;
      }
      /** Gets the validity state object */
      get validity() {
        const isRequiredAndEmpty = this.required && !this.value;
        const hasCustomValidityMessage = this.customValidityMessage !== "";
        if (hasCustomValidityMessage) {
          return customErrorValidityState;
        } else if (isRequiredAndEmpty) {
          return valueMissingValidityState;
        }
        return validValidityState;
      }
      /** Gets the validation message */
      get validationMessage() {
        const isRequiredAndEmpty = this.required && !this.value;
        const hasCustomValidityMessage = this.customValidityMessage !== "";
        if (hasCustomValidityMessage) {
          return this.customValidityMessage;
        } else if (isRequiredAndEmpty) {
          return this.validationInput.validationMessage;
        }
        return "";
      }
      connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
      }
      firstUpdated() {
        this.formControlController.updateValidity();
      }
      getAllRadios() {
        return [...this.querySelectorAll("sl-radio, sl-radio-button")];
      }
      handleRadioClick(event) {
        const target = event.target.closest("sl-radio, sl-radio-button");
        const radios = this.getAllRadios();
        const oldValue = this.value;
        if (!target || target.disabled) {
          return;
        }
        this.value = target.value;
        radios.forEach((radio) => radio.checked = radio === target);
        if (this.value !== oldValue) {
          this.emit("sl-change");
          this.emit("sl-input");
        }
      }
      handleKeyDown(event) {
        var _a;
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
          return;
        }
        const radios = this.getAllRadios().filter((radio) => !radio.disabled);
        const checkedRadio = (_a = radios.find((radio) => radio.checked)) != null ? _a : radios[0];
        const incr = event.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
        const oldValue = this.value;
        let index = radios.indexOf(checkedRadio) + incr;
        if (index < 0) {
          index = radios.length - 1;
        }
        if (index > radios.length - 1) {
          index = 0;
        }
        this.getAllRadios().forEach((radio) => {
          radio.checked = false;
          if (!this.hasButtonGroup) {
            radio.setAttribute("tabindex", "-1");
          }
        });
        this.value = radios[index].value;
        radios[index].checked = true;
        if (!this.hasButtonGroup) {
          radios[index].setAttribute("tabindex", "0");
          radios[index].focus();
        } else {
          radios[index].shadowRoot.querySelector("button").focus();
        }
        if (this.value !== oldValue) {
          this.emit("sl-change");
          this.emit("sl-input");
        }
        event.preventDefault();
      }
      handleLabelClick() {
        this.focus();
      }
      handleInvalid(event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
      }
      async syncRadioElements() {
        var _a, _b;
        const radios = this.getAllRadios();
        await Promise.all(
          // Sync the checked state and size
          radios.map(async (radio) => {
            await radio.updateComplete;
            radio.checked = radio.value === this.value;
            radio.size = this.size;
          })
        );
        this.hasButtonGroup = radios.some((radio) => radio.tagName.toLowerCase() === "sl-radio-button");
        if (radios.length > 0 && !radios.some((radio) => radio.checked)) {
          if (this.hasButtonGroup) {
            const buttonRadio = (_a = radios[0].shadowRoot) == null ? void 0 : _a.querySelector("button");
            if (buttonRadio) {
              buttonRadio.setAttribute("tabindex", "0");
            }
          } else {
            radios[0].setAttribute("tabindex", "0");
          }
        }
        if (this.hasButtonGroup) {
          const buttonGroup = (_b = this.shadowRoot) == null ? void 0 : _b.querySelector("sl-button-group");
          if (buttonGroup) {
            buttonGroup.disableRole = true;
          }
        }
      }
      syncRadios() {
        if (customElements.get("sl-radio") && customElements.get("sl-radio-button")) {
          this.syncRadioElements();
          return;
        }
        if (customElements.get("sl-radio")) {
          this.syncRadioElements();
        } else {
          customElements.whenDefined("sl-radio").then(() => this.syncRadios());
        }
        if (customElements.get("sl-radio-button")) {
          this.syncRadioElements();
        } else {
          customElements.whenDefined("sl-radio-button").then(() => this.syncRadios());
        }
      }
      updateCheckedRadio() {
        const radios = this.getAllRadios();
        radios.forEach((radio) => radio.checked = radio.value === this.value);
        this.formControlController.setValidity(this.validity.valid);
      }
      handleSizeChange() {
        this.syncRadios();
      }
      handleValueChange() {
        if (this.hasUpdated) {
          this.updateCheckedRadio();
        }
      }
      /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
      checkValidity() {
        const isRequiredAndEmpty = this.required && !this.value;
        const hasCustomValidityMessage = this.customValidityMessage !== "";
        if (isRequiredAndEmpty || hasCustomValidityMessage) {
          this.formControlController.emitInvalidEvent();
          return false;
        }
        return true;
      }
      /** Gets the associated form, if one exists. */
      getForm() {
        return this.formControlController.getForm();
      }
      /** Checks for validity and shows the browser's validation message if the control is invalid. */
      reportValidity() {
        const isValid = this.validity.valid;
        this.errorMessage = this.customValidityMessage || isValid ? "" : this.validationInput.validationMessage;
        this.formControlController.setValidity(isValid);
        this.validationInput.hidden = true;
        clearTimeout(this.validationTimeout);
        if (!isValid) {
          this.validationInput.hidden = false;
          this.validationInput.reportValidity();
          this.validationTimeout = setTimeout(() => this.validationInput.hidden = true, 1e4);
        }
        return isValid;
      }
      /** Sets a custom validation message. Pass an empty string to restore validity. */
      setCustomValidity(message = "") {
        this.customValidityMessage = message;
        this.errorMessage = message;
        this.validationInput.setCustomValidity(message);
        this.formControlController.updateValidity();
      }
      /** Sets focus on the radio-group. */
      focus(options) {
        const radios = this.getAllRadios();
        const checked = radios.find((radio) => radio.checked);
        const firstEnabledRadio = radios.find((radio) => !radio.disabled);
        const radioToFocus = checked || firstEnabledRadio;
        if (radioToFocus) {
          radioToFocus.focus(options);
        }
      }
      render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHelpTextSlot = this.hasSlotController.test("help-text");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
        const defaultSlot = b2`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;
        return b2`
      <fieldset
        part="form-control"
        class=${e7({
          "form-control": true,
          "form-control--small": this.size === "small",
          "form-control--medium": this.size === "medium",
          "form-control--large": this.size === "large",
          "form-control--radio-group": true,
          "form-control--has-label": hasLabel,
          "form-control--has-help-text": hasHelpText
        })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup ? b2`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${defaultSlot}
                </sl-button-group>
              ` : defaultSlot}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `;
      }
    };
    SlRadioGroup.styles = [component_styles_default, form_control_styles_default, radio_group_styles_default];
    SlRadioGroup.dependencies = { "sl-button-group": SlButtonGroup };
    __decorateClass([
      e5("slot:not([name])")
    ], SlRadioGroup.prototype, "defaultSlot", 2);
    __decorateClass([
      e5(".radio-group__validation-input")
    ], SlRadioGroup.prototype, "validationInput", 2);
    __decorateClass([
      r5()
    ], SlRadioGroup.prototype, "hasButtonGroup", 2);
    __decorateClass([
      r5()
    ], SlRadioGroup.prototype, "errorMessage", 2);
    __decorateClass([
      r5()
    ], SlRadioGroup.prototype, "defaultValue", 2);
    __decorateClass([
      n4()
    ], SlRadioGroup.prototype, "label", 2);
    __decorateClass([
      n4({ attribute: "help-text" })
    ], SlRadioGroup.prototype, "helpText", 2);
    __decorateClass([
      n4()
    ], SlRadioGroup.prototype, "name", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlRadioGroup.prototype, "value", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlRadioGroup.prototype, "size", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlRadioGroup.prototype, "form", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlRadioGroup.prototype, "required", 2);
    __decorateClass([
      watch("size", { waitUntilFirstUpdate: true })
    ], SlRadioGroup.prototype, "handleSizeChange", 1);
    __decorateClass([
      watch("value")
    ], SlRadioGroup.prototype, "handleValueChange", 1);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2PCBEMQZ.js
var init_chunk_2PCBEMQZ = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2PCBEMQZ.js"() {
    init_chunk_ZJNIZFRS();
    SlRadioGroup.define("sl-radio-group");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/radio-group/radio-group.js
var init_radio_group = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/radio-group/radio-group.js"() {
    init_chunk_2PCBEMQZ();
    init_chunk_ZJNIZFRS();
    init_chunk_B63YXDJO();
    init_chunk_SI4ACBFK();
    init_chunk_A36OXQYR();
    init_chunk_2OUC42YY();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.J7PLVEQM.js
var details_styles_default;
var init_chunk_J7PLVEQM = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.J7PLVEQM.js"() {
    init_lit();
    details_styles_default = i`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.K7JGTRV7.js
function ensureAnimation(animation) {
  return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
}
function getLogicalAnimation(animation, dir) {
  if (dir.toLowerCase() === "rtl") {
    return {
      keyframes: animation.rtlKeyframes || animation.keyframes,
      options: animation.options
    };
  }
  return animation;
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName, options) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation == null ? void 0 : customAnimation[animationName]) {
    return getLogicalAnimation(customAnimation[animationName], options.dir);
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return getLogicalAnimation(defaultAnimation, options.dir);
  }
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}
var defaultAnimationRegistry, customAnimationRegistry;
var init_chunk_K7JGTRV7 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.K7JGTRV7.js"() {
    init_chunk_KAW7D32O();
    defaultAnimationRegistry = /* @__PURE__ */ new Map();
    customAnimationRegistry = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}
var init_chunk_B4BZKR24 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js"() {
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AJ3ENQ5C.js
function animateTo(el, keyframes, options) {
  return new Promise((resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
function stopAnimations(el) {
  return Promise.all(
    el.getAnimations().map((animation) => {
      return new Promise((resolve) => {
        animation.cancel();
        requestAnimationFrame(resolve);
      });
    })
  );
}
function shimKeyframesHeightAuto(keyframes, calculatedHeight) {
  return keyframes.map((keyframe) => __spreadProps(__spreadValues({}, keyframe), {
    height: keyframe.height === "auto" ? `${calculatedHeight}px` : keyframe.height
  }));
}
var init_chunk_AJ3ENQ5C = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AJ3ENQ5C.js"() {
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FBTAZKYW.js
var SlDetails;
var init_chunk_FBTAZKYW = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FBTAZKYW.js"() {
    init_chunk_J7PLVEQM();
    init_chunk_K7JGTRV7();
    init_chunk_B4BZKR24();
    init_chunk_AJ3ENQ5C();
    init_chunk_6CTB5ZDJ();
    init_chunk_YHLNUJ7P();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_decorators();
    SlDetails = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.localize = new LocalizeController2(this);
        this.open = false;
        this.disabled = false;
      }
      firstUpdated() {
        this.body.style.height = this.open ? "auto" : "0";
        if (this.open) {
          this.details.open = true;
        }
        this.detailsObserver = new MutationObserver((changes) => {
          for (const change of changes) {
            if (change.type === "attributes" && change.attributeName === "open") {
              if (this.details.open) {
                this.show();
              } else {
                this.hide();
              }
            }
          }
        });
        this.detailsObserver.observe(this.details, { attributes: true });
      }
      disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this.detailsObserver) == null ? void 0 : _a.disconnect();
      }
      handleSummaryClick(event) {
        event.preventDefault();
        if (!this.disabled) {
          if (this.open) {
            this.hide();
          } else {
            this.show();
          }
          this.header.focus();
        }
      }
      handleSummaryKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (this.open) {
            this.hide();
          } else {
            this.show();
          }
        }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          this.hide();
        }
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          this.show();
        }
      }
      async handleOpenChange() {
        if (this.open) {
          this.details.open = true;
          const slShow = this.emit("sl-show", { cancelable: true });
          if (slShow.defaultPrevented) {
            this.open = false;
            this.details.open = false;
            return;
          }
          await stopAnimations(this.body);
          const { keyframes, options } = getAnimation(this, "details.show", { dir: this.localize.dir() });
          await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
          this.body.style.height = "auto";
          this.emit("sl-after-show");
        } else {
          const slHide = this.emit("sl-hide", { cancelable: true });
          if (slHide.defaultPrevented) {
            this.details.open = true;
            this.open = true;
            return;
          }
          await stopAnimations(this.body);
          const { keyframes, options } = getAnimation(this, "details.hide", { dir: this.localize.dir() });
          await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
          this.body.style.height = "auto";
          this.details.open = false;
          this.emit("sl-after-hide");
        }
      }
      /** Shows the details. */
      async show() {
        if (this.open || this.disabled) {
          return void 0;
        }
        this.open = true;
        return waitForEvent(this, "sl-after-show");
      }
      /** Hides the details */
      async hide() {
        if (!this.open || this.disabled) {
          return void 0;
        }
        this.open = false;
        return waitForEvent(this, "sl-after-hide");
      }
      render() {
        const isRtl = this.localize.dir() === "rtl";
        return b2`
      <details
        part="base"
        class=${e7({
          details: true,
          "details--open": this.open,
          "details--disabled": this.disabled,
          "details--rtl": isRtl
        })}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="content"
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${isRtl ? "chevron-left" : "chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${isRtl ? "chevron-left" : "chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `;
      }
    };
    SlDetails.styles = [component_styles_default, details_styles_default];
    SlDetails.dependencies = {
      "sl-icon": SlIcon
    };
    __decorateClass([
      e5(".details")
    ], SlDetails.prototype, "details", 2);
    __decorateClass([
      e5(".details__header")
    ], SlDetails.prototype, "header", 2);
    __decorateClass([
      e5(".details__body")
    ], SlDetails.prototype, "body", 2);
    __decorateClass([
      e5(".details__expand-icon-slot")
    ], SlDetails.prototype, "expandIconSlot", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlDetails.prototype, "open", 2);
    __decorateClass([
      n4()
    ], SlDetails.prototype, "summary", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlDetails.prototype, "disabled", 2);
    __decorateClass([
      watch("open", { waitUntilFirstUpdate: true })
    ], SlDetails.prototype, "handleOpenChange", 1);
    setDefaultAnimation("details.show", {
      keyframes: [
        { height: "0", opacity: "0" },
        { height: "auto", opacity: "1" }
      ],
      options: { duration: 250, easing: "linear" }
    });
    setDefaultAnimation("details.hide", {
      keyframes: [
        { height: "auto", opacity: "1" },
        { height: "0", opacity: "0" }
      ],
      options: { duration: 250, easing: "linear" }
    });
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4MEHASAI.js
var init_chunk_4MEHASAI = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4MEHASAI.js"() {
    init_chunk_FBTAZKYW();
    SlDetails.define("sl-details");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/details/details.js
var init_details = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/details/details.js"() {
    init_chunk_4MEHASAI();
    init_chunk_FBTAZKYW();
    init_chunk_J7PLVEQM();
    init_chunk_K7JGTRV7();
    init_chunk_B4BZKR24();
    init_chunk_AJ3ENQ5C();
    init_chunk_6CTB5ZDJ();
    init_chunk_7BTDLTNI();
    init_chunk_YHLNUJ7P();
    init_chunk_ZL53POKZ();
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    init_chunk_QLXRCYS4();
    init_chunk_3Y6SB6QS();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5D6IT2SR.js
var range_styles_default;
var init_chunk_5D6IT2SR = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5D6IT2SR.js"() {
    init_lit();
    range_styles_default = i`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GI7VDIWX.js
var defaultValue;
var init_chunk_GI7VDIWX = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GI7VDIWX.js"() {
    init_lit();
    defaultValue = (propertyName = "value") => (proto, key) => {
      const ctor = proto.constructor;
      const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
      ctor.prototype.attributeChangedCallback = function(name, old, value) {
        var _a;
        const options = ctor.getPropertyOptions(propertyName);
        const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
        if (name === attributeName) {
          const converter = options.converter || u;
          const fromAttribute = typeof converter === "function" ? converter : (_a = converter == null ? void 0 : converter.fromAttribute) != null ? _a : u.fromAttribute;
          const newValue = fromAttribute(value, options.type);
          if (this[propertyName] !== newValue) {
            this[key] = newValue;
          }
        }
        attributeChangedCallback.call(this, name, old, value);
      };
    };
  }
});

// node_modules/lit-html/directives/live.js
var l5;
var init_live = __esm({
  "node_modules/lit-html/directives/live.js"() {
    init_lit_html();
    init_directive();
    init_directive_helpers();
    l5 = e6(class extends i5 {
      constructor(r8) {
        if (super(r8), r8.type !== t5.PROPERTY && r8.type !== t5.ATTRIBUTE && r8.type !== t5.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
        if (!r6(r8)) throw Error("`live` bindings can only contain a single expression");
      }
      render(r8) {
        return r8;
      }
      update(i9, [t6]) {
        if (t6 === E || t6 === A) return t6;
        const o10 = i9.element, l6 = i9.name;
        if (i9.type === t5.PROPERTY) {
          if (t6 === o10[l6]) return E;
        } else if (i9.type === t5.BOOLEAN_ATTRIBUTE) {
          if (!!t6 === o10.hasAttribute(l6)) return E;
        } else if (i9.type === t5.ATTRIBUTE && o10.getAttribute(l6) === t6 + "") return E;
        return p3(i9), t6;
      }
    });
  }
});

// node_modules/lit/directives/live.js
var init_live2 = __esm({
  "node_modules/lit/directives/live.js"() {
    init_live();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.HRYVEIKV.js
var SlRange;
var init_chunk_HRYVEIKV = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.HRYVEIKV.js"() {
    init_chunk_5D6IT2SR();
    init_chunk_GI7VDIWX();
    init_chunk_SI4ACBFK();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_6CTB5ZDJ();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_decorators();
    init_lit();
    init_if_defined2();
    init_live2();
    SlRange = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.formControlController = new FormControlController(this);
        this.hasSlotController = new HasSlotController(this, "help-text", "label");
        this.localize = new LocalizeController2(this);
        this.hasFocus = false;
        this.hasTooltip = false;
        this.title = "";
        this.name = "";
        this.value = 0;
        this.label = "";
        this.helpText = "";
        this.disabled = false;
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.tooltip = "top";
        this.tooltipFormatter = (value) => value.toString();
        this.form = "";
        this.defaultValue = 0;
      }
      /** Gets the validity state object */
      get validity() {
        return this.input.validity;
      }
      /** Gets the validation message */
      get validationMessage() {
        return this.input.validationMessage;
      }
      connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(() => this.syncRange());
        if (this.value < this.min) {
          this.value = this.min;
        }
        if (this.value > this.max) {
          this.value = this.max;
        }
        this.updateComplete.then(() => {
          this.syncRange();
          this.resizeObserver.observe(this.input);
        });
      }
      disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this.resizeObserver) == null ? void 0 : _a.unobserve(this.input);
      }
      handleChange() {
        this.emit("sl-change");
      }
      handleInput() {
        this.value = parseFloat(this.input.value);
        this.emit("sl-input");
        this.syncRange();
      }
      handleBlur() {
        this.hasFocus = false;
        this.hasTooltip = false;
        this.emit("sl-blur");
      }
      handleFocus() {
        this.hasFocus = true;
        this.hasTooltip = true;
        this.emit("sl-focus");
      }
      handleThumbDragStart() {
        this.hasTooltip = true;
      }
      handleThumbDragEnd() {
        this.hasTooltip = false;
      }
      syncProgress(percent) {
        this.input.style.setProperty("--percent", `${percent * 100}%`);
      }
      syncTooltip(percent) {
        if (this.output !== null) {
          const inputWidth = this.input.offsetWidth;
          const tooltipWidth = this.output.offsetWidth;
          const thumbSize = getComputedStyle(this.input).getPropertyValue("--thumb-size");
          const isRtl = this.localize.dir() === "rtl";
          const percentAsWidth = inputWidth * percent;
          if (isRtl) {
            const x2 = `${inputWidth - percentAsWidth}px + ${percent} * ${thumbSize}`;
            this.output.style.translate = `calc((${x2} - ${tooltipWidth / 2}px - ${thumbSize} / 2))`;
          } else {
            const x2 = `${percentAsWidth}px - ${percent} * ${thumbSize}`;
            this.output.style.translate = `calc(${x2} - ${tooltipWidth / 2}px + ${thumbSize} / 2)`;
          }
        }
      }
      handleValueChange() {
        this.formControlController.updateValidity();
        this.input.value = this.value.toString();
        this.value = parseFloat(this.input.value);
        this.syncRange();
      }
      handleDisabledChange() {
        this.formControlController.setValidity(this.disabled);
      }
      syncRange() {
        const percent = Math.max(0, (this.value - this.min) / (this.max - this.min));
        this.syncProgress(percent);
        if (this.tooltip !== "none" && this.hasTooltip) {
          this.updateComplete.then(() => this.syncTooltip(percent));
        }
      }
      handleInvalid(event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
      }
      /** Sets focus on the range. */
      focus(options) {
        this.input.focus(options);
      }
      /** Removes focus from the range. */
      blur() {
        this.input.blur();
      }
      /** Increments the value of the range by the value of the step attribute. */
      stepUp() {
        this.input.stepUp();
        if (this.value !== Number(this.input.value)) {
          this.value = Number(this.input.value);
        }
      }
      /** Decrements the value of the range by the value of the step attribute. */
      stepDown() {
        this.input.stepDown();
        if (this.value !== Number(this.input.value)) {
          this.value = Number(this.input.value);
        }
      }
      /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
      checkValidity() {
        return this.input.checkValidity();
      }
      /** Gets the associated form, if one exists. */
      getForm() {
        return this.formControlController.getForm();
      }
      /** Checks for validity and shows the browser's validation message if the control is invalid. */
      reportValidity() {
        return this.input.reportValidity();
      }
      /** Sets a custom validation message. Pass an empty string to restore validity. */
      setCustomValidity(message) {
        this.input.setCustomValidity(message);
        this.formControlController.updateValidity();
      }
      render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHelpTextSlot = this.hasSlotController.test("help-text");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
        return b2`
      <div
        part="form-control"
        class=${e7({
          "form-control": true,
          "form-control--medium": true,
          // range only has one size
          "form-control--has-label": hasLabel,
          "form-control--has-help-text": hasHelpText
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e7({
          range: true,
          "range--disabled": this.disabled,
          "range--focused": this.hasFocus,
          "range--rtl": this.localize.dir() === "rtl",
          "range--tooltip-visible": this.hasTooltip,
          "range--tooltip-top": this.tooltip === "top",
          "range--tooltip-bottom": this.tooltip === "bottom"
        })}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${o7(this.name)}
              ?disabled=${this.disabled}
              min=${o7(this.min)}
              max=${o7(this.max)}
              step=${o7(this.step)}
              .value=${l5(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip !== "none" && !this.disabled ? b2`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter === "function" ? this.tooltipFormatter(this.value) : this.value}
                  </output>
                ` : ""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
      }
    };
    SlRange.styles = [component_styles_default, form_control_styles_default, range_styles_default];
    __decorateClass([
      e5(".range__control")
    ], SlRange.prototype, "input", 2);
    __decorateClass([
      e5(".range__tooltip")
    ], SlRange.prototype, "output", 2);
    __decorateClass([
      r5()
    ], SlRange.prototype, "hasFocus", 2);
    __decorateClass([
      r5()
    ], SlRange.prototype, "hasTooltip", 2);
    __decorateClass([
      n4()
    ], SlRange.prototype, "title", 2);
    __decorateClass([
      n4()
    ], SlRange.prototype, "name", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlRange.prototype, "value", 2);
    __decorateClass([
      n4()
    ], SlRange.prototype, "label", 2);
    __decorateClass([
      n4({ attribute: "help-text" })
    ], SlRange.prototype, "helpText", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlRange.prototype, "disabled", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlRange.prototype, "min", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlRange.prototype, "max", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlRange.prototype, "step", 2);
    __decorateClass([
      n4()
    ], SlRange.prototype, "tooltip", 2);
    __decorateClass([
      n4({ attribute: false })
    ], SlRange.prototype, "tooltipFormatter", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlRange.prototype, "form", 2);
    __decorateClass([
      defaultValue()
    ], SlRange.prototype, "defaultValue", 2);
    __decorateClass([
      t3({ passive: true })
    ], SlRange.prototype, "handleThumbDragStart", 1);
    __decorateClass([
      watch("value", { waitUntilFirstUpdate: true })
    ], SlRange.prototype, "handleValueChange", 1);
    __decorateClass([
      watch("disabled", { waitUntilFirstUpdate: true })
    ], SlRange.prototype, "handleDisabledChange", 1);
    __decorateClass([
      watch("hasTooltip", { waitUntilFirstUpdate: true })
    ], SlRange.prototype, "syncRange", 1);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.CKH4GVK3.js
var init_chunk_CKH4GVK3 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.CKH4GVK3.js"() {
    init_chunk_HRYVEIKV();
    SlRange.define("sl-range");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/range/range.js
var init_range = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/range/range.js"() {
    init_chunk_CKH4GVK3();
    init_chunk_HRYVEIKV();
    init_chunk_5D6IT2SR();
    init_chunk_GI7VDIWX();
    init_chunk_SI4ACBFK();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_6CTB5ZDJ();
    init_chunk_7BTDLTNI();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GGT72J62.js
var input_styles_default;
var init_chunk_GGT72J62 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GGT72J62.js"() {
    init_lit();
    input_styles_default = i`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VM65NPGC.js
var SlInput;
var init_chunk_VM65NPGC = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VM65NPGC.js"() {
    init_chunk_GGT72J62();
    init_chunk_GI7VDIWX();
    init_chunk_SI4ACBFK();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_6CTB5ZDJ();
    init_chunk_YHLNUJ7P();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_if_defined2();
    init_live2();
    init_decorators();
    SlInput = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.formControlController = new FormControlController(this, {
          assumeInteractionOn: ["sl-blur", "sl-input"]
        });
        this.hasSlotController = new HasSlotController(this, "help-text", "label");
        this.localize = new LocalizeController2(this);
        this.hasFocus = false;
        this.title = "";
        this.__numberInput = Object.assign(document.createElement("input"), { type: "number" });
        this.__dateInput = Object.assign(document.createElement("input"), { type: "date" });
        this.type = "text";
        this.name = "";
        this.value = "";
        this.defaultValue = "";
        this.size = "medium";
        this.filled = false;
        this.pill = false;
        this.label = "";
        this.helpText = "";
        this.clearable = false;
        this.disabled = false;
        this.placeholder = "";
        this.readonly = false;
        this.passwordToggle = false;
        this.passwordVisible = false;
        this.noSpinButtons = false;
        this.form = "";
        this.required = false;
        this.spellcheck = true;
      }
      //
      // NOTE: We use an in-memory input for these getters/setters instead of the one in the template because the properties
      // can be set before the component is rendered.
      //
      /**
       * Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.
       */
      get valueAsDate() {
        var _a;
        this.__dateInput.type = this.type;
        this.__dateInput.value = this.value;
        return ((_a = this.input) == null ? void 0 : _a.valueAsDate) || this.__dateInput.valueAsDate;
      }
      set valueAsDate(newValue) {
        this.__dateInput.type = this.type;
        this.__dateInput.valueAsDate = newValue;
        this.value = this.__dateInput.value;
      }
      /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
      get valueAsNumber() {
        var _a;
        this.__numberInput.value = this.value;
        return ((_a = this.input) == null ? void 0 : _a.valueAsNumber) || this.__numberInput.valueAsNumber;
      }
      set valueAsNumber(newValue) {
        this.__numberInput.valueAsNumber = newValue;
        this.value = this.__numberInput.value;
      }
      /** Gets the validity state object */
      get validity() {
        return this.input.validity;
      }
      /** Gets the validation message */
      get validationMessage() {
        return this.input.validationMessage;
      }
      firstUpdated() {
        this.formControlController.updateValidity();
      }
      handleBlur() {
        this.hasFocus = false;
        this.emit("sl-blur");
      }
      handleChange() {
        this.value = this.input.value;
        this.emit("sl-change");
      }
      handleClearClick(event) {
        event.preventDefault();
        if (this.value !== "") {
          this.value = "";
          this.emit("sl-clear");
          this.emit("sl-input");
          this.emit("sl-change");
        }
        this.input.focus();
      }
      handleFocus() {
        this.hasFocus = true;
        this.emit("sl-focus");
      }
      handleInput() {
        this.value = this.input.value;
        this.formControlController.updateValidity();
        this.emit("sl-input");
      }
      handleInvalid(event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
      }
      handleKeyDown(event) {
        const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
        if (event.key === "Enter" && !hasModifier) {
          setTimeout(() => {
            if (!event.defaultPrevented && !event.isComposing) {
              this.formControlController.submit();
            }
          });
        }
      }
      handlePasswordToggle() {
        this.passwordVisible = !this.passwordVisible;
      }
      handleDisabledChange() {
        this.formControlController.setValidity(this.disabled);
      }
      handleStepChange() {
        this.input.step = String(this.step);
        this.formControlController.updateValidity();
      }
      async handleValueChange() {
        await this.updateComplete;
        this.formControlController.updateValidity();
      }
      /** Sets focus on the input. */
      focus(options) {
        this.input.focus(options);
      }
      /** Removes focus from the input. */
      blur() {
        this.input.blur();
      }
      /** Selects all the text in the input. */
      select() {
        this.input.select();
      }
      /** Sets the start and end positions of the text selection (0-based). */
      setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
        this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
      }
      /** Replaces a range of text with a new string. */
      setRangeText(replacement, start, end, selectMode = "preserve") {
        const selectionStart = start != null ? start : this.input.selectionStart;
        const selectionEnd = end != null ? end : this.input.selectionEnd;
        this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
        if (this.value !== this.input.value) {
          this.value = this.input.value;
        }
      }
      /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
      showPicker() {
        if ("showPicker" in HTMLInputElement.prototype) {
          this.input.showPicker();
        }
      }
      /** Increments the value of a numeric input type by the value of the step attribute. */
      stepUp() {
        this.input.stepUp();
        if (this.value !== this.input.value) {
          this.value = this.input.value;
        }
      }
      /** Decrements the value of a numeric input type by the value of the step attribute. */
      stepDown() {
        this.input.stepDown();
        if (this.value !== this.input.value) {
          this.value = this.input.value;
        }
      }
      /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
      checkValidity() {
        return this.input.checkValidity();
      }
      /** Gets the associated form, if one exists. */
      getForm() {
        return this.formControlController.getForm();
      }
      /** Checks for validity and shows the browser's validation message if the control is invalid. */
      reportValidity() {
        return this.input.reportValidity();
      }
      /** Sets a custom validation message. Pass an empty string to restore validity. */
      setCustomValidity(message) {
        this.input.setCustomValidity(message);
        this.formControlController.updateValidity();
      }
      render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHelpTextSlot = this.hasSlotController.test("help-text");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
        const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
        const isClearIconVisible = hasClearIcon && (typeof this.value === "number" || this.value.length > 0);
        return b2`
      <div
        part="form-control"
        class=${e7({
          "form-control": true,
          "form-control--small": this.size === "small",
          "form-control--medium": this.size === "medium",
          "form-control--large": this.size === "large",
          "form-control--has-label": hasLabel,
          "form-control--has-help-text": hasHelpText
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e7({
          input: true,
          // Sizes
          "input--small": this.size === "small",
          "input--medium": this.size === "medium",
          "input--large": this.size === "large",
          // States
          "input--pill": this.pill,
          "input--standard": !this.filled,
          "input--filled": this.filled,
          "input--disabled": this.disabled,
          "input--focused": this.hasFocus,
          "input--empty": !this.value,
          "input--no-spin-buttons": this.noSpinButtons
        })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${o7(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o7(this.placeholder)}
              minlength=${o7(this.minlength)}
              maxlength=${o7(this.maxlength)}
              min=${o7(this.min)}
              max=${o7(this.max)}
              step=${o7(this.step)}
              .value=${l5(this.value)}
              autocapitalize=${o7(this.autocapitalize)}
              autocomplete=${o7(this.autocomplete)}
              autocorrect=${o7(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${o7(this.pattern)}
              enterkeyhint=${o7(this.enterkeyhint)}
              inputmode=${o7(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${isClearIconVisible ? b2`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                ` : ""}
            ${this.passwordToggle && !this.disabled ? b2`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible ? b2`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        ` : b2`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                ` : ""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
      }
    };
    SlInput.styles = [component_styles_default, form_control_styles_default, input_styles_default];
    SlInput.dependencies = { "sl-icon": SlIcon };
    __decorateClass([
      e5(".input__control")
    ], SlInput.prototype, "input", 2);
    __decorateClass([
      r5()
    ], SlInput.prototype, "hasFocus", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "title", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlInput.prototype, "type", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "name", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "value", 2);
    __decorateClass([
      defaultValue()
    ], SlInput.prototype, "defaultValue", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlInput.prototype, "size", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlInput.prototype, "filled", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlInput.prototype, "pill", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "label", 2);
    __decorateClass([
      n4({ attribute: "help-text" })
    ], SlInput.prototype, "helpText", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlInput.prototype, "clearable", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlInput.prototype, "disabled", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "placeholder", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlInput.prototype, "readonly", 2);
    __decorateClass([
      n4({ attribute: "password-toggle", type: Boolean })
    ], SlInput.prototype, "passwordToggle", 2);
    __decorateClass([
      n4({ attribute: "password-visible", type: Boolean })
    ], SlInput.prototype, "passwordVisible", 2);
    __decorateClass([
      n4({ attribute: "no-spin-buttons", type: Boolean })
    ], SlInput.prototype, "noSpinButtons", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlInput.prototype, "form", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlInput.prototype, "required", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "pattern", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlInput.prototype, "minlength", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlInput.prototype, "maxlength", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "min", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "max", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "step", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "autocapitalize", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "autocorrect", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "autocomplete", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlInput.prototype, "autofocus", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "enterkeyhint", 2);
    __decorateClass([
      n4({
        type: Boolean,
        converter: {
          // Allow "true|false" attribute values but keep the property boolean
          fromAttribute: (value) => !value || value === "false" ? false : true,
          toAttribute: (value) => value ? "true" : "false"
        }
      })
    ], SlInput.prototype, "spellcheck", 2);
    __decorateClass([
      n4()
    ], SlInput.prototype, "inputmode", 2);
    __decorateClass([
      watch("disabled", { waitUntilFirstUpdate: true })
    ], SlInput.prototype, "handleDisabledChange", 1);
    __decorateClass([
      watch("step", { waitUntilFirstUpdate: true })
    ], SlInput.prototype, "handleStepChange", 1);
    __decorateClass([
      watch("value", { waitUntilFirstUpdate: true })
    ], SlInput.prototype, "handleValueChange", 1);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XA43ZQPC.js
var init_chunk_XA43ZQPC = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XA43ZQPC.js"() {
    init_chunk_VM65NPGC();
    SlInput.define("sl-input");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/input/input.js
var init_input = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/input/input.js"() {
    init_chunk_XA43ZQPC();
    init_chunk_VM65NPGC();
    init_chunk_GGT72J62();
    init_chunk_GI7VDIWX();
    init_chunk_SI4ACBFK();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_6CTB5ZDJ();
    init_chunk_7BTDLTNI();
    init_chunk_YHLNUJ7P();
    init_chunk_ZL53POKZ();
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    init_chunk_QLXRCYS4();
    init_chunk_3Y6SB6QS();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XNOUITPX.js
var select_styles_default;
var init_chunk_XNOUITPX = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XNOUITPX.js"() {
    init_lit();
    select_styles_default = i`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RWUUFNUL.js
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}
function scrollIntoView(element, container, direction = "vertical", behavior = "smooth") {
  const offset3 = getOffset(element, container);
  const offsetTop = offset3.top + container.scrollTop;
  const offsetLeft = offset3.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction === "horizontal" || direction === "both") {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction === "vertical" || direction === "both") {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}
var init_chunk_RWUUFNUL = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RWUUFNUL.js"() {
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3KSWVBQ5.js
var popup_styles_default;
var init_chunk_3KSWVBQ5 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3KSWVBQ5.js"() {
    init_lit();
    popup_styles_default = i`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;
  }
});

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y: y3,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y3,
    left: x2,
    right: x2 + width,
    bottom: y3 + height,
    x: x2,
    y: y3
  };
}
var min, max, round, floor, createCoords, oppositeSideMap, lrPlacement, rlPlacement, tbPlacement, btPlacement;
var init_floating_ui_utils = __esm({
  "node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"() {
    min = Math.min;
    max = Math.max;
    round = Math.round;
    floor = Math.floor;
    createCoords = (v2) => ({
      x: v2,
      y: v2
    });
    oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    lrPlacement = ["left", "right"];
    rlPlacement = ["right", "left"];
    tbPlacement = ["top", "bottom"];
    btPlacement = ["bottom", "top"];
  }
});

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y3,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y: y3,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var MAX_RESET_COUNT, computePosition, arrow, flip, originSides, offset, shift, size;
var init_floating_ui_core = __esm({
  "node_modules/@floating-ui/core/dist/floating-ui.core.mjs"() {
    init_floating_ui_utils();
    init_floating_ui_utils();
    MAX_RESET_COUNT = 50;
    computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
      } = config;
      const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
        ...platform2,
        detectOverflow
      };
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
      let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
      });
      let {
        x: x2,
        y: y3
      } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let resetCount = 0;
      const middlewareData = {};
      for (let i9 = 0; i9 < middleware.length; i9++) {
        const currentMiddleware = middleware[i9];
        if (!currentMiddleware) {
          continue;
        }
        const {
          name,
          fn
        } = currentMiddleware;
        const {
          x: nextX,
          y: nextY,
          data,
          reset
        } = await fn({
          x: x2,
          y: y3,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform: platformWithDetectOverflow,
          elements: {
            reference,
            floating
          }
        });
        x2 = nextX != null ? nextX : x2;
        y3 = nextY != null ? nextY : y3;
        middlewareData[name] = {
          ...middlewareData[name],
          ...data
        };
        if (reset && resetCount < MAX_RESET_COUNT) {
          resetCount++;
          if (typeof reset === "object") {
            if (reset.placement) {
              statefulPlacement = reset.placement;
            }
            if (reset.rects) {
              rects = reset.rects === true ? await platform2.getElementRects({
                reference,
                floating,
                strategy
              }) : reset.rects;
            }
            ({
              x: x2,
              y: y3
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i9 = -1;
        }
      }
      return {
        x: x2,
        y: y3,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    };
    arrow = (options) => ({
      name: "arrow",
      options,
      async fn(state) {
        const {
          x: x2,
          y: y3,
          placement,
          rects,
          platform: platform2,
          elements,
          middlewareData
        } = state;
        const {
          element,
          padding = 0
        } = evaluate(options, state) || {};
        if (element == null) {
          return {};
        }
        const paddingObject = getPaddingObject(padding);
        const coords = {
          x: x2,
          y: y3
        };
        const axis = getAlignmentAxis(placement);
        const length = getAxisLength(axis);
        const arrowDimensions = await platform2.getDimensions(element);
        const isYAxis = axis === "y";
        const minProp = isYAxis ? "top" : "left";
        const maxProp = isYAxis ? "bottom" : "right";
        const clientProp = isYAxis ? "clientHeight" : "clientWidth";
        const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
        const startDiff = coords[axis] - rects.reference[axis];
        const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
        let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
        if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
          clientSize = elements.floating[clientProp] || rects.floating[length];
        }
        const centerToReference = endDiff / 2 - startDiff / 2;
        const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
        const minPadding = min(paddingObject[minProp], largestPossiblePadding);
        const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
        const min$1 = minPadding;
        const max2 = clientSize - arrowDimensions[length] - maxPadding;
        const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
        const offset3 = clamp(min$1, center, max2);
        const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
        const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
        return {
          [axis]: coords[axis] + alignmentOffset,
          data: {
            [axis]: offset3,
            centerOffset: center - offset3 - alignmentOffset,
            ...shouldAddOffset && {
              alignmentOffset
            }
          },
          reset: shouldAddOffset
        };
      }
    });
    flip = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "flip",
        options,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options, state);
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const initialSideAxis = getSideAxis(initialPlacement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements2 = [initialPlacement, ...fallbackPlacements];
          const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides2 = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements2[nextIndex];
            if (nextPlacement) {
              const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
              if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
              // overflows the main axis.
              overflowsData.every((d3) => getSideAxis(d3.placement) === initialSideAxis ? d3.overflows[0] > 0 : true)) {
                return {
                  data: {
                    index: nextIndex,
                    overflows: overflowsData
                  },
                  reset: {
                    placement: nextPlacement
                  }
                };
              }
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d3) => d3.overflows[0] <= 0).sort((a4, b3) => a4.overflows[1] - b3.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$filter2;
                  const placement2 = (_overflowsData$filter2 = overflowsData.filter((d3) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d3.placement);
                      return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                      // reading directions favoring greater width.
                      currentSideAxis === "y";
                    }
                    return true;
                  }).map((d3) => [d3.placement, d3.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a4, b3) => a4[1] - b3[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };
    originSides = /* @__PURE__ */ new Set(["left", "top"]);
    offset = function(options) {
      if (options === void 0) {
        options = 0;
      }
      return {
        name: "offset",
        options,
        async fn(state) {
          var _middlewareData$offse, _middlewareData$arrow;
          const {
            x: x2,
            y: y3,
            placement,
            middlewareData
          } = state;
          const diffCoords = await convertValueToCoords(state, options);
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x2 + diffCoords.x,
            y: y3 + diffCoords.y,
            data: {
              ...diffCoords,
              placement
            }
          };
        }
      };
    };
    shift = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "shift",
        options,
        async fn(state) {
          const {
            x: x2,
            y: y3,
            placement,
            platform: platform2
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x3,
                  y: y4
                } = _ref;
                return {
                  x: x3,
                  y: y4
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const coords = {
            x: x2,
            y: y3
          };
          const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min2 = mainAxisCoord + overflow[minSide];
            const max2 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min2, mainAxisCoord, max2);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min2 = crossAxisCoord + overflow[minSide];
            const max2 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min2, crossAxisCoord, max2);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x2,
              y: limitedCoords.y - y3,
              enabled: {
                [mainAxis]: checkMainAxis,
                [crossAxis]: checkCrossAxis
              }
            }
          };
        }
      };
    };
    size = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "size",
        options,
        async fn(state) {
          var _state$middlewareData, _state$middlewareData2;
          const {
            placement,
            rects,
            platform: platform2,
            elements
          } = state;
          const {
            apply = () => {
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
          const side = getSide(placement);
          const alignment = getAlignment(placement);
          const isYAxis = getSideAxis(placement) === "y";
          const {
            width,
            height
          } = rects.floating;
          let heightSide;
          let widthSide;
          if (side === "top" || side === "bottom") {
            heightSide = side;
            widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
          } else {
            widthSide = side;
            heightSide = alignment === "end" ? "top" : "bottom";
          }
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          const maximumClippingWidth = width - overflow.left - overflow.right;
          const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
          const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
          const noShift = !state.middlewareData.shift;
          let availableHeight = overflowAvailableHeight;
          let availableWidth = overflowAvailableWidth;
          if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
            availableWidth = maximumClippingWidth;
          }
          if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
            availableHeight = maximumClippingHeight;
          }
          if (noShift && !alignment) {
            const xMin = max(overflow.left, 0);
            const xMax = max(overflow.right, 0);
            const yMin = max(overflow.top, 0);
            const yMax = max(overflow.bottom, 0);
            if (isYAxis) {
              availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
            } else {
              availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
            }
          }
          await apply({
            ...state,
            availableWidth,
            availableHeight
          });
          const nextDimensions = await platform2.getDimensions(elements.floating);
          if (width !== nextDimensions.width || height !== nextDimensions.height) {
            return {
              reset: {
                rects: true
              }
            };
          }
          return {};
        }
      };
    };
  }
});

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
var willChangeRe, containRe, isNotNone, isWebKitValue;
var init_floating_ui_utils_dom = __esm({
  "node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"() {
    willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
    containRe = /paint|layout|strict|content/;
    isNotNone = (value) => !!value && value !== "none";
  }
});

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $3
  } = getCssDimensions(domElement);
  let x2 = ($3 ? round(rect.width) : rect.width) / width;
  let y3 = ($3 ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y3 || !Number.isFinite(y3)) {
    y3 = 1;
  }
  return {
    x: x2,
    y: y3
  };
}
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y3 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y3 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y3 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y3
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x2 = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y3 = htmlRect.top + scroll.scrollTop;
  return {
    x: x2,
    y: y3
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y3 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y3
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y3 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y3 = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x: x2,
    y: y3
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y3 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y3
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i9 = 1; i9 < clippingAncestors.length; i9++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i9], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x2 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y3 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x2,
    y: y3,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
function rectsAreEqual(a4, b3) {
  return a4.x === b3.x && a4.y === b3.y && a4.width === b3.width && a4.height === b3.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update2, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update2, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update2);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update2();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update2();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update2();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update2);
      ancestorResize && ancestor.removeEventListener("resize", update2);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var noOffsets, SCROLLBAR_MAX, getElementRects, platform, offset2, shift2, flip2, size2, arrow2, computePosition2;
var init_floating_ui_dom = __esm({
  "node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"() {
    init_floating_ui_core();
    init_floating_ui_utils();
    init_floating_ui_utils_dom();
    noOffsets = /* @__PURE__ */ createCoords(0);
    SCROLLBAR_MAX = 25;
    getElementRects = async function(data) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = await getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
        }
      };
    };
    platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement,
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement,
      isRTL
    };
    offset2 = offset;
    shift2 = shift;
    flip2 = flip;
    size2 = size;
    arrow2 = arrow;
    computePosition2 = (reference, floating, options) => {
      const cache = /* @__PURE__ */ new Map();
      const mergedOptions = {
        platform,
        ...options
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache
      };
      return computePosition(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
      });
    };
  }
});

// node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
function e8(t6) {
  return i7(t6);
}
function r7(t6) {
  return t6.assignedSlot ? t6.assignedSlot : t6.parentNode instanceof ShadowRoot ? t6.parentNode.host : t6.parentNode;
}
function i7(e10) {
  for (let t6 = e10; t6; t6 = r7(t6)) if (t6 instanceof Element && "none" === getComputedStyle(t6).display) return null;
  for (let n7 = r7(e10); n7; n7 = r7(n7)) {
    if (!(n7 instanceof Element)) continue;
    const e11 = getComputedStyle(n7);
    if ("contents" !== e11.display) {
      if ("static" !== e11.position || isContainingBlock(e11)) return n7;
      if ("BODY" === n7.tagName) return n7;
    }
  }
  return null;
}
var init_composed_offset_position_browser_min = __esm({
  "node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs"() {
    init_floating_ui_utils_dom();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5JY5FUCG.js
function isVirtualElement(e10) {
  return e10 !== null && typeof e10 === "object" && "getBoundingClientRect" in e10 && ("contextElement" in e10 ? e10.contextElement instanceof Element : true);
}
var SlPopup;
var init_chunk_5JY5FUCG = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5JY5FUCG.js"() {
    init_chunk_3KSWVBQ5();
    init_chunk_6CTB5ZDJ();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_floating_ui_dom();
    init_class_map2();
    init_lit();
    init_composed_offset_position_browser_min();
    init_decorators();
    SlPopup = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.localize = new LocalizeController2(this);
        this.active = false;
        this.placement = "top";
        this.strategy = "absolute";
        this.distance = 0;
        this.skidding = 0;
        this.arrow = false;
        this.arrowPlacement = "anchor";
        this.arrowPadding = 10;
        this.flip = false;
        this.flipFallbackPlacements = "";
        this.flipFallbackStrategy = "best-fit";
        this.flipPadding = 0;
        this.shift = false;
        this.shiftPadding = 0;
        this.autoSizePadding = 0;
        this.hoverBridge = false;
        this.updateHoverBridge = () => {
          if (this.hoverBridge && this.anchorEl) {
            const anchorRect = this.anchorEl.getBoundingClientRect();
            const popupRect = this.popup.getBoundingClientRect();
            const isVertical = this.placement.includes("top") || this.placement.includes("bottom");
            let topLeftX = 0;
            let topLeftY = 0;
            let topRightX = 0;
            let topRightY = 0;
            let bottomLeftX = 0;
            let bottomLeftY = 0;
            let bottomRightX = 0;
            let bottomRightY = 0;
            if (isVertical) {
              if (anchorRect.top < popupRect.top) {
                topLeftX = anchorRect.left;
                topLeftY = anchorRect.bottom;
                topRightX = anchorRect.right;
                topRightY = anchorRect.bottom;
                bottomLeftX = popupRect.left;
                bottomLeftY = popupRect.top;
                bottomRightX = popupRect.right;
                bottomRightY = popupRect.top;
              } else {
                topLeftX = popupRect.left;
                topLeftY = popupRect.bottom;
                topRightX = popupRect.right;
                topRightY = popupRect.bottom;
                bottomLeftX = anchorRect.left;
                bottomLeftY = anchorRect.top;
                bottomRightX = anchorRect.right;
                bottomRightY = anchorRect.top;
              }
            } else {
              if (anchorRect.left < popupRect.left) {
                topLeftX = anchorRect.right;
                topLeftY = anchorRect.top;
                topRightX = popupRect.left;
                topRightY = popupRect.top;
                bottomLeftX = anchorRect.right;
                bottomLeftY = anchorRect.bottom;
                bottomRightX = popupRect.left;
                bottomRightY = popupRect.bottom;
              } else {
                topLeftX = popupRect.right;
                topLeftY = popupRect.top;
                topRightX = anchorRect.left;
                topRightY = anchorRect.top;
                bottomLeftX = popupRect.right;
                bottomLeftY = popupRect.bottom;
                bottomRightX = anchorRect.left;
                bottomRightY = anchorRect.bottom;
              }
            }
            this.style.setProperty("--hover-bridge-top-left-x", `${topLeftX}px`);
            this.style.setProperty("--hover-bridge-top-left-y", `${topLeftY}px`);
            this.style.setProperty("--hover-bridge-top-right-x", `${topRightX}px`);
            this.style.setProperty("--hover-bridge-top-right-y", `${topRightY}px`);
            this.style.setProperty("--hover-bridge-bottom-left-x", `${bottomLeftX}px`);
            this.style.setProperty("--hover-bridge-bottom-left-y", `${bottomLeftY}px`);
            this.style.setProperty("--hover-bridge-bottom-right-x", `${bottomRightX}px`);
            this.style.setProperty("--hover-bridge-bottom-right-y", `${bottomRightY}px`);
          }
        };
      }
      async connectedCallback() {
        super.connectedCallback();
        await this.updateComplete;
        this.start();
      }
      disconnectedCallback() {
        super.disconnectedCallback();
        this.stop();
      }
      async updated(changedProps) {
        super.updated(changedProps);
        if (changedProps.has("active")) {
          if (this.active) {
            this.start();
          } else {
            this.stop();
          }
        }
        if (changedProps.has("anchor")) {
          this.handleAnchorChange();
        }
        if (this.active) {
          await this.updateComplete;
          this.reposition();
        }
      }
      async handleAnchorChange() {
        await this.stop();
        if (this.anchor && typeof this.anchor === "string") {
          const root = this.getRootNode();
          this.anchorEl = root.getElementById(this.anchor);
        } else if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
          this.anchorEl = this.anchor;
        } else {
          this.anchorEl = this.querySelector('[slot="anchor"]');
        }
        if (this.anchorEl instanceof HTMLSlotElement) {
          this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
        }
        if (this.anchorEl && this.active) {
          this.start();
        }
      }
      start() {
        if (!this.anchorEl || !this.active) {
          return;
        }
        this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
          this.reposition();
        });
      }
      async stop() {
        return new Promise((resolve) => {
          if (this.cleanup) {
            this.cleanup();
            this.cleanup = void 0;
            this.removeAttribute("data-current-placement");
            this.style.removeProperty("--auto-size-available-width");
            this.style.removeProperty("--auto-size-available-height");
            requestAnimationFrame(() => resolve());
          } else {
            resolve();
          }
        });
      }
      /** Forces the popup to recalculate and reposition itself. */
      reposition() {
        if (!this.active || !this.anchorEl) {
          return;
        }
        const middleware = [
          // The offset middleware goes first
          offset2({ mainAxis: this.distance, crossAxis: this.skidding })
        ];
        if (this.sync) {
          middleware.push(
            size2({
              apply: ({ rects }) => {
                const syncWidth = this.sync === "width" || this.sync === "both";
                const syncHeight = this.sync === "height" || this.sync === "both";
                this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
                this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
              }
            })
          );
        } else {
          this.popup.style.width = "";
          this.popup.style.height = "";
        }
        if (this.flip) {
          middleware.push(
            flip2({
              boundary: this.flipBoundary,
              // @ts-expect-error - We're converting a string attribute to an array here
              fallbackPlacements: this.flipFallbackPlacements,
              fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
              padding: this.flipPadding
            })
          );
        }
        if (this.shift) {
          middleware.push(
            shift2({
              boundary: this.shiftBoundary,
              padding: this.shiftPadding
            })
          );
        }
        if (this.autoSize) {
          middleware.push(
            size2({
              boundary: this.autoSizeBoundary,
              padding: this.autoSizePadding,
              apply: ({ availableWidth, availableHeight }) => {
                if (this.autoSize === "vertical" || this.autoSize === "both") {
                  this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
                } else {
                  this.style.removeProperty("--auto-size-available-height");
                }
                if (this.autoSize === "horizontal" || this.autoSize === "both") {
                  this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
                } else {
                  this.style.removeProperty("--auto-size-available-width");
                }
              }
            })
          );
        } else {
          this.style.removeProperty("--auto-size-available-width");
          this.style.removeProperty("--auto-size-available-height");
        }
        if (this.arrow) {
          middleware.push(
            arrow2({
              element: this.arrowEl,
              padding: this.arrowPadding
            })
          );
        }
        const getOffsetParent2 = this.strategy === "absolute" ? (element) => platform.getOffsetParent(element, e8) : platform.getOffsetParent;
        computePosition2(this.anchorEl, this.popup, {
          placement: this.placement,
          middleware,
          strategy: this.strategy,
          platform: __spreadProps(__spreadValues({}, platform), {
            getOffsetParent: getOffsetParent2
          })
        }).then(({ x: x2, y: y3, middlewareData, placement }) => {
          const isRtl = this.localize.dir() === "rtl";
          const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
          this.setAttribute("data-current-placement", placement);
          Object.assign(this.popup.style, {
            left: `${x2}px`,
            top: `${y3}px`
          });
          if (this.arrow) {
            const arrowX = middlewareData.arrow.x;
            const arrowY = middlewareData.arrow.y;
            let top = "";
            let right = "";
            let bottom = "";
            let left = "";
            if (this.arrowPlacement === "start") {
              const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
              top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
              right = isRtl ? value : "";
              left = isRtl ? "" : value;
            } else if (this.arrowPlacement === "end") {
              const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
              right = isRtl ? "" : value;
              left = isRtl ? value : "";
              bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
            } else if (this.arrowPlacement === "center") {
              left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
              top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
            } else {
              left = typeof arrowX === "number" ? `${arrowX}px` : "";
              top = typeof arrowY === "number" ? `${arrowY}px` : "";
            }
            Object.assign(this.arrowEl.style, {
              top,
              right,
              bottom,
              left,
              [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
            });
          }
        });
        requestAnimationFrame(() => this.updateHoverBridge());
        this.emit("sl-reposition");
      }
      render() {
        return b2`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e7({
          "popup-hover-bridge": true,
          "popup-hover-bridge--visible": this.hoverBridge && this.active
        })}
      ></span>

      <div
        part="popup"
        class=${e7({
          popup: true,
          "popup--active": this.active,
          "popup--fixed": this.strategy === "fixed",
          "popup--has-arrow": this.arrow
        })}
      >
        <slot></slot>
        ${this.arrow ? b2`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
      }
    };
    SlPopup.styles = [component_styles_default, popup_styles_default];
    __decorateClass([
      e5(".popup")
    ], SlPopup.prototype, "popup", 2);
    __decorateClass([
      e5(".popup__arrow")
    ], SlPopup.prototype, "arrowEl", 2);
    __decorateClass([
      n4()
    ], SlPopup.prototype, "anchor", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlPopup.prototype, "active", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlPopup.prototype, "placement", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlPopup.prototype, "strategy", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlPopup.prototype, "distance", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlPopup.prototype, "skidding", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlPopup.prototype, "arrow", 2);
    __decorateClass([
      n4({ attribute: "arrow-placement" })
    ], SlPopup.prototype, "arrowPlacement", 2);
    __decorateClass([
      n4({ attribute: "arrow-padding", type: Number })
    ], SlPopup.prototype, "arrowPadding", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlPopup.prototype, "flip", 2);
    __decorateClass([
      n4({
        attribute: "flip-fallback-placements",
        converter: {
          fromAttribute: (value) => {
            return value.split(" ").map((p4) => p4.trim()).filter((p4) => p4 !== "");
          },
          toAttribute: (value) => {
            return value.join(" ");
          }
        }
      })
    ], SlPopup.prototype, "flipFallbackPlacements", 2);
    __decorateClass([
      n4({ attribute: "flip-fallback-strategy" })
    ], SlPopup.prototype, "flipFallbackStrategy", 2);
    __decorateClass([
      n4({ type: Object })
    ], SlPopup.prototype, "flipBoundary", 2);
    __decorateClass([
      n4({ attribute: "flip-padding", type: Number })
    ], SlPopup.prototype, "flipPadding", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlPopup.prototype, "shift", 2);
    __decorateClass([
      n4({ type: Object })
    ], SlPopup.prototype, "shiftBoundary", 2);
    __decorateClass([
      n4({ attribute: "shift-padding", type: Number })
    ], SlPopup.prototype, "shiftPadding", 2);
    __decorateClass([
      n4({ attribute: "auto-size" })
    ], SlPopup.prototype, "autoSize", 2);
    __decorateClass([
      n4()
    ], SlPopup.prototype, "sync", 2);
    __decorateClass([
      n4({ type: Object })
    ], SlPopup.prototype, "autoSizeBoundary", 2);
    __decorateClass([
      n4({ attribute: "auto-size-padding", type: Number })
    ], SlPopup.prototype, "autoSizePadding", 2);
    __decorateClass([
      n4({ attribute: "hover-bridge", type: Boolean })
    ], SlPopup.prototype, "hoverBridge", 2);
  }
});

// node_modules/lit-html/directives/unsafe-html.js
var e9, o8;
var init_unsafe_html = __esm({
  "node_modules/lit-html/directives/unsafe-html.js"() {
    init_lit_html();
    init_directive();
    e9 = class extends i5 {
      constructor(i9) {
        if (super(i9), this.it = A, i9.type !== t5.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
      }
      render(r8) {
        if (r8 === A || null == r8) return this._t = void 0, this.it = r8;
        if (r8 === E) return r8;
        if ("string" != typeof r8) throw Error(this.constructor.directiveName + "() called with a non-string value");
        if (r8 === this.it) return this._t;
        this.it = r8;
        const s4 = [r8];
        return s4.raw = s4, this._t = { _$litType$: this.constructor.resultType, strings: s4, values: [] };
      }
    };
    e9.directiveName = "unsafeHTML", e9.resultType = 1;
    o8 = e6(e9);
  }
});

// node_modules/lit/directives/unsafe-html.js
var init_unsafe_html2 = __esm({
  "node_modules/lit/directives/unsafe-html.js"() {
    init_unsafe_html();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AILU2HNL.js
var SlSelect;
var init_chunk_AILU2HNL = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AILU2HNL.js"() {
    init_chunk_6R4LM7O6();
    init_chunk_XNOUITPX();
    init_chunk_RWUUFNUL();
    init_chunk_SI4ACBFK();
    init_chunk_5JY5FUCG();
    init_chunk_3RPBFEDE();
    init_chunk_K7JGTRV7();
    init_chunk_B4BZKR24();
    init_chunk_AJ3ENQ5C();
    init_chunk_NYIIDP5N();
    init_chunk_6CTB5ZDJ();
    init_chunk_YHLNUJ7P();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_decorators();
    init_unsafe_html2();
    SlSelect = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.formControlController = new FormControlController(this, {
          assumeInteractionOn: ["sl-blur", "sl-input"]
        });
        this.hasSlotController = new HasSlotController(this, "help-text", "label");
        this.localize = new LocalizeController2(this);
        this.typeToSelectString = "";
        this.hasFocus = false;
        this.displayLabel = "";
        this.selectedOptions = [];
        this.valueHasChanged = false;
        this.name = "";
        this._value = "";
        this.defaultValue = "";
        this.size = "medium";
        this.placeholder = "";
        this.multiple = false;
        this.maxOptionsVisible = 3;
        this.disabled = false;
        this.clearable = false;
        this.open = false;
        this.hoist = false;
        this.filled = false;
        this.pill = false;
        this.label = "";
        this.placement = "bottom";
        this.helpText = "";
        this.form = "";
        this.required = false;
        this.getTag = (option) => {
          return b2`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${(event) => this.handleTagRemove(event, option)}
      >
        ${option.getTextLabel()}
      </sl-tag>
    `;
        };
        this.handleDocumentFocusIn = (event) => {
          const path = event.composedPath();
          if (this && !path.includes(this)) {
            this.hide();
          }
        };
        this.handleDocumentKeyDown = (event) => {
          const target = event.target;
          const isClearButton = target.closest(".select__clear") !== null;
          const isIconButton = target.closest("sl-icon-button") !== null;
          if (isClearButton || isIconButton) {
            return;
          }
          if (event.key === "Escape" && this.open && !this.closeWatcher) {
            event.preventDefault();
            event.stopPropagation();
            this.hide();
            this.displayInput.focus({ preventScroll: true });
          }
          if (event.key === "Enter" || event.key === " " && this.typeToSelectString === "") {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (!this.open) {
              this.show();
              return;
            }
            if (this.currentOption && !this.currentOption.disabled) {
              this.valueHasChanged = true;
              if (this.multiple) {
                this.toggleOptionSelection(this.currentOption);
              } else {
                this.setSelectedOptions(this.currentOption);
              }
              this.updateComplete.then(() => {
                this.emit("sl-input");
                this.emit("sl-change");
              });
              if (!this.multiple) {
                this.hide();
                this.displayInput.focus({ preventScroll: true });
              }
            }
            return;
          }
          if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
            const allOptions = this.getAllOptions();
            const currentIndex = allOptions.indexOf(this.currentOption);
            let newIndex = Math.max(0, currentIndex);
            event.preventDefault();
            if (!this.open) {
              this.show();
              if (this.currentOption) {
                return;
              }
            }
            if (event.key === "ArrowDown") {
              newIndex = currentIndex + 1;
              if (newIndex > allOptions.length - 1) newIndex = 0;
            } else if (event.key === "ArrowUp") {
              newIndex = currentIndex - 1;
              if (newIndex < 0) newIndex = allOptions.length - 1;
            } else if (event.key === "Home") {
              newIndex = 0;
            } else if (event.key === "End") {
              newIndex = allOptions.length - 1;
            }
            this.setCurrentOption(allOptions[newIndex]);
          }
          if (event.key && event.key.length === 1 || event.key === "Backspace") {
            const allOptions = this.getAllOptions();
            if (event.metaKey || event.ctrlKey || event.altKey) {
              return;
            }
            if (!this.open) {
              if (event.key === "Backspace") {
                return;
              }
              this.show();
            }
            event.stopPropagation();
            event.preventDefault();
            clearTimeout(this.typeToSelectTimeout);
            this.typeToSelectTimeout = window.setTimeout(() => this.typeToSelectString = "", 1e3);
            if (event.key === "Backspace") {
              this.typeToSelectString = this.typeToSelectString.slice(0, -1);
            } else {
              this.typeToSelectString += event.key.toLowerCase();
            }
            for (const option of allOptions) {
              const label = option.getTextLabel().toLowerCase();
              if (label.startsWith(this.typeToSelectString)) {
                this.setCurrentOption(option);
                break;
              }
            }
          }
        };
        this.handleDocumentMouseDown = (event) => {
          const path = event.composedPath();
          if (this && !path.includes(this)) {
            this.hide();
          }
        };
      }
      get value() {
        return this._value;
      }
      set value(val) {
        if (this.multiple) {
          val = Array.isArray(val) ? val : val.split(" ");
        } else {
          val = Array.isArray(val) ? val.join(" ") : val;
        }
        if (this._value === val) {
          return;
        }
        this.valueHasChanged = true;
        this._value = val;
      }
      /** Gets the validity state object */
      get validity() {
        return this.valueInput.validity;
      }
      /** Gets the validation message */
      get validationMessage() {
        return this.valueInput.validationMessage;
      }
      connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
          this.handleDefaultSlotChange();
        });
        this.open = false;
      }
      addOpenListeners() {
        var _a;
        document.addEventListener("focusin", this.handleDocumentFocusIn);
        document.addEventListener("keydown", this.handleDocumentKeyDown);
        document.addEventListener("mousedown", this.handleDocumentMouseDown);
        if (this.getRootNode() !== document) {
          this.getRootNode().addEventListener("focusin", this.handleDocumentFocusIn);
        }
        if ("CloseWatcher" in window) {
          (_a = this.closeWatcher) == null ? void 0 : _a.destroy();
          this.closeWatcher = new CloseWatcher();
          this.closeWatcher.onclose = () => {
            if (this.open) {
              this.hide();
              this.displayInput.focus({ preventScroll: true });
            }
          };
        }
      }
      removeOpenListeners() {
        var _a;
        document.removeEventListener("focusin", this.handleDocumentFocusIn);
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
        document.removeEventListener("mousedown", this.handleDocumentMouseDown);
        if (this.getRootNode() !== document) {
          this.getRootNode().removeEventListener("focusin", this.handleDocumentFocusIn);
        }
        (_a = this.closeWatcher) == null ? void 0 : _a.destroy();
      }
      handleFocus() {
        this.hasFocus = true;
        this.displayInput.setSelectionRange(0, 0);
        this.emit("sl-focus");
      }
      handleBlur() {
        this.hasFocus = false;
        this.emit("sl-blur");
      }
      handleLabelClick() {
        this.displayInput.focus();
      }
      handleComboboxMouseDown(event) {
        const path = event.composedPath();
        const isIconButton = path.some((el) => el instanceof Element && el.tagName.toLowerCase() === "sl-icon-button");
        if (this.disabled || isIconButton) {
          return;
        }
        event.preventDefault();
        this.displayInput.focus({ preventScroll: true });
        this.open = !this.open;
      }
      handleComboboxKeyDown(event) {
        if (event.key === "Tab") {
          return;
        }
        event.stopPropagation();
        this.handleDocumentKeyDown(event);
      }
      handleClearClick(event) {
        event.stopPropagation();
        this.valueHasChanged = true;
        if (this.value !== "") {
          this.setSelectedOptions([]);
          this.displayInput.focus({ preventScroll: true });
          this.updateComplete.then(() => {
            this.emit("sl-clear");
            this.emit("sl-input");
            this.emit("sl-change");
          });
        }
      }
      handleClearMouseDown(event) {
        event.stopPropagation();
        event.preventDefault();
      }
      handleOptionClick(event) {
        const target = event.target;
        const option = target.closest("sl-option");
        const oldValue = this.value;
        if (option && !option.disabled) {
          this.valueHasChanged = true;
          if (this.multiple) {
            this.toggleOptionSelection(option);
          } else {
            this.setSelectedOptions(option);
          }
          this.updateComplete.then(() => this.displayInput.focus({ preventScroll: true }));
          if (this.value !== oldValue) {
            this.updateComplete.then(() => {
              this.emit("sl-input");
              this.emit("sl-change");
            });
          }
          if (!this.multiple) {
            this.hide();
            this.displayInput.focus({ preventScroll: true });
          }
        }
      }
      /* @internal - used by options to update labels */
      handleDefaultSlotChange() {
        if (!customElements.get("sl-option")) {
          customElements.whenDefined("sl-option").then(() => this.handleDefaultSlotChange());
        }
        const allOptions = this.getAllOptions();
        const val = this.valueHasChanged ? this.value : this.defaultValue;
        const value = Array.isArray(val) ? val : [val];
        const values = [];
        allOptions.forEach((option) => values.push(option.value));
        this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
      }
      handleTagRemove(event, option) {
        event.stopPropagation();
        this.valueHasChanged = true;
        if (!this.disabled) {
          this.toggleOptionSelection(option, false);
          this.updateComplete.then(() => {
            this.emit("sl-input");
            this.emit("sl-change");
          });
        }
      }
      // Gets an array of all <sl-option> elements
      getAllOptions() {
        return [...this.querySelectorAll("sl-option")];
      }
      // Gets the first <sl-option> element
      getFirstOption() {
        return this.querySelector("sl-option");
      }
      // Sets the current option, which is the option the user is currently interacting with (e.g. via keyboard). Only one
      // option may be "current" at a time.
      setCurrentOption(option) {
        const allOptions = this.getAllOptions();
        allOptions.forEach((el) => {
          el.current = false;
          el.tabIndex = -1;
        });
        if (option) {
          this.currentOption = option;
          option.current = true;
          option.tabIndex = 0;
          option.focus();
        }
      }
      // Sets the selected option(s)
      setSelectedOptions(option) {
        const allOptions = this.getAllOptions();
        const newSelectedOptions = Array.isArray(option) ? option : [option];
        allOptions.forEach((el) => el.selected = false);
        if (newSelectedOptions.length) {
          newSelectedOptions.forEach((el) => el.selected = true);
        }
        this.selectionChanged();
      }
      // Toggles an option's selected state
      toggleOptionSelection(option, force) {
        if (force === true || force === false) {
          option.selected = force;
        } else {
          option.selected = !option.selected;
        }
        this.selectionChanged();
      }
      // This method must be called whenever the selection changes. It will update the selected options cache, the current
      // value, and the display value
      selectionChanged() {
        var _a, _b, _c;
        const options = this.getAllOptions();
        this.selectedOptions = options.filter((el) => el.selected);
        const cachedValueHasChanged = this.valueHasChanged;
        if (this.multiple) {
          this.value = this.selectedOptions.map((el) => el.value);
          if (this.placeholder && this.value.length === 0) {
            this.displayLabel = "";
          } else {
            this.displayLabel = this.localize.term("numOptionsSelected", this.selectedOptions.length);
          }
        } else {
          const selectedOption = this.selectedOptions[0];
          this.value = (_a = selectedOption == null ? void 0 : selectedOption.value) != null ? _a : "";
          this.displayLabel = (_c = (_b = selectedOption == null ? void 0 : selectedOption.getTextLabel) == null ? void 0 : _b.call(selectedOption)) != null ? _c : "";
        }
        this.valueHasChanged = cachedValueHasChanged;
        this.updateComplete.then(() => {
          this.formControlController.updateValidity();
        });
      }
      get tags() {
        return this.selectedOptions.map((option, index) => {
          if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
            const tag = this.getTag(option, index);
            return b2`<div @sl-remove=${(e10) => this.handleTagRemove(e10, option)}>
          ${typeof tag === "string" ? o8(tag) : tag}
        </div>`;
          } else if (index === this.maxOptionsVisible) {
            return b2`<sl-tag size=${this.size}>+${this.selectedOptions.length - index}</sl-tag>`;
          }
          return b2``;
        });
      }
      handleInvalid(event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
      }
      handleDisabledChange() {
        if (this.disabled) {
          this.open = false;
          this.handleOpenChange();
        }
      }
      attributeChangedCallback(name, oldVal, newVal) {
        super.attributeChangedCallback(name, oldVal, newVal);
        if (name === "value") {
          const cachedValueHasChanged = this.valueHasChanged;
          this.value = this.defaultValue;
          this.valueHasChanged = cachedValueHasChanged;
        }
      }
      handleValueChange() {
        if (!this.valueHasChanged) {
          const cachedValueHasChanged = this.valueHasChanged;
          this.value = this.defaultValue;
          this.valueHasChanged = cachedValueHasChanged;
        }
        const allOptions = this.getAllOptions();
        const value = Array.isArray(this.value) ? this.value : [this.value];
        this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
      }
      async handleOpenChange() {
        if (this.open && !this.disabled) {
          this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption());
          this.emit("sl-show");
          this.addOpenListeners();
          await stopAnimations(this);
          this.listbox.hidden = false;
          this.popup.active = true;
          requestAnimationFrame(() => {
            this.setCurrentOption(this.currentOption);
          });
          const { keyframes, options } = getAnimation(this, "select.show", { dir: this.localize.dir() });
          await animateTo(this.popup.popup, keyframes, options);
          if (this.currentOption) {
            scrollIntoView(this.currentOption, this.listbox, "vertical", "auto");
          }
          this.emit("sl-after-show");
        } else {
          this.emit("sl-hide");
          this.removeOpenListeners();
          await stopAnimations(this);
          const { keyframes, options } = getAnimation(this, "select.hide", { dir: this.localize.dir() });
          await animateTo(this.popup.popup, keyframes, options);
          this.listbox.hidden = true;
          this.popup.active = false;
          this.emit("sl-after-hide");
        }
      }
      /** Shows the listbox. */
      async show() {
        if (this.open || this.disabled) {
          this.open = false;
          return void 0;
        }
        this.open = true;
        return waitForEvent(this, "sl-after-show");
      }
      /** Hides the listbox. */
      async hide() {
        if (!this.open || this.disabled) {
          this.open = false;
          return void 0;
        }
        this.open = false;
        return waitForEvent(this, "sl-after-hide");
      }
      /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
      checkValidity() {
        return this.valueInput.checkValidity();
      }
      /** Gets the associated form, if one exists. */
      getForm() {
        return this.formControlController.getForm();
      }
      /** Checks for validity and shows the browser's validation message if the control is invalid. */
      reportValidity() {
        return this.valueInput.reportValidity();
      }
      /** Sets a custom validation message. Pass an empty string to restore validity. */
      setCustomValidity(message) {
        this.valueInput.setCustomValidity(message);
        this.formControlController.updateValidity();
      }
      /** Sets focus on the control. */
      focus(options) {
        this.displayInput.focus(options);
      }
      /** Removes focus from the control. */
      blur() {
        this.displayInput.blur();
      }
      render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHelpTextSlot = this.hasSlotController.test("help-text");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
        const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;
        const isPlaceholderVisible = this.placeholder && this.value && this.value.length <= 0;
        return b2`
      <div
        part="form-control"
        class=${e7({
          "form-control": true,
          "form-control--small": this.size === "small",
          "form-control--medium": this.size === "medium",
          "form-control--large": this.size === "large",
          "form-control--has-label": hasLabel,
          "form-control--has-help-text": hasHelpText
        })}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${e7({
          select: true,
          "select--standard": true,
          "select--filled": this.filled,
          "select--pill": this.pill,
          "select--open": this.open,
          "select--disabled": this.disabled,
          "select--multiple": this.multiple,
          "select--focused": this.hasFocus,
          "select--placeholder-visible": isPlaceholderVisible,
          "select--top": this.placement === "top",
          "select--bottom": this.placement === "bottom",
          "select--small": this.size === "small",
          "select--medium": this.size === "medium",
          "select--large": this.size === "large"
        })}
            placement=${this.placement}
            strategy=${this.hoist ? "fixed" : "absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple ? b2`<div part="tags" class="select__tags">${this.tags}</div>` : ""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(", ") : this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${hasClearIcon ? b2`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? "true" : "false"}
              aria-multiselectable=${this.multiple ? "true" : "false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
      }
    };
    SlSelect.styles = [component_styles_default, form_control_styles_default, select_styles_default];
    SlSelect.dependencies = {
      "sl-icon": SlIcon,
      "sl-popup": SlPopup,
      "sl-tag": SlTag
    };
    __decorateClass([
      e5(".select")
    ], SlSelect.prototype, "popup", 2);
    __decorateClass([
      e5(".select__combobox")
    ], SlSelect.prototype, "combobox", 2);
    __decorateClass([
      e5(".select__display-input")
    ], SlSelect.prototype, "displayInput", 2);
    __decorateClass([
      e5(".select__value-input")
    ], SlSelect.prototype, "valueInput", 2);
    __decorateClass([
      e5(".select__listbox")
    ], SlSelect.prototype, "listbox", 2);
    __decorateClass([
      r5()
    ], SlSelect.prototype, "hasFocus", 2);
    __decorateClass([
      r5()
    ], SlSelect.prototype, "displayLabel", 2);
    __decorateClass([
      r5()
    ], SlSelect.prototype, "currentOption", 2);
    __decorateClass([
      r5()
    ], SlSelect.prototype, "selectedOptions", 2);
    __decorateClass([
      r5()
    ], SlSelect.prototype, "valueHasChanged", 2);
    __decorateClass([
      n4()
    ], SlSelect.prototype, "name", 2);
    __decorateClass([
      r5()
    ], SlSelect.prototype, "value", 1);
    __decorateClass([
      n4({ attribute: "value" })
    ], SlSelect.prototype, "defaultValue", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlSelect.prototype, "size", 2);
    __decorateClass([
      n4()
    ], SlSelect.prototype, "placeholder", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlSelect.prototype, "multiple", 2);
    __decorateClass([
      n4({ attribute: "max-options-visible", type: Number })
    ], SlSelect.prototype, "maxOptionsVisible", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlSelect.prototype, "disabled", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlSelect.prototype, "clearable", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlSelect.prototype, "open", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlSelect.prototype, "hoist", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlSelect.prototype, "filled", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlSelect.prototype, "pill", 2);
    __decorateClass([
      n4()
    ], SlSelect.prototype, "label", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlSelect.prototype, "placement", 2);
    __decorateClass([
      n4({ attribute: "help-text" })
    ], SlSelect.prototype, "helpText", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlSelect.prototype, "form", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlSelect.prototype, "required", 2);
    __decorateClass([
      n4()
    ], SlSelect.prototype, "getTag", 2);
    __decorateClass([
      watch("disabled", { waitUntilFirstUpdate: true })
    ], SlSelect.prototype, "handleDisabledChange", 1);
    __decorateClass([
      watch(["defaultValue", "value"], { waitUntilFirstUpdate: true })
    ], SlSelect.prototype, "handleValueChange", 1);
    __decorateClass([
      watch("open", { waitUntilFirstUpdate: true })
    ], SlSelect.prototype, "handleOpenChange", 1);
    setDefaultAnimation("select.show", {
      keyframes: [
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1 }
      ],
      options: { duration: 100, easing: "ease" }
    });
    setDefaultAnimation("select.hide", {
      keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.9 }
      ],
      options: { duration: 100, easing: "ease" }
    });
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TP2GB2HO.js
var init_chunk_TP2GB2HO = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TP2GB2HO.js"() {
    init_chunk_AILU2HNL();
    SlSelect.define("sl-select");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/select/select.js
var init_select = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/select/select.js"() {
    init_chunk_TP2GB2HO();
    init_chunk_AILU2HNL();
    init_chunk_6R4LM7O6();
    init_chunk_V2OL7VMD();
    init_chunk_XNOUITPX();
    init_chunk_RWUUFNUL();
    init_chunk_SI4ACBFK();
    init_chunk_5JY5FUCG();
    init_chunk_3KSWVBQ5();
    init_chunk_3RPBFEDE();
    init_chunk_7E4JTYWU();
    init_chunk_6I2T3DLI();
    init_chunk_K7JGTRV7();
    init_chunk_B4BZKR24();
    init_chunk_AJ3ENQ5C();
    init_chunk_NYIIDP5N();
    init_chunk_6CTB5ZDJ();
    init_chunk_7BTDLTNI();
    init_chunk_YHLNUJ7P();
    init_chunk_ZL53POKZ();
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    init_chunk_QLXRCYS4();
    init_chunk_3Y6SB6QS();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FXXKMG2P.js
var option_styles_default;
var init_chunk_FXXKMG2P = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FXXKMG2P.js"() {
    init_lit();
    option_styles_default = i`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BBCWSAUE.js
var SlOption;
var init_chunk_BBCWSAUE = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BBCWSAUE.js"() {
    init_chunk_FXXKMG2P();
    init_chunk_6CTB5ZDJ();
    init_chunk_YHLNUJ7P();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_decorators();
    SlOption = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.localize = new LocalizeController2(this);
        this.isInitialized = false;
        this.current = false;
        this.selected = false;
        this.hasHover = false;
        this.value = "";
        this.disabled = false;
      }
      connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "option");
        this.setAttribute("aria-selected", "false");
      }
      handleDefaultSlotChange() {
        if (this.isInitialized) {
          customElements.whenDefined("sl-select").then(() => {
            const controller = this.closest("sl-select");
            if (controller) {
              controller.handleDefaultSlotChange();
            }
          });
        } else {
          this.isInitialized = true;
        }
      }
      handleMouseEnter() {
        this.hasHover = true;
      }
      handleMouseLeave() {
        this.hasHover = false;
      }
      handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
      }
      handleSelectedChange() {
        this.setAttribute("aria-selected", this.selected ? "true" : "false");
      }
      handleValueChange() {
        if (typeof this.value !== "string") {
          this.value = String(this.value);
        }
        if (this.value.includes(" ")) {
          console.error(`Option values cannot include a space. All spaces have been replaced with underscores.`, this);
          this.value = this.value.replace(/ /g, "_");
        }
      }
      /** Returns a plain text label based on the option's content. */
      getTextLabel() {
        const nodes = this.childNodes;
        let label = "";
        [...nodes].forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (!node.hasAttribute("slot")) {
              label += node.textContent;
            }
          }
          if (node.nodeType === Node.TEXT_NODE) {
            label += node.textContent;
          }
        });
        return label.trim();
      }
      render() {
        return b2`
      <div
        part="base"
        class=${e7({
          option: true,
          "option--current": this.current,
          "option--disabled": this.disabled,
          "option--selected": this.selected,
          "option--hover": this.hasHover
        })}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `;
      }
    };
    SlOption.styles = [component_styles_default, option_styles_default];
    SlOption.dependencies = { "sl-icon": SlIcon };
    __decorateClass([
      e5(".option__label")
    ], SlOption.prototype, "defaultSlot", 2);
    __decorateClass([
      r5()
    ], SlOption.prototype, "current", 2);
    __decorateClass([
      r5()
    ], SlOption.prototype, "selected", 2);
    __decorateClass([
      r5()
    ], SlOption.prototype, "hasHover", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlOption.prototype, "value", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlOption.prototype, "disabled", 2);
    __decorateClass([
      watch("disabled")
    ], SlOption.prototype, "handleDisabledChange", 1);
    __decorateClass([
      watch("selected")
    ], SlOption.prototype, "handleSelectedChange", 1);
    __decorateClass([
      watch("value")
    ], SlOption.prototype, "handleValueChange", 1);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.JXOKFADN.js
var init_chunk_JXOKFADN = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.JXOKFADN.js"() {
    init_chunk_BBCWSAUE();
    SlOption.define("sl-option");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/option/option.js
var init_option = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/option/option.js"() {
    init_chunk_JXOKFADN();
    init_chunk_BBCWSAUE();
    init_chunk_FXXKMG2P();
    init_chunk_6CTB5ZDJ();
    init_chunk_7BTDLTNI();
    init_chunk_YHLNUJ7P();
    init_chunk_ZL53POKZ();
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    init_chunk_QLXRCYS4();
    init_chunk_3Y6SB6QS();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.R3NF57O3.js
var checkbox_styles_default;
var init_chunk_R3NF57O3 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.R3NF57O3.js"() {
    init_lit();
    checkbox_styles_default = i`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XSFJLY2D.js
var SlCheckbox;
var init_chunk_XSFJLY2D = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XSFJLY2D.js"() {
    init_chunk_R3NF57O3();
    init_chunk_GI7VDIWX();
    init_chunk_SI4ACBFK();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_YHLNUJ7P();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_if_defined2();
    init_live2();
    init_decorators();
    SlCheckbox = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.formControlController = new FormControlController(this, {
          value: (control) => control.checked ? control.value || "on" : void 0,
          defaultValue: (control) => control.defaultChecked,
          setValue: (control, checked) => control.checked = checked
        });
        this.hasSlotController = new HasSlotController(this, "help-text");
        this.hasFocus = false;
        this.title = "";
        this.name = "";
        this.size = "medium";
        this.disabled = false;
        this.checked = false;
        this.indeterminate = false;
        this.defaultChecked = false;
        this.form = "";
        this.required = false;
        this.helpText = "";
      }
      /** Gets the validity state object */
      get validity() {
        return this.input.validity;
      }
      /** Gets the validation message */
      get validationMessage() {
        return this.input.validationMessage;
      }
      firstUpdated() {
        this.formControlController.updateValidity();
      }
      handleClick() {
        this.checked = !this.checked;
        this.indeterminate = false;
        this.emit("sl-change");
      }
      handleBlur() {
        this.hasFocus = false;
        this.emit("sl-blur");
      }
      handleInput() {
        this.emit("sl-input");
      }
      handleInvalid(event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
      }
      handleFocus() {
        this.hasFocus = true;
        this.emit("sl-focus");
      }
      handleDisabledChange() {
        this.formControlController.setValidity(this.disabled);
      }
      handleStateChange() {
        this.input.checked = this.checked;
        this.input.indeterminate = this.indeterminate;
        this.formControlController.updateValidity();
      }
      /** Simulates a click on the checkbox. */
      click() {
        this.input.click();
      }
      /** Sets focus on the checkbox. */
      focus(options) {
        this.input.focus(options);
      }
      /** Removes focus from the checkbox. */
      blur() {
        this.input.blur();
      }
      /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
      checkValidity() {
        return this.input.checkValidity();
      }
      /** Gets the associated form, if one exists. */
      getForm() {
        return this.formControlController.getForm();
      }
      /** Checks for validity and shows the browser's validation message if the control is invalid. */
      reportValidity() {
        return this.input.reportValidity();
      }
      /**
       * Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear
       * the custom validation message, call this method with an empty string.
       */
      setCustomValidity(message) {
        this.input.setCustomValidity(message);
        this.formControlController.updateValidity();
      }
      render() {
        const hasHelpTextSlot = this.hasSlotController.test("help-text");
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
        return b2`
      <div
        class=${e7({
          "form-control": true,
          "form-control--small": this.size === "small",
          "form-control--medium": this.size === "medium",
          "form-control--large": this.size === "large",
          "form-control--has-help-text": hasHelpText
        })}
      >
        <label
          part="base"
          class=${e7({
          checkbox: true,
          "checkbox--checked": this.checked,
          "checkbox--disabled": this.disabled,
          "checkbox--focused": this.hasFocus,
          "checkbox--indeterminate": this.indeterminate,
          "checkbox--small": this.size === "small",
          "checkbox--medium": this.size === "medium",
          "checkbox--large": this.size === "large"
        })}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${o7(this.value)}
            .indeterminate=${l5(this.indeterminate)}
            .checked=${l5(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked ? "true" : "false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked ? " control--checked" : ""}${this.indeterminate ? " control--indeterminate" : ""}"
            class="checkbox__control"
          >
            ${this.checked ? b2`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                ` : ""}
            ${!this.checked && this.indeterminate ? b2`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                ` : ""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${hasHelpText ? "false" : "true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
      }
    };
    SlCheckbox.styles = [component_styles_default, form_control_styles_default, checkbox_styles_default];
    SlCheckbox.dependencies = { "sl-icon": SlIcon };
    __decorateClass([
      e5('input[type="checkbox"]')
    ], SlCheckbox.prototype, "input", 2);
    __decorateClass([
      r5()
    ], SlCheckbox.prototype, "hasFocus", 2);
    __decorateClass([
      n4()
    ], SlCheckbox.prototype, "title", 2);
    __decorateClass([
      n4()
    ], SlCheckbox.prototype, "name", 2);
    __decorateClass([
      n4()
    ], SlCheckbox.prototype, "value", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlCheckbox.prototype, "size", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlCheckbox.prototype, "disabled", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlCheckbox.prototype, "checked", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlCheckbox.prototype, "indeterminate", 2);
    __decorateClass([
      defaultValue("checked")
    ], SlCheckbox.prototype, "defaultChecked", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlCheckbox.prototype, "form", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlCheckbox.prototype, "required", 2);
    __decorateClass([
      n4({ attribute: "help-text" })
    ], SlCheckbox.prototype, "helpText", 2);
    __decorateClass([
      watch("disabled", { waitUntilFirstUpdate: true })
    ], SlCheckbox.prototype, "handleDisabledChange", 1);
    __decorateClass([
      watch(["checked", "indeterminate"], { waitUntilFirstUpdate: true })
    ], SlCheckbox.prototype, "handleStateChange", 1);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.D5YQDJ7X.js
var init_chunk_D5YQDJ7X = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.D5YQDJ7X.js"() {
    init_chunk_XSFJLY2D();
    SlCheckbox.define("sl-checkbox");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/checkbox/checkbox.js
var init_checkbox = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/checkbox/checkbox.js"() {
    init_chunk_D5YQDJ7X();
    init_chunk_XSFJLY2D();
    init_chunk_R3NF57O3();
    init_chunk_GI7VDIWX();
    init_chunk_SI4ACBFK();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_YHLNUJ7P();
    init_chunk_ZL53POKZ();
    init_chunk_P7ZG6EMR();
    init_chunk_3TFKS637();
    init_chunk_QLXRCYS4();
    init_chunk_3Y6SB6QS();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GXC456DW.js
var progress_bar_styles_default;
var init_chunk_GXC456DW = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GXC456DW.js"() {
    init_lit();
    progress_bar_styles_default = i`
  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`;
  }
});

// node_modules/lit-html/directives/style-map.js
var n6, i8, o9;
var init_style_map = __esm({
  "node_modules/lit-html/directives/style-map.js"() {
    init_lit_html();
    init_directive();
    n6 = "important";
    i8 = " !" + n6;
    o9 = e6(class extends i5 {
      constructor(t6) {
        if (super(t6), t6.type !== t5.ATTRIBUTE || "style" !== t6.name || t6.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
      }
      render(t6) {
        return Object.keys(t6).reduce((e10, r8) => {
          const s4 = t6[r8];
          return null == s4 ? e10 : e10 + `${r8 = r8.includes("-") ? r8 : r8.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s4};`;
        }, "");
      }
      update(e10, [r8]) {
        const { style: s4 } = e10.element;
        if (void 0 === this.ft) return this.ft = new Set(Object.keys(r8)), this.render(r8);
        for (const t6 of this.ft) null == r8[t6] && (this.ft.delete(t6), t6.includes("-") ? s4.removeProperty(t6) : s4[t6] = null);
        for (const t6 in r8) {
          const e11 = r8[t6];
          if (null != e11) {
            this.ft.add(t6);
            const r9 = "string" == typeof e11 && e11.endsWith(i8);
            t6.includes("-") || r9 ? s4.setProperty(t6, r9 ? e11.slice(0, -11) : e11, r9 ? n6 : "") : s4[t6] = e11;
          }
        }
        return E;
      }
    });
  }
});

// node_modules/lit/directives/style-map.js
var init_style_map2 = __esm({
  "node_modules/lit/directives/style-map.js"() {
    init_style_map();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AQHH2BKL.js
var SlProgressBar;
var init_chunk_AQHH2BKL = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AQHH2BKL.js"() {
    init_chunk_GXC456DW();
    init_chunk_6CTB5ZDJ();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_if_defined2();
    init_decorators();
    init_style_map2();
    SlProgressBar = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.localize = new LocalizeController2(this);
        this.value = 0;
        this.indeterminate = false;
        this.label = "";
      }
      render() {
        return b2`
      <div
        part="base"
        class=${e7({
          "progress-bar": true,
          "progress-bar--indeterminate": this.indeterminate,
          "progress-bar--rtl": this.localize.dir() === "rtl"
        })}
        role="progressbar"
        title=${o7(this.title)}
        aria-label=${this.label.length > 0 ? this.label : this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? 0 : this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${o9({ width: `${this.value}%` })}>
          ${!this.indeterminate ? b2` <slot part="label" class="progress-bar__label"></slot> ` : ""}
        </div>
      </div>
    `;
      }
    };
    SlProgressBar.styles = [component_styles_default, progress_bar_styles_default];
    __decorateClass([
      n4({ type: Number, reflect: true })
    ], SlProgressBar.prototype, "value", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlProgressBar.prototype, "indeterminate", 2);
    __decorateClass([
      n4()
    ], SlProgressBar.prototype, "label", 2);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3XI76F3K.js
var init_chunk_3XI76F3K = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3XI76F3K.js"() {
    init_chunk_AQHH2BKL();
    SlProgressBar.define("sl-progress-bar");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js
var init_progress_bar = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js"() {
    init_chunk_3XI76F3K();
    init_chunk_AQHH2BKL();
    init_chunk_GXC456DW();
    init_chunk_6CTB5ZDJ();
    init_chunk_7BTDLTNI();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6KE6SBMU.js
var textarea_styles_default;
var init_chunk_6KE6SBMU = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6KE6SBMU.js"() {
    init_lit();
    textarea_styles_default = i`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3IETUAU.js
var SlTextarea;
var init_chunk_Q3IETUAU = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3IETUAU.js"() {
    init_chunk_6KE6SBMU();
    init_chunk_GI7VDIWX();
    init_chunk_SI4ACBFK();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
    init_class_map2();
    init_lit();
    init_if_defined2();
    init_live2();
    init_decorators();
    SlTextarea = class extends ShoelaceElement {
      constructor() {
        super(...arguments);
        this.formControlController = new FormControlController(this, {
          assumeInteractionOn: ["sl-blur", "sl-input"]
        });
        this.hasSlotController = new HasSlotController(this, "help-text", "label");
        this.hasFocus = false;
        this.title = "";
        this.name = "";
        this.value = "";
        this.size = "medium";
        this.filled = false;
        this.label = "";
        this.helpText = "";
        this.placeholder = "";
        this.rows = 4;
        this.resize = "vertical";
        this.disabled = false;
        this.readonly = false;
        this.form = "";
        this.required = false;
        this.spellcheck = true;
        this.defaultValue = "";
      }
      /** Gets the validity state object */
      get validity() {
        return this.input.validity;
      }
      /** Gets the validation message */
      get validationMessage() {
        return this.input.validationMessage;
      }
      connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
        this.updateComplete.then(() => {
          this.setTextareaHeight();
          this.resizeObserver.observe(this.input);
        });
      }
      firstUpdated() {
        this.formControlController.updateValidity();
      }
      disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        if (this.input) {
          (_a = this.resizeObserver) == null ? void 0 : _a.unobserve(this.input);
        }
      }
      handleBlur() {
        this.hasFocus = false;
        this.emit("sl-blur");
      }
      handleChange() {
        this.value = this.input.value;
        this.setTextareaHeight();
        this.emit("sl-change");
      }
      handleFocus() {
        this.hasFocus = true;
        this.emit("sl-focus");
      }
      handleInput() {
        this.value = this.input.value;
        this.emit("sl-input");
      }
      handleInvalid(event) {
        this.formControlController.setValidity(false);
        this.formControlController.emitInvalidEvent(event);
      }
      setTextareaHeight() {
        if (this.resize === "auto") {
          this.sizeAdjuster.style.height = `${this.input.clientHeight}px`;
          this.input.style.height = "auto";
          this.input.style.height = `${this.input.scrollHeight}px`;
        } else {
          this.input.style.height = "";
        }
      }
      handleDisabledChange() {
        this.formControlController.setValidity(this.disabled);
      }
      handleRowsChange() {
        this.setTextareaHeight();
      }
      async handleValueChange() {
        await this.updateComplete;
        this.formControlController.updateValidity();
        this.setTextareaHeight();
      }
      /** Sets focus on the textarea. */
      focus(options) {
        this.input.focus(options);
      }
      /** Removes focus from the textarea. */
      blur() {
        this.input.blur();
      }
      /** Selects all the text in the textarea. */
      select() {
        this.input.select();
      }
      /** Gets or sets the textarea's scroll position. */
      scrollPosition(position) {
        if (position) {
          if (typeof position.top === "number") this.input.scrollTop = position.top;
          if (typeof position.left === "number") this.input.scrollLeft = position.left;
          return void 0;
        }
        return {
          top: this.input.scrollTop,
          left: this.input.scrollTop
        };
      }
      /** Sets the start and end positions of the text selection (0-based). */
      setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
        this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
      }
      /** Replaces a range of text with a new string. */
      setRangeText(replacement, start, end, selectMode = "preserve") {
        const selectionStart = start != null ? start : this.input.selectionStart;
        const selectionEnd = end != null ? end : this.input.selectionEnd;
        this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
        if (this.value !== this.input.value) {
          this.value = this.input.value;
          this.setTextareaHeight();
        }
      }
      /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
      checkValidity() {
        return this.input.checkValidity();
      }
      /** Gets the associated form, if one exists. */
      getForm() {
        return this.formControlController.getForm();
      }
      /** Checks for validity and shows the browser's validation message if the control is invalid. */
      reportValidity() {
        return this.input.reportValidity();
      }
      /** Sets a custom validation message. Pass an empty string to restore validity. */
      setCustomValidity(message) {
        this.input.setCustomValidity(message);
        this.formControlController.updateValidity();
      }
      render() {
        const hasLabelSlot = this.hasSlotController.test("label");
        const hasHelpTextSlot = this.hasSlotController.test("help-text");
        const hasLabel = this.label ? true : !!hasLabelSlot;
        const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
        return b2`
      <div
        part="form-control"
        class=${e7({
          "form-control": true,
          "form-control--small": this.size === "small",
          "form-control--medium": this.size === "medium",
          "form-control--large": this.size === "large",
          "form-control--has-label": hasLabel,
          "form-control--has-help-text": hasHelpText
        })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e7({
          textarea: true,
          "textarea--small": this.size === "small",
          "textarea--medium": this.size === "medium",
          "textarea--large": this.size === "large",
          "textarea--standard": !this.filled,
          "textarea--filled": this.filled,
          "textarea--disabled": this.disabled,
          "textarea--focused": this.hasFocus,
          "textarea--empty": !this.value,
          "textarea--resize-none": this.resize === "none",
          "textarea--resize-vertical": this.resize === "vertical",
          "textarea--resize-auto": this.resize === "auto"
        })}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${o7(this.name)}
              .value=${l5(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o7(this.placeholder)}
              rows=${o7(this.rows)}
              minlength=${o7(this.minlength)}
              maxlength=${o7(this.maxlength)}
              autocapitalize=${o7(this.autocapitalize)}
              autocorrect=${o7(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${o7(this.spellcheck)}
              enterkeyhint=${o7(this.enterkeyhint)}
              inputmode=${o7(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${this.resize !== "auto"}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
      }
    };
    SlTextarea.styles = [component_styles_default, form_control_styles_default, textarea_styles_default];
    __decorateClass([
      e5(".textarea__control")
    ], SlTextarea.prototype, "input", 2);
    __decorateClass([
      e5(".textarea__size-adjuster")
    ], SlTextarea.prototype, "sizeAdjuster", 2);
    __decorateClass([
      r5()
    ], SlTextarea.prototype, "hasFocus", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "title", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "name", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "value", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlTextarea.prototype, "size", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlTextarea.prototype, "filled", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "label", 2);
    __decorateClass([
      n4({ attribute: "help-text" })
    ], SlTextarea.prototype, "helpText", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "placeholder", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlTextarea.prototype, "rows", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "resize", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlTextarea.prototype, "disabled", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlTextarea.prototype, "readonly", 2);
    __decorateClass([
      n4({ reflect: true })
    ], SlTextarea.prototype, "form", 2);
    __decorateClass([
      n4({ type: Boolean, reflect: true })
    ], SlTextarea.prototype, "required", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlTextarea.prototype, "minlength", 2);
    __decorateClass([
      n4({ type: Number })
    ], SlTextarea.prototype, "maxlength", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "autocapitalize", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "autocorrect", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "autocomplete", 2);
    __decorateClass([
      n4({ type: Boolean })
    ], SlTextarea.prototype, "autofocus", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "enterkeyhint", 2);
    __decorateClass([
      n4({
        type: Boolean,
        converter: {
          // Allow "true|false" attribute values but keep the property boolean
          fromAttribute: (value) => !value || value === "false" ? false : true,
          toAttribute: (value) => value ? "true" : "false"
        }
      })
    ], SlTextarea.prototype, "spellcheck", 2);
    __decorateClass([
      n4()
    ], SlTextarea.prototype, "inputmode", 2);
    __decorateClass([
      defaultValue()
    ], SlTextarea.prototype, "defaultValue", 2);
    __decorateClass([
      watch("disabled", { waitUntilFirstUpdate: true })
    ], SlTextarea.prototype, "handleDisabledChange", 1);
    __decorateClass([
      watch("rows", { waitUntilFirstUpdate: true })
    ], SlTextarea.prototype, "handleRowsChange", 1);
    __decorateClass([
      watch("value", { waitUntilFirstUpdate: true })
    ], SlTextarea.prototype, "handleValueChange", 1);
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.WMS2VUJ6.js
var init_chunk_WMS2VUJ6 = __esm({
  "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.WMS2VUJ6.js"() {
    init_chunk_Q3IETUAU();
    SlTextarea.define("sl-textarea");
  }
});

// node_modules/@shoelace-style/shoelace/dist/components/textarea/textarea.js
var init_textarea = __esm({
  "node_modules/@shoelace-style/shoelace/dist/components/textarea/textarea.js"() {
    init_chunk_WMS2VUJ6();
    init_chunk_Q3IETUAU();
    init_chunk_6KE6SBMU();
    init_chunk_GI7VDIWX();
    init_chunk_SI4ACBFK();
    init_chunk_3RPBFEDE();
    init_chunk_NYIIDP5N();
    init_chunk_GMYPQTFK();
    init_chunk_TUVJKY7S();
    init_chunk_4TUIT776();
    init_chunk_KAW7D32O();
  }
});

// shoelace-entry.js
var require_shoelace_entry = __commonJS({
  "shoelace-entry.js"() {
    init_button();
    init_button_group();
    init_tag();
    init_radio();
    init_radio_group();
    init_details();
    init_range();
    init_input();
    init_select();
    init_option();
    init_checkbox();
    init_progress_bar();
    init_textarea();
  }
});
export default require_shoelace_entry();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/static.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
