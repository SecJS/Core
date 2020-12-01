# Core 🧠

> Core stuffs to any NodeJS project

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/secjs/core.svg?style=social&label=Star&maxAge=2592000)](https://github.com/secjs/core/stargazers/)

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/core?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/core?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always mantain an `Core` project to any NodeJS project.

<img src=".github/core.jpg" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

```bash
yarn install @SecJS/Core
```

## Utils

> Use fillable to return the array reduced by keys

```js
import { fillable } from '@SecJS/Core'

const object = {
  number1: 'good string',
  number2: 'bad string',
}

const readyToSaveOnDatabase = fillable(object, ['number1'])

console.log(readyToSaveOnDatabase) // { number1: 'good string' }
```

---

> Use random to generate random strings by the length you want using crypto

```js
import { random } from '@SecJS/Core'

const randomStringWith10Chars = await random(10)

console.log(randomStringWith10Chars) // qwiortlkps
```

---

> Use sleep to let you code sleep for sometime

```js
import { sleep } from '@SecJS/Core'

await sleep(2000) // Your code will stop in this line for two seconds
```

---

> Use sort to get a sorted value from an array

```js
import { sort } from '@SecJS/Core'

const array = ['a', 'b', 'c'] // Array length = 2 (0, 1, 2)
const index = sort(array) // Sorted index value, could only be 0, 1 or 2

console.log(array[index]) // a, b or c
```

---

> Generate UUID tokens using a prefix, and validate it to using uuidv4 lib

```js
import { Token } from '@SecJS/Core'

const token = new Token()

// Do not use the char "-", it would break token.verify() method
const uuidGeneratedToken = token.generate('yourServicePrefix')
console.log(uuidGeneratedToken) // yourServicePrefix-c546b11c-2c2b-11eb-adc1-0242ac120002

const isUuid = token.verify(uuidGeneratedToken)
console.log(isUuid) // true
```

---

> Use Parser to parse all type of data of you application

```js
import { Parser } from '@SecJS/Core'

const parser = new Parser()

const string1 = '1,2,3'
const parsed1 = await parser.stringToArray(string1)

console.log(parsed1) // ['1', '2', '3']

const string2 = 'aaaasadzczaaa21313'
const parsed2 = await parser.stringToNumber(string2)

console.log(parser2) // 21313
```

---

> Find out what's the distance between a coordinate to other

```js
import { kmRadius, ICoordinate } from '@SecJS/Core'

// Use type number for more precision,
// but you can use string to,
// kmRadius will handle it with Parser.
const coordinate1 {
 latitude: -25.4858841,
 longitude: -54.564615,
} as ICoordinate // ICoordinate will force numbers

const coordinate2 {
 latitude: '-54.564615',
 longitude: '-25.4858841',
}

const distance = await kmRadius(coordinate1, coordinate2)

console.log(distance) // The distance in Kilometers (KM)
```

---

> Clean any type of object where one of the properties are null or undefined

```js
import { clean } from '@SecJS/Core'

const object = {
  number1: "number",
  number2: null,
  number3: undefined,
  number4: 1,
}

console.log(clean(object)) // { number1: "number", number4: 1 }
```

---
