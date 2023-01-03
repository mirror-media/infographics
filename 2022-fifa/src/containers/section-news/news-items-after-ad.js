import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  CardWrapper,
  ImgWrapper,
  Link,
  TextWrapper,
  TitleWrapper,
} from '../../components/news-card';

const NewsItemsAfterAd = ({ newsItems, loadMore }) => {
  // handle loadmore
  const [showingCount, setShowingCount] = useState(12);

  useEffect(() => {
    if (loadMore) {
      setShowingCount((showingCount) => showingCount + 3);
    }
  }, [loadMore]);

  return newsItems?.slice(12, showingCount)?.map((item) => {
    return (
      <Link
        href={`https://www.mirrormedia.mg/story/${item?.slug}`}
        target='_blank'
        rel='noreferrer'
        key={item._id}
      >
        <CardWrapper>
          <ImgWrapper>
            <img
              src={`${item?.heroImage?.image?.resizedTargets?.mobile?.url}`}
              alt={`${item?.title}`}
            />
          </ImgWrapper>
          <TextWrapper>
            <TitleWrapper>
              <p className='title'>{item?.title}</p>
            </TitleWrapper>
            <p className='date'>
              {dayjs(item?.publishedDate).format('YYYY/MM/DD HH:mm')}
            </p>
          </TextWrapper>
        </CardWrapper>
      </Link>
    );
  });
};

export default NewsItemsAfterAd;
