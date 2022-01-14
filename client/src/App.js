import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import styles from './App.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import Collections from './components/collections'
import Collection from './components/collection'

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/collections" />} />
          <Route path="/collections" element={<Collections />} />
          <Route path='/collection/:collectionTitle' element={<Collection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;