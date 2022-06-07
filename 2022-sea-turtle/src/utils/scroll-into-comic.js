const scrollIntoComic = (id) => {
  if (id === 'nightmare' || id === 'holic') {
    const comicId = document.querySelector(`.${id}`);
    comicId.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.open('https://www.google.com/');
  }
};

export default scrollIntoComic;
