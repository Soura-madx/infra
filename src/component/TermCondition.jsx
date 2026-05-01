import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function TermsConditionsPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen mt-7 md:mt-3 bg-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-4xl font-extrabold text-center underline tracking-wide">
            MOST IMPORTANT TERM & CONDITION
          </h1>

          {/* Logo Placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
              <span className="text-xl font-bold text-blue-900">PI</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-800">PRARAMBH</h2>
              <p className="text-sm text-orange-500 font-semibold">INFRA</p>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold underline mb-4">
            प्रोजेक्ट सहायता (SUPPORT IN PROJECT):
          </h2>
          <ul className="space-y-3 list-disc pl-6 text-gray-800 leading-relaxed">
            <li>
              हर प्रोजेक्ट में सहायता के लिए पेम्फलेट / ब्रोशर / 3डी एल्स /
              एग्जीक्यूटिव के लिए प्रेजेंटेशन (PPT).
            </li>
            <li>
              वीडियो (एप्लायर के अनुसार) / एरिया मैप – A2 पेपर पर / साइट के
              साथ रेट चार्ट।
            </li>
            <li>
              प्रोजेक्ट विजिट के लिए Vehicle (यदि प्रोजेक्ट ऑफिस से 8–10 किमी
              दूर है तभी)
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold underline mb-4">
            टीम बनाने में सहायता (SUPPORT IN TEAM BUILDING):
          </h2>
          <ul className="space-y-3 list-disc pl-6 text-gray-800 leading-relaxed">
            <li>सुपरवाइजर और उससे ऊपर के लिए Advisor KIT.</li>
            <li>फील्ड और ऑफिस में सीनियर लीडर की सहायता.</li>
            <li>LEADER&apos;S ACADEMY प्रोग्राम (L2 से L6 तक लागू).</li>
            <li>व्यक्तिगत टीम मीटिंग / प्रशिक्षण के लिए ऑफिस में सुविधा.</li>
            <li>BOP (MASS) / Financial Awareness Program (Customer).</li>
            <li>Difference Income का भुगतान Director लेवल तक.</li>
            <li>
              सुपरवाइजर और उससे ऊपर के लीडर के लिए 2 घंटे की Daily Training
              and Meeting Program.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-bold underline mb-4">
            क्या करें और क्या ना करें (DO&apos;s and DON&apos;T):
          </h2>
          <ul className="space-y-3 list-disc pl-6 text-gray-800 leading-relaxed">
            <li>
              प्लॉट रजिस्ट्री न होने पर नाम परिवर्तन के लिए ₹10000 ट्रांसफर
              फीस लगेगी।
            </li>
            <li>
              DUMMY BUSINESS के मामले में कमीशन वसूली (Recovery) की जाएगी।
            </li>
            <li>Re-Sale Plot पर Difference कमीशन लागू नहीं होगा।</li>
            <li>
              किसी अन्य ग्रुप एजेंट मार्केटिंग कंपनी में कार्य करने वाले
              एडवाइजर को एजेंसी नहीं दी जाएगी।
            </li>
            <li>
              परिवार में एक से अधिक व्यक्ति की एजेंसी की अनुमति नहीं।
            </li>
            <li>Clean Business को पहली प्राथमिकता दी जाएगी।</li>
            <li>
              किसी भी एडवाइजर को कार्यालय में या कार्यालय के बाहर अन्य Team
              में हस्तक्षेप की अनुमति नहीं है।
            </li>
            <li>कार्यालय (OFFICE) में तंबाकू और सिगरेट की अनुमति नहीं है।</li>
            <li>
              Meeting / Training / Office में खराब या असभ्य बातचीत की स्थिति
              में एजेंसी तुरंत समाप्त कर दी जाएगी।
            </li>
            <li>
              एडवाइजर को ग्राहक से नकद (NO CASH) लेने का अधिकार नहीं है।
            </li>
          </ul>
        </section>

        {/* Footer Notice */}
        <div className="border-t pt-6">
          <p className="text-red-600 text-center font-bold text-base md:text-lg leading-relaxed">
            विशेष: संस्था द्वारा समय-समय पर ग्राहक के हित की रक्षा और
            एडवाइजर की प्रगति के लिए एजेंसी प्लान में परिवर्तन पूर्व जानकारी
            के संभव हैं।
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
