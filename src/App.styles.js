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
  display: flex;
  justify-content: space-between;
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
`;

export const TaskCounterContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;

  span {
    margin-right: 10px;
    font-size: 1.2rem;
    color: #555;
  }
`;