import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

@Entity('fingerprints')
class Fingerprint {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'finger_id' })
	fingerId: number;

	@Column()
	type: string;

	@Column()
	saved: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}

export { Fingerprint };
