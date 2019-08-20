## 使用方法

| 参数           |                             说明                             |    类型 | 默认值 |
| -------------- | :----------------------------------------------------------: | ------: | -----: |
| identification | 作为弹层的唯一标识，解决一个页面共用一个弹层实例时候的区别标识 |  String |      - |
| btnPosition    |          弹层中按钮的位置 可选值 center,left,right           |  String | center |
| layerBtnText   |                    弹层保存按钮的说明文字                    |  String |   确认 |
| cancelBtnText  |                    弹层取消按钮的说明文字                    |  String |   取消 |
| layerBtnShow   |                     弹层保存按钮是否显示                     | Boolean |   true |
| cancelBtnShow  |                     弹层取消按钮是否显示                     | Boolean |   true |
| layerWidth     |                          弹层的宽度                          |  Number |    433 |
| layerHeight    |                          弹层的高度                          |  Number |    312 |
| autoClose      |                     弹层的延迟关闭的时长                     |  Number |      0 |



```html
<layer
    ref="layer"
    :identification="nowlayerObj.identification"
    :layerBtnText="nowlayerObj.layerBtnText"
    :layerBtnShow="nowlayerObj.layerBtnShow"
    :cancelBtnText="nowlayerObj.cancelBtnText"
    :layerWidth="nowlayerObj.layerWidth"
    :layerHeight="nowlayerObj.layerHeight"
    :autoClose="nowlayerObj.autoClose?nowlayerObj.autoClose:0"
    :btnPosition="nowlayerObj.btnPosition"
    @confirm="layerConfirmCallBack"
    @cancel="cancelConfirmCallBack"
  >
    <div slot='html'></div>
  </layer>
```

