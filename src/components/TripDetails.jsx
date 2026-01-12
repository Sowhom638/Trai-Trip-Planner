import React from "react";

const TripDetails = ({ itineraryData }) => {
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <hr />
      <h3 className="text-2xl font-bold my-4">
        Your {itineraryData?.noOfDays} Day
        {itineraryData?.noOfDays > 1 ? "s" : ""} Itinerary for{" "}
        {itineraryData?.location}
      </h3>
      <hr />
      <br />
      {itineraryData?.itinerary?.map((dayPlan) => (
        <div
          key={dayPlan?.day}
          className="mb-6 p-4 border rounded-lg bg-white shadow-sm"
        >
          <h4 className="text-xl font-semibold mb-3">Day {dayPlan?.day}</h4>
          <ul className="space-y-3">
            {dayPlan?.places?.map((place, idx) => (
              <li key={idx} className="border-l-4 border-orange-600 pl-3 py-1">
                <div className="font-medium">{place?.placeName}</div>
                <div className="text-sm text-gray-600">
                  {place?.bestTimeToVisit}
                </div>
                <div className="text-sm mt-1">{place.placeDetails}</div>
                {place?.timeToTravelFromPrevious !== "0 mins" && (
                  <div className="text-xs text-gray-500 italic">
                    + {place?.timeToTravelFromPrevious} from previous
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TripDetails;
