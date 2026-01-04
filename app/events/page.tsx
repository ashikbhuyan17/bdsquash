import React from 'react';
import { Metadata } from 'next';
import { Calendar, MapPin, Trophy, Globe, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events & Tournaments | Bangladesh Squash Rackets Federation',
  description:
    'Upcoming and ongoing tournaments, national championships, international participation, and event calendar',
};

// Types
interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing';
}

interface NationalChampionship {
  id: number;
  title: string;
  year: string;
  venue: string;
}

interface InternationalEvent {
  id: number;
  eventName: string;
  country: string;
  year: string;
}

interface CalendarEvent {
  id: number;
  date: string;
  eventName: string;
  isUpcoming: boolean;
}

// Sample Data
const tournaments: Tournament[] = [
  {
    id: 1,
    name: 'Bangladesh National Squash Championship 2025',
    date: 'March 15-25, 2025',
    location: 'Dhaka, Bangladesh',
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'South Asian Squash Championship',
    date: 'February 10-18, 2025',
    location: 'Kathmandu, Nepal',
    status: 'ongoing',
  },
  {
    id: 3,
    name: 'Asian Junior Squash Championship',
    date: 'April 5-15, 2025',
    location: 'Kuala Lumpur, Malaysia',
    status: 'upcoming',
  },
  {
    id: 4,
    name: 'National Team Selection Tournament',
    date: 'February 1-8, 2025',
    location: 'Chittagong, Bangladesh',
    status: 'ongoing',
  },
];

const nationalChampionships: NationalChampionship[] = [
  {
    id: 1,
    title: 'Bangladesh National Squash Championship',
    year: '2024',
    venue: 'Dhaka',
  },
  {
    id: 2,
    title: 'Bangladesh National Squash Championship',
    year: '2023',
    venue: 'Chittagong',
  },
  {
    id: 3,
    title: 'Bangladesh National Squash Championship',
    year: '2022',
    venue: 'Dhaka',
  },
  {
    id: 4,
    title: 'Bangladesh National Squash Championship',
    year: '2021',
    venue: 'Sylhet',
  },
  {
    id: 5,
    title: 'Bangladesh National Squash Championship',
    year: '2020',
    venue: 'Dhaka',
  },
];

const internationalEvents: InternationalEvent[] = [
  {
    id: 1,
    eventName: 'Asian Squash Team Championship',
    country: 'Malaysia',
    year: '2024',
  },
  {
    id: 2,
    eventName: 'South Asian Games',
    country: 'Nepal',
    year: '2023',
  },
  {
    id: 3,
    eventName: 'Commonwealth Games',
    country: 'United Kingdom',
    year: '2022',
  },
  {
    id: 4,
    eventName: 'Asian Games',
    country: 'Indonesia',
    year: '2022',
  },
  {
    id: 5,
    eventName: 'World Squash Championship',
    country: 'Egypt',
    year: '2021',
  },
];

const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    date: '2025-02-10',
    eventName: 'South Asian Squash Championship',
    isUpcoming: true,
  },
  {
    id: 2,
    date: '2025-02-15',
    eventName: 'National Team Selection - Finals',
    isUpcoming: true,
  },
  {
    id: 3,
    date: '2025-03-15',
    eventName: 'Bangladesh National Squash Championship 2025',
    isUpcoming: true,
  },
  {
    id: 4,
    date: '2025-04-05',
    eventName: 'Asian Junior Squash Championship',
    isUpcoming: true,
  },
  {
    id: 5,
    date: '2025-05-20',
    eventName: 'International Squash Tournament',
    isUpcoming: true,
  },
  {
    id: 6,
    date: '2024-12-20',
    eventName: 'Year-End Squash Tournament',
    isUpcoming: false,
  },
  {
    id: 7,
    date: '2024-11-10',
    eventName: 'Regional Squash Championship',
    isUpcoming: false,
  },
];

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-[90px]">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Events & Tournaments
            </h1>
            <p className="text-lg md:text-xl text-gray-100 font-medium">
              Stay updated with upcoming tournaments and championships
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Upcoming / Ongoing Tournaments Section */}
        <section id="tournaments" className="mb-20 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-green-600" />
              <span>Upcoming & Ongoing Tournaments</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Latest tournaments and competitions happening now or coming soon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors flex-1">
                    {tournament.name}
                  </h3>
                  <span
                    className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      tournament.status === 'ongoing'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {tournament.status === 'ongoing' ? 'Ongoing' : 'Upcoming'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{tournament.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-gray-200 my-12"></div>

        {/* National Championships Section */}
        <section id="national-championships" className="mb-20 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-green-600" />
              <span>National Championships</span>
            </h2>
            <p className="text-gray-600 text-lg">
              History of national squash championships in Bangladesh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nationalChampionships.map((championship) => (
              <div
                key={championship.id}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-50 hover:border-green-300 transition-all duration-200 cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {championship.title}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">
                      Year: {championship.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Venue: {championship.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-gray-200 my-12"></div>

        {/* International Participation Section */}
        <section id="international" className="mb-20 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Globe className="w-8 h-8 text-green-600" />
              <span>International Participation</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Bangladesh participation in international squash events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-green-300 transition-all duration-200 cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {event.eventName}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="font-medium">{event.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Year: {event.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* <div className="border-t border-gray-200 my-12"></div> */}

        {/* Event Calendar Section */}
        {/* <section id="calendar" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span>Event Calendar</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Complete schedule of upcoming and past events
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {calendarEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                    event.isUpcoming ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center ${
                          event.isUpcoming
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <span className="text-xs font-semibold uppercase">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                          })}
                        </span>
                        <span className="text-xl font-bold">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            event.isUpcoming ? 'text-blue-900' : 'text-gray-900'
                          }`}
                        >
                          {event.eventName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    {event.isUpcoming && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Upcoming</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default EventsPage;
