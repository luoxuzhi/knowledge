module.exports = {
  title: 'Person Record',
  description: 'Person Record',
  head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `/icons/favicon.ico` }],
  ],
  port: 8081,
  serviceWorker: false,
  themeConfig: {
    // repo: 'luoxuzhi/know',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: 'Edit in GitHub',
    // lastUpdated: 'Last Updated',
    sidebarDepth: 0,
    nav: [
      {
        text: '类别',
        items: [
          { text: '1.es5', link: '/es5/' },
          { text: '2.es6', link: '/es6/' },
          { text: '3.typescript', link: '/typescript/' },
          { text: '4.Vue2', link: '/vue2/' },
          { text: '5.Vue3', link: '/vue3/' },
          { text: '6.react', link: '/react/' },
          { text: '7.native', link: '/native/' },
          { text: '8.miniprogram', link: '/miniprogram/' },
          { text: '9.公众号', link: '/publiccount/' },
          { text: '10.nodejs', link: '/nodejs/' },
          { text: '11.mysql', link: '/mysql/' },
          { text: '12.mongodb', link: '/mongodb/' },
          { text: '13.nginx', link: '/nginx/' },
          { text: '14.docker', link: '/docker/' },
          { text: '15.data-constructure', link: '/data-constructure/' },
          { text: '16.http', link: '/http/' },
          { text: '17.experience', link: '/experience/' },
          // { text: '18.project', link: '/project/'},
        ],
      },
      {
        text: '掘金',
        link: 'https://juejin.im/user/58f6be4bac502e006c4790f7',
      },
    ],
    sidebar: {
      '/es5/': ['', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
      '/es6/': [
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
        'seventeen',
      ],
      '/typescript/': [''],
      '/vue2/': ['', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
      '/vue3/': [''],
      '/react/': ['', 'two'],
      '/native/': ['', 'flutter'],
      '/miniprogram/': ['', 'two', 'taro', 'uni-app'],
      '/publiccount/': [''],
      '/nodejs/': ['', 'two', 'three'],
      '/mysql/': [''],
      '/mongodb/': [''],
      '/nginx/': [''],
      '/docker/': [''],
      '/data-constructure/': [''],
      '/http/': ['', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
      '/project/': ['', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'night', 'ten'],
      '/experience/': [
        '',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'night',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
      ],
    },
  },
}
