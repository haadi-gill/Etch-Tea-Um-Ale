import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import SellIcon from '@mui/icons-material/Sell';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Tooltip } from '@mui/material';
import './Header.css';
import LoginOverlay from '../LoginOverlay/LoginOverlay';

const Header = () => {
  /*
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      setShowLogin(true);
    }
  };
  */

  return (
    <header className="header">
      <div className="container">
        <Link to="/" exact className="nav-link" activeClassName="active"><h2 className="logo">CollegeScavs</h2></Link>
        <nav className="nav">
          <Tooltip title="Home" placement="bottom">
            <NavLink to="/" exact className="nav-link" activeClassName="active">
              <HomeIcon className="nav-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="Wishlist" placement="bottom">
            <NavLink to="/wishlist" className="nav-link" activeClassName="active">
              <FavoriteIcon className="nav-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="My Listings" placement="bottom">
            <NavLink to="/mylistings" className="nav-link" activeClassName="active">
              <ViewListIcon className="nav-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="Sell" placement="bottom">
            <NavLink to="/sell" className="nav-link" activeClassName="active">
              <SellIcon className="nav-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="Profile" placement="bottom">
            <NavLink to="/profile" className="nav-link" activeClassName="active">
              <PersonIcon className="nav-icon" />
            </NavLink>
          </Tooltip>
        </nav>
      </div>
    </header>
  );
};

export default Header;
