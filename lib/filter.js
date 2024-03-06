'use strict';

const { parse } = require('url');

function isExternal(url, config) {
    const exclude = config.yuquePic.exclude;
    const data = parse(url);
    const host = data.hostname;
    const sitehost = parse(config.url).hostname || config.url;

    if (!data.protocol || !sitehost) return false;

    if (exclude && exclude.length) {
        for (const i of exclude) {
            if (host === i) return false;
        }
    }

    if (host !== sitehost) return true;

    return false;
}

module.exports = function(data) {
    const hexo = this;
    const config = hexo.config;

    const exclude = config.yuquePic.exclude;
    if (exclude && !Array.isArray(exclude)) {
        config.yuquePic.exclude = [exclude];
    }

    const filterExternal = (data) => {
        const noFollow = 'no-referrer';
        return data.replace(/<img.*?(src=['"](.*?)['"]).*?>/gi, (str, srcStr, src) => {
            if (!isExternal(src, config)) return str;

            if (/referrerpolicy=/gi.test(str)) {
                return str.replace(/referrerpolicy="(.*?)"/gi, (refStr, ref) => {
                    // Avoid duplicate attribute
                    if (!/(no-referrer)/gi.test(ref)) refStr = refStr.replace(ref, `${ref} ${noFollow}`);
                    return refStr;
                });
            }

            return str.replace(srcStr, `${srcStr} referrerpolicy="${noFollow}"`);
        });
    };

    if (config.yuquePic.field === 'post') {
        data.content = filterExternal(data.content);
    } else {
        data = filterExternal(data);
    }

    return data;
};

