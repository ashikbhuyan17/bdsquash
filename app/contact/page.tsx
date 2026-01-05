import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Bangladesh Squash Rackets Federation',
  description:
    'Get in touch with Bangladesh Squash Rackets Federation. Find our address, phone, email, and website information.',
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 pt-[90px]">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gradient-to-br from-green-300 via-green-400 to-green-500">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-100 font-medium">
              Get in touch with Bangladesh Squash Rackets Federation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Organization Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Logo and Organization Name */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-32 h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-full p-4 shadow-lg mb-6">
                <Image
                  src="/logo.png"
                  alt="BSSF Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Bangladesh Squash Rackets Federation
              </h2>
              <p className="text-gray-600 text-lg">
                Your trusted partner in squash sports
              </p>
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Card */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      Address
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Squash Complex, 144 Gulshan Avenue,
                      <br />
                      Gulshan-1, Dhaka-1212, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      Phone
                    </h3>
                    <a
                      href="tel:+8802550450889"
                      className="text-green-700 hover:text-green-800 font-semibold transition-colors text-lg"
                    >
                      +88 0255045089
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">
                      Email
                    </h3>
                    <div className="space-y-2">
                      <a
                        href="mailto:info@bssf.com.bd"
                        className="block text-green-700 hover:text-green-800 font-medium transition-colors"
                      >
                        info@bssf.com.bd
                      </a>
                      <a
                        href="mailto:squash.bd@gmail.com"
                        className="block text-green-700 hover:text-green-800 font-medium transition-colors"
                      >
                        squash.bd@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Website Card */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      Website
                    </h3>
                    <a
                      href="https://bssf.com.bd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-800 font-semibold transition-colors text-lg"
                    >
                      bssf.com.bd
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
