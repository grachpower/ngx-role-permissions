import { ChildThreeModule } from './child-three.module';

describe('ChildThreeModule', () => {
  let childThreeModule: ChildThreeModule;

  beforeEach(() => {
    childThreeModule = new ChildThreeModule();
  });

  it('should create an instance', () => {
    expect(childThreeModule).toBeTruthy();
  });
});
