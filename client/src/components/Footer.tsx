import React from "react";

interface SocialIcon {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const navigation = {
  main: [
    { name: "Events", href: "/events" },
    { name: "Music", href: "/music" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/lighthaus__/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          {/* SVG path for Facebook */}
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/lighthaus__/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          {/* SVG path for Instagram */}
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://www.twitter.com/lighthaus__/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          {/* SVG path for Twitter */}
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/lighthaus__/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          {/* SVG path for YouTube */}
        </svg>
      ),
    },
  ] as SocialIcon[],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-3 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="text-white text-sm leading-6 hover:text-gray-200"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5">
          &copy; 2023 The Band, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
