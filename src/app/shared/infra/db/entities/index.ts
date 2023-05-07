import BaseEntity from './base-entity.entity';
import { AccountEntity } from './account.entity';
import { ClientEntity } from './client.entity';
import { ManagerEntity } from './manager.entity';

export * from './client.entity';
export * from './base-entity.entity';

export default [ClientEntity, BaseEntity, AccountEntity, ManagerEntity];
