<h1 align="center">
    <img alt="Arsenal" title="#delicinhas" src=".github/dedSec.png" width="200px" />
</h1>

<h3 align="center">
  ⚡ dedSec 👨🏻‍💻
</h3>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jlenon7/dedSec">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/jlenon7/dedSec">

  <a href="https://github.com/jlenon7/dedSec/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/jlenon7/dedSec">
  </a>

  <a href="https://github.com/jlenon7/dedSec/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/jlenon7/dedSec">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<p align="center">
  <a href="#-technology">🚀 Technology</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">💻 Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-quick-example">⏭ Quick Example</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">🤔 How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">📝 License</a>
</p>

## 🚀 Technology

This project was developed with the following technologies:

- [NodeJS](https://nodejs.org/en/)

## 💻 Project

The most fast development of NodeJS API'S with dedSec lib!

## ⏭ Tutorial

<h3 align="center">
  <strong>Quick Example</strong>
</h3>

```js
npm install @jlenon7/dedSec / yarn add @jlenon7/dedSec
```

<h3 align="center">
  <strong>TestController</strong>
</h3>

```js
const CrudMethodsController = use('@jlenon7/dedSec');

class TestController extends CrudMethodsController {
  constructor() {
    super();
    this.entity = 'Test';
  }
}

module.exports = TestController;
```

<h3 align="center">
  <strong>Routes</strong>
</h3>

```js
Route.get('/tests', 'TestController.index');
Route.post('/tests', 'TestController.store');
Route.get('/tests/:id', 'TestController.show');
Route.put('/tests/:id', 'TestController.update');
Route.delete('/tests/:id', 'TestController.destroy');
```

---

## 🤔 How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push origin my-feature`.

After the merge of your pull request is done, you can delete your branch.

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE.md) for more details.

---

Made with 🖤 by [jlenon7](https://github.com/jlenon7) :wave:
