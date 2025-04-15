import './Profile.css';
import LoginOverlay from '../../components/LoginOverlay/LoginOverlay';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PersonIcon from '@mui/icons-material/Person';
import { Tooltip } from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginOverlay />;
  }

  const handleSignoutClick = () => {
    logout();
    navigate('/');
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} style={{ color: '#FFD700', fontSize: '1.2rem' }} />);
    }
    if (halfStar) {
      stars.push(<StarHalfIcon key="half" style={{ color: '#FFD700', fontSize: '1.2rem' }} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOutlineIcon key={`empty-${i}`} style={{ color: '#FFD700', fontSize: '1.2rem' }} />);
    }

    return stars;
  };

  return (
    <div className="profile-bg-wrapper">
      <div className="profile-bg">
        <div className="profile-icon">
          <PersonIcon style={{ fontSize: '3rem', color: '#fff' }} />
        </div>
        <div className="profile-content">
          <header className="profile-header">
            <h1>Your CollegeScavs Profile</h1>
          </header>
          <section className="profile-info">
            <h2>{user.name}</h2>
            <p className="email-text">{user.email}</p>
            <div className="rating">
              <span>Rating: </span>
              <Tooltip title={`${user.rating} out of 5 stars`} placement="bottom" >
                <div className="stars">{renderStars(user.rating)}</div>
              </Tooltip>
            </div>
          </section>
          <section className="profile-actions">
            <button className="signout-button" onClick={handleSignoutClick}>Sign Out</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
