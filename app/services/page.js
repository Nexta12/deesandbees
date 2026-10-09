import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Lightbulb,
  FileCheck2,
  Plane,
  Building2,
  BookOpenCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Our Services | Dees & Bees Global",
  description:
    "Explore our full suite of international study services: university admissions, visa guidance, pre-departure support, institutional partnerships, and career counseling.",
};

export default function ServicesPage() {
  const servicesList = [
    {
      icon: GraduationCap,
      title: "Student Recruitment & Admissions Support",
      description:
        "We help match your academic profile, budget, and future career objectives with top-tier universities and colleges across the UK, USA, Canada, Europe, and Australia.",
      features: [
        "Guidance in choosing the right schools, colleges, and universities.",
        "Comprehensive application preparation, editing, and submission support.",
        "Assistance with official academic transcripts, statements of purpose, and admission documentations.",
      ],
    },
    {
      icon: Lightbulb,
      title: "Career & Academic Counselling",
      description:
        "Navigating international higher education requires strategic planning. Our certified consultants provide personalized advisory to maximize your career trajectory.",
      features: [
        "One-to-one consultations to align personal passions with high-demand study disciplines.",
        "Advice on academic pathways, industry certifications, and future post-study work prospects.",
      ],
    },
    {
      icon: FileCheck2,
      title: "Visa Guidance & Compliance",
      description:
        "Securing your student visa is a vital milestone. We provide meticulous scrutiny to ensure compliance with UKVI and foreign embassy standards.",
      features: [
        "Step-by-step visa application forms and biometric booking support.",
        "Rigorous financial proof validation, document verification, and credibility interview preparation.",
        "Compliance guidance for international student visa conditions and work hour regulations.",
      ],
    },
    {
      icon: Plane,
      title: "Pre-Departure & Settlement Support",
      description:
        "Moving abroad is exciting but can feel overwhelming. We prepare you thoroughly so you arrive confident, settled, and ready to excel academically.",
      features: [
        "Comprehensive pre-departure orientations covering climate, cultural norms, and banking setup.",
        "Guidance in securing safe, affordable student housing (on-campus and verified private halls).",
        "Airport reception coordination, packing checklists, and ongoing pastoral welfare check-ins.",
      ],
    },
    {
      icon: Building2,
      title: "Partnerships & Institutional Collaboration",
      description:
        "We serve as trusted in-country representatives for world-renowned higher education institutions seeking qualified, diverse international candidates.",
      features: [
        "Building lasting, strategic recruitment relationships with universities, colleges, and pathway providers.",
        "Promoting global partner institutions to verified, academically motivated students.",
      ],
    },
    {
      icon: BookOpenCheck,
      title: "Training & Educational Workshops",
      description:
        "Empowering communities with essential knowledge about study abroad opportunities, scholarship applications, and global workplace dynamics.",
      features: [
        "Capacity-building sessions and informational seminars for students, parents, and secondary educators.",
        "Workshops on global employability skills, CV drafting, and international academic readiness.",
      ],
    },
  ];

  return (
    <div>
      {/* 1. Header Banner */}
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/sliders/s2.jpg"
            alt="Services at Dees and Bees"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>Comprehensive Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Our International Study Services
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Empowering students to achieve global education dreams — from initial university shortlisting to your arrival on campus, we are with you every step of the way.
          </p>
        </div>
      </section>

      {/* 2. Intro Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            End-to-End Guidance for Global Scholars
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            At <strong>Dees and Bees Global</strong>, we are passionate about connecting ambitious students with world-class education opportunities across the United Kingdom, Europe, United States, Canada, and Australia. We simplify the entire journey by offering expert guidance, tailored support, and trusted recruitment services that empower students to achieve their dreams.
          </p>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
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
            Start Your Global Education Journey Today
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Take the first step toward studying abroad with confidence — we’re here to guide you every step of the way.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-xl shadow-amber-500/25 transition-all text-base"
            >
              <span>Get in Touch with an Advisor</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
