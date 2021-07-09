import { POST } from '@/services';

export interface ExampleParams {
  p1: string;
  p2?: number;
}
export interface ExampleReturn {
  data: {
    a: string;
    b?: number;
  };
}
export const example = (data: ExampleParams) =>
  POST<ExampleParams, ExampleReturn>({
    url: 'example.com',
    data,
  });
