import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCaterogyIdToTransactions1594586758574
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        name: 'transactionCaterogy',
        onUpdate: 'CASCADE', // Sempre que atualizar categories  vai atualizar transactions
        onDelete: 'SET NULL', // Sempre quando atualizar caterogies vai atualizar transactions com NULL
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'transactionCaterogy');
    await queryRunner.dropColumn('transactions', 'caterogy_id');
  }
}
