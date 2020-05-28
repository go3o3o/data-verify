import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_crawl_retroactive2' })
export class DmapProgress extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public customer_id!: string;

  @Column()
  public project_seq!: number;

  @Column()
  public keyword_seq!: number;

  @Column()
  public source_seq!: number;
  @Column()
  public depth1_seq!: number;
  @Column()
  public depth2_seq!: number;
  @Column()
  public depth3_seq!: number;

  @Column()
  public state!: number;

  @Column()
  public pub_day!: string;
  @Column()
  public pub_day_date!: string;

  @Column()
  public keyword!: string;
}
