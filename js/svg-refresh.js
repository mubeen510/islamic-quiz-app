function refreshSVG() {
  const wrapper = document.getElementById("svg-wrapper");
  const clone = wrapper.cloneNode(true);
  wrapper.parentNode.replaceChild(clone, wrapper);
}
