import {
	AfterLoad,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { Fingerprint } from './Fingerprint';
import { Mother } from './Mother';
import User from './User';

@Entity()
class Children {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'fingerprint_id' })
	fingerprintId: string;

	@Column()
	name: string;

	@Column()
	birthday: Date;

	parsedBirthday: string;

	@Column()
	birthtime: string;

	@Column({ name: 'hospital_name' })
	hospitalName: string;

	@Column({ name: 'hospital_number' })
	hospitalNumber: number;

	@Column()
	sex: string;

	@Column({ name: 'father_name' })
	fatherName: string;

	@Column()
	home: string;

	@Column()
	phone: number;

	@OneToOne(() => Fingerprint)
	@JoinColumn({
		name: 'finger_id',
		referencedColumnName: 'id'
	})
	fingerId: number;

	@ManyToOne(() => Mother)
	@JoinColumn({
		name: 'mother_id',
		referencedColumnName: 'id'
	})
	mother: Mother;

	@ManyToOne(() => User)
	@JoinColumn({
		name: 'register_id',
		referencedColumnName: 'id'
	})
	register: User;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@AfterLoad()
	parseDate() {
		this.parsedBirthday = this.birthday.toLocaleString('pt-mz', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	}
}

export { Children };
