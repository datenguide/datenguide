/* PrismJS 1.19.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=css+clike+javascript+bash+graphql+json&plugins=remove-initial-line-feed */
var _self =
  typeof window !== 'undefined'
    ? window
    : typeof WorkerGlobalScope !== 'undefined' &&
      self instanceof WorkerGlobalScope
    ? self
    : {}
var Prism = (function(u) {
  var c = /\blang(?:uage)?-([\w-]+)\b/i
  var r = 0
  var C = {
    manual: u.Prism && u.Prism.manual,
    disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
    util: {
      encode: function e(r) {
        return r instanceof _
          ? new _(r.type, e(r.content), r.alias)
          : Array.isArray(r)
          ? r.map(e)
          : r
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/\u00a0/g, ' ')
      },
      type: function(e) {
        return Object.prototype.toString.call(e).slice(8, -1)
      },
      objId: function(e) {
        return (
          e.__id || Object.defineProperty(e, '__id', { value: ++r }), e.__id
        )
      },
      clone: function n(e, t) {
        var a
        var r
        var i = C.util.type(e)
        switch (((t = t || {}), i)) {
          case 'Object':
            if (((r = C.util.objId(e)), t[r])) return t[r]
            for (var o in ((a = {}), (t[r] = a), e))
              e.hasOwnProperty(o) && (a[o] = n(e[o], t))
            return a
          case 'Array':
            return (
              (r = C.util.objId(e)),
              t[r]
                ? t[r]
                : ((a = []),
                  (t[r] = a),
                  e.forEach(function(e, r) {
                    a[r] = n(e, t)
                  }),
                  a)
            )
          default:
            return e
        }
      },
      getLanguage: function(e) {
        for (; e && !c.test(e.className); ) e = e.parentElement
        return e
          ? (e.className.match(c) || [, 'none'])[1].toLowerCase()
          : 'none'
      },
      currentScript: function() {
        if (typeof document === 'undefined') return null
        if ('currentScript' in document) return document.currentScript
        try {
          throw new Error()
        } catch (e) {
          var r = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1]
          if (r) {
            var n = document.getElementsByTagName('script')
            for (var t in n) if (n[t].src == r) return n[t]
          }
          return null
        }
      }
    },
    languages: {
      extend: function(e, r) {
        var n = C.util.clone(C.languages[e])
        for (var t in r) n[t] = r[t]
        return n
      },
      insertBefore: function(n, e, r, t) {
        var a = (t = t || C.languages)[n]
        var i = {}
        for (var o in a)
          if (a.hasOwnProperty(o)) {
            if (o == e) for (var l in r) r.hasOwnProperty(l) && (i[l] = r[l])
            r.hasOwnProperty(o) || (i[o] = a[o])
          }
        var s = t[n]
        return (
          (t[n] = i),
          C.languages.DFS(C.languages, function(e, r) {
            r === s && e != n && (this[e] = i)
          }),
          i
        )
      },
      DFS: function e(r, n, t, a) {
        a = a || {}
        var i = C.util.objId
        for (var o in r)
          if (r.hasOwnProperty(o)) {
            n.call(r, o, r[o], t || o)
            var l = r[o]
            var s = C.util.type(l)
            s !== 'Object' || a[i(l)]
              ? s !== 'Array' || a[i(l)] || ((a[i(l)] = !0), e(l, n, o, a))
              : ((a[i(l)] = !0), e(l, n, null, a))
          }
      }
    },
    plugins: {},
    highlightAll: function(e, r) {
      C.highlightAllUnder(document, e, r)
    },
    highlightAllUnder: function(e, r, n) {
      var t = {
        callback: n,
        container: e,
        selector:
          'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      }
      C.hooks.run('before-highlightall', t),
        (t.elements = Array.prototype.slice.apply(
          t.container.querySelectorAll(t.selector)
        )),
        C.hooks.run('before-all-elements-highlight', t)
      for (var a, i = 0; (a = t.elements[i++]); )
        C.highlightElement(a, !0 === r, t.callback)
    },
    highlightElement: function(e, r, n) {
      var t = C.util.getLanguage(e)
      var a = C.languages[t]
      e.className =
        e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t
      var i = e.parentNode
      i &&
        i.nodeName.toLowerCase() === 'pre' &&
        (i.className =
          i.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t)
      var o = { element: e, language: t, grammar: a, code: e.textContent }
      function l(e) {
        ;(o.highlightedCode = e),
          C.hooks.run('before-insert', o),
          (o.element.innerHTML = o.highlightedCode),
          C.hooks.run('after-highlight', o),
          C.hooks.run('complete', o),
          n && n.call(o.element)
      }
      if ((C.hooks.run('before-sanity-check', o), !o.code))
        return C.hooks.run('complete', o), void (n && n.call(o.element))
      if ((C.hooks.run('before-highlight', o), o.grammar))
        if (r && u.Worker) {
          var s = new Worker(C.filename)
          ;(s.onmessage = function(e) {
            l(e.data)
          }),
            s.postMessage(
              JSON.stringify({
                language: o.language,
                code: o.code,
                immediateClose: !0
              })
            )
        } else l(C.highlight(o.code, o.grammar, o.language))
      else l(C.util.encode(o.code))
    },
    highlight: function(e, r, n) {
      var t = { code: e, grammar: r, language: n }
      return (
        C.hooks.run('before-tokenize', t),
        (t.tokens = C.tokenize(t.code, t.grammar)),
        C.hooks.run('after-tokenize', t),
        _.stringify(C.util.encode(t.tokens), t.language)
      )
    },
    matchGrammar: function(e, r, n, t, a, i, o) {
      for (var l in n)
        if (n.hasOwnProperty(l) && n[l]) {
          var s = n[l]
          s = Array.isArray(s) ? s : [s]
          for (var u = 0; u < s.length; ++u) {
            if (o && o == l + ',' + u) return
            var c = s[u]
            var g = c.inside
            var f = !!c.lookbehind
            var h = !!c.greedy
            var d = 0
            var m = c.alias
            if (h && !c.pattern.global) {
              var p = c.pattern.toString().match(/[imsuy]*$/)[0]
              c.pattern = RegExp(c.pattern.source, p + 'g')
            }
            c = c.pattern || c
            for (var y = t, v = a; y < r.length; v += r[y].length, ++y) {
              var k = r[y]
              if (r.length > e.length) return
              if (!(k instanceof _)) {
                if (h && y != r.length - 1) {
                  if (((c.lastIndex = v), !(S = c.exec(e)))) break
                  for (
                    var b = S.index + (f && S[1] ? S[1].length : 0),
                      w = S.index + S[0].length,
                      A = y,
                      P = v,
                      x = r.length;
                    A < x && (P < w || (!r[A].type && !r[A - 1].greedy));
                    ++A
                  )
                    (P += r[A].length) <= b && (++y, (v = P))
                  if (r[y] instanceof _) continue
                  ;(O = A - y), (k = e.slice(v, P)), (S.index -= v)
                } else {
                  c.lastIndex = 0
                  var S = c.exec(k)
                  var O = 1
                }
                if (S) {
                  f && (d = S[1] ? S[1].length : 0)
                  w = (b = S.index + d) + (S = S[0].slice(d)).length
                  var E = k.slice(0, b)
                  var N = k.slice(w)
                  var j = [y, O]
                  E && (++y, (v += E.length), j.push(E))
                  var L = new _(l, g ? C.tokenize(S, g) : S, m, S, h)
                  if (
                    (j.push(L),
                    N && j.push(N),
                    Array.prototype.splice.apply(r, j),
                    O != 1 && C.matchGrammar(e, r, n, y, v, !0, l + ',' + u),
                    i)
                  )
                    break
                } else if (i) break
              }
            }
          }
        }
    },
    tokenize: function(e, r) {
      var n = [e]
      var t = r.rest
      if (t) {
        for (var a in t) r[a] = t[a]
        delete r.rest
      }
      return C.matchGrammar(e, n, r, 0, 0, !1), n
    },
    hooks: {
      all: {},
      add: function(e, r) {
        var n = C.hooks.all
        ;(n[e] = n[e] || []), n[e].push(r)
      },
      run: function(e, r) {
        var n = C.hooks.all[e]
        if (n && n.length) for (var t, a = 0; (t = n[a++]); ) t(r)
      }
    },
    Token: _
  }
  function _(e, r, n, t, a) {
    ;(this.type = e),
      (this.content = r),
      (this.alias = n),
      (this.length = 0 | (t || '').length),
      (this.greedy = !!a)
  }
  if (
    ((u.Prism = C),
    (_.stringify = function r(e, n) {
      if (typeof e === 'string') return e
      if (Array.isArray(e)) {
        var t = ''
        return (
          e.forEach(function(e) {
            t += r(e, n)
          }),
          t
        )
      }
      var a = {
        type: e.type,
        content: r(e.content, n),
        tag: 'span',
        classes: ['token', e.type],
        attributes: {},
        language: n
      }
      var i = e.alias
      i &&
        (Array.isArray(i)
          ? Array.prototype.push.apply(a.classes, i)
          : a.classes.push(i)),
        C.hooks.run('wrap', a)
      var o = ''
      for (var l in a.attributes)
        o +=
          ' ' + l + '="' + (a.attributes[l] || '').replace(/"/g, '&quot;') + '"'
      return (
        '<' +
        a.tag +
        ' class="' +
        a.classes.join(' ') +
        '"' +
        o +
        '>' +
        a.content +
        '</' +
        a.tag +
        '>'
      )
    }),
    !u.document)
  )
    return (
      u.addEventListener &&
        (C.disableWorkerMessageHandler ||
          u.addEventListener(
            'message',
            function(e) {
              var r = JSON.parse(e.data)
              var n = r.language
              var t = r.code
              var a = r.immediateClose
              u.postMessage(C.highlight(t, C.languages[n], n)), a && u.close()
            },
            !1
          )),
      C
    )
  var e = C.util.currentScript()
  function n() {
    C.manual || C.highlightAll()
  }
  if (
    (e &&
      ((C.filename = e.src), e.hasAttribute('data-manual') && (C.manual = !0)),
    !C.manual)
  ) {
    var t = document.readyState
    t === 'loading' || (t === 'interactive' && e && e.defer)
      ? document.addEventListener('DOMContentLoaded', n)
      : window.requestAnimationFrame
      ? window.requestAnimationFrame(n)
      : window.setTimeout(n, 16)
  }
  return C
})(_self)
typeof module !== 'undefined' && module.exports && (module.exports = Prism),
  typeof global !== 'undefined' && (global.Prism = Prism)
