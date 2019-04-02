import { ChildFourModule } from './child-four.module';

describe('ChildFourModule', () => {
  let childFourModule: ChildFourModule;

  beforeEach(() => {
    childFourModule = new ChildFourModule();
  });

  it('should create an instance', () => {
    expect(childFourModule).toBeTruthy();
  });
});
