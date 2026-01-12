import { FcGoogle } from "react-icons/fc";


const Popup = ({ isOpen, onClose, login }) => {
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 p-6 bg-white rounded-xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* Hello World Content */}
        <div className="text-center py-4">
          <span className=" bg-black p-1 pr-2 rounded text-yellow-300 font-bold tracking-tight text-2xl mb-5">
            🛩TRai
          </span>
          <br />
          <br />
          <p className="text-gray-600 mb-2">
            Sign in Trai using Google Authentication
          </p>
          <div className="flex justify-center">
            <button
              onClick={login}
              className="flex gap-3 items-center bg-black hover:bg-yellow-300 text-white hover:text-black hover:border px-4 py-2 rounded-full transition duration-20"
            >
              <FcGoogle /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
