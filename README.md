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

## Contracts

### ApiRequestContract

> Base your API requests using ApiRequestContract

```js
interface ApiRequestContract {
  where?: WhereContract[]
  orderBy?: OrderByContract[]
  includes?: IncludesContract[]
}

interface IncludesContract {
  relation: any
  where?: WhereContract[]
  orderBy?: OrderByContract[]
  includes?: IncludesContract[]
}

interface WhereContract {
  key: string
  value: string | number | boolean
}

interface OrderByContract {
  key: string
  ordenation: 'ASC' | 'DESC'
}
```

---

## Base

### GuardBaseService

```js
import { User } from 'app/Models/User'
import { LucidBaseRepository } from '@SecJS/Core/Repositories'

class ContactService extends GuardBaseService<User> { 
  // You new to write all you methods in here, GuardBaseService
  // just makes sure it's an authenticated request and save the
  // Guard/User in the context of the service.

  async getOne(id) {
    const contact = // ... all the logic to get an Contact

    // If you use User as guard, you can access this.guard.user.id or this.guard.id
    if (contact.user_id !== this.guard.user.id) {
      throw new Error('Unauthorized')
    }

    return contact
  }
}
```

---

### LucidBaseRepository

> Use LucidBaseRepository to get nice methods based on ApiRequestContract

```js
import { User } from 'app/Models/User'
import { LucidBaseRepository } from '@SecJS/Core/Repositories'

class UserRepository extends LucidBaseRepository<User> { // Just for types
  protected Model = User // Give the Model value to Lucid, so he knows what to work with
  
  // You can subscribe LucidBaseRepository methods in here if you want!  
}
```

---

### TypeOrmBaseRepository

> Use TypeOrmBaseRepository to get nice methods based on ApiRequestContract

```js
import { User } from 'app/Models/User'
import { TypeOrmBaseRepository } from '@SecJS/Core/Repositories'

class UserRepository extends TypeOrmBaseRepository<User> { // Give the Model type to TypeOrm so he knows what to work with

  // You can subscribe TypeOrmBaseRepository methods in here if you want!  
}
```

---

## Utils

### fillable

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

### random

> Use random to generate random strings by the length you want using crypto

```js
import { random } from '@SecJS/Core'

const randomStringWith10Chars = await random(10)

console.log(randomStringWith10Chars) // qwiortlkps
```

---

### sleep

> Use sleep to let you code sleep for sometime

```js
import { sleep } from '@SecJS/Core'

await sleep(2000) // Your code will stop in this line for two seconds
```

---

### sort

> Use sort to get a sorted value from an array

```js
import { sort } from '@SecJS/Core'

const array = ['a', 'b', 'c'] // Array length = 2 (0, 1, 2)
const index = sort(array) // Sorted index value, could only be 0, 1 or 2

console.log(array[index]) // a, b or c
```

---

### Token

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

### Parser

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

### kmRadius

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

### clean

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

### isCpf

> Validate if is a valid CPF Document or not.

```js
import { isCpf } from '@SecJS/Core'

// CPF (911.881.600-28) Generated using https://4devs.com.br

console.log(isCpf(91188160028)) // true
console.log(isCpf("91188160028")) // true
console.log(isCpf("911.881.600-28")) // true

console.log(isCpf("911.881.600-29")) // false
console.log(isCpf("000.000.000-00")) // false
```

---

### isCnpj

> Validate if is a valid CNPJ Document or not.

```js
import { isCnpj } from '@SecJS/Core'

// CNPJ (77.111.157/0001-19) Generated using https://4devs.com.br

console.log(isCnpj(77111157000119)) // true
console.log(isCnpj("77111157000119")) // true
console.log(isCnpj("77.111.157/0001-19")) // true

console.log(isCnpj("77.111.157/0001-20")) // false
console.log(isCnpj("00.000.000/0000-00")) // false
```

---
