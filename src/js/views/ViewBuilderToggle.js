import {ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewContainerToggle} from './ViewContainerToggle'
import {ViewToggle} from './views/ViewToggle'
import {isBoolean, isNull} from '@flexio-oss/assert'
import {ToggleHandlerManager} from '../ToggleHandlerManager'

export class ViewBuilderToggle {
  constructor() {
    /**
     *
     * @type {ComponentContext}
     * @private
     */
    this.__componentContext = null
    this.__parentNode = null
    this.__styles = null
    this.__idPrefix = ''
    this.__toggleHandlerManager = null
    this.__isActive = null
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @return ViewBuilderToggle
   */
  componentContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }

  /**
   *
   * @param {Element} parentNode
   * @return ViewBuilderToggle
   */
  parentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {ThemeStyle} styles
   * @return {ViewBuilderToggle}
   */
  styles(styles) {
    this.__styles = styles
    return this
  }

  /**
   *
   * @param {string} idPrefix
   * @return {ViewBuilderToggle}
   */
  idPrefix(idPrefix) {
    this.__idPrefix = idPrefix
    return this
  }

  /**
   *
   * @param {ToggleHandlerManager} toggleHandlerManager
   * @returns {ViewBuilderToggle}
   */
  toggleHandlerManager(toggleHandlerManager) {
    this.__toggleHandlerManager = toggleHandlerManager
    return this
  }

  /**
   *
   * @param {ComponentTogglePublic} componentToggle
   * @returns {ViewBuilderToggle}
   */
  componentToggle(componentToggle) {
    this.__componentToggle = componentToggle
    return this
  }

  /**
   *
   * @param {boolean} isActive
   */
  isActiveByDefault(isActive) {
    isBoolean(isActive)
    this.__isActive = isActive
    return this
  }

  build() {
    if (isNull(this.__toggleHandlerManager)) {
      this.__toggleHandlerManager = new ToggleHandlerManager()
    }
    if (isNull(this.__isActive)) {
      this.__isActive = false
    }
    this.__view = (viewContainer) => new ViewToggle(viewContainer, this.__styles, this.__idPrefix, this.__toggleHandlerManager, this.__isActive)
    let container =  new ViewContainerToggle(
      new ViewContainerParameters(
        this.__componentContext,
        this.__componentContext.nextID(),
        this.__parentNode
      ),
      this.__styles,
      this.__view,
      this.__componentToggle.actionElementToggled()
    )

    container.renderAndMount()
    this.__componentContext.addViewContainer(container)
    return container
  }
}