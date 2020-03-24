import {assert, isBoolean, isFunction, isNode, isString} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {isTheme} from '@flexio-oss/js-style-theme-interface'
import {ViewToggle} from '../views/ViewToggle'
import {ViewMounterConfig} from '@flexio-corp/js-view-common'

/**
 * @extends ViewMounterConfig
 */
export class ViewToggleMounterConfig extends ViewMounterConfig {
  constructor() {
    super()
    /**
     *
     * @type {ComponentContext}
     * @private
     */
    this.__componentContext = null

    /**
     *
     * @type {Element}
     * @private
     */
    this.__parentNode = null

    /**
     *
     * @type {ActionDispatcher<ElementToggle, ElementToggleBuilder>}
     * @private
     */
    this.__actionElementToggled = null

    /**
     *
     * @type {ThemeStyle}
     * @private
     */
    this.__styles = null

    /**
     *
     * @type {function(ViewToggleBuildersConfig): ViewToggleInterface}
     * @private
     */
    this.__view = null

    /**
     *
     * @type {string}
     * @private
     */
    this.__idPrefix = ''

    /**
     *
     * @type {PublicStoreHandler<ElementToggle, ElementToggleBuilder>}
     * @private
     */
    this.__storeToggleState = null
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @return {ViewToggleMounterConfig}
   */
  componentContext(componentContext) {
    assert(TypeCheck.isComponentContext(componentContext), 'ViewToggleMounterConfig:parentNode: argument should be a ComponentContext')
    this.__componentContext = componentContext
    return this
  }

  /**
   *
   * @param {Element} parentNode
   * @return {ViewToggleMounterConfig}
   */
  parentNode(parentNode) {
    assert(isNode(parentNode), 'ViewToggleMounterConfig:parentNode: argument should be a node')
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {ActionDispatcher<ElementToggle, ElementToggleBuilder>}actionElementToggled
   * @returns {ViewToggleMounterConfig}
   */
  actionElementToggled(actionElementToggled) {
    assert(TypeCheck.isActionDispatcher(actionElementToggled), 'ViewToggleMounterConfig:parentNode: argument should be an ActionDispatcher')
    this.__actionElementToggled = actionElementToggled
    return this
  }

  /**
   *
   * @param {ThemeStyle} styles
   * @returns {ViewToggleMounterConfig}
   */
  styles(styles) {
    assert(isTheme(styles), 'ViewToggleMounterConfig:parentNode: argument should be a Theme')

    this.__styles = styles
    return this
  }

  /**
   *
   * @param {function(ViewToggleBuildersConfig): ViewToggleInterface} view
   * @returns {ViewToggleMounterConfig}
   */
  view(view) {
    assert(isFunction(view), 'ViewToggleMounterConfig:parentNode: argument should be a function')
    this.__view = view
    return this
  }

  /**
   *
   * @param {string} idPrefix
   * @returns {ViewToggleMounterConfig}
   */
  idPrefix(idPrefix) {
    assert(isString(idPrefix), 'ViewToggleMounterConfig:parentNode: argument should be a string')
    this.__idPrefix = idPrefix
    return this
  }

  /**
   *
   * @param {PublicStoreHandler<ElementToggle, ElementToggleBuilder>} storeToggleState
   * @returns {ViewToggleMounterConfig}
   */
  storeToggleState(storeToggleState) {
    this.__storeToggleState = storeToggleState
    return this
  }

  /**
   *
   * @returns {ComponentContext}
   */
  getComponentContext() {
    return this.__componentContext
  }

  /**
   *
   * @returns {Element}
   */
  getParentNode() {
    return this.__parentNode
  }


  /**
   *
   * @returns {ActionDispatcher<ElementToggle, ElementToggleBuilder>}
   */
  getActionEventToggled() {
    return this.__actionElementToggled
  }

  /**
   *
   * @returns {ThemeStyle}
   */
  getStyles() {
    return this.__styles
  }

  /**
   *
   * @returns {function(ViewToggleBuildersConfig): ViewToggleInterface}
   */
  getView() {
    return this.__view
  }

  /**
   *
   * @returns {string}
   */
  getIDPrefix() {
    return this.__idPrefix
  }

  /**
   *
   * @returns {PublicStoreHandler<ElementToggle, ElementToggleBuilder>}
   */
  getStoreToggleState() {
    return this.__storeToggleState
  }
}
