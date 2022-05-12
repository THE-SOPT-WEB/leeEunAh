import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 450px;
  border-radius: 10px;
  border: 1px solid white;
  min-height: 100vh;
  position: relative;
  top: 20px;
  padding-bottom: 10px;
`;
const Header = styled.div`
  color: ${({ theme }) => theme.colors.titleColor};
  font-size: 2.5rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  padding: 10px;
`;
const SearchTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 1.8rem;
  font-weight: bold;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  height: 20px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.btnColor};
  border: 0;
  outline: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textColor};
  font-weight: bold;
  width: 30%;
  height: 15%;
  margin-top: 10px;
  border-radius: 10px;
`;

const NoResult = styled.div`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 2rem;
  font-weight: bold;
  padding: 30px;
`;

const SearchDetail = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  &:hover {
    color: ${({ theme }) => theme.colors.accentColor};
    cursor: pointer;
  }
`;

const ShopName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ShopAddress = styled.div`
  font-size: 0.9rem;
`;

const ShopDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50%;
`;

const ShopNumber = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.phoneColor};
  border-radius: 10px;
  padding: 5px;
  border: 1px solid white;
`;
const ShopDistance = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  float: right;
`;

const CheckBox = styled.input``;

function Search() {
  const [checked, setChecked] = useState(false);
  const [myLocation, setMyLocation] = useState({});
  const [result, setResult] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRealLocation();
  }, []);

  const handleCheckBox = ({ target }) => {
    setChecked(target.checked);
  };

  const getLocation = (errHandler) => {
    if ('geolocation' in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {
              coords: { latitude: y, longitude: x },
            } = position;
            resolve({ x, y });
          },
          (e) => {
            alert('HTTPS 연결을 확인해주세요.');
            errHandler && errHandler();
          }
        );
      });
    }
    return { x: 127.00523482779, y: 37.56557535727 };
  };

  const getRealLocation = async () => {
    const result = await getLocation();
    setMyLocation(result);
  };

  const getPubNearMe = async () => {
    const {
      data: { documents },
    } = await axios.get('https://dapi.kakao.com/v2/local/search/keyword', {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
      },
      params: {
        query: '맥주',
        radius: 1000,
        x: myLocation.x,
        y: myLocation.y,
      },
    });

    setResult(getInfoList(documents));
    setLoading(false);
  };

  const getSpecificLocationPub = async (location) => {
    const {
      data: { documents },
    } = await axios.get('https://dapi.kakao.com/v2/local/search/keyword', {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
      },
      params: {
        query: location + ' ' + '맥주',
      },
    });

    setResult(getInfoList(documents));
    setLoading(false);
  };

  const getInfoList = (documents) => {
    const infoList = documents.map((shop) => ({
      id: shop.id,
      shopName: shop.place_name,
      shopPhoneNumber: shop.phone,
      shopUrl: shop.place_url,
      shopDistance: shop.distance,
      shopAddress: shop.address_name,
    }));
    return infoList;
  };

  const handleClickButton = () => {
    if (checked) {
      setLoading(true);
      getPubNearMe();
    } else {
      if (!text) alert('지역을 입력해주세용');
      else {
        setLoading(true);
        getSpecificLocationPub(text);
      }
    }
  };

  const handleChangeInput = (e) => {
    setText(e.target.value);
  };

  const handleResultClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <SearchWrapper>
      <Header>🍺우리 동네 맥주집🍺</Header>
      <SearchTitle>
        <SubTitle>
          지역 기반으로 검색할게요.
          <CheckBox type="checkbox" value={checked} onChange={(e) => handleCheckBox(e)} />
        </SubTitle>
        <SubTitle>우리 동네는 여기입니다!</SubTitle>
        <Input placeholder="지역을 입력해주세요..." disabled={checked} onChange={(e) => handleChangeInput(e)} value={text} />
        <Button onClick={handleClickButton}>찾아보기</Button>
      </SearchTitle>
      <SearchDetail>
        {loading ? (
          <>Loading..</>
        ) : result ? (
          result.length > 0 ? (
            result.map((shop) => (
              <SearchResult key={shop.id} onClick={() => handleResultClick(shop.shopUrl)}>
                <ShopDetail>
                  <ShopName>{shop.shopName}</ShopName>
                  {shop.shopDistance && <ShopDistance>{shop.shopDistance}미터</ShopDistance>}
                </ShopDetail>
                <ShopDetail>
                  <ShopNumber>{shop.shopPhoneNumber}</ShopNumber>
                  <ShopAddress>{shop.shopAddress}</ShopAddress>
                </ShopDetail>
              </SearchResult>
            ))
          ) : (
            <NoResult>결과가 없어요🥲</NoResult>
          )
        ) : (
          <></>
        )}
      </SearchDetail>
    </SearchWrapper>
  );
}

export default Search;
