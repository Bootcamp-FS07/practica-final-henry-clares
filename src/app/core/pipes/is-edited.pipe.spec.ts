import { IsEditedPipe } from './is-edited.pipe';

describe('IsEditedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsEditedPipe();
    expect(pipe).toBeTruthy();
  });
});
