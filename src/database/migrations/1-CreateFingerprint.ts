import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFingerprint1655553290934 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'fingerprints',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'finger_id',
						type: 'int',
						isNullable: false,
						isUnique: true
					},
					{
						name: 'type',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'saved',
						type: 'boolean',
						isNullable: false,
						default: false
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
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('fingerprints');
	}
}
