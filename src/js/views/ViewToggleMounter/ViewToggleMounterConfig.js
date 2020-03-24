import {assert, isBoolean, isFunction, isNode, isString} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {isTheme} from '@flexio-oss/js-style-theme-interface'
import {ViewToggle} from '../views/ViewToggle'


export class ViewToggleMounterConfig {
  constructor() {
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
     * @type {function(ViewContainer, ThemeStyle, string, ToggleHandlerManager, boolean): ViewToggleInterface}
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
     * @type {ToggleHandlerManager}
     * @private
     */
    this.__toggleHandlerManager = null

    /**
     *
     * @type {boolean}
     * @private
     */
    this.__isActive = false
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
   * @param {function(ViewContainer, ThemeStyle, string, ToggleHandlerManager, boolean): ViewToggleInterface} view
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
   * @param {ToggleHandlerManager}toggleHandlerManager
   * @returns {ViewToggleMounterConfig}
   */
  toggleHandlerManager(toggleHandlerManager) {
    this.__toggleHandlerManager = toggleHandlerManager
    return this
  }

  /**
   *
   * @param {boolean} isActive
   * @returns {ViewToggleMounterConfig}
   */
  isActive(isActive) {
    assert(isBoolean(isActive), 'ViewToggleMounterConfig:parentNode: argument should be a boolean')
    this.__isActive = isActive
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
   * @returns {function(ViewContainer, ThemeStyle, string, ToggleHandlerManager, boolean): ViewToggleInterface}
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
   * @returns {ToggleHandlerManager}
   */
  getToggleHandlerManager() {
    return this.__toggleHandlerManager
  }

  /**
   *
   * @returns {boolean}
   */
  getIsActive() {
    return this.__isActive
  }
}

export class ViewToggleBuilders {
  /**
   *
   * @returns {function(ViewContainer, ThemeStyle, string, ToggleHandlerManager, boolean): ViewToggleInterface}
   */
  static viewToggle() {
    return (viewContainer, styles, idPrefix, toggleHandlerManager, isActive) => new ViewToggle(viewContainer, styles, idPrefix, toggleHandlerManager, isActive)
  }
}
