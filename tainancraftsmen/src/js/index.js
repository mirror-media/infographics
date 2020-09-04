document.addEventListener('DOMContentLoaded', () => {

  const articleLinks = document.querySelectorAll('a[href*="story"]');

  articleLinks.forEach((link) => {
    link.addEventListener('click', () => {
      sendGaEvtForProjects('click', 'go to 文章頁');
    });
  });

  const logo = document.getElementById('logo');
  logo.addEventListener('click', () => {
    sendGaEvtForProjects('click', 'go to mirrormedia');
  });

  window.addEventListener('scroll', function linstenScroll() {
    const doc = document.documentElement
    const currentHeight = Math.ceil(window.pageYOffset + doc.clientHeight);
    const totalHeight = doc.scrollHeight;

    if (currentHeight >= totalHeight) {
      sendGaEvtForProjects('scroll', 'scroll 文章頁 to end');

      window.removeEventListener('scroll', linstenScroll);
    }
  });

  
  function sendGaEvtForProjects(action, label) {
    window.gtag('event', action, {
      event_category: 'projects',
      event_label: label,
    });
  }
});
