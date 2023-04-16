import { NullToEmptySetPipe } from './null-to-empty-set.pipe';

describe('NullToEmptySetPipe', () => {
  it('create an instance', () => {
    const pipe = new NullToEmptySetPipe();
    expect(pipe).toBeTruthy();
  });
});
