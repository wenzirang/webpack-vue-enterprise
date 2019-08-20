## 目录结构

```
├───build                     	             # webpack打包配置文件       
│	├── base                                 # 目录配置文件       
│   │── lib 				                 # resolve及externals的配置文件       
│   │── vendor 					             # 服务启动文件       
│   │── webapck_config                       # webpack配置文件       
├───view						             # 项目主目录
│   ├── dist                	             # 打包后的文件
│   ├── dev                                  # 开发代码文件夹       
│   │   │───vue                              # 项目业务代码根目录       
│   │   │    │─── config                     # 配置文件目录
│   │   │    │─── src                        # 项目开发具体目录
|   |   |    |     │─── assets         		 # 静态资源
|   |   |    |     |	  |-- images         # 图片静态资源
|   |   |    |     |	  |-- styles         # 样式文件
|   |   |    |     │─── common         		 # 通用模块
|   |   |    |     |	  |-- utiles            # 工具类
|   |   |    |     |	  |    |-- directives   # directives工具目录
|   |   |    |     |	  |    |-- filters      # 过滤器工具目录
|   |   |    |     │─── components           # 组件目录
|   |   |    |     |	  |-- base			 # 公用组件目录
|   |   |    |     |	  |-- business       # 业务组件目录
|   |   |    |     │─── router         		 # 路由配置目录
|   |   |    |     │─── service         	 # 请求服务目录
|   |   |    |     │─── store         		 # 状态管理配置目录
|   |   |    |     │─── views         		 # 项目页面目录
│   │   │    │─── index.html                 # 启动页       
│   │   │    │─── index.js                   # 入口文件       
│   │   │    │─── index.vue                  # 启动文件       
```

## 技术栈简介

- `vue@2.6.10` ：用于构建用户界面的 MVVM 框架
- `vue-router@3.0.1`： vue配置路由库
- `vuex@3.0.1`： 基于 vue 的数据流方案
- `webpack@3.12.0`：构建工具
- `gulp@3.9.1`：基于流的自动化构建工具

