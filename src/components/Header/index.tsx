import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";  
import { PiShoppingCartBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import './styles.css'
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userType: 'supermarket' | 'organization';
  userName: string;
}

function Header({ userType, userName }: HeaderProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    navigate('/');
    handleClose();
  };

  return (
    <header className='header'>
      <div className='header-title'>
        AlimenTI
        <div className='header-logo'>
          <PiShoppingCartBold />
        </div>
      </div>
      <div className='header-right'>
        <div className='header-options'>
          {userType === 'organization' ? (
            <>
              <p onClick={() => navigate('/org')}>Doações</p>
              <p onClick={() => navigate('/orgmagazines')}>Supermercados</p>
            </>
          ) : (
            <>
              <p onClick={() => navigate('/market')}>Doações</p>
              <p onClick={() => navigate('/marketmagazines')}>Anúncios</p>
            </>
          )}
        </div>
        <div>
          <IconButton onClick={handleProfileClick}>
            <FaUserCircle size={30} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>{userName}</MenuItem>
            <MenuItem onClick={handleLogout}>
              <FiLogOut style={{ marginRight: '8px' }} />
              Sair
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
