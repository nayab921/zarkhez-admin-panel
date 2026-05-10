import { AlertTriangle, Droplets, TrendingDown, Clock } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    { icon: Droplets, title: 'Water Wastage', description: 'Inefficient irrigation leads to massive water loss' },
    { icon: AlertTriangle, title: 'Motor Burnouts', description: 'Unprotected motors face frequent failures' },
    { icon: TrendingDown, title: 'No Real Monitoring', description: 'Lack of visibility into system performance' },
    { icon: Clock, title: 'Manual Guesswork', description: 'Time-consuming manual intervention required' }
  ];

  return (
    <section className="py-24 bg-transparent border-t border-b border-white/10">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight drop-shadow-md">
            Traditional Irrigation is <span className="text-red-400">Risky.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 w-full max-w-2xl mx-auto drop-shadow-md font-medium">
            Farmers lose thousands annually due to inefficient water management and motor failures.
          </p>
        </div>

        {/* Premium Frosted Glass Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/20 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 border border-red-400/30 shadow-inner">
                <problem.icon className="w-7 h-7 text-red-300" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-white drop-shadow-sm">
                {problem.title}
              </h4>
              <p className="text-gray-200 text-base font-medium">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Section - Frosted Glass */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="inline-block px-4 py-1.5 bg-red-500/20 text-red-200 rounded-full text-sm font-bold mb-6 border border-red-400/30">
              Traditional Method
            </div>
            <ul className="space-y-4">
              {[
                'Manual monitoring required', 'Unpredictable motor failures', 'High water wastage (30-50%)',
                'No data insights', 'Reactive maintenance', 'Limited scalability'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-400/30">
                    <span className="text-red-200 text-xs font-bold">✕</span>
                  </div>
                  <span className="text-gray-100 font-medium drop-shadow-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Zarkhez Solution Card - Slight Greenish Frosted Glass */}
          <div className="bg-[#1B5E20]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#A5D6A7]/30 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#A5D6A7]/20 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-block px-4 py-1.5 bg-[#2E7D32]/80 text-white rounded-full text-sm font-bold mb-6 border border-[#A5D6A7]/50 shadow-lg">
                Zarkhez Solution
              </div>
              <ul className="space-y-4">
                {[
                  'Automated 24/7 monitoring', 'AI-powered motor protection', 'Save 40-50% water',
                  'Real-time analytics dashboard', 'Predictive maintenance alerts', 'Infinitely scalable'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#2E7D32]/80 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#A5D6A7]/50 shadow-md">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-white font-bold drop-shadow-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}