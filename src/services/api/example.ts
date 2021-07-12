import { POST } from '@/services';

export interface ExampleParams {
  hello: string;
  world?: string;
}
export interface ExampleReturn {
  data: {
    hello: string;
    world?: string;
  };
}
export const example = () =>
  POST<ExampleReturn>({
    url: 'example.com',
  });
