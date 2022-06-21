import { MigrationInterface, QueryRunner } from 'typeorm';
import { Lastfinger } from '../../app/models/Lastfinger';

export class InsertLastFinger1655651718936 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into(Lastfinger)
			.values([
				{
					id: 1,
					type: 'mother'
				},
				{
					id: 2,
					type: 'child'
				}
			])
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder()
			.delete()
			.from(Lastfinger)
			.execute();
	}
}
