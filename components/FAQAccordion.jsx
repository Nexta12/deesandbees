"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What does Dees and Bees Global Resources do?",
    answer:
      "Dees and Bees Global Resources is an international education recruitment organisation that connects students with top universities in UK, Europe, USA, Canada and Australia. We provide expert guidance on university admissions, visa applications, and study abroad preparation while supporting institutions with their strategic recruitment goals.",
  },
  {
    question: "Which countries do you recruit students from?",
    answer:
      "We currently recruit students from Africa, Asia, and other regions globally who are interested in studying in our target markets.",
  },
  {
    question: "Can you help me choose the right university and course?",
    answer:
      "Absolutely! Our experienced education advisors help you select a university and programme that best fits your academic background, budget, and career goals.",
  },
  {
    question: "Do you assist with student visa applications?",
    answer:
      "Yes. We provide comprehensive UK visa guidance and support throughout your application process to ensure compliance with UKVI requirements.",
  },
  {
    question: "What documents do I need to apply for a UK university?",
    answer:
      "Generally, you’ll need your academic documents and every other documents relevant to your application. We guide you through every step of document preparation and submission.",
  },
  {
    question: "Do you provide accommodation assistance?",
    answer:
      "We guide students in finding safe, affordable, and convenient accommodation options, either on-campus or off-campus.",
  },
  {
    question: "Do you support students after arrival in the UK?",
    answer:
      "Yes, we offer post-arrival support including airport pick-up guidance, orientation, and settling-in tips for international students.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Find answers to some of the most common questions students and parents ask about studying abroad with Dees and Bees Global.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-amber-600 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div
                    className={`p-1.5 rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-amber-500 text-slate-950" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
