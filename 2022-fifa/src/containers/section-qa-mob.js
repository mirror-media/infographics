import { useState } from 'react';
import styled, { css } from 'styled-components';
import SubTitle from '../components/sub-title';
import QAList from '../components/react-components/list/qa-list';
import { InView } from 'react-intersection-observer';
import ReactGA from 'react-ga';
import readMore from '../assets/readmore.svg';
import closeReadMore from '../assets/close-readmore.svg';

const questions = [
  {
    id: '3',
    title: '我要怎麼掌握最新的 2022 FIFA 世界盃足球賽資訊？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '請密切關注鏡週刊！您可將本專頁儲存於「我的最愛」，鏡週刊將為您火速更新本屆賽事的賽程、戰績與最新消息',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: 1,
  },
  {
    id: '4',
    title: '2022 世足賽要怎麼看？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '電視轉播：愛爾達體育 1 台、中華電信 MOD',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '30bf0',
          data: {},
          text: '線上：Hami Video 運動、ELTA.tv',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '6c3mf',
          data: {},
          text: '如果節目播出時段有異動，各位觀眾皆可前往以上平台，直接查詢最新公告。',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: null,
  },
  {
    id: '5',
    title: '2022 世足賽的舉辦時間是什麼時候？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '今年是第 22 屆國際足協世界盃 ，比賽將於 2022 年 11 月 21 日至 12 月 18 日間進行',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: null,
  },
  {
    id: '6',
    title: '2022 世足賽的舉辦國是哪一個國家？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '今年的世足賽舉辦國是卡達。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'e8erh',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '7lgth',
          data: {},
          text: '這是世足賽首次在伊斯蘭世界舉辦，也是歷屆舉辦國中最小的國家。在 2010 年國際足協（FIFA）的票選中，卡達贏過了韓國、日本、澳大利亞、美國等申請國，成為 2022 年的世界盃主辦國。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'anm9e',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '7vlsq',
          data: {},
          text: '卡達政府為了迎接 2022 年世足賽的 150 萬名全球球迷，當地興建了 7 座新的體育場，包含位於首都杜哈，以及路薩爾、豪爾、賴揚及沃克拉等城市的 8 座體育館，都將被使用為世足賽場。其中，規模最大的路薩爾地標體育場，可以容納 80,000 名觀眾！',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: null,
  },
  {
    id: '8',
    title: '如何購買世足門票？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '如果想要在現場觀看比賽，可以前往世足官網購票：FIFA.com/tickets',
          type: 'ordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '19rnn',
          data: {},
          text: '開放購票時間為台灣時間 9/27 16:00-17:00 至 12/18',
          type: 'ordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: null,
  },
  {
    id: '9',
    title: '世足賽的基本規則？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '足球比賽中，參賽雙方各有 11 名球員，包含 1 名守門員，3-5 名後衛，3-5 名中場，以及 1-3 名前鋒球員組成。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '4q46',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '29okb',
          data: {},
          text: '裁判則包含：4 名裁判，其中有 1 名主裁判、2 名邊審裁判與 1 名場外負責監督教練與休息區球員的第四官員。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'avg0u',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'bcr32',
          data: {},
          text: '足球賽的比賽時間為一場 90 分鐘，分成上、下半場（各 45 分），中場休息 15 分鐘，讓球員休息，也可以讓教練調整戰略。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '153hf',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '79qtv',
          data: {},
          text: '在小組賽階段，沒有加時環節，90 分鐘一到，比賽就會結束；進入 16 強後的淘汰賽階段後，如果雙方 90 分鐘仍然平手，就會再進行 30 分鐘延長賽，延長賽還是平手的話，就會進入十二碼 PK 環節。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: null,
  },
  {
    id: '7',
    title: '2022 世足賽出賽國家和分組？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '9kodc',
          data: {},
          text: ' ',
          type: 'atomic',
          depth: 0,
          entityRanges: [
            {
              key: 0,
              length: 1,
              offset: 0,
            },
          ],
          inlineStyleRanges: [],
        },
        {
          key: '4eads',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '5aogb',
          data: {},
          text: 'A 組：卡達、厄瓜多、塞內加爾、荷蘭',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '3un33',
          data: {},
          text: 'B 組：英格蘭、伊朗、美國、威爾斯',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '9qk13',
          data: {},
          text: 'C 組：阿根廷、沙烏地阿拉伯、墨西哥、波蘭',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '8fk3c',
          data: {},
          text: 'D 組：法國、澳洲、丹麥、突尼西亞',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'bdsjl',
          data: {},
          text: 'E 組：西班牙、哥斯大黎加、德國、日本',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '6e1le',
          data: {},
          text: 'F 組：比利時、加拿大、摩洛哥、克羅埃西亞',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'f3vr',
          data: {},
          text: 'G 組：巴西、塞爾維亞、瑞士、喀麥隆',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '1ilhc',
          data: {},
          text: 'H 組：葡萄牙、加納、烏拉圭、南韓',
          type: 'unordered-list-item',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {
        0: {
          data: {
            id: '32',
            desc: '資料來源：https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022',
            name: 'FIFA01',
            resized: {
              original:
                'https:///editools-gcs.readr.tw/images/19d3156a-1c85-4a81-8361-968aa0d4a3ff.jpg',
            },
            imageFile: {
              url: '/images/19d3156a-1c85-4a81-8361-968aa0d4a3ff.jpg',
            },
          },
          type: 'image',
          mutability: 'IMMUTABLE',
        },
      },
    },
    sortOrder: null,
  },
  {
    id: '10',
    title: '世足賽的官網連結？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: null,
  },
  {
    id: '11',
    title: '世足賽的指定用球？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '2022 世界盃的指定用球一樣是由 Adidas 提供，並被命名為「Al Rihla」。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'd8nef',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '12ei1',
          data: {},
          text: '在阿拉伯文中，「Al Rihla」是「旅行」或「遊記」的意思。球面部分也採用了全新的設計，一共使用了 20 塊球面，其形狀及配色靈感，取自於主辦國卡達的文化、建築、沙丘、標誌性船隻和國旗。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '7d5m3',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '2ftoa',
          data: {},
          text: '此外，這次的球體使用了一種名為「Speedshell（譯：速度殼）」的創新技術，能提高足球的飛行和旋轉速度，讓擊球的精準度與穩定性更臻完美。國際足聯表示：Al Rihla 的空中飛行速度，將是世界盃歷史中最快的！',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: null,
  },
  {
    id: '12',
    title: '世足賽的吉祥物？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '4m96',
          data: {},
          text: ' ',
          type: 'atomic',
          depth: 0,
          entityRanges: [
            {
              key: 0,
              length: 1,
              offset: 0,
            },
          ],
          inlineStyleRanges: [],
        },
        {
          key: 'a7m1',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: 'agc97',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '2mco2',
          data: {},
          text: "2022 世足賽的吉祥物是「拉衣卜」（La'eeb），他的造型發想，是來自於阿拉伯傳統白色長袍，這個名字在阿拉伯語中，意指「技術高超的球員」～",
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {
        0: {
          data: {
            id: '33',
            desc: 'https://www.fifa.com/fifaplus/en/articles/laeeb-is-revealed-as-qatars-fifa-world-cup-tm-mascot',
            name: 'FIFA02',
            resized: {
              original:
                'https:///editools-gcs.readr.tw/images/e8eb590e-f86f-44ca-83c3-62688e791f58.jpg',
            },
            imageFile: {
              url: '/images/e8eb590e-f86f-44ca-83c3-62688e791f58.jpg',
            },
          },
          type: 'image',
          mutability: 'IMMUTABLE',
        },
      },
    },
    sortOrder: null,
  },
  {
    id: '13',
    title: '上一屆世足賽的冠軍是哪一國？',
    content: {
      blocks: [
        {
          key: 'djh7i',
          data: {},
          text: '法國。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '1m599',
          data: {},
          text: '',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
        {
          key: '6v7lp',
          data: {},
          text: '2018 年，法國以 4:2 的戰績擊敗克羅埃西亞，奪得該屆世足賽冠軍。',
          type: 'unstyled',
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
        },
      ],
      entityMap: {},
    },
    sortOrder: null,
  },
];