!(function(s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
  ;(s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: 'selector'
        }
      }
    },
    url: {
      pattern: RegExp('url\\((?:' + e.source + '|[^\n\r()]*)\\)', 'i'),
      inside: { function: /^url/i, punctuation: /^\(|\)$/ }
    },
    selector: RegExp('[^{}\\s](?:[^{};"\']|' + e.source + ')*?(?=\\s*\\{)'),
    string: { pattern: e, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css)
  var t = s.languages.markup
  t &&
    (t.tag.addInlined('style', 'css'),
    s.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            'attr-name': { pattern: /^\s*style/i, inside: t.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': { pattern: /.+/i, inside: s.languages.css }
          },
          alias: 'language-css'
        }
      },
      t.tag
    ))
})(Prism)
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  'class-name': {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0
    }
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0
    }
  ],
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
})),
  (Prism.languages.javascript[
    'class-name'
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0
    },
    'function-variable': {
      pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: 'function'
    },
    parameter: [
      {
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\${|}$/,
              alias: 'punctuation'
            },
            rest: Prism.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    }
  }),
  Prism.languages.markup &&
    Prism.languages.markup.tag.addInlined('script', 'javascript'),
  (Prism.languages.js = Prism.languages.javascript)
!(function(e) {
  var t =
    '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b'
  var n = {
    environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
    variable: [
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: !0,
        inside: {
          variable: [
            { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
            /^\$\(\(/
          ],
          number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
          operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
          punctuation: /\(\(?|\)\)?|,|;/
        }
      },
      {
        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
        greedy: !0,
        inside: { variable: /^\$\(|^`|\)$|`$/ }
      },
      {
        pattern: /\$\{[^}]+\}/,
        greedy: !0,
        inside: {
          operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          punctuation: /[\[\]]/,
          environment: {
            pattern: RegExp('(\\{)' + t),
            lookbehind: !0,
            alias: 'constant'
          }
        }
      },
      /\$(?:\w+|[#?*!@$])/
    ],
    entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
  }
  e.languages.bash = {
    shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
    'function-name': [
      {
        pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: !0,
        alias: 'function'
      },
      { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: 'function' }
    ],
    'for-or-select': {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: 'variable',
      lookbehind: !0
    },
    'assign-left': {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        environment: {
          pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t),
          lookbehind: !0,
          alias: 'constant'
        }
      },
      alias: 'variable',
      lookbehind: !0
    },
    string: [
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: !0,
        greedy: !0,
        inside: n
      },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0
      },
      {
        pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
        greedy: !0,
        inside: n
      }
    ],
    environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
    variable: n.variable,
    function: {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    keyword: {
      pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    builtin: {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: !0,
      alias: 'class-name'
    },
    boolean: {
      pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
    operator: {
      pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
      inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } }
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 }
  }
  for (
    var a = [
        'comment',
        'function-name',
        'for-or-select',
        'assign-left',
        'string',
        'environment',
        'function',
        'keyword',
        'builtin',
        'boolean',
        'file-descriptor',
        'operator',
        'punctuation',
        'number'
      ],
      r = n.variable[1].inside,
      s = 0;
    s < a.length;
    s++
  )
    r[a[s]] = e.languages.bash[a[s]]
  e.languages.shell = e.languages.bash
})(Prism)
Prism.languages.graphql = {
  comment: /#.*/,
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  boolean: /\b(?:true|false)\b/,
  variable: /\$[a-z_]\w*/i,
  directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
  'attr-name': {
    pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: !0
  },
  'class-name': {
    pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
    lookbehind: !0
  },
  fragment: {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: 'function'
  },
  keyword: /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
  operator: /[!=|]|\.{3}/,
  punctuation: /[!(){}\[\]:=,]/,
  constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/
}
Prism.languages.json = {
  property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
  number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: 'keyword' }
}
typeof self !== 'undefined' &&
  self.Prism &&
  self.document &&
  Prism.hooks.add('before-sanity-check', function(e) {
    if (e.code) {
      var s = e.element.parentNode
      var n = /(?:^|\s)keep-initial-line-feed(?:\s|$)/
      !s ||
        s.nodeName.toLowerCase() !== 'pre' ||
        n.test(s.className) ||
        n.test(e.element.className) ||
        (e.code = e.code.replace(/^(?:\r?\n|\r)/, ''))
    }
  })
