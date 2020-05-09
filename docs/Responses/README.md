<table align="center"><tr><td align="center" width="9999">
<h1 align="center">
    <img alt="Template" title="#delicinhas" src="https://madewithlaravel.com/mandant/madewithlaravel/images/logo.png" width="200px" />
</h1>

<h4 align="center">
 📱 Macro Responses 🚀
</h4>

<code align="center">npm install @makepro/package-macro-response</code>

<p align="center">
  <a href="#-quick-example!">📚 Quick Example!</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
  <a href="#-withcollection">withCollection</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-withone">withOne</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-withoutbody">withoutBody</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-witherror">withError</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

<br>
</td></tr></table>

# 📚 Quick Example!

```js
const { Response } = require('@makepro/macro-response/build');

const data = [
    {
        first-data: "João",
    },
    {
        second-data: "Valmir",
    },
]

Route.get('/demo', (data) => {
  return new Response().withCollection({ true, 'Valmir and João are nice guys! 😎', data });
})
```

### JSON Result

```json
{
  "status": "Success",
  "message": "Valmir and João are nice guys! 😎",
  "data": [
    {
      "first-data": "João",
    },
    {
      "second-data": "Valmir",
    },
  ]
}
```

# 🔁 withCollection

|  **Método Package**  |         **Done**         |
| :------------------: | :----------------------: |
| withCollection(data) | <ul><li>- [ ] </li></ul> |

#### JSON Body

```json
{
  "status": "Success",
  "message": "This package is soooo COOL! 🤯",
  "data": [
    {
      "first-data": "...",
    },
    {
      "second-data": "...",
    },
  ]
}
```

---

# ✅ withOne

| **Método Package** |         **Done**         |
| :----------------: | :----------------------: |
|   withOne(data)    | <ul><li>- [ ] </li></ul> |

#### JSON Body

```json
{
  "status": "Success",
  "message": "This package is soooo COOL! 🤯",
  "data": {
      "one-data": "Prettier!",
  }
}
```

---

# ❎ withoutBody

| **Método Package** |         **Done**         |
| :----------------: | :----------------------: |
|  withCollection()  | <ul><li>- [ ] </li></ul> |

#### JSON Body

```json
{
  "status": "Success",
  "message": "This package is soooo COOL! 🤯",
}
```

---

# 🆘 withError

|    **Método Package**    |         **Done**         |
| :----------------------: | :----------------------: |
| withError(message, code) | <ul><li>- [ ] </li></ul> |

#### JSON Body

```json
{
  "status": "Error",
  "message": "Request failed 🙁",
  "code": "ERROR_CODE"
}
```

---
