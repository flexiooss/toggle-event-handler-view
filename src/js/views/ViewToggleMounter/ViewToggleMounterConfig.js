import {isBoolean, isFunction, isNode, isString} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {isTheme} from '@flexio-oss/js-style-theme-interface'
import {isComponentTogglePublic} from '../../component/ComponentTogglePublic'
import {ViewToggle} from '../views/ViewToggle'
import {isIconist} from '@flexio-corp/iconist'


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
     * @type {ComponentTogglePublic}
     * @private
     */
    this.__componentToggle = null

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
    TypeCheck.isComponentContext(componentContext)
    this.__componentContext = componentContext
    return this
  }

  /**
   *
   * @param {Element} parentNode
   * @return {ViewToggleMounterConfig}
   */
  parentNode(parentNode) {
    isNode(parentNode)
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {ComponentTogglePublic} componentToggle
   * @returns {ViewToggleMounterConfig}
   */
  componentToggle(componentToggle) {
    isComponentTogglePublic(componentToggle)
    this.__componentToggle = componentToggle
    return this
  }

  /**
   *
   * @param {ThemeStyle} styles
   * @returns {ViewToggleMounterConfig}
   */
  styles(styles) {
    isTheme(styles)
    this.__styles = styles
    return this
  }

  /**
   *
   * @param {function(ViewContainer, ThemeStyle, string, ToggleHandlerManager, boolean): ViewToggleInterface} view
   * @returns {ViewToggleMounterConfig}
   */
  view(view) {
    isFunction(view)
    this.__view = view
    return this
  }

  /**
   *
   * @param {string} idPrefix
   * @returns {ViewToggleMounterConfig}
   */
  idPrefix(idPrefix) {
    isString(idPrefix)
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
    isBoolean(isActive)
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
    return this.__componentToggle.actionElementToggled()
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
