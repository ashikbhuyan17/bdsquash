'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Trophy, Award, Users } from 'lucide-react';

// Types
interface Player {
  id: number;
  name: string;
  photo: string;
  ranking: number;
  position: string;
  category: string;
  country: string;
}

interface Coach {
  id: number;
  name: string;
  photo: string;
  role: string;
  designation: string;
  experience?: string;
}

// Sample Data
const playersData: Player[] = [
  {
    id: 1,
    name: 'Mohammad Ali',
    photo: '/user.jpg',
    ranking: 1,
    position: 'Singles',
    category: 'Men',
    country: 'Bangladesh',
  },
  {
    id: 2,
    name: 'Fatima Rahman',
    photo: '/user.jpg',
    ranking: 2,
    position: 'Singles',
    category: 'Women',
    country: 'Bangladesh',
  },
  {
    id: 3,
    name: 'Hasan Ahmed',
    photo: '/user.jpg',
    ranking: 3,
    position: 'Doubles',
    category: 'Men',
    country: 'Bangladesh',
  },
  {
    id: 4,
    name: 'Ayesha Khan',
    photo: '/user.jpg',
    ranking: 4,
    position: 'Singles',
    category: 'Women',
    country: 'Bangladesh',
  },
  {
    id: 5,
    name: 'Karim Uddin',
    photo: '/user.jpg',
    ranking: 5,
    position: 'Singles',
    category: 'Men',
    country: 'Bangladesh',
  },
  {
    id: 6,
    name: 'Nadia Islam',
    photo: '/user.jpg',
    ranking: 6,
    position: 'Doubles',
    category: 'Women',
    country: 'Bangladesh',
  },
];

const coachesData: Coach[] = [
  {
    id: 1,
    name: 'Mr. Shahidul Islam',
    photo: '/user.jpg',
    role: 'Head Coach',
    designation: 'Level 3 Certified',
    experience: '15+ years',
  },
  {
    id: 2,
    name: 'Ms. Roksana Begum',
    photo: '/user.jpg',
    role: 'Assistant Coach',
    designation: 'Level 2 Certified',
    experience: '10+ years',
  },
  {
    id: 3,
    name: 'Mr. Kamrul Hasan',
    photo: '/user.jpg',
    role: 'Referee',
    designation: 'International Referee',
    experience: '12+ years',
  },
  {
    id: 4,
    name: 'Ms. Tahmina Akter',
    photo: '/user.jpg',
    role: 'Assistant Coach',
    designation: 'Level 2 Certified',
    experience: '8+ years',
  },
  {
    id: 5,
    name: 'Mr. Rafiqul Alam',
    photo: '/user.jpg',
    role: 'Technical Official',
    designation: 'Certified Official',
    experience: '5+ years',
  },
  {
    id: 6,
    name: 'Ms. Nasreen Sultana',
    photo: '/user.jpg',
    role: 'Referee',
    designation: 'National Referee',
    experience: '7+ years',
  },
];

const PlayersRankingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPosition, setFilterPosition] = useState<string>('all');

  // Filter players
  const filteredPlayers = useMemo(() => {
    return playersData.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.ranking.toString().includes(searchQuery);
      const matchesCategory =
        filterCategory === 'all' || player.category === filterCategory;
      const matchesPosition =
        filterPosition === 'all' || player.position === filterPosition;
      return matchesSearch && matchesCategory && matchesPosition;
    });
  }, [searchQuery, filterCategory, filterPosition]);

  // Filter coaches
  const filteredCoaches = useMemo(() => {
    return coachesData.filter(
      (coach) =>
        coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const categories = ['all', 'Men', 'Women'];
  const positions = ['all', 'Singles', 'Doubles'];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-[90px]">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Players & Rankings
            </h1>
            <p className="text-lg md:text-xl text-gray-100 font-medium">
              Meet Our Champions and Coaching Team
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* National Player Profiles Section */}
        <section id="national-profiles" className="mb-20 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-green-600" />
              <span>National Player Profiles</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Top-ranked players representing Bangladesh in international
              competitions
            </p>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or ranking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filterCategory === cat
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>

            {/* Position Filter */}
            {/* <div className="flex gap-2">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setFilterPosition(pos)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filterPosition === pos
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pos === 'all' ? 'All' : pos}
                </button>
              ))}
            </div> */}
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-green-100 hover:border-green-300 cursor-pointer"
              >
                {/* Ranking Badge - Top 3 Special */}
                <div
                  className={`absolute -top-3 -right-3 w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 ${
                    player.ranking === 1
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white group-hover:scale-110 group-hover:shadow-yellow-300/50'
                      : player.ranking === 2
                      ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white group-hover:scale-110 group-hover:shadow-gray-300/50'
                      : player.ranking === 3
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white group-hover:scale-110 group-hover:shadow-orange-300/50'
                      : 'bg-gradient-to-br from-green-500 to-green-700 text-white group-hover:scale-110 group-hover:shadow-green-300/50'
                  }`}
                >
                  <span className="relative z-10">#{player.ranking}</span>
                  {player.ranking <= 3 && (
                    <div className="absolute inset-0 rounded-full animate-pulse opacity-50 bg-white" />
                  )}
                </div>

                {/* Player Photo */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-green-300 transition-colors duration-300">
                    <Image
                      //   src={player.photo}
                      src="/user-avatar.png"
                      alt={player.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Player Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {player.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      {player.position}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {player.category}
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-sm text-gray-500 flex items-center justify-center gap-1">
                      <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                        BD
                      </span>
                      {player.country}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No players found</p>
            </div>
          )}
        </section>

        <div className="border-t border-gray-200 my-12"></div>

        {/* Coaches & Officials Section */}
        <section id="coaches-officials" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Award className="w-8 h-8 text-green-600" />
              <span>Coaches & Officials</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Experienced professionals guiding our athletes to excellence
            </p>
          </div>

          {/* Coaches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoaches.map((coach) => (
              <div
                key={coach.id}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300 cursor-pointer"
              >
                {/* Role Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                    coach.role.toLowerCase().includes('coach')
                      ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                  }`}
                >
                  {coach.role}
                </div>

                {/* Profile Photo */}
                <div className="flex flex-col items-center mb-4 pt-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-green-300 transition-colors duration-300">
                    <Image
                      //   src={coach.photo}
                      src="/user-avatar.png"
                      alt={coach.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Coach Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {coach.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">
                    {coach.designation}
                  </p>
                  {coach.experience && (
                    <p className="text-xs text-gray-500">{coach.experience}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCoaches.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No coaches found</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PlayersRankingsPage;
