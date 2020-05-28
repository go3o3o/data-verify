import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'tb_crawl_channel' })
export class NodeChannel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public name!: string;

  @Column()
  public memo!: string;

  @Column()
  public url!: string;

  @Column()
  public chrome_use_yn!: string;

  @Column()
  public rule_seq!: number;

  @Column()
  public login_seq!: number;

  @Column()
  public reg_dt!: number;
  @Column()
  public upd_dt!: number;
}
