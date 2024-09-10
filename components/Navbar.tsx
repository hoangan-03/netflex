import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import NavbarItem from "@/components/NavbarItem";
import logo from "@/assets/picture/netflexx.png";
import Image from "next/image";
import { useRouter } from "next/router";
import avatar from "@/assets/picture/back.jpg";
import axios from "axios";
const TOP_OFFSET = 66;

const Navbar = () => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ fullname: string, userId: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


 useEffect(() => {
  const user = localStorage.getItem("user");
  console.log("User local storage:", user);

  if (user) {
    const parsedUser = JSON.parse(user);
    const userId = parsedUser.userId;
    if (userId) {
      axios.get(`/api/user?id=${userId}`)
        .then(response => {
          setIsLoggedIn(true);
          setUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setIsLoggedIn(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  } else {
    setIsLoggedIn(false);
    setUser(null);
  }
}, []);
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleSearch = useCallback(() => {
    setShowSearch((current) => !current);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?query=${searchQuery}`);
    console.log("Search query:", searchQuery);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
        setSearchQuery("");
      }
    };
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  const handleLoginClick = () => {
    router.push("/auth");
  };

  const handleAvatarClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <nav className="w-full fixed z-[10001]">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Image
          src={logo}
          className="h-8 lg:h-12 w-20 object-cover"
          alt="Logo"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <Link href="/">
            <NavbarItem label="Home" active={router.pathname === "/"} />
          </Link>
          <Link href="/films">
            <NavbarItem label="Movies" active={router.pathname === "/films"} />
          </Link>
          <Link href="/time">
            <NavbarItem
              label="Time by Time"
              active={router.pathname === "/time"}
            />
          </Link>
          <Link href="/random">
            <NavbarItem
              label="Random Selection"
              active={router.pathname === "/random"}
            />
          </Link>
          <Link href="/wishlist">
            <NavbarItem
              label="Wishlist"
              active={router.pathname === "/wishlist"}
            />
          </Link>
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-3 items-center">
          <div
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition duration-500"
            onClick={toggleSearch}
          >
            <MagnifyingGlassIcon className="w-6" />
          </div>
          <form
            ref={searchFormRef}
            onSubmit={handleSearchSubmit}
            className={`relative transition-all duration-500 ${
              showSearch ? "max-w-[300px] opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-200 text-black w-full rounded-full px-5 py-2 focus:outline-none"
              placeholder="Search for title"
            />
          </form>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition mr-3">
            <BellIcon className="w-6" />
          </div>
          {isLoggedIn ? (
            <div className="relative">
              <div className="cursor-pointer" onClick={handleAvatarClick}>
                <Image
                  src={avatar}
                  className="w-8 h-8 rounded-full"
                  alt="User Avatar"
                  width={32}
                  height={32}
                />
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black/20 backdrop-blur-lg rounded-xl shadow-lg z-50">
                  <div className="px-4 py-2 font-bold text-white">
                    {user?.fullname}
                  </div>
                  <div
                    className="px-4 py-2 text-black bg-gray-200  cursor-pointer rounded-b-xl hover:bg-gray-800 hover:text-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="text-black bg-white text-lg font-bold hover:bg-gray-200 px-6 py-1 rounded-3xl transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;