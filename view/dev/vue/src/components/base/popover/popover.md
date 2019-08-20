| 参数          |                             说明                             |          类型 | 默认值 |
| ------------- | :----------------------------------------------------------: | ------------: | -----: |
| init-visible  |                   初始状态是否显示popover                    |       Boolean |  false |
| title         |                           卡片标题                           |        String |      - |
| placement     | 气泡框位置可选top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom |        String |    top |
| trigger       |          触发行为,可选 hover/focus/click	String           |         hover |        |
| overlay-style |                           卡片样式                           | String/Object |      - |
| controlled    |                       保持popover显示                        |       Boolean |  false |
| title:slot    |                卡片标题，优先级高于title prop                |     Slot Node |      - |
| content:slot  |                           卡片内容                           |     Slot Node |      - |



```html
<popover title="我是一个标题" init-visible="true || false" placement="top" trigger="click" >            
    <div slot="content">
        <p>Content</P>
        <p>Content</P>
    </div>    
</popover>
```