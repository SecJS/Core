import { Request } from 'express'
import { Req, Injectable, Get, Put, Post, Delete } from '@nestjs/common'
import { NestCrudService } from '../Services/NestCrudService'
import { NestCrudRepository } from '../Repositories/NestCrudRepository'

@Injectable()
export class NestCrudController<Model> {
  constructor(private service: NestCrudService<Model>, private repository: NestCrudRepository<Model>) {}

  @Get()
  public async show(@Req() request: Request): Promise<any> {
    return this.repository.getResource(request.params['id'])
  }

  @Get()
  public async index(@Req() request: Request): Promise<any> {
    return this.repository.getResources(request.params['id'])
  }

  @Post()
  public async store(@Req() request: Request): Promise<any> {
    return this.service.create(request.body)
  }

  @Put()
  public async update(@Req() request: Request): Promise<any> {
    return this.service.update(request.params['id'], request.body)
  }

  @Delete()
  public async destroy(@Req() request: Request): Promise<any> {
    return this.service.delete(request.params['id'])
  }
}
