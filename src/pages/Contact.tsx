import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    /* Poora page ab transparent hai taake main background image nazar aaye */
    <div className="min-h-screen bg-transparent py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Get in <span className="text-[#A5D6A7]">Touch</span>
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-md">
            Ready to upgrade your farm? Have questions about our AI technology? Our team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            {/* Contact Info Card - Ab ye transparent glass hai */}
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Contact Information
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-[#A5D6A7] transition-all">
                    <Mail className="w-6 h-6 text-[#A5D6A7] group-hover:text-[#1B5E20]" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Email Us</p>
                    <p className="text-gray-200">Zarkhez@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-[#A5D6A7] transition-all">
                    <Phone className="w-6 h-6 text-[#A5D6A7] group-hover:text-[#1B5E20]" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Call Us</p>
                    <p className="text-gray-200">+92 308 1124205</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-[#A5D6A7] transition-all">
                    <MapPin className="w-6 h-6 text-[#A5D6A7] group-hover:text-[#1B5E20]" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Headquarters</p>
                    <p className="text-gray-200">COMSATS WAH, ISLAMABAD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card - Ab ye bhi transparent glass hai */}
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#A5D6A7] outline-none transition-all" 
                  placeholder="Ali Khan" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#A5D6A7] outline-none transition-all" 
                  placeholder="ali@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#A5D6A7] outline-none resize-none transition-all" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button className="w-full py-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg">
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}