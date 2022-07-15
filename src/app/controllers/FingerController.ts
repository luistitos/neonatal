import { Request, Response } from 'express';
import { ChildrenRepository } from '../repositories/ChildrenRepository';
import { FingerRepository } from '../repositories/FingerRepository';
import { MothersRepository } from '../repositories/MothersRepository';
import { isWithinInterval, subMinutes } from 'date-fns';
import { firebasedb } from '../../firebase';
import { ref, set, get, onValue, off } from 'firebase/database';

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

		set(ref(firebasedb, 'fingers/write'), {
			id,
			type,
			saved: false
		});

		this.verifyFingerSaved(id);

		return response.json({ id });
	}

	private verifyFingerSaved(fingerId: number) {
		const writeFingerRef = ref(firebasedb, 'fingers/write');
		onValue(writeFingerRef, async (snapshot) => {
			const { id, saved } = snapshot.val();
			if (id === fingerId) {
				if (saved) {
					await this.fingerRepository.setSaved(id);
					off(writeFingerRef);
				}
			} else {
				off(writeFingerRef);
			}
		});
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

		set(ref(firebasedb, 'fingers/read'), {
			id: null,
			type,
			read: false
		});

		this.verifyFingerRead(type);

		return response.status(204).json({});
	}

	private verifyFingerRead(fingerType: string) {
		const readFingerRef = ref(firebasedb, 'fingers/read');
		onValue(readFingerRef, async (snapshot) => {
			const { id, type, read } = snapshot.val();

			if (type === fingerType) {
				if (id && read) {
					await this.fingerRepository.setLastSearch(id);
					off(readFingerRef);
				}
			} else {
				off(readFingerRef);
			}
		});
	}

	async getSearch(request: Request, response: Response) {
		const fingers = await this.fingerRepository.getSearch();
		const parsedFingers = {
			motherFinger:
				this.verifyInterval(fingers[0].date) && fingers[0].last
					? fingers[0].fingerId
					: null,
			childFinger:
				this.verifyInterval(fingers[1].date) && fingers[1].last
					? fingers[1].fingerId
					: null
		};

		await this.fingerRepository.setNullDate();
		// console.log(parsedFingers);
		return response.json(parsedFingers);
	}

	private verifyInterval(date: Date): boolean {
		return isWithinInterval(date, {
			start: subMinutes(new Date(), 5),
			end: new Date()
		});
	}

	async verifyMatch(request: Request, response: Response) {
		const { motherFinger, childFinger } = request.params;
		if (!motherFinger || !childFinger) {
			return response.send();
		}

		const mother = await this.motherRepository.findByFinger(
			Number(motherFinger)
		);
		const child = await this.childrenRepository.findByFinger(
			Number(childFinger)
		);
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
