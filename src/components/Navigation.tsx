import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplet } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    /* bg-black/40 ko bg-white/10 (Frosted Glass) aur backdrop-blur-lg kar diya hai */
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform border border-white/30 shadow-md">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            {/* Logo text */}
            <span className="font-bold text-xl text-white drop-shadow-md" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Zarkhez
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-base font-medium transition-colors drop-shadow-md ${
                isActive('/') ? 'text-[#A5D6A7]' : 'text-white hover:text-[#A5D6A7]'
              }`}
            >
              Home
            </Link>
            <a
              href="/#features"
              className="text-base font-medium text-white hover:text-[#A5D6A7] transition-colors drop-shadow-md"
            >
              Features
            </a>
            <a
              href="/#pricing"
              className="text-base font-medium text-white hover:text-[#A5D6A7] transition-colors drop-shadow-md"
            >
              Pricing
            </a>
            <Link
              to="/contact"
              className={`text-base font-medium transition-colors drop-shadow-md ${
                isActive('/contact') ? 'text-[#A5D6A7]' : 'text-white hover:text-[#A5D6A7]'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://drive.google.com/file/d/1hv92ZqMLK9WQY48Yidl-MSUkOrg6egh3/view?usp=drivesdk" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#2E7D32] text-white rounded-xl font-medium hover:bg-[#1B5E20] hover:shadow-lg hover:-translate-y-0.5 transition-all border border-white/20 shadow-lg" 
            >
              Demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white drop-shadow-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Ise bhi Frosted Glass kar diya */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-white/10 backdrop-blur-lg rounded-b-2xl mt-2 px-4 shadow-xl">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-base font-medium text-white hover:text-[#A5D6A7] transition-colors drop-shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#features"
                className="text-base font-medium text-white hover:text-[#A5D6A7] transition-colors drop-shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-base font-medium text-white hover:text-[#A5D6A7] transition-colors drop-shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                to="/contact"
                className="text-base font-medium text-white hover:text-[#A5D6A7] transition-colors drop-shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <a 
                href="https://drive.google.com/file/d/1hv92ZqMLK9WQY48Yidl-MSUkOrg6egh3/view?usp=drivesdk" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#2E7D32] text-white rounded-xl font-medium text-center border border-white/20 shadow-md"
              >
                Demo
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}