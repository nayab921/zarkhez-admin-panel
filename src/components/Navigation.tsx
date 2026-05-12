import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Droplet hata diya kyunke ab logo lag raha hai
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-2xl border-b border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Updated Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo Image Container */}
            <div className="w-24 h-14 flex items-center justify-center relative">
              {/* Ye piche ek halka sa glow dega */}
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-75"></div>

              <img
                src="/logo.png"
                alt="Zarkhez Logo"
                className="relative z-10 w-full h-full object-contain brightness-125 contrast-125"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-base font-medium transition-colors drop-shadow-md ${
                isActive("/")
                  ? "text-[#A5D6A7]"
                  : "text-white hover:text-[#A5D6A7]"
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
                isActive("/contact")
                  ? "text-[#A5D6A7]"
                  : "text-white hover:text-[#A5D6A7]"
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

        {/* Mobile Menu */}
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
