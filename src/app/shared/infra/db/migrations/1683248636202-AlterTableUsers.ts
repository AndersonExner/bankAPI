import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AlterTableClients1683248636202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'clients',
            new TableForeignKey({
                columnNames: ['accountID'],
                referencedColumnNames: ['id'],
                referencedTableName: 'accounts',
                name: 'fk_user_account'
            }),
        );
        await queryRunner.createForeignKey(
            'clients',
            new TableForeignKey({
                columnNames: ['managerID'],
                referencedColumnNames: ['id'],
                referencedTableName: 'managers',
                name: 'fk_user_manager'
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('accountID', 'id');
    }

}
