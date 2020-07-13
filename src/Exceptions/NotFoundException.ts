import { BaseException } from './BaseException'

export class NotFoundException extends BaseException {
  public httpStatus = 404
  public name = 'NotFoundException'
}
