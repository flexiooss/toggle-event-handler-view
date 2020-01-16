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
const view = new ViewBuilderToggle()
  .componentContext(componentContext)
  .componentToggle(component)
  .idPrefix('prefix') // to personalize dom
  .parentNode(parentNode)
  .styles(styles)
  .toggleHandlerManager(new ToggleHandlerManager())
  .build()
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



