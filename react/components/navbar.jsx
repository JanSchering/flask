import * as React from "react";
import {
  MDBNavItem,
  MDBNavLink,
  MDBNavbarBrand,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBCollapse
} from "mdbreact";

/**
 * @description Creates the general Navigation Bar of the Application
 */
export const Navbar = () => {
  return (
    <MDBNavbar
      color="bg-primary"
      fixed="top"
      dark
      expand="md"
      scrolling
      transparent
    >
      <MDBNavbarBrand href="/">
        <strong>JS</strong>
      </MDBNavbarBrand>
      <MDBNavbarNav left>
        <MDBNavItem active>
          <MDBNavLink to="/">Home</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};
