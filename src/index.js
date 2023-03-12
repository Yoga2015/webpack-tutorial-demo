import $ from 'jquery';   // 1、使用 ES6 导入语法，导入 jquery

// 3、导入样式 （在webpack中，一切皆模块，都可以通过 ES6 导入语法进行导入和使用）
import './css/index.css'; // 进行编译 执行到这行时发现 非.js后缀名结尾的模块，此时需引入css-loader、style-loader

// 4、导入 .less 后缀名的文件
import './css/index.less';

//2、 定义 jQuery 的入口函数
$(function () {
  // 实现奇偶行变色     // odd 和 even的索引是从0开始的 。  0 是 偶数 ，  1 是 奇数
  $('li:odd').css('backgroundColor', 'yellow');    // 奇数行 为 粉红色  
  $('li:even').css('backgroundColor', 'red');  // 偶数行 为 黄色
})



// 定义一个普通的类
class Person {
  // 通过 static 关键字，为 Person 类定义了一个静态属性  info
  // webpack 无法打包处理 '静态属性'这个高级语法
  static info = 'person info'
};

// console.log(Person.info);
// 故意写错，重新 yarn run dev, 看看有没有 定位到 具体的源代码
consle.log(Person.info);

