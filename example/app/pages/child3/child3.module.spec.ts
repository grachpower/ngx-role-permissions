import { Child3Module } from './child3.module';

describe('Child3Module', () => {
  let child3Module: Child3Module;

  beforeEach(() => {
    child3Module = new Child3Module();
  });

  it('should create an instance', () => {
    expect(child3Module).toBeTruthy();
  });
});
