import Navbar from './Navbar'
import Footer from './Footer'
import Seo from './Seo'

function Layout({ children }) {
  return (
    <div>
      <Seo />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
