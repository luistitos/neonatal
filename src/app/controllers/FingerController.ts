import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { ChildrenRepository } from '../repositories/ChildrenRepository';
import { FingerRepository } from '../repositories/FingerRepository';
import { MothersRepository } from '../repositories/MothersRepository';

class FingerController {
	fingerRepository: FingerRepository;
	motherRepository: MothersRepository;
	childrenRepository: ChildrenRepository;
	constructor() {
		this.fingerRepository = new FingerRepository();
		this.motherRepository = new MothersRepository();
		this.childrenRepository = new ChildrenRepository();
	}

	async create(request: Request, response: Response) {
		const { type } = request.params;
		const count = await this.fingerRepository.count();
		const id = count + 1;

		await this.fingerRepository.create({ id, type });
		return response.json({ id });
	}

	async saveLast(request: Request, response: Response) {
		const { id, saved } = await this.fingerRepository.getLast();

		await this.fingerRepository.setSaved(id);
		return response.json(id);
	}

	async showFinger(request: Request, response: Response) {
		const { id } = request.params;

		const finger = await this.fingerRepository.getById(Number(id));
		return response.json(finger);
	}

	async setLastSearch(request: Request, response: Response) {
		const { id } = request.params;
		await this.fingerRepository.setLastSearch(Number(id));
		return response.status(204).send();
	}
	async setLastSearchType(request: Request, response: Response) {
		const { type } = request.params;
		await this.fingerRepository.setLastSearchType(type);
		return response.status(204).send();
	}

	async getSearch(request: Request, response: Response) {
		const fingers = await this.fingerRepository.getSearch();
		const parsedFingers = {
			motherFinger: fingers[0].fingerId,
			childFinger: fingers[1].fingerId
		};
		return response.json(parsedFingers);
	}

	async verifyMatch(request: Request, response: Response) {
		const { motherFinger, childFinger } = request.body;
		const mother = await this.motherRepository.findByFinger(motherFinger);
		const child = await this.childrenRepository.findByFinger(childFinger);
		if (child.mother.id != mother.id) {
			return response.status(400).json({ match: false });
		}

		return response.status(200).json({
			match: true,
			mother,
			child
		});
	}
}

export default () => {
	const fingerController = new FingerController();

	return fingerController;
};
