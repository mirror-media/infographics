import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Intro from './views/intro';
import Catalog from './views/catalog';
import Comic from './views/comic';
// import CatalogHeader from './components/catalog-header';
import ComicHeader from './components/comic-header';
const BackgroundWrapper = styled.div`
  background: #f8f3e8;
`;

function App() {
  const [shouldShowCatalog, setShouldShowCatalog] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [shouldShowCatalog]);

  const changeView = (value) => {
    if (value) {
      setTimeout(() => setShouldShowCatalog(value), 500);
    }
  };

  return (
    <div className="App">
      {!shouldShowCatalog && <Intro changeView={changeView} />}

      {shouldShowCatalog && (
        <BackgroundWrapper>
          {/* <CatalogHeader /> */}
          <ComicHeader />
          <Catalog />
          <Comic />
        </BackgroundWrapper>
      )}
    </div>
  );
}

export default App;
