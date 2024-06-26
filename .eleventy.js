const { DateTime } = require("luxon");
const pageHeading = require("./src/_includes/shortcodes/pageHeading");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/css/style.css");
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy({ "src/robots.txt": "/robots.txt" });

    eleventyConfig.addShortcode("pageHeading", pageHeading);
    
    eleventyConfig.addShortcode("currentDate", (date = DateTime.now()) => {
        return date;
    });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    eleventyConfig.addCollection("page", function(collections) {
    return collections.getFilteredByTag("page").sort(function(a, b) {
        return a.data.order - b.data.order;
    });
    });
    
  
    return {
      dir: {
        input: "src",
        data: "_data",
        includes: "_includes",
        layouts: "_layouts",
      },
    };
  };
  
  