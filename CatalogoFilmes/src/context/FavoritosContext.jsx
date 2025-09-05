import React, { createContext, useContext, useState, useEffect } from 'react';
// importa React e hooks necessários
const FavoritosContext = createContext();
export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos deve ser usado dentro de um FavoritosProvider');
  }
  return context;
};
export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
    // estado dos filmes favoritos
  useEffect(() => {
    // carrega os favoritos do localStorage ao iniciar
    const storedFavoritos = localStorage.getItem('filmesFavoritos');
    if (storedFavoritos) {
      setFavoritos(JSON.parse(storedFavoritos));
    }
  }, []);
  useEffect(() => {
    // salva os favoritos no localStorage sempre que mudarem
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));
  }, [favoritos]);
  const adicionarFavorito = (filme) => {
    // adiciona filme aos favoritos se não existir
    setFavoritos(prev => {
      const existe = prev.find(f => f.id === filme.id);
      if (!existe) {
        return [...prev, filme];
      }
      return prev;
    });
  };
  const removerFavorito = (id) => {
    // remove filme pelo id
    setFavoritos(prev => prev.filter(filme => filme.id !== id));
  };
  const isFavorito = (id) => {
    return favoritos.some(filme => filme.id === id);
  };
  const value = {
    favoritos,
    adicionarFavorito,
    removerFavorito,
    isFavorito
  };
  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
};