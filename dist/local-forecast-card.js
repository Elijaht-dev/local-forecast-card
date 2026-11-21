/*!
MIT License

Copyright (c) 2026 Local Forecast contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
const O = globalThis, L = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, j = /* @__PURE__ */ Symbol(), W = /* @__PURE__ */ new WeakMap();
let st = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== j) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (L && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = W.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && W.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ct = (r) => new st(typeof r == "string" ? r : r + "", void 0, j), it = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new st(e, r, j);
}, dt = (r, t) => {
  if (L) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = O.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, F = L ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ct(e);
})(r) : r;
const { is: ut, defineProperty: pt, getOwnPropertyDescriptor: ft, getOwnPropertyNames: $t, getOwnPropertySymbols: gt, getPrototypeOf: _t } = Object, N = globalThis, V = N.trustedTypes, mt = V ? V.emptyScript : "", yt = N.reactiveElementPolyfillSupport, S = (r, t) => r, z = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? mt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, rt = (r, t) => !ut(r, t), q = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), N.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && pt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const h = i?.call(this);
      o?.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = _t(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, s = [...$t(e), ...gt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(F(i));
    } else t !== void 0 && e.push(F(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : z).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : z;
      this._$Em = i;
      const h = n.fromAttribute(e, o.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? rt)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, o] of s) {
        const { wrapped: n } = o, h = this[i];
        n !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, o, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[S("elementProperties")] = /* @__PURE__ */ new Map(), v[S("finalized")] = /* @__PURE__ */ new Map(), yt?.({ ReactiveElement: v }), (N.reactiveElementVersions ??= []).push("2.1.2");
const D = globalThis, K = (r) => r, H = D.trustedTypes, Z = H ? H.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ot = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, nt = "?" + g, vt = `<${nt}>`, y = document, x = () => y.createComment(""), C = (r) => r === null || typeof r != "object" && typeof r != "function", I = Array.isArray, At = (r) => I(r) || typeof r?.[Symbol.iterator] == "function", M = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, G = />/g, _ = RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, X = /"/g, at = /^(?:script|style|textarea|title)$/i, bt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = bt(1), b = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), Y = /* @__PURE__ */ new WeakMap(), m = y.createTreeWalker(y, 129);
function ht(r, t) {
  if (!I(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(t) : t;
}
const wt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = E;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, u, l = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, u = n.exec(a), u !== null); ) f = n.lastIndex, n === E ? u[1] === "!--" ? n = J : u[1] !== void 0 ? n = G : u[2] !== void 0 ? (at.test(u[2]) && (i = RegExp("</" + u[2], "g")), n = _) : u[3] !== void 0 && (n = _) : n === _ ? u[0] === ">" ? (n = i ?? E, l = -1) : u[1] === void 0 ? l = -2 : (l = n.lastIndex - u[2].length, c = u[1], n = u[3] === void 0 ? _ : u[3] === '"' ? X : Q) : n === X || n === Q ? n = _ : n === J || n === G ? n = E : (n = _, i = void 0);
    const $ = n === _ && r[h + 1].startsWith("/>") ? " " : "";
    o += n === E ? a + vt : l >= 0 ? (s.push(c), a.slice(0, l) + ot + a.slice(l) + g + $) : a + g + (l === -2 ? h : $);
  }
  return [ht(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class P {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [c, u] = wt(t, e);
    if (this.el = P.createElement(c, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(ot)) {
          const f = u[n++], $ = i.getAttribute(l).split(g), k = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: k[2], strings: $, ctor: k[1] === "." ? St : k[1] === "?" ? xt : k[1] === "@" ? Ct : T }), i.removeAttribute(l);
        } else l.startsWith(g) && (a.push({ type: 6, index: o }), i.removeAttribute(l));
        if (at.test(i.tagName)) {
          const l = i.textContent.split(g), f = l.length - 1;
          if (f > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let $ = 0; $ < f; $++) i.append(l[$], x()), m.nextNode(), a.push({ type: 2, index: ++o });
            i.append(l[f], x());
          }
        }
      } else if (i.nodeType === 8) if (i.data === nt) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(g, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += g.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function w(r, t, e = r, s) {
  if (t === b) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = C(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = w(r, i._$AS(r, t.values), i, s)), t;
}
class Et {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? y).importNode(e, !0);
    m.currentNode = i;
    let o = m.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new U(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new Pt(o, this, t)), this._$AV.push(c), a = s[++h];
      }
      n !== a?.index && (o = m.nextNode(), n++);
    }
    return m.currentNode = y, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = w(this, t, e), C(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : At(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && C(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(ht(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new Et(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Y.get(t.strings);
    return e === void 0 && Y.set(t.strings, e = new P(t)), e;
  }
  k(t) {
    I(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new U(this.O(x()), this.O(x()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = K(t).nextSibling;
      K(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class T {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = w(this, t, e, 0), n = !C(t) || t !== this._$AH && t !== b, n && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = w(this, h[s + a], e, a), c === b && (c = this._$AH[a]), n ||= !C(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class St extends T {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class xt extends T {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Ct extends T {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = w(this, t, e, 0) ?? d) === b) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Pt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    w(this, t);
  }
}
const Ut = D.litHtmlPolyfillSupport;
Ut?.(P, U), (D.litHtmlVersions ??= []).push("3.3.3");
const kt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = i = new U(t.insertBefore(x(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const B = globalThis;
class A extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = kt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return b;
  }
}
A._$litElement$ = !0, A.finalized = !0, B.litElementHydrateSupport?.({ LitElement: A });
const Ot = B.litElementPolyfillSupport;
Ot?.({ LitElement: A });
(B.litElementVersions ??= []).push("4.2.2");
const Ht = {
  paused: "Publishing is paused for this project.",
  expired: "This forecast has expired.",
  waiting: "Waiting for the first published forecast.",
  running: "The forecast is running.",
  error: "Open Forecast Lab to see why the forecast is unavailable."
};
let R;
const tt = "/local_forecast_static/forecast-lab.js";
function Nt(r) {
  return customElements.get("local-forecast-chart") ? Promise.resolve() : (R ??= r.callWS({ type: "get_panels" }).then((t) => {
    const e = t["forecast-lab"]?.config?._panel_custom?.module_url;
    return import(e?.startsWith(tt + "?") ? e : tt);
  }).catch((t) => {
    throw R = void 0, t;
  }), R);
}
function lt(r) {
  return Object.entries(r?.states ?? {}).filter(([t, e]) => t.startsWith("sensor.") && e.attributes.forecast_status !== void 0).map(([t]) => t).sort();
}
function et(r) {
  return r.wh === null ? "Unavailable" : `${(r.wh / 1e3).toLocaleString(void 0, { maximumFractionDigits: 2 })} kWh${r.complete ? "" : " (partial)"}`;
}
class Tt extends A {
  constructor() {
    super(...arguments), this.error = "", this.pending = !1, this.stateKey = "";
  }
  static {
    this.properties = {
      hass: {},
      config: { state: !0 },
      result: { state: !0 },
      error: { state: !0 }
    };
  }
  static {
    this.styles = it`
    :host { display: block; min-width: 0; }
    section { padding: 16px; min-width: 0; }
    header { display: flex; gap: 8px 16px; flex-wrap: wrap; align-items: baseline; justify-content: space-between; margin-bottom: 6px; }
    h2 { font-size: 18px; line-height: 1.3; margin: 0; font-weight: 650; }
    .muted { color: var(--secondary-text-color); font-size: 12px; }
    .stale { color: var(--warning-color, #9d5d00); }
    local-forecast-chart { --lf-chart-height: clamp(220px, 36vw, 300px); }
    dl { display: flex; flex-wrap: wrap; gap: 8px 24px; margin: 8px 0 0; padding-top: 12px; border-top: 1px solid var(--divider-color); }
    dt { font-size: 12px; color: var(--secondary-text-color); }
    dd { margin: 1px 0 0; font-weight: 600; }
  `;
  }
  static getConfigElement() {
    return document.createElement("local-forecast-card-editor");
  }
  static getStubConfig(t) {
    return { entity: lt(t)[0] ?? "", horizon_hours: 48, show_uncertainty: !0, show_solar_summary: !0 };
  }
  setConfig(t) {
    if (!t.entity || !/^sensor\.[a-z0-9_]+$/.test(t.entity))
      throw new Error("Choose a Local Forecast sensor.");
    for (const [e, s, i] of [["horizon_hours", t.horizon_hours, 168], ["history_hours", t.history_hours, 48]])
      if (s !== void 0 && (!Number.isInteger(s) || s < 1 || s > i))
        throw new Error(`${e} must be between 1 and ${i}.`);
    this.config?.entity !== t.entity && (this.result = void 0, this.error = "", this.stateKey = ""), this.config = { ...t };
  }
  getCardSize() {
    return 5;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = setInterval(() => {
      this.refresh();
    }, 3e4);
  }
  disconnectedCallback() {
    clearInterval(this.timer), super.disconnectedCallback();
  }
  updated(t) {
    if (!this.config || !this.hass) return;
    const e = this.hass.states[this.config.entity]?.attributes, s = `${this.config.entity}/${e?.issued_at}/${e?.forecast_status}`;
    (s !== this.stateKey || t.has("config")) && (this.stateKey = s, this.refresh());
  }
  async refresh() {
    const t = this.config?.entity;
    if (!(!t || !this.hass || !this.isConnected || this.pending)) {
      this.pending = !0;
      try {
        const e = await this.hass.callWS({ type: "local_forecast/card", entity_id: t });
        e.forecast && await Nt(this.hass), this.config?.entity === t && (this.error = "", this.result = e);
      } catch (e) {
        this.config?.entity === t && (this.result = void 0, this.error = typeof e == "object" && e !== null && "message" in e ? String(e.message) : "Could not load the forecast. Check that the integration is installed.");
      } finally {
        this.pending = !1, this.config?.entity !== t && this.refresh();
      }
    }
  }
  render() {
    const t = this.result, e = t?.forecast, s = this.config, i = s?.horizon_hours ?? 48, o = s?.history_hours ?? 24, n = (h) => new Date(h * 1e3).toLocaleString(void 0, {
      timeZone: e?.timezone,
      dateStyle: "short",
      timeStyle: "short"
    });
    return p`<ha-card><section>
      <header><h2>${s?.title || t?.name || "Local Forecast"}</h2>
        ${e ? p`<span class=${`muted ${t?.status === "stale" ? "stale" : ""}`}>
          ${t?.status === "stale" ? "Stale · " : ""}Issued ${n(e.issued_at)}
        </span>` : d}
      </header>
      ${this.error ? p`<p role="alert">${this.error}</p>` : e ? p`<local-forecast-chart
          .actual=${e.actual.filter((h) => h.start >= e.cutoff - o * 3600)}
          .points=${e.points.filter((h) => h.start < e.cutoff + i * 3600)}
          .timezone=${e.timezone} .unit=${e.unit} .cutoff=${e.cutoff}
          .modelLabel=${e.model} .showBand=${s?.show_uncertainty ?? !0}
          .dark=${!!this.hass?.themes?.darkMode}></local-forecast-chart>
          ${e.solar && s?.show_solar_summary !== !1 ? p`<dl>
            <div><dt>Remaining today</dt><dd>${et(e.solar.today_remaining)}</dd></div>
            <div><dt>Tomorrow</dt><dd>${et(e.solar.tomorrow)}</dd></div>
            ${e.solar.peak ? p`<div><dt>Peak · ${n(e.solar.peak.start)}</dt>
              <dd>${e.solar.peak.watts.toLocaleString(void 0, { maximumFractionDigits: 0 })} W</dd></div>` : d}
          </dl>` : d}
        ` : p`<p role="status">${t ? Ht[t.status] ?? "No forecast is available." : "Loading forecast…"}</p>`}
    </section></ha-card>`;
  }
}
class Mt extends A {
  constructor() {
    super(...arguments), this.config = { entity: "" };
  }
  static {
    this.properties = { hass: {}, config: { state: !0 } };
  }
  static {
    this.styles = it`
    :host { display: grid; gap: 12px; padding: 8px 0; }
    label { display: grid; gap: 5px; min-width: 0; }
    input:not([type=checkbox]), select { border: 1px solid var(--divider-color); border-radius: 6px; padding: 8px; width: 100%; box-sizing: border-box; font: inherit; color: inherit; background: var(--card-background-color); }
    label.check { display: flex; align-items: center; gap: 7px; }
    input[type=checkbox] { accent-color: var(--primary-color); }
  `;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  updateConfig(t, e) {
    this.config = { ...this.config, [t]: e }, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this.config }, bubbles: !0, composed: !0 }));
  }
  render() {
    const t = [...new Set([this.config.entity, ...lt(this.hass)].filter(Boolean))], e = (i, o, n, h) => p`<label>${o}<input type="number" min="1" max=${h} .value=${String(this.config[i] ?? n)}
        @change=${(a) => {
      const c = a.target.valueAsNumber;
      Number.isInteger(c) && c >= 1 && c <= h && this.updateConfig(i, c);
    }}></label>`, s = (i, o) => p`<label class="check"><input type="checkbox" .checked=${this.config[i] !== !1}
        @change=${(n) => this.updateConfig(i, n.target.checked)}>${o}</label>`;
    return p`<label>Forecast entity<select .value=${this.config.entity}
      @change=${(i) => this.updateConfig("entity", i.target.value)}>
      <option value="" disabled ?selected=${!this.config.entity}>Select a forecast sensor</option>
      ${t.map((i) => p`<option value=${i} ?selected=${i === this.config.entity}>
        ${String(this.hass?.states[i]?.attributes.friendly_name ?? i)}</option>`)}
    </select></label>
    <label>Title<input .value=${this.config.title ?? ""}
      @change=${(i) => this.updateConfig("title", i.target.value)}></label>
    ${e("horizon_hours", "Forecast hours", 48, 168)}
    ${e("history_hours", "History hours", 24, 48)}
    ${s("show_uncertainty", "Show uncertainty band")}
    ${s("show_solar_summary", "Show solar summary")}`;
  }
}
if (!customElements.get("local-forecast-card")) {
  customElements.define("local-forecast-card", Tt), customElements.define("local-forecast-card-editor", Mt);
  const r = window;
  (r.customCards ??= []).push({
    type: "local-forecast-card",
    name: "Local Forecast",
    preview: !0,
    description: "Plot actual and predicted values from a Local Forecast project."
  });
}
export {
  Tt as LocalForecastCard
};
