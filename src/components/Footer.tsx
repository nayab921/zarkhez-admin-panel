import { Link } from 'react-router-dom';
import { Droplet, Mail, MapPin, Phone, Linkedin, Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    /* bg-gray-900 ko hata kar bg-white/10 (Frosted Glass) aur backdrop-blur kar diya */
    <footer className="bg-white/10 backdrop-blur-lg border-t border-white/20 text-gray-200 relative z-10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white drop-shadow-md" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Zarkhez
              </span>
            </div>
            <p className="text-sm mb-6 text-gray-200 font-medium leading-relaxed">
              AI-powered smart irrigation and motor control system for modern agriculture.
            </p>
            {/* Social Icons Updated */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2E7D32] transition-all border border-white/10 hover:scale-110 shadow-md">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2E7D32] transition-all border border-white/10 hover:scale-110 shadow-md">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2E7D32] transition-all border border-white/10 hover:scale-110 shadow-md">
                <Github className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg drop-shadow-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Product
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#features" className="text-gray-300 hover:text-[#A5D6A7] transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-[#A5D6A7] transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#A5D6A7] transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#A5D6A7] transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg drop-shadow-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Company
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-gray-300 hover:text-[#A5D6A7] transition-colors">About Us</a></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-[#A5D6A7] transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-[#A5D6A7] transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg drop-shadow-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Contact
            </h4>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                   <Mail className="w-4 h-4 text-[#A5D6A7]" />
                </div>
                <span>zarkhez@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                   <Phone className="w-4 h-4 text-[#A5D6A7]" />
                </div>
                <span>0308-1124205</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 mt-1">
                   <MapPin className="w-4 h-4 text-[#A5D6A7]" />
                </div>
                <span>COMSATS UNIVERSITY<br />WAH CAMPUS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400">
          <p className="tracking-wide text-gray-300">&copy; 2026 ZARKHEZ. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}