import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Sparkles, Utensils, Compass, HeartHandshake, Users } from 'lucide-react';

export const DiningExperience: React.FC = () => {
  const { t } = useRestaurant();

  const pillars = [
    {
      icon: <Utensils className="w-6 h-6 text-[#c5a059]" />,
      title: t.experience.pillar1Title,
      desc: t.experience.pillar1Desc,
      tag: '01 / Heritage'
    },
    {
      icon: <Compass className="w-6 h-6 text-[#c5a059]" />,
      title: t.experience.pillar2Title,
      desc: t.experience.pillar2Desc,
      tag: '02 / Gastronomy'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#c5a059]" />,
      title: t.experience.pillar3Title,
      desc: t.experience.pillar3Desc,
      tag: '03 / Karam'
    },
    {
      icon: <Users className="w-6 h-6 text-[#c5a059]" />,
      title: t.experience.pillar4Title,
      desc: t.experience.pillar4Desc,
      tag: '04 / Exclusivity'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#101013] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#c5a059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.experience.kicker}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.experience.headline}
          </h2>

          <div className="w-16 h-0.5 bg-[#c5a059]/60 mx-auto my-4" />

          <p className="text-sm sm:text-base text-[#a89f8f] font-light leading-relaxed">
            {t.experience.subheadline}
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group relative bg-[#15151a] hover:bg-[#191921] border border-white/5 hover:border-[#c5a059]/30 rounded-2xl p-7 transition-all duration-300 shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Subtle top indicator */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#c5a059]/10 group-hover:border-[#c5a059]/30 transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-[#7a7263]">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#c5a059] transition-colors mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#b2a99a] font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom decorative accent line */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#736b5d]">
                <span>Sultanate of Oman</span>
                <span className="w-2 h-2 rounded-full bg-[#c5a059]/40 group-hover:bg-[#c5a059] transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
