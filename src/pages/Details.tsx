import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Calendar, Clock, Users, MapPin } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Static data with correct image URLs
const allExperiences = [
  {
    id: "1",
    name: "Kayaking in Udupi",
    description: "Enjoy a scenic kayaking experience through the beautiful backwaters and mangrove forests with expert guides.",
    price: 999,
    location: "Udupi, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    rating: 4.5,
    fullDescription: "Paddle through serene backwaters surrounded by lush mangrove forests in Udupi. Our kayaking adventure is suitable for both beginners and experienced kayakers. Expert guides will accompany you, sharing insights about the local ecosystem and ensuring your safety throughout the journey. Experience the tranquility of nature while getting a great workout!"
  },
  {
    id: "2",
    name: "Nandi Hills Sunrise",
    description: "Experience breathtaking sunrise views from Nandi Hills with guided early morning trekking and photography.",
    price: 799,
    location: "Bangalore, Karnataka",
    imageUrl: "https://www.treksandtrails.org/blog/wp-content/uploads/2020/08/Nandi-Hills.jpg", // Nandi Hills specific image
    rating: 4.3,
    fullDescription: "Wake up early for an unforgettable sunrise experience at Nandi Hills, just a short drive from Bangalore. Our guided tour includes comfortable transportation, light breakfast, and photography guidance. Watch the sun rise over the mist-covered hills, creating a magical atmosphere. Perfect for nature lovers, photographers, and anyone looking to escape the city hustle."
  },
  {
    id: "3", 
    name: "Coffee Trail Coorg",
    description: "Walk through lush coffee plantations, learn about coffee cultivation, and enjoy tastings of freshly brewed coffee.",
    price: 1299,
    location: "Coorg, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
    rating: 4.7,
    fullDescription: "Discover the journey of coffee from bean to cup in the beautiful hills of Coorg, known as the 'Scotland of India'. Walk through aromatic coffee plantations, learn about different coffee varieties and processing methods from local growers. Includes interactive sessions on coffee roasting, brewing techniques, and tasting sessions of freshly brewed Coorg coffee amidst stunning plantation views."
  },
  {
    id: "4",
    name: "Boat Cruise Sunderbans", 
    description: "Cruise through the tranquil waters of the Sunderbans and experience the serenity of mangrove forests with wildlife sightings.",
    price: 1499,
    location: "Sunderbans, West Bengal",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    rating: 4.6,
    fullDescription: "Embark on a peaceful journey through the world's largest mangrove forest - the Sunderbans. Our guided boat cruise takes you through narrow creeks and wide rivers where you can spot exotic wildlife including royal Bengal tigers, spotted deer, crocodiles, and various bird species. Learn about the unique ecosystem from experienced naturalists while enjoying the serene beauty of this UNESCO World Heritage Site."
  },
  {
    id: "5",
    name: "Bungee Jumping Manali",
    description: "Experience the thrill of bungee jumping from one of India's highest towers with full safety gear and professional guidance.",
    price: 1599,
    location: "Manali, Himachal Pradesh",
    imageUrl: "https://i1.wp.com/www.bms.co.in/wp-content/uploads/2014/07/bungee-jumping.jpeg",
    rating: 4.8,
    fullDescription: "Get ready for the adventure of a lifetime in the picturesque mountains of Manali! Our bungee jumping experience takes place from one of North India's highest jump points. With state-of-the-art safety equipment, experienced instructors, and comprehensive safety briefing, you'll experience an adrenaline rush like never before. Perfect for adventure enthusiasts looking to conquer their fears amidst stunning Himalayan scenery."
  }
];

// Mock slots data for booking
const mockSlots = [
  { date: "2024-11-06", time: "01:00 pm", capacity: 8 },
  { date: "2024-11-06", time: "11:00 am", capacity: 6 },
  { date: "2024-11-07", time: "01:00 pm", capacity: 10 },
  { date: "2024-11-07", time: "11:00 am", capacity: 4 },
  { date: "2024-11-08", time: "01:00 pm", capacity: 12 },
  { date: "2024-11-08", time: "11:00 am", capacity: 7 }
];

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Find the experience by ID
  const experience = allExperiences.find(exp => exp.id === id);

  // Set default selected date
  useEffect(() => {
    if (mockSlots.length > 0) {
      const uniqueDates = Array.from(new Set(mockSlots.map((s) => s.date)));
      setSelectedDate(uniqueDates[0]);
    }
  }, []);

  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Experience Not Found</h1>
            <p className="text-muted-foreground mb-6">The experience you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const availableSlots = mockSlots.filter((s) => s.date === selectedDate);
  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handleConfirm = () => {
    if (selectedSlot) {
      navigate("/checkout", {
        state: {
          experience,
          slot: selectedSlot,
          quantity,
          subtotal,
          taxes,
          total,
        },
      });
    }
  };

  const uniqueDates = Array.from(new Set(mockSlots.map((s) => s.date)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Experiences
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Image with loading state */}
            <div className="aspect-[16/9] overflow-hidden rounded-lg relative bg-muted/50">
              <img
                src={experience.imageUrl}
                alt={experience.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Title and Description */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{experience.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{experience.fullDescription}</p>
            </div>

            {/* Date Selection */}
            <div>
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Choose date
              </h2>
              <div className="flex gap-2 flex-wrap">
                {uniqueDates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Choose time
              </h2>
              <div className="flex gap-2 flex-wrap">
                {availableSlots.map((slot) => (
                  <Button
                    key={`${slot.date}_${slot.time}`}
                    variant={selectedSlot?.time === slot.time ? "default" : "outline"}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={slot.capacity <= 0}
                  >
                    {slot.time}
                    {slot.capacity > 0 && slot.capacity < 5 && (
                      <span className="text-xs text-destructive ml-2">
                        {slot.capacity} left
                      </span>
                    )}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            {/* About Section */}
            <div>
              <h2 className="font-semibold mb-2">About this experience</h2>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Professional guides, safety equipment provided, and unforgettable memories guaranteed. 
                    Minimum age 10. Duration 3-4 hours. All skill levels welcome.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Starts at</span>
                  <span className="font-bold text-lg">₹{experience.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!selectedSlot || quantity >= (selectedSlot.capacity || 10)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
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
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={!selectedSlot}
                  onClick={handleConfirm}
                >
                  {selectedSlot ? "Confirm Booking" : "Select Time to Continue"}
                </Button>

                {selectedSlot && selectedSlot.capacity > 0 && selectedSlot.capacity < 3 && (
                  <div className="text-center text-xs text-destructive">
                    Only {selectedSlot.capacity} spot{selectedSlot.capacity > 1 ? 's' : ''} left!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;