import replaceHash from './replace-hash';
const scrollIntoAnchor = (id) => {
  if (id === 'nightmare' || id === 'holic') {
    const comicId = document.querySelector(`.anchor-${id}`);
    comicId.scrollIntoView({ behavior: 'smooth', block: 'center' });
    replaceHash(id);
  } else if (id === 'top') {
    const comicId = document.querySelector(`.anchor-${id}`);
    comicId.scrollIntoView({ behavior: 'smooth' });
  } else if (id === 'seaghost') {
    window.open('https://www.mirrormedia.mg/story/sea_turtle2022_seaghost/');
  } else if (id === 'timetraveling') {
    window.open(
      'https://www.mirrormedia.mg/story/sea_turtle2022_timetraveling'
    );
  } else {
    window.open('https://www.mirrormedia.mg/');
  }
};

export default scrollIntoAnchor;
