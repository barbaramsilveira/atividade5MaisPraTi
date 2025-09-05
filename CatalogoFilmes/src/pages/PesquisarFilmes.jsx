import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFavoritos } from "../context/FavoritosContext";
const PesquisarFilmes = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const { adicionarFavorito, removerFavorito, isFavorito } = useFavoritos();
  // funções de favoritos
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
   // função para buscar filmes
  const handleSearch = async (page = 1) => {
    if (!search) return;
    setSubmitted(true);
    setLoading(true);
    setError(null);
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: search,
          language: "pt-BR",
          page: page,
        },
      });
      await minDelay;
      setMovies(response.data.results || []);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      await minDelay;
      setError("Erro ao buscar filmes: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleFavorito = (movie) => {
    if (isFavorito(movie.id)) {
      removerFavorito(movie.id);
    } else {
      adicionarFavorito(movie);
    }
  };
  const handleVerDetalhes = (id) => {
    navigate(`/detalhes/${id}`);
  };
  return (
    <div className="caixa-de-pesquisa">
      <h2 id="pesquisar-titulo">Pesquisar Filmes</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(1);
        }}
      >
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {}
      {totalPages > 1 && (
        <div className="paginacao">
          <button 
            onClick={() => handleSearch(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button 
            onClick={() => handleSearch(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      )}
      {submitted && loading && <p id="loading">Carregando...</p>}
      {submitted && !loading && error && <p style={{ color: "red" }}>{error}</p>}
      {submitted && !loading && movies.length === 0 && !error && (
        <p>Nenhum filme encontrado.</p>
      )}
      {movies.length > 0 && (
        <div className="galeria">
          {movies.map((movie) => (
            <div key={movie.id} className="card-filme">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="sem-imagem">Sem imagem</div>
              )}
              <h3>
                {movie.title} ({movie.release_date?.slice(0, 4) || "Sem data"})
              </h3>
              <div className="botoes">
                <button 
                  onClick={() => handleVerDetalhes(movie.id)} 
                  className="btn-detalhes"
                >
                  <span className="material-symbols-outlined">info</span>
                </button>

                <button 
                  onClick={() => handleToggleFavorito(movie)} 
                  className={`btn-favorito ${isFavorito(movie.id) ? 'ativo' : ''}`}
                >
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PesquisarFilmes;