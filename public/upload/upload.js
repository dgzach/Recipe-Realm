document.addEventListener('DOMContentLoaded', function() {
    addIngredientField();
    addIngredientField();
    addIngredientField();
    addStepField();
    addStepField();

    document.getElementById('addIngredientButton').addEventListener('click', addIngredientField);
    document.getElementById('addStepButton').addEventListener('click', addStepField);
    document.getElementById('uploadForm').addEventListener('submit', submitRecipe);
});

function addIngredientField() {
    const container = document.getElementById('ingredientsContainer');
    createInputField(container, 'ingredient');
}

function removeIngredientField() {
    const container = document.getElementById('ingredientsContainer');
    container.removeChild(container.lastChild);
    container.removeChild(container.lastChild);
}

function addStepField() {
    const container = document.getElementById('stepsContainer');
    createInputField(container, 'step');
}

function removeStepField() {
    const container = document.getElementById('stepsContainer');
    container.removeChild(container.lastChild);
    container.removeChild(container.lastChild);
}

function createInputField(container, fieldName) {
    const index = container.children.length + 1;
    const input = document.createElement(fieldName === 'ingredient' ? 'input' : 'textarea');
    input.id = `${fieldName}${index}`;
    input.name = `${fieldName}${index}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.type = 'button';
    removeButton.onclick = function() {
        input.remove();
        removeButton.remove();
    };

    container.appendChild(input);
    container.appendChild(removeButton);
}

function submitRecipe(event) {
    event.preventDefault();
    
    // Get the form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Perform form validation
    if (!validateForm(formData)) {
        return;
    }
    
    // Convert form data to JSON
    const recipeData = convertFormDataToJson(formData);
    
    // Send the recipe data to the server
    sendRecipeData(recipeData);
}

function validateForm(formData) {
    // Implement form validation logic
    // Return true if the form is valid, false otherwise

}

function convertFormDataToJson(formData) {
    // Implement logic to convert form data to JSON
    // Return the JSON object
}

function sendRecipeData(recipeData) {
    // Implement logic to send the recipe data to the server
}
