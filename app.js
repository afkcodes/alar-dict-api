const fetch = require("node-fetch");
const cheerio = require("cheerio");

const words = [];

const getData = (body) => {
  const $ = cheerio.load(body);
  const heading = Array.from($("li.entry"));
  const defs = Array.from($(".defs"));
  getheading(heading);
  getDefs(defs);
};

const term = "ಹೇಸ";
fetch(encodeURI(`https://alar.ink/dictionary/kannada/english/${term}`))
  .then((res) => res.text())
  .then((body) => getData(body));

const getheading = (heading) => {
  const $ = cheerio.load(heading);
  heading.forEach((el, index) => {
    id = index + 1;
    const title = $(el).find(".title").first().text().trim();
    const pronun = $(el).find(".pronun").first().text().trim();
    const type = $(el).find(".types").first().text().trim();
    words.push({
      id,
      title,
      pronun,
      type,
    });
  });
};

const getDefs = (defs) => {
  const $ = cheerio.load(defs);
  let definations = [];
  let defObj = {};
  defs.forEach((el, indexmain) => {
    deflist = Array.from($(el).find("ol li"));
    deflist.forEach((el, index) => {
      const id = index;
      const def = $(el).find("div").text().trim().replace(/\s+/g, " ");
      defObj[id] = def;
     
    });
    definations.push({
      ...defObj,
    });
    words[indexmain].definations = definations;
    definations = [];
    defObj = {};
  });
  // console.log(words);
  console.log(JSON.stringify(words, null, 2))
};
