import styled from 'styled-components';

export const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    overflow: auto;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
`;

export const TaskNameContainer = styled.div`
    background-color: ${({ theme }) => theme.itemContainer};
    color: ${({ theme }) => theme.taskText};
    border-radius: 15px;
    padding: 20px;
    width: 40%;
    margin-bottom: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

export const TaskContentContainer = styled.div`
    background-color: ${({ theme }) => theme.containerBackground};
    color: ${({ theme }) => theme.textColor};
    border-radius: 15px;
    padding: 20px;
    width: 40%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-height: 600px;
    overflow-y: auto;

    @media (min-width: 1023px) {
    &::-webkit-scrollbar {
      width: 12px;
      background-color: ${({ theme }) => theme.scrollbarBackground};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: ${({ theme }) => theme.scrollbarThumb};
      border: 3px solid ${({ theme }) => theme.scrollbarBorder};
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.scrollbarThumb};
        border: 3px solid ${({ theme }) => theme.scrollbarBorder};
      }
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.scrollbarThumbHover};
    }

    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.scrollbarTrack};
      border-radius: 10px;
    }
  }
`;