import {EventListenerOrderedBuilder} from '@flexio-oss/hotballoon'
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
   * @returns {ToggleDisplayHandler}
   */
  subscribeToEventToggled(clb) {
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
   * @param context
   * @returns {ToggleDisplayHandler}
   */
  addEventToggle(context) {
    context(
      EventListenerOrderedBuilder
        .listen(EVENT_TOGGLE)
        .callback((payload) => {
          this.__display = (payload || !this.__display)
          this.__dispatcher.dispatch(EVENT_TOGGLED, this.__display)
        })
        .build()
    )
    return this
  }

  /**
   *
   * @returns {boolean}
   */
  isActive() {
    return this.__display
  }

  close() {
    this.__display = false
    this.__dispatcher.dispatch(EVENT_TOGGLED, this.__display)
  }

  open() {
    this.__display = true
    this.__dispatcher.dispatch(EVENT_TOGGLED, this.__display)
  }
}
