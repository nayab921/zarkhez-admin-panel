import { Wifi, Cpu, Cloud, Brain, MonitorSmartphone, Smartphone } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    { icon: Wifi, title: 'Sensors', description: 'IoT sensors collect real-time data from motors and soil', color: 'from-blue-500 to-cyan-500' },
    { icon: Cpu, title: 'ESP32', description: 'Edge processing and secure data transmission', color: 'from-purple-500 to-pink-500' },
    { icon: Cloud, title: 'Cloud', description: 'Secure cloud infrastructure stores and processes data', color: 'from-green-500 to-emerald-500' },
    { icon: Brain, title: 'AI Engine', description: 'Machine learning models analyze and predict', color: 'from-orange-500 to-red-500' },
    { icon: MonitorSmartphone, title: 'Admin Control', description: 'Centralized dashboard for complete system management', color: 'from-indigo-500 to-purple-500' },
    { icon: Smartphone, title: 'Farmer App', description: 'Mobile app for on-the-go monitoring and control', color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <section className="py-24 bg-transparent border-t border-b border-white/10">
      <div className="container-custom">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-bold mb-4 border border-white/20 shadow-lg">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            From Sensors to <span className="text-[#A5D6A7]">Smart Decisions</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 w-full max-w-2xl mx-auto drop-shadow-md font-medium">
            A seamless flow of data intelligence that transforms traditional farming.
          </p>
        </div>

        {/* Desktop View - Frosted Glass Container */}
        <div className="hidden lg:block relative max-w-6xl mx-auto bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 shadow-2xl">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-white/30 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 group">
                <div className="flex flex-col items-center mb-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 relative z-10 border border-white/30`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-center px-2">
                  <h4 className="font-bold text-white mb-2 text-lg drop-shadow-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-200 font-medium leading-snug drop-shadow-sm">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-10 -right-4 z-20 -translate-y-1/2">
                    <svg className="w-6 h-6 text-white/80 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Frosted Glass Cards */}
        <div className="lg:hidden space-y-6 max-w-md mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative flex gap-6 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl hover:bg-white/20 transition-all">
              <div className="flex-shrink-0 relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg border border-white/30`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-bold text-white mb-1 text-xl drop-shadow-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{step.title}</h4>
                <p className="text-gray-200 font-medium text-sm drop-shadow-sm">{step.description}</p>
              </div>
              {/* Connecting line for mobile */}
              {index < steps.length - 1 && (
                <div className="absolute left-[3.25rem] top-24 bottom-[-1.5rem] w-0.5 -ml-px bg-white/30 z-0" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}