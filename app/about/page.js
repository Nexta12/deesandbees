import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  Award,
  Users,
  Lightbulb,
  HeartHandshake,
  Globe,
  ArrowRight,
  Eye,
  Target,
} from "lucide-react";

export const metadata = {
  title: "About Us & Core Values | Dees & Bees Global",
  description:
    "Learn about Dees & Bees Global Resources, our vision, mission, and the 6 core values guiding our international student recruitment and university placements.",
};

export default function AboutPage() {
  const coreValues = [
    {
      icon: Scale,
      title: "Integrity",
      description:
        "We uphold honesty, transparency, and ethical practices in all engagements with students, parents, and partner institutions.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We deliver outstanding recruitment services, ensuring students achieve the highest standards in their educational journey.",
    },
    {
      icon: Users,
      title: "Inclusiveness",
      description:
        "We celebrate diversity and promote equal access to educational opportunities for students from all backgrounds.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace creativity and technology-driven solutions to provide modern, efficient, and tailored recruitment services.",
    },
    {
      icon: HeartHandshake,
      title: "Student-Centeredness",
      description:
        "We place the aspirations, growth, and success of every student at the heart of what we do.",
    },
    {
      icon: Globe,
      title: "Global Responsibility",
      description:
        "We nurture future leaders who will positively impact their communities and contribute to a better, interconnected world.",
    },
  ];

  return (
    <div>
      {/* 1. Header Banner */}
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/sliders/b5.jpg"
            alt="About Dees and Bees"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>About Dees & Bees Global</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Bridging Dreams to World-Class Education
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Empowering students to reach global academic excellence. Connecting ambitious learners to prestigious universities across the UK, US, Canada, Europe, and Australia.
          </p>
        </div>
      </section>

      {/* 2. Vision & Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
              Our Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Vision & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/80 hover:shadow-xl transition-all duration-300 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Vision Statement</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                To be a leading bridge between ambitious students and world-class educational opportunities in the United Kingdom, Europe, United States, Canada and Australia, empowering future leaders to achieve academic excellence and global success.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/80 hover:shadow-xl transition-all duration-300 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Mission Statement</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                At Dees and Bees, we are committed to guiding students through every step of their international education journey. We provide trusted recruitment services, expert counselling, and dedicated support to ensure students access quality schools and universities abroad. With integrity, innovation, and passion, we connect learners to opportunities that shape brighter futures and contribute to global communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-600 text-base">
              The ethical compass that guides every student interaction, university partnership, and strategic advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">{val.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-24 bg-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Join Our Global Education Network
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Let’s help you take the next big step in your academic journey — discover, apply, and thrive abroad.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-xl shadow-amber-500/25 transition-all text-base"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
