import styled, { keyframes } from 'styled-components';

const imageFade = keyframes`
  0% {
    transform: scale(1);
    z-index: 1;
  }
  50% {
    transform: scale(1.1);
    z-index: 1;
  }
  100% {
    transform: scale(1);
    z-index: 1;
  }
`;

export const Header = styled.header`
  width: 100%;
  color: white;
  padding: 1rem;
  text-align: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-weight: bolder;
  font-size: 2.5rem;
`;

export const TitleImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 75vh;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 45%;
  height: 100%;
  transform: scale(1);
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: 0.5s;
    z-index: 1;
  }
  &.scale-up {
    animation: ${imageFade} 1s 0.1s ease-in-out;
  }
`;

export const MarvelImageName = styled.div`
  position: absolute;
  width: 100%;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
  font-size: 5rem;
  color: white;
  text-align: center;
`;

export const MarvelImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  margin: 0.8rem 0rem;
  width: 10rem;
  height: 3rem;
  border: 0;
  outline: 0;
  border-radius: 10px;
  font-weight: bolder;
  color: white;
  background-color: #7c73e6;
  &:hover {
    cursor: pointer;
  }
`;

const IconImage = styled.img`
  position: absolute;
  width: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const VersusImage = styled(IconImage)`
  top: 50%;
  z-index: 2;
`;

export const CrownImage = styled(IconImage)`
  top: 7.5%;
`;
