import {
  MapPin,
  Plane,
  Landmark,
  Building,
  Trees,
  Mountain,
  Waves,
  Castle,
  Church,
  GraduationCap,
  ShoppingBag,
  Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface LocationItem {
  name: string;
  type: string;
}

interface KeyLocationsProps {
  eyebrow: string;
  title: string;
  locations: LocationItem[];
}

const iconMap: Record<string, LucideIcon> = {
  airport: Plane,
  square: MapPin,
  garden: Trees,
  palace: Castle,
  mosque: Landmark,
  promenade: Waves,
  "historic-quarter": Building,
  shopping: ShoppingBag,
  medina: Building,
  madrasa: GraduationCap,
  tannery: Building,
  museum: Landmark,
  cave: Mountain,
  landmark: Eye,
  monument: Landmark,
  kasbah: Castle,
  ruins: Building,
  mausoleum: Church,
  beach: Waves,
  park: Trees,
  fortification: Castle,
  island: Waves,
  nature: Trees,
  waterfall: Waves,
  viewpoint: Eye,
  desert: Mountain,
  village: Building,
  lake: Waves,
  "historic-building": Building,
  gate: Castle,
  studio: Building,
};

export function KeyLocations({ eyebrow, title, locations }: KeyLocationsProps) {
  return (
    <section className="py-20 bg-night">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-gold/80">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {locations.map((location) => {
            const Icon = iconMap[location.type] || MapPin;
            return (
              <div
                key={location.name}
                className="rounded-xl border border-white/10 bg-white/5 p-5 text-center transition-colors hover:bg-white/10"
              >
                <Icon className="mx-auto mb-3 h-6 w-6 text-gold" />
                <p className="font-serif text-sm font-bold text-white">
                  {location.name}
                </p>
                <p className="mt-1 text-xs capitalize text-white/50">
                  {location.type.replace(/-/g, " ")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
