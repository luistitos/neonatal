import { subMinutes } from 'date-fns';
import { getConnection, getRepository, Repository } from 'typeorm';
import { fingerRoutes } from '../../routes/finger.routes';
import { Fingerprint } from '../models/Fingerprint';
import { Lastfinger } from '../models/Lastfinger';

interface IFingerDTO {
	id: number;
	type: string;
}

class FingerRepository {
	private repository: Repository<Fingerprint>;
	private lastfingerRepository: Repository<Lastfinger>;

	constructor() {
		this.repository = getRepository(Fingerprint);
		this.lastfingerRepository = getRepository(Lastfinger);
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

	async setNullDate(): Promise<void> {
		await this.lastfingerRepository.save([
			{
				id: 1,
				date: subMinutes(new Date(), 20)
			},
			{
				id: 2,
				date: subMinutes(new Date(), 20)
			}
		]);
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

	async setLastSearch(id: number): Promise<void> {
		const lastfinger = await this.lastfingerRepository.findOne({ last: true });
		lastfinger.fingerId = id;
		lastfinger.date = new Date();
		await this.lastfingerRepository.save(lastfinger);
	}
	async setLastSearchType(type: string): Promise<void> {
		switch (type) {
			case 'mother':
				await this.lastfingerRepository.save([
					{
						id: 1,
						last: true
					},
					{
						id: 2,
						last: false
					}
				]);
				break;

			case 'child':
				await this.lastfingerRepository.save([
					{
						id: 1,
						last: false
					},
					{
						id: 2,
						last: true
					}
				]);
				break;

			default:
				break;
		}
	}

	async getSearch() {
		const fingers = await this.lastfingerRepository.find();
		return fingers;
	}
}

export { FingerRepository };
