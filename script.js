let cont= document.getElementsByClassName("container")[0]
let head = document.getElementsByClassName("head")[0]
let pokeimg = document.getElementsByClassName("pokeimg")[0]
let optionscont = document.getElementsByClassName("options")[0]
let mypoints = document.getElementsByClassName("mypoints")[0]
let totalpoints = document.getElementsByClassName("totalpoints")[0]
let loadingwindow = document.getElementById("loading")


let usedIds = []
let showloading = false;
let count = 0;
let points = 0 ;

async function fetchPokemon(id) {
//  Show loading while fetching data.
    showloading = true;

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let data = await response.json();
    return data;
}

// async function main() {
//     let pokemon = await fetchPokemon(randomIDgenerator());
//     console.log(pokemon);  
// }

// main();


async function loadingQuesWithOptions() {

    if (showloading) {
        showloadingwindow();
        hidegamewindow();
      }

    let pokemonId = randomIDgenerator();
    while(usedIds.includes(pokemonId)){
        pokemonId = randomIDgenerator();
    }
    usedIds.push(pokemonId);
    const Pokemon = await fetchPokemon(pokemonId);


    // Create/reset the options array with the correct answer (pokemon.name)
    const options = [Pokemon.name]
    const optionsIDs = [Pokemon.id]


    while(options.length<4){
        let randomPokeId = randomIDgenerator();
        while(optionsIDs.includes(randomPokeId)){
            randomPokeId = randomIDgenerator()
        }
        optionsIDs.push(randomPokeId);

        const randompokemon = await fetchPokemon(randomPokeId);
            const randomoption = randompokemon.name;
            options.push(randomoption)

            if (options.length === 4) {
                showloading = false;
              }      
    }

   



    shufflearray(options);

    head.innerHTML = "Guess that Pokemon !!"
    pokeimg.src = Pokemon.sprites.other.dream_world.front_default;

    optionscont.innerHTML=""
    options.forEach((option , index)=>{
        const button = document.createElement("button")
        button.innerHTML = option;
        optionscont.appendChild(button);
        button.addEventListener("click" , (e)=>{
            checkanswer(option === Pokemon.name , e)   //CheckAnswer: if option === pokemon.name => true, else false. plus event which is button click
        })
    })

    setTimeout(() => {
        showloading = false;
        hideloadingwindow();
        showgamewindow();
    }, 1000);  // Delay of 2000ms to increase the time of loadign screen(adjust if needed)
    
}

loadingQuesWithOptions();


function checkanswer(iscorrect , e) {
    const selectedbutn = document.querySelector(".selected")

    if(selectedbutn){
        return
    }
    // else mark the clicked buttn as selected and increa count of quetion by 1
    e.target.classList.add("selected")
    count++;
    totalpoints.textContent = count;

    if(iscorrect){
        displayresult("Correct answer!" , "correct");
        points++;
        mypoints.innerHTML = points;
        e.target.classList.add("correct");
    }
    else{
        displayresult("Wrong answer!" , "wrong");
        e.target.classList.add("wrong")
    }

    setTimeout(() => {
        showloading = true;
        loadingQuesWithOptions();
      }, 1000);
}





// UTILITY FUNCTIONS - - - - - - - - -

function randomIDgenerator(){
   return Math.floor(Math.random() * 151) + 1; 
}

function shufflearray(array){
    return array.sort(()=>Math.random() - 0.5)
}

function displayresult(result){
    head.innerHTML = result
}

function hideloadingwindow(){
    loadingwindow.classList.add("hide")
}

function showloadingwindow(){
    cont.classList.remove("show")
    loadingwindow.classList.remove("hide")
    loadingwindow.classList.add("show")
}

function showgamewindow(){
    loadingwindow.classList.remove("show")
    cont.classList.remove("hide")
    cont.classList.add("show")
}

function hidegamewindow() {
    cont.classList.add("hide");
  }