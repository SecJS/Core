// import { Request } from 'express'
// import { Req, Injectable } from '@nestjs/common'
// import { NestCrudService } from '../Services/NestCrudService'
// import { NestCrudRepository } from '../Repositories/NestCrudRepository'

// @Injectable()
// export class NestCrudController {
//   constructor(
//       private nestCrudService: NestCrudService,
//       private nestCrudRepository: NestCrudRepository
//   ) {}

//   public async show(@Req() request: Request): Promise<any> {
//     return this.nestCrudRepository.getResource(request.params['id'])
//   }

//   public async index(@Req() request: Request): Promise<any> {
//     return this.nestCrudRepository.getResources(request.params['id'])
//   }

//   public async store(@Req() request: Request): Promise<any> {
//     return this.nestCrudService.create(request.body)
//   }

//   public async update(@Req() request: Request): Promise<any> {
//     return this.nestCrudService.update(request.params['id'], request.body)
//   }

//   public async destroy(@Req() request: Request): Promise<any> {
//     return this.nestCrudService.delete(request.params['id'])
//   }
// }
