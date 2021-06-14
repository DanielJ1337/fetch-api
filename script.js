const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const dataArray = [];
fetch(endpoint)
    .then((res) => res.json())
    .then((data) => dataArray.push(...data));

function findMatches(wordToMatch, dataArray) {
    return dataArray.filter((place) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

const inputField = document.querySelector('.main__input');
const cityContainer = document.querySelector('.main__city-container');

function showMatches() {
    const matchArray = findMatches(this.value, dataArray);
    const html = matchArray
        .map((place) => {
            return `
            <div class="main__city no-${place.rank}">
                <h3>${place.city}</h3>
                <p>Growth: ${place.growth_from_2000_to_2013}</p>
                <p>Longitude: ${place.latitude}</p>
                <p>Latitude: ${place.longitude}</p>
                <p>Population: ${place.population}</p>
                <p>State: ${place.state}</p>
                <p>Rank: ${place.rank}</p>
                
            </div>
        `;
        })
        .join('');
    cityContainer.innerHTML = html;
}

inputField.addEventListener('change', showMatches);
inputField.addEventListener('keyup', showMatches);
