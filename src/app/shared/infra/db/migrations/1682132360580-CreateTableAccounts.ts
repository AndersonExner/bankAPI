import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableAccounts1682132360580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'accounts',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'balance',
                        type: 'money',
                        isNullable: false,
                    },
                    {
                        name: 'limit',
                        type: 'money',
                        isNullable: false,
                    },
                    {
                        name: 'open',
                        type: 'boolean',
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
                        name: 'clientID',
                        type: 'uuid',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["clientID"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "clients",
                        name: "fk_account_client",
                        onDelete: 'CASCADE'
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('accounts', true, true, true)
    }
}