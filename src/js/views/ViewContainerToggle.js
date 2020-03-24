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
   * @param {function(ViewContainer, ThemeStyle, string, ToggleHandlerManager, boolean): ViewToggleInterface} view
   * @param {ActionDispatcher<ElementToggle, ElementToggleBuilder>} actionEventToggled
   * @param {string} idPrefix
   * @param {ToggleHandlerManager} toggleHandlerManager
   * @param {boolean} isActive
   */
  constructor(viewContainerParameters, styles, view, actionEventToggled, idPrefix, toggleHandlerManager, isActive) {
    super(viewContainerParameters)

    this.__styles = styles
    this.__actionEventToggled = actionEventToggled
    this.__idPrefix = idPrefix
    this.__toggleHandlerManager = toggleHandlerManager
    this.__isActive = isActive
    this.__view = view(this, this.__styles, this.__idPrefix, this.__toggleHandlerManager, this.__isActive)
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
