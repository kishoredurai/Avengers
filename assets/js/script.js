const baseUrl = "https://gateway.marvel.com:443/v1/public";
const publicApiKey = "0445d3ae17d321a4448c7d79cf79ac58";
const privateApiKey = "894492125a6c67f23e1c1a2befedd72b41b071b5";

const hash = generateHash(publicApiKey, privateApiKey);
console.log(hash);

//Script for Characters fetch & list
getAllCharacters();

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

function getAllCharacters() {
    axios.get(`${baseUrl}/comics/32477/characters?ts=1&apikey=${publicApiKey}&hash=${hash}&limit=100`)
        .then(response => {
            // Handle the response data
            console.log(response.data);
            var res = response.data.data.results;
            console.log(response.data.data.results);
            var index = 0;
            res.forEach(element => {
                var name = res[index].name;
                var description = (res[index].description).substring(0, 100);
                if (description === "") {
                    description = `${name} is a member of the Avengers and a prominent superhero in the Marvel universe. They are known for their exceptional skills, powers, and heroic qualities. ${name} plays a crucial role in fighting against villains and defending the innocent. With a strong sense of justice and unwavering determination, ${name} stands as a symbol of hope and bravery.`.substring(0, 100);
                }
                if (name != "Thanos") {
                    document.getElementById("characters-container").innerHTML += `<div class="card d-flex flex-column align-items-center border border-2 border-dark " style="width: 17.5rem;">
                    <div class="card-body ">
                <img class="card-img-top" src="${res[index].thumbnail.path}.${res[index].thumbnail.extension}" alt="Card image cap">
                <h5 class="card-title pt-3 pb-">${name}</h5>
                </div>
            </div>`;

                }
                index++;
            });

        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}

if (window.location.href.includes("avengerDetails.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("retrived from local storage");
        var characterId = localStorage.getItem("characterId");
        console.log(localStorage.getItem("characterId"));
        axios.get(`${baseUrl}/characters/${characterId}?ts=1&apikey=${publicApiKey}&hash=${hash}&limit=100`)
            .then(response => {
                var res = response.data.data.results[0];
                console.log(response.data.data.results[0]);
                document.getElementById("characterName").innerText = res.name;
                document.getElementById("comicCount").innerText = res.comics.available;
                document.getElementById("seriesCount").innerText = res.series.available;
                document.getElementById("storyCount").innerText = res.stories.available;
                document.getElementById("characterImg").src = res.thumbnail.path + "." + res.thumbnail.extension;
                var description = res.description;
                var name = res.name;
                if (description === "") {
                    description = `${name} is a member of the Avengers and a prominent superhero in the Marvel universe. They are known for their exceptional skills, powers, and heroic qualities. ${name} plays a crucial role in fighting against villains and defending the innocent. With a strong sense of justice and unwavering determination, ${name} stands as a symbol of hope and bravery.`;
                }
                document.getElementById("characterDesc").innerText = description;

            })

            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    });
}

function getAvengerDetails(characterId, event) {
    localStorage.setItem("characterId", characterId)
    console.log("entered ");
    console.log("characterId" + characterId);
    window.location.href = "avengerDetails.html";


}

function generateHash(publicKey, privateKey) {
    // timestamp = 1
    const input = "1" + privateKey + publicKey;
    const hash = CryptoJS.MD5(input).toString();
    return hash;
}
