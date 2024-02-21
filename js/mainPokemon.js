// Declaración de variables
const contenedorPokemons = document.getElementById("contenedorPokemons");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const searchP = document.getElementById("searchP");
const datoP = document.getElementById("datoP");
const resetP = document.getElementById("resetP");
const formSearchP = document.getElementById("formSearchP");
const btnNavegacion = document.getElementById("btnNavegacion");


let limit = 11;
let offset = 1;


// Paginación
// ******************************************************
previous.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 12;
        removeChildNodes(contenedorPokemons);
        grupoPokemons(offset, limit);
    }
});

next.addEventListener("click", () => {
    offset += 12;
    removeChildNodes(contenedorPokemons);
    grupoPokemons(offset, limit);
});
// ****************************************************

// Funciones para traer los pokemones 
// ************************************************************************
function traerPokemones(dato) {

    if (Number.isInteger(dato)) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${dato}/`)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                crearCardPokemon(datos)
            }).catch((error) => {
                console.log(error)
            })
            ;
    } else {

        fetch(`https://pokeapi.co/api/v2/pokemon/${dato}/`)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                crearCardPokemon(datos)
            })
            .catch((error) => {
                console.log(error);
            });


    }

}

function traerPokemon(dato) {
    const pokemon =
        fetch(`https://pokeapi.co/api/v2/pokemon/${dato}/`)
            .then((respuesta) => respuesta.json())
            .then((datos) => datos);
    return pokemon;
}

function grupoPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        traerPokemones(i);
    }
}
// *************************************************************************
// Crear las card de cada pokemon
// ************************************************************************
function crearCardPokemon(pokemon) {


    let naturalezaPokemon = [];
    let tipo;
    for (i = 0; i < pokemon.types.length; i++) {
        tipo = tipoPokemon(pokemon.types[i].type.name);
        naturalezaPokemon.push(tipo);
    }

    const cardPokemon = document.createElement("div");

    cardPokemon.innerHTML =
        `
    <div class="card cardPokemon">
        <img src="${pokemon.sprites.front_default}" id= "img${pokemon.id}" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
            <h4 class="card-title">${pokemon.name}</h4>
            <h5 class="card-text">#${pokemon.id.toString().padStart(3, 0)}</h5>
            <div id=${pokemon.id}>
                
            </div>
            <button class="btn btn-primary" onclick="desplegarDatoPokemon('${pokemon.id}')" data-toggle="modal" data-target="#modalPokemon">Ver más</button>
        </div>
    </div>
    `;
    contenedorPokemons.appendChild(cardPokemon);

    const tiposNaturaleza_ = document.getElementById(pokemon.id);
    const colorTipo = document.getElementById(`img${pokemon.id}`);
    colorTipo.style.borderRadius = "50%"

    tiposNaturaleza_.style.display = "flex";
    tiposNaturaleza_.style.alignContent = "center";
    tiposNaturaleza_.style.justifyContent = "center";
    naturalezaPokemon.forEach(element => {
        const tipoTexto = document.createElement("div");
        tipoTexto.style.fontSize = "1em";
        tipoTexto.style.padding = "5px";
        tipoTexto.style.margin = "10px 5px";
        tipoTexto.style.color = `#${element.color_}`
        tipoTexto.textContent = element.tipo_;
        colorTipo.style.backgroundColor = `#${element.color_}`
        colorTipo.style.backgroundImage = ` 
        url('data:image/svg+xml,<%3Fxml version="1.0" standalone="no"%3F><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="%23FFFF" d="M44.6,-38C60.5,-28.7,77.9,-14.4,80.5,2.6C83,19.5,70.7,38.9,54.8,51C38.9,63.1,19.5,67.8,0.6,67.2C-18.3,66.6,-36.6,60.8,-48.2,48.7C-59.8,36.6,-64.7,18.3,-65.9,-1.2C-67.1,-20.6,-64.5,-41.3,-52.9,-50.5C-41.3,-59.8,-20.6,-57.6,-3.1,-54.4C14.4,-51.3,28.7,-47.2,44.6,-38Z" transform="translate(100 100)" /></svg>')
        `
        tiposNaturaleza_.appendChild(tipoTexto);
    });

}
// ************************************************************************
// Funcion para clasificar los pokemones por su naturaleza
function tipoPokemon(tipo) {
    let color;
    switch (tipo) {
        case "grass":
            tipo = "Hierba";
            color = "4A9681";
            break;
        case "fairy":
            tipo = "Hada";
            color = "FB0B95";
            break;
        case "fire":
            tipo = "Fuego";
            color = "FF675C"
            break
        case "water":
            tipo = "Agua";
            color = "0596C7"
            break
        case "bug":
            tipo = "Insecto";
            color = "A2FAA3"
            break;
        case "poison":
            tipo = "Veneno";
            color = "795663";
            break;
        case "flying":
            tipo = "Volador";
            color = "7AE7C7";
            break
        case "electric":
            tipo = "Electrico";
            color = "FFEA70";
            break
        case "normal":
            tipo = "Normal";
            color = "B09398";
            break
        case "ice":
            tipo = "Hielo";
            color = "AFEAFD";
            break
        case "rock":
            tipo = "Roca";
            color = "999799";
            break
        case "psychic":
            tipo = "Psiquico";
            color = "FFC6D9";
            break
        case "ghost":
            tipo = "Fantasma";
            color = "561D25";
            break
        case "ground":
            tipo = "Tierra";
            color = "D2B074";
            break
        case "dragon":
            tipo = "Dragon";
            color = "DA627D";
            break
        case "steel":
            tipo = "Metal";
            color = "1D8A99";
            break
        case "fighting":
            tipo = "Pelea";
            color = "2F2F2F";
            break
        case "dark":
            tipo = "Oscuro";
            color = "000000";
            break
        case "shadow":
            tipo = "Sombra";
            color = "C0C0C0";
            break
        case "unknown":
            tipo = "Desconocido";
            color = "2A1A1F";
            break
        default:
            tipo = "No encontrado";
            color = "2A1A1F";
            break;
    }
    return { tipo_: tipo, color_: color };
}
// ********************************************************
// Funcion para desplegar los datos en el modal
function desplegarDatoPokemon(dato) {
    const idPokemon = document.getElementById("idPokemon");
    const namePokemon = document.getElementById("namePokemon");
    const imgPokemon = document.getElementById("imgPokemon");
    const naturalezaP = document.getElementById("naturalezaP");
    const estadistica1 = document.getElementById("estadistica1");
    const estadistica2 = document.getElementById("estadistica2");
    const habilidadP = document.getElementById("habilidadP");
    const movimientoP = document.getElementById("movimientoP");


    naturalezaP.innerHTML = "";
    estadistica1.innerHTML = "";
    estadistica2.innerHTML = "";
    habilidadP.innerHTML = "";
    namePokemon.style.textTransform = "uppercase";
    namePokemon.style.fontWeight = "bold";
    imgPokemon.style.width = "12rem";


    const pokemon = traerPokemon(dato);
    pokemon.then(datos => {
        idPokemon.innerHTML = `#${datos.id}`;
        namePokemon.innerHTML = datos.name;
        imgPokemon.src = datos.sprites.front_default;

        let naturalezaPokemonE = [];
        let tipo;
        for (i = 0; i < datos.types.length; i++) {
            tipo = tipoPokemon(datos.types[i].type.name);
            naturalezaPokemonE.push(tipo);
        }

        naturalezaP.style.display = "flex";
        naturalezaP.style.alignContent = "center";
        naturalezaP.style.justifyContent = "center";
        naturalezaPokemonE.forEach(element => {
            const tipoTexto = document.createElement("div");
            tipoTexto.style.fontSize = "1em";
            tipoTexto.style.padding = "5px";
            tipoTexto.style.margin = "10px 5px";
            tipoTexto.style.color = `#${element.color_}`;
            tipoTexto.textContent = element.tipo_;
            imgPokemon.style.backgroundImage = ` 
        url('data:image/svg+xml,<%3Fxml version="1.0" standalone="no"%3F><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="%23${element.color_}" d="M44.6,-38C60.5,-28.7,77.9,-14.4,80.5,2.6C83,19.5,70.7,38.9,54.8,51C38.9,63.1,19.5,67.8,0.6,67.2C-18.3,66.6,-36.6,60.8,-48.2,48.7C-59.8,36.6,-64.7,18.3,-65.9,-1.2C-67.1,-20.6,-64.5,-41.3,-52.9,-50.5C-41.3,-59.8,-20.6,-57.6,-3.1,-54.4C14.4,-51.3,28.7,-47.2,44.6,-38Z" transform="translate(100 100)" /></svg>')
        `
            naturalezaP.appendChild(tipoTexto);
        });

        console.log(datos)
        let estadisticaP = [];
        for (let i = 0; i < datos.stats.length; i++) {
            let baseStat = datos.stats[i].base_stat;
            let nameStat = datos.stats[i].stat.name;
            estadisticaP.push({ nameStat_: nameStat, baseStat_: baseStat });
        }
        console.log(estadisticaP);



        for (let i = 0; i < estadisticaP.length; i++) {
            let stat1 = document.createElement("div");
            let stat2 = document.createElement("div");

            if (i < 3) {
                stat1.innerHTML = `
                <p>${nombrarEstadisticas(estadisticaP[i].nameStat_)}: <span>${estadisticaP[i].baseStat_}</span></p>
                <div class="progress" role="progressbar" aria-label="Basic example"
                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${estadisticaP[i].baseStat_}%"></div>
                </div>
            `
            }
            if (i >= 3) {
                stat2.innerHTML = `
                <p>${nombrarEstadisticas(estadisticaP[i].nameStat_)}: <span>${estadisticaP[i].baseStat_}</span></p>
                <div class="progress" role="progressbar" aria-label="Basic example"
                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${estadisticaP[i].baseStat_}%"></div>
                </div>
            `
            }

            estadistica1.appendChild(stat1);
            estadistica2.appendChild(stat2);
        }

        for (let i = 0; i < datos.abilities.length; i++) {
            const habilidadPU = document.createElement("div");
            habilidadPU.innerHTML = `
            
            <p>${datos.abilities[i].ability.name}</p>
            `;
            habilidadP.appendChild(habilidadPU);
        }

        for (let i = 0; i <= 5; i++) {
            const movimientoPU = document.createElement("div");
            movimientoPU.innerHTML = `
            <p>${datos.moves[i].move.name}</p>
            `;
            movimientoP.appendChild(movimientoPU);
        }


    });

}