const Section = styled.div`
  width: 100%;
  background: #f5f1f6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 4px solid #5d2e7a;
  @media (min-width: 768px) {
    border-bottom: none;
    padding-bottom: 80px;
    display: none;
  }

  @media (min-width: 1200px) {
    padding-bottom: 250px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 92%;
  padding: 40px 0;
  @media (min-width: 1200px) {
    width: 90%;
  }
`;

const RestQaListContainer = styled.div`
  border-radius: 6px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 615px;
  overflow: hidden;
  height: 50px;
  ${(props) =>
    props.show &&
    css`
      height: 100%;
      transition-duration: 0.5s;
      :after {
        display: none;
      }
    `}
  :after {
    position: absolute;
    content: '';
    width: 100%;
    height: 60px;
    border-radius: 6px;
    left: 5px;
    background-image: linear-gradient(to bottom, transparent, #f5f1f6);

    @media (min-width: 768px) {
      display: none;
    }
  }
  @media (min-width: 768px) {
    height: 100%;
  }
`;

const CloseReadMoreBtn = styled.button`
  cursor: pointer;
  background-color: #f5f1f6;
  font-size: 16px;
  font-weight: 500;
  color: #5d2e7a;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-top: 15px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ReadMoreBtn = styled.button`
  cursor: pointer;
  background-color: #f5f1f6;
  font-size: 16px;
  font-weight: 500;
  color: #5d2e7a;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-top: 15px;

  @media (min-width: 768px) {
    display: none;
  }

  margin: auto;
  ${(props) =>
    props.hide &&
    css`
      display: none;
    `}
