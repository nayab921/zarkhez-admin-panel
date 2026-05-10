import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    { name: 'Wafa Zainab', role: 'Manager', content: 'Zarkhez transformed our irrigation system completely. We\'ve saved 45% on water costs.', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh' },
    { name: 'Sana Ullah', role: 'Farm Owner', content: 'The AI predictions are incredibly accurate. We plan our schedule with complete confidence.', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    { name: 'Arhama', role: 'Cooperate Employee', content: 'Managing 50+ motors across farms was a nightmare. Zarkhez made it effortless. Thanks to the Creators', rating: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' }
  ];

  return (
    <section className="py-24 bg-transparent border-t border-white/10">
      <div className="container-custom w-full">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-bold mb-4 border border-white/20 backdrop-blur-md shadow-lg">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Trusted by <span className="text-[#A5D6A7]">Progressive Farmers</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 w-full max-w-2xl mx-auto drop-shadow-md font-medium">
            See how Zarkhez is helping farmers save water, reduce costs, and increase efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            /* Frosted Glass Effect (bg-white/10 + backdrop-blur-lg) */
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 relative border border-white/20">
              
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                <Quote className="w-6 h-6 text-white/50" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                ))}
              </div>
              
              <p className="text-gray-100 text-lg mb-8 leading-relaxed italic drop-shadow-sm font-medium">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/20 pt-6">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full bg-white/20 border border-white/30" />
                <div>
                  <p className="font-bold text-white drop-shadow-sm">{testimonial.name}</p>
                  <p className="text-sm text-gray-300 font-medium">{testimonial.role}</p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}