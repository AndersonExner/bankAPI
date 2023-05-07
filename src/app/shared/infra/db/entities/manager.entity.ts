import { Column, Entity } from 'typeorm';
import BaseEntity from './base-entity.entity';
import { Profile } from '../domain/enums/profile.enum';

@Entity({ name: 'managers' })
export class ManagerEntity extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ type: 'enum', enum: Profile })
    profile!: Profile;

    @Column()
    cpf!: string;

}
