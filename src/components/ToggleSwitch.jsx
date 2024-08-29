import { useEffect } from "react";
import styled from "styled-components";

const SwitchContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SwitchInput = styled.input`
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:checked {
    background-color: #0077b6;
  }

  &::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    top: 1px;
    left: 1px;
    transition: transform 0.2s ease;
    transform: ${(props) => (props.checked ? "translateX(20px)" : "translateX(0)")};
  }
`;

const SwitchLabel = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const ToggleSwitch = ({ isChecked, onChange, setIsDragEnabled }) => {

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 1024;
      if (isMobile) {
        setIsDragEnabled(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsDragEnabled]);

  return (
    <SwitchContainer>
      <SwitchLabel>Drag&Drop Mode:</SwitchLabel>
      <SwitchInput
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
    </SwitchContainer>
  );
};

export default ToggleSwitch;