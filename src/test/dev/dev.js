import {ApplicationWithStyleAndLayers} from '@flexio-oss/hotballoon-test-dummies/src/js/ApplicationWithStyleAndLayers'
import {ToggleHandlerManager} from '../../js/ToggleHandlerManager'
import {ComponentToggleBuilder} from '../../js/component/ComponentToggleBuilder'
import {ViewToggleBuilders} from '../../js/views/ViewToggleMounter/ViewToggleMounterConfig'
import {ViewToggleMounter} from '../../..'

const viewLogOptions = {
  color: '#e2183e',
  titleSize: 4
}

const applicationDev = ApplicationWithStyleAndLayers.withConsoleLogger(document.body)

let t = new ToggleHandlerManager()
let componentContext = applicationDev.application().addComponentContext()
let component = new ComponentToggleBuilder()
  .application(applicationDev.application())
  .viewToggleMounter(new ViewToggleMounter())
  .parentNode(applicationDev.layersComponent().addLayer().getElement())
  .idPrefix('prefix')
  .styles(applicationDev.styles())
  .toggleHandlerManager(t)
  .view(ViewToggleBuilders.viewToggle())
  .isActive(false)
  .build()

component.actionElementToggled().listenWithCallback((e) => {
  componentContext.logger().log(
    componentContext.logger().builder()
      .info().pushLog(`element is open : ${e.avtive()}`),
    viewLogOptions
  )
}, componentContext)

component.title().innerHTML = 'title'
component.content().innerHTML = 'content'


t.openAll()

