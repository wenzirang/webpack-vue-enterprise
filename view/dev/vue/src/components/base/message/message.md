# 使用方法    

| 参数名   | 含义       | 变量类型       |
| -------- | ---------- | -------------- |
| content  | 显示的内容 | string\|number |
| duration | 显示的时长 | number         |
| onClose  | 关闭的回调 | Function       |
| selfKey  | 唯一标识   | string\|number |

```js
success() {
    this.$message.success("测试成功");
},
error() {
    this.$message.error("测试错误");
},
info() {
    this.$message.info("测试消息");
},
warning() {
    this.$message.warning("测试警告");
},
loading() {
    const hide = this.$message.loading("测试loading");
    setTimeout(hide, 2500);
}
```