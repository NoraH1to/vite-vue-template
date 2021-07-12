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
export const example = (data: ExampleParams) =>
  POST<ExampleParams, ExampleReturn>({
    url: 'example.com',
    data,
  });
