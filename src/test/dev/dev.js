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

let toggleHandlerManager = new ToggleHandlerManager()
let componentContext = applicationDev.application().addComponentContext()
let parentNode = applicationDev.layersComponent().addLayer().getElement()
let component = new ComponentToggleBuilder()
  .application(applicationDev.application())
  .viewToggleMounter(new ViewToggleMounter())
  .parentNode(parentNode)
  .idPrefix('prefix')
  .styles(applicationDev.styles())
  .toggleHandlerManager(toggleHandlerManager)
  .view(ViewToggleBuilders.viewToggle())
  .isActive(false)
  .build()

let component2 = new ComponentToggleBuilder()
  .application(applicationDev.application())
  .viewToggleMounter(new ViewToggleMounter())
  .parentNode(parentNode)
  .idPrefix('prefix2')
  .styles(applicationDev.styles())
  .toggleHandlerManager(toggleHandlerManager)
  .view(ViewToggleBuilders.viewToggle())
  .isActive(false)
  .build()

component.actionElementToggled().listenWithCallback((e) => {
  componentContext.logger().log(
    componentContext.logger().builder()
      .info().pushLog(`element 1 is open : ${e.avtive()}`),
    viewLogOptions
  )
}, componentContext)

component2.actionElementToggled().listenWithCallback((e) => {
  componentContext.logger().log(
    componentContext.logger().builder()
      .info().pushLog(`element 2 is open : ${e.avtive()}`),
    viewLogOptions
  )
}, componentContext)

component.title().innerHTML = 'title'
component.content().innerHTML = 'content'

component2.title().innerHTML = 'title2'
component2.content().innerHTML = 'content2'

let openAll = document.createElement('button')
openAll.textContent = 'open all'
openAll.addEventListener('click', (e) => {
  toggleHandlerManager.openAll()
})

parentNode.appendChild(openAll)

let closeAll = document.createElement('button')
closeAll.textContent = 'close all'
closeAll.addEventListener('click', (e) => {
  toggleHandlerManager.closeAll()
})

parentNode.appendChild(closeAll)

let toggleAll = document.createElement('button')
toggleAll.textContent = 'toggle all'
toggleAll.addEventListener('click', (e) => {
  toggleHandlerManager.toggleAll()
})

parentNode.appendChild(toggleAll)


