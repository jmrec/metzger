export const asset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;

export const SITE_LOGO = asset("/site_logo.webp");

/** Where the app is mounted: `/` locally, `/metzger/` on GitHub Pages. */
export const HOME_HREF = import.meta.env.BASE_URL;

export const IMAGES = {
  hero: asset("/images/hero-pahrump.webp"),
  highlights: {
    sales: asset("/images/highlight-sales.webp"),
    sold: asset("/images/highlight-sold.webp"),
    buyers: asset("/images/highlight-buyers.webp"),
  },
  services: {
    realEstate: asset("/images/service-real-estate.webp"),
    commercial: asset("/images/service-commercial.webp"),
    expertise: asset("/images/service-expertise.webp"),
  },
  gallery: [
    asset("/images/gallery-01.webp"),
    asset("/images/gallery-02.webp"),
    asset("/images/gallery-03.webp"),
    asset("/images/gallery-04.webp"),
    asset("/images/gallery-05.webp"),
    asset("/images/gallery-06.webp"),
    asset("/images/gallery-07.webp"),
  ],
  badges: {
    equalHousing: asset("/images/badge-equal-housing.webp"),
    equalHousingAlt: asset("/images/badge-equal-housing-alt.webp"),
    realtor: asset("/images/badge-realtor.webp"),
    chamber: asset("/images/badge-chamber.webp"),
  },
} as const;

export const PHONE = "(206) 919-6886";
export const PHONE_HREF = "tel:2069196886";

export const SITE_URL = "https://jmrec.github.io/metzger";

export const PAGE_TITLE =
  "Marci Metzger | Pahrump Realtor — The Ridge Realty Group";

export const PAGE_DESCRIPTION =
  "Pahrump Realtor Marci Metzger has guided Nevada buyers and sellers for nearly three decades. Browse homes for sale and call her directly at (206) 919-6886.";

export const BUSINESS_NAME = "Marci Metzger — The Ridge Realty Group";
export const ADDRESS =
  "3190 HW-160, Suite F, Pahrump, Nevada 89048, United States";

export const DIRECTIONS_HREF =
  "https://www.google.com/maps?daddr=3190+HW-160,+Suite+F,+Pahrump,+Nevada+89048,+United+States";

/**
 * Office coordinates, taken from the business's own map listing. Used to pin
 * the contact map so the marker lands on the suite, not the street centre.
 */
export const OFFICE_COORDS = { lat: 36.184402, lng: -115.955288 } as const;

/** Keyless Google Maps embed: marker only, no place card or API key. */
export const MAP_EMBED_HREF = `https://www.google.com/maps?q=${OFFICE_COORDS.lat},${OFFICE_COORDS.lng}&z=15&output=embed`;

/**
 * Office hours, evaluated in the office's own timezone so a visitor's clock
 * (or laptop timezone) can never make the site claim the wrong state.
 * Values are minutes after local midnight.
 */
export const OFFICE_HOURS = {
  timeZone: "America/Los_Angeles",
  opensAtMinutes: 8 * 60, // 8:00 am
  closesAtMinutes: 19 * 60, // 7:00 pm
} as const;

export const NAV_LINKS = [
  { label: "Home", href: HOME_HREF },
  { label: "Listings", href: "#listings" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/MarciHomes/" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/marcimetzger_theridge/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/marci-metzger-30642496/",
  },
  { label: "Yelp", href: "https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w" },
];

export type SampleListing = {
  id: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lot: string;
  type: "Residential";
  daysListed: number;
  image: string;
};

export const SAMPLE_LISTINGS: SampleListing[] = [
  {
    id: "beacon-ridge",
    address: "4787 E Beacon Ridge",
    city: "Pahrump",
    price: 415000,
    beds: 4,
    baths: 2.5,
    sqft: 2340,
    lot: "0.28 acre",
    type: "Residential",
    daysListed: 6,
    image: IMAGES.gallery[0],
  },
  {
    id: "roseworthy",
    address: "4460 Roseworthy",
    city: "Pahrump",
    price: 369500,
    beds: 3,
    baths: 2,
    sqft: 1860,
    lot: "0.24 acre",
    type: "Residential",
    daysListed: 19,
    image: IMAGES.gallery[2],
  },
  {
    id: "ailanto",
    address: "5570 Ailanto",
    city: "Pahrump",
    price: 459000,
    beds: 4,
    baths: 3,
    sqft: 2610,
    lot: "0.51 acre",
    type: "Residential",
    daysListed: 33,
    image: IMAGES.gallery[3],
  },
];

export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
