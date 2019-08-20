<template>
  <div class="breadcrumb">
    <span v-for="(item, index) in breadcrumbList" :key="index">
        <span @click="goLink(item.href)" class="breadcrumb_link">{{item.name}}</span>
        <span class="breadcrumb_separator"  v-if="index !== breadcrumbList.length - 1">{{ separator }}</span>
    </span>
  </div>
</template>

<script>
    export default {
        name: 'Breadcrumb',
        data:() => ({
            breadcrumbList:{}
        }),
        props: {
            separator: {
                type: String,
                default: '/',
            },
        },
        mounted(){
            let routerObj = this.$router.options.routes;
            let currentPath = this.$route.path;
            const Tree = this.getRouterTree(routerObj);
            this.breadcrumbList = this.matchTree(currentPath, Tree)
        },
        methods: {
            getRouterTree(arrayObj) {
                const arr = [];
                for (let index = 0; index < arrayObj.length; index++) {
                    const element = arrayObj[index];
                    arr.push({ path: element.path, alias:element.alias });
                    if (element.children) {
                        const recursive = this.getRouterTree(element.children);
                        arr.push.apply(arr, recursive);
                    }
                }
                return arr;
            },
            matchTree(currentPath, tree) {
                const curPath = currentPath.split('/');
                let curAry = [];
                let treeAlias = [];
                for (let value of curPath) {
                    if(value) {
                        curAry.push(value);
                    }
                }
                for (let i = 0; i < curAry.length; i++) {
                    const curAryEle = curAry[i];
                    tree.filter(item => {
                        if(item.path.indexOf(curAryEle) != -1){
                            let aliasEle = item.alias;
                            let endHref = currentPath.indexOf(curAryEle)+curAryEle.length;
                            let href = currentPath.substring(0, endHref);
                            treeAlias.push({name:aliasEle, href:href});
                        }
                    })
                }
                return treeAlias
            },
            goLink(link) {
                this.$router.push(link)
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/PublicDefind.less";

    .breadcrumb{
        font-size:12px;
        line-height:20px;
        color:#a8a8a8;
        .breadcrumb_link{
            cursor: pointer;
        }
    }
</style>
