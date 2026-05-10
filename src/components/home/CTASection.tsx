import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-transparent border-t border-white/10">
      <div className="container-custom text-center w-full">
        
        {/* Yahan bg-black/40 ko badal kar bg-white/10 (Frosted Glass) kar diya gaya hai */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          
          {/* Halka sa glow effect box ke andar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Ready to Modernize Your Farm?
          </h2>
          
          <p className="text-lg sm:text-xl mb-10 w-full max-w-2xl mx-auto text-gray-100 font-medium drop-shadow-md relative z-10">
            Join hundreds of progressive farmers who are saving water and protecting their motors with Zarkhez.
          </p>
          
          {/* Button ko green kar diya hai taake milky glass par pyara lagay */}
          <a 
            href="https://drive.google.com/file/d/1hv92ZqMLK9WQY48Yidl-MSUkOrg6egh3/view?usp=drivesdk" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#2E7D32] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#1B5E20] hover:shadow-2xl hover:-translate-y-1 transition-all mx-auto border border-white/20 shadow-lg w-fit min-h-[60px] relative z-10"
          >
            Watch Free Demo <ArrowRight className="w-6 h-6" />
          </a>
          
        </div>
      </div>
    </section>
  );
}