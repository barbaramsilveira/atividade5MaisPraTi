import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";
const Favoritos = () => {
  const { favoritos, removerFavorito } = useFavoritos();
  const navigate = useNavigate();
  const handleVerDetalhes = (id) => {
    navigate(`/detalhes/${id}`);
  };
  const handleRemoverFavorito = (id, e) => {
    e.stopPropagation();
    removerFavorito(id);
  };
  if (favoritos.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 class="title-fav">Meus filmes favoritos</h1>
        <p class="fav-text">Você ainda não tem filmes favoritos!!</p>
      </div>
    );
  }
  return (
    <div style={{ padding: '20px' }}>
      <h1 class="title-fav">Meus filmes favoritos ({favoritos.length})</h1>
      <div className="galeria">
        {favoritos.map((movie) => (
          <div 
            key={movie.id} 
            className="card-filme"
            onClick={() => handleVerDetalhes(movie.id)}
            style={{ cursor: 'pointer' }}
          >
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
                onClick={(e) => handleRemoverFavorito(movie.id, e)}
                className="btn-delete"
                style={{ backgroundColor: 'var(--accent-color)', color: 'var(--terciary-color)' }}
              >
                <span className="material-symbols-outlined">delete</span>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Favoritos;