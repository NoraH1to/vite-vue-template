import { mock } from 'mockjs';

mock('example.com', 'post', {
  data: {
    hello: 'hello',
    world: 'world',
  },
});
