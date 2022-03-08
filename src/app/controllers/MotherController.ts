import { Request, Response } from 'express';
import { MothersRepository } from '../repositories/MothersRepository';

class MotherController {
	private mothersRepository: MothersRepository;

	constructor() {
		this.mothersRepository = new MothersRepository();
	}

	async create(request: Request, response: Response): Promise<Response> {
		const {
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
			referencePhone
		} = request.body;
		const register = request.userId;

		const parsedBirthday = new Date(Date.parse(birthday));
		const today = new Date();

		const age = today.getFullYear() - parsedBirthday.getFullYear();
		if (age < 14) {
			throw new Error('Invalid birthday');
		}

		const motherExists = await this.mothersRepository.findByBi(bi);
		if (motherExists) {
			throw new Error('Mother already exists!');
		}

		await this.mothersRepository.create({
			register,
			bi,
			name,
			father,
			mother,
			birthday: parsedBirthday,
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
			referencePhone
		});

		return response.status(201).send();
	}

	async list(request: Request, response: Response): Promise<void> {
		const mothersList = await this.mothersRepository.findAll();

		const mothers = mothersList.map((mother) => {
			const birthDate = mother.birthday.toLocaleString('pt-mz', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			});
			return {
				...mother,
				birthDate
			};
		});

		return response.render('pages/mothers', {
			title: 'Mães',
			mothers
		});
	}

	async showById(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const mother = await this.mothersRepository.findById(Number(id));
		return response.json(mother);
	}
}

export default () => {
	const motherController = new MotherController();
	return motherController;
};
