import { Shield, Brain, Bell, Gauge, Network, Zap } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    { icon: Shield, title: 'Smart Motor Protection', description: 'Advanced algorithms detect anomalies and prevent motor burnout before it happens.', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Brain, title: 'AI Irrigation Intelligence', description: 'Machine learning optimizes water usage based on soil conditions and weather patterns.', gradient: 'from-purple-500 to-pink-500' },
    { icon: Bell, title: 'Predictive Maintenance', description: 'Get alerted before issues occur with intelligent predictive analytics.', gradient: 'from-orange-500 to-red-500' },
    { icon: Gauge, title: 'Energy Monitoring', description: 'Track power consumption in real-time and reduce electricity costs.', gradient: 'from-green-500 to-emerald-500' },
    { icon: Network, title: 'Multi-Device Management', description: 'Control and monitor unlimited motors and sensors from a single dashboard.', gradient: 'from-indigo-500 to-purple-500' },
    { icon: Zap, title: 'Real-Time Fault Alerts', description: 'Instant notifications via SMS and app for any system anomalies.', gradient: 'from-yellow-500 to-orange-500' }
  ];

  return (
    /* Background transparent rakha hai taake image nazar aaye */
    <section id="features" className="py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      
      <div className="container-custom relative z-10 w-full">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Frosted badge */}
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-bold mb-4 border border-white/20 shadow-lg">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight drop-shadow-md">
            Everything You Need to <br className="hidden sm:block" />
            <span className="text-[#A5D6A7]">Transform Your Farm</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 w-full max-w-2xl mx-auto drop-shadow-md font-medium">
            Powerful features designed to make irrigation intelligent, efficient, and completely autonomous.
          </p>
        </div>

        {/* Feature Cards - Frosted Glass Effect Apply kiya hai */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-lg">
              
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                {/* Glow effect behind icon */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
              </div>
              
              <h4 className="text-xl font-bold mb-3 text-white drop-shadow-sm">
                {feature.title}
              </h4>
              {/* Text color changed to gray-200 for better readability on frosted glass */}
              <p className="text-gray-200 text-base leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats Section - Frosted Glass Effect */}
        <div className="grid sm:grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/20 bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#A5D6A7] mb-2 drop-shadow-md">45%</div>
            <p className="text-white font-medium drop-shadow-sm">Average Water Savings</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#A5D6A7] mb-2 drop-shadow-md">99.9%</div>
            <p className="text-white font-medium drop-shadow-sm">System Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#A5D6A7] mb-2 drop-shadow-md">24/7</div>
            <p className="text-white font-medium drop-shadow-sm">Real-Time Monitoring</p>
          </div>
        </div>

      </div>
    </section>
  );
}