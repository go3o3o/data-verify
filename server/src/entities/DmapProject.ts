import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_project' })
export class DmapProject extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public name!: string;

  @Column()
  public customer_id!: string;

  @Column()
  public collect_always_yn!: string;

  @Column()
  public collect_retroactive_yn!: string;

  @Column()
  public collect_start_dt!: string;
  @Column()
  public collect_end_dt!: string;

  @Column()
  public collect_trend_yn!: string;
  @Column()
  public collect_trend_count_yn!: string;
  @Column()
  public collect_classification_yn!: string;

  @Column()
  public collect_comment!: string;

  @Column()
  public collect_source_type_cd!: string;

  @Column()
  public collect_trend_count_type_cd!: string;

  @Column()
  public use_yn!: string;

  @Column()
  public reg_dt!: string;
  @Column()
  public reg_account_seq!: number;

  @Column()
  public upd_dt!: string;
  @Column()
  public upd_account_seq!: number;

  @Column()
  public bica_ip!: string;
  @Column()
  public bica_port!: number;
  @Column()
  public bica_concept_id!: number;

  @Column()
  public menu!: string;
  @Column()
  public bica_scd_dir!: string;
  @Column()
  public limit_view_yn!: string;
}
