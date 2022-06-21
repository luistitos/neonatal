import { Request, Response } from 'express';
import { ChildrenRepository } from '../repositories/ChildrenRepository';
import { FingerRepository } from '../repositories/FingerRepository';
import { MothersRepository } from '../repositories/MothersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class ChildrenController {
	usersRepository: UsersRepository;
	mothersRepository: MothersRepository;
	childrenRepository: ChildrenRepository;
	private fingerRepository: FingerRepository;

	constructor() {
		this.usersRepository = new UsersRepository();
		this.mothersRepository = new MothersRepository();
		this.childrenRepository = new ChildrenRepository();
		this.fingerRepository = new FingerRepository();
	}
	async create(request: Request, response: Response): Promise<Response> {
		const {
			name,
			hospitalName,
			hospitalNumber,
			sex,
			fatherName,
			home,
			phone,
			motherFingerId,
			motherId,
			birthday,
			birthtime,
			fingerId
		} = request.body;

		console.log(request.body);

		const register = await this.usersRepository.findById(request.userId);
		const mother = await this.mothersRepository.findById(motherFingerId);
		const finger = await this.fingerRepository.getById(fingerId);

		await this.childrenRepository.create({
			name,
			hospitalName,
			hospitalNumber,
			sex,
			fatherName,
			home,
			phone,
			mother,
			register,
			birthday,
			birthtime,
			finger
		});

		return response.status(201).send();
	}

	async list(request: Request, response: Response): Promise<void> {
		const children = await this.childrenRepository.findAll();
		return response.render('pages/children', {
			title: 'Filhos',
			children
		});
	}

	async showById(request: Request, response: Response): Promise<void> {
		const { id } = request.params;

		const child = await this.childrenRepository.findById(Number(id));
		return response.render('pages/child-details', {
			title: 'Detalhes do filho',
			child
		});
	}
}

export default () => {
	const childrenController = new ChildrenController();

	return childrenController;
};
