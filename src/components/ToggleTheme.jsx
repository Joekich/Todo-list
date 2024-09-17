import styled from "styled-components";

const ToggleSwitch = styled.input`
  position: relative;
  width: 50px;
  height: 25px;
  -webkit-appearance: none;
  background-color: #ccc;
  outline: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:checked {
    background-color: #333333;
  }

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    top: 2.5px;
    left: 3px;
    transition: 0.3s;
  }

  &:checked::before {
    left: 25px;
  }
`;

const ToggleTheme = ({ toggleTheme }) => {
  return (
    <ToggleSwitch type="checkbox" onChange={toggleTheme} />
  );
};

export default ToggleTheme;