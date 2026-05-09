
import Header from './components/Header'
import Footer from './components/footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/Scroll'
import { Suspense } from 'react'

function App() {
    
 return (
     <>
    <ScrollToTop/>
     <Header />
     <Suspense fallback={<div>Loading...</div>}>
        <Outlet />   {/* lazy pages */}
      </Suspense> 
     <Footer />
     
 </>
 )
}

export default App
