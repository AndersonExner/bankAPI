import { DataSource } from 'typeorm';
import { ClientEntity } from './entities';
import { CreateTableClients1682130690671 } from './migrations';
import { AccountEntity } from './entities/account.entity';
import { CreateTableAccounts1682132360580 } from './migrations/1682132360580-CreateTableAccounts';
import { AlterTableClients1683248636202 } from './migrations/1683248636202-AlterTableUsers';
import { ManagerEntity } from './entities/manager.entity';
import { CreateTableManagers1683329411759 } from './migrations/1683329411759-CreateTableManagers';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: 'mahmud.db.elephantsql.com',
    port: 5432,
    username: 'wunieqbe',
    password: 'LNkueTrgbK74z3DmnlZZ6jRe8ZHuWWzM',
    database: 'wunieqbe',
    logging: true,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [ClientEntity, AccountEntity, ManagerEntity],
    migrations: [AlterTableClients1683248636202 ],
    synchronize: false,
});
