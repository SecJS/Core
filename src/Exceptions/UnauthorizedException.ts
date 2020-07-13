import { BaseException } from './BaseException'

export class UnauthorizedException extends BaseException {
  public httpStatus = 401
  public name = 'UnauthorizedException'
}
