/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  hashPassword = async (password: string) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  };

  confirmPassword = async (password: string, hash) => {
    return await bcrypt.compare(password, hash);
  };
}
