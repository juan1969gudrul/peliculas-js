// Constantes
// Clave API de OMDb necesaria para acceder a la base de datos de películas.
const API_KEY = "c07ff0bb"; // ⚠️ Sustituir por una clave válida si es necesario

// URL base de la API de OMDb para obtener información de películas.
const API_URL = "https://www.omdbapi.com/";

// URL base para obtener pósteres de películas (aunque en este código no se usa directamente).
const POSTER_API_URL = "https://img.omdbapi.com/";

// Elementos del DOM
// Input donde el usuario introduce el término de búsqueda.
const searchInput = document.getElementById("searchInput");

// Botón que el usuario pulsa para realizar la búsqueda.
const searchButton = document.getElementById("searchButton");

// Contenedor donde se mostrarán los resultados de las películas encontradas.
const movieResults = document.getElementById("movieResults");

// Elemento donde se mostrarán mensajes de error si algo falla.
const errorMessage = document.getElementById("errorMessage");

// Función para mostrar errores
const showError = (message) => {
    // Muestra el mensaje de error en pantalla.
    errorMessage.textContent = message;
  
    // Borra el mensaje después de 5 segundos.
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 5000);
  };

// Función para buscar películas

// Función para mostrar las películas

// Event Listeners (Eventos)

// Prevenir el envío del formulario
