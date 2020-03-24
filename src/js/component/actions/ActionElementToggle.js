import { ActionDispatcherBuilder } from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {TypeCheck} from '@flexio-oss/hotballoon/src/js/Types/TypeCheck'
import {assertType} from '@flexio-oss/assert'

export class ActionElementToggle {
  /**
   * @private
   * @param {ActionDispatcher<ElementToggle, ElementToggleBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionElementToggle}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionDeleteItems:create: `dispatcher` should be a Dispatcher'
    )
    return new ActionElementToggle(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.toggle_event_handler_view.types.ElementToggle)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Store<ElementToggle, ElementToggleBuilder>} storeToggleState
   * @returns {ActionElementToggle}
   */
  listen(componentContext, storeToggleState) {
    this.__action.listenWithCallback(
      (payload) => {
        console.log('icici')
        storeToggleState.set(payload)
      },
      componentContext
    )
  }

  /**
   *
   * @returns {ActionDispatcher<ElementToggle, ElementToggleBuilder>}
   */
  action() {
    return this.__action
  }
}
