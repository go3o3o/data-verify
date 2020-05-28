import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_project_keyword' })
export class DmapProjectKeyword extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public customer_id!: string;

  @Column()
  public keyword!: string;

  @Column()
  public filter_keyword_use_yn!: string;

  @Column()
  public project_seq!: number;

  @Column()
  public use_yn!: string;
  @Column()
  public topics_yn!: string;
  @Column()
  public related_words_yn!: string;
  @Column()
  public emotions_yn!: string;

  @Column()
  public reg_dt!: string;
  @Column()
  public reg_account_seq!: number;

  @Column()
  public upd_dt!: string;
  @Column()
  public upd_account_seq!: number;

  @Column()
  public keyword_grp_name!: string;
  @Column()
  public filter_crawl_use_yn!: number;
}
