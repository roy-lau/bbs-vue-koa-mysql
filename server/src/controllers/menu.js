const { Menu } = require("../db/mongoose/models")

module.exports = {
    addMenu: async(ctx, next) => {
        try {
            console.log('================ addMenu start =================');
            let addMenuData = ctx.request.body;
            await Menu.remove()
            let menu = new Menu(addMenuData)
            console.log(addMenuData)
            let menuData = await menu.save()
            ctx.body = {
                errNo: 0,
                message: '新增菜单成功！ ',
                data: menuData
            }
        } catch (err) {
            console.log(`[catch addMenu error] - ${err}`); // 这里捕捉到错误 `error`
            ctx.body = { errNo: 1, message: err }
        }
    },
    findMenu: async(ctx, next) => {
        try {
            console.log('================ findMenu start =================');
            let findMenuData = ctx.request.body,
                menuData = await Menu.find(findMenuData);
                console.log(findMenuData)
            ctx.body = {
                errNo: 0,
                message: '查找菜单成功！ ',
                data: menuData[0]
            }
        } catch (err) {
            console.log(`[catch findMenu error] - ${err}`); // 这里捕捉到错误 `error`
            ctx.body = { errNo: 1, message: err }
        }
    }
}

/*[{
    name: '最热',
    path: 'hot'
}, {
    name: '最新',
    path: 'new'
}, {
    name: '视频',
    path: 'video'
}, {
    name: '音乐',
    path: 'music'
}, {
    name: '软件',
    path: 'software'
}, {
    name: '原创',
    path: 'original'
}, {
    name: '电子书',
    path: 'EBook'
}]*/