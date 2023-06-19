const eleventyGoogleFonts = require('eleventy-google-fonts')
const Image = require('@11ty/eleventy-img')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyGoogleFonts)

  /*===================================================*/
  /* files that need to be copied to the build folder  */
  /*===================================================*/
  eleventyConfig.addPassthroughCopy('./src/assets/images')
  eleventyConfig.addPassthroughCopy('./src/assets/icons')
  eleventyConfig.addPassthroughCopy('./src/assets/sprite.svg')
  eleventyConfig.addPassthroughCopy({
      'node_modules/svg-icon-sprite/dist/svg-icon-sprite.js': 'assets/svg-icon-sprite.js'
  })

  const imageShortcode = async (imageObj = {}) => {
    const widths = imageObj.widths || [300, 600, 900, 1200]
    const className = imageObj.className || "image"
  
    const sizes = "(min-width: 100px) 50vw, 100vw"
    const metadata =  await Image(imageObj.src, {
        formats: ["webp", "jpeg"],
        outputDir: "./_site/assets/images/generated/",
        urlPath: "/assets/images/generated/",
        widths: widths
    })
    const alt = imageObj.alt;
  
    const imageAttributes = {
        class: className,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    }
  
    return Image.generateHTML(metadata, imageAttributes)
  }

  eleventyConfig.addAsyncShortcode('image', imageShortcode)

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
    markdownTemplateEngine: 'njk'
  }

}