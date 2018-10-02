import { ChildTwoModule } from './child-two.module';

describe('ChildTwoModule', () => {
  let childTwoModule: ChildTwoModule;

  beforeEach(() => {
    childTwoModule = new ChildTwoModule();
  });

  it('should create an instance', () => {
    expect(childTwoModule).toBeTruthy();
  });
});
