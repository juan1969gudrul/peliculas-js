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

const searchMovies = async (query) => {
    try {
      // Limpia los resultados anteriores.
      movieResults.innerHTML = "";
      errorMessage.textContent = "";
  
      // Verifica si el usuario no ha ingresado texto.
      if (!query.trim()) {
        showError("Por favor, introduce un término de búsqueda");
        return;
      }
  
      // Realiza la petición a la API de OMDb para buscar películas por el término ingresado.
      const response = await fetch(
        `${API_URL}?i=tt3896198&apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );
  
      // Convierte la respuesta a formato JSON.
      const data = await response.json();
  
      // Si la respuesta de la API indica que no encontró resultados...
      if (data.Response === "False") {
        showError(
          data.Error === "Movie not found!"
            ? "No se encontraron películas"
            : data.Error
        );
        return;
      }
  
      // Llama a la función que muestra las películas en pantalla.
      displayMovies(data.Search);
    } catch (error) {
      // Captura errores en la solicitud y muestra un mensaje de error.
      console.error("Error:", error);
      showError("Ha ocurrido un error al buscar las películas");
    }
  };
// Función para mostrar las películas

// Event Listeners (Eventos)

// Prevenir el envío del formulario
