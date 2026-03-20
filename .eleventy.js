import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"
import pluginIcons from "eleventy-plugin-icons"

const imageConfig = {
  extensions: "html",
  formats: ["webp", "jpeg"],
  widths: [300, 600, 900, "auto"],
  defaultAttributes: {
    loading: "lazy",
    decoding: "async",
    sizes: "100vw",
  },
  urlPath: "assets/images/",
};

export default function (eleventyConfig) {
  /*================================*/
  /*   plugins and configurations   */
  /*================================*/
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, imageConfig)
  eleventyConfig.addPlugin(pluginIcons,{ 
    sources: [{ name: "custom", path: "./src/assets/icons" }],
  })

  /*===================================================*/
  /* files that need to be copied to the build folder  */
  /*===================================================*/
  eleventyConfig.addPassthroughCopy("./src/assets/images");

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
    markdownTemplateEngine: 'njk'
  }

}