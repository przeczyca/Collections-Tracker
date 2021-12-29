import React from 'react'
import styles from './App.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import Collections from './components/collections';

function App() {
  return (
    <div className={styles.App}>
      <Collections/>
    </div>
  );
}

export default App;