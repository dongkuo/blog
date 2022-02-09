module.exports = {
    app: {
        name: 'blog',
        version: '3.0.0'
    },
    server: {
        port: 3000
    },
    template: {
        path: 'app/views',
        options: {
            map: {ejs: 'ejs'}
        }
    },
    session: {
        secretKey: 'sid'
    },
    db: 'db/blog.db',
    navs: [
        {
            id: 'archive',
            link: '/',
            name: '首页',
            view: 'date-title-group-by-year'
        },
        {
            id: 'coding',
            name: '编程',
            view: 'date-title'
        },
        {
            id: 'writing',
            name: '呓语',
            view: 'date-title'
        }
    ],
    articles: [
        {
            id: 1,
            title: 'dddd',
            date: '2016-09-08'
        },
        {
            id: 2,
            title: 'ewwewe',
            date: '2017-09-08'
        },
        {
            id: 2,
            title: 'lksdsdl',
            date: '2017-08-08'
        },
        {
            id: 2,
            title: 'lksdsdl',
            date: '2015-03-08'
        }
    ]
};