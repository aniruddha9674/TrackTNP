import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
} from "lucide-react";

function Footer({ themeStyles }) {
  const quickLinks = [
    { name: "Aboutus", href: "/aboutus" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contactus" },
  ];
  const DarkLogo = "/src/assets/DarkLogo.png";
  const LightLogo = "/src/assets/LightLogo.png";

  const resources = [
    { name: "Documentation", href: "/docs" },
    { name: "Privacy Policy", href: "/privacypolicy" },
    { name: "Services", href: "/services" },
    { name: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/incorbis.official?igsh=OTlyb2VmZWVpdWly",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/incorbis",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/incorbis?t=yRcNnKknmtATHWpOXWnA6w&s=09",
      label: "Twitter",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61570261174985&mibextid=ZbWKwL",
      label: "Facebook",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@incorbis?si=vAdigR3lav8NpXFB ",
      label: "Youtube",
    },
  ];

  return (
    <footer
      id="contact"
      className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border-t`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img
                src={themeStyles === "dark" ? DarkLogo : LightLogo}
                alt="Logo"
                className="w-10 h-10 "
              />

              <span className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                TRACKTNP
              </span>
            </div>
            <p className={`${themeStyles.textSecondary} mb-6 leading-relaxed`}>
              Revolutionizing campus placements with intelligent automation and
              seamless management.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-10 h-10 ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border rounded-lg flex items-center justify-center ${themeStyles.buttonHover} transition-all hover:scale-110`}
                  >
                    <Icon className={`h-5 w-5 ${themeStyles.textPrimary}`} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-bold ${themeStyles.textPrimary} mb-6`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`${themeStyles.textSecondary} hover:${themeStyles.textPrimary} transition-colors inline-block hover:translate-x-1 transform duration-200`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-bold ${themeStyles.textPrimary} mb-6`}>
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`${themeStyles.textSecondary} hover:${themeStyles.textPrimary} transition-colors inline-block hover:translate-x-1 transform duration-200`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-bold ${themeStyles.textPrimary} mb-6`}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail
                  className={`h-5 w-5 ${themeStyles.textSecondary} mt-0.5 flex-shrink-0`}
                />
                <span className={`${themeStyles.textSecondary}`}>
                  support@tracktnp.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail
                  className={`h-5 w-5 ${themeStyles.textSecondary} mt-0.5 flex-shrink-0`}
                />
                <span className={`${themeStyles.textSecondary}`}>
                  support@incorbis.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t ${themeStyles.cardBorder}`}>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className={`${themeStyles.textSecondary} text-sm`}>
              © 2025 TRACKTNP. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className={`${themeStyles.textSecondary} text-sm`}>
              An Incorbis Product
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
