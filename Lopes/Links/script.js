const chars = '░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞∩';

const bg = document.getElementById("asciiBg");
const search = document.getElementById("search");

function generateAscii() {
  const cols = Math.ceil(window.innerWidth / 12);
  const rows = Math.ceil(window.innerHeight / 18);

  let output = "";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      output += chars[Math.floor(Math.random() * chars.length)];
    }
    output += "\n";
  }

  bg.textContent = output;
}

generateAscii();

setInterval(generateAscii, 200);

window.addEventListener("resize", generateAscii);

search.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  document.querySelectorAll(".posts .post").forEach((post) => {
    const text = post.textContent.toLowerCase();

    post.style.display =
      text.includes(value)
        ? "flex"
        : "none";
  });
});

document.getElementById("linkCount").textContent =
  document.querySelectorAll(".posts .post").length;

document.getElementById("currentDate").textContent =
  new Date().toLocaleDateString("pt-BR");

document.querySelectorAll(".posts .post").forEach(post => {

  post.addEventListener("click", async () => {

    const link = post.dataset.link;

    try {
      await navigator.clipboard.writeText(link);

      const original = post.querySelector("h2").textContent;

      post.querySelector("h2").textContent = "Copiado!";

      setTimeout(() => {
        post.querySelector("h2").textContent = original;
      }, 1000);

    } catch {
      alert("Não foi possível copiar.");
    }

  });

});


