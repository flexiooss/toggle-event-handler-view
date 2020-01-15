'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {implementsViewToggleInterface} from './views/ViewToggleInterface'

/**
 * @extends ViewContainer
 */
export class ViewContainerToggle extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {ThemeStyle} styles
   * @param {Function} view
   * @param {ActionDispatcher<ElementToggle, ElementToggleBuilder>} actionEventToggled
   */
  constructor(viewContainerParameters, styles, view, actionEventToggled) {
    super(viewContainerParameters)

    this.__styles = styles
    this.__view = view(this)
    this.__actionEventToggled = actionEventToggled

    assertType(implementsViewToggleInterface(this.__view),
      'ViewContainerToggle: `view` should be a ViewToggleInterface'
    )

    /**
     *
     * @type {ViewToggleInterface & View}
     * @private
     */
    this.__viewToggle = this.addView(this.__view)


    this.__viewToggle.on()
      .toggleEvent((payload) => {
        this.__actionEventToggled.dispatch(
          this.__actionEventToggled.payloadBuilder().avtive(payload).build()
        )
      })
  }

  title() {
    return this.__viewToggle.title()
  }

  content() {
    return this.__viewToggle.content()
  }
}
