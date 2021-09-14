import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', length: 100 })
  readonly name: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  readonly tracking: string;

  @Column({ type: 'float' })
  readonly cost: number;

  @Column({ type: 'boolean' })
  readonly insured: boolean;

  @Column({ type: 'boolean' })
  readonly paid: boolean;
}
