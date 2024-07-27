import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';

const Navbar = () => {
  const {shopId} = useParams();
  return (
    <nav>
      <h1>shop</h1>
      <NavLink to="/shopRegister">Register Shop</NavLink>
      <br></br>
      <NavLink to="/shopLogin">Login Shop</NavLink>
      <br></br>
      <NavLink to={`/shopUpdate/${shopId}`}>Update User Shop</NavLink>
      <br></br>
      <NavLink to="/categories/">Sub Category Shop</NavLink>
    </nav>
  );
};

export default Navbar;