`;

const QaGaAnchorWrapper = styled.div`
  /* width: 100%; */
`;
const QaGaAnchor = styled.div`
  color: #5d2e7a;
`;

const QaSectionMob = () => {
  const [inView, setInView] = useState(false);
  const [hasSentGa, setHasSentGa] = useState(false);
  const [showRestQa, setShowRestQa] = useState(false);

  const handleGaInview = (isInView) => {
    setInView(isInView);
    if (isInView && !hasSentGa) {
      ReactGA.event({
        category: 'Projects_FIFA',
        action: 'scroll',
        label: '頁面滑動至「FAQs」區塊最底部',
      });
      setHasSentGa(true);
    }
  };

  const handleShowMore = () => {
    setShowRestQa(true);
  };

  const handleCloseShowMore = () => {
    setShowRestQa(false);
  };

  return (
    <Section>
      <Wrapper>
        <SubTitle>重要資訊懶人包</SubTitle>
        <QAList questions={questions.slice(0, 2)} />
        <RestQaListContainer show={showRestQa}>
          <QAList questions={questions.slice(2)} />
          <CloseReadMoreBtn onClick={handleCloseShowMore}>
            收合部分 <img src={closeReadMore} alt='close read more' />
          </CloseReadMoreBtn>
        </RestQaListContainer>
        <ReadMoreBtn onClick={handleShowMore} hide={showRestQa}>
          展開全部 <img src={readMore} alt='read more' />
        </ReadMoreBtn>
      </Wrapper>
      <InView onChange={handleGaInview}>
        {({ ref, inView }) => (
          <QaGaAnchorWrapper ref={ref}>
            <QaGaAnchor ref={ref} />
            <QaGaAnchor />
          </QaGaAnchorWrapper>
        )}
      </InView>
    </Section>
  );
};

export default QaSectionMob;
