import {ViewPublicEventHandler} from '@flexio-oss/hotballoon'

export class ToggleEvent extends ViewPublicEventHandler {
  /**
   *
   * @return {string}
   */
  static TOGGLE() {
    return 'TOGGLE'
  }

  /**
   *
   * @param clb
   * @returns {String}
   */
  toggleEvent(clb) {
    return this._subscribeTo(ToggleEvent.TOGGLE(), clb)
  }
}