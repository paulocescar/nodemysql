import React, { useState, useEffect, Component } from "react";
import $ from 'jquery';
import Popper from 'popper.js';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

export default function Header({ history }){

  function toggle(){
    if($('#isopen').hasClass('show')){
      $('#isopen').removeClass('show')
    }else{
      $('#isopen').addClass('show')
    }
  }
  
  return (
    <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/Home">reactstrap</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse id="isopen" isOpen={false} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/Produtos">Produtos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Cobrancas">Cobrancas</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>Simple Text</NavbarText>
      </Collapse>
    </Navbar>
  </div>
  );
}
