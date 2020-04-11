exports.config = {
  projectRoot: "./src",
  projectName: "gabsire-blog-app",
  outDir: './dist/static',
  routes: {
    '/articles/:article': {
      type: 'contentFolder',
      article: {
        folder: "./articles"
      }
    },
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};