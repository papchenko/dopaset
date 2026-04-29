import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";

import { useAppSelector } from "../../store/hooks";
import { FaBars, FaShoppingCart } from "react-icons/fa";

import CartDrawer from "../cart/CartDrawer";

import { useAuth } from "../../context/AuthContext";
import AuthModal from "../auth/AuthModal";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile } = useAuth();
  
  const avatar = profile?.avatarUrl || null;
  const [authOpen, setAuthOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const items = useAppSelector(state => state.cart.items);

const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-[70px]">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} className="h-9" />
            <span className="text-white font-semibold text-lg tracking-wide">
              Dopaset
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
 
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            {/* <Link
              to="/premium"
              className="text-gray-300 hover:text-white transition"
            >
              Premium
            </Link> */}
            <Link
              to="/about"
              className="text-gray-300 hover:text-white transition"
            >
              About
            </Link>
                       <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
  <FaShoppingCart className="text-white text-2xl" />

  {totalCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-2 py-[2px] rounded-full">
      {totalCount}
    </span>
  )}
</div>
              {user ? (
                <Link to="/profile" className="flex items-center gap-2">
                  {avatar ? (
                    <img
                      src={avatar}
                      className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {profile?.nickname?.[0]?.toUpperCase()}
                    </div>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Sign Up
                </button>
              )}
          </nav>

          {/* MOBILE BURGER */}
<div className="lg:hidden flex items-center gap-5">
  {/* CART */}
  <div
    className="relative cursor-pointer"
    onClick={() => setCartOpen(true)}
  >
    <FaShoppingCart className="text-white text-2xl" />

    {totalCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-2 py-[2px] rounded-full">
        {totalCount}
      </span>
    )}
  </div>

  {/* AUTH / PROFILE */}
  {user ? (
    <Link to="/profile">
      {avatar ? (
        <img
          src={avatar}
          className="w-7 h-7 rounded-full object-cover border border-zinc-700"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
          {profile?.nickname?.[0]?.toUpperCase()}
        </div>
      )}
    </Link>
  ) : (
    <button
      onClick={() => setAuthOpen(true)}
      className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm"
    >
      Sign Up
    </button>
  )}

  {/* BURGER */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="text-white text-2xl"
  >
    <FaBars />
  </button>
</div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-slate-900 border-t border-slate-800`}
      >
        <div className="flex flex-col p-6 gap-4">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>

        </div>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Nav;