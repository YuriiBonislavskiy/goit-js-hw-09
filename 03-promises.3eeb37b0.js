function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,t){r[e]=t},t.parcelRequired7c6=n);var u=n("7Y9D8");const i={form:document.querySelector("form")},l=i.form.className.toString();function a(t,o,r){setTimeout((()=>{new Promise(((e,r)=>{Math.random()>.3&&e(`✅ Fulfilled promise ${t} in ${o}ms`),r(`❌ Rejected promise ${t} in ${o}ms`)})).then((t=>{e(u).Notify.success(t,{timeout:r})})).catch((t=>{e(u).Notify.failure(t,{timeout:r})}))}),o)}new FormData(i.form).forEach(((e,t)=>{i[t]=i.form.querySelector(`.${l} [name="${t}"]`)})),i.form.addEventListener("submit",(function(e){e.preventDefault();let t=Number(i.delay.value);const o=Number(i.step.value);let r=t+(Number(i.amount.value)-1)*o;for(let e=1;e<=Number(i.amount.value);e+=1)a(e,t,r),t+=o,r-=o}));
//# sourceMappingURL=03-promises.3eeb37b0.js.map