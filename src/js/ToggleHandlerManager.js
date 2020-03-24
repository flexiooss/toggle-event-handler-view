import {assertType} from '@flexio-oss/assert'
import {ToggleDisplayHandler} from './ToggleDisplayHandler'

export class ToggleHandlerManager {
  constructor() {
    /**
     *
     * @type {Array<ToggleDisplayHandler>}
     * @private
     */
    this.__handlerRegister = []
  }

  /**
   *
   * @param {ToggleDisplayHandler} handler
   */
  addToggleHandler(handler) {
    assertType(handler instanceof ToggleDisplayHandler,
      'ToggleHandlerManager.openAll: context should be an instance of ViewContainerBase'
    )
    this.__handlerRegister.push(handler)
  }

  /**
   *
   */
  openAll() {
    this.__handlerRegister.forEach((handler) => {
      if (!handler.isActive()) {
        handler.open()
      }
    })
  }

  /**
   *
   */
  closeAll() {
    this.__handlerRegister.forEach((handler) => {
      handler.close()
    })
  }

  /**
   *
   * @param {ToggleDisplayHandler} exclusiveHandler
   */
  openExclusive(exclusiveHandler) {
    assertType(exclusiveHandler instanceof ToggleDisplayHandler,
      'ToggleHandlerManager.openExclusive: context should be an instance of ViewContainerBase'
    )
    this.__handlerRegister.forEach((handler) => {
      if (handler.isActive()) {
        handler.close()
      }
    })
    exclusiveHandler.open()
  }

  /**
   *
   * @param {ToggleDisplayHandler} exclusiveHandler
   */
  closeExclusive(exclusiveHandler) {
    assertType(exclusiveHandler instanceof ToggleDisplayHandler,
      'ToggleHandlerManager.openExclusive: context should be an instance of ViewContainerBase'
    )
    this.__handlerRegister.forEach((handler) => {
      if (!handler.isActive()) {
        handler.open()
      }
    })
    exclusiveHandler.close()
  }

  /**
   *
   */
  toggleAll() {
    this.__handlerRegister.forEach((handler) => {
      if (handler.isActive()) {
        handler.close()
      } else {
        handler.open()
      }
    })
  }

  /**
   *
   */
  toggleAllUniformly() {
    let display = false
    this.__handlerRegister.forEach((handler) => {
      if (handler.isActive()) {
        display = true
      }
    })
    if (display) {
      this.closeAll()
    } else {
      this.openAll()
    }
  }
}

/**
 *
 * @param instance
 * @return {boolean}
 */
export const isToggleHandlerManager = (instance) => instance instanceof ToggleHandlerManager
