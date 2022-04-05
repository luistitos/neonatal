import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey
} from 'typeorm';

export class CreateMothers1646252411535 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'mothers',
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
						type: 'varchar',
					},
					{
						name: 'bi',
						type: 'varchar',
						isUnique: true
					},

					{
						name: 'name',
						type: 'varchar'
					},

					{
						name: 'father',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'mother',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'birthday',
						type: 'date'
					},

					{
						name: 'maritalStatus',
						type: 'varchar'
					},

					{
						name: 'work',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'workplace',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'home',
						type: 'varchar'
					},

					{
						name: 'district',
						type: 'varchar'
					},

					{
						name: 'neighborhood',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'avenue',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'phone',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'referencePlace',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'referencePerson',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'referenceRelation',
						type: 'varchar',
						isNullable: true
					},

					{
						name: 'referencePhone',
						type: 'varchar',
						isNullable: true
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
						name: 'FKMothersUsers',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['register_id'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE'
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('mothers');
	}
}
