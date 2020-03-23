import {FakeViewContainerToggle} from './FakeViewContainerToggle'
import {ViewToggleMounter} from '../src/js/views/ViewToggleMounter/ViewToggleMounter'

export class FakeViewMounterToggle extends ViewToggleMounter{
  constructor(componentContext) {
    super()
    this.componentContext = componentContext
  }
  buildView(viewMounterConfig) {
    return this
  }
  /**
   * @return {ViewContainerToggle}
   */
  viewContainer() {
    return new FakeViewContainerToggle()
  }
}