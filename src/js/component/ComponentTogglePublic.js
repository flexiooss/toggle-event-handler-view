import {ComponentToggle} from './ComponentToggle'
import {assertType} from '@flexio-oss/assert'

const __componentToggle = Symbol('toggle')

export class ComponentTogglePublic {
  constructor(componentToggle) {
    assertType(
      componentToggle instanceof ComponentToggle,
      'componentToggle:constructor `ComponentTogglePublic` argument should be an instance of ComponentToggle'
    )
    this[__componentToggle] = componentToggle
  }

  /**
   * @returns {ActionDispatcher<ElementToggle, ElementToggleBuilder>}
   */
  actionElementToggled() {
    return this[__componentToggle].actionElementToggled()
  }

  remove() {
    this[__componentToggle].remove()
  }

  /**
   * @return {Element}
   */
  title() {
    return this[__componentToggle].title()
  }

  /**
   * @return {Element}
   */
  content() {
    return this[__componentToggle].content()
  }
}

/**
 * @param instance
 * @return {boolean}
 */
export const isComponentTogglePublic = (instance) => instance instanceof ComponentTogglePublic
