import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_customer' })
export class DmapCustomer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public customer_id!: string;

  @Column()
  public use_yn!: string;

  @Column()
  public type_cd!: string;

  @Column()
  public reg_dt!: string;

  @Column()
  public upd_dt!: string;
}
