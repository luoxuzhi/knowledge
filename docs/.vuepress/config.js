module.exports = {
    title: 'Person Blog',
    description: 'Person Blog',
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
        editLinkText: 'Edit in GitHub',
        lastUpdated: 'Last Updated',
        sidebarDepth:0,
        nav: [
            {
                text:'类别',
                items:[
                  {text:'Vue',link:'/vue/'},
                  {text:'React',link:'/react/'},
                  {text:'typescript',link:'/typescript/'},
                  {text:'mongodb',link:'/mongodb/'},
                  {text:'小程序',link:'/miniprogram/'},
                  {text:'node',link:'/node/'},
                  {text:'ES5',link:'/ES5/'},
                  {text:'ES6',link:'/ES6/'},
                  {text:'http协议原理',link:'/http/'},
                  {text:'慕课实战',link:'/imooc/'},
                  {text:'experience',link:'/experience/'}
                  // {text:'CSS3',link:'/CSS3/'},
                  // {text:'JS',link:'/javascript/'},
                  // {text:'html-css',link:'/html-css/'},
                ]
            },
            {
                text:'掘金',
                link:'https://juejin.im/user/58f6be4bac502e006c4790f7'
            },
        ],
        sidebar:{
          '/vue/':[
            '',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine'
          ],
          '/react/':[
            '',
            'two'
          ],
          '/typescript/':[
            '',
            'two'
          ],
          '/mongodb/':[''],
          '/http/':[
            '',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven'
          ],
          '/miniprogram/':[''],
          '/node/':[
            '',
            'two'
          ],
          '/ES5/':[
            '',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
          ],
          '/ES6/':[
            '',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine',
            'ten',
            'eleven',
            'twelve',
            'thirteen',
            'fourteen',
            'fifteen',
            'sixteen',
            'seventeen'
          ],
          '/imooc/':[
            ''
          ],
          '/experience/':[
            '',
            'two',
            'three',
            'four',
            'five'
          ]
          // '/svg/':[
          //   '',
          //   'two',
          //   'three',
          //   'four',
          //   'five',
          //   'six',
          //   'seven',
          //   'eight',
          //   'nine',
          //   'ten'
          // ]

        }
        // sidebar: [
        //     {
        //         title: '准备工作',
        //         collapsable: false,
        //         children: [
        //             'prepare/',
        //             'prepare/flow',
        //         ]
        //     }
        // ]
    }
}
