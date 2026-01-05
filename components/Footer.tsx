'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/events', label: 'Events' },
    { href: '/players-rankings', label: 'Players & Rankings' },
    { href: '/media-gallery', label: 'Media Gallery' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Column 1: Organization Info */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="w-24 h-24 bg-white rounded-full p-2 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="BSSF Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Organization Name */}
            <div className="text-center lg:text-left">
              <h3 className="text-white text-xl font-bold mb-3">
                Bangladesh Squash Rackets Federation
              </h3>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Squash Complex, 144 Gulshan Avenue,
                  <br />
                  Gulshan-1, Dhaka-1212, Bangladesh
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 shrink-0" />
                <a
                  href="tel:+8802550450889"
                  className="hover:text-white transition-colors"
                >
                  +88 0255045089
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-400 shrink-0" />
                <div className="space-y-1">
                  <a
                    href="mailto:info@bssf.com.bd"
                    className="block hover:text-white transition-colors"
                  >
                    info@bssf.com.bd
                  </a>
                  <a
                    href="mailto:squash.bd@gmail.com"
                    className="block hover:text-white transition-colors"
                  >
                    squash.bd@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-400 shrink-0" />
                <a
                  href="https://bssf.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  bssf.com.bd
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Access */}
          <div className="space-y-6">
            <h4 className="text-white text-xl font-semibold border-b border-gray-700 pb-3 text-center lg:text-left">
              Quick Access
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-sm hover:text-white transition-colors duration-300"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full shrink-0 group-hover:bg-blue-300 transition-colors"></span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500 ease-out"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black/40 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-sm text-gray-400 text-center">
              © 2026 By Bangladesh Squash Rackets Federation. All Rights
              Reserved.
            </p>
            <p className="text-sm text-gray-400 text-center">
              Developed by{' '}
              <a
                href="https://aesthitech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FCDCAC] hover:text-[#e7c188] transition-colors duration-200 font-medium cursor-pointer underline hover:no-underline inline-block relative z-10 pointer-events-auto"
              >
                AesthiTech Ltd.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import {
//   Facebook,
//   Youtube,
//   Linkedin,
//   Users,
//   Mail,
//   Phone,
//   MapPin,
//   Globe,
//   ChevronUp,
// } from 'lucide-react';

// const Footer = () => {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const usefulLinks = [
//     { href: '/athletes-pistol', label: 'Athletes Pistol' },
//     { href: '/events', label: 'Events' },
//     { href: '/clubs', label: 'Clubs' },
//     { href: '/about', label: 'About BSSF' },
//   ];

//   const quickLinks = [
//     { href: '/athletes-rifle', label: 'Athletes Rifle' },
//     { href: '/archives', label: 'Archives' },
//     { href: '/faq', label: 'FAQ' },
//     { href: '/contact', label: 'Contact Us' },
//   ];

//   const recentNews = [
//     {
//       date: '23',
//       month: 'MAY',
//       year: '2023',
//       title: 'শোক বার্তা',
//       author: 'BSSF Super Admin',
//       link: '/news/1',
//     },
//     {
//       date: '15',
//       month: 'APR',
//       year: '2023',
//       title: 'National Championship 2023',
//       author: 'BSSF Admin',
//       link: '/news/2',
//     },
//     {
//       date: '08',
//       month: 'MAR',
//       year: '2023',
//       title: 'Training Camp Announcement',
//       author: 'BSSF Coach',
//       link: '/news/3',
//     },
//   ];

//   const socialLinks = [
//     {
//       name: 'Facebook',
//       icon: Facebook,
//       href: 'https://facebook.com/bssf',
//       bgColor: 'bg-blue-600 hover:bg-blue-700',
//       label: 'VISIT',
//     },
//     {
//       name: 'Youtube',
//       icon: Youtube,
//       href: 'https://youtube.com/bssf',
//       bgColor: 'bg-red-600 hover:bg-red-700',
//       label: 'VISIT',
//     },
//     {
//       name: 'Linkedin',
//       icon: Linkedin,
//       href: 'https://linkedin.com/company/bssf',
//       bgColor: 'bg-blue-700 hover:bg-blue-800',
//       label: 'VISIT',
//     },
//   ];

//   return (
//     <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
//       {/* Main Footer Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//           {/* Column 1: Organization Info */}
//           <div className="space-y-6">
//             {/* Logo */}
//             <div className="flex items-center justify-center md:justify-start">
//               <div className="w-24 h-24 bg-white rounded-full p-2 shadow-lg">
//                 <Image
//                   src="/logo.png"
//                   alt="BSSF Logo"
//                   width={80}
//                   height={80}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             </div>

//             {/* Organization Name */}
//             <div className="text-center md:text-left">
//               <h3 className="text-white text-xl font-bold mb-3">
//                 Bangladesh Shooting Sport Federation
//               </h3>
//             </div>

//             {/* Contact Information */}
//             <div className="space-y-3 text-sm">
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
//                 <p className="leading-relaxed">
//                   Shooting Complex, 144 Gulshan Avenue,
//                   <br />
//                   Gulshan-1, Dhaka-1212. Bangladesh
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
//                 <a
//                   href="tel:+8802550450889"
//                   className="hover:text-white transition-colors"
//                 >
//                   +88 0255045089
//                 </a>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
//                 <div className="space-y-1">
//                   <a
//                     href="mailto:info@bssf.com.bd"
//                     className="block hover:text-white transition-colors"
//                   >
//                     info@bssf.com.bd
//                   </a>
//                   <a
//                     href="mailto:shooting.bd@gmail.com"
//                     className="block hover:text-white transition-colors"
//                   >
//                     shooting.bd@gmail.com
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Globe className="w-5 h-5 text-purple-400 flex-shrink-0" />
//                 <a
//                   href="https://bssf.com.bd"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-white transition-colors"
//                 >
//                   bssf.com.bd
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Column 2: Useful Links */}
//           <div className="space-y-6">
//             <h4 className="text-white text-lg font-semibold border-b border-gray-700 pb-3">
//               Useful Links
//             </h4>
//             <ul className="space-y-3">
//               {usefulLinks.map((link) => (
//                 <li key={link.href} className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
//                   <Link
//                     href={link.href}
//                     className="text-sm hover:text-white transition-colors duration-300 group relative inline-block"
//                   >
//                     {link.label}
//                     <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500 ease-out"></span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             <div className="pt-4">
//               <h5 className="text-white text-md font-semibold mb-3">
//                 Quick Access
//               </h5>
//               <ul className="space-y-3">
//                 {quickLinks.map((link) => (
//                   <li key={link.href} className="flex items-center gap-2">
//                     <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></span>
//                     <Link
//                       href={link.href}
//                       className="text-sm hover:text-white transition-colors duration-300 group relative inline-block"
//                     >
//                       {link.label}
//                       <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-500 ease-out"></span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Column 3: Recent News & Notices */}
//           <div className="space-y-6 lg:col-span-2">
//             <h4 className="text-white text-lg font-semibold border-b border-gray-700 pb-3">
//               Recent News & Notices
//             </h4>
//             <div className="space-y-4">
//               {recentNews.map((news, index) => (
//                 <Link
//                   key={index}
//                   href={news.link}
//                   className="flex gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all duration-300 group border border-gray-700/50 hover:border-blue-500/50"
//                 >
//                   {/* Date Box */}
//                   <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
//                     <span className="text-2xl font-bold leading-none">
//                       {news.date}
//                     </span>
//                     <span className="text-xs font-semibold uppercase">
//                       {news.month}
//                     </span>
//                     <span className="text-xs opacity-75">{news.year}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <h5 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
//                       {news.title}
//                     </h5>
//                     <div className="flex items-center gap-2 text-xs text-gray-400">
//                       <Users className="w-3 h-3" />
//                       <span>{news.author}</span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Social Media Links */}
//         <div className="mt-12 pt-8 border-t border-gray-700">
//           <div className="flex flex-wrap justify-center gap-4">
//             {socialLinks.map((social) => (
//               <a
//                 key={social.name}
//                 href={social.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`${social.bgColor} text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
//               >
//                 <social.icon className="w-5 h-5" />
//                 <div className="text-left">
//                   <div className="text-xs opacity-80 uppercase">
//                     {social.label}
//                   </div>
//                   <div className="font-semibold">{social.name}</div>
//                 </div>
//               </a>
//             ))}

//             {/* Visitor Counter */}
//             <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:scale-105 transition-all duration-300 hover:shadow-xl">
//               <Users className="w-5 h-5" />
//               <div className="text-left">
//                 <div className="text-2xl font-bold">1848</div>
//                 <div className="text-xs opacity-90">Visitors</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Copyright Bar */}
//       <div className="bg-black/40 border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col md:flex-row justify-center items-center gap-4">
//             <p className="text-sm text-gray-400 text-center md:text-left">
//               © 2026 By Bangladesh Shooting Sport Federation. All Rights
//               Reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
