import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { FingerRepository } from '../repositories/FingerRepository';

class FingerController {
	fingerRepository: FingerRepository;
	constructor() {
		this.fingerRepository = new FingerRepository();
	}

	async create(request: Request, response: Response) {
		const { type } = request.body;
		console.log(type);
		const count = await this.fingerRepository.count();
		const fingerId = count + 1;

		await this.fingerRepository.create({ fingerId, type });
		return response.json(fingerId);
	}

	async saveLast(request: Request, response: Response) {
		const { id, fingerId, saved } = await this.fingerRepository.getLast();

		await this.fingerRepository.setSaved(id);
		return response.json(fingerId);
	}

	async showFinger(request: Request, response: Response) {
		const { fingerId } = request.params;

		const finger = await this.fingerRepository.getByFingerId(Number(fingerId));
		return response.json(finger);
	}
}

export default () => {
	const fingerController = new FingerController();

	return fingerController;
};
