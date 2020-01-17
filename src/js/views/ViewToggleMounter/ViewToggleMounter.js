import {ViewToggleMounterConfig} from './ViewToggleMounterConfig'
import {assertType} from '@flexio-oss/assert'
import {ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewContainerToggle} from '../ViewContainerToggle'

export class ViewToggleMounter {
  constructor() {
    /**
     *
     * @type {?ViewContainerToggle}
     * @private
     */
    this.__viewContainer = null
  }

  /**
   *
   * @param {ViewToggleMounterConfig} viewMounterConfig
   * @return {ViewToggleMounter}
   */
  buildView(viewMounterConfig) {
    assertType(
      viewMounterConfig instanceof ViewToggleMounterConfig,
      'ViewLogsMounter:buildView: `viewMounterConfig` argument should be a ViewLogContentMounterConfig'
    )
    this.__viewContainer = new ViewContainerToggle(
      new ViewContainerParameters(
        viewMounterConfig.getComponentContext(),
        viewMounterConfig.getComponentContext().nextID(),
        viewMounterConfig.getParentNode()
      ),
      viewMounterConfig.getStyles(),
      viewMounterConfig.getIcons(),
      viewMounterConfig.getView(),
      viewMounterConfig.getActionEventToggled(),
      viewMounterConfig.getIDPrefix(),
      viewMounterConfig.getToggleHandlerManager(),
      viewMounterConfig.getIsActive()
  )

    assertType(
      this.__viewContainer instanceof ViewContainerToggle,
      '`viewContainer` should be ViewContainerPipelines'
    )

    this.__viewContainer.renderAndMount()

    return this
  }

  /**
   * @return {?ViewContainerToggle}
   */
  viewContainer() {
    return this.__viewContainer
  }
}

/**
 *
 * @param instance
 * @return {boolean}
 */
export const isViewToggleMounter = (instance) => instance instanceof ViewToggleMounter

