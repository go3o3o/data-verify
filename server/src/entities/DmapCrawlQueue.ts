import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_crawl_queue' })
export class DmapCrawlQueue extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public project_seq!: number;

  @Column()
  public keyword_seq!: number;

  @Column()
  public depth1_seq!: number;
  @Column()
  public depth2_seq!: number;
  @Column()
  public depth3_seq!: number;

  @Column()
  public start_dt!: string;
  @Column()
  public end_dt!: string;

  @Column()
  public reg_dt!: string;
}
