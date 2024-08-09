import React from "react";
import { Outlet } from "react-router-dom";
import FooterComponent from "../../layouts/User/Footer";
import NavbarAnotherPage from "../../layouts/User/NavbarAnotherPage";

const HomePageUser = () => {
  return (
    <div>
      <header>
        <NavbarAnotherPage />
      </header>
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePageUser;
