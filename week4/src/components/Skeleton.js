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

const StSearchResult = styled.li`
  width: 95%;
  height: 100px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid white;
  padding: 10px;
  position: relative;
  color: ${({ theme }) => theme.colors.textColor};
  background-color: ${({ theme }) => theme.colors.contentColor};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.accentColor};
  }
`;

const StSkeleton = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  height: 80%;
  background-color: ${({ theme }) => theme.colors.skeletonColor};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 1s infinite linear;
  }
`;

const StShopName = styled(StSkeleton)`
  width: 50%;
`;

const StShopAddress = styled(StSkeleton)`
  width: 45%;
`;

const StShopNumber = styled(StSkeleton)`
  width: 40%;
`;

const StShopDistance = styled(StSkeleton)`
  float: right;
  width: 10%;
`;

const StShopDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50%;
  border-radius: 10px;
`;

function SkeletonItem() {
  return (
    <StSearchResult>
      <StShopDetail>
        <StShopName />
        <StShopDistance />
      </StShopDetail>
      <StShopDetail>
        <StShopNumber />
        <StShopAddress />
      </StShopDetail>
    </StSearchResult>
  );
}

function Skeleton() {
  return (
    <>
      {new Array(5).fill(1).map((_, i) => {
        return <SkeletonItem key={i} />;
      })}
    </>
  );
}

export default Skeleton;
