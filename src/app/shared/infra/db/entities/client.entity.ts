import { Column, Entity, JoinColumn, ManyToOne, OneToOne} from 'typeorm';
import BaseEntity from './base-entity.entity';
import { Profile } from '../domain/enums/profile.enum';
import { ManagerEntity } from './manager.entity';

@Entity({ name: 'clients' })
export class ClientEntity extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ type: 'enum', enum: Profile})
    profile!: Profile;

    @Column()
    cpf!: string;

    @Column()
    accountID!: string;

    @Column()
    managerID!:string;

    @ManyToOne(() => ManagerEntity, (entity) => entity.id)
    @JoinColumn({name: 'managerID', referencedColumnName:'id'})
    manager!: ManagerEntity
}
