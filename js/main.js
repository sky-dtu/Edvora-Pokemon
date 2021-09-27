
function playMusic(){
    var music = new Audio('musicfile.mp3');
    music.play();
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}


const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
    
    const promises = [];
    for (let id=1; id<=150; id++){

        let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
        // url = url + id;
        promises.push(fetch(url).then( response => response.json()));
    }    

    Promise.all(promises).then( results => {
        const pokemon = results.map( data => ({
            name    : data.name,
            id      : data.id,
            image   : data.sprites['front_default'],
            type    : data.types.map( (type) => 
                                    type.type.name).join(", ")
        }))
        // console.log(pokemon);
        diplayPokemon(pokemon);
    })
};


const diplayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map( 
        (pokeman) => {
            const html = '<li class="card"><img class="card-image" src="' + pokeman.image + '"/><h2 class="card-title">' + pokeman.name + '</h2><p class="card-subtitle">' + pokeman.type + '</p></li>';
            
            return html;
        }
    ).join('');
    
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon()