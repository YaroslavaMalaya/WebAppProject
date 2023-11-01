import { saveFavorites, loadFavorites } from './favorite.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const favoritesGallery = document.querySelector('.container1');

    function displayFavorites() {
        const favorites = loadFavorites();


        if (favorites.length === 0) {
            const noFavoritesMessage = document.createElement('div');
            noFavoritesMessage.className = "containerfav";
            noFavoritesMessage.innerText = 'YOU DO NOT HAVE ANY FAVORITE PHOTOS';
            noFavoritesMessage.style.fontSize = '2em'; 
            noFavoritesMessage.style.textAlign = 'center';
            noFavoritesMessage.style.marginTop = '100px';
            noFavoritesMessage.style.marginBottom = '500px';
            noFavoritesMessage.style.marginLeft = '70%';
            noFavoritesMessage.style.animation = 'pulse 1s infinite';
            favoritesGallery.appendChild(noFavoritesMessage);
        } else {
            favorites.forEach(src => {
                const block = document.createElement('div');
                block.className = 'block';

                const img = document.createElement('img');
                img.className = "imagesS";
                img.src = src;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'favorite';
                deleteBtn.innerText = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    const index = favorites.indexOf(src);
                    if (index > -1) {
                        favorites.splice(index, 1);
                        saveFavorites();
                        block.remove();
                    }
                });

                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download';
                downloadBtn.innerText = 'Download';
                downloadBtn.addEventListener('click', () => {
                    window.open(src, '_blank');
                });

                block.appendChild(img);
                block.appendChild(deleteBtn);
                block.appendChild(downloadBtn);
                favoritesGallery.appendChild(block);
                });
        }
    }
    displayFavorites();
});
