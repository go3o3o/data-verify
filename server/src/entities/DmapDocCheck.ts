import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_crawl_doc_check' })
export class DmapDocCheck extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public project_seq!: number;

  @Column()
  public keyword_seq!: number;

  @Column()
  public pub_day!: string;
  @Column()
  public pub_day_date!: string;

  @Column()
  public url!: string;

  @Column()
  public md5!: string;

  @Column()
  public reg_dt!: string;
}
