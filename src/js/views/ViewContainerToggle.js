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
   */
  constructor(viewContainerParameters, styles, view) {
    super(viewContainerParameters)

    this.__styles = styles
    this.__view = view(this)

    assertType(implementsViewToggleInterface(this.__view),
      'ViewContainerToggle: `view` should be a ViewToggleInterface'
    )

    /**
     *
     * @type {ViewToggleInterface}
     * @private
     */
    this.__viewToggle = this.addView(this.__view)
  }

  title() {
    return this.__viewToggle.title()
  }

  content() {
    return this.__viewToggle.content()
  }
}
