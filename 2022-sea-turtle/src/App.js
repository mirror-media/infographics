import { useState } from 'react';
import './App.css';
import Intro from './views/intro';
import Catalog from './views/catalog';

function App() {
  const [shouldShowCatalog, setShouldShowCatalog] = useState(false);

  const changeView = (value) => {
    if (value) {
      setShouldShowCatalog(value);
    }
  };
  return (
    <div className="App">
      {!shouldShowCatalog && <Intro changeView={changeView} />}
      {shouldShowCatalog && <Catalog />}
    </div>
  );
}

export default App;
