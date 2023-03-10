const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "ff0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#efb549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190ff",
  };
  
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const card = document.querySelector("#card");
  const btn = document.querySelector("#btn");
  
  let getPokeData = () => {
    // gets random number b/w 1 and 150
    let id = Math.floor(Math.random() * 150) + 1;
    // adding the number to the url to make the final url
    const finalUrl = url + id;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        generateCard(data);
      });
  };
  
  //Generate Card
  
  let generateCard = (data) => {
    //get data and assign to variables
    let name = document.querySelector(".poke-name");
    console.log(data);
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  
    const hp = data.stats[0].base_stat;
    const attack = data.stats[1].base_stat;
    const defence = data.stats[2].base_stat;
    const speed = data.stats[5].base_stat;
  
    const type1 = data.stats[5].base_stat;
    const type2 = data.stats[5].base_stat;
  
    const imgSrc = data.sprites.other.dream_world.front_default;
  
    const themeColor = typeColor[data.types[0].type.name];
    console.log("hey" + themeColor);
    card.innerHTML = `
    <p class="hp">
            <span>HP</span>
            ${hp}
          </p>
          <img src="${imgSrc}" />
          <h2 class="poke-name">${pokeName}</h2>
          <div class="types">
          </div>
          <div class="stats">
            <div>
              <h3>${attack}</h3>
              <p>Attack</p>
            </div>
            <div>
              <h3>${defence}</h3>
              <p>Defense</p>
            </div>
            <div>
              <h3>${speed}</h3>
              <p>Speed</p>
            </div>
          </div>
        </div>
        
        `;
    appendTypes(data.types);
    styleCard(themeColor);
  
    console.log(hp);
  };
  
  let appendTypes = (types) => {
    console.log(types);
    types.forEach((item) => {
      let span = document.createElement("SPAN");
      span.textContent = item.type.name;
      document.querySelector(".types").appendChild(span);
    });
  };
  
  let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.background = `${color}`;
    });
  };
  
  btn.addEventListener("click", getPokeData);
  window.addEventListener("load", getPokeData);