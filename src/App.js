import React from 'react';
// import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';

function App() {
  return (
    <div>
      {/* <header className="App-header"> */}
        <Navbar dark color="primary">
          <NavbarBrand href="/">
            FundooApp
          </NavbarBrand>
        </Navbar>
      {/* </header> */}
      <Menu />
    </div>
  );
}

export default App;
