import React from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <Navbar dark color="primary">
          <NavbarBrand href="/">
            FundooApp
          </NavbarBrand>
        </Navbar>
      {/* </header> */}
    </div>
  );
}

export default App;
