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

// Función para mostrar películas
const displayMovies = (movies) => {
  movies.forEach((movie) => {
    // Crea un contenedor para cada película.
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    // Si la película no tiene póster, se muestra una imagen de marcador de posición.
    const posterUrl =
      movie.Poster === "N/A"
        ? "https://via.placeholder.com/300x450.png?text=No+Poster"
        : movie.Poster;

    // Agrega la estructura HTML de la película (imagen, título, año y tipo).
    movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>Año: ${movie.Year}</p>
                <p>Tipo: ${movie.Type}</p>
            </div>
        `;

    // Agrega la tarjeta de la película al contenedor de resultados.
    movieResults.appendChild(movieCard);
  });
};

// Función para mostrar detalles de la película
// Cuando el usuario hace clic en el botón de búsqueda, se ejecuta la función `searchMovies`.
searchButton.addEventListener("click", () => {
  searchMovies(searchInput.value);
});

// Cuando el usuario presiona la tecla "Enter" en el campo de búsqueda, se ejecuta la búsqueda.
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchMovies(searchInput.value);
  }
});

// Función para mostrar el formulario de comentarios

