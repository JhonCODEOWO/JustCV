import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPageComponent from './pages/IndexComponent/index.component'
import MainLayoutComponent from './layouts/MainLayoutComponent/MainLayout.component'
import AboutUsComponentPage from './pages/AboutUsPageComponent/AboutUsPageComponent.component'
import CreatingCVPageComponent from './pages/CreatingCVPageComponent/CreatingCVPageComponent.component'
import ListCvComponentPage from './CV/pages/ListCvComponentPage.component'
import CvsProviderComponent from './CV/contexts/CvsContext/wrappers/CvsProviderComponent.component'
import AppProvidersComponent from './wrappers/AppProviders.component'

function App() {
  return (
    <BrowserRouter>
    {/* Providers globales */}
      <AppProvidersComponent>
        <Routes>
          <Route path='' element={<MainLayoutComponent/>}>
              <Route index element={<IndexPageComponent/>}/>
              <Route path='/aboutUs' element={<AboutUsComponentPage/>}/>
              {/* Provider of cvs */}
              <Route element={<CvsProviderComponent/>}>
                <Route path='/creating-cv' element={<CreatingCVPageComponent/>}/>
                <Route path='/home' element={<ListCvComponentPage/>}/>
              </Route>
          </Route>
        </Routes>
      </AppProvidersComponent>
    </BrowserRouter>
  )
}

export default App
