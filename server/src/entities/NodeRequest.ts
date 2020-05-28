import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_crawl_request' })
export class NodeRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public customer_seq!: number;

  @Column()
  public channel_seq!: number;

  @Column()
  public type_cd!: string;

  @Column()
  public title!: string;

  @Column()
  public period!: string;

  @Column()
  public start_dt!: string;

  @Column()
  public end_dt!: string;

  @Column()
  public keyword!: string;

  @Column()
  public status!: string;

  @Column()
  public schedules!: string;

  @Column()
  public day_schedules!: string;

  @Column()
  public month_schedules!: string;

  @Column()
  public year_schedules!: string;

  @Column()
  public mode!: string;

  @Column()
  public reg_dt!: string;

  @Column()
  public upd_dt!: string;
}
