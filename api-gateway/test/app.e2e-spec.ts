import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('Prueba 001:', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'eolivera@dino.com.pe',
        password: '12345678',
      });
    console.log('/auth/login: ', response.body);
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
  }, 30000);

  /*it('/auth/login (POST)', () => {
    console.log('test 001');
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'eolivera@dino.com.pe',
        password: '12345678',
      })
      .expect(200)
      .expect({});
  });*/
});
