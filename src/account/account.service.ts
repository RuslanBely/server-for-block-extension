import { Injectable } from '@nestjs/common';
import { patchAccountDto } from './dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {
  constructor(private db: DbService) {}

  async createAccount(userId: number) {
    return this.db.account.create({
      data: { ownerId: userId, isBlockingEnabled: false },
    });
  }

  async getAccount(userId: number) {
    return this.db.account.findFirstOrThrow({ where: { ownerId: userId } });
  }

  async patchAccount(userId: number, patch: patchAccountDto) {
    return this.db.account.update({
      where: { ownerId: userId },
      data: { ...patch },
    });
  }
}
