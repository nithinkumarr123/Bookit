import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  experience: {
    id: string;
    name: string;
    description: string;
    price: number;
    location: string;
    imageUrl: string;
    rating?: number;
  };
  index?: number;
}

const ExperienceCard = ({ experience, index = 0 }: ExperienceCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-lg transition-all duration-300",
      "animate-card-in",
      "hover:scale-[1.02]"
    )}
    style={{ animationDelay: `${index * 100}ms` }}>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={experience.imageUrl}
          alt={experience.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight">{experience.name}</h3>
          <div className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md whitespace-nowrap shrink-0">
            <MapPin className="w-3 h-3" />
            <span>{experience.location}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{experience.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-muted-foreground">From </span>
            <span className="font-bold text-lg">₹{experience.price}</span>
          </div>
          <Button 
            onClick={() => navigate(`/details/${experience.id}`)}
            size="sm"
            className="group"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;