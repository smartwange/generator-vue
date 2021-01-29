const generator = require('yeoman-generator')
module.exports = class extends (
  generator
) {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'please input your project name:',
        default: this.appname,
      },
    ]).then((answers) => {
      this.answers = answers
    })
  }
  writing() {
    // 把每一个文件都通过模板转化到目标路径
    // 通过数组循环的方式 批量生成每一个文件
    const templates = [
      '.gitignore',
      'babel.config.js',
      'README.md',
      'yarn.lock',
      'package.json',
      'public/index.html',
      'public/favicon.ico',
      'src/assets/logo.png',
      'src/App.vue',
      'src/main.js',
      'src/components/HelloWorld.vue',
    ]
    templates.forEach((el) => {
      this.fs.copyTpl(
        this.templatePath(el),
        this.destinationPath(el),
        this.answers
      )
    })
    // 针对不需要解析的public/index.html中的ejs语法，要保持原样输出<%%= %>使用双百分号开头
  }
}
