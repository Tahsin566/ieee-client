import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../constants';
import { Link } from 'react-router-dom';
import { User, User2 } from 'lucide-react';

const Committee = ({excomm}) => {

  return (
    <section className="my-24 mx-12">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Current ExCom {new Date(Date.now()).getFullYear()}</h2>
      <div className="flex flex-wrap justify-center gap-5 lg:gap-24">
        {excomm.map((member, index) => (
          <div key={index} className="text-center max-w-[280px] mt-3">
            <div className="">
            <Link to={`/details?id=${member.IEEEID}&name=${member.name}&path=home`}>
              {member.hosted_image ? <img className='w-50 h-50 bg-gray-300 object-cover rounded-full mx-auto mb-3' src={member?.hosted_image} alt={`${member.name}`} /> : <User2 className="w-50 h-50 bg-gray-300 object-contain rounded-full mx-auto mb-3" size={20}/>}
            </Link>
            </div>
            <div className="font-semibold text-lg text-black leading-7">{member.name}</div>
            <div className="text-sm font-normal leading-5 text-[#045C99]">{member.designation}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Committee;