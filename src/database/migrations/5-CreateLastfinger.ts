import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLastfinger1655651101035 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'last_finger',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true
					},
					{
						name: 'finger_id',
						type: 'int',
						isNullable: true,
						default: null
					},
					{
						name: 'type',
						type: 'varchar'
					},
					{
						name: 'last',
						type: 'boolean',
						default: false
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
