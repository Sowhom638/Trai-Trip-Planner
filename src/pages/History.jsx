import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import useFetch from '../useFetch';

const History = () => {
  // Sample trip history data (replace with real data later)
  const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      const data = sessionStorage.getItem("user");
      const userDetails = JSON.parse(data);
      setUserInfo(userDetails);
    }, []);
    
    const { data: usersList } = useFetch(`${import.meta.env.VITE_BACKEND_URI}/auth/users`);
    const userData =
      usersList &&
      usersList?.users?.length > 0 &&
      usersList?.users?.find((user) => user?.email === userInfo?.email);
  const {data: triplists, loading: tripHistoryLoading, error: tripHistoryError } = useFetch(`${import.meta.env.VITE_BACKEND_URI}/itineraries`)

    const tripHistory = triplists && triplists?.itineraries?.length>0 && triplists?.itineraries?.filter((itinerary)=>itinerary?.userId === userData?._id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 py-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-gray-800">
            Your Trip History 🗺️
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Revisit your past adventures or regenerate itineraries anytime.
          </p>
        </div>

        {/* Card Grid */}
        {tripHistory && tripHistory?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripHistory?.map((trip) => (
              <Card
                key={trip?._id}
                id={trip?._id}
                heading={trip?.location}
                description={`${trip?.noOfDays} Day${trip?.noOfDays > 1 ? "s" : ""} trip`}
                className="hover:-translate-y-1 transition-transform duration-300"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            { tripHistoryLoading && <p className="text-center">Loading...</p> }
            { tripHistoryError ? <p className="text-center">{tripHistoryError}</p> 
            : <div><div className="text-gray-400 text-5xl mb-4">📭</div>
            <h3 className="text-xl font-medium text-gray-700">No trips yet</h3>
            <p className="text-gray-500 mt-2">
              Plan your first trip and it will appear here!
            </p>
          </div>
          }
          </div>
        )}
      </div>
    </div>
  );
};

export default History;