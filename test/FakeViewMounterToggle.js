
export class FakeViewMounterToggle {
  constructor(componentContext) {
    this.componentContext = componentContext
  }
  buildView(viewMounterConfig) {
    return this
  }
  /**
   * @return {FakeViewMounterToggle}
   */
  viewContainer() {
    return new FakeViewMounterToggle(this.componentContext)
  }
}