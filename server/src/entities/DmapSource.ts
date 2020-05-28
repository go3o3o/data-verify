import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'tb_source' })
export class DmapSource extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public name!: string;

  @Column()
  public source_depth!: number;

  @Column()
  public depth1_seq!: number;
  @Column()
  public depth2_seq!: number;
  @Column()
  public depth3_seq!: number;

  @Column()
  public use_yn!: string;

  @Column()
  public basic_yn!: string;

  @Column()
  public source_order!: number;

  @Column()
  public type_cd!: string;

  @Column()
  public reg_dt!: string;
  @Column()
  public reg_account_seq!: number;
  @Column()
  public upd_dt!: string;
  @Column()
  public upd_account_seq!: number;
}
