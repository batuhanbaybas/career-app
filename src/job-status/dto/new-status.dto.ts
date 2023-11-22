import { IsNotEmpty } from 'class-validator';

export class NewStatusDto {
  @IsNotEmpty()
  status: string;
}
