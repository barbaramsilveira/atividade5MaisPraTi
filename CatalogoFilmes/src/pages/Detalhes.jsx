import React, { useEffect, useState } from "react";// React e hooks
import { useParams, useNavigate } from "react-router-dom";// rotas
import axios from "axios";// requisições HTTP
import { useFavoritos } from "../context/FavoritosContext"; // contexto de favoritos

export default function Detalhes() {
  const { id } = useParams(); // pega o id da URL
  const navigate = useNavigate(); // navegação programática
  const [movie, setMovie] = useState(null); // estado do filme
  const [credits, setCredits] = useState(null); // estado do elenco/crew
  const [loading, setLoading] = useState(true); // estado de carregamento
  const [error, setError] = useState(null); // estado de erro
  
  const { adicionarFavorito, removerFavorito, isFavorito } = useFavoritos();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // busca detalhes do filme e créditos
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "pt-BR",
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          })
        ]);

        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError("Erro ao carregar detalhes do filme");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleToggleFavorito = () => {
    // adiciona ou remove dos favoritos
    if (isFavorito(movie.id)) {
      removerFavorito(movie.id);
    } else {
      adicionarFavorito(movie);
    }
  };

  const getDiretor = () => {
    if (!credits) return "Não disponível";
    const diretor = credits.crew.find(person => person.job === "Director");
    return diretor ? diretor.name : "Não disponível";
  };

  const getElencoPrincipal = () => {
    if (!credits) return [];
    return credits.cast.slice(0, 5).map(ator => ator.name);
  };
// mensagens de carregamento/erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <p>Filme não encontrado</p>;

  return (
    <div className="detalhes-filme">
      <h2>{movie.title}</h2>
      <div className="detalhes-container">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="sem-imagem">Sem imagem</div>
        )}
        
        <div className="detalhes-info">
          <p><strong>Sinopse:</strong> {movie.overview || "Não disponível"}</p>
          <p><strong>Avaliação:</strong> ⭐ {movie.vote_average}/10 ({movie.vote_count} votos)</p>
          <p><strong>Data de Lançamento:</strong> {movie.release_date || "Não disponível"}</p>
          <p><strong>Diretor:</strong> {getDiretor()}</p>
          <p><strong>Elenco Principal:</strong> {getElencoPrincipal().join(", ") || "Não disponível"}</p>
          <p><strong>Gêneros:</strong> {movie.genres?.map(g => g.name).join(", ") || "Não disponível"}</p>
          <p><strong>Duração:</strong> {movie.runtime ? `${movie.runtime} minutos` : "Não disponível"}</p>
          
          <div className="btn-voltar-favoritos">
            {}
            <button className="btn-cinema" onClick={() => navigate(-1)}>
              Voltar
            </button>

            {}
            <button 
              className={`btn-cinema ${isFavorito(movie.id) ? 'ativo' : ''}`} 
              onClick={() => handleToggleFavorito(movie)}
            >
              {isFavorito(movie.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}