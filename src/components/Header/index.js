import React from 'react';
import { Link } from 'react-router-dom';

import MVDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';

const Header = () => (
  <Wrapper>
    <Content>
      {/* similar to a-tag in HTML */}
      <Link to='/'>
        <LogoImg src={MVDBLogo} alt='mv-logo' />
      </Link>
      <TMDBLogoImg src={TMDBLogo} alt='tmbd-logo' />
    </Content>
  </Wrapper>
);

export default Header;