/* eslint-disable @typescript-eslint/ban-types */
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Validation } from 'fp-ts-validation/lib/validation'
import { isLeft } from 'fp-ts/lib/Either';
@Injectable()
export class ValidationPipe<A> implements PipeTransform {
  constructor(private validation: Validation<A>) {

  }
  async transform(value: A, argMeta: ArgumentMetadata) {
    const e = this.validation.validate(value);
    if (isLeft(e)) {
      throw new BadRequestException(e.left);
    }

    return value;
  }
}