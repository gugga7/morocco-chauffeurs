# Image Guide — Morocco Chauffeurs

Every image below is currently an SVG placeholder. Replace each with a real `.jpg` photo at the recommended dimensions. The site references `.svg` extensions for now — when you add real photos, update the corresponding content JSON file to point to `.jpg`.

## Hero

| Filename | Location | Dimensions | Description |
|---|---|---|---|
| `hero/homepage-hero.jpg` | Homepage full-screen background | 1920x1080 | Luxury car on a Moroccan road, golden hour light, Atlas Mountains or desert backdrop |

## Cities

All city images appear on destination cards (3:4 aspect) and city page heroes (16:9 crop).

| Filename | Location | Dimensions | Description |
|---|---|---|---|
| `cities/marrakech-hero.jpg` | Destination card + city page | 800x1000 | Iconic Marrakech scene — Jemaa el-Fnaa, Koutoubia minaret, or riad courtyard |
| `cities/casablanca-hero.jpg` | Destination card + city page | 800x1000 | Hassan II Mosque or Casablanca skyline |
| `cities/fez-hero.jpg` | Destination card + city page | 800x1000 | Fez medina, leather tanneries, or Bou Inania Madrasa |
| `cities/tangier-hero.jpg` | Destination card + city page | 800x1000 | Tangier port, Kasbah, or Cap Spartel |
| `cities/rabat-hero.jpg` | City page | 800x1000 | Hassan Tower or Chellah ruins |
| `cities/agadir-hero.jpg` | City page | 800x1000 | Agadir beach or marina |
| `cities/essaouira-hero.jpg` | City page | 800x1000 | Essaouira ramparts, blue fishing boats |
| `cities/chefchaouen-hero.jpg` | City page | 800x1000 | Blue-washed streets of Chefchaouen |
| `cities/merzouga-hero.jpg` | City page | 800x1000 | Erg Chebbi dunes, camel caravan at sunset |
| `cities/meknes-hero.jpg` | City page | 800x1000 | Bab Mansour gate |
| `cities/ouarzazate-hero.jpg` | City page | 800x1000 | Ait Benhaddou kasbah |
| `cities/ifrane-hero.jpg` | City page | 800x1000 | Cedar forests or snow-capped Middle Atlas |
| `cities/el-jadida-hero.jpg` | City page | 800x1000 | Portuguese cistern or coastal fortress |

## Fleet

All fleet images appear on fleet carousel cards (4:3 aspect) and vehicle detail pages.

| Filename | Location | Dimensions | Description |
|---|---|---|---|
| `fleet/sedan-hero.jpg` | Fleet carousel + vehicle page | 800x600 | Mercedes E-Class or similar premium sedan |
| `fleet/luxury-sedan-hero.jpg` | Fleet carousel + vehicle page | 800x600 | Mercedes S-Class or BMW 7 Series |
| `fleet/suv-hero.jpg` | Fleet carousel + vehicle page | 800x600 | Toyota Land Cruiser or similar SUV |
| `fleet/luxury-suv-hero.jpg` | Fleet carousel + vehicle page | 800x600 | Range Rover or Mercedes GLS |
| `fleet/mercedes-v-class-hero.jpg` | Fleet carousel + vehicle page | 800x600 | Mercedes V-Class van |
| `fleet/sprinter-hero.jpg` | Fleet carousel + vehicle page | 800x600 | Mercedes Sprinter van |
| `fleet/minibus-hero.jpg` | Fleet carousel + vehicle page | 800x600 | 20-seat minibus |
| `fleet/coach-bus-hero.jpg` | Fleet carousel + vehicle page | 800x600 | Full-size coach bus |

## Services

Service images appear on service detail page heroes.

| Filename | Location | Dimensions | Description |
|---|---|---|---|
| `services/airport-transfers-hero.jpg` | Service page hero | 1920x1080 | Chauffeur holding name sign at airport arrivals |
| `services/hourly-chauffeur-hero.jpg` | Service page hero | 1920x1080 | Luxury car waiting outside a hotel or riad |
| `services/city-to-city-transfers-hero.jpg` | Service page hero | 1920x1080 | Premium car on Moroccan highway with scenic landscape |
| `services/multi-day-tours-hero.jpg` | Service page hero | 1920x1080 | Scenic Morocco road trip montage — desert, mountains, coast |
| `services/event-transportation-hero.jpg` | Service page hero | 1920x1080 | Fleet of luxury cars at a wedding or corporate event |
| `services/vip-concierge-hero.jpg` | Service page hero | 1920x1080 | Chauffeur opening door of luxury vehicle |

## How to Replace

1. Add your `.jpg` photo to the correct folder
2. Update the `heroImage` field in the matching content JSON file (e.g., `content/cities/marrakech.json`)
3. Change the extension from `.svg` to `.jpg`
4. For the homepage hero, update `components/sections/hero.tsx` background-image URL
5. Delete the old `.svg` placeholder
