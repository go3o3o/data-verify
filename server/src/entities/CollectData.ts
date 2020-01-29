import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tb_collect_data' })
export class CollectData {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public doc_title!: string;

  @Column()
  public doc_content!: string;

  @Column()
  public doc_writer!: string;

  @Column()
  public doc_url!: string;

  @Column()
  public customer_id!: string;

  @Column()
  public doc_datetime!: string;

  @Column()
  public channel: string;

  @Column()
  public attach_yn!: string;

  @Column()
  public collect_type!: string;

  @Column()
  public always_yn!: string;

  @Column()
  public md5!: string;

  @Column()
  public reg_dt!: string;
}
