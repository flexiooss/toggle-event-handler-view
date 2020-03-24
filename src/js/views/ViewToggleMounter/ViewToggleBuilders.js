import {ViewToggle} from '../views/ViewToggle'


export class ViewToggleBuilders {
  /**
   *
   * @returns {function(ViewToggleBuildersConfig): ViewToggleInterface}
   */
  static viewToggle() {
    return (viewToggleBuildersConfig) => new ViewToggle(viewToggleBuildersConfig)
  }
}

export class ViewToggleBuildersConfig {
  /**
   *
   * @param {ViewContainerBase} viewContainer
   * @param {ThemeStyle} styles
   * @param {string} idPrefix
   * @param {PublicStoreHandler<ElementToggle, ElementToggleBuilder>} storeToggleState
   */
  constructor(viewContainer, styles, idPrefix, storeToggleState) {
    this.__viewContainer = viewContainer
    this.__styles = styles
    this.__idPrefix = idPrefix
    this.__storeToggleState = storeToggleState
  }

  /**
   *
   * @return {ViewContainerBase}
   */
  viewContainer() {
    return this.__viewContainer
  }

  /**
   *
   * @return {ThemeStyle}
   */
  styles() {
    return this.__styles
  }

  /**
   *
   * @return {string}
   */
  idPrefix() {
    return this.__idPrefix
  }

  /**
   *
   * @return {PublicStoreHandler<ElementToggle, ElementToggleBuilder>}
   */
  storeToggleState() {
    return this.__storeToggleState
  }
}