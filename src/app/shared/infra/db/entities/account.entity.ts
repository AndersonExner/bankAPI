import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseEntity from './base-entity.entity';
import { ClientEntity } from './client.entity';

@Entity({ name: 'accounts' })
export class AccountEntity extends BaseEntity {
    @Column()
    balance!: number;

    @Column()
    limit!: number;

    @Column()
    open!: boolean;

    @Column()
    clientID!: string;

    @OneToOne(() => ClientEntity, (entity) => entity.id)
    @JoinColumn({ name: "clientID", referencedColumnName: "id" })
    client?: ClientEntity
}
