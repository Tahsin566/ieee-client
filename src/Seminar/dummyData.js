/**
 * Dummy Data for Seminar/Webinar Feature
 * 
 * This file contains mock data to test the seminar pages without backend connection.
 * Replace these API calls with actual backend calls when ready.
 * 
 * Data includes:
 * - 8 sample seminars/webinars
 * - Mix of upcoming and completed events
 * - Various categories (technical, workshop, career, research)
 * - Both seminar and webinar types
 * - Sample speaker information with photos
 * - Google Drive links for materials
 */

export const dummySeminars = [
    {
        _id: '1',
        title: 'Introduction to Machine Learning and AI',
        description: 'Explore the fundamentals of machine learning and artificial intelligence. Learn about neural networks, deep learning, and practical applications in modern technology. This seminar covers essential concepts for beginners and intermediate learners.',
        bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        speaker: {
            name: 'Dr. Sarah Johnson',
            designation: 'AI Research Scientist',
            organization: 'Tech Innovations Lab',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        date: '2025-12-15T00:00:00.000Z',
        time: '14:00',
        location: 'Room 301, Engineering Building',
        type: 'seminar',
        category: 'technical',
        driveLink: 'https://drive.google.com/drive/folders/example1',
        status: 'upcoming',
        isFeatured: true,
        registrationLink: 'https://forms.google.com/example1'
    },
    {
        _id: '2',
        title: 'Web Development Bootcamp: React & Node.js',
        description: 'A comprehensive workshop on modern web development using React and Node.js. Build full-stack applications from scratch and learn industry best practices. Hands-on coding sessions included.',
        bannerImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        speaker: {
            name: 'John Smith',
            designation: 'Senior Full Stack Developer',
            organization: 'WebTech Solutions',
            photo: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        date: '2025-12-10T00:00:00.000Z',
        time: '10:00',
        location: 'Online via Zoom',
        type: 'webinar',
        category: 'workshop',
        driveLink: 'https://drive.google.com/drive/folders/example2',
        status: 'upcoming',
        isFeatured: false,
        registrationLink: 'https://forms.google.com/example2'
    },
    {
        _id: '3',
        title: 'Career Growth in Software Engineering',
        description: 'Learn from industry experts about building a successful career in software engineering. Topics include resume building, interview preparation, networking strategies, and career advancement tips.',
        bannerImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
        speaker: {
            name: 'Michael Chen',
            designation: 'Engineering Manager',
            organization: 'Google',
            photo: 'https://randomuser.me/api/portraits/men/45.jpg'
        },
        date: '2025-12-20T00:00:00.000Z',
        time: '16:30',
        location: 'Auditorium Hall',
        type: 'seminar',
        category: 'career',
        driveLink: 'https://drive.google.com/drive/folders/example3',
        status: 'upcoming',
        isFeatured: false,
        registrationLink: 'https://forms.google.com/example3'
    },
    {
        _id: '4',
        title: 'Cybersecurity Fundamentals',
        description: 'Understanding modern cybersecurity threats and protection mechanisms. Learn about encryption, network security, ethical hacking basics, and how to protect your digital assets.',
        bannerImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        speaker: {
            name: 'Emily Davis',
            designation: 'Security Analyst',
            organization: 'CyberShield Inc.',
            photo: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        date: '2025-11-25T00:00:00.000Z',
        time: '13:00',
        location: 'Lab 205',
        type: 'webinar',
        category: 'technical',
        driveLink: 'https://drive.google.com/drive/folders/example4',
        status: 'completed',
        isFeatured: false,
        registrationLink: ''
    },
    {
        _id: '5',
        title: 'Research Paper Writing Workshop',
        description: 'Master the art of academic writing. Learn how to structure research papers, conduct literature reviews, present data effectively, and get published in top-tier journals.',
        bannerImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
        speaker: {
            name: 'Prof. Robert Williams',
            designation: 'Professor of Computer Science',
            organization: 'Leading University',
            photo: 'https://randomuser.me/api/portraits/men/67.jpg'
        },
        date: '2025-12-05T00:00:00.000Z',
        time: '15:00',
        location: 'Conference Room A',
        type: 'workshop',
        category: 'research',
        driveLink: 'https://drive.google.com/drive/folders/example5',
        status: 'upcoming',
        isFeatured: false,
        registrationLink: 'https://forms.google.com/example5'
    },
    {
        _id: '6',
        title: 'Cloud Computing with AWS',
        description: 'Dive into cloud computing using Amazon Web Services. Learn about EC2, S3, Lambda, and other AWS services. Build scalable cloud-based applications.',
        bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        speaker: {
            name: 'Amanda Rodriguez',
            designation: 'Cloud Solutions Architect',
            organization: 'Amazon Web Services',
            photo: 'https://randomuser.me/api/portraits/women/55.jpg'
        },
        date: '2025-11-20T00:00:00.000Z',
        time: '11:00',
        location: 'Online via Microsoft Teams',
        type: 'webinar',
        category: 'technical',
        driveLink: 'https://drive.google.com/drive/folders/example6',
        status: 'completed',
        isFeatured: false,
        registrationLink: ''
    },
    {
        _id: '7',
        title: 'Data Science and Analytics',
        description: 'Explore the world of data science. Learn data analysis techniques, statistical modeling, data visualization, and how to extract insights from large datasets.',
        bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        speaker: {
            name: 'Dr. David Kumar',
            designation: 'Data Science Lead',
            organization: 'DataViz Corp',
            photo: 'https://randomuser.me/api/portraits/men/78.jpg'
        },
        date: '2025-12-12T00:00:00.000Z',
        time: '09:30',
        location: 'Room 402',
        type: 'seminar',
        category: 'technical',
        driveLink: 'https://drive.google.com/drive/folders/example7',
        status: 'upcoming',
        isFeatured: false,
        registrationLink: 'https://forms.google.com/example7'
    },
    {
        _id: '8',
        title: 'IoT and Smart Systems',
        description: 'Understanding Internet of Things and its applications. Learn about sensors, microcontrollers, communication protocols, and building smart systems for real-world problems.',
        bannerImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800',
        speaker: {
            name: 'Lisa Zhang',
            designation: 'IoT Engineer',
            organization: 'Smart Solutions Ltd',
            photo: 'https://randomuser.me/api/portraits/women/72.jpg'
        },
        date: '2025-11-28T00:00:00.000Z',
        time: '14:30',
        location: 'Electronics Lab',
        type: 'workshop',
        category: 'technical',
        driveLink: 'https://drive.google.com/drive/folders/example8',
        status: 'completed',
        isFeatured: false,
        registrationLink: ''
    }
];

export const dummyFeaturedSeminar = dummySeminars.find(s => s.isFeatured);

export const dummyUpcomingSeminars = dummySeminars.filter(s => s.status === 'upcoming');
