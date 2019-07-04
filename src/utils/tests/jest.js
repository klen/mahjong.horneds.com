const CoffeeScript = require('coffeescript');


module.exports = {

  process: (src, path) => {

    if(!CoffeeScript.helpers.isCoffee(path)) return src;

    return CoffeeScript.compile(src, { 
      bare: true, inlineMap: true,
    });
  }

};
