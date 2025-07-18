import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Frontend static tutor data with email and image
const tutorExtras = [
  {
    tutorName: 'Nabil Mahmud',
    tutorEmail: 'nabilmahmud@gmail.com',
    tutorImage:
      'https://images.unsplash.com/photo-1565350293547-7f5534d7d466?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Arman Hossain',
    tutorEmail: 'arman@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1661983228572-53ba56325213?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'NusratKhan',
    tutorEmail: 'nusrathum32@gmail.com',
    tutorImage: 'https://scontent.fdac11-1.fna.fbcdn.net/v/t39.30808-6/513887531_1298276085149126_6163175771857747003_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHZyAgrH4JSn5bFRCFQROXh6_Dg3gXSpk7r8ODeBdKmThKm3QWaJnWyWS1NpRMzbWDvz7Z8xAzGRYmen-dPA6s8&_nc_ohc=bEbuuRwlwWwQ7kNvwEg3DKC&_nc_oc=AdmwF-ut3R4O9_FnzGVunQHV3MbTS0HVNCx6lIGgd052zmxgbJZrp5G-sB9M6R0CgX8&_nc_zt=23&_nc_ht=scontent.fdac11-1.fna&_nc_gid=plkuPaepbQ6KstBVERafNQ&oh=00_AfRpalfsaCiaPe9UkDp2AQwBcV5bnEBcE_ujgGIPMpInMQ&oe=687FF8D7',
  },
  {
    tutorName: 'Salma Khatun',
    tutorEmail: 'salma@example.com',
    tutorImage: 'https://i.ibb.co/tYhNMcx/tutor4.jpg',
  },
  {
    tutorName: 'Tania Rahman',
    tutorEmail: 'tania@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1731419223715-aec6664f9011?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Farzana Kabir',
    tutorEmail: 'farzanakabir@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1746513399803-e988cc54e812?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Lubna Sultana',
    tutorEmail: 'lubnakhan@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1737041314398-1af4218a9890?q=80&w=2950&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Sabina Yasmin',
    tutorEmail: 'sabinan@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1673101075633-1732778c8da9?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Kamrul Huda',
    tutorEmail: 'kamrul@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1716471081169-cb8528a395d3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Mehedi Hasan',
    tutorEmail: 'mehedihasan@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1752486268262-6ce6b339a8de?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Imran Haque',
    tutorEmail: 'imran@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1625769347845-0146065e7125?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Shakil Ahmed',
    tutorEmail: 'shakilahmed@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1564518534518-e79657852a1a?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DD',
  },
  {
    tutorName: 'Rifat Khan',
    tutorEmail: 'rifatkhan@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1525567565596-82d85bef8fb6?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    tutorName: 'Arif Chowdhury',
    tutorEmail: 'arifkhan@gmail.com',
    tutorImage: 'https://images.unsplash.com/photo-1640163561337-b0d4161f7ce9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const TutorsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole(user?.email);

  const { data: tutors = [], isLoading } = useQuery({
    enabled: !roleLoading,
    queryKey: ['tutorsFromSessions', user?.email],
    queryFn: async () => {
      let query = '/tutors-from-sessions';
      if (role === 'tutor') {
        const encodedEmail = encodeURIComponent(user.email);
        const encodedName = encodeURIComponent(user.displayName);
        query += `?currentTutorEmail=${encodedEmail}&currentTutorName=${encodedName}`;
      }
      const res = await axiosSecure.get(query);
      return res.data;
    },
  });

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  if (isLoading || roleLoading) return <p className="text-center py-10">Loading Tutors...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">📘 Our Tutors</h2>
      {tutors.length === 0 ? (
        <p className="text-center text-gray-500">No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tutors.map((tutor, index) => {
            // Find extra info by tutorName (case-insensitive match)
            const extra = tutorExtras.find(
              (e) => e.tutorName.toLowerCase() === tutor.tutorName?.toLowerCase()
            );

            const imageUrl = extra?.tutorImage || 'https://i.ibb.co/3B1PrSk/default-avatar.jpg';
            const email = extra?.tutorEmail || 'No email provided';

            return (
              <div
                key={index}
                data-aos="fade-up"
                className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition"
              >
                <img
                  src={imageUrl}
                  alt={tutor.tutorName}
                  className="w-20 h-20 mx-auto mb-3 rounded-full object-cover border"
                />
                <h3 className="text-lg font-semibold">{tutor.tutorName}</h3>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-blue-600 hover:underline block"
                >
                  {email}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TutorsPage;
