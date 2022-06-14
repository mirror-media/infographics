export default function replaceHash(id) {
  const currentHash = location.hash.replace('#', '');

  if (currentHash !== id) {
    window.location.hash = id;
  }
}
