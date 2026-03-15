const BASE_URL = "https://moroccochauffeurs.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Morocco Chauffeurs",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description:
      "Premium chauffeur services across 13 Moroccan destinations. Airport transfers, private tours, and bespoke travel experiences.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+212-5-24-00-00-00",
      contactType: "customer service",
      availableLanguage: ["English", "French", "Spanish", "Portuguese", "German", "Chinese", "Japanese"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenue Mohammed V, Gueliz",
      addressLocality: "Marrakech",
      addressCountry: "MA",
    },
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Morocco Chauffeurs",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/en/destinations/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema(cityName: string, services: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Morocco Chauffeurs — ${cityName}`,
    description: `Premium chauffeur services in ${cityName}, Morocco. ${services.join(", ")}.`,
    url: BASE_URL,
    telephone: "+212-5-24-00-00-00",
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.6295,
      longitude: -7.9811,
    },
    priceRange: "$$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

export function serviceSchema(name: string, description: string, areaServed: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Morocco Chauffeurs",
    },
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    serviceType: "Chauffeur Service",
  };
}

export function productSchema(name: string, description: string, capacity: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: {
      "@type": "Organization",
      name: "Morocco Chauffeurs",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      availability: "https://schema.org/InStock",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Passenger Capacity",
      value: String(capacity),
    },
  };
}

export function touristTripSchema(origin: string, destination: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${origin} to ${destination}`,
    description,
    touristType: "Leisure, Business",
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: origin,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: destination,
        },
      ],
    },
    provider: {
      "@type": "Organization",
      name: "Morocco Chauffeurs",
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
