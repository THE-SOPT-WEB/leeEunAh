import { useEffect, useRef, useState } from 'react';
import GlobalStyle from './GlobalStyle';
import versus from './assets/versus.png';
import crown from './assets/crown.png';
import captain from './assets/captain.png';
import spiderman from './assets/spiderman.png';

import {
  Header,
  Button,
  CrownImage,
  ImageContainer,
  ImageWrapper,
  Main,
  MarvelImage,
  MarvelImageName,
  VersusImage,
  Title,
  TitleWrapper,
  TitleImage,
} from './styles';

const marvelInfo = [
  {
    id: 1,
    name: '아이언맨',
    src: 'https://w.namu.la/s/1d7727c8651ec67f91333b0624fbf2b728819722ea4051af6480f06e78c523c7df5deee5515c52c2956305074183dd89bca53d0cc152970adb49c1442ae35138dc5e72f401558ba874e2a6874880091874cac2566ce87a74e1a715a8b45e714772aa8e4abe901bd22792e6ccca4c01e1',
  },
  {
    id: 2,
    name: '캡틴 아메리카',
    src: 'https://w.namu.la/s/073a92b7ded4ac7c53e2fef92cabfb17e76e589d5b564741413365ff31f55eacac5e14cab52a570a64c23bfbcf3f8b9aabf38811a2a9895c71200c75d4a5ec07900bb87566c9f61671aec93b1e09a191fc9c0230af4d2eb4d43d768b80c1dd2f7dc8dffc62740b92fe9ac83a6bff62d0',
  },
  {
    id: 3,
    name: '토르',
    src: 'https://w.namu.la/s/dc229156cc0f5e2d037f0d34f27c8ddd28ca9bae049f41caa8b05f9bfdd6b5ba898bf22f0f20faeeed5faed8bdfd0c0a023c30a9a7617f9fdf26ff34ac310626c804f23595490e8fbf5cdcd85915bd197c305b78e7b5f6263afbae58cf4eebf1ee70e6415f4f96d2338acfa79d9b96cf',
  },
  {
    id: 4,
    name: '블랙 위도우',
    src: 'https://w.namu.la/s/e5fafc11738a5955aa364f0d17a6cf6962436a77a5a61e6d3d155d12d16f1ff51be86a899595dd802f21ddb4db88da1edf2e56e6550f39113c370f5f8539de3b152e360fd15f47b27b62e9c07aead61e4931778a67f8bb1b0e82d22508723a77e24d21c9df557d32ab321645fe226a8e',
  },
  {
    id: 5,
    name: '헐크',
    src: 'https://w.namu.la/s/8996fd0399283382c00a3eb186ca3e6614858d4090b2703a2ef6d477ba7f87fc8583651939e77b301faf72c5bd737409d4f11ae16b7f94446fd88050e9e414ad4fb60e31bcb0f62a36ca426ed5009f59a813e0dfd49de3cd52612c8b1e7e0f1657fa94238438205f0833577b0ea640ca',
  },
  {
    id: 6,
    name: '호크아이',
    src: 'https://w.namu.la/s/e82e028c164cdc2905c01121d34aa6d6a5ca5344b94192f5fd084118223d835938b8680ef655826ad3c2e2245b57d23c1b4737bb3ecbc4f84d88a6f32906117bea4e00afda3ebfc37160c3cf0d1a516be9225a7c33a5abeacd4f7b3eceaee2e28d0d91f1420bb636e321ebf3a8301e45',
  },
  {
    id: 7,
    name: '스파이더맨',
    src: 'https://w.namu.la/s/cc595be294d74c7a6d21af81a0ae4a158a611d31167b99a5db17c48cac8a5093db791d3da00288848c0b6c63ed3c8aae5b5d9947e44910eb825a3766b059dcc7967975e0a39d9c448752ddd7f23cf130bc4d467517bf9d0645ea10fec99bc7f00c15142fabc43c72061df6f9a80c8d17',
  },
  {
    id: 8,
    name: '닥터 스트레인지',
    src: 'https://w.namu.la/s/f0ca5e338db3af6885e33807c046b5585e5408218beb2baebfbdce71506f61de294c33596e7449fa5ee543317f7b833ca7760d2cfbab7cf0dbe578a8e7622c84f16448fafb95cbfff5317c65fb449992ebbfddf038501f8238b6c971f4378bd18f2b53c451d10752f9fd0818d573c90a',
  },
];

