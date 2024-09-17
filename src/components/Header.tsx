// src/components/Header.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            {/* Left side: Candidate Database */}
            <div className="text-xl font-bold flex-grow">
                Candidate Database
            </div>

            {/* Right side: Dashboard Dropdown */}
            <nav>
                <div className="relative">
                    {/* Dropdown Toggle */}
                    <button
                        onClick={toggleDropdown}
                        className="hover:underline focus:outline-none"
                    >
                        Dashboard
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-white text-black border rounded shadow-lg">
                            <ul>
                                <li>
                                    <Link href="/admin">
                                        <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Admin Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/recruiter">
                                        <span className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Recruiter Dashboard</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
