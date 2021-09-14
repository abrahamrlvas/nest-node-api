import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly tracking: string;

  @IsNotEmpty()
  @IsNumber()
  readonly cost: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly insured: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly paid: boolean;
}
