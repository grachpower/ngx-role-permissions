import { ChildModule } from './child.module';

describe('ChildModule', () => {
  let childModule: ChildModule;

  beforeEach(() => {
    childModule = new ChildModule();
  });

  it('should create an instance', () => {
    expect(childModule).toBeTruthy();
  });
});
