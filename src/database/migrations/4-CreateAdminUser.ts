import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../../app/models/User';

export class CreateAdminUser1655553349676 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder()
			.insert()
			.into(User)
			.values({
				name: 'Admin',
				email: 'admin@neonatal.com',
				password: await bcrypt.hash('123456', 8)
			})
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder()
			.delete()
			.from(User)
			.where({ email: 'admin@neonatal.com' })
			.execute();
	}
}
