import '../../../generated/io/package'
import {ActionElementToggle} from './actions/ActionElementToggle'
import {ViewToggleMounterConfig} from '../views/ViewToggleMounter/ViewToggleMounterConfig'

export class ComponentToggle {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Element} parentNode
   * @param {ThemeStyle} styles
   * @param {ViewToggleMounter} viewToggleMounter
   * @param {string} prefix
   * @param {ToggleHandlerManager} toggleHandlerManager
   * @param {function(ViewContainer, ThemeStyle, string, ToggleHandlerManager, boolean): ViewToggleInterface} view
   * @param {boolean} isActive
   */
  constructor(componentContext, parentNode, styles, viewToggleMounter, prefix, toggleHandlerManager, view, isActive) {
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__styles = styles
    this.__viewToggleMounter = viewToggleMounter
    this.__prefix = prefix
    this.__toggleHandlerManager = toggleHandlerManager
    this.__view = view
    this.__isActive = isActive

    this.__actionElementToggled = ActionElementToggle.create(this.__componentContext.dispatcher())

    this.__mountView()
  }

  __mountView() {
    this.__viewContainer = this.__viewToggleMounter.buildView(new ViewToggleMounterConfig()
        .componentContext(this.__componentContext)
        .parentNode(this.__parentNode)
        .idPrefix(this.__prefix)
        .styles(this.__styles)
        .actionElementToggled(this.__actionElementToggled.action())
        .toggleHandlerManager(this.__toggleHandlerManager)
        .view(this.__view)
        .isActive(this.__isActive)
      ).viewContainer()
    this.__componentContext.addViewContainer(this.__viewContainer)
  }

  /**
   * @return {Element}
   */
  title() {
    return this.__viewContainer.title()
  }

  /**
   * @return {Element}
   */
  content() {
    return this.__viewContainer.content()
  }

  /**
   *
   * @returns {ActionDispatcher<ElementToggle, ElementToggleBuilder>}
   */
  actionElementToggled() {
    return this.__actionElementToggled.action()
  }

  remove() {
    this.__componentContext.logger().log(
      this.__componentContext.logger().builder()
        .info()
        .pushLog(this.constructor.name + ': Hotballoon killed me'),
      { color: '#ca4ee2', titleSize: 3 }
    )
    this.__componentContext.remove()
  }
}
