<template>
  <div class="table-list">
    <ul class="table-head">
        <li class="head-th" v-for="(item, index) in headNames" :key="index" :style="{ 'width': item.width}" @click="handleColumn(clickSortType, item.openSorted, item.fieldName)" @dblclick="dblckickColumn(item.openSorted, item.fieldName)">
            <span v-html="item.name"></span>
            <div class="sorter" v-if="item.openSorted">
                <i :class="item.defaultSortType === 'upSort' ? 'sort_up active' : 'sort_up'" @click.stop="handleIconSortUp(item.fieldName)" ref="sort_up"></i>
                <i :class="item.defaultSortType === 'downSort' ? 'sort_down active' : 'sort_down'" @click.stop="handleIconSortDown(item.fieldName)" ref="sort_down"></i>
            </div>
        </li>
    </ul>
    <ul class="table-body">
        <li class="body-tr" v-for="(item, index) in tableListData" :key="index">
            <ul @click="selectItem(item['userId'])">
                <li class="body-td" v-for="(value, indexs) in headNames" :key="indexs" :style="{ 'width': value.width}">{{item[value.fieldName]}}</li>
            </ul>
        </li>
    </ul>
  </div>
</template>

<script>

let timer = null //单击双击区别的定时器

export default {
  name: "table-list",
  data: () => ({
    clickNum: 0,
    commonEmitdata:{}
  }),
  props: {
    headNames: {    //表头名称(name)及对应的百分比宽度(width), id用于向外组件传递标识为哪一列，以及是否针对该列开启排序(openSorted)，初始化组件时默认排序状态(defaultSortType)，分不排序(noSort)、降序(downSort)、升序(upSort),默认的排序方式需要在父组件请求接口后，按父组件传进来的排序状态排好，再传到该子组件
      type: Array,
      default: () => []
    },
    tableListData: {    //表body部分的数据二位数组
      type: Array,
      default: () => []
    },
    clickSortType: {    //第一次单击表头列时，排序状态、第二次单击表头列时相反；只有downSort、upSort
        type:String,
        default: "downSort"
    },
    sortStyle: {
        type: String,
        default: "singleSort"   //singleSort为单排序，commonSort为组合排序
    }
  },
  mounted(){
    
  },
  methods: {
    handleIconSortUp(id) {    //上图标点击
        let event =event || window.event;
        this.setSortIconClass(event, "sort_down", "sort_up", id, "sort_up");
    },
    handleIconSortDown(id) {  //下图标点击
        let event =event || window.event;
        this.setSortIconClass(event, "sort_up", "sort_down", id, "sort_down");
    },
    setSortIconClass(event, siblingEleClass, tagrtEleClass, id, sortType) {
        let targetEle = event.target;
        if (this.sortStyle === 'commonSort') {  //组合条件排序
            let siblingEle = targetEle.parentNode.getElementsByClassName(siblingEleClass)[0];
            targetEle.className = `${tagrtEleClass} active`;
            siblingEle.className = siblingEleClass;
            this.commonEmitdata[id] = sortType
            this.$emit("iconClick", this.commonEmitdata);
        }else if (this.sortStyle === 'singleSort') {    //单条件排序
            let sortUpArry = this.$refs.sort_up;
            let sortDownArry = this.$refs.sort_down;
            for (let value of sortUpArry) {
                value.className = "sort_up";
            }
            for(let value of sortDownArry) {
                value.className = "sort_down";
            }
            targetEle.className = `${tagrtEleClass} active`;
            this.commonEmitdata = {}
            this.commonEmitdata[id] = sortType
            this.$emit("iconClick", this.commonEmitdata)    //emitFn提供给父组件进行排序逻辑, id为标识哪列，sortType为当前列的排序类型
        }
        
    },
    setSortColumnClass(event, activeEleClass, otherEleClass, id, sortType) {
        let target = event.target
        if (target.nodeName === "SPAN") {   //防止点在span标签上
            target = target.parentNode
        }
        if (this.sortStyle === 'commonSort') {  //组合条件排序
            target.getElementsByClassName(activeEleClass)[0].className = `${activeEleClass} active`
            target.getElementsByClassName(otherEleClass)[0].className = otherEleClass
            this.commonEmitdata[id] = sortType
            this.$emit("iconClick", this.commonEmitdata)
        }else if(this.sortStyle === 'singleSort') { //单条件排序
            let sortUpArry = this.$refs.sort_up;
            let sortDownArry = this.$refs.sort_down;
            for (let value of sortUpArry) {
                value.className = "sort_up";
            }
            for(let value of sortDownArry) {
                value.className = "sort_down";
            }
            target.getElementsByClassName(activeEleClass)[0].className = `${activeEleClass} active`
            this.commonEmitdata = {}
            this.commonEmitdata[id] = sortType
            this.$emit("iconClick", this.commonEmitdata)
        }
        
    },
    handleColumn(clickSortType, openSorted, id) {        //表头单列点击
        if (!openSorted) {
            return false;
        }
        clearTimeout(timer);
        let event = event || window.event;
        timer = setTimeout(() => {
            let clickNum = ++this.clickNum;
            switch (clickSortType) {
                case 'upSort':
                    if (clickNum % 2 == 0) {    //降序
                        this.setSortColumnClass(event, "sort_down", "sort_up", id, "sort_down")
                    }else{                      //升序
                        this.setSortColumnClass(event, "sort_up", "sort_down", id, "sort_up")
                    }
                    break
                case 'downSort':
                    if (clickNum % 2 !== 0) {    //降序
                        this.setSortColumnClass(event, "sort_down", "sort_up", id, "sort_down")
                    }else{                      //升序
                        this.setSortColumnClass(event, "sort_up", "sort_down", id, "sort_up")
                    }
                    break
            }
        }, 300)
    },
    dblckickColumn(openSorted, id) {   //双击
        if (!openSorted) {
            return false;
        }
        clearTimeout(timer)
        let event = event || window.event;
        let target = event.target;
        if (target.nodeName === "SPAN") {
            target = target.parentNode
        }
        target.getElementsByClassName("sort_down")[0].className = "sort_down";
        target.getElementsByClassName("sort_up")[0].className = "sort_up";
        let hasId = this.commonEmitdata.hasOwnProperty(id);
        if (hasId) {
            delete this.commonEmitdata[id]
            this.$emit("iconClick", this.commonEmitdata)
        }
    },
    selectItem(id) {    //内容部分单行点击
        console.log(id)
        this.$emit("selectItem", id)
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/PublicDefind.less";

.table-list{
    width:100%;
    .table-head{    //表头
        width:100%;
        height:40px;
        background-color:#f8f8f8;
        .head-th{   //列
            width:50%;
            height:40px;
            float:left;
            .box-sizing();
            padding:0 10px;
            text-align: center;
            cursor: pointer;
            span{
                display:inline-block;
                font-size:@DefintSize;
                line-height:40px;
                color:#525252;
                max-width:calc(~"100% - 50px");
                .ellipsis();
            }
            .sorter{
                display:inline-block;
                width:20px;
                height:100%;
                vertical-align: top;
                margin-left:4px;
                position: relative;
                .sort_up{
                    .triangle(up, 5px, 5px, #a8a8a8);
                    position: absolute;
                    left:0;
                    top:8px;
                    cursor: pointer;
                    &.active{
                        .triangle(up, 5px, 5px, #44bcf7);
                    }
                }
                .sort_down{
                    .triangle(down, 5px, 5px, #a8a8a8);
                    position: absolute;
                    left:0;
                    top:20px;
                    cursor: pointer;
                    &.active{
                        .triangle(down, 5px, 5px, #44bcf7);
                    }
                }
            }
        }
        .head-th:not(:last-of-type) {
            position: relative;
            &::after{
                content:"";
                width:2px;
                height:22px;
                background-color:#cfcfcf;
                position: absolute;
                right:0;
                top:9px;
            }
        }

    }
    .table-body{    //表内容
        width:100%;
        .body-tr{   //行
            width:100%;
            height:40px;
            ul{
                width:100%;
                height:40px;
                cursor: pointer;
                .body-td{   //列
                    float:left;
                    width:50%;
                    text-align: center;
                    height:40px;
                    font-size:@DefintSize;
                    color:#525252;
                    line-height:40px;
                    .ellipsis();
                    .box-sizing();
                    padding:0 10px;
                }
            }
        }
        .body-tr:nth-of-type(odd) {
            background-color: #fff;
        }
        .body-tr:nth-of-type(even) {
            background-color: #f8f8f8;
        }
    }
}

</style>


