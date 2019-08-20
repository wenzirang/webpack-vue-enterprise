###  Steps 使用方法    

| 参数        |                     说明                      |   类型 | 默认值 |
| ----------- | :-------------------------------------------: | -----: | -----: |
| currentStep |                  当前的步骤                   | Number |      0 |
| size        |  步骤组件的大小可选参数{medium，small，big}   | String | medium |
| status      | 当前步骤的状态 可选参数 error， wait，_finish | String |      - |

```vue
  <Steps :currentStep="current" :size="'small'">
  </Steps>
```

### Step 使用方法    
| 参数        |                 说明                 |   类型 | 默认值 |
| ----------- | :----------------------------------: | -----: | -----: |
| description |               文字描述               | String |      - |
| icon        | 可选择讲默认的数字标记换成自定义图标 | String |      - |
| stepWidth   |             箭头条的长度             | Number |    120 |

```vue
    <Step :key="s.index" :description="s.description" v-for="s in steps" :status="s.status"></Step>
```

### 综合使用方法

```vue
  <Steps :currentStep="current" :size="'small'">
    <Step :key="s.index" :description="s.description" v-for="s in steps" :status="s.status"></Step>
  </Steps>
```