function nombrarEstadisticas(dato) {
    switch (dato) {
        case "hp":
            dato = "HP";
            break;
        case "attack":
            dato = "Ataque";
            break;
        case "defense":
            dato = "Defensa";
            break;
        case "special-attack":
            dato = "Ataque especial";
            break;
        case "speed":
            dato = "Velocidad";
            break;
        case "special-defense":
            dato = "Defensa especial";
            break;
        default:
            dato = "No existe";
            break
    }
    return dato;
}
// *******************************************************
function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Funcion para filtra los pokemones por filtros determinados
// **********************************************************
function filtradoTipos(limite, tipo) {
    let pokemones = [];
    for (let i = 1; i <= limite; i++) {
        pokemones.push(traerPokemon(i).then(dato => {
            return dato;
        }))
    }

    for (let i = 0; i < pokemones.length; i++) {
        pokemones[i].then((dato) => {
            console.log(dato.types[0].type.name)
            for (let j = 0; j < dato.types.length; j++) {
                if (dato.types[j].type.name === tipo) {
                    crearCardPokemon(dato);
                    btnNavegacion.style.display = "none";
                    formSearchP.reset();
                }
            }
        })
    }
}
// ***********************************************************

// Eventos 
searchP.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(datoP.value)
    const busquedaP = datoP.value.toLowerCase();

    switch (busquedaP) {
        case "hierba":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "grass");
            break;
        case "hada":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "fairy");
            break;
        case "fuego":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "fire");
            break;
        case "agua":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "water");
            break
        case "insecto":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "bug");
            break;
        case "veneno":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "poison");
            break;
        case "volador":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "flying");
            break
        case "electrico":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "electric");
            break
        case "normal":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "normal");
            break
        case "hielo":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "ice");
            break
        case "roca":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "rock");
            break
        case "psiquico":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "psychic");
            break
        case "fantasma":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "ghost");
            break
        case "tierra":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "ground");
            break
        case "dragon":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "dragon");
            break
        case "metal":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "steel");
            break
        case "pelea":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "fighting");
            break
        case "oscuro":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "dark");
            break
        case "sombra":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "shadow");
            break
        case "desconocido":
            removeChildNodes(contenedorPokemons);
            filtradoTipos(1010, "unknown");
            break
        default:
            const pokemon = traerPokemon(busquedaP);
            console.log(pokemon)
            pokemon.then(datos => {
                removeChildNodes(contenedorPokemons)
                crearCardPokemon(datos);
                btnNavegacion.style.display = "none";
                formSearchP.reset();
            });
            break;
    }

})

resetP.addEventListener("click", (event) => {
    event.preventDefault();
    removeChildNodes(contenedorPokemons);
    grupoPokemons(offset, limit);
    btnNavegacion.style.display = "block";
})

// Invocaciones de funciones
// ********************************************************
grupoPokemons(offset, limit)
// *********************************************************