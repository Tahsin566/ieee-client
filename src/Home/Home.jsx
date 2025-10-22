import React,{useState,useEffect} from 'react';
import About from './About/About';
import ResourcesAndRecordings from './Resources/ResourcesAndRecordings';
import Countdown from './Countdown/Countdown';
import Committee from './Committee/CurrentCommittee';
import RecentNews from './RecentNews/RecentNews';
import Banner from './Banner/Banner';
import { BASE_URL } from '../../constants';

const Home = () => {
    
    const [data, setData] = useState()
    const [events, setEvents] = useState();
    const [excomm, setExcomm] = useState([])
    const [banner, setBanner] = useState([])
    const [newsData, setNewsData] = useState([]);
    
    const getAbout = async () => {
        try {
            const response = await fetch(`${BASE_URL}/ieee`, {
            })
            const data = await response.json()
            if(!response.ok){
                return
            }
            setData(data?.ieee[0])
            
        } catch (error) {
            console.log(error)
        }
    }


    const getEvents = async () => {
        try {
            const response = await fetch(`${BASE_URL}/banner`, {
                method: 'GET'
            })
            const data = await response.json()
            if (!response.ok) {
                return
            }
            setEvents(data?.banner)
        } catch (error) {
            console.log(error)
        }
    }



  const getallExcom = async () => {

    try {
      const response = await fetch(`${BASE_URL}/committee/excom`)
      const data = await response.json()
      if (!data.success) return toast.error(data.message)
      setExcomm(data.excom)
    } catch (error) {
      console.log(error)
    }
  }

  const getcountdown = async () => {
    try {
        const response = await fetch(`${BASE_URL}/event/get-upcoming-event`, {
            method: 'GET'
        })
        const data = await response.json()
        if (!data.success) {
            return
        }
        setBanner(data?.events || [])
    } catch (error) {
        console.log(error)
    }
}


   
const getNews = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/news/recent`,{
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            setNewsData(data);
        } catch (error) {
            console.log(error);
        }
    }

    
  

    React.useEffect(() => {

        Promise.allSettled([
            getAbout(),
            getEvents(),
            getcountdown(),
            getNews(),
            getallExcom()    
        ])
    }, [])

    return (
        <div>
            
            <div className='mb-[100px]'>
                <Banner events={events}></Banner>
            </div>
            {/* <div className='mb-[100px]'>
                <Countdown banner={banner}></Countdown>
            </div> */}
            <div className='mb-[100px]'>
                <About data={data}></About>
            </div>
            <div className='mb-200px'>
                <RecentNews newsData={newsData}></RecentNews>
            </div>
            <div className='mb-200px'>
                <Committee excomm={excomm}></Committee>
            </div>
            <div className=''>
                <ResourcesAndRecordings></ResourcesAndRecordings>
            </div>

            
        </div>
    );
};

export default Home;