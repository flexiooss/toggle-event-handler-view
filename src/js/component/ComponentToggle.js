import '../../../generated/io/package'
import {ActionElementToggle} from './actions/ActionElementToggle'
import {ViewToggleMounterConfig} from '../views/ViewToggleMounter/ViewToggleMounterConfig'
import {StoreToggleState} from './stores/StoreToggleState'

export class ComponentToggle {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Element} parentNode
   * @param {ThemeStyle} styles
   * @param {ViewToggleMounter} viewToggleMounter
   * @param {string} prefix
   * @param {function(ViewToggleBuildersConfig): ViewToggleInterface} view
   * @param {boolean} isActive
   */
  constructor(componentContext, parentNode, styles, viewToggleMounter, prefix, view, isActive) {
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__styles = styles
    this.__viewToggleMounter = viewToggleMounter
    this.__prefix = prefix
    this.__view = view
    this.__isActive = isActive

    this.__storeToggleState = StoreToggleState.create(this.__componentContext, this.__isActive)
    this.__actionElementToggled = ActionElementToggle.create(this.__componentContext.dispatcher())
    this.__actionElementToggled.listen(this.__componentContext, this.__storeToggleState.store())

    this.__mountView()
  }

  __mountView() {
    this.__viewContainer = this.__viewToggleMounter.buildView(new ViewToggleMounterConfig()
        .componentContext(this.__componentContext)
        .parentNode(this.__parentNode)
        .idPrefix(this.__prefix)
        .styles(this.__styles)
        .actionElementToggled(this.__actionElementToggled.action())
        .storeToggleState(this.__storeToggleState.storePublic())
        .view(this.__view)
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
   * @return {boolean}
   */
  isActive() {
    return this.__storeToggleState.store().state().data().active()
  }

  open() {
    this.__actionElementToggled.action().dispatch(this.__actionElementToggled.action().payloadBuilder().active(true).build())
  }

  close() {
    this.__actionElementToggled.action().dispatch(this.__actionElementToggled.action().payloadBuilder().active(false).build())
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
