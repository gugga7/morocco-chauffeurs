export interface City {
  slug: string;
  tier: 1 | 2 | 3;
  airport: {
    code: string;
    distanceKm: number;
    driveMinutes: [number, number];
  } | null;
  landmarks: string[];
  availableServices: string[];
  availableVehicles: string[];
  routesFrom: string[];
  faqKeys: string[];
  heroImage: string;
}

export interface Service {
  slug: string;
  icon: string;
  availableCities: string[];
  availableVehicles: string[];
  faqKeys: string[];
  heroImage: string;
}

export interface Vehicle {
  slug: string;
  category:
    | "sedan"
    | "luxury-sedan"
    | "suv"
    | "luxury-suv"
    | "van"
    | "sprinter"
    | "minibus"
    | "coach";
  capacity: number;
  luggageCapacity: number;
  features: string[];
  availableServices: string[];
  heroImage: string;
}

export interface Route {
  slug: string;
  origin: string;
  destination: string;
  distanceKm: number;
  durationMinutes: number;
  highlights: string[];
  suggestedStops: string[];
  recommendedVehicles: string[];
  faqKeys: string[];
}

export interface Testimonial {
  id: string;
  rating: number;
}
