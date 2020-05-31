//
// utils.js
// -----------------------------------

/**
 * HTMLの特殊文字をエスケープするタグ付きテンプレート関数
 * @param {TemplateStringsArray} strings 
 * @param {any[]}                values 
 * @return {string}
 * @example
 * ```js
 * const unsafe = '<script>alert("xss")</script>'
 * console.log(escapeHTML`<div>${ unsafe }</div>`) // => '<div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>'
 * ```
 */
export const escapeHTML = (strings, ...values) => strings.reduce((memo, string, i) => memo + escape(values[i - 1]) + string);

/**
 * HTMLに挿入される文字列をエスケープする
 * @param {string} value 
 * @return {string}
 * @example
 * ```js
 * escape('<a onmouseenter="alert(\'xss\')">') // => &lt;a onmouseenter=&quot;alert(&#039;xss&#039;)&quot;&gt;
 * ```
 */
const escape = value => {
  if (value == null) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/`/g, '&#096;');
};
