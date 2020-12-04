## 说明
该项目主要是将自己比较零散的知识点整合起来完成一个完整的项目包括前后端以及他们之间的数据通信，对不足的地方进行改进

## 内容
 * 对vuecli进行配置以符合开发需求
 * div+css进行页面的布局，使用vue和es6对完成页面逻辑的编写和数据渲染
 * 使用less作为css预处理并对通用样式进行抽离和按需加载
 * 通用功能组件(swiper,toast.card等)和公共函数(防抖节流，数组切片, 数值转换，localstorage增删改查等等)的封装
 * 使用axios进行前后端的数据交互。包括对axios进行封装，统一的api管理 根据后端返回的状态码进行提示 序列化 等等
 * localstorage作为数据持久化（小项目感觉没必要上vuex）
 * 使用正则检验登录注册等用户输入格式
 * 路由懒加载，以及gzip优化首屏加载
 * 项目文档的编写

## 技术栈
vue2 + vue-router + vue-cli + ES6 + axios + less + flex
## 运行
    npm install //下载依赖库
    npm run serve //本地调试
## 预览地址
    http://34.96.147.97/
## 接口
    接口是ndoejs + koajs + mongoose + puppeteer 提供 
    后端github地址:https://github.com/Cwmmm/koa_server
## 页面完成度
  * 首页
    - [ ] 搜索
    - [x] 轮播图
    - [x] 漫画榜单
    - [x] 推荐列表
    - [x] 分类展示
    - [x] 最近更新列表
    - [x] 留言
  * 漫画信息展示页面
    - [x] 章节列表
    - [x] 漫画信息展示
    - [x] 收藏
    - [ ] 评论
  * 漫画展示页面
    - [x] 导航
    - [x] 图片懒加载
    - [x] 目录
    - [x] 上一页/下一页
    - [x] 收藏
    - [x] 点赞
  * 分类
    - [x] 题材分类
    - [x] 进度分类
    - [x] 排序分类
    - [x] 信息卡片分页
  * 个人中心
    - [x] 个人信息更变
    - [x] 我的收藏
    - [ ] 我的评论
    - [x] 我的浏览记录
    - [ ] 我的点赞
  * 排行(没有数据仅作为展示)
  * 登录/注册页
    - [x] 登陆
    - [x] 注册
  * 搜索展示页
    - [ ] 未完成

## 目录结构
    src
    |   App.vue
    |   main.js  //入口文件
    |
    +---assets  //静态资源
    |       ac_logo.png //图标
    |       global.less // 公共css文件
    |       loading.gif //懒加载过度gif
    |       logo.png 
    +---components
    |   |   Card.vue //卡片信息组件
    |   |   Footer.vue //页脚组件
    |   |   Header.vue //页眉组件
    |   |   Searchbar.vue //搜索栏组件（未完成）
    |   |   toast.vue //提示组件（未完成）
    |   \---swiper
    |           Swiper.vue  //轮播图主组件
    |           SwiperItem.vue //轮播图子组件
    +---config
    |   |   http.js  //axios封装
    |   |   utils.js  //localstorage增删改查（注入vue）
    |   \---API
    |           base.js // 环境ip切换
    |           index.js // api合集
    +---router
    |       index.js //vur-router
    +---utils
    |       index.js //通用工具函数集
    \---views
        |   404.vue //404页面
        |   About.vue //（未完成）
        |   Comic.vue //动漫信息展示页面
        |   Rank.vue //排行榜页面
        |   Reader.vue //漫画阅读页面
        |   Search.vue //搜索结果页面（未完成）
        |   Tag.vue //分类页面
        +---homepage //个人信息
        |       collect.vue //收藏
        |       comment.vue //评论
        |       history.vue //阅读记录
        |       Homepage.vue //主路由页面
        |       info.vue //个人信息页面
        |       like.vue //点赞
        +---index
        |       Index.vue //首页
        \---sign
                index.vue //sign入口页面
                login.vue //登陆页面
                signup.vue //注册页面



