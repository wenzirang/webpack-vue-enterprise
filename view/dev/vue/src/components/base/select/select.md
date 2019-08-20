### API selectProps

| 参数               |                             说明                             |                  类型 |              默认值 |
| ------------------ | :----------------------------------------------------------: | --------------------: | ------------------: |
| value              |                      指定默认选中的条目                      |          string/array |                   - |
| default:scopedSlot |            自定义下拉框选项内容,传入的参数：data             |             slot node |                   - |
| clue               |                      选项的value的字段                       |                string |               value |
| label              |                    选项显示的文本的字段名                    |                string |               label |
| groupLabel         |                      分组title的字段名                       |                string |               label |
| data               |                         下拉框的数据                         |                 array |                  [] |
| multiple           |                         是否支持多选                         |               boolean |               false |
| notFoundContent    |                  当下拉列表为空时显示的内容                  |                string |            没有找到 |
| placement          |                下拉框出现的位置(top、bottom)                 |                string |              bottom |
| search             |                         是否可以搜索                         |               boolean |               false |
| filter             |                   搜索过滤函数,返回Boolean                   | Function(value, item) |                   - |
| maxHeight          |                       下拉框的最大高度                       |                number |                 300 |
| dropdownWidth      |                          下拉框宽度                          |           string	- |                     |
| disabled           |                         控件是否禁用                         |               boolean |               false |
| allowClear         |                    支持清除, 单选模式有效                    |               boolean |                true |
| placeholder        |                        选择框默认文字                        |                string |              请选择 |
| size               |                    选择框大小，可选 lg sm                    |                string |                   - |
| loading            |            呈现加载样式（一般用于从远程获取数据）            |               boolean |               false |
| loadingText        |                       加载时显示的文字                       |                string |           加载中... |
| optionOnChange     |      指定change事件返回的数据是否是选中的整个option数据      |               boolean |               false |
| remoteMethod       |                         远程搜索方法                         |              function |                   - |
| position           |              下拉框的定位方式（absolute,fixed）              |                string |            absolute |
| popupContainer     | 下拉菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 |              function | () => document.body |

###  DataProps

| 参数     |                             说明                             |                 类型 | 默认值 |
| -------- | :----------------------------------------------------------: | -------------------: | -----: |
| value    |          选项的值(该字段可通过select的clue属性修改)          | string/number/object |      - |
| label    | 选项的标签或组名(作为标签时可通过select的label属性修改；作为组名时只支持一级,可通过select的groupLabel属性修改) |               string |      - |
| disabled |                           是否禁用                           |              boolean |  false |
| options  |                          分组的数据                          |                array |      - |

###  SelectEvents

| 参数   |                             说明                             |  参数 |
| ------ | :----------------------------------------------------------: | ----: |
| change | 选择的值发生变化的时候触发，默认返回value，如需返回整个option，请设置optionOnChange | value |
| focus  |                          focus事件                           |     - |
| blur   |                           blur事件                           |     - |
| search |                      文本框值变化时回调                      | value |

```vue
//分组实例
<template>
    <v-select style="width: 200px" :data="groupOpt" :value="'lp'"></v-select>
    <v-select style="width: 200px" multiple :data="groupOpt" :value="['lp']"></v-select>
</template>

<script>
    export default {
        data: ()=> ({
            groupOpt: [{
                label: '重庆',
                options: [{
                    value: 'lp',
                    label: '梁平'
                }, {
                    value: 'wz',
                    label: '万州',
                    disabled: true
                }]
            }, {
                label: '四川',
                options: [{
                    value: 'cd',
                    label: '成都'
                }, {
                    value: 'dz',
                    label: '达州'
                }]
            }]
        })
    }
</script>
```
```vue
//搜索实例  
<template>
        <v-select style="width: 200px" search :loading="loading" :remote-method="remoteMethod" :data="remoteOption"></v-select>
        <br><br>
        <v-select style="width: 100%" search multiple :loading="loading2" :remote-method="remoteMethod2" :data="remoteOption"></v-select>
    </template>
<script>
    export default {
        data: ()=> ({
            list: [],
            states: ["Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"],
            loading: false,
            loading2: false,
            remoteOption: []
        }),
        mounted(){
            this.list = this.states.map(item => {
                return { value: item, label: item };
            });
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.remoteOption = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.remoteOption = [];
                }
            },
            remoteMethod2(query) {
                if (query !== '') {
                    this.loading2 = true;
                    setTimeout(() => {
                        this.loading2 = false;
                        this.remoteOption = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.remoteOption = [];
                }
            }
        }
    }
</script>    
```