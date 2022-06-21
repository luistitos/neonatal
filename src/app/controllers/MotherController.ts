import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { FingerRepository } from '../repositories/FingerRepository';
import { MothersRepository } from '../repositories/MothersRepository';

class MotherController {
	private mothersRepository: MothersRepository;
	private fingerRepository: FingerRepository;

	constructor() {
		this.mothersRepository = new MothersRepository();
		this.fingerRepository = new FingerRepository();
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
			referencePhone,
			fingerId
		} = request.body;
		const register = request.userId;

		const parsedBirthday = new Date(Date.parse(birthday));
		const today = new Date();

		const age = today.getFullYear() - parsedBirthday.getFullYear();
		if (age < 14) {
			throw new AppError('Invalid birthday');
		}

		const motherExists = await this.mothersRepository.findByBi(bi);
		if (motherExists) {
			throw new AppError('Mother already exists!');
		}

		const finger = await this.fingerRepository.getById(fingerId);

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
			referencePhone,
			finger
		});

		return response.status(201).send();
	}

	async list(request: Request, response: Response): Promise<void> {
		const mothers = await this.mothersRepository.findAll();

		return response.render('pages/mothers', {
			title: 'Mães',
			mothers
		});
	}

	async showById(request: Request, response: Response): Promise<void> {
		const { id } = request.params;
		const mother = await this.mothersRepository.findById(Number(id));
		return response.render('pages/mother-details', {
			mother,
			title: 'Detalhes da mãe'
		});
	}

	async showByFingerId(
		request: Request,
		response: Response
	): Promise<Response> {
		const { id } = request.params;
		const mother = await this.mothersRepository.findByFinger(Number(id));
		return response.json(mother);
	}
}

export default () => {
	const motherController = new MotherController();
	return motherController;
};
