exports.config = {
  projectRoot: "./src",
  projectName: "gabsire-blog-app",
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};