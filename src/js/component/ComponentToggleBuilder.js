import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType, isNull} from '@flexio-oss/assert'
import {ComponentTogglePublic} from './ComponentTogglePublic'
import {ComponentToggle} from './ComponentToggle'

export class ComponentToggleBuilder {
  constructor() {
    this.__componentContext = null
  }

  /**
   * @param {ComponentContext} value
   * @return {ComponentToggleBuilder}
   */
  componentContext(value) {
    TypeCheck.isComponentContext(value)
    this.__componentContext = value
    return this
  }

  /**
   * @return {ComponentTogglePublic}
   */
  build() {
    assertType(!isNull(this.__componentContext), 'componentContext node should be set')
    return new ComponentTogglePublic(
      new ComponentToggle(
        this.__componentContext
      )
    )
  }
}
