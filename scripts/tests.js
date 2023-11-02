const { saveFavorites, loadFavorites } = require('./favorite.js');
const assert = require('chai').assert;

describe('Favorites functions', function() {
    
    // Mocking localStorage
    let localStorageMock = (function() {
        let store = {};

        return {
            getItem: function(key) {
                return store[key] || null;
            },
            setItem: function(key, value) {
                store[key] = value.toString();
            },
            clear: function() {
                store = {};
            }
        };

    })();

    Object.defineProperty(window, 'localStorage', { 
        value: localStorageMock 
    });

    beforeEach(() => {
        localStorage.clear();
    });

    describe('saveFavorites', function() {
        it('should save favorites to localStorage', function() {
            const favorites = ['image1.jpg', 'image2.jpg'];
            saveFavorites(favorites);
            assert.deepEqual(JSON.parse(localStorage.getItem('favorites')), favorites);
        });
    });

    describe('loadFavorites', function() {
        it('should return default favorites if none are stored', function() {
            const favorites = loadFavorites();
            assert.deepEqual(favorites, []);
        });

        it('should return stored favorites if they exist', function() {
            const favorites = ['image1.jpg', 'image2.jpg'];
            localStorage.setItem('favorites', JSON.stringify(favorites));
            const loadedFavorites = loadFavorites();
            assert.deepEqual(loadedFavorites, favorites);
        });
    });
});