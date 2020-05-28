import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tb_crawl_rule' })
export class NodeRule extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public name!: string;

  @Column()
  public path!: string;

  @Column()
  public reg_dt!: string;

  @Column()
  public upd_dt!: string;
}
