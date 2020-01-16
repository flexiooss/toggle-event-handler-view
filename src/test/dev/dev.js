import {ViewBuilderToggle} from '../../js/views/ViewBuilderToggle'
import {ApplicationWithStyleAndLayers} from '@flexio-oss/hotballoon-test-dummies/src/js/ApplicationWithStyleAndLayers'
import {ToggleHandlerManager} from '../../js/ToggleHandlerManager'
import {ComponentToggleBuilder} from '../../js/component/ComponentToggleBuilder'

const viewLogOptions = {
  color: '#e2183e',
  titleSize: 4
}

const applicationDev = ApplicationWithStyleAndLayers.withConsoleLogger(document.body)

let componentContext = applicationDev.application().addComponentContext()
let component = new ComponentToggleBuilder().application(applicationDev.application()).build()

const view = new ViewBuilderToggle()
  .componentContext(componentContext)
  .componentToggle(component)
  .idPrefix('prefix')
  .parentNode(applicationDev.layersComponent().addLayer().getElement())
  .styles(applicationDev.styles())
  .toggleHandlerManager(new ToggleHandlerManager())
  .build()

component.actionElementToggled().listenWithCallback((e) => {
  componentContext.logger().log(
    componentContext.logger().builder()
      .info().pushLog(`element is open : ${e.avtive()}`),
    viewLogOptions
  )
}, componentContext)

view.title().innerHTML = 'title'
view.content().innerHTML = 'content'


