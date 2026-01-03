'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Navigation structure matching the image
const navigationConfig = {
  theBSSF: {
    label: 'THE BSSF',
    items: [
      { href: '/about', label: 'About Us' },
      { href: '/mission', label: 'Mission & Vision' },
      { href: '/history', label: 'History' },
      { href: '/constitution', label: 'Constitution' },
    ],
  },
  members: {
    label: 'MEMBERS',
    items: [
      { href: '/executive-committee', label: 'Executive Committee' },
      { href: '/sub-committees', label: 'Sub Committees' },
      { href: '/camp-commandant', label: 'Camp Commandant & Coach' },
      { href: '/office-administration', label: 'Office Administration' },
      { href: '/judges-jury', label: 'Judges & Jury' },
    ],
  },
  athlete: {
    label: 'ATHLETE',
    items: [
      { href: '/national-team', label: 'National Team' },
      { href: '/junior-team', label: 'Junior Team' },
      { href: '/achievements', label: 'Achievements' },
    ],
  },
  newsPress: {
    label: 'NEWS & PRESS',
    items: [
      { href: '/latest-news', label: 'Latest News' },
      { href: '/press-release', label: 'Press Release' },
      { href: '/media-coverage', label: 'Media Coverage' },
    ],
  },
};

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpenMenus, setMobileOpenMenus] = useState<Set<string>>(
    new Set()
  );

  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (hash: string) => {
    const element = document.querySelector(hash);

    if (pathname === '/') {
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 50);
      }
      return;
    }

    router.push(`/${hash}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = (menuKey: string) => {
    setMobileOpenMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuKey)) {
        newSet.delete(menuKey);
      } else {
        newSet.add(menuKey);
      }
      return newSet;
    });
  };

  return (
    <>
      <header
        className={`fixed bg-white shadow-md top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between h-14 sm:h-18">
            {/* Logo */}
            <Link
              href={'/'}
              className="flex items-center max-lg:hidden flex-shrink-0"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={15}
                className="h-auto"
              />
            </Link>

            <Link
              href={'/'}
              className="flex items-center lg:hidden flex-shrink-0"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={14}
                className="h-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavigationMenu className="z-1" viewport={false}>
                <NavigationMenuList className="space-x-1">
                  {/* THE BSSF Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 text-gray-800 font-medium text-sm uppercase">
                      {navigationConfig.theBSSF.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        {navigationConfig.theBSSF.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {item.label}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* MEMBERS Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 text-gray-800 font-medium text-sm uppercase">
                      {navigationConfig.members.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[240px] gap-1 p-2">
                        {navigationConfig.members.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {item.label}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* ATHLETE Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 text-gray-800 font-medium text-sm uppercase">
                      {navigationConfig.athlete.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        {navigationConfig.athlete.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {item.label}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* NEWS & PRESS Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 text-gray-800 font-medium text-sm uppercase">
                      {navigationConfig.newsPress.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        {navigationConfig.newsPress.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {item.label}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Static Links */}
                  <NavigationMenuItem>
                    <Link
                      href="/events"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium uppercase text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      EVENTS
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      href="/archives"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium uppercase text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      ARCHIVES
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      href="/gallery"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium uppercase text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      GALLERY
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      href="/contact"
                      className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium uppercase text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      CONTACT US
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Language Selector */}
              {/* <button className="ml-4 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium uppercase">ENG</span>
                <ChevronDown className="w-4 h-4" />
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="text-black p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] overflow-y-auto"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-2 border-b">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={60}
                        height={14}
                        className="h-auto"
                      />
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-2">
                      {/* THE BSSF Mobile Dropdown */}
                      <div className="border-b pb-2">
                        <button
                          onClick={() => toggleMobileMenu('theBSSF')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <span>{navigationConfig.theBSSF.label}</span>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform',
                              mobileOpenMenus.has('theBSSF') && 'rotate-180'
                            )}
                          />
                        </button>
                        {mobileOpenMenus.has('theBSSF') && (
                          <div className="ml-4 mt-1 space-y-1">
                            {navigationConfig.theBSSF.items.map((item) => (
                              <SheetClose asChild key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* MEMBERS Mobile Dropdown */}
                      <div className="border-b pb-2">
                        <button
                          onClick={() => toggleMobileMenu('members')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <span>{navigationConfig.members.label}</span>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform',
                              mobileOpenMenus.has('members') && 'rotate-180'
                            )}
                          />
                        </button>
                        {mobileOpenMenus.has('members') && (
                          <div className="ml-4 mt-1 space-y-1">
                            {navigationConfig.members.items.map((item) => (
                              <SheetClose asChild key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* ATHLETE Mobile Dropdown */}
                      <div className="border-b pb-2">
                        <button
                          onClick={() => toggleMobileMenu('athlete')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <span>{navigationConfig.athlete.label}</span>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform',
                              mobileOpenMenus.has('athlete') && 'rotate-180'
                            )}
                          />
                        </button>
                        {mobileOpenMenus.has('athlete') && (
                          <div className="ml-4 mt-1 space-y-1">
                            {navigationConfig.athlete.items.map((item) => (
                              <SheetClose asChild key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* NEWS & PRESS Mobile Dropdown */}
                      <div className="border-b pb-2">
                        <button
                          onClick={() => toggleMobileMenu('newsPress')}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <span>{navigationConfig.newsPress.label}</span>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform',
                              mobileOpenMenus.has('newsPress') && 'rotate-180'
                            )}
                          />
                        </button>
                        {mobileOpenMenus.has('newsPress') && (
                          <div className="ml-4 mt-1 space-y-1">
                            {navigationConfig.newsPress.items.map((item) => (
                              <SheetClose asChild key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Static Mobile Links */}
                      <SheetClose asChild>
                        <Link
                          href="/events"
                          className="px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          EVENTS
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/archives"
                          className="px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          ARCHIVES
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/gallery"
                          className="px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          GALLERY
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/contact"
                          className="px-4 py-3 text-sm font-medium uppercase hover:bg-gray-100 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          CONTACT US
                        </Link>
                      </SheetClose>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
