const fetch = require("node-fetch");
const cheerio = require("cheerio");

let wordsData = [];

const fetchDefs = async () => {
  wordsData = [];
  const term = "ಹೇಸ";
  return fetch(encodeURI(`https://alar.ink/dictionary/kannada/english/${term}`))
    .then((res) => res.text())
    .then((body) => getData(body))
    .then((data) => data);
};

const getData = async (body) => {
  const $ = cheerio.load(body);
  const heading = Array.from($("li.entry"));
  const defs = Array.from($(".defs"));
  return await getheading(heading).then(() => {
    return getDefs(defs);
  });
  // await getheading();
};

const getheading = async (heading) => {
  console.log("getheading");
  const $ = cheerio.load(heading);
  heading.forEach((el, index) => {
    id = index + 1;
    const title = $(el).find(".title").first().text().trim();
    const pronun = $(el).find(".pronun").first().text().trim();
    const type = $(el).find(".types").first().text().trim();
    wordsData.push({
      id,
      title,
      pronun,
      type,
    });
  });
};

const getDefs = async (defs) => {
  console.log("getDefs");
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
    wordsData[indexmain].definations = definations;
    definations = [];
    defObj = {};
  });
  return wordsData;
  // console.log(JSON.stringify(words, null, 2));
};

module.exports = fetchDefs;
