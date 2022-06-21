import { getRepository, Like, Repository } from 'typeorm';
import { Children } from '../models/Children';
import { Fingerprint } from '../models/Fingerprint';
import { Mother } from '../models/Mother';
import User from '../models/User';

interface IMotherDTO {
	bi: string;
	name: string;
	father: string;
	mother: string;
	birthday: Date;
	maritalStatus: string;
	work: string;
	workplace: string;
	home: string;
	district: string;
	neighborhood: string;
	avenue: string;
	phone: number;
	referencePlace: string;
	referencePerson: string;
	referenceRelation: string;
	referencePhone: number;
	register: number;
	finger: Fingerprint;
}

class MothersRepository {
	private repository: Repository<Mother>;

	constructor() {
		this.repository = getRepository(Mother);
	}

	async create({
		bi,
		name,
		father,
		mother,
		birthday,
		maritalStatus,
		work,
		workplace,
		home,
		district,
		neighborhood,
		avenue,
		phone,
		referencePlace,
		referencePerson,
		referenceRelation,
		referencePhone,
		register,
		finger
	}: IMotherDTO) {
		const user = new User();
		user.id = register;

		const newMother = this.repository.create({
			bi,
			name,
			father,
			mother,
			birthday,
			maritalStatus,
			work,
			workplace,
			home,
			district,
			neighborhood,
			avenue,
			phone,
			referencePlace,
			referencePerson,
			referenceRelation,
			referencePhone,
			register: user,
			finger
		});

		await this.repository.save(newMother);
	}

	async findByBi(bi: string): Promise<Mother> {
		const mother = this.repository.findOne({ bi });

		return mother;
	}

	async findByFinger(fingerId: number): Promise<Mother> {
		const finger = new Fingerprint();
		finger.id = fingerId;
		const mother = await this.repository.findOne({ finger });

		return mother;
	}

	async findById(id: number): Promise<Mother> {
		const mother = await this.repository.findOne(id, {
			relations: ['children']
		});
		return mother;
	}

	async findAll(): Promise<Mother[]> {
		const mothers = await this.repository.find();
		return mothers;
	}

	async findByName(name: string): Promise<Mother[]> {
		const mothers = await this.repository.find({
			name: Like(`%${name}%`)
		});
		return mothers;
	}

	async findChildren(id: number): Promise<Children[]> {
		const mother = await this.repository.findOne(id, {
			relations: ['children']
		});

		const { children } = mother;
		return children;
	}

	async count(): Promise<number> {
		const count = await this.repository.count();

		return count;
	}
}

export { MothersRepository };
