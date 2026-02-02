import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Popup from "../components/Popup";
import TripDetails from "../components/TripDetails";
import useFetch from "../useFetch";

export default function Create_Trip() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({});
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [googleError, setgoogleError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    const userDetails = JSON.parse(data);
    setUserInfo(userDetails);
  }, []);
  const { data: usersList } = useFetch(
    `${import.meta.env.VITE_BACKEND_URI}/auth/users`
  );
  const userData =
    usersList &&
    usersList?.users?.length > 0 &&
    usersList?.users?.find((user) => user?.email === userInfo?.email);
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then(async (resp) => {
        console.log(resp);
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/auth/google-login`,
          {
            email: resp?.data?.email,
            name: resp?.data?.name,
            picture: resp?.data?.picture,
          }
        );
        sessionStorage.setItem("user", JSON.stringify(resp?.data));
      })
      .catch((error) => setgoogleError(error))
      .finally(() => {
        window.location.reload();
        setShowPopup(false);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: googleError,
  });

  const handleInputChange = (name, val) => {
    setFormData({
      ...formData,
      [name]: val,
    });
  };
  const onGenerateTrip = async () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      setShowPopup(true);
      return;
    }
    if (!formData?.location || !formData?.noOfDays) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/generate-itinerary`,
        { ...formData, userId: userData?._id }
      );
      console.log("API Response:", response.data);
      setItineraryData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const placeToTravel = [
    // Western Europe
    "Paris, France",
    "London, United Kingdom",
    "Rome, Italy",
    "Barcelona, Spain",
    "Amsterdam, Netherlands",
    "Vienna, Austria",
    "Lisbon, Portugal",
    "Brussels, Belgium",
    "Geneva, Switzerland",
    "Copenhagen, Denmark",
    "Stockholm, Sweden",
    "Oslo, Norway",
    "Helsinki, Finland",
    "Dublin, Ireland",
    "Edinburgh, United Kingdom",
    "Munich, Germany",
    "Nice, France",
    "Porto, Portugal",
    "Zurich, Switzerland",
    "Reykjavik, Iceland",
    // North America
    "New York City, United States",
    "Los Angeles, United States",
    "San Francisco, United States",
    "Toronto, Canada",
    "Vancouver, Canada",
    "Montreal, Canada",
    "Chicago, United States",
    "Miami, United States",
    "Las Vegas, United States",
    "Honolulu, United States",
    // Oceania
    "Sydney, Australia",
    "Melbourne, Australia",
    "Auckland, New Zealand",
    "Queenstown, New Zealand",
  ];
  const daysArray = [1, 2, 3, 4, 5];
  return (
    <>
      <Header />
      <div>
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
          <h2 className="font-bold text-3xl">
            Tell us your travel preferences🌴🏕️
          </h2>
          <p className="mt-3 text-gray-500 text-xl">
            Just provide some basic information, our trip planner will generate
            customize itinerary based on your preferences
          </p>

          <div className="mt-20 flex flex-col gap-10">
            <div>
              <h2 className="text-xl my-3 font-medium">
                What is your destination of choice
              </h2>
              <select
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full border rounded-lg p-2"
                name="place"
                id="place"
              >
                <option name="place" value="">
                  --Select Place to travel--
                </option>
                {placeToTravel?.map((place, index) => (
                  <option key={index} name="place" value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h2 className="text-xl my-3 font-medium">
                How many days are you planning your trip?
              </h2>
              <select
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                className="w-full border rounded-lg p-2"
                name="day"
                id="day"
              >
                <option name="place" value="">
                  --Select Number of Days--
                </option>
                {daysArray?.map((day, index) => (
                  <option key={index} name="day" value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onGenerateTrip}
                className="bg-black hover:bg-yellow-300 text-white hover:text-black hover:border px-4 py-2 rounded-lg transition duration-20"
              >
                Generate Trip
              </button>
            </div>
          </div>

          {loading && <p>Generating your trip...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div>
          {itineraryData && <TripDetails itineraryData={itineraryData} />}
        </div>
        <Popup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          login={login}
        />
      </div>
    </>
  );
}
