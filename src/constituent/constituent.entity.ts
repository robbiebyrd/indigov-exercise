import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('constituent')
export class Constituent {
    @PrimaryColumn({name: 'email', length: 70, nullable: false})
    email: string;

    @Column({name: 'firstName', length: 70, nullable: false})
    firstName: string;

    @Column({name: 'lastName', length: 70, nullable: false})
    lastName: string;

    @Column({name: 'address', length: 180, nullable: false})
    address: string;

    @Column({name: 'address2', length: 180, nullable: true})
    address2: string;

    @Column({name: 'city', length: 180, nullable: false})
    city: string;

    @Column({name: 'state', length: 180, nullable: false})
    state: string;

    @Column({name: 'zip', length: 11, nullable: false})
    zip: string;

    @Column({name: 'signup', type: 'datetime', default: () => "DATETIME('now','localtime')"})
    signup: Date;
}
