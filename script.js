const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const standardBtn = document.getElementById("standardBtn");
const scientificBtn = document.getElementById("scientificBtn");

const scientificMode = document.querySelector(".scientific-mode");

themeToggle.addEventListener("click", () => {

  body.classList.toggle("light-mode");

  if(body.classList.contains("light-mode")){
    themeToggle.textContent = "☀️";
  }else{
    themeToggle.textContent = "🌙";
  }

});

scientificBtn.addEventListener("click", () => {

  scientificMode.classList.remove("hidden");

  scientificBtn.classList.add("active");
  standardBtn.classList.remove("active");

});

standardBtn.addEventListener("click", () => {

  scientificMode.classList.add("hidden");

  standardBtn.classList.add("active");
  scientificBtn.classList.remove("active");

});