import { useEffect, useState, Fragment } from 'react';

import Header from './components/Header'
import Cover from './components/Cover'
import Brief from './components/Brief'
import Article from './components/Article'
import Credit from './components/Credit'
import Related from './components/Related'
import Footer from './components/Footer'
import Loading from './components/Loading'

import { GlobalStyles } from './styles/GlobalStyles'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const duration = window.innerWidth < 768 ? 3000 : 1500
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ''
    }, duration)
  }, [])


  return (
    <Fragment>
      <GlobalStyles />
      <div className="App">
        {isLoading && <Loading />}
        <Header />
        <Cover />
        <Brief />
        <Article />
        <Credit />
        <Related />
        <Footer />
      </div>
    </Fragment>
  )
}

export default App
