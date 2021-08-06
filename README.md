# Core 🧠

> Core stuffs to your NodeJS project

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/secjs/core.svg?style=social&label=Star&maxAge=2592000)](https://github.com/secjs/core/stargazers/)

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/core?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/core?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to concentrate all `SecJS` libraries to create an HTTP server to any NodeJS project.

<img src=".github/core.jpg" width="200px" align="right" hspace="30px" vspace="100px">

## WARN 🛑⚠️

> This project is under `development` do not use it until releases v2.0.0.

## Installation

This project depends on [`@secjs/utils`]('https://github.com/SecJS/Utils')

```bash
yarn add @secjs/utils
```

Then install the project

```bash
yarn add @secjs/core
```

## Decorators

### Controller

> Use `Controller` decorator to map a controller to your application

```ts
import { Controller } from '@secjs/core'

@Controller('/tests')
class TestController {}
```

### Request Mappers - GET/POST/PUT/DELETE/ETC...

> Use `GET, POST, PUT, DELETE, PATCH, ALL, OPTIONS, HEAD` decorators to map the real route for your application

```ts
import { Get, Post, Put, Delete } from '@secjs/core'

@Controller('/tests')
class TestController {
    @Get()
    async getAll() {}
    
    @Get('/:id')
    async getOne() {}

    @Post()
    async create() {}

    @Put(':id')
    async update() {}

    @Delete('/:id')
    async delete() {}
}

// Routes created: 
// 
// /tests GET
// /tests/:id GET
// /tests POST
// /tests/:id PUT
// /tests/:id DELETE
```

---

## License

Made with 🖤 by [jlenon7](https://github.com/jlenon7) :wave:
