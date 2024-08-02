import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema, MovieModel } from './entities/movie.entity'; // Adjust import as necessary

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]), // Use 'Movie' as the model name
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
