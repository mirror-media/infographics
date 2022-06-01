import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 25.2px;
  font-weight: 300;
  b {
    font-weight: 900;
  }

  @media (max-width: 812px) {
    font-size: 12px;
    line-height: 21.6px;
  }
`

const ArticleWrapper = styled.div`
  position: relative;
  padding: 136px 0 300px 0;
  margin: 0 auto;
  width: 640px;

  @media (max-width: 812px) {
    padding: 60px 166px 250px 166px;
    width: 100%;
  }
  @media (max-width: 568px) {
    padding: 80px 44px 250px 44px;
  }

`

const Credit = styled.div`
  position: absolute;
  left: calc((100% - 640px)/2);
  bottom: 40px;
  width: 640px;
  text-align: center;
  white-space: pre-wrap;

  @media (max-width: 812px) {
    width: unset;
    left: 166px;
    right: 166px;
  }
  @media (max-width: 568px) {
    width: unset;
    left: 44px;
    right: 44px;
  }

`

const ProfileImageWrapper = styled.div`
  margin: 36px auto;  
  width: 400px;

  @media (max-width: 812px) {
    margin: 40px auto;
  }
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
  ${({ lang }) => (lang === 'zh-TW') ? `
    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
  `: `
    font-weight: 900;
    font-size: 14px;
    line-height: 25.2px;
  `}
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
  ${({ lang }) => (lang === 'zh-TW') ? `
    font-size: 32px;
    line-height: 180%;
    margin-bottom: 19.2px;

    @media (max-width: 812px) {
      font-size: 20px;
      line-height: 36px;
    }
  
  ` : `
    font-weight: 900;
  `}
`

const Independent = styled.div`
  ${({ lang }) => (lang === 'zh-TW') ? `
    margin-bottom: 68px;
  ` : `
    margin-bottom: 25.2px;
  `}
`

const Text = styled.div`
  ${({ lang }) => (lang === 'zh-TW') ? `
    margin-bottom: 32px;
    &:last-of-type {
      margin-bottom: unset;
    }
  ` : ``}
`

export default function Ending({ id, image }) {
  const { t, i18n: { language } } = useTranslation()
  //en or zh-TW
  const [lang, setLang] = useState(language)

  useEffect(() => {
    setLang(language)
  }, [language])

  let EndingComponent
  if (lang === 'zh-TW') {
    EndingComponent = (
      <ArticleWrapper>
        <First>
          <NameWrapper>
            <Name lang={lang}>{t(`${id}.text.first.name`)}</Name>
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
          <Independent lang={lang}>{t(`${id}.text.second.first`)}</Independent>
          <Header lang={lang}>{t(`${id}.text.second.pairs.0.head`)}</Header>
          <Text lang={lang}>{t(`${id}.text.second.pairs.0.body`)}</Text>
          <Header lang={lang}>{t(`${id}.text.second.pairs.1.head`)}</Header>
          <Text lang={lang}>{t(`${id}.text.second.pairs.1.body`)}</Text>
          <Header lang={lang}>{t(`${id}.text.second.pairs.2.head`)}</Header>
          <Text lang={lang}>{t(`${id}.text.second.pairs.2.body`)}</Text>
        </Second>
        <Credit>{t(`${id}.text.credit`)}</Credit>
      </ArticleWrapper>
    )
  } else {
    EndingComponent = (
      <ArticleWrapper>
        <First>
          <NameWrapper>
            <Name lang={lang}>{t(`${id}.text.first.name`)}</Name>
            <IG href={t(`${id}.text.first.ig`)} target="_blank"><img src="images/ig.svg" alt="instagram link" /></IG>
          </NameWrapper>
          {t(`${id}.text.first.pairs.0.body`)}
          <div><b>{t(`${id}.text.first.pairs.1.head`)}</b></div>{t(`${id}.text.first.pairs.1.body`)}
          <div><b>{t(`${id}.text.first.pairs.2.head`)}</b></div>{t(`${id}.text.first.pairs.2.body`)}
          <div><b>{t(`${id}.text.first.pairs.3.head`)}</b></div>{t(`${id}.text.first.pairs.3.body`)}
          <div><b>{t(`${id}.text.first.pairs.4.head`)}</b></div>{t(`${id}.text.first.pairs.4.body`)}
        </First>
        <ProfileImageWrapper>
          <ProfileImage src={image} />
          <ProfileImageCaption>{t(`${id}.text.caption`)}</ProfileImageCaption>
        </ProfileImageWrapper>
        <Second>
          <Independent lang={lang}>{t(`${id}.text.second.first`)}</Independent>
          <Header lang={lang}>{t(`${id}.text.second.pairs.0.head`)}</Header>
          <Text lang={lang}>{t(`${id}.text.second.pairs.0.body`)}</Text>
          <Text lang={lang}>{t(`${id}.text.second.pairs.1.body`)}</Text>
          <Text lang={lang}>{t(`${id}.text.second.pairs.2.body`)}</Text>
          <Text lang={lang}>{t(`${id}.text.second.pairs.3.body`)}</Text>
          <Text lang={lang}>{t(`${id}.text.second.pairs.4.body`)}</Text>
          <Text lang={lang}>{t(`${id}.text.second.pairs.5.body`)}</Text>
        </Second>
        <Credit>{t(`${id}.text.credit`)}</Credit>
      </ArticleWrapper>
    )
  }


  return (
    <Wrapper>
      {EndingComponent}
    </Wrapper>
  )
}