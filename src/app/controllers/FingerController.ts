import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { FingerRepository } from '../repositories/FingerRepository';

class FingerController {
	fingerRepository: FingerRepository;
	constructor() {
		this.fingerRepository = new FingerRepository();
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
}

export default () => {
	const fingerController = new FingerController();

	return fingerController;
};
