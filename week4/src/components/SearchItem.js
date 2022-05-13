import styled from 'styled-components';

const StSearchResult = styled.li`
  width: 95%;
  height: 100px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid white;
  padding: 10px;
  color: ${({ theme }) => theme.colors.textColor};
  background-color: ${({ theme }) => theme.colors.contentColor};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.accentColor};
  }
`;

const StShopName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StShopAddress = styled.div`
  font-size: 0.9rem;
`;

const StShopDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50%;
`;

const StShopNumber = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.phoneColor};
`;

const StShopDistance = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  float: right;
`;

function SearchItem({ shop }) {
  const { shopUrl, shopName, shopDistance, shopPhoneNumber, shopAddress } = shop;

  const handleClickResult = (url) => {
    window.open(url, '_blank');
  };

  return (
    <StSearchResult onClick={() => handleClickResult(shopUrl)}>
      <StShopDetail>
        <StShopName>{shopName}</StShopName>
        {shopDistance && <StShopDistance>{shopDistance}미터</StShopDistance>}
      </StShopDetail>
      <StShopDetail>
        <StShopNumber>{shopPhoneNumber ? shopPhoneNumber : 'X'}</StShopNumber>
        <StShopAddress>{shopAddress}</StShopAddress>
      </StShopDetail>
    </StSearchResult>
  );
}

export default SearchItem;
