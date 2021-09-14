import { hashPassword, validatePassword } from 'src/utils/hash';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar', length: 255 })
  readonly name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  readonly username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  readonly email: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  public password: string;

  @Column({ type: 'boolean', default: false })
  readonly isActive: boolean;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hashPassword(this.password);
  }

  async validatePassword(password: string): Promise<boolean> {
    return validatePassword(password, this.password);
  }
}
