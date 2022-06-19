import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

@Entity('fingerprints')
class Fingerprint {
	@PrimaryColumn()
	id: number;

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
