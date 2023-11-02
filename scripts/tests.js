import { saveFavorites, loadFavorites } from './favorite.js';
import { expect } from 'chai';

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
            expect(JSON.parse(localStorage.getItem('favorites'))).to.deep.equal(favorites);
        });
    });

    describe('loadFavorites', function() {
        it('should return default favorites if none are stored', function() {
            const favorites = loadFavorites();
            expect(favorites).to.deep.equal([]);
        });

        it('should return stored favorites if they exist', function() {
            const favorites = ['image1.jpg', 'image2.jpg'];
            localStorage.setItem('favorites', JSON.stringify(favorites));
            const loadedFavorites = loadFavorites();
            expect(loadedFavorites).to.deep.equal(favorites);
        });
    });
});
