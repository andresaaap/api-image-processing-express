const supertest = require('supertest');
// import exports.default = app; from build/index.js
const app = require('../build/index').default;
const TransformerService =
  require('../build/services/TransformerService').default;

describe('Test TransformerService', () => {
  it('resize non-existent image 200 200 rejects', async () => {
    let transformerService = new TransformerService();
    await expectAsync(
      transformerService.resize('cat.jpg', 200, 200)
    ).toBeRejectedWithError();
  });
});

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('send request to api endpoint dog.jpg 200 200 successfully', async () => {
    const response = await request
      .get('/api/images')
      .query({ filename: 'dog.jpg', width: 200, height: 200 });

    expect(response.status).toBe(200);
  });
});
