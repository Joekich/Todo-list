import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #F5EDED;
    color: #333;
    overflow-x: hidden;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
`;

export const Header = styled.header`
  background-color: #A78B71;
  color: white;
  padding: 1rem;
  text-align: center;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 2rem;
`;