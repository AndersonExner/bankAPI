import { randomUUID } from 'crypto';
import { Column, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';

export default class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'created_at' })
    createdAt!: Date;

    @Column({ name: 'updated_at' })
    updatedAt!: Date;

    @BeforeInsert()
    beforeSave() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
    }
}
