import Header from "../components/Header";
import useFetch from "../useFetch";
import TripDetails from "../components/TripDetails";
import { useParams } from "react-router-dom";

const TripDetailPage = () => {
  const { tripId } = useParams();

    const {
    data: tripData,
    loading: tripDataLoading,
    error: tripDataError,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URI}/itineraries/${tripId}`);

  return (
    <div>
      <Header />
      {tripData && tripData?.itinerary ? (
        <TripDetails itineraryData={tripData?.itinerary} />
      ) : (
        <div>
          {tripDataLoading && <p>Generating your trip...</p>}
          {tripDataError && <p className="text-red-500">{tripDataError}</p>}
        </div>
      )}
    </div>
  );
};

export default TripDetailPage;
