export default function replaceHash(id) {
  const currentHash = location.hash.replace('#', '');

  if (currentHash !== id) {
    console.log('should replace currentToId');
    window.location.hash = id;
  }
}
