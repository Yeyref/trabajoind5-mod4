// Y luego le asigno un evento click al botón para buscar categorías
document.getElementById('searchBtn').addEventListener('click', async () => {
    const categoryId = document.getElementById('categoryId').value;
    try {
        const data = await fetchCategories();
        console.log(data);
        const category = data.categories.find(cat => cat.idCategory === categoryId);
        
        if (category) {
            displayCategory(category);
        } else {
            console.log('Categoría no encontrada');
            document.getElementById('result').innerHTML = 'Categoría no encontrada';
        }
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        document.getElementById('result').innerHTML = 'Error al obtener las categorías';
    }
});

 //Para guiarme un poco en u futuro esta función asíncrona es para obtener categorías desde la API
async function fetchCategories() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error; 
    }
}


function displayCategory(category) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>${category.strCategory}</h2>
        <p>${category.strCategoryDescription}</p>
        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" style="width: 200px; height: auto;">
    `;
}
