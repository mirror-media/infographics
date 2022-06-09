const scrollIntoComic = (id) => {
  if (id === 'nightmare' || id === 'holic') {
    const comicId = document.querySelector(`.anchor-${id}`);
    comicId.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    window.open('https://www.google.com/');
  }
};

export default scrollIntoComic;
