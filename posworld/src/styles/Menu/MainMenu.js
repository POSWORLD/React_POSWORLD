import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  z-index: -1;
  position: absolute;
  top: 70px;
  right: -70px;
  ul {
    a {
      &.active {
        background: #fff;
        color: #333;
      }
      display: inline-block;
      width: 85px;
      margin-bottom: 2px;
      padding: 10px 10px 10px 15px;
      background: ${(props) => props.color || "#238DB3"};
      border: 1px solid #a5a5a5;
      border-radius: 10px;
      color: #fff;
      font-size: 0.9rem;
      text-align: center;
    }
  }
`;

function MainMenu() {
  return (
    <Nav>
      <ul>
        <li>
          <NavLink exact to="/">
            홈
          </NavLink>
        </li>
        <li>
          <NavLink to="/Photo">사진첩</NavLink>
        </li>
        <li>
          <NavLink to="/Board">방명록</NavLink>
        </li>
      </ul>
    </Nav>
  );
}

export default MainMenu;