function App() {
  const [display, setDisplay] = useState([]); // 두개의 보여 줄 정보
  const [info, setInfo] = useState([]); // 해당 라운드에 보여줘야 하는 마블 정보
  const [winner, setWinner] = useState([]); // 해당 라운드에 위너에 속하는 마블 정보
  const [count, setCount] = useState(0); // 해당 라운드에 경기를 몇개 진행했는지 정보
  const [round, setRound] = useState(1); // 라운드 정보

  const imageRef = useRef([]);
  const final = info.length === 1; // 해당 라운드에 보여줘야 하는 마블 정보의 길이가 1이라면 결승으로 간주

  useEffect(() => {
    if (round === 1) {
      marvelInfo.sort(() => Math.random() - 0.5);
      setInfo([...marvelInfo]);
      setDisplay([marvelInfo[0], marvelInfo[1]]);
    } else {
      final ? setDisplay([info[0]]) : setDisplay([info[0], info[1]]);
    }
  }, [round]);

  // 라운드 변경 시, 해줘야 하는 작업들을 담아놓은 함수
  const changeRound = (win) => {
    const winnerArr = [...winner, win];
    winnerArr.sort(() => Math.random() - 0.5);
    setInfo([...winnerArr]);
    setRound((prev) => prev + 1);
    setWinner([]);
    setCount(0);
  };

  // 클릭이벤트 시, 실행되는 함수
  const handleClickImg = (id, index, e) => {
    imageRef.current[index].classList.add('scale-up');
    setTimeout(() => {
      const win = info.find((item) => item.id === id);
      // 해당 라운드에서 마지막 경기인지 판단
      if (count === info.length / 2 - 1) {
        changeRound(win);
        return;
      }
      setDisplay(info.slice(count * 2 + 2, count * 2 + 4)); // 보여 줄 이미지 인덱스 슬라이스
      setWinner((prev) => [...prev, win]); // 해당 라운드 위너 추가
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const handleClickBtn = () => {
    window.location.reload();
  };

  const handleAnimationEnd = (index, e) => {
    imageRef.current[index].classList.remove('scale-up');
  };

  return (
    <>
      <GlobalStyle />
      <>
        <Header>
          {!final && (
            <>
              <TitleWrapper>
                <TitleImage src={captain} alt="캡틴_왼" />
                <TitleImage src={spiderman} alt="스파이더맨_왼" />
                <Title>여러분의 마블 최애 캐릭터는 누구?</Title>
                <TitleImage src={spiderman} alt="캡틴_오" />
                <TitleImage src={captain} alt="스파이더맨_오" />
              </TitleWrapper>
              <Title>{count + 1 + '/' + info.length / 2}</Title>
            </>
          )}
          {final && (
            <>
              <Title>우승자!</Title>
              <Title>{display[0].name}</Title>
            </>
          )}
        </Header>
        <Main>
          <ImageContainer>
            {!final && (
              <>
                <VersusImage src={versus} />
                {display.map((item, index) => (
                  <ImageWrapper
                    ref={(el) => (imageRef.current[index] = el)}
                    key={item.id}
                    onAnimationEnd={(e) => handleAnimationEnd(index, e)}
                    onClick={(e) => handleClickImg(item.id, index, e)}
                  >
                    <MarvelImageName>
                      <h1>{item.name}</h1>
                    </MarvelImageName>
                    <MarvelImage src={item.src} alt={item.name} />
                  </ImageWrapper>
                ))}
              </>
            )}
            {final && (
              <ImageWrapper>
                <CrownImage src={crown} />
                <MarvelImage src={display[0].src} alt={display[0].name} />
              </ImageWrapper>
            )}
          </ImageContainer>
          {final && <Button onClick={handleClickBtn}>다시하기</Button>}
        </Main>
      </>
    </>
  );
}

export default App;
