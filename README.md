# toggle-event-handler-view

### Getting Started
- Build component :

```javascript
let component = new ComponentToggleBuilder()
.application(application)
.build()
  ```

- build View

```javascript
const viewContainer = new ViewToggleMounter()
  .buildView(new ViewToggleMounterConfig()
      .componentContext(componentContext)
      .componentToggle(component)
      .parentNode(parentNode)
      .idPrefix('prefix') // to personalize dom
      .styles(styles)
      .toggleHandlerManager(new ToggleHandlerManager())
      .view(ViewBuilders.viewToggle())
      .isActive(false)
  ).viewContainer()
  ```


### listen when an element is toggled :
```javascript
component.actionElementToggled().listenWithCallback(
  (e) => {
    e.avtive()
  }, 
  componentContext
)
  ```

callback parameter:
```yaml
ElementToggle:
  avtive: bool
  ```



