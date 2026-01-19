# TRai - trip planner
An AI trip planner app including user authentication allows users to generate personalized travel itineraries by simply entering a destination name and the number of days they plan to stay. Each generated
itinerary includes a day-wise breakdown of suggested activities.

Built with React frontend, Express/Node backend, Google OAuth authentication and MongoDB database.

---

## Demo Link
[Live Demo](https://trai-trip-planner-rsx8.vercel.app)

---

## Quick Start
```
git clone https://github.com/Sowhom638/Trai-Trip-Planner
cd <Your-Repo>
npm install
npm run dev
```
---

## Technologies
- React JS
- React Router Dom
- Tailwind CSS
- Google OAuth
- Node JS
- Express JS
- MongoDB

---

## Features
**Google Authentication**
- User can Sign in/Sign up using gmail account

**Itinerary Generator**
- User can enter place's name and number of days they want to travel that place from dropdown and     generate the itinerary of that trip.

**Trip History Dashboard**
- User can see previous trip histories

---

## API References
### Itineraries
**POST /generate-itinerary**
Create a new itinerary
Sample Response
```
{ _id, 
userId, 
location, 
noOfDays, 
itinerary: [
    day 1: {
        places: [
            {
                _id,
                placeName,
                bestTimeToVisit,
                placeDetails,
                timeToTravelFromPrevious
            },
            {
                _id,
                placeName,
                bestTimeToVisit,
                placeDetails,
                timeToTravelFromPrevious
            }
        ]
    },
    day 2: { ... },
    day 3: { ... },
]
}
```

**GET /itineraries**
Get all Itineraries
Sample Response
```
[
{ _id, 
userId, 
location, 
noOfDays, 
itinerary: [
    day 1: {
        places: [
            {
                _id,
                placeName,
                bestTimeToVisit,
                placeDetails,
                timeToTravelFromPrevious
            },
            {
                _id,
                placeName,
                bestTimeToVisit,
                placeDetails,
                timeToTravelFromPrevious
            }
        ]
    },
    day 2: { ... },
    day 3: { ... },
]
},
{ _id, 
userId, 
location, 
noOfDays, 
itinerary: [
    day 1: {
        places: [
            {
                _id,
                placeName,
                bestTimeToVisit,
                placeDetails,
                timeToTravelFromPrevious
            },
            {
                _id,
                placeName,
                bestTimeToVisit,
                placeDetails,
                timeToTravelFromPrevious
            }
        ]
    },
    day 2: { ... },
    day 3: { ... },
]
},
...
]
```

**GET /itineraries/:id**
Get Itineraries by it's id
Sample Response
```
{ _id, 
userId, 
location, 
noOfDays, 
itinerary: [
    day 1: {
        places: [
            {
                _id,
                placeName,
                bestTimeToVisit,
                placeDetails,
                timeToTravelFromPrevious
            },
            {
                _id,
                placeName,
                bestTimeToVisit,
                placeDetails,
                timeToTravelFromPrevious
            }
        ]
    },
    day 2: { ... },
    day 3: { ... },
]
}
```

**GET /auth/users**
Get all users
Sample Response
```
[
    {_id, name, email, picture, createdAt},
    {_id, name, email, picture, createdAt}
]
```

**POST /auth/google-login**
Create new user
Sample Response
```
{_id, name, email, picture, createdAt}
```

---

## Contact
for bugs informing or feature requesting , reach out to ghoshsowhom638@gmail.com
