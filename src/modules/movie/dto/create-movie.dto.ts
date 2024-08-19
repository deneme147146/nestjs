import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly overview: string;

  @IsNumber()
  readonly popularity: number;

  @IsNumber()
  readonly voteAverage: number;

  @IsNumber()
  readonly voteCount: number;

  @IsString()
  readonly releaseDate: string;

  @IsArray()
  readonly genres: { id: number; name: string }[];
}
