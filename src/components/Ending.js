import { useTranslation } from "react-i18next"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 25.2px;
  font-weight: 300;
`

const ArticleWrapper = styled.div`
  position: relative;
  padding: 136px 26.8% 300px 28.6%;
`

const Credit = styled.div`
  position: absolute;
  left: calc((100% - 640px)/2);
  bottom: 40px;
  width: 640px;
  text-align: center;
  white-space: pre-wrap;
`

const ProfileImageWrapper = styled.div`
  margin: 36px auto;  
  width: 400px;
`
const ProfileImage = styled.img`
  width: 100%
`
const ProfileImageCaption = styled.div`
  width: 100%;
  font-weight: 300;
  line-height: 21.6px;
  text-align: right;
`

const First = styled.div`
  white-space: pre-wrap;
  text-align: center;
`

const NameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Name = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 36px;
`

const IG = styled.a`
  display: block;
  width: 20px;
  height: 20px;
  margin-left: 8px;
  img {
    width: 100%;
    height: 100%;
  }
`

const Second = styled.div`
  white-space: pre-wrap;
  text-align: left;
`

const Header = styled.div`
  font-size: 32px;
  line-height: 180%;
  margin-bottom: 19.2px;
`

const Independent = styled.div`
  margin-bottom: 68px;
`

const Text = styled.div`
  margin-bottom: 32px;

  &:last-of-type {
    margin-bottom: unset;
  }
`

export default function Ending({ id, image }) {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <ArticleWrapper>
        <First>
          <NameWrapper>
            <Name>{t(`${id}.text.first.name`)}</Name>
            <IG href={t(`${id}.text.first.ig`)} target="_blank"><img src="images/ig.svg" alt="instagram link" /></IG>
          </NameWrapper>
          <b>{t(`${id}.text.first.pairs.0.head`)}</b>{t(`${id}.text.first.pairs.0.body`)}
          <b>{t(`${id}.text.first.pairs.1.head`)}</b>{t(`${id}.text.first.pairs.1.body`)}
          <b>{t(`${id}.text.first.pairs.2.head`)}</b>{t(`${id}.text.first.pairs.2.body`)}
          <b>{t(`${id}.text.first.pairs.3.head`)}</b>{t(`${id}.text.first.pairs.3.body`)}
          <b>{t(`${id}.text.first.pairs.4.head`)}</b>{t(`${id}.text.first.pairs.4.body`)}
        </First>
        <ProfileImageWrapper>
          <ProfileImage src={image} />
          <ProfileImageCaption>{t(`${id}.text.caption`)}</ProfileImageCaption>
        </ProfileImageWrapper>
        <Second>
          <Independent>{t(`${id}.text.second.first`)}</Independent>
          <Header>{t(`${id}.text.second.pairs.0.head`)}</Header>
          <Text>{t(`${id}.text.second.pairs.0.body`)}</Text>
          <Header>{t(`${id}.text.second.pairs.1.head`)}</Header>
          <Text>{t(`${id}.text.second.pairs.1.body`)}</Text>
          <Header>{t(`${id}.text.second.pairs.2.head`)}</Header>
          <Text>{t(`${id}.text.second.pairs.2.body`)}</Text>
        </Second>
        <Credit>{t(`${id}.text.credit`)}</Credit>
      </ArticleWrapper>
    </Wrapper>
  )
}