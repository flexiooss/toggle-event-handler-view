import {ActionElementToggle} from './actions/ActionElementToggle'

export class ComponentToggle {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    this.__componentContext= componentContext

    this.__actionElementToggled = ActionElementToggle.create(this.__componentContext.dispatcher())
  }

  /**
   *
   * @returns {ActionDispatcher<ElementToggle, ElementToggleBuilder>}
   */
  actionElementToggled() {
    return this.__actionElementToggled.action()
  }
}