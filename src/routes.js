import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "pages/Inicio";
import NuevoVideo from "pages/NuevoVideo/NuevoVideo";
import Cabecera from "./components/Cabecera/Cabecera";
import Pie from "./components/Pie/Pie";
import Container from "./components/Container/Container";
import Page404 from "pages/Page404/Page404";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Cabecera />
      <Container>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nuevo-video" element={<NuevoVideo />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
      <Pie />
    </BrowserRouter>
  );
}

export default AppRoutes;
