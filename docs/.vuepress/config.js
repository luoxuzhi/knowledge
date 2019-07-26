module.exports = {
    title: 'luoxuzhi personal blog',
    description: 'luoxuzhi personal blog',
    head: [
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/icons/favicon.ico` }]
    ],
    serviceWorker: false,
    themeConfig: {
        repo: 'luoxuzhi/know',
        editLinks: true,
        docsDir: 'docs',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebarDepth:0,
        nav: [
            {
                text: '关于我',
                link: ''
            },
            {
                text:'掘金',
                link:'https://juejin.im/user/58f6be4bac502e006c4790f7'
            },
            {
                text:'类别',
                items:[
                  {text:'Vue',link:'/vue/'},
                  {text:'React',link:'/react/'}
                ]
            }
        ],
        // sidebar:{
        //   '/vue/':[
        //     '',
        //     'two'
        //   ],
        //   '/react/':[
        //     '',
        //     'two'
        //   ],
        //   // '/':['']
        // }
        sidebar: [
            {
                title: '准备工作',
                collapsable: false,
                children: [
                    'prepare/',
                    'prepare/flow',
                ]
            }
        ]
    }
}
