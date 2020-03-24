'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {implementsViewToggleInterface} from './views/ViewToggleInterface'
import {ViewToggleBuildersConfig} from './ViewToggleMounter/ViewToggleBuilders'

/**
 * @extends ViewContainer
 */
export class ViewContainerToggle extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {ThemeStyle} styles
   * @param {function(ViewToggleBuildersConfig): ViewToggleInterface} view
   * @param {ActionDispatcher<ElementToggle, ElementToggleBuilder>} actionEventToggled
   * @param {string} idPrefix
   * @param {PublicStoreHandler<ElementToggle, ElementToggleBuilder>} storeToggleState
   */
  constructor(viewContainerParameters, styles, view, actionEventToggled, idPrefix, storeToggleState) {
    super(viewContainerParameters)

    this.__styles = styles
    this.__actionEventToggled = actionEventToggled
    this.__idPrefix = idPrefix
    this.__storeToggleState = storeToggleState
    this.__view = view(new ViewToggleBuildersConfig(this, this.__styles, this.__idPrefix, this.__storeToggleState))
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
          this.__actionEventToggled.payloadBuilder().active(payload).build()
        )
      })
  }

  /**
   * @return {Element}
   */
  title() {
    return this.__viewToggle.title()
  }

  /**
   * @return {Element}
   */
  content() {
    return this.__viewToggle.content()
  }
}
