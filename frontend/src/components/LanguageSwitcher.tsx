import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { FaRegFlag, FaFlagUsa } from "react-icons/fa"; // Icônes de drapeaux

const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative inline-block ml-auto">
      <select
        onChange={(e) => switchLanguage(e.target.value)}
        className="block appearance-none w-full bg-white border-2 border-[#8A2BE2] text-[#8A2BE2] rounded-full py-2 pl-4 pr-10 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-[#8A2BE2] transition-all cursor-pointer "
      >
        <option value="fr" className="flex items-center gap-2 text-black">
          🇫🇷 Français
        </option>
        <option value="en" className="flex items-center gap-2 text-black">
          🇺🇸 English
        </option>
      </select>

      {/* Icône de la flèche du menu déroulant */}
      <div className="absolute top-0 right-0 mt-2 mr-4 pointer-events-none">
        <svg
          className="w-4 h-4 text-[#8A2BE2]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
