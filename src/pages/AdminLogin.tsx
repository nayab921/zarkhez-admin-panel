import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Leaf } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === "admin@zarkhez.com" && password === "admin123") {
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    /* Background ko transparent rakha taake kisan wali image nazar aaye */
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-transparent">
      
      <div className="w-full max-w-[550px] relative z-10">
        
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl mb-5 shadow-lg border border-white/20">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-md">Zarkhez</h1>
          <p className="text-base text-gray-100 font-medium drop-shadow-sm">Admin Control Center</p>
        </div>

        {/* Login Card - Updated to Frosted Glass */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-8 tracking-tight border-b border-white/10 pb-4">
            Sign In
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 text-red-100 text-sm font-medium rounded-xl border border-red-400/30 text-center backdrop-blur-md">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zarkhez.com"
                  className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-transparent transition-all text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2.5 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-transparent transition-all text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm font-bold text-[#A5D6A7] hover:text-white transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#2E7D32] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:bg-[#1B5E20] hover:-translate-y-0.5 active:scale-95 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Verifying...' : 'Login to Dashboard'}
            </button>
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center text-sm text-gray-300 font-medium mt-10 drop-shadow-md">
          © 2026 Zarkhez. Secured Admin Access.
        </p>
      </div>
    </div>
  );
}