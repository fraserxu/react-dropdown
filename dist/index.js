import { forwardRef as e, useCallback as t, useEffect as n, useId as r, useImperativeHandle as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/index.tsx
var ee = "Select...";
function u(...e) {
	return e.filter(Boolean).join(" ");
}
function te(e) {
	return typeof e == "object" && !!e && "type" in e && e.type === "group";
}
function d(e) {
	return typeof e == "object" && !!e && "value" in e && "label" in e;
}
function f(e) {
	return d(e) ? e : {
		value: e,
		label: String(e)
	};
}
function p(e) {
	return d(e) ? e.value : e;
}
function ne(e, t) {
	return Object.is(e.value, p(t));
}
function m(e, t, n) {
	if (e.length === 0) return -1;
	for (let r = 1; r <= e.length; r += 1) {
		let i = (t + n * r + e.length) % e.length;
		if (!e[i]?.option.disabled) return i;
	}
	return -1;
}
var h = e(function({ options: e, value: d, defaultValue: p = null, open: h, defaultOpen: re = !1, placeholder: ie = ee, disabled: g = !1, name: _, form: ae, id: oe, tabIndex: se, baseClassName: v = "Dropdown", className: y, controlClassName: b, placeholderClassName: x, menuClassName: S, optionClassName: C, arrowClassName: ce, arrowClosed: w, arrowOpen: T, noOptionsContent: le = "No options found", renderOption: E, onChange: ue, onFocus: de, onOpenChange: D, "aria-label": fe, "aria-labelledby": O, "aria-required": pe }, me) {
	let he = r(), k = o(null), A = o(null), [j, M] = s(p), [N, P] = s(re), [F, I] = s(-1), L = d !== void 0, R = h !== void 0, z = L ? d : j, B = R ? h : N, V = oe ?? `react-dropdown-${he}`, H = `${V}-listbox`;
	i(me, () => A.current, []);
	let { entries: U, flatOptions: W } = a(() => {
		let t = [], n = [], r = (e, t) => {
			let r = f(e), i = {
				option: r,
				index: n.length,
				key: `${t}-${typeof r.value}-${String(r.value)}`
			};
			return n.push(i), i;
		};
		return e.forEach((e, n) => {
			te(e) ? t.push({
				type: "group",
				key: `group-${n}`,
				name: e.name,
				items: e.items.map((e, t) => r(e, `${n}-${t}`))
			}) : t.push({
				type: "option",
				item: r(e, String(n))
			});
		}), {
			entries: t,
			flatOptions: n
		};
	}, [e]), G = a(() => W.find(({ option: e }) => ne(e, z))?.option, [z, W]), K = G ? W.findIndex(({ option: e }) => Object.is(e.value, G.value)) : -1, q = W[F], J = q && !q.option.disabled ? F : -1, Y = t((e) => {
		e !== B && (R || P(e), D?.(e));
	}, [
		B,
		R,
		D
	]), X = t((e = 1) => {
		if (K >= 0 && !W[K]?.option.disabled) {
			I(K);
			return;
		}
		I(m(W, e === 1 ? -1 : 0, e));
	}, [W, K]), Z = (e = 1) => {
		g || (X(e), Y(!0));
	}, Q = (e) => {
		e.disabled || (L || M(e), ue?.(e), Y(!1), A.current?.focus());
	}, ge = (e) => {
		switch (e.key) {
			case "ArrowDown":
			case "ArrowUp": {
				e.preventDefault();
				let t = e.key === "ArrowDown" ? 1 : -1;
				B ? I((e) => m(W, e, t)) : Z(t);
				break;
			}
			case "Enter":
			case " ":
				if (e.preventDefault(), !B) Z();
				else if (J >= 0) {
					let e = W[J];
					e && Q(e.option);
				}
				break;
			case "Escape":
				B && (e.preventDefault(), Y(!1));
				break;
			case "Home":
			case "End":
				if (B) {
					e.preventDefault();
					let t = e.key === "Home" ? 1 : -1;
					I(m(W, t === 1 ? -1 : 0, t));
				}
				break;
			case "Tab":
				Y(!1);
				break;
			default: break;
		}
	};
	n(() => {
		if (!B) return;
		let e = (e) => {
			k.current?.contains(e.target) || Y(!1);
		};
		return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
	}, [B, Y]), n(() => {
		B && (F < 0 || F >= W.length || W[F]?.option.disabled) && X();
	}, [
		F,
		X,
		W,
		B
	]);
	let $ = ({ option: e, index: t, key: n }) => {
		let r = G ? Object.is(e.value, G.value) : !1, i = t === J, a = {
			active: i,
			selected: r
		}, o = typeof C == "function" ? C(e, a) : C, s = Object.fromEntries(Object.entries(e.data ?? {}).map(([e, t]) => [`data-${e}`, t]));
		return /* @__PURE__ */ c("li", {
			id: `${H}-option-${t}`,
			className: u(`${v}-option`, e.className, o, r && "is-selected", i && "is-active", e.disabled && "is-disabled"),
			role: "option",
			"aria-selected": r,
			"aria-disabled": e.disabled || void 0,
			onClick: () => Q(e),
			onPointerDown: (e) => e.preventDefault(),
			onPointerMove: () => !e.disabled && I(t),
			...s,
			children: E ? E(e, a) : e.label
		}, n);
	};
	return /* @__PURE__ */ l("div", {
		ref: k,
		className: u(`${v}-root`, y, B && "is-open"),
		children: [
			/* @__PURE__ */ l("button", {
				ref: A,
				id: V,
				className: u(`${v}-control`, b, g && `${v}-disabled`),
				type: "button",
				tabIndex: se,
				role: "combobox",
				"aria-label": fe,
				"aria-labelledby": O,
				"aria-controls": B ? H : void 0,
				"aria-expanded": B,
				"aria-haspopup": "listbox",
				"aria-activedescendant": B && J >= 0 ? `${H}-option-${J}` : void 0,
				"aria-required": pe,
				disabled: g,
				onBlur: () => Y(!1),
				onClick: () => B ? Y(!1) : Z(),
				onFocus: () => de?.(B),
				onKeyDown: ge,
				children: [/* @__PURE__ */ c("span", {
					className: u(`${v}-placeholder`, x, G && "is-selected"),
					children: G?.label ?? ie
				}), /* @__PURE__ */ c("span", {
					className: `${v}-arrow-wrapper`,
					"aria-hidden": "true",
					children: T !== void 0 && w !== void 0 ? B ? T : w : /* @__PURE__ */ c("span", { className: u(`${v}-arrow`, ce) })
				})]
			}),
			_ ? /* @__PURE__ */ c("input", {
				type: "hidden",
				name: _,
				form: ae,
				value: G ? String(G.value) : ""
			}) : null,
			B ? /* @__PURE__ */ c("ul", {
				id: H,
				className: u(`${v}-menu`, S),
				role: "listbox",
				children: U.length > 0 ? U.map((e) => {
					if (e.type === "option") return $(e.item);
					let t = `${H}-${e.key}-label`;
					return /* @__PURE__ */ l("li", {
						className: `${v}-group`,
						role: "presentation",
						children: [/* @__PURE__ */ c("div", {
							id: t,
							className: `${v}-title`,
							role: "presentation",
							children: e.name
						}), /* @__PURE__ */ c("ul", {
							role: "group",
							"aria-labelledby": t,
							children: e.items.map($)
						})]
					}, e.key);
				}) : /* @__PURE__ */ c("li", {
					className: `${v}-noresults`,
					role: "presentation",
					children: le
				})
			}) : null
		]
	});
});
h.displayName = "Dropdown";
//#endregion
export { h as default };

//# sourceMappingURL=index.js.map