const db = require('../sql.js');
const ajax = require('../public/ajax.js');
const cheerio = require('cheerio');
const router = require('koa-router')();
/*
 * 小说分类
 */
router.get('/api/novel/category', async(ctx, next) => {
        let list = await getNovelCategory();
        ctx.body = {
            code: 1,
            data: list,
            message: list.length == 0 ? '没有数据' : '获取成功'
        }
    })
    /*
     * 小说列表
     */
router.post('/api/novel/list', async(ctx, next) => {
    let params = ctx.request.body;
    params['pageNo'] = params.pageNo - 1 || 0;
    params['pageSize'] = params.pageSize || 10000;
    let cmd = `select * from novelList`;
    if (params.keyword) {
        //如果有关键字搜索
        cmd += `${cmd.indexOf('where') == -1 ? ' where' : ' and'} title like '%${params.keyword}%'`
    }
    if (params.categoryId) {
        //如果有类别筛选
        cmd += `${cmd.indexOf('where') == -1 ? ' where' : ' and'} categoryId=${Number(params.categoryId)} `
    }
    cmd += ` order by id asc limit ${params.pageNo * params.pageSize},${params.pageSize}`
    let list = await db(cmd).catch(err => {
        ctx.body = {
            code: 0,
            data: err,
            message: err.sqlMessage
        }
    });
    if (list) {
        ctx.body = {
            code: 1,
            data: list,
            message: '获取成功'
        }
    }
});
/*
 * 小说信息详情
 */
router.get('/api/novel/detail', async(ctx, next) => {
    let params = ctx.query;
    let cmd = `select * from novelList`;
    if (params.id) {
        //如果有类别筛选
        cmd += `${cmd.indexOf('where') == -1 ? ' where' : ' and'} id=${params.id} `
    }
    let list = await db(cmd).catch(err => {
        ctx.body = {
            code: 0,
            data: err,
            message: err.sqlMessage
        }
    });
    if (list.length) {
        let data = await getNovelDetail(list[0])
        ctx.body = {
            code: 1,
            data: data,
            message: '获取成功'
        }
    }
});
/*
 * 小说章节目录
 */
router.get('/api/novel/chapter', async(ctx, next) => {
    let params = ctx.query;
    let cmd = `select * from novelChapter where novelId=${params.id}`;
    let list = await db(cmd).catch(err => {
        ctx.body = {
            code: 0,
            data: err,
            message: err.sqlMessage
        }
    });
    if (list) {
        //根据sortId排序
        list.sort((a, b) => {
            return a.sortId - b.sortId;
        })
        ctx.body = {
            code: 1,
            data: list,
            message: '获取成功'
        }
    }
});
/*
 * 小说章节内容
 */
router.get('/api/novel/chapter/detail', async(ctx, next) => {
    let params = ctx.query;
    let cmd = `select * from novelChapter `;
    if (params.id) {
        //如果有关键字搜索
        cmd += `${cmd.indexOf('where') == -1 ? 'where' : ' and'} id=${params.id}`
    }
    if (params.sortId) {
        //如果有关键字搜索
        cmd += `${cmd.indexOf('where') == -1 ? 'where' : ' and'} sortId=${params.sortId}`
    }
    if (params.novelId) {
        //如果有关键字搜索
        cmd += `${cmd.indexOf('where') == -1 ? 'where' : ' and'} novelId=${params.novelId}`
    }
    let list = await db(cmd).catch(err => {
        ctx.body = {
            code: 0,
            data: err,
            message: err.sqlMessage
        }
    });
    if (list) {
        let data = await getChapterContent(list[0])
        ctx.body = {
            code: 1,
            data: data,
            message: '获取成功'
        }
    }
})

/*
 * 爬取小说分类
 */
async function getNovelCategory() {
    // 如果数据库有分类就返回数据
    let list = await db('SELECT * FROM novelCategory');
    if (list.length !== 0) {
        return list;
    }
    let body = await ajax('/');
    let $ = cheerio.load(body);
    let categoryList = [];
    $('#main .novelslist .content').each(async(index, el) => {
        let categoryName = $(el).find('h2').text();
        let categoryId = index + 1;
        let obj = {
            categoryName,
            categoryId,
        }
        categoryList.push(obj);
        //如果数据库没有该分类，插入分类并返回新的分类数组
        let _arr = await db('SELECT * FROM novelCategory WHERE categoryId = ?', [categoryId]);
        if (_arr.length == 0) {
            await db('INSERT INTO novelCategory (categoryName,categoryId) VALUES(?,?)', [categoryName, categoryId])
        }
    })
    list = categoryList;
    return list;
}
//爬取小说详情和目录
async function getNovelDetail(item) {
    let body = await ajax(item.href);
    let $ = cheerio.load(body);
    let cover = $('#fmimg img').attr('src'); //封面
    let intro = $('#intro p').eq(1).text(); //小说简介
    let author = $('#info p').eq(0).text().split('：')[1]; //作者
    let lastTime = $('#info p').eq(2).text().split('：')[1]; //最近更新时间
    let lastName = $('#info p').eq(3).children('a').text(); //最新一章
    let lastLink = $('#info p').eq(3).children('a').attr('href'); //最新一章链接
    $('#list dd').each(async(index, el) => {
        let menu = {
                novelId: item.id,
                novelName: item.title,
                name: $(el).text(),
                href: $(el).children('a').attr('href'),
                sortId: index + 1,
            }
            //储存小说章节目录
        db(`replace into novelChapter (name, href,novelId,novelName,sortId) values(?,?,?,?,?)`, [menu.name, menu.href, menu.novelId, menu.novelName, menu.sortId]);
    })
    let obj = {
            ...item,
            intro,
            lastTime,
            author,
            lastName,
            lastLink,
            cover,
        }
        //修改最新章节，作者等信息
    db(`UPDATE novelList SET intro='${intro.substr(0,220)}' , lastTime='${lastTime}' , author='${author}' , lastName='${lastName}' , lastLink='${lastLink}' , cover='${cover}' where id=${item.id}`)
    return obj;
}
//爬取小说章节内容
async function getChapterContent(item) {
    let body = await ajax(item.href);
    let $ = cheerio.load(body);
    let content = $('#content').html(); //内容
    let obj = {
        ...item,
        content,
    }
    return obj;
}
module.exports = router