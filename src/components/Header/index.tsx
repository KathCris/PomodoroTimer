import { HeaderContainer } from "./styles";

import { NavLink } from "react-router-dom"

import logoIgnite from '../../assets/LogoIgnite.svg'
import { Timer, Scroll } from 'phosphor-react'

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <img src={logoIgnite} alt="" />
      </span>
      <nav>
        <NavLink to="/"  title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Historico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}