// 4、导入 node.js 中专门操作路径的模块
const path = require('path');

// 10、uglifyjs-webpack-plugin 能减小代码的体积 ，去掉生产环境下 不必要的一些内容，比如说 代码中的注释，换行，空格。
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 6、导入html-webpack-plugin 插件， 得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin');
// 7、创建 html-webpack-plugin 插件的实例对象，此时只是生成实例，需放在 module.exports里才能被调用
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html',  // 指定 要复制 哪个页面
  filename: './index.html',  // 指定 复制出来的 文件名 和 存放路径
});

// 13、clean-webpack-plugin 按需 导入插件、得到插件的构造函数之后，创建插件的实例对象
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const cleanPlugin = new CleanWebpackPlugin();

// 1、使用 Commonjs规范 的导出语法，向外共享 一个 webpack 的配置对象
module.exports = {

  // 14、eval-source-map 仅限 在 开发环境 下使用，不建议在 生产环境 下使用
  // 此选项 生成的 Source Map 能够保证 运行时报错的行数 与 源代码的行数  保持一致
  // devtool: 'eval-source-map',
  // 将 devtool 的值设置为 nosources-source-map 可以定位报错的具体行数，且不想暴露源码
  devtool: 'nosources-source-map',

  // 2、mode 用来指定构建模式。 可选值 有 development 和 production
  mode: 'development',

  // 3、entry 入口文件 ：告诉 webpack  指定要处理哪个文件
  entry: path.join(__dirname, './src/index.js'),  // 要进行打包的入口文件的路径 

  // 5、output 出口文件 : 指定 生成的文件 存放到哪里
  output: {
    path: path.join(__dirname, './dist'), // 存放到哪个目录
    filename: 'js/bundle.js',  //生成的 文件名
  },

  // 8、插件的数组 ，将来 webpack 在运行时，会 加载 并 调用 这些插件
  // 通过 plugins 节点， 使 htmlPlugin插件生效
  plugins: [
    htmlPlugin,
    // new UglifyJsPlugin(),   // 11、 添加 压缩功能的plugin
    cleanPlugin
  ],

  // 9、devServer 节点进行配置，能帮我们 在项目初次打包完成后,自动打开浏览器，并自动访问 指定页面
  devServer: {
    open: true,  // 初次打包完成后，自动打开 浏览器
    host: '127.0.0.1', // 实时打包所使用的主机地址
    port: 80,  // 实时打包所使用的端口号
  },

  // 12、module 节点 是指向 所有第三方文件模块 的 匹配规则
  module: {
    // 子节点 rules 中 指定 文件后缀名的 匹配规则， 定义了不同后缀名的的模块 对应的loader
    rules: [

      // (1)、处理 .css 文件的loader
      {
        test: /\.css$/,    // test 用来 匹配的文件类型
        use: ['style-loader', 'css-loader'],   // use 用来指定 对应 要调用的loader 
      },

      // (2)、处理 .less 文件的loader
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },

      // (3)、处理 图片文件的loader
      // 如果 需要调用的loader 只有一个，则只传递一个字符串也行，如果多个loader , 则必须指定 数组 装着
      // {
      //   test: /\.jpg|png|gif$/,   // 找到 符合格式的图片后，用 use 来处理
      //   use: 'url-loader?limit=22229',  // 其中 ? 之后的是 loader 的参数项 
      // }
      {
        test: /\.jpg|png|gif$/,   // 找到 符合格式的图片后，用 use 来处理
        use: {
          loader: 'url-loader',    // 通过 loader 属性 指定要调用的 loader
          options: {         // 通过 options属性指定参数项
            limit: 22229,
            outputPath: 'image'
          }
        }
      },

      // (4)、处理js高级语法
      {
        test: /\.js$/,
        // exclude 为排除项   不包括
        // 表示 babel-loader 只需处理开发者编写的 js 文件，不需要处理 node_modules 下的js文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',     //由 babel-loader 来调用 @babel/plugin-proposal-class-properties
          options: {                // 参数项
            // 声明一个 babel 插件 ，此插件用来转化 class 中的高级语法
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
      },

    ]
  },
}
