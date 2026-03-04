// src/app/components/sections/Impact.tsx

import { Star, TrendingUp, Award } from 'lucide-react'
import FadeInSection from '../FadeInSection'

const impactData = [
  { icon: <Star className="h-12 w-12 mx-auto mb-4" />, stat: "700+", label: "Teachers Trained" },
  { icon: <TrendingUp className="h-12 w-12 mx-auto mb-4" />, stat: "30%", label: "Increase in Student Performance" },
  { icon: <Award className="h-12 w-12 mx-auto mb-4" />, stat: "50+", label: "Partner Schools" },
]

export default function Impact() {
  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        </FadeInSection>
        <div className="grid md:grid-cols-3 gap-8">
          {impactData.map((impact, index) => (
            <FadeInSection key={index}>
              <div className="text-center">
                {impact.icon}
                <h3 className="text-2xl font-bold mb-2">{impact.stat}</h3>
                <p>{impact.label}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
