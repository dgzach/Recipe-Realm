import { recipes } from './recipes.js';

// Function to simulate rating changes and update the trending list
function updateTrendingRecipes() {
    // Simulate rating changes
    recipes.forEach(recipe => {
        // Randomly increase the rating
        recipe.rating += Math.random() * 0.5; // Increase by up to 0.5
    });

    // Sort recipes based on rating
    recipes.sort((a, b) => b.rating - a.rating);

    // Display the updated lists
    displayRecipes(recipes);
}

// Function to display recipes in the respective sections
function displayRecipes(recipesToDisplay) {
    const trendingContainer = document.querySelector('.trending-recipes .recipes-horizontal-scroll');
    const newestContainer = document.querySelector('.newest-recipes .recipes-horizontal-scroll');

    // Clear existing recipes
    trendingContainer.innerHTML = '';
    newestContainer.innerHTML = '';

    recipesToDisplay.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe-item';
        recipeDiv.innerHTML = `
            <img src="${recipe.imageUrl}" alt="${recipe.name}">
            <p>${recipe.name}</p>
        `;

        if (recipe.category === "Trending") {
            trendingContainer.appendChild(recipeDiv);
        } else if (recipe.category === "Newest") {
            newestContainer.appendChild(recipeDiv);
        }
    });
}

function searchRecipes() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    
    // Filter the recipes based on the search input
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(input)
    );

    // Display the filtered recipes
    displayRecipes(filteredRecipes);
}


window.onload = () => {
    updateTrendingRecipes();
    displayRecipes(recipes);
};
