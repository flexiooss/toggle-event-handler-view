import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, assertType, isBoolean, isFunction, isNode, isNull, isString} from '@flexio-oss/assert'
import {ComponentTogglePublic} from './ComponentTogglePublic'
import {ComponentToggle} from './ComponentToggle'
import {isTheme} from '@flexio-oss/js-style-theme-interface'
import {isViewToggleMounter} from '../views/ViewToggleMounter/ViewToggleMounter'

export class ComponentToggleBuilder {
  constructor() {
    /**
     *
     * @type {HotBalloonApplication}
     * @private
     */
    this.__application = null

    /**
     *
     * @type {Element}
     * @private
     */
    this.__parentNode = null

    /**
     *
     * @type {ThemeStyle}
     * @private
     */
    this.__styles = null

    /**
     *
     * @type {function(ViewToggleBuildersConfig): ViewToggleInterface}
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
     * @type {boolean}
     * @private
     */
    this.__isActive = false

    /**
     *
     * @type {ViewToggleMounter}
     * @private
     */
    this.__viewToggleMounter = null
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
   *
   * @param {Element} parentNode
   * @return {ComponentToggleBuilder}
   */
  parentNode(parentNode) {
    assert(isNode(parentNode), 'ViewToggleMounterConfig:parentNode: argument should be a node')
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {ThemeStyle} styles
   * @returns {ComponentToggleBuilder}
   */
  styles(styles) {
    assert(isTheme(styles), 'ViewToggleMounterConfig:parentNode: argument should be a Theme')
    this.__styles = styles
    return this
  }

  /**
   *
   * @param {function(ViewToggleBuildersConfig): ViewToggleInterface} view
   * @returns {ComponentToggleBuilder}
   */
  view(view) {
    assert(isFunction(view), 'ViewToggleMounterConfig:parentNode: argument should be a function')
    this.__view = view
    return this
  }

  /**
   *
   * @param {ViewToggleMounter} viewToggleMounter
   * @returns {ComponentToggleBuilder}
   */
  viewToggleMounter(viewToggleMounter) {
    assert(isViewToggleMounter(viewToggleMounter), 'ViewToggleMounterConfig:viewToggleMounter: argument should be a ViewToggleMounter')
    this.__viewToggleMounter = viewToggleMounter
    return this
  }

  /**
   *
   * @param {string} idPrefix
   * @returns {ComponentToggleBuilder}
   */
  idPrefix(idPrefix) {
    assert(isString(idPrefix), 'ViewToggleMounterConfig:parentNode: argument should be a string')
    this.__idPrefix = idPrefix
    return this
  }

  /**
   *
   * @param {boolean} isActive
   * @returns {ComponentToggleBuilder}
   */
  isActive(isActive) {
    assert(isBoolean(isActive), 'ViewToggleMounterConfig:parentNode: argument should be a boolean')
    this.__isActive = isActive
    return this
  }

  /**
   * @return {ComponentTogglePublic}
   */
  build() {
    assertType(!isNull(this.__application), 'application node should be set')
    return new ComponentTogglePublic(
      new ComponentToggle(
        this.__application.addComponentContext(),
        this.__parentNode,
        this.__styles,
        this.__viewToggleMounter,
        this.__idPrefix,
        this.__view,
        this.__isActive
      )
    )
  }
}
