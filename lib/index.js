const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()
const cwd = process.cwd()
let config = {
  build: {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
}
try {
  const loadConfig = require(cwd + '/pages.config.js')
  config = Object.assign({}, config, loadConfig)
} catch (e) {}

const {
  dist: distPath,
  tmp: tmpPath,
  paths,
  src: srcPath,
  public: publicPath
} = config.build
const {
  pages: pagesPath,
  fonts: fontsPath,
  images: imagesPath,
  scripts: scriptsPath,
  styles: stylesPath
} = paths

const clean = () => {
  return del([distPath, tmpPath])
}

const style = () => {
  return src(stylesPath, {
    base: srcPath,
    cwd: srcPath
  }).pipe(plugins.sass({
    outputStyle: 'expanded'
  })).pipe(dest(tmpPath)).pipe(bs.reload({
    stream: true
  }))
}

const script = () => {
  return src(scriptsPath, {
    base: srcPath,
    cwd: srcPath
  }).pipe(plugins.babel({
    presets: [require('@babel/preset-env')]
  })).pipe(dest(tmpPath)).pipe(bs.reload({
    stream: true
  }))
}

const page = () => {
  return src(pagesPath, {
    base: srcPath,
    cwd: srcPath
  }).pipe(plugins.swig({
    data: config.data
  })).pipe(dest(tmpPath)).pipe(bs.reload({
    stream: true
  }))
}

const image = () => {
  return src(imagesPath, {
    base: srcPath,
    cwd: srcPath
  }).pipe(plugins.imagemin()).pipe(dest(distPath))
}

const font = () => {
  return src(fontsPath, {
    base: srcPath,
    cwd: srcPath
  }).pipe(plugins.imagemin()).pipe(dest(distPath))
}

const extra = () => {
  return src('**', {
    base: publicPath,
    cwd: publicPath
  }).pipe(dest(distPath))
}

const serve = () => {
  watch(stylesPath, { cwd: srcPath }, style)
  watch(scriptsPath, { cwd: srcPath }, script)
  watch(pagesPath, { cwd: srcPath }, page)
  //  watch('src/assets/images/**', image)
  //  watch('src/assets/fonts/**', font)
  //  watch('public/**', extra)
  watch([
    imagesPath,
    fontsPath
  ], { cwd: srcPath }, bs.reload)

  watch('**', { cwd: publicPath }, bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    server: {
      baseDir: [tmpPath, srcPath, publicPath],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = () => {
  return src(pagesPath, {
    base: tmpPath,
    cwd: tmpPath
  }).pipe(plugins.useref({ searchPath: [tmpPath, '.'] })).
    pipe(plugins.if(/\.js$/, plugins.uglify())).
    pipe(plugins.if(/\.css$/, plugins.cleanCss())).
    pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))).
    pipe(dest(distPath))
}

const compile = parallel(style, script, page)
const build = series(
  clean,
  parallel(
    series(compile, useref),
    extra,
    image,
    font
  )
)
const dev = series(compile, serve)
module.exports = {
  clean,
  build,
  dev
}
