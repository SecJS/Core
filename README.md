# Core 🧠

> Core stuffs to any NodeJS project

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/secjs/core.svg?style=social&label=Star&maxAge=2592000)](https://github.com/secjs/core/stargazers/)

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/core?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/core?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always maintain an `Core` project to any NodeJS project.

<img src=".github/core.jpg" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

```bash
yarn add @secjs/core
```

## Base

### GuardBaseService

```js
import { User } from 'app/Models/User'
import { GuardBaseService } from '@secjs/core/base'

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
import { LucidBaseRepository } from '@secjs/core/base'

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
import { TypeOrmBaseRepository } from '@secjs/core/base'

class UserRepository extends TypeOrmBaseRepository<User> { // Give the Model type to TypeOrm so he knows what to work with

  // You can subscribe TypeOrmBaseRepository methods in here if you want!  
}
```

---
