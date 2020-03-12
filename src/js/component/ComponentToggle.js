import '../../../generated/io/package'
import {ActionElementToggle} from './actions/ActionElementToggle'

export class ComponentToggle {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    this.__componentContext = componentContext

    this.__actionElementToggled = ActionElementToggle.create(this.__componentContext.dispatcher())
  }

  /**
   *
   * @returns {ActionDispatcher<ElementToggle, ElementToggleBuilder>}
   */
  actionElementToggled() {
    return this.__actionElementToggled.action()
  }

  remove() {
    this.__componentContext.logger().log(
      this.__componentContext.logger().builder()
        .info()
        .pushLog(this.constructor.name + ': Hotballoon killed me'),
      { color: '#ca4ee2', titleSize: 3 }
    )
    this.__componentContext.remove()
  }
}
