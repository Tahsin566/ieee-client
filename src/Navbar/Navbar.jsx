import React, { useEffect, useMemo, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { FaChevronDown } from "react-icons/fa";

import { useLocation } from "react-router-dom";

import {
    FaCaretRight,
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaUser,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import { BASE_URL } from '../../constants';

const Navbar = () => {
    const location = useLocation();

    const [user, setUser] = useState()



    const isHomeActive = location.pathname === "/";
    const isEventsActive = location.pathname.startsWith("/event");

    const isNewsActive = location.pathname.startsWith("/news");
    const isAchievementActive = location.pathname.startsWith("/achievement");
    const isPanelActive = location.pathname.startsWith("/panel");
    const isvolunteersActive = location.pathname.startsWith("/volunteers");
    const isdevelopersActive = location.pathname.startsWith("/developers");
    const isjoinActive = location.pathname.startsWith("/join");
    const isIEEEActive = location.pathname.startsWith("/IEEE");
    const isIEEERegion10Active = location.pathname.startsWith("/IEEE-REGION-10");
    const isIEEEBangladeshsectionActive = location.pathname.startsWith("/IEEE-Bangladesh-section");
    const isIEEELUBRANCHActive = location.pathname.startsWith("/IEEE-LU-BRANCH");
    const isfaqActive = location.pathname.startsWith("/faq");
    const isblogActive = location.pathname.startsWith("/blog");
    const isresearchPapersActive = location.pathname.startsWith("/researchPapers");
    const ismegazineActive = location.pathname.startsWith("/megazine");
    const isgalleryActive = location.pathname.startsWith("/gallery");
    const istoolkitActive = location.pathname.startsWith("/toolkit");
    const iscontactActive = location.pathname.startsWith("/contact");
    const isWriteBlogActive = location.pathname.startsWith("/write");
    const isAddActive = location.pathname.startsWith("/addResearch");
    const isPCActive = location.pathname.startsWith("/programCoordinator");
    const isPublicityCoordinatorActive = location.pathname.startsWith("/publicity-coordinator");
    const isPNCActive = location.pathname.startsWith("/publication-newsletter-coordinator");
    const isCREActive = location.pathname.startsWith("/chief-reporting-executive");
    const isPEActive = location.pathname.startsWith("/photography-executive");
    const isLEActive = location.pathname.startsWith("/logistic-executive");
    const isACMActive = location.pathname.startsWith("/acm-coordinator");
    const isMDCActive = location.pathname.startsWith("/membership-development-coordinator");
    const isWEBActive = location.pathname.startsWith("/webmaster");
    const isGDEActive = location.pathname.startsWith("/graphics-design-executive");
    const isVCEActive = location.pathname.startsWith("/video-content-executive");
    const isMembersActive = location.pathname.startsWith("/membersPage");


    const [activeDropdown, setActiveDropdown] = useState(null);
    const [teamOpen, setTeamOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileSubMenu, setMobileSubMenu] = useState(null);
    const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
    const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
    const [isMembersOpen, setIsMembersOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isPublicationsOpen, setIsPublicationsOpen] = useState(false);
    const [isGetInvolvedOpen, setIsGetInvolvedOpen] = useState(false);
    const navRef = useRef(null);

    const getUser = async () => {

        try {
            const response = await fetch(`${BASE_URL}/auth`, {
                credentials: 'include'
            })

            const data = await response.json();

            if (!data?.success) {
                return
            }
            setUser(data?.user)
        } catch (error) {
            console.log(error);
        }
    }
    
    // useMemo(() => getUser() , [user]);

    useMemo(() => getUser() , []);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
                setTeamOpen(false);
                setIsMobileMenuOpen(false);
                setMobileSubMenu(null);
                setMobileTeamOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);




    useEffect(() => {
        if (!isMobileMenuOpen) {
            setMobileSubMenu(null);
            setMobileTeamOpen(false);
        }
    }, [isMobileMenuOpen]);


    return (
        <nav className="bg-[#045C99]  shadow-md  w-full py-4  font-['Roboto']" ref={navRef}>


            {/* Navigation for pc */}
            <div className="xl:flex p-2  hidden  justify-center  flex-row  w-full mx-auto ">
                <ul className="flex flex-wrap  w-[95%] mx-auto justify-center gap-x-10 items-center  text-white font-semibold  relative">
                    <div className="flex items-center gap-4">
                        <img src="https://i.ibb.co/Kxt1VLrP/ieeelogo.png" alt="IEEE Logo" className=" w-50 mr-4" />
                    </div>
                    <li><a replace="true" href="/" className='md:text-xl text-2xl lg:text-[18px] '><span className={`hover:text-blue-300 ${isHomeActive
                        ? "text-white border-b-2 border-white 0"
                        : "text-white"
                        }`}>Home</span></a></li>


                    {/* Activities Dropdown */}
                    <li className="relative group">
                        <button onMouseEnter={() => setIsActivitiesOpen(!isActivitiesOpen)} onMouseLeave={() => setIsActivitiesOpen(!isActivitiesOpen)} className="md:text-xl text-2xl lg:text-[18px]">
                            <div className='flex items-center gap-2'>
                                <span
                                    className={`hover:text-blue-300 ${isEventsActive || isNewsActive || isAchievementActive
                                        ? "text-white border-b-2 border-white 0"
                                        : "text-white"
                                        }`}
                                >
                                    Activities
                                </span>
                                <FaChevronDown
                                    className={`transition-transform text-sm duration-300 ${isActivitiesOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </div>
                        </button>

                        <div className="absolute top-full left-0 mt-8 w-64  bg-black text-white rounded shadow-lg z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                            <ul>
                                <li>
                                    <Link to="/event" className={`block px-4 py-2 hover:bg-[#045C99] `}>
                                        Events
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/news" className="block px-4 py-2 hover:bg-[#045C99]">
                                        News
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/achievement" className="block px-4 py-2 hover:bg-[#045C99]">
                                        Achievements
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>


                    {/* ---------------------------------------------- */}


                    <Link to={"/membersPage"} className='md:text-xl text-2xl lg:text-[18px]'>
                        <span
                            className={`hover:text-blue-300 ${isMembersActive
                                ? "text-white border-b-2 border-white 0"
                                : "text-white"
                                }`}
                        >
                            Members
                        </span>
                    </Link>





                    {/* ---------------------------------------------- */}


                    <li className="relative group">
                        <button onMouseEnter={() => setIsAboutOpen(!isAboutOpen)} onMouseLeave={() => setIsAboutOpen(!isAboutOpen)} className="md:text-xl text-2xl lg:text-[18px]">
                            <div className='flex items-center gap-2'>
                                <span
                                    className={`hover:text-blue-300 ${isjoinActive ||
                                        isIEEEActive ||
                                        isIEEERegion10Active ||
                                        isIEEEBangladeshsectionActive ||
                                        isIEEELUBRANCHActive ||
                                        isfaqActive
                                        ? "text-white border-b-2 border-white 0"
                                        : "text-white"
                                        }`}
                                >
                                    About
                                </span>
                                <FaChevronDown
                                    className={`transition-transform text-sm duration-300 ${isAboutOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </div>
                        </button>

                        {/* Dropdown on hover */}
                        <div className="absolute top-full left-0 mt-8 w-64  bg-black text-white rounded shadow-lg z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                            <ul>

                                <li>
                                    <Link target='_blank' to="https://www.computer.org/about?source=nav" className="block px-4 py-2 hover:bg-[#045C99]">
                                        IEEE Computer Society
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' to="https://ieeecsbdc.org/about" className="block px-4 py-2 hover:bg-[#045C99]">
                                        IEEE CS Bangladesh Chapter
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/IEEE-LU-BRANCH" className="block px-4 py-2 hover:bg-[#045C99]">
                                        IEEE CS LU SB Chapter
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="block px-4 py-2 hover:bg-[#045C99]">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="relative group">
                        <button onMouseEnter={() => setIsPublicationsOpen(!isPublicationsOpen)} onMouseLeave={() => setIsPublicationsOpen(!isPublicationsOpen)} className="md:text-xl text-2xl lg:text-[18px]">
                            <div className='flex items-center gap-2'>
                                <span
                                    className={`hover:text-blue-300 ${isblogActive ||
                                        isresearchPapersActive ||
                                        ismegazineActive ||
                                        isgalleryActive ||
                                        istoolkitActive
                                        ? "text-white border-b-2 border-white 0"
                                        : "text-white"
                                        }`}
                                >
                                    Publications
                                </span>
                                <FaChevronDown
                                    className={`transition-transform text-sm duration-300 ${isPublicationsOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </div>
                        </button>
                        {/* Dropdown on hover */}
                        <div className="absolute top-full left-0 mt-8 w-64  bg-black text-white rounded shadow-lg z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                            <ul>
                                <li>
                                    <Link to="/blog" className="block px-4 py-2 hover:bg-[#045C99]">
                                        Blogs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/researchPapers" className="block px-4 py-2 hover:bg-[#045C99]">
                                        Research Papers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/megazine" className="block px-4 py-2 hover:bg-[#045C99]">
                                        Magazines
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/gallery" className="block px-4 py-2 hover:bg-[#045C99]">
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/toolkit" className="block px-4 py-2 hover:bg-[#045C99]">
                                        Toolkit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {user?.role === "user" ? <li><Link to={"/contact"} className='md:text-xl text-2xl lg:text-[18px]' ><span className={`hover:text-blue-300 ${iscontactActive ? "text-white border-b-2 border-white 0 " : "text-white "} `}>Contact</span></Link></li> : null}

                    {user?.role === "user" ? <li className="relative group">
                        <button onMouseEnter={() => setIsGetInvolvedOpen(!isGetInvolvedOpen)} onMouseLeave={() => setIsGetInvolvedOpen(!isGetInvolvedOpen)} className="md:text-xl text-2xl lg:text-[18px]">
                            <div className='flex items-center gap-2'>
                                <span
                                    className={`hover:text-blue-300 ${isAddActive || isWriteBlogActive
                                        ? "text-white border-b-2 border-white 0"
                                        : "text-white"
                                        }`}
                                >
                                    Get Involved
                                </span>
                                <FaChevronDown
                                    className={`transition-transform text-sm duration-300 ${isGetInvolvedOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </div>
                        </button>

                        {/* Dropdown on hover */}
                        <div className="absolute top-full left-0 mt-8 w-64  bg-black text-white rounded shadow-lg z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                            <ul>

                                <li>
                                    <Link to="/write" className="block px-4 py-2 hover:bg-[#045C99]">
                                        Write A Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/addResearch" className="block px-4 py-2 hover:bg-[#045C99]">
                                        Add Research Paper
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li> : null}

                    {!user ? <li>
                        <Link
                            to={"/signin"}
                            className="block bg-black text-white text-xl px-4 py-1.5 rounded hover:bg-[#045C99]"
                        >
                            <span className='text-xl '>Join Now</span>
                        </Link>
                    </li> : null}
                    {user && user?.role === "admin" ? <li>
                        <Link to="/dashboard" replace={true} className="block px-4 py-1 hover:bg-[#ffe] bg-white text-xl text-black rounded-md">
                            Dashboard
                        </Link>
                    </li> : null}


                    {user ? <li>
                        <Link
                            to={`/user?id=${encodeURIComponent(user?.IEEEID)}`}
                            className="block text-white text-xl px-4 py-1.5 rounded-full h-12 w-12 hover:bg-[#045C99] hover:border-none border flex justify-center items-center"
                        >
                            <FaUser />
                        </Link>
                    </li> : null}
                </ul>
            </div>










            {/* --------------------------------------------------------------------------------------- */}

            {/* Mobile navigation */}
            <div className="xl:hidden flex justify-between px-6 h-30  py-8 bg-[#045C99]">
                <div className="flex items-center gap-4 ">
                    <img src="https://i.ibb.co/Kxt1VLrP/ieeelogo.png" alt="IEEE Logo" className="w-50 mr-4" />

                </div>
                <button
                    className="text-white md:text-3xl text-2xl lg:text-2xl  focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Menu */}
            {isMobileMenuOpen && (
                <div className="xl:hidden bg-black text-white px-6 py-4 space-y-3">
                    <ul className="space-y-3 text-base font-semibold">

                        <li><a href="/">Home</a></li>

                        <li>
                            <button onClick={() => setMobileSubMenu(mobileSubMenu === 'activities' ? null : 'activities')} className="w-full text-left">Activities</button>
                            {mobileSubMenu === 'activities' && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">

                                    <li>
                                        <Link to="/event" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Events
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/news" className="block px-4 py-2 hover:bg-[#045C99]">
                                            News
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/achievement" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Achievements
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <a href={"/membersPage"} className='w-full text-left'>
                                <span
                                    className={`hover:text-blue-300 ${isMembersActive
                                        ? "text-white border-b-2 border-white 0"
                                        : "text-white"
                                        }`}
                                >
                                    Members
                                </span>
                            </a>
                        </li>

                        <li>
                            <button onClick={() => setMobileSubMenu(mobileSubMenu === 'about' ? null : 'about')} className="w-full text-left">About</button>
                            {mobileSubMenu === 'about' && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">

                                    <li>
                                        <Link to="https://www.computer.org/about?source=nav" className="block px-4 py-2 hover:bg-[#045C99]">
                                            IEEE Computer Society
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="https://ieeecsbdc.org/about" className="block px-4 py-2 hover:bg-[#045C99]">
                                            IEEE Bangladesh Section
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/IEEE-LU-BRANCH" className="block px-4 py-2 hover:bg-[#045C99]">
                                            IEEE CS LU SB Chapter
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/faq" className="block px-4 py-2 hover:bg-[#045C99]">
                                            FAQ
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button onClick={() => setMobileSubMenu(mobileSubMenu === 'publications' ? null : 'publications')} className="w-full text-left">Publications</button>
                            {mobileSubMenu === 'publications' && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">
                                    <li>
                                        <Link to="/blog" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Blogs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/researchPapers" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Research Papers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/megazine" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Magazines
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/gallery" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Gallery
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/toolkit" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Toolkit
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {user?.role === "user" ? <li><Link to={"/contact"}>Contact</Link></li> : null}

                        {user?.role === "user" ? <li>
                            <button onClick={() => setMobileSubMenu(mobileSubMenu === 'getinvolved' ? null : 'getinvolved')} className="w-full text-left">Get Involved</button>
                            {mobileSubMenu === 'getinvolved' && (
                                <ul className="pl-4 mt-2 space-y-1 text-sm">
                                    <li>
                                        <Link to="/joinIEEE" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Join IEEE LU SB
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/write" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Write A Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/addResearch" className="block px-4 py-2 hover:bg-[#045C99]">
                                            Add Research Paper
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li> : null}

                        {user && user?.role === "admin" && <li>
                            <Link to="/dashboard" replace className="block px-4 py-1 hover:bg-[#ffe] bg-white text-xl text-black rounded-md">
                                Dashboard
                            </Link>
                        </li>}

                        {user ? <li>
                            <Link
                                to={"/user"}
                                className="block bg-white text-black text-xl px-4 py-1.5 rounded-full h-12 w-12 hover:bg-[#045C99] hover:border-none border flex justify-center items-center"
                            >
                                <FaUser />
                            </Link>
                        </li> :
                            <li>
                                <Link
                                    to={"/signin"}
                                    className="block bg-white text-black text-xl px-4 py-1.5 rounded hover:bg-yellow-400"
                                >
                                    <span className='text-xl'>Join Now</span>
                                </Link>
                            </li>}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;