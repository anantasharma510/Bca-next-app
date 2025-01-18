'use client'
import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function MembershipConfirmation() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Button Component
  const Button = ({ onClick, children, className, variant = "solid" }) => {
    const baseStyles = "py-2 px-4 rounded-full text-lg transition-colors duration-300";
    const solidStyles = "bg-blue-600 hover:bg-blue-700 text-white font-semibold";
    const outlineStyles = "border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold";

    const buttonClass = variant === "outline" ? outlineStyles : solidStyles;

    return (
      <button onClick={onClick} className={`${baseStyles} ${buttonClass} ${className}`}>
        {children}
      </button>
    );
  };

  // Card Components
  const Card = ({ children, className }) => {
    return (
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
        {children}
      </div>
    );
  };

  const CardHeader = ({ children }) => {
    return <div className="p-6 border-b border-gray-200">{children}</div>;
  };

  const CardContent = ({ children }) => {
    return <div className="p-6">{children}</div>;
  };

  const CardFooter = ({ children }) => {
    return <div className="p-6 border-t border-gray-200">{children}</div>;
  };

  const CardTitle = ({ children }) => {
    return <h2 className="text-3xl font-extrabold text-center text-gray-900">{children}</h2>;
  };

  const CardDescription = ({ children }) => {
    return <p className="text-center text-gray-600 mt-2">{children}</p>;
  };

  return (
    <div>
      <Navbar />
  
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle>Welcome to BCA Student Membership!</CardTitle>
          <CardDescription>Thank you for joining. Your membership is now active.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center text-gray-700">
            <p>Your membership number is: <span className="font-bold">BCA-2023-1234</span></p>
            <p className="mt-2">An email with further details has been sent to your registered email address.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Steps:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Complete your member profile to unlock all benefits</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Explore the online resources in your member dashboard</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Register for upcoming networking events and webinars</span>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center space-x-4">
          <Button className="w-full sm:w-auto" onClick={() => alert('Redirecting to Member Dashboard')}>
            Go to Member Dashboard
          </Button>
          <Button className="w-full sm:w-auto" variant="outline" onClick={togglePopup}>
            View Membership Benefits
          </Button>
        </CardFooter>
      </Card>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full sm:w-96">
            <h3 className="text-xl font-bold mb-4">Membership Benefits</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Access to exclusive online resources</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Monthly industry newsletters</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Networking events and webinars</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Career counseling and job board access</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Discounts on BCA conferences and workshops</span>
              </li>
            </ul>
            <div className="mt-4 flex justify-end">
              <Button onClick={togglePopup}>Close</Button>
            </div>
          </div>
        </div>
        
    
      )}
    </div>
 <Footer />
    </div>
  );
}
