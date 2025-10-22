import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import { Link } from 'react-router-dom';

const ExExCom = () => {



    const teamMembers = [
        { name: 'Mahfuz Alam Chowdhury', role: 'Chairperson', image: 'https://i.ibb.co.com/gFSpDXMQ/Mahfuz.jpg', fb: 'https://www.facebook.com/share/16MJ91wAbX/', li: 'https://www.linkedin.com/in/md-mahfuz-alam-chowdhury-b25023235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Zuhaer Tanzim', role: 'Vice Chairperson', image: 'https://i.ibb.co.com/Jw5c8r4t/IMG-20250426-022010-473-1.webp', fb: 'https://www.facebook.com/share/1EMPEfL34h/', li: 'https://www.linkedin.com/in/zuhaer-tanzim-737aa223a/' },
        { name: 'Jyoti Prokash Anindya', role: 'Secretary', image: 'https://i.ibb.co.com/35Cf6yBQ/anindya.jpg', fb: 'https://www.facebook.com/share/192D7AJ4hd/', li: '' },
        { name: 'Sabbir Hussain Khan', role: 'Treasurer', image: 'https://i.ibb.co.com/9kw8RLSh/sabbir.jpg', fb: 'https://www.facebook.com/sabbir.khan.465751?rdid=4vcQQaMOJYvh9V7L', li: 'https://www.linkedin.com/in/sabbir-hussain-khan-188892263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    ];

    const [prevExcomm, setprevExcomm] = useState([])
    
        const getallExcom = async () => {
            
            try {
                const response = await fetch(`${BASE_URL}/committee/prevExcom`)
                const data = await response.json()
                console.log(data)
                if(!data.success) return toast.error(data.message)
                setprevExcomm(data.prevExcom)
            } catch (error) {
                console.log(error)
            }
        }
    
        useEffect(() => {
            getallExcom()
        }, [])

    const MemberCard = ({ name, designation, info, hosted_image, facebook, linkedin }) => (
        <div className="p-6 text-center flex-grow">
            <div className="shadow-md p-4 mx-auto w-fit px-5">
                <img src={hosted_image || ''} alt={name} className="w-[200px] h-[200px] mx-auto mb-3 object-cover" loading="lazy" />
                <h3 className="text-xl font-bold">{name}</h3>
                <span className="text-[#045C99]">{designation}</span>
                <p>{info}</p>
                <div className="text-2xl mt-2">
                    <a target='_blank' href={facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>
                    <a target='_blank' href={linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    );

    return (
        prevExcomm.length !== 0 ? <div>
            <section className="text-center mb-10">
                <h1 className="text-3xl font-bold mt-10 text-[#045C99]">Previous Executive Committee Members (2025-2026)</h1>
                <p className="text-gray-600">Leading Innovation and Technology Excellence</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                    {prevExcomm.map((m, idx) => <MemberCard key={idx} {...m} />)}
                </div>
            </section>
        </div>: <div className='min-h-screen flex justify-center items-center flex-col gap-4'>
            <h1>Data not found</h1>
            <Link to={'/membersPage'} className='rounded bg-blue-500 p-2 text-white' >Back to Page</Link>
        </div>
    );
};

export default ExExCom;