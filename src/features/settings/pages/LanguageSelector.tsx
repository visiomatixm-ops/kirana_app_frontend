import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";

interface LanguageSelectorProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function LanguageSelector({ onClose, activeScreen, onNavigate }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    "English",
    "हिन्दी",
    "मराठी",
    "ગુજરાતી",
    "বাংলা",
    "తెలుగు",
    "தமிழ்",
    "ಕನ್ನಡ",
    "മലയാളം",
    "অসমীয়া",
    "اردو",
    "कोंकणी",
    "नेपाली",
    "संस्कृतम्",
  ];

  const handleContinue = () => {
    console.log("Selected language:", selectedLanguage);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overlay-page z-50"
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-[#DBDBDB]/72 px-4 sm:px-6 py-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#223960]" />
          </button>
          <h2 className="text-base font-semibold text-[#223960]">Language</h2>
        </div>
      </div>

      {/* Select Language Header */}
      <div className="overlay-scroll">
      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl text-[#223960] text-center mb-6">
            Select Language
          </h3>

          {/* Selected Language Highlight */}
          <div className="bg-[#F4F4F4] rounded-xl px-4 py-2.5 mb-4 flex items-center justify-center">
            <span className="text-lg sm:text-xl font-semibold text-[#535353]">
              {selectedLanguage}
            </span>
          </div>

          {/* Language List */}
          <div className="space-y-2">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={`w-full py-2 text-center transition-all ${
                  selectedLanguage === language
                    ? "text-base sm:text-lg font-semibold text-[#535353]"
                    : "text-sm sm:text-base font-semibold text-[#D0D0D0]"
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>{/* end overlay-scroll */}

      {/* Bottom Continue Button */}
      <div className="overlay-actions px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={handleContinue}
            className="text-sm font-bold text-[#1C3458]"
          >
            CONTINUE
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
    </motion.div>
  );
}
