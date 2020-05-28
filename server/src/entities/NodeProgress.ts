import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_crawl_progress' })
export class NodeProgress extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public request_seq!: number;

  @Column()
  public progress_dt!: string;

  @Column()
  public start_dt!: string;

  @Column()
  public end_dt!: string;

  @Column()
  public status!: string;

  @Column()
  public error_msg!: string;

  @Column()
  public on_going_flag!: string;

  @Column()
  public reg_dt!: string;

  @Column()
  public upd_dt!: string;
}
