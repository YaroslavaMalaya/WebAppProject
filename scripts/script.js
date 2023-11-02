const { saveFavorites, loadFavorites } = require('./favorite.js');

document.addEventListener('DOMContentLoaded', (event) => {
    const searchButton = document.querySelector('.bigbutton');
    const input = document.querySelector('#input1');
    const resultsContainer = document.querySelector('.container1');
    const examplesElement = document.querySelector('.examples');
    const prevArrow = document.querySelector('#prevArrow');
    const nextArrow = document.querySelector('#nextArrow');
    const buttons = document.querySelectorAll('.helpinput .buttonhelp');

    let currentPage = 1;

    prevArrow.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchData();
        }
    });

    nextArrow.addEventListener('click', () => {
        currentPage++;
        fetchData();
    });

    searchButton.addEventListener('click', () => {
        currentPage = 1;
        buttons.forEach(btn => {
            btn.classList.remove('active-button');
        });
        fetchData();
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            currentPage = 1;
            buttons.forEach(btn => {
                btn.classList.remove('active-button');
            });
            fetchData();
            event.preventDefault(); 
        }
    });

    async function fetchData() {
        const query = input.value;
        if (!query) return;

        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=24&page=${currentPage}`, {
                headers: {
                    Authorization: 'JpmGPvNCVwkJgcwRlS81SzsDIe5qYDKK2KVQmVOXJ6yCOlBmJB2JprD9'
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch data from Pexels API:', response.statusText);
                return;
            }

            const data = await response.json();
            displayResults(data.photos);
            
            prevArrow.style.display = (currentPage <= 1) ? 'none' : 'block';
            nextArrow.style.display = (data.photos.length < 24) ? 'none' : 'block';

        } catch (error) {
            console.error('Error fetching data from Pexels API:', error);
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            input.value = button.textContent;
            currentPage = 1;
            buttons.forEach(btn => {
                btn.classList.remove('active-button');
            });
            button.classList.add('active-button');
            fetchData();
        });
    });

    function displayResults(photos) {
        let favorites = loadFavorites();
        resultsContainer.innerHTML = '';
        examplesElement.style.display = 'none';
        photos.forEach(photo => {
            const img = document.createElement('img');
            img.className = "imagesS";
            img.src = photo.src.medium;
            img.alt = photo.alt;

            const block = document.createElement('div');
            block.className = 'block';
            
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'favorite';
            favoriteBtn.innerText = '❤︎';
            favoriteBtn.addEventListener('click', () => {

                const currentUser = localStorage.getItem('currentUser');
                if (!currentUser) {
                    alert('Please log in to save favorites.');
                    return;
                }

                if (!favorites.includes(photo.src.medium)) {
                    favorites.push(photo.src.medium);
                    console.log('Added to favorites:', photo.src.medium);
                } else {
                    console.log('Already in favorites:', photo.src.medium);
                }
                saveFavorites(favorites);
            });
            
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download';
            downloadBtn.innerText = 'Download';
            downloadBtn.addEventListener('click', () => {
                window.open(photo.src.original, '_blank');
            });

            block.appendChild(img);
            block.appendChild(favoriteBtn);
            block.appendChild(downloadBtn);
            resultsContainer.appendChild(block);
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Check if our session key exists
    if (!sessionStorage.getItem('sessionStarted')) {
        // If not, it's a new session, so clear local storage
        localStorage.clear();

        // Now mark this session as started
        sessionStorage.setItem('sessionStarted', 'true');
    }
});

