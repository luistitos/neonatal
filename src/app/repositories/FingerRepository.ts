import { getConnection, getRepository, Repository } from 'typeorm';
import { fingerRoutes } from '../../routes/finger.routes';
import { Fingerprint } from '../models/Fingerprint';

interface IFingerDTO {
	id: number;
	type: string;
}

class FingerRepository {
	private repository: Repository<Fingerprint>;

	constructor() {
		this.repository = getRepository(Fingerprint);
	}
	async create({ id, type }: IFingerDTO): Promise<void> {
		const finger = this.repository.create({ id, type });
		await this.repository.save(finger);
	}

	async count(): Promise<number> {
		const count = await this.repository.count();
		return count;
	}

	async getLast(): Promise<Fingerprint> {
		const [finger] = await this.repository.find({
			order: {
				id: 'DESC'
			}
		});

		return finger;
	}

	async setSaved(id: number): Promise<void> {
		await this.repository.save({
			id,
			saved: true
		});
	}

	async getById(id: number): Promise<Fingerprint> {
		const finger = await this.repository.findOne(id);
		return finger;
	}
}

export { FingerRepository };
