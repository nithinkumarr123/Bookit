import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Home, Download, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, referenceId } = location.state || {};

  const handleGoHome = () => {
    navigate('/');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Booking Confirmed!',
        text: `I just booked an amazing experience! Reference ID: ${referenceId}`,
      });
    } else {
      navigator.clipboard.writeText(`Booking Reference: ${referenceId}`);
    }
  };

  if (!success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <XCircle className="w-14 h-14 text-destructive" />
              </div>
            </div>

            {/* Error Content */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-destructive">Booking Failed</h1>
              <p className="text-muted-foreground text-lg">
                Something went wrong with your booking. Please try again.
              </p>
              {referenceId && (
                <p className="text-sm text-muted-foreground">
                  Reference: <span className="font-mono font-semibold">{referenceId}</span>
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4">
              <Button 
                onClick={handleGoHome}
                className="home-button"
                size="lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </div>

            {/* Support Message */}
            <div className="pt-6">
              <p className="text-xs text-muted-foreground">
                Need help? Contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-14 h-14 text-success" />
            </div>
          </div>

          {/* Success Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-success">Booking Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Your adventure is booked and confirmed!
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Reference ID</p>
              <p className="font-mono font-bold text-lg text-foreground">
                {referenceId}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleGoHome}
              className="home-button flex-1"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            
            <Button 
              onClick={handleShare}
              variant="outline"
              className="share-button"
              size="lg"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>

          {/* Additional Info */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Download className="w-4 h-4" />
              <span>Confirmation email sent to your inbox</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Please arrive 15 minutes before your scheduled time with your ID
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;