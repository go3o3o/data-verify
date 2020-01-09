import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tb_collect_count' })
export class CollectCount {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public customer_id!: string;

  @Column()
  public keyword!: string;

  @Column()
  public doc_datetime!: string;

  @Column()
  public collect_type!: string;

  @Column()
  public always_yn!: string;
}
