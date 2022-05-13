import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Skeleton from './components/Skeleton';
import SearchItem from './components/SearchItem';

const StSearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 450px;
  min-height: 100vh;
  border-radius: 10px;
  border: 1px solid white;
  position: relative;
  top: 20px;
  padding-bottom: 10px;
`;

const StHeader = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  padding: 10px;
  color: ${({ theme }) => theme.colors.titleColor};
`;

const StSearchTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 20%;
`;

const StSubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  padding: 5px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const StInput = styled.input`
  width: 80%;
  height: 20px;
`;

const StButton = styled.button`
  width: 30%;
  height: 30px;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textColor};
  background-color: ${({ theme }) => theme.colors.btnColor};
`;

const StNoResult = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 30px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const StSearchDetail = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const StCheckBox = styled.input``;

function Search() {
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState(null);
  const [input, setStInput] = useState('');
  const [loading, setLoading] = useState(false);

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

  const getMyLocationPub = async () => {
    const result = await getLocation();
    getPubNearMe(result);
  };

  const getPubNearMe = async ({ x, y }) => {
    setLoading(true);
    const {
      data: { documents },
    } = await axios.get('https://dapi.kakao.com/v2/local/search/keyword', {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
      },
      params: {
        query: '맥주',
        radius: 1000,
        x,
        y,
      },
    });

    setResult(getPubInfoList(documents));
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

    setResult(getPubInfoList(documents));
    setLoading(false);
  };

  const getPubInfoList = (documents) => {
    return documents.map(({ id, place_name, phone, place_url, distance, address_name }) => ({
      id,
      shopName: place_name,
      shopPhoneNumber: phone,
      shopUrl: place_url,
      shopDistance: distance,
      shopAddress: address_name,
    }));
  };

  const handleClickButton = () => {
    if (checked) {
      setLoading(true);
      getMyLocationPub();
    } else {
      if (!input) alert('지역을 입력해주세용!');
      else {
        setLoading(true);
        getSpecificLocationPub(input);
      }
    }
  };

  const handleChangeInput = (e) => {
    setStInput(e.target.value);
  };

  return (
    <StSearchContainer>
      <StSearchWrapper>
        <StHeader>🍺우리 동네 맥주집🍺</StHeader>
        <StSearchTitle>
          <StSubTitle>
            현재 지역 기반으로 검색할게요.
            <StCheckBox type="checkbox" value={checked} onChange={(e) => handleCheckBox(e)} />
          </StSubTitle>
          <StSubTitle>아래 동네에서 찾을게요!</StSubTitle>
          <StInput value={input} placeholder="지역을 입력해주세요..." disabled={checked} onChange={(e) => handleChangeInput(e)} />
          <StButton onClick={handleClickButton}>찾아보기</StButton>
        </StSearchTitle>
        <StSearchDetail>
          {loading ? (
            <Skeleton />
          ) : result ? (
            result.length > 0 ? (
              result.map((shop) => <SearchItem key={shop.id} shop={shop} />)
            ) : (
              <StNoResult>결과가 없어요🥲</StNoResult>
            )
          ) : (
            <></>
          )}
        </StSearchDetail>
      </StSearchWrapper>
    </StSearchContainer>
  );
}

export default Search;
