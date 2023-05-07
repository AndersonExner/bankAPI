import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableClients1682130690671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'profile',
                        type: 'varchar',
                        length: '20',
                        isNullable: false,
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        length: '30',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp'
                    },
                    {
                        name: 'accountID',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'managerID',
                        type: 'uuid',
                        isNullable: true
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients', true, true, true)
    }
}
