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


