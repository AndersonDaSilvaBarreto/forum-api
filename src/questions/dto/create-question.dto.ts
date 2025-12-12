import { IsString, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @Length(6, 30)
  title: string;

  @IsString()
  @Length(30)
  body: string;
}
