import {assertType} from '@flexio-oss/assert'
import {ComponentTogglePublic} from './component/ComponentTogglePublic'
import {BooleanArray} from '@flexio-oss/flex-types'

export class ToggleHandlerManager {
  constructor() {
    /**
     *
     * @type {Array<ComponentTogglePublic>}
     * @private
     */
    this.__componentToggleRegister = []
  }

  /**
   *
   * @param {ComponentTogglePublic} componentToggle
   */
  addComponentToggle(componentToggle) {
    assertType(componentToggle instanceof ComponentTogglePublic,
      'ToggleHandlerManager.componentToggle: context should be an instance of ComponentTogglePublic'
    )
    this.__componentToggleRegister.push(componentToggle)
  }

  /**
   *
   */
  openAll() {
    this.__componentToggleRegister.forEach((component) => {
      if (!component.isActive()) {
        component.open()
      }
    })
  }

  /**
   *
   */
  closeAll() {
    this.__componentToggleRegister.forEach((component) => {
      if (component.isActive()) {
        component.close()
      }
    })
  }

  /**
   *
   * @param {int} id
   */
  openExclusive(id) {
    this.__componentToggleRegister.forEach((component) => {
      if (component.isActive()) {
        component.close()
      }
    })
    this.__componentToggleRegister[id].open()
  }

  /**
   *
   * @param {int} id
   */
  closeExclusive(id) {
    this.__componentToggleRegister.forEach((component) => {
      if (!component.isActive()) {
        component.open()
      }
    })
    this.__componentToggleRegister[id].close()
  }

  /**
   *
   */
  toggleAll() {
    this.__componentToggleRegister.forEach((component) => {
      if (component.isActive()) {
        component.close()
      } else {
        component.open()
      }
    })
  }

  /**
   *
   */
  toggleAllUniformly() {
    let display = false
    this.__componentToggleRegister.forEach((component) => {
      if (component.isActive()) {
        display = true
      }
    })
    if (display) {
      this.closeAll()
    } else {
      this.openAll()
    }
  }

  getState() {
    let result = new BooleanArray()

    this.__componentToggleRegister.forEach((component) => {
      result.push(component.isActive())
    })

    return result
  }

  remove() {
    this.__componentToggleRegister = null
  }
}

/**
 *
 * @param instance
 * @return {boolean}
 */
export const isToggleHandlerManager = (instance) => instance instanceof ToggleHandlerManager
