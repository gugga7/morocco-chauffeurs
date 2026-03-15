import { Hero } from "@/components/sections/hero";
import { BookingPlaceholder } from "@/components/ui/booking-placeholder";
import { TrustBar } from "@/components/sections/trust-bar";
import { DestinationsGrid } from "@/components/sections/destinations-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FleetCarousel } from "@/components/sections/fleet-carousel";
import { RoutesGrid } from "@/components/sections/routes-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative z-10 -mt-16 px-4">
        <BookingPlaceholder />
      </div>
      <TrustBar />
      <DestinationsGrid />
      <ServicesGrid />
      <FleetCarousel />
      <RoutesGrid />
      <Testimonials />
      <CTASection />
    </>
  );
}
