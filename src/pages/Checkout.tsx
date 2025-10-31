import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Sparkles, X } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, slot, quantity, subtotal, taxes } = location.state || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!experience || !slot) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Invalid checkout data</p>
        </div>
      </div>
    );
  }

  const finalTotal = subtotal + taxes - promoDiscount;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      alert('Please enter a promo code');
      return;
    }

    if (promoCode === 'SAVE10') {
      const discount = Math.round(subtotal * 0.1);
      setPromoDiscount(discount);
      setAppliedPromo(promoCode);
      setPromoCode('');
    } else if (promoCode === 'FLAT100') {
      setPromoDiscount(100);
      setAppliedPromo(promoCode);
      setPromoCode('');
    } else {
      alert('Invalid promo code. Try SAVE10 or FLAT100');
    }
  };

  const handleRemovePromo = () => {
    setPromoDiscount(0);
    setAppliedPromo('');
    setPromoCode('');
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !email.includes('@') || !agreedToTerms) {
      alert('Please fill all required fields correctly');
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const bookingId = `BKG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      navigate('/result', {
        state: { success: true, referenceId: bookingId },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Full name *</label>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Promo code</label>
                  
                  {/* Applied Promo Code Display */}
                  {appliedPromo && (
                    <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-800 font-medium">
                          Promo code <span className="font-bold">{appliedPromo}</span> applied! 
                          Save ₹{promoDiscount}
                        </span>
                      </div>
                      <Button
                        onClick={handleRemovePromo}
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-800 hover:bg-green-100"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      disabled={!!appliedPromo}
                    />
                    {appliedPromo ? (
                      <Button 
                        onClick={handleRemovePromo}
                        variant="secondary"
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button onClick={handleApplyPromo} variant="secondary">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Apply
                      </Button>
                    )}
                  </div>
                  
                  {/* Promo code hints */}
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p>Try: <span className="font-mono">SAVE10</span> (10% off) or <span className="font-mono">FLAT100</span> (₹100 off)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    I agree to the terms and safety policy *
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Experience</h3>
                  <p className="font-medium">{experience.name}</p>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>
                      {new Date(slot.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span>{slot.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Qty</span>
                    <span>{quantity}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>₹{taxes}</span>
                  </div>
                  
                  {/* Promo Discount Line */}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 animate-bounce-in">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Discount ({appliedPromo})
                        <button 
                          onClick={handleRemovePromo}
                          className="ml-1 text-red-500 hover:text-red-700"
                          title="Remove promo code"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                      <span>-₹{promoDiscount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary text-xl">₹{finalTotal}</span>
                  </div>

                  {/* Savings indicator */}
                  {promoDiscount > 0 && (
                    <div className="text-center text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                      You save ₹{promoDiscount}!
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleSubmit} 
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Pay ₹${finalTotal}`}
                </Button>

                <div className="text-center text-xs text-muted-foreground mt-4">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Secure SSL Encrypted Payment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Add CSS for bounce animation */}
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Checkout;