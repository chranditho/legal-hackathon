import { DemoPipe } from './demo.pipe';

describe('DemoPipe', () => {
  it('transform correctly', () => {
    const pipe = new DemoPipe();
    expect(pipe.transform(4)).toEqual('4 transformed');
  });
});
