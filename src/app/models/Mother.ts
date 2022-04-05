import {
	AfterLoad,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Children } from './Children';
import User from './User';

@Entity('mothers')
class Mother {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'fingerprint_id' })
	fingerprintId: string;

	@Column()
	bi: string;

	@Column()
	name: string;

	@Column()
	father: string;

	@Column()
	mother: string;

	@Column()
	birthday: Date;

	parsedBirthday: string;

	@Column()
	maritalStatus: string;

	@Column()
	work: string;

	@Column()
	workplace: string;

	@Column()
	home: string;

	@Column()
	district: string;

	@Column()
	neighborhood: string;

	@Column()
	avenue: string;

	@Column()
	phone: number;

	@Column()
	referencePlace: string;

	@Column()
	referencePerson: string;

	@Column()
	referenceRelation: string;

	@Column()
	referencePhone: number;

	@ManyToOne(() => User)
	@JoinColumn({
		name: 'register_id',
		referencedColumnName: 'id'
	})
	register: User;

	@OneToMany(() => Children, (child) => child.mother)
	children: Children[];

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@AfterLoad()
	parseDate() {
		this.parsedBirthday = this.birthday.toLocaleString('pt-mz', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	}
}

export { Mother };
