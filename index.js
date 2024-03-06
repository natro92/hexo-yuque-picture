'use strict';

// set default config.
hexo.config.yuquePic = Object.assign({
    enable: true,
    field: 'site',
    exclude: []
}, hexo.config.yuquePic);

const config = hexo.config.yuquePic;

if (!config.enable) return;

// operate as requirements.
if (config.field === 'post') {
    hexo.extend.filter.register('after_post_render', require('./lib/filter'));
} else {
    hexo.extend.filter.register('after_render:html', require('./lib/filter'));
}
