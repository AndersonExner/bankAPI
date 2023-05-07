import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableManagers1683329411759 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'managers',
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
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('managers', true, true, true)
    }

}
