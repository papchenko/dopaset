import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Preloader from "./components/preloader/Preloader";
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Hero from './pages/home/hero/Hero';
import Shop from './pages/home/shop/Shop';
import CheckoutPayment from "./pages/checkout/CheckoutPayment";
import About from './pages/about/About';
import Premium from './pages/premium/Premium';
import Profile from './pages/profile/Profile';
import PrivateRoute from "./routes/PrivateRoute";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminRoute from "./routes/AdminRoute";
import PremiumCheckout from "./pages/premium/PremiumCheckout";
import DopasetCore from './core/dopa/DopasetCore';

import CookieBanner from "./pages/legal/CookieBanner";
import Cookies from "./pages/legal/Cookies";
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";

import './App.css';

const Home = () => {
  return (
    <>
      <Hero />
      <Shop />
    </>
  );
};


const App = () => {
  return (
    <>
    <Router>
      <Preloader />
      <div className="flex flex-col min-h-screen">
        
        <Nav />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/info" element={<About />} />
            <Route path="/shop-orders" element={<CheckoutPayment />} />
            <Route path="/premium-checkout" element={<PremiumCheckout />} />
            <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute> } />
            <Route path="/shop-orders" element={ <PrivateRoute> <CheckoutPayment /> </PrivateRoute> } />
            <Route path="/admin" element={ <AdminRoute> <AdminPanel /> </AdminRoute> } />
            <Route path="/dopaset" element={<DopasetCore />} />

            <Route path="/cookies" element={<Cookies />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        <Footer />

        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          icon={false}
          hideProgressBar={true}
        />
      </div>
      <CookieBanner />
    </Router>
    </>
  );
};

export default App;