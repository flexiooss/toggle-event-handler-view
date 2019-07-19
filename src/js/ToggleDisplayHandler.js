import {
  e,
  ElementEventListenerBuilder,
  EventListenerOrderedBuilder,
  RECONCILIATION_RULES,
  TypeCheck
} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {EventDispatcher} from './EventDispatcher'

const EVENT_TOGGLE = 'EVENT_TOGGLE'
const EVENT_TOGGLED = 'EVENT_TOGGLED'

export class ToggleDisplayHandler {
  constructor(display = true) {
    this.__display = display
    this.__dispatcher = new EventDispatcher()
  }

  /**
   *
   * @param {function} clb
   * @returns {ToggleDisplayHandler}
   */
  addEventToggle(clb) {
    this.__dispatcher.addEventListener(
      EventListenerOrderedBuilder
        .listen(EVENT_TOGGLE)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
    return this
  }

  /**
   *
   * @param {function} clb
   * @returns {ToggleDisplayHandler}
   */
  addEventToggled(clb) {
    this.__dispatcher.addEventListener(
      EventListenerOrderedBuilder
        .listen(EVENT_TOGGLED)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
    return this
  }

  /**
   *
   * @param {View} context
   * @param {View} view
   * @returns {Element}
   */
  addViewClickZone(context, view) {
    assertType(TypeCheck.isViewContainerBase(context),
      'ToggleDisplayHandler.addClickZone: context should be an instance of ViewContainerBase'
    )
    assertType(TypeCheck.isView(view),
      'ToggleDisplayHandler.addClickZone: view should be an instance of View'
    )

    this.addEventToggle(
      (payload) => {
        if (payload !== this.__display) {
          this.__display = (payload || !this.__display)
          this.__dispatcher.dispatch(EVENT_TOGGLED, this.__display)
        }
      }
    )

    return context.html(
      e('div#toggleMaster.toggleMaster')
        .views(view)
        .listenEvent(ElementEventListenerBuilder.listen('click')
          .callback((e) => {
            this.__dispatcher.dispatch(EVENT_TOGGLE, !this.__display)
          })
          .build())
        .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
    )
  }

  /**
   *
   * @param {View} context
   * @param {View} view
   * @returns {Element}
   */
  addToggleView(context, view) {
    assertType(TypeCheck.isViewContainerBase(context),
      'ToggleDisplayHandler.addToggleView: context should be an instance of ViewContainerBase'
    )
    assertType(TypeCheck.isView(view),
      'ToggleDisplayHandler.addToggleView: view should be an instance of View'
    )

    this.addEventToggled(
      (payload) => {
        context.nodeRef('toggleSlave').style.display = (this.__display ? 'block' : 'none')
      })
    return context.html(
      e('div#toggleSlave.toggleSlave')
        .styles({display: (this.__display ? 'block' : 'none')})
        .views(view)
    )
  }

  /**
   *
   * @returns {string}
   */
  eventToggle() {
    return EVENT_TOGGLED
  }

  /**
   *
   * @returns {boolean}
   */
  isActive() {
    return this.__display
  }

  close() {
    this.__dispatcher.dispatch(EVENT_TOGGLE, false)
  }

  open() {
    this.__dispatcher.dispatch(EVENT_TOGGLE, true)
  }
}