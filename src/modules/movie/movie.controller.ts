import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity'; // Import the Movie type
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('movie')
@ApiTags('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: 'Fetch and save movies from external API' })
  async saveMovies(): Promise<void> {
    await this.movieService.fetchAndSaveMovies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  async getMovieById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.getMovieById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  async getAllMovies(): Promise<Movie[]> {
    return this.movieService.getAllMovies();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie by ID' })
  async deleteMovieById(@Param('id') id: string): Promise<void> {
    return this.movieService.deleteMovieById(id);
  }
}
