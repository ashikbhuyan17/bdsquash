import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About BSRF | Bangladesh Squash Rackets Federation',
  description:
    'Learn about the Bangladesh Squash Rackets Federation (BSRF), our history, vision, mission, and objectives. Meet our executive committee and leadership.',
};

interface ExecutiveMember {
  name: string;
  position: string;
  designation?: string;
}

interface SubCommittee {
  name: string;
  members: string[];
}

const AboutPage = () => {
  // Executive Committee Data
  const executiveCommittee: ExecutiveMember[] = [
    { name: 'Faruk Khan, MP', position: 'President' },
    {
      name: 'Brigadier General G M Quamrul Islam, SPP (Retd) ',
      position: 'Secretary General',
    },
  ];

  // Sub-Committees Data
  const subCommittees: SubCommittee[] = [
    {
      name: 'Technical Committee',
      members: [
        'Mr. Technical Advisor 1',
        'Mr. Technical Advisor 2',
        'Ms. Technical Advisor 3',
      ],
    },
    {
      name: 'Finance Committee',
      members: [
        'Mr. Finance Advisor 1',
        'Ms. Finance Advisor 2',
        'Mr. Finance Advisor 3',
      ],
    },
    {
      name: 'Development Committee',
      members: [
        'Ms. Development Advisor 1',
        'Mr. Development Advisor 2',
        'Ms. Development Advisor 3',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-[90px]">
      {/* Hero Section with Image */}
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Squash-Sports.jpg"
            alt="BSRF Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-4 tracking-tight">
              About the BSRF
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-medium">
              Bangladesh Squash Rackets Federation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Overview / About BSRF Section */}
        <section id="overview" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-1 h-12 bg-blue-600 rounded-full"></span>
              About Bangladesh Squash Rackets Federation (BSRF)
            </h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              The Bangladesh Squash Rackets Federation (BSRF) is the national
              governing body for the sport of squash in Bangladesh. Established
              to promote, develop, and regulate squash throughout the country,
              BSRF serves as the official representative of Bangladesh in
              international squash organizations.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Our federation is committed to fostering excellence in squash at
              all levels, from grassroots development to elite international
              competition. We work tirelessly to create opportunities for
              athletes, coaches, and enthusiasts to engage with the sport and
              achieve their full potential.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Through strategic partnerships, comprehensive training programs,
              and organized competitions, BSRF aims to elevate the standard of
              squash in Bangladesh and produce world-class athletes who can
              compete on the global stage.
            </p>
          </div>
        </section>

        <div className="border-t border-gray-200 my-12"></div>

        {/* History of Squash in Bangladesh Section */}
        <section id="history" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-1 h-12 bg-blue-600 rounded-full"></span>
              History of Squash in Bangladesh
            </h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Squash has been played in Bangladesh since the late 20th century,
              gaining recognition and popularity among sports enthusiasts across
              the country.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              In 1978, the Bangladesh Squash Rackets Federation (BSRF) was
              established to oversee the sport nationally. Since then, the
              federation has played a key role in organizing national
              championships, promoting coaching programs, and representing
              Bangladesh in regional and international competitions.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Despite facing challenges over the years, BSRF has steadily
              expanded participation, nurtured talented players, and hosted both
              national and international tournaments to grow the sport at all
              levels.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Today, BSRF continues its mission to make squash more accessible,
              inspiring the next generation of players to uphold Bangladesh’s
              legacy in this dynamic and competitive sport.
            </p>
          </div>
        </section>

        <div className="border-t border-gray-200 my-12"></div>

        {/* Vision, Mission & Objectives Section */}
        <section id="vision-mission" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-1 h-12 bg-blue-600 rounded-full"></span>
              Vision, Mission & Objectives
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Vision */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-300 cursor-pointer">
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 ease-in-out" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 relative inline-block group-hover:text-blue-950 transition-colors duration-300 ease-in-out">
                  Our Vision
                  {/* Animated underline on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-in-out" />
                </h3>
                <ul className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 ease-in-out space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span>Revive squash as a popular sport in Bangladesh.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span>
                      Build structured pathways for players from grassroots to
                      elite performance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mission */}
            <div className="group relative bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-green-200/50 hover:border-green-300 cursor-pointer">
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 ease-in-out" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-green-900 mb-4 relative inline-block group-hover:text-green-950 transition-colors duration-300 ease-in-out">
                  Our Mission
                  {/* Animated underline on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300 ease-in-out" />
                </h3>
                <ul className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 ease-in-out space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span>
                      Promote squash nationwide and increase participation at
                      all levels.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span>
                      Organize regular domestic and international events.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span>
                      Increase the number of trained coaches and certified
                      officials.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1 font-bold">•</span>
                    <span>
                      Develop competitive players for regional and global
                      events.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Core Values */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-300 cursor-pointer">
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 ease-in-out" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-purple-900 mb-4 relative inline-block group-hover:text-purple-950 transition-colors duration-300 ease-in-out">
                  Core Values
                  {/* Animated underline on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300 ease-in-out" />
                </h3>
                <ul className="text-gray-700 leading-relaxed space-y-2.5 group-hover:text-gray-800 transition-colors duration-300 ease-in-out">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    Excellence
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    Integrity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    Inclusivity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    Innovation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    Sportsmanship
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-gray-50 p-8 md:p-10 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Key Objectives
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Expand the base of players and coaches for both men’s and women’s teams.',
                'Organize frequent domestic and international competitions.',
                'Promote squash education and coaching certification.',
                'Advocate for squash infrastructure improvements nationwide.',
              ].map((objective, index) => (
                <div
                  key={index}
                  className="group relative pl-6 py-3 pr-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:shadow-md hover:translate-x-[-4px] cursor-pointer"
                >
                  {/* Left border indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200 group-hover:w-1 group-hover:bg-blue-600 transition-all duration-300 ease-in-out rounded-l" />

                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-all duration-300 ease-in-out">
                    {objective}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-gray-200 my-12"></div>

        {/* President's Message Section */}
        <section id="presidents-message" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-1 h-12 bg-blue-600 rounded-full"></span>
              President&apos;s Message
            </h2>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 md:p-12 rounded-lg border border-gray-200">
            <div className="max-w-4xl">
              <p className="text-gray-700 leading-relaxed text-lg mb-6 italic">
                &quot;It is with great pleasure and pride that I welcome you to
                the Bangladesh Squash Rackets Federation. As we continue our
                journey to elevate squash in Bangladesh, I am inspired by the
                dedication and passion of our athletes, coaches, and supporters.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Our federation is committed to creating pathways for excellence,
                fostering a culture of sportsmanship, and building a strong
                foundation for the future of squash in our nation. We believe
                that through collective effort and unwavering commitment, we can
                achieve remarkable milestones and bring glory to Bangladesh on
                the international stage.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                I extend my heartfelt gratitude to all members, partners, and
                stakeholders who continue to support our mission. Together, we
                will write the next chapter in Bangladesh&apos;s squash
                history.&quot;
              </p>
              <div className="mt-8 pt-6 border-t border-gray-300">
                {/* Avatar Image */}
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/President.jpeg"
                    alt="President"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-gray-900">
                  Maj Gen Md Hasan Uz Zaman (ndu, afwc, psc, MPhil)
                </p>
                <p className="text-gray-600">President, BSRF</p>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-200 my-12"></div>

        {/* Executive Committee / Governing Body Section */}
        <section id="executive-committee" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-1 h-12 bg-blue-600 rounded-full"></span>
              Executive Committee / Governing Body
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executiveCommittee.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mt-1">
                    {member.position}
                  </p>
                  {member.designation && (
                    <p className="text-gray-600 text-sm mt-1">
                      {member.designation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-gray-200 my-12"></div>

        {/* Sub-Committees / Advisors Section */}
        <section id="sub-committees" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-1 h-12 bg-blue-600 rounded-full"></span>
              Sub-Committees / Advisors
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subCommittees.map((committee, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  {committee.name}
                </h3>
                <ul className="space-y-3">
                  {committee.members.map((member, memberIndex) => (
                    <li
                      key={memberIndex}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
