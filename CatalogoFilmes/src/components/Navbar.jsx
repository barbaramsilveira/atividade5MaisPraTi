/* Barra de navegação */
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav id="navbar">
            <Link to="/">Página Inicial</Link>
            <Link to="/pesquisar">Pesquisar</Link>
            <Link to="/favoritos">Favoritos</Link>
        </nav>
    );
}
export default Navbar;