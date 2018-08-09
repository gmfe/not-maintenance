# 小农女eslint配置

配置中使用了[eslint推荐配置](http://eslint.org/docs/rules/)

也使用了[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)

###使用方法

`npm install -g eslint eslint-plugin-react eslint-plugin-gm`

项目中新建.eslintrc.js
```
module.exports = {
    "plugins": [
        "gm"
    ],
    "extends": ["plugin:gm/recommended"]
};
```

###配置方法
rule配置http://eslint.org/docs/user-guide/configuring

`"规则名": 0|1|2`

* "off" or 0 - turn the rule off
* "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
* "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

忽略单行检查
`// eslint-disable-line`

忽略多行检查
```
/*eslint-disable */
     mutil line code
/*eslint-enable */
```

