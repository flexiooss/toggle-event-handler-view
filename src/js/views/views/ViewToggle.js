import {e, View, UIEventBuilder} from '@flexio-oss/hotballoon'
import {viewToggleInterface} from './ViewToggleInterface'
import {ToggleDisplayHandler} from '../../ToggleDisplayHandler'


/**
 * @extends View
 */
export class ViewToggle extends viewToggleInterface(View) {
  /**
   * @param {ViewContainer} viewContainer
   * @param {ThemeStyle} styles
   * @param {string} idPrefix
   * @param {ToggleHandlerManager} toggleHandlerManager
   */
  constructor(viewContainer, styles, idPrefix, toggleHandlerManager) {
    super(viewContainer)
    this.setSynchronous()
    this.__idPrefix = idPrefix
    this.__toggleHandlerManager = toggleHandlerManager
    this.__styles = styles
    this.__idTitle = `${this.__idPrefix}-title`
    this.__idTitleContent = `${this.__idTitle}-content`
    this.__idContent = `${this.__idPrefix}-content`
    this.__idArrow = `arrow-${this.__idPrefix}`

    this.__toggleDisplayHandler = new ToggleDisplayHandler(true)
      .addEventToggle((a) => { this._on(a) })
      .subscribeToEventToggled((payload) => {
        if (payload) {
          this.nodeRef(this.__idArrow).textContent = '▼'
        } else {
          this.nodeRef(this.__idArrow).textContent = '►'
        }
        this.nodeRef(this.__idContent).style.display = (this.__toggleDisplayHandler.isActive() ? 'block' : 'none')
        this.nodeRef(this.__idContent).style.visibility = (this.__toggleDisplayHandler.isActive() ? 'visible' : 'hidden')
      })
    this.__toggleHandlerManager.addToggleHandler(this.__toggleDisplayHandler)

  }

  template() {
    return this.html(
      e(`div#toggle-${this.__idPrefix}`)
        .childNodes(
          this.html(
            e(`div#${this.__idTitle}`)
              .className(this.__styles.layout().row(), this.__styles.layout().rowAlignCenter())
              .childNodes(
                this.html(
                  e(`span#${this.__idArrow}`)
                    .className(this.__styles.fontSize().h4())
                    .text(this.__toggleDisplayHandler.isActive() ? '▼' : '►')
                ),
                this.html(
                  e(`div#${this.__idTitleContent}`)
                )
              )
              .listenEvent(UIEventBuilder.mouseEvent().click((e) => {
                this.dispatch('EVENT_TOGGLE', null)
              }))
          ),
          this.html(
            e(`div#${this.__idContent}`)
              .properties({ariaHidden: this.__toggleDisplayHandler.isActive()})
              .styles({
                display: (this.__toggleDisplayHandler.isActive() ? 'block' : 'none'),
                visibility: (this.__toggleDisplayHandler.isActive() ? 'visible' : 'hidden')
              })
          )
        )
    )
  }

  title() {
    return this.nodeRef(this.__idTitleContent)
  }

  content() {
    return this.nodeRef(this.__idContent)
  }
}
