const cheerio = require('cheerio');
const axios = require('axios');

const getMangaDetails = (req, res) => {
  const MangaDetail = {
    tags: [],
    story: '',
    cover: '',
    name: '',
    chapters: [],
  };

  const { mangaName } = req.params;
  axios
    .get(`https://teamx.fun/manga/${mangaName}`)
    .then((response) => {
      const { data } = response;
      const $ = cheerio.load(data);
      const img = $('.thumb img').attr('src');
      MangaDetail.cover = img;
      //////////////-----------////////////////
      const name = $('.col-md-9 h3').text();
      /* const namme = name.replace(/\s/g, '-'); */
      MangaDetail.name = name;
      //////////////-----------////////////////
      const story = $('.story p').text();
      MangaDetail.story = story;
      //////////////-----------////////////////

      $('.single-manga-chapter a').each((i, ele) => {
        const LinkOfchapter = $(ele).attr('href');
        const nameOfChapter = $(ele).text();
        MangaDetail.chapters.push({ name: nameOfChapter, link: LinkOfchapter });
      });
      $('.genre a').each((i, ele) => {
        const tag = $(ele).text();
        MangaDetail.tags.push(tag);
      });
      MangaDetail.chapters.reverse();
      res.json(MangaDetail);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = getMangaDetails;
