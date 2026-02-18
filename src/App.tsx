import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import IndexPageComponent from './pages/IndexComponent/index.component'
import MainLayoutComponent from './layouts/MainLayoutComponent/MainLayout.component'
import AboutUsComponentPage from './pages/AboutUsPageComponent/AboutUsPageComponent.component'
import CreatingCVPageComponent from './pages/CreatingCVPageComponent/CreatingCVPageComponent.component'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<MainLayoutComponent/>}>
            <Route index element={<IndexPageComponent/>}/>
            <Route path='/aboutUs' element={<AboutUsComponentPage/>}/>
            <Route path='/creating-cv' element={<CreatingCVPageComponent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
