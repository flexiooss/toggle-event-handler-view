import {e, View, UIEventBuilder, RECONCILIATION_RULES} from '@flexio-oss/hotballoon'
import {viewToggleInterface} from './ViewToggleInterface'
import {ToggleEvent} from './ToggleEvent'


/**
 * @extends View
 */
export class ViewToggle extends viewToggleInterface(View) {
  /**
   * @param {ViewToggleBuildersConfig} viewToggleBuildersConfig
   */
  constructor(viewToggleBuildersConfig) {
    super(viewToggleBuildersConfig.viewContainer())
    this.__idPrefix = viewToggleBuildersConfig.idPrefix()
    this.__styles = viewToggleBuildersConfig.styles()
    this.__storeToggleState = viewToggleBuildersConfig.storeToggleState()
    this.__idTitle = `${this.__idPrefix}-title`
    this.__idTitleContent = `${this.__idTitle}-content`
    this.__idContent = `${this.__idPrefix}-content`
    this.__idArrow = `arrow-${this.__idPrefix}`

    this.__currentIsActive = this.__isActive
    this.subscribeToStore(this.__storeToggleState, (payload) => {
      if (payload.data().active()) {
        console.log(payload.data().active())
        if (!this.__currentIsActive) {
          this.nodeRef(this.__idArrow).style.transform = 'rotate(0.25turn)'
        }
      } else {
        if (!this.__currentIsActive) {
          this.nodeRef(this.__idArrow).style.transform = 'rotate(0turn)'
        }
      }
      this.nodeRef(this.__idContent).style.display = (payload.data().active() ? 'block' : 'none')
      this.nodeRef(this.__idContent).style.visibility = (payload.data().active() ? 'visible' : 'hidden')
    })
  }

  /**
   * @returns {ToggleEvent}
   */
  on() {
    return new ToggleEvent(a => {
      return this._on(a)
    })
  }

  template() {
    return this.html(
      e(`div#toggle-${this.__idPrefix}`)
        .className(this.__styles.border().top(), this.__styles.border().thinWidth(), this.__styles.border().light())
        .childNodes(
          this.html(
            e(`div#${this.__idTitle}`)
              .className(
                this.__styles.layout().row(),
                this.__styles.layout().rowAlignCenter(),
                this.__styles.layout().containerSmall(),
                this.__styles.elements().clickable()
              )
              .childNodes(
                this.html(
                  e(`div#arrowContainer`)
                    .className(this.__styles.layout().mobileWidth().w1())
                    .childNodes(this.__styles.icons().applyTo(
                      this.html(
                        e(`span#${this.__idArrow}`)
                          .reconciliationRules(RECONCILIATION_RULES.BYPASS_CHILDREN)
                          .styles({transition: '300ms ease all', transformOrigin: 'center'})
                          .bindStyle('transform', this.__storeToggleState.data().active(), 'rotate(0.25turn)')
                      )
                    ).triangle().small().dark())
                ),
                this.html(
                  e(`div#${this.__idTitleContent}`)
                    .className(this.__styles.layout().mobileWidth().w23())
                )
              )
              .listenEvent(UIEventBuilder.pointerEvent().up((e) => {
                this.dispatch(ToggleEvent.TOGGLE(), !this.__storeToggleState.data().active())
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
                    .properties({ariaHidden: this.__storeToggleState.data().active()})
                    .styles({
                      display: (this.__storeToggleState.data().active() ? 'block' : 'none'),
                      visibility: (this.__storeToggleState.data().active() ? 'visible' : 'hidden')
                    })
                )
              )
          )
        )
    )
  }

  /**
   * @return {Element}
   */
  title() {
    return this.nodeRef(this.__idTitleContent)
  }

  /**
   * @return {Element}
   */
  content() {
    return this.nodeRef(this.__idContent)
  }
}
