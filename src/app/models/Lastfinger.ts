import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('last_finger')
class Lastfinger {
	@PrimaryColumn()
	id: number;

	@Column({ name: 'finger_id' })
	fingerId: number;

	@Column()
	last: boolean;

	@Column()
	type: string;
}

export { Lastfinger };
