import { NullToEmptyPipe } from './null-to-empty.pipe';

describe('NullToEmptyPipe', () => {
  it('create an instance', () => {
    const pipe = new NullToEmptyPipe();
    expect(pipe).toBeTruthy();
  });
});
