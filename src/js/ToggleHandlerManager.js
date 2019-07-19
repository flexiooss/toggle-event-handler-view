import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {EventToggle, ToggleDisplayHandler} from './ToggleDisplayHandler'

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
   * @param {ViewContainerBase} context
   */
  openAll(context) {
    assertType(TypeCheck.isViewContainerBase(context),
      'ToggleHandlerManager.openAll: context should be an instance of ViewContainerBase'
    )
    this.__handlerRegister.forEach((handler) => {
      handler.open(context)
    })
  }

  /**
   *
   * @param {ViewContainerBase} context
   */
  closeAll(context) {
    assertType(TypeCheck.isViewContainerBase(context),
      'ToggleHandlerManager.closeAll: context should be an instance of ViewContainerBase'
    )
    this.__handlerRegister.forEach((handler) => {
      handler.close(context)
    })
  }

  /**
   *
   * @param {ViewContainerBase} context
   * @param {ToggleDisplayHandler} exclusiveHandler
   */
  openExclusive(context, exclusiveHandler) {
    assertType(TypeCheck.isViewContainerBase(context),
      'ToggleHandlerManager.openExclusive: context should be an instance of ViewContainerBase'
    )
    assertType(exclusiveHandler instanceof ToggleDisplayHandler,
      'ToggleHandlerManager.openExclusive: context should be an instance of ViewContainerBase'
    )
    this.__handlerRegister.forEach((handler) => {
      handler.close(context)
    })
    exclusiveHandler.open(context)
  }

  /**
   *
   * @param {ViewContainerBase} context
   * @param {ToggleDisplayHandler} exclusiveHandler
   */
  closeExclusive(context, exclusiveHandler) {
    assertType(TypeCheck.isViewContainerBase(context),
      'ToggleHandlerManager.openExclusive: context should be an instance of ViewContainerBase'
    )
    assertType(exclusiveHandler instanceof ToggleDisplayHandler,
      'ToggleHandlerManager.openExclusive: context should be an instance of ViewContainerBase'
    )
    this.__handlerRegister.forEach((handler) => {
      handler.open(context)
    })
    exclusiveHandler.close(context)
  }

  /**
   *
   * @param {ViewContainerBase} context
   */
  toggleAll(context) {
    assertType(TypeCheck.isViewContainerBase(context),
      'ToggleHandlerManager.toggleAllUniformly: context should be an instance of ViewContainerBase'
    )
    let display = true
    this.__handlerRegister.forEach((handler) => {
      if (handler.isActive()) {
        handler.close(context)
      } else {
        handler.open(context)
      }
    })
  }

  /**
   *
   * @param {ViewContainerBase} context
   */
  toggleAllUniformly(context) {
    assertType(TypeCheck.isViewContainerBase(context),
      'ToggleHandlerManager.toggleAllUniformly: context should be an instance of ViewContainerBase'
    )
    let display = false
    this.__handlerRegister.forEach((handler) => {
      if (handler.isActive()) {
        display = true
      }
    })
    if (display) {
      this.closeAll(context)
    } else {
      this.openAll(context)
    }
  }
}
