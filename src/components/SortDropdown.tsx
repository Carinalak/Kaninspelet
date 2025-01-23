import React, { useState } from "react";
import { styled } from "styled-components";
import { FONT_PLAYPEN, KRITVIT, SKUGGLILA, SMUTSROSA } from "./styled/Variables";

interface SortDropdownProps {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const CustomDropdown = styled.div`
  position: relative;
  width: 200px;
`;

const DropdownButton = styled.div<{ isOpen: boolean }>`
  background-color: ${SKUGGLILA};
  color: ${KRITVIT};
  font-size: 1rem;
  font-family: ${FONT_PLAYPEN};
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: ${({ isOpen }) => (isOpen ? "5px 5px 0 0" : "5px")};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background-color: ${SMUTSROSA};
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${SKUGGLILA};
  color: ${KRITVIT};
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: ${({ isOpen }) => (isOpen ? "0 0 5px 5px" : "0")};
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.li`
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${SMUTSROSA}
  }
`;

const Arrow = styled.span `
   -webkit-tap-highlight-color: transparent;
`;

const sortLabels: Record<string, string> = {
  highestScore: "Högsta poäng",
  lowestScore: "Lägsta poäng",
  mostGoldenRabbits: "Flest guldkaniner",
  latest: "Senaste",
  oldest: "Äldsta",
};

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  setSortBy,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (selectedSort: string) => {
    setSortBy(selectedSort);
    setIsOpen(false);
  };

  return (
    <CustomDropdown>
      <DropdownButton isOpen={isOpen} onClick={toggleDropdown}>
        {sortLabels[sortBy]}
        <Arrow>▼</Arrow>
      </DropdownButton>
      {isOpen && (
        <DropdownList isOpen={isOpen}>
          <DropdownItem onClick={() => handleSelect("highestScore")}>
            Högsta poäng
          </DropdownItem>
          <DropdownItem onClick={() => handleSelect("latest")}>
            Senaste
          </DropdownItem>
          <DropdownItem onClick={() => handleSelect("oldest")}>
            Äldsta
          </DropdownItem>
          <DropdownItem onClick={() => handleSelect("lowestScore")}>
            Lägsta poäng
          </DropdownItem>
          <DropdownItem onClick={() => handleSelect("mostGoldenRabbits")}>
            Flest guldkaniner
          </DropdownItem>
        </DropdownList>
      )}
    </CustomDropdown>
  );
};