import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(460px);
  }
`;

const SearchResult = styled.li`
  background-color: ${({ theme }) => theme.colors.contentColor};
  color: ${({ theme }) => theme.colors.textColor};
  width: 95%;
  height: 100px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid white;
  padding: 10px;
  position: relative;
  &:hover {
    color: ${({ theme }) => theme.colors.accentColor};
    cursor: pointer;
  }
`;

const ShopName = styled.div`
  width: 50%;
  height: 80%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.skeletonColor};
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const ShopAddress = styled.div`
  width: 45%;
  height: 80%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.skeletonColor};
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const ShopDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50%;
  border-radius: 10px;
`;

const ShopNumber = styled.div`
  width: 40%;
  height: 80%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.skeletonColor};
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const ShopDistance = styled.div`
  float: right;
  width: 10%;
  height: 80%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.skeletonColor};
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

function Skeleton() {
  return (
    <SearchResult>
      <ShopDetail>
        <ShopName />
        <ShopDistance />
      </ShopDetail>
      <ShopDetail>
        <ShopNumber />
        <ShopAddress />
      </ShopDetail>
    </SearchResult>
  );
}

export default Skeleton;
