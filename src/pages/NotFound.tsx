import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleGoHome = () => {
    const button = document.querySelector('.home-button');
    button?.classList.add('animate-success-pulse');
    
    setTimeout(() => {
      navigate("/");
    }, 400);
  };

  const handleGoBack = () => {
    const button = document.querySelector('.back-button');
    button?.classList.add('animate-pulse');
    
    setTimeout(() => {
      navigate(-1);
    }, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className={`text-center max-w-md w-full transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
      }`}>
        {/* Animated Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-bounce-in">
              <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
            </div>
            <div className="absolute inset-0 border-4 border-red-200 rounded-full animate-ping-slow"></div>
          </div>
        </div>

        {/* Error Code with Animation */}
        <h1 className="mb-4 text-6xl font-bold text-gray-800 animate-fade-in delay-300">
          404
        </h1>

        {/* Error Message */}
        <div className="mb-6 animate-slide-up delay-500">
          <p className="text-xl text-gray-600 mb-2">Oops! Page not found</p>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            The page <span className="font-mono text-red-500">{location.pathname}</span> doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in delay-700">
          <Button 
            onClick={handleGoHome}
            className="home-button transition-all duration-300 hover:scale-105 bg-blue-500 hover:bg-blue-600"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
          
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="back-button transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 animate-fade-in delay-1000">
          <p className="text-xs text-gray-400 mb-2">Need help?</p>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.location.reload()}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reload Page
          </Button>
        </div>

        {/* Floating Elements for Visual Interest */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-float-reverse"></div>
        <div className="absolute top-1/4 -right-6 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-float-delayed"></div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-180deg); }
        }
        
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-10px) scale(1.1); }
          66% { transform: translateY(10px) scale(0.9); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes successPulse {
          0% { transform: scale(1); background-color: rgb(59 130 246); }
          50% { transform: scale(1.05); background-color: rgb(37 99 235); }
          100% { transform: scale(1); background-color: rgb(59 130 246); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounceIn 1s ease-out forwards;
        }
        
        .animate-ping-slow {
          animation: pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: floatReverse 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 0.4s ease-in-out;
        }
        
        .animate-success-pulse {
          animation: successPulse 0.4s ease-in-out;
        }
        
        /* Delay utilities */
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
};

export default NotFound;