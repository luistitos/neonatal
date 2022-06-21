import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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

	@UpdateDateColumn()
	updated_at: Date;
}

export { Lastfinger };
