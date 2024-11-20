import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Hide alert after 5 seconds
    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [onClose]);
  const icon = type === 'success' ? <FaCheckCircle className="text-green-400 mr-2" /> :
    type === 'warning' ? <FaExclamationTriangle className="text-yellow-500 mr-2" /> :
      <FaTimesCircle className="text-red-500 mr-2" />;

  const textColor = type === 'success' ? 'text-green-400' :
    type === 'warning' ? 'text-yellow-500' :
      'text-red-500';

  return (
    <div className="fixed top-4 right-4 p-4 rounded shadow-lg bg-black border border-gray-600 text-white w-[90%] sm:w-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {icon}
          <span className={`${textColor} font-montserrat text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-wrap`}>{message}</span>
        </div>
        <button onClick={onClose} className="ml-4 text-lg font-bold text-gray-300">&times;</button>
      </div>
    </div>
  );
};

export default function Home() {

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/save-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setAlert({ message: data.message, type: data.type });
    } else {
      setAlert({ message: data.message, type: 'error' });
    }
  };
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center">
      <nav className="bg-black py-4 shadow-b-lg shadow-gray-500 w-full border-b border-gray-800">
        <div className="container mx-auto text-center">
          <h1 className="text-white font-bold-200 text-3xl navbar-title">STILED</h1>
        </div>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 font-montserrat">
          Get Early Access & Exclusive Offers!
        </h1>
        <p className="text-lg text-gray-400 sm:text-2xl mb-8 font-montserrat">
          Be the First to know what&apos;s coming!
        </p>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-400 font-medium mb-2" htmlFor="email">
            Sign up for early access
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              className="flex-grow p-2 w-full rounded-l bg-white text-black text-center  border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button
              className="bg-yellow-400 text-black py-2 px-4 rounded-r flex items-center justify-center w-full sm:w-[50%] focus:outline-none"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-15 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                </>
              ) : (
                'Join Now'
              )}
            </button>
          </div>
        </form>
      </main>
      <footer className="bg-black py-4 mb-8 shadow-b-lg shadow-gray-200 w-full border-t border-gray-800">
        <div className="container mx-auto text-center w-[90%] sm:w-[60%]">
          <p className="text-gray-400 text-sm">
            Join our insider list to receive early access to the latest updates, exclusive offers, and special content. Simply enter your email to stay connected and never miss out on exciting news and deals tailored just for you!
          </p>
        </div>
      </footer>
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: '', type: '' })}
        />
      )}
    </div>
  );
}