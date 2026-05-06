
import Header from './components/Header'
import Footer from './components/footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/Scroll'
import { SearchProvider } from './context/SearchContext'


function App() {
    
 return (
     <>
<SearchProvider>
    <ScrollToTop/>
     <Header />
     <Outlet/>
     <Footer />
</SearchProvider>
     
 </>
 )
}

export default App
