export default function revertState(callback, millisecond = 1000) {
  setTimeout(callback, millisecond);
}
