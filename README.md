# hexo-yuque-picture

方便使用语雀的图片链接时可以正常显示，为img元素添加 `referrerpolicy="no-referrer"` 属性，绕过图片防盗链。

## 安装

```bash
npm install hexo-yuque-picture --save
```

## 使用

在 `hexo` 根目录的 `_config.yml` 文件中添加配置：

```yaml
yuquePic:
  enable: true
  field: site
  exclude:
    - 'exclude1.com'
    - 'exclude2.com'
```

- `enable`：是否启用插件，默认为 `true`。
- `field`：指定需要添加 `referrerpolicy="no-referrer"` 属性的字段，可选值为 `site` 或 `post`，默认为 `site`。
- `exclude`：排除的域名列表，不添加 `referrerpolicy="no-referrer"` 属性。

## 示例

```html
<img src="https://cdn.nlark.com/yuque/0/2020/png/97322/1600130730623-3e3e3e3e-3e3e-4e3e-8e3e-3e3e3e3e3e3e.png" alt="image" referrerpolicy="no-referrer">
```

## License

MIT

## 参考

- [hexo-filter-nofollow](https://github.com/hexojs/hexo-filter-nofollow)

