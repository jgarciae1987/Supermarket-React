import React from 'react';
import Menu from './Menu';
import PlacesItems from './PlacesItems';

const PageWelcome = () => {
  return(
    <div className="App">
      <Menu />
      <PlacesItems />    
    </div>
  );   
}

export default PageWelcome;