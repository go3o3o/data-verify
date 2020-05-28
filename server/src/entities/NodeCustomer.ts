import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tb_customer' })
export class NodeCustomer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public name!: string;

  @Column()
  public comment!: string;

  @Column()
  public use_yn!: string;

  @Column()
  public reg_dt!: string;

  @Column()
  public upd_dt!: string;
}
