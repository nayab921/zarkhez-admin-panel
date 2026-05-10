import { ArrowRight, Cpu, Zap, Activity } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-transparent">
      
      {/* YAHAN SE SOLID GREEN AUR IMAGE HATA DI HAI TAAKE GLOBAL BACKGROUND NAZAR AAYE */}

      {/* Halke Gradient Orbs (Tech Look ke liye) */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#2E7D32] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="pt-10 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/20 mb-6 text-white shadow-lg">
              <Zap className="w-4 h-4 text-[#81C784]" />
              <span className="text-sm font-medium text-white">AI-Powered AgriTech</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-md"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Intelligent Irrigation.
              <br />
              <span className="text-[#A5D6A7]">Zero Guesswork.</span>
            </h1>

            <p className="text-lg sm:text-xl w-full max-w-xl mb-10 leading-relaxed text-gray-100 drop-shadow-md font-medium">
              AI-powered motor protection and smart water management built for
              modern agriculture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12">
              <a
                href="https://www.mediafire.com/file/c797swyt5pmetqm/Zarkhez_app.apk/file"
                download="Zarkhez_app.apk"
                className="px-8 py-4 bg-white text-[#1B5E20] rounded-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Download APK
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                  <Cpu className="w-6 h-6 text-[#81C784]" />
                </div>
                <div>
                  <p className="text-sm text-gray-200 m-0 leading-tight">IoT Enabled</p>
                  <p className="font-semibold text-white m-0 leading-tight drop-shadow-sm">ESP32 Powered</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                  <Activity className="w-6 h-6 text-[#81C784]" />
                </div>
                <div>
                  <p className="text-sm text-gray-200 m-0 leading-tight">Real-Time</p>
                  <p className="font-semibold text-white m-0 leading-tight drop-shadow-sm">24/7 Monitoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Mockup updated for transparency */}
          <div className="relative hidden lg:block">
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              
              {/* Glass Mockup Frame */}
              <div className="relative bg-black/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl transform rotate-2">
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-inner border border-white/10">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBtb2NrdXAlMjBhbmFseXRpY3MlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcwOTY2MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Dashboard mockup"
                    className="w-full h-auto opacity-95"
                  />
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -left-8 top-1/4 bg-black/60 backdrop-blur-md rounded-2xl p-5 shadow-xl transform hover:-translate-y-2 transition-transform border border-white/20">
                <p className="text-sm font-medium text-gray-300 mb-1">Water Saved</p>
                <p className="text-3xl font-bold text-[#A5D6A7]">45%</p>
              </div>
              <div className="absolute -right-8 bottom-1/4 bg-black/60 backdrop-blur-md rounded-2xl p-5 shadow-xl transform hover:-translate-y-2 transition-transform border border-white/20">
                <p className="text-sm font-medium text-gray-300 mb-1">Active Motors</p>
                <p className="text-3xl font-bold text-[#A5D6A7]">24</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}