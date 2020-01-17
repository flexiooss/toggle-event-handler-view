import {ApplicationWithStyleAndLayers} from '@flexio-oss/hotballoon-test-dummies/src/js/ApplicationWithStyleAndLayers'
import {ToggleHandlerManager} from '../../js/ToggleHandlerManager'
import {ComponentToggleBuilder} from '../../js/component/ComponentToggleBuilder'
import {ViewToggleMounter} from '../../js/views/ViewToggleMounter/ViewToggleMounter'
import {ViewBuilders, ViewToggleMounterConfig} from '../../js/views/ViewToggleMounter/ViewToggleMounterConfig'
import {FlexioIconsTheme} from '@flexio-corp/flexio-icone-theme'

const viewLogOptions = {
  color: '#e2183e',
  titleSize: 4
}

const applicationDev = ApplicationWithStyleAndLayers.withConsoleLogger(document.body)

let componentContext = applicationDev.application().addComponentContext()
let component = new ComponentToggleBuilder().application(applicationDev.application()).build()

const view = new ViewToggleMounter()
  .buildView(new ViewToggleMounterConfig()
    .componentContext(componentContext)
    .componentToggle(component)
    .parentNode(applicationDev.layersComponent().addLayer().getElement())
    .idPrefix('prefix')
    .styles(applicationDev.styles())
    .icons(new FlexioIconsTheme(applicationDev.styles().color()))
    .toggleHandlerManager(new ToggleHandlerManager())
    .view(ViewBuilders.viewToggle())
    .isActive(false)
  ).viewContainer()

component.actionElementToggled().listenWithCallback((e) => {
  componentContext.logger().log(
    componentContext.logger().builder()
      .info().pushLog(`element is open : ${e.avtive()}`),
    viewLogOptions
  )
}, componentContext)

view.title().innerHTML = 'title'
view.content().innerHTML = 'content'


