import { Hero } from "@/components/sections/hero";
import { BookingPlaceholder } from "@/components/ui/booking-placeholder";
import { TrustBar } from "@/components/sections/trust-bar";
import { DestinationsGrid } from "@/components/sections/destinations-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FleetCarousel } from "@/components/sections/fleet-carousel";
import { RoutesGrid } from "@/components/sections/routes-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { StructuredData } from "@/components/seo/structured-data";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default async function HomePage() {
  return (
    <>
      <StructuredData data={organizationSchema()} />
      <StructuredData data={websiteSchema()} />
      <Hero />
      <div className="relative z-10 -mt-16 px-4">
        <BookingPlaceholder />
      </div>
      <AnimateOnScroll>
        <TrustBar />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <DestinationsGrid />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <ServicesGrid />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <FleetCarousel />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <RoutesGrid />
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <Testimonials />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CTASection />
      </AnimateOnScroll>
    </>
  );
}
