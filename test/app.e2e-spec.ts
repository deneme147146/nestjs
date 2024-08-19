import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MovieModule } from 'src/modules/movie/movie.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const idMovie ="66a93bd129fb2097591f0079"
  const idMovie2 ="66a93bd129gs2097591f0089"
  const movieId = "66a93bd029fb2097591f006e"
  const newMovie = {
  "name": "Deadpool & Wolverine",
  "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
  "popularity": 7220.83,
  "voteAverage": 8.007,
  "voteCount": 824,
  "releaseDate": "2024-07-24T00:00:00.000Z",
  "genres": [
    {
      "id": 28,
      "name": "Action",
      
    },
    {
      "id": 35,
      "name": "Comedy",
      
    },
    {
      "id": 878,
      "name": "Science Fiction",
    }
  ],
  "__v": 0
}
  const emptyId ="66a93bd5685b2097591f0079"

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });


  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get(`/movie/${movieId}`)
      .expect(200)
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get(`/movie/${emptyId}`)
      .expect(404)
  });
  it('should create a new movie', () => {
    return request(app.getHttpServer())
      .post('/movie/create')
      .send(newMovie)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('title', newMovie.name);
        expect(res.body).toHaveProperty('director', newMovie.overview);
        expect(res.body).toHaveProperty('releaseDate', newMovie.releaseDate);
      });
  });
  it('should fetch and save movies from external API', () => {
    return request(app.getHttpServer())
      .post('/movie')
      .expect(201);
  });
  it('should update a movie by ID', () => {
    return request(app.getHttpServer())
      .patch(`/movie/${idMovie2}`)
      .send(idMovie2)
      .expect(200)
      .expect('Content-Type', /json/)
     
  });
  it('should delete a movie by ID', () => {
    return request(app.getHttpServer())
      .delete(`/movie/${idMovie2}`)
      .expect(200);
  });
});
