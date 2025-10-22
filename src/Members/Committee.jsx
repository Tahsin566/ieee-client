import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import { Link } from 'react-router-dom';
const Committee = () => {

    const [member, setMember] = useState()
    const [loading, setLoading] = useState(false)

    const getMember = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/committee`)
            const data = await response.json()
            if (!data?.success) {
                return
            }
            setMember(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getMember()
    }, [])


    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-30 w-30 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }

    return (
        <div>
            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Program Coordinator</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.programCoordinator?.map((person, index) => (
                        <div className="p-6 text-center flex-col justify-between" key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                            {/* <button className="text-black hover:text-[#045C99] bg-red-500 px-4 py-2 rounded text-white mt-3" onClick={() => { navigate(`/details?id=${person?.IEEEID}&name=${person?.name}`) }}>View</button> */}
                        </div>
                    ))}
                </div>:null}

        
            </div>

            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Publicity Coordinator</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {member?.publicity?.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.publicity?.map((person, index) => (

                        <div className="p-6 text-center flex-col justify-between" key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                                {/* <button className="text-black hover:text-[#045C99] bg-red-500 px-4 py-2 rounded text-white mt-3" onClick={() => { navigate(`/details?id=${person?.IEEEID}&name=${person?.name}`) }}>View</button> */}
                            
                        </div>
                    ))}
                </div>}
            </div>
            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Webmaster</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.webmaster?.map((person, index) => (
                        <div className="p-6 text-center flex-col justify-between" key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover object-[50%_10%] mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                            {/* <button className="text-black hover:text-[#045C99] bg-red-500 px-4 py-2 rounded text-white mt-3" onClick={() => { navigate(`/details?id=${person?.IEEEID}&name=${person?.name}`) }}>View</button> */}
                        </div>
                    ))}
                </div>:null}
            </div>

            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Photo and Video Content Executive</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.photoandVideoExec?.map((person, index) => (

                        <div className="p-6 text-center " key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>


            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Publication & Newsletter Coordinator</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.pulicationsNewsletter?.map((person, index) => (

                        <div className="p-6 text-center " key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>




            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Membership Development Coordinator</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.memberDev?.map((person, index) => (

                        <div className="p-6 text-center " key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Logistic Executive</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.logistics?.map((person, index) => (

                        <div className="p-6 text-center " key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Graphics Design Executive</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.graphicDesigner?.map((person, index) => (

                        <div className="p-6 text-center " key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC Chief Reporting Executive</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.chiefReporting?.map((person, index) => (

                        <div className="p-6 text-center " key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover object-[50%_25%] mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
            <div className=" text-white">
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4">IEEE CS LU SBC ACM Coordinator</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>

                {true && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-6 pb-12">
                    {member?.acmCoordinator?.map((person, index) => (

                        <div className="p-6 text-center " key={index}>
                            <div className="shadow-md p-4 mx-auto w-fit px-10 text-black h-[350px]">
                                <Link to={`/details?id=${person?.IEEEID}&name=${person?.name}`}>
                                    <img src={person?.hosted_image ? person?.hosted_image : '/img/user.png'} alt={person?.name} loading="lazy" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                                </Link>
                                <h3 className="text-xl font-bold">{person?.name}</h3>
                                <span className="text-[#045C99]">{person?.designation}</span>
                                <p className='w-[150px] mx-auto'>{person?.IEEEID}</p>
                                <div className="text-2xl mt-2">
                                    {person?.facebook && <a target="_blank" href={person?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>}
                                    {person?.linkedin && <a target="_blank" href={person?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
            <div>
                <div className="text-center py-12 bg-black">
                    <h1 className="text-3xl font-bold py-4 text-white">IEEE CS LU SBC Youth Support Executive</h1>
                    <p className="text-gray-200">Dedicated professionals building the digital future of IEEE CS LU SBC</p>
                </div>
                {true && <div className="">
                    {member?.youthSupport?.map((person, index) => (
                        <div className="p-6 text-center " key={index}>

                            <h3 className="text-xl text-center font-bold">{person?.name}</h3>

                        </div>
                    ))}
                </div>}
            </div>
        </div>
    );
};

export default Committee;