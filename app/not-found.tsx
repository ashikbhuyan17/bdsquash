'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center pt-[90px] pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[6rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 leading-none">
            404
          </h1>
        </div>

        {/* Title and Description */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-green-600 hover:text-green-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wide">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              href="/events"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
            >
              Events
            </Link>
            <Link
              href="/news"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
            >
              News
            </Link>
            <Link
              href="/media-gallery"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
            >
              Media Gallery
            </Link>
            <Link
              href="/players-rankings"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
            >
              Players & Rankings
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
