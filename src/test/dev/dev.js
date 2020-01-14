import {ViewBuilderToggle} from '../../js/views/ViewBuilderToggle'
import {ApplicationWithStyleAndLayers} from '@flexio-oss/hotballoon-test-dummies/src/js/ApplicationWithStyleAndLayers'
import {ToggleHandlerManager} from '../../js/ToggleHandlerManager'


const applicationDev = ApplicationWithStyleAndLayers.withConsoleLogger(document.body)

const view = new ViewBuilderToggle()
  .componentContext(applicationDev.application().addComponentContext())
  .idPrefix('prefix')
  .parentNode(applicationDev.layersComponent().addLayer().getElement())
  .styles(applicationDev.styles())
  .toggleHandlerManager(new ToggleHandlerManager())
  .build()

view.title().innerHTML = 'title'
view.content().innerHTML = 'content'

