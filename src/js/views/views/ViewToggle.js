import {e, View, UIEventBuilder, RECONCILIATION_RULES} from '@flexio-oss/hotballoon'
import {viewToggleInterface} from './ViewToggleInterface'
import {ToggleDisplayHandler} from '../../ToggleDisplayHandler'
import {ToggleEvent} from './ToggleEvent'
import {assertType, isBoolean, isUndefined} from '@flexio-oss/assert'


/**
 * @extends View
 */
export class ViewToggle extends viewToggleInterface(View) {
  /**
   * @param {ViewContainer} viewContainer
   * @param {ThemeStyle} styles
   * @param {Iconist} icons
   * @param {string} idPrefix
   * @param {ToggleHandlerManager} toggleHandlerManager
   * @param {boolean} isActive
   */
  constructor(viewContainer, styles, icons, idPrefix, toggleHandlerManager, isActive) {
    super(viewContainer)
    this.setSynchronous()
    this.__idPrefix = idPrefix
    this.__toggleHandlerManager = toggleHandlerManager
    this.__styles = styles
    this.__icons = icons
    this.__idTitle = `${this.__idPrefix}-title`
    this.__idTitleContent = `${this.__idTitle}-content`
    this.__idContent = `${this.__idPrefix}-content`
    this.__idArrow = `arrow-${this.__idPrefix}`
    this.__toggleDisplayHandler = new ToggleDisplayHandler(isActive)
      .addEventToggle((a) => { this._on(a) })

    this.__iconArrowContainer = this.html(
      e(`span#${this.__idArrow}`)
        .reconciliationRules(RECONCILIATION_RULES.BYPASS_CHILDREN)
        .styles({transition: '300ms ease all', transformOrigin: 'center'})
        .bindStyle('transform', this.__toggleDisplayHandler.isActive(), 'rotate(0.25turn)')
    )

    this.__currentIsActive = this.__isActive
    this.__toggleDisplayHandler.subscribeToEventToggled((payload) => {
        if (payload) {
          if (!this.__currentIsActive) {
            this.nodeRef(this.__idArrow).style.transform = 'rotate(0.25turn)'
          }
        } else {
            if (!this.__currentIsActive) {
              this.nodeRef(this.__idArrow).style.transform = 'rotate(0turn)'
            }
        }
        this.nodeRef(this.__idContent).style.display = (this.__toggleDisplayHandler.isActive() ? 'block' : 'none')
        this.nodeRef(this.__idContent).style.visibility = (this.__toggleDisplayHandler.isActive() ? 'visible' : 'hidden')
      })
    this.__toggleHandlerManager.addToggleHandler(this.__toggleDisplayHandler)
  }

  /**
   * @returns {ToggleEvent}
   */
  on() {
    return new ToggleEvent(a => {
      return this._on(a)
    })
  }

  dispatchToggleEvent(value) {
    assertType(
      !isUndefined(value) && isBoolean(value),
      'ViewPagination:dispatchChange: `value` should not be undefined of type number'
    )

    this.dispatch(
      ToggleEvent.TOGGLE(),
      value
    )
  }

  template() {
    return this.html(
      e(`div#toggle-${this.__idPrefix}`)
        .className(this.__styles.border().top(), this.__styles.border().thinWidth(), this.__styles.border().light())
        .childNodes(
          this.html(
            e(`div#${this.__idTitle}`)
              .className(this.__styles.layout().row(), this.__styles.layout().rowAlignCenter())
              .childNodes(
                this.__icons.applyTo(this.__iconArrowContainer).triangle().small().dark(),
                this.html(
                  e(`div#${this.__idTitleContent}`)
                )
              )
              .listenEvent(UIEventBuilder.mouseEvent().click((e) => {
                this.dispatch('EVENT_TOGGLE', null)
                this.dispatchToggleEvent(this.__toggleDisplayHandler.isActive())
              }))
          ),
          this.html(
            e(`div#content`)
              .className(this.__styles.layout().row())
              .childNodes(
                this.html(
                  e(`div#indentation`)
                    .className(this.__styles.layout().column(), this.__styles.layout().desktopWidth().w1(), this.__styles.layout().tabletWidth().w1(), this.__styles.layout().mobileWidth().w1())
                ),
                this.html(
                  e(`div#${this.__idContent}`)
                    .className(this.__styles.layout().column(), this.__styles.layout().desktopWidth().w23(), this.__styles.layout().tabletWidth().w23(), this.__styles.layout().mobileWidth().w23())
                    .properties({ariaHidden: this.__toggleDisplayHandler.isActive()})
                    .styles({
                      display: (this.__toggleDisplayHandler.isActive() ? 'block' : 'none'),
                      visibility: (this.__toggleDisplayHandler.isActive() ? 'visible' : 'hidden')
                    })
                )
              )
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
