import { Check, Sparkles } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    { name: 'Starter', price: '299', description: 'Perfect for small farms', features: ['Up to 5 motors', 'Basic AI insights', 'Admin dashboard access', 'Email support', 'Monthly reports', '99% uptime SLA'], highlighted: false },
    { name: 'Professional', price: '699', description: 'Most popular for medium farms', features: ['Up to 25 motors', 'Advanced AI predictions', 'Full admin control', 'Real-time analytics', 'Priority 24/7 support', 'Custom integrations', 'Mobile app access', '99.9% uptime SLA'], highlighted: true },
    { name: 'Enterprise', price: 'Custom', description: 'For large agricultural operations', features: ['Unlimited motors', 'Custom AI models', 'Dedicated admin panel', 'Advanced analytics suite', 'Dedicated support team', 'White-label options', 'API access', 'Custom SLA'], highlighted: false }
  ];

  return (
    <section id="pricing" className="py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      
      {/* Halka sa dark overlay taake cards aur text mazeed clear hon */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="container-custom relative w-full z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-bold mb-4 border border-white/20 backdrop-blur-md shadow-lg">
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight drop-shadow-md">
            Simple, Transparent <span className="text-[#A5D6A7]">Pricing</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 w-full max-w-2xl mx-auto drop-shadow-sm font-medium">
            Choose the perfect plan for your farm. All plans include our core AI-powered features.
          </p>
        </div>

        {/* Pricing Cards - Frosted Glass Style */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 backdrop-blur-lg flex flex-col ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#1B5E20]/80 to-[#2E7D32]/60 border-2 border-[#A5D6A7]/50 text-white shadow-2xl scale-100 md:scale-105 z-10'
                  : 'bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:border-white/30 text-white shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full text-sm font-bold shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-sm">
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-green-100' : 'text-gray-200'} font-medium`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-2">
                  {plan.price !== 'Custom' && (
                    <span className="text-lg font-bold text-green-300">$</span>
                  )}
                  <span className="text-5xl font-bold text-white drop-shadow-md">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className={`text-lg ${plan.highlighted ? 'text-green-200' : 'text-gray-300'} font-medium`}>/month</span>
                  )}
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? 'bg-white/20' : 'bg-white/10 border border-white/20'}`}>
                      <Check className="w-3.5 h-3.5 text-[#A5D6A7]" />
                    </div>
                    <span className="text-base font-medium text-gray-100">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${
                  plan.highlighted
                    ? 'bg-white text-[#1B5E20] hover:bg-gray-100 hover:-translate-y-0.5'
                    : 'bg-[#2E7D32]/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#1B5E20] hover:-translate-y-0.5'
                }`}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}