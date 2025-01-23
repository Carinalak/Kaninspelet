import styled, { keyframes } from "styled-components";
import { KRITVIT } from "./styled/Variables";

// Med två tassar
const movePaws = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-25px); // Tasslyft för att simulera steg 
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const dotsAnimation = keyframes`
  0%, 20% {
    content: "";
  }
  40% {
    content: ".";
  }
  60% {
    content: "..";
  }
  80%, 100% {
    content: "...";
  }
`;

const Dots = styled.span`
  &:after {
    content: "";
    animation: ${dotsAnimation} 1.2s infinite;
  }
`;
const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(213, 190, 205, 0.179);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const TextWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${KRITVIT};
  display: flex;
  align-items: center;
  padding-top: 200px;
  width: 100px;
`;

const Laddar = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;

`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 20px; // Avstånd mellan de två tassarna
`;


// Stil för varje tass med alternerande animation
const Paw = styled.div`
  width: 40px;
  height: 40px;
  animation: ${movePaws} 1.2s ease-in-out infinite;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const PawSVG = () => (
  <svg width="40" height="40" viewBox="0 0 115 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M72.1881 87.7211C61.3934 78.1451 52.1374 52.9357 58.2535 44.2512C75.7849 46.4631 69.9195 45.0957 88.6836 49.664C106.558 56.843 102.248 75.2271 96.1315 83.9116C90.0154 92.5961 82.9828 97.2971 72.1881 87.7211Z" fill="#FFFFFF"/>
    <path d="M76.6012 84.3034C77.287 67.4903 67.3497 43.3461 58.2535 44.2512C48.9073 63.4064 51.6467 56.6147 43.0015 78.4614C36.5112 100.999 50.4897 107.855 59.5859 106.949C68.6821 106.044 75.9155 101.117 76.6012 84.3034Z" fill="#FFFFFF"/>
    <path d="M34.9571 85.5089C40.767 77.4125 36.9157 70.1245 29.2332 64.6116C11.1114 56.8515 7.13639 65.5451 7.13639 65.5451C3.72174 73.0132 6.3932 79.996 14.0757 85.5089C21.7583 91.0218 29.1472 93.6053 34.9571 85.5089Z" fill="#FFFFFF"/>
    <path d="M45.5075 55.0727C53.0853 49.8095 51.6593 41.7905 46.2493 34.0014C31.9975 20.3966 25.9164 26.8658 25.9164 26.8658C20.6925 32.4231 16.5813 42.7099 21.9913 50.499C27.4013 58.2882 37.9298 60.3358 45.5075 55.0727Z" fill="#FFFFFF"/>
    <path d="M76.8049 35.5711C84.5096 30.2198 83.1304 22.1683 77.7205 14.3792C63.4143 0.812051 57.2137 7.36428 57.2137 7.36428C51.8872 12.9929 47.6488 23.368 53.0587 31.1571C58.4688 38.9463 69.1002 40.9225 76.8049 35.5711Z" fill="#FFFFFF"/>
    <path d="M103.128 45.9785C94.755 48.5735 89.7332 43.293 87.2558 35.2987C85.7928 17.9165 94.1569 17.0286 94.1569 17.0286C101.342 16.2658 107.16 19.0001 109.637 26.9944C112.115 34.9888 111.502 43.3836 103.128 45.9785Z" fill="#FFFFFF"/>
  </svg>
);


export const PawSpinner = () => {
  return (
    <OverlayBackground>
    <SpinnerWrapper>
      <Paw style={{ animationDelay: '0s' }}>
        <PawSVG />
      </Paw>
      <Paw style={{ animationDelay: '0.4s' }}>
        <PawSVG />
      </Paw>

    </SpinnerWrapper>
    <TextWrapper>
      <Laddar>Laddar<Dots /></Laddar>
      </TextWrapper>
    </OverlayBackground>
  );
};
