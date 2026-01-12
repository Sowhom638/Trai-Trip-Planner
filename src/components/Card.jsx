import { Link } from "react-router-dom";

const Card = ({ 
  heading, 
  description,
  id
}) => {
  return (
    <Link to={`/trips/${id}`} className={`rounded-xl shadow-md hover:shadow-lg shadow-amber-600 transition-shadow duration-300 p-6 mt-6 border-2 border-black bg-yellow-300`}>
      <h3 className={`text-xl font-bold text-orange-600 mb-2`}>
        {heading}
      </h3>
      <p className={`text-gray-600 leading-relaxed`}>
        {description}
      </p>
    </Link>
  );
};

export default Card;