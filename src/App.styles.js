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
    background-color: ${({ theme }) => theme.containerBackground};
    color: #333;
    overflow-x: hidden;
  }
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 1023px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.headerBackground};
  color: white;
  padding: 1rem;
  text-align: left;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;

  div {
    font-size: 2rem;
  }
`;

export const TitleContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  h1 {
    margin-left: 4rem;
    font-size: 2rem;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1rem;
`;

export const AddListButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.color};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonBgHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.buttonBgActive};
  }
`;

export const MobilePlaceholder = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #ffebd9;
    color: #583E26;
    font-size: 1.5rem;
    padding: 1rem;
    text-align: center;
  }
`;