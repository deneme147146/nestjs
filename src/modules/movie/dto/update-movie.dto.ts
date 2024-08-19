import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly overview?: string;

  @IsNumber()
  @IsOptional()
  readonly popularity?: number;

  @IsNumber()
  @IsOptional()
  readonly voteAverage?: number;

  @IsNumber()
  @IsOptional()
  readonly voteCount?: number;

  @IsString()
  @IsOptional()
  readonly releaseDate?: string;

  @IsArray()
  @IsOptional()
  readonly genres?: { id: number; name: string }[];
}
