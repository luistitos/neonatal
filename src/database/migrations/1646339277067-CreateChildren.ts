import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChildren1646339277067 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'children',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'fingerprint_id',
						type: 'varchar'
					},

					{
						name: 'name',
						type: 'varchar'
					},
					{
						name: 'birthday',
						type: 'date',
						default: 'now()'
					},
					{
						name: 'birthtime',
						type: 'time',
						default: 'now()'
					},
					{
						name: 'hospital_name',
						type: 'varchar'
					},
					{
						name: 'hospital_number',
						type: 'int'
					},
					{
						name: 'sex',
						type: 'varchar'
					},
					{
						name: 'father_name',
						type: 'varchar'
					},
					{
						name: 'home',
						type: 'varchar'
					},
					{
						name: 'phone',
						type: 'int'
					},
					{
						name: 'mother_id',
						type: 'int'
					},
					{
						name: 'register_id',
						type: 'int'
					},

					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},

					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					}
				],
				foreignKeys: [
					{
						name: 'FKChildrenUsers',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['register_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE'
					},
					{
						name: 'FKChildrenMother',
						referencedTableName: 'mothers',
						referencedColumnNames: ['id'],
						columnNames: ['mother_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE'
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('children');
	}
}
