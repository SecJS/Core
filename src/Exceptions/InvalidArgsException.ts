import { BaseException } from './BaseException'

export class InvalidArgsException extends BaseException {
  public httpStatus = 405
  public name = 'InvalidArgsException'
}
