import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType, isNull} from '@flexio-oss/assert'
import {ComponentTogglePublic} from './ComponentTogglePublic'
import {ComponentToggle} from './ComponentToggle'

export class ComponentToggleBuilder {
  constructor() {
    /**
     *
     * @type {HotBalloonApplication}
     * @private
     */
    this.__application = null
  }

  /**
   * @param {HotBalloonApplication} application
   * @return {ComponentToggleBuilder}
   */
  application(application) {
    TypeCheck.isHotballoonApplication(application)
    this.__application = application
    return this
  }

  /**
   * @return {ComponentTogglePublic}
   */
  build() {
    assertType(!isNull(this.__application), 'application node should be set')
    return new ComponentTogglePublic(
      new ComponentToggle(
        this.__application.addComponentContext()
      )
    )
  }
}
