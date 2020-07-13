import { BaseException } from './BaseException'

export class InternalErrorException extends BaseException {
  public httpStatus = 500
  public name = 'InternalErrorException'
}
