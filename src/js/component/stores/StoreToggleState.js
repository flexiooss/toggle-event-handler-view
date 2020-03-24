import {InMemoryStoreBuilder, PublicStoreHandler} from '@flexio-oss/hotballoon'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class StoreToggleState {
  /**
   * @private
   * @param {Store<ElementToggle, ElementToggleBuilder>} store
   */
  constructor(store) {
    this.__store = store
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {boolean} active
   * @return {StoreToggleState}
   */
  static create(componentContext, active) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreExecutions:build: `componentContext` should be a ComponentContext'
    )
    return new StoreToggleState(
      componentContext.addStore(
        new InMemoryStoreBuilder()
          .type(globalFlexioImport.io.flexio.toggle_event_handler_view.types.ElementToggle)
          .initialData(new globalFlexioImport.io.flexio.toggle_event_handler_view.types.ElementToggleBuilder().active(active).build())
          .build()
      )
    )
  }

  /**
   * @returns {Store<ElementToggle, ElementToggleBuilder>}
   */
  store() {
    return this.__store
  }

  /**
   * @returns {PublicStoreHandler<ElementToggle, ElementToggleBuilder>}
   */
  storePublic() {
    return new PublicStoreHandler(this.__store)
  }
}
