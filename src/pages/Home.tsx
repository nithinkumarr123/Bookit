import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import ExperienceCard from '@/components/ExperienceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Static data with correct image URLs for each experience
const sampleExperiences = [
  {
    id: "1",
    name: "Kayaking in Udupi",
    description: "Enjoy a scenic kayaking experience through the beautiful backwaters and mangrove forests with expert guides.",
    price: 999,
    location: "Udupi, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    rating: 4.5
  },
  {
    id: "2",
    name: "Nandi Hills Sunrise",
    description: "Experience breathtaking sunrise views from Nandi Hills with guided early morning trekking and photography.",
    price: 799,
    location: "Bangalore, Karnataka",
    imageUrl: "https://www.treksandtrails.org/blog/wp-content/uploads/2020/08/Nandi-Hills.jpg", // Nandi Hills specific image
    rating: 4.3
  },
  {
    id: "3", 
    name: "Coffee Trail Coorg",
    description: "Walk through lush coffee plantations, learn about coffee cultivation, and enjoy tastings of freshly brewed coffee.",
    price: 1299,
    location: "Coorg, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
    rating: 4.7
  },
  {
    id: "4",
    name: "Boat Cruise Sunderbans", 
    description: "Cruise through the tranquil waters of the Sunderbans and experience the serenity of mangrove forests with wildlife sightings.",
    price: 1499,
    location: "Sunderbans, West Bengal",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
    rating: 4.6
  },
  {
    id: "5",
    name: "Bungee Jumping Manali",
    description: "Experience the thrill of bungee jumping from one of India's highest towers with full safety gear and professional guidance.",
    price: 1599,
    location: "Manali, Himachal Pradesh",
    imageUrl: "https://i1.wp.com/www.bms.co.in/wp-content/uploads/2014/07/bungee-jumping.jpeg",
    rating: 4.8
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExperiences, setFilteredExperiences] = useState(sampleExperiences);

  // Automatic search filter - triggers on every keystroke
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredExperiences(sampleExperiences);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = sampleExperiences.filter((exp) =>
      exp.name.toLowerCase().includes(query) ||
      exp.location.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query)
    );
    
    setFilteredExperiences(filtered);
  }, [searchQuery]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredExperiences(sampleExperiences);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Discover Amazing Experiences
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Book unforgettable adventures and create lasting memories
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-12 animate-slide-down">
          <div className="flex gap-2 w-full max-w-2xl">
            <div className="relative flex-1">
              <Input
                placeholder="Search experiences, locations, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>
            <Button onClick={handleSearch} className="py-6 px-8">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 animate-fade-in">
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {searchQuery ? (
              <span>
                Found <span className="font-semibold text-primary">{filteredExperiences.length}</span> 
                experience{filteredExperiences.length !== 1 ? 's' : ''} for "{searchQuery}"
                {filteredExperiences.length > 0 && (
                  <button
                    onClick={clearSearch}
                    className="ml-2 text-sm text-primary hover:underline"
                  >
                    (Clear search)
                  </button>
                )}
              </span>
            ) : (
              <span>
                Showing <span className="font-semibold text-primary">{filteredExperiences.length}</span> 
                experience{filteredExperiences.length !== 1 ? 's' : ''} available
              </span>
            )}
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperiences.map((experience, index) => (
            <ExperienceCard 
              key={experience.id} 
              experience={experience} 
              index={index}
            />
          ))}
        </div>

        {/* No Results State */}
        {filteredExperiences.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Experiences Found</h3>
              <p className="text-muted-foreground mb-6">
                No results found for "{searchQuery}". Try searching for something else.
              </p>
              <Button 
                onClick={clearSearch}
                variant="outline"
              >
                View All Experiences
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;