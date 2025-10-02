function showModel(modelId) {
  document.querySelectorAll("model-viewer").forEach(m => m.style.display = "none");
  document.getElementById(modelId).style.display = "block";
}

window.onload = () => {
  showModel("joel");
};
