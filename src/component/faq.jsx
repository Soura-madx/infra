import React, { useState } from 'react';

const PRIMARY_BLUE = '#005596';
const ACCENT_ORANGE = '#f58025';

const faqs = [
  {
    question: 'What does Prarambh Infra do as a real estate marketing agency?',
    answer:
      'Prarambh Infra plans and runs end-to-end marketing for real estate projects, from positioning and creative strategy to performance campaigns and lead management for site visits and bookings.',
  },
  {
    question: 'How do you generate qualified leads for my project?',
    answer:
      'We use targeted Meta and Google ads, high-converting landing pages, and remarketing journeys, then filter enquiries through forms, call tracking, and CRM so your sales team speaks only with serious buyers.',
  },
  {
    question: 'What types of projects do you specialise in?',
    answer:
      'We focus on plotted developments, group housing, townships, and investment-led residential projects, tailoring campaigns for investors, end-users, and NRI buyers in your micro-market.',
  },
  {
    question: 'How will I track campaign performance?',
    answer:
      'You receive structured dashboards and weekly reports covering impressions, CPL, lead quality, and visit ratios, along with review calls to optimise budgets, creatives, and targeting.',
  },
  {
    question: 'Why should I choose Prarambh Infra over other agencies?',
    answer:
      'We work only in real estate, combine transparent reporting with performance-linked thinking, and coordinate closely with your sales team, giving you one accountable partner from launch to inventory closure.',
  },
];

export default function PrarambhFaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // first open

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="max-w-7xl mx-auto md:py-10 py-2">
      <h2
        className="text-2xl font-bold mb-6 px-2 "
        style={{ color: PRIMARY_BLUE }}
      >
        Frequently Asked Questions
      </h2>

      <div className="border border-slate-200 divide-y divide-slate-200 bg-white">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: PRIMARY_BLUE }}
                >
                  {item.question}
                </span>

                {/* Rotating icon */}
                <span
                  className={`ml-4 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold transition-transform duration-300`}
                  style={{
                    borderColor: isOpen ? ACCENT_ORANGE : PRIMARY_BLUE,
                    color: isOpen ? ACCENT_ORANGE : PRIMARY_BLUE,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ^
                </span>
              </button>

              {/* Animated content */}
              <div
                className={`px-6 text-sm text-slate-700 leading-relaxed transition-all duration-300 ease-out ${
                  isOpen
                    ? 'max-h-40 opacity-100 py-2'
                    : 'max-h-0 opacity-0 py-0 overflow-hidden'
                }`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
