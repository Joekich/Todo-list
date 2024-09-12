import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
    
  body {
    overflow-y: scroll;
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  background-color: #A78B71;
  color: white;
  padding: 1rem;
  text-align: left;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 2rem;

  div {
    font-size: 2rem;
    color: #0077b6;
  }
`;

export const AddListButton = styled.button`
  background-color: #A78B71;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #896550;
  }

  &:active {
    background-color: #6F4E37;
  }
`;