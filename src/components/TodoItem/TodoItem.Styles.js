import styled from "styled-components";

export const ItemContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDragging', 'isOverlay'].includes(prop),
})`
    background-color: ${({ theme }) => theme.taskBackground};
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    outline: ${({ isOverlay, theme }) => isOverlay ? `2px solid ${theme.overlayOutlineColor}` : 'none'};
  `;

export const TaskText = styled.span`
    text-align: left;
    color: white;
    font-weight: bold;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
    width: 100%;
  
  `;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  
    @media (min-width: 1023px) {
      flex-direction: row;
      justify-content: flex-end;
      flex-wrap: nowrap;
      pointer-events: auto;
    }
  
    & > button {
      margin-top: 0.5rem;
      margin-right: 0.5rem;
      width: calc(33.33% - 0.5rem);
  
      @media (min-width: 1023px) {
        margin-top: 0;
        margin-left: 0.5rem;
        width: auto;
      }
    }
  `;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['bgcolor', 'hovercolor'].includes(prop),
})`
    padding: 0.5rem 1rem;
    background-color: ${(props) => props.bgcolor || "transparent"};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  
    &:hover {
      background-color: ${(props) => props.hovercolor || "#9C4A1A"};
    }
  `;