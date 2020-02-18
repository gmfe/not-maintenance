
module.exports = [
  {
    class: '基础类',
    children: [
      { name: 'check-gm-tool', abbr: 'ckgt', comment: '[查看 gm-tool 信息]' },
      { name: 'check-update', abbr: 'ckup', comment: '[检查 gm-tool 更新]' },
  
      { name: 'run', abbr: 'r', comment: '[执行一个任务]' },
      { name: 'install', abbr: 'i', comment: '[安装 gm 项目依赖服务]' },

      // 打开对应的最佳实践，包括链接，使用代码，官方文档等 文档映射器用个新命令吧
      // { name: 'get-help', abbr: 'gh', comment: '[获取 gm 项目依赖服务帮助]' },

      { name: 'check-run-list', abbr: 'crlist', comment: '[查看 gmtool 可执行的命令]' },
      { name: 'check-install-list', abbr: 'cilist', comment: '[查看 gmtool 可安装的依赖服务]' },
    ]
  },
  {
    class: '项目类',
    children: [
      // 相当于使用 gmtool install all necessary lib
      { name: 'init-all-scripts', abbr: 'italls', comment: '[写入全部可执行命令到 package.json中]' },
      { name: 'config-gm-web-project', abbr: 'configp', comment: '[配置一个项目工程]' },
      { name: 'create-gm-web-project', abbr: 'createp', comment: '[创建一个gm-web项目工程]' },
      // { name: 'check-project-backend', abbr: 'cprbe', comment: 'check project management backend 打开项目管理后台' },
    ]
  },
  {
    class: '业务类',
    children: [
      { name: 'expand-router', abbr: 'exp', comment: 'expand a router [展开一个页面的全部依赖]' },
      { name: 'create-router', abbr: 'cap', comment: 'create a router [创建一个页面级应用程式]' },
      { name: 'delete-router', abbr: 'dap', comment: 'delete a router [删除一个页面级应用程式]' },
    ]
  },
  {
    class: '元件类',
    children: [
      { name: 'create-component', abbr: 'ccp', comment: 'create a component [创建一个业务元件]' },
    ]
  },
  {
    class: '数据类',
    children: [
      // { name: 'create-rest-api-redux-flow', abbr: 'crarf', comment: 'create restful api redux flow [创建redux数据管理流程]' },
      // { name: 'create-graphql-api', abbr: 'cgqa', comment: 'create graphql api [创建graphql api 方法]' }
    ]
  },
]
