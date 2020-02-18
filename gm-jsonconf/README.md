一个json配置的增强版，支持include写法来引入额外的配置文件。

```json
{
  "port": 8787,
  // 外网
  "publicPath": "xxxxx",
  "include": [
    "./local.json"
  ]
}
```