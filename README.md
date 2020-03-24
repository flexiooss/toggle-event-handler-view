# toggle-event-handler-view

### Getting Started
- Build component :

```javascript
let component = new ComponentToggleBuilder()
  .application(application)
  .parentNode(parentNode)
  .idPrefix('prefix') // to personalize dom
  .styles(styles)
  .toggleHandlerManager(new ToggleHandlerManager())
  .view(ViewBuilders.viewToggle())
  .isActive(false)
  .view(ViewToggleBuilders.viewToggle())
  .build()
  ```

### get title and content node
```javascript
component.title().innerHTML = 'title'
component.content().innerHTML = 'content'
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



