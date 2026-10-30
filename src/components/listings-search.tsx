import { useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  priceFormatter,
  SAMPLE_LISTINGS,
  type SampleListing,
} from "@/lib/content";

const LOCATIONS = [
  "Any",
  "Pahrump",
  "Las Vegas",
  "Henderson",
  "North Las Vegas",
  "Mesquite",
  "Boulder City",
];
const TYPES = ["Any", "Residential", "Land", "Residential Lease", "High Rise"];
const SORTS = [
  "Newest",
  "Oldest",
  "Least Expensive to Most",
  "Most Expensive to Least",
];
const BEDS = ["Any Number", "Studio", "1+", "2+", "3+", "4+"];
const BATHS = ["Any Number", "1+", "2+", "3+", "4+"];

type Filters = {
  location: string;
  type: string;
  sort: string;
  beds: string;
  baths: string;
  minPrice: string;
  maxPrice: string;
};

const DEFAULT_FILTERS: Filters = {
  location: "Any",
  type: "Any",
  sort: "Newest",
  beds: "Any Number",
  baths: "Any Number",
  minPrice: "",
  maxPrice: "",
};

const toCount = (value: string) => {
  const digits = value.match(/\d+/);
  return digits ? Number(digits[0]) : 0;
};

function matches(listing: SampleListing, filters: Filters) {
  if (filters.location !== "Any" && listing.city !== filters.location) {
    return false;
  }
  if (filters.type !== "Any" && listing.type !== filters.type) {
    return false;
  }
  if (listing.beds < toCount(filters.beds)) return false;
  if (listing.baths < toCount(filters.baths)) return false;
  if (filters.minPrice && listing.price < Number(filters.minPrice)) {
    return false;
  }
  if (filters.maxPrice && listing.price > Number(filters.maxPrice)) {
    return false;
  }
  return true;
}

function sortListings(listings: SampleListing[], sort: string) {
  const sorted = [...listings];
  if (sort === "Oldest")
    return sorted.sort((a, b) => b.daysListed - a.daysListed);
  if (sort === "Least Expensive to Most") {
    return sorted.sort((a, b) => a.price - b.price);
  }
  if (sort === "Most Expensive to Least") {
    return sorted.sort((a, b) => b.price - a.price);
  }
  return sorted.sort((a, b) => a.daysListed - b.daysListed);
}

export function ListingsSearch() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const resultsRef = useRef<HTMLDivElement>(null);

  const rangeError =
    filters.minPrice &&
    filters.maxPrice &&
    Number(filters.minPrice) > Number(filters.maxPrice)
      ? "Minimum price can't be higher than maximum price."
      : null;

  const results = useMemo(
    () =>
      sortListings(
        SAMPLE_LISTINGS.filter((listing) => matches(listing, filters)),
        filters.sort,
      ),
    [filters],
  );

  const update =
    (key: keyof Filters) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFilters((current) => ({ ...current, [key]: value }));
    };

  const selectChange = (key: keyof Filters) => (value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <section id="listings" className="px-4 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
          Find your dream home
        </h2>

        <form
          onSubmit={onSubmit}
          aria-label="Search sample listings"
          className="mt-10 border border-border bg-secondary p-6 md:p-8"
        >
          <h3 className="text-lg font-bold uppercase">Search Listings</h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              id="filter-location"
              label="Location"
              value={filters.location}
              options={LOCATIONS}
              onValueChange={selectChange("location")}
            />

            <FilterSelect
              id="filter-type"
              label="Type"
              value={filters.type}
              options={TYPES}
              onValueChange={selectChange("type")}
            />

            <FilterSelect
              id="filter-sort"
              label="Sort By"
              value={filters.sort}
              options={SORTS}
              onValueChange={selectChange("sort")}
            />

            <FilterSelect
              id="filter-beds"
              label="Bedrooms"
              value={filters.beds}
              options={BEDS}
              onValueChange={selectChange("beds")}
            />

            <FilterSelect
              id="filter-baths"
              label="Baths"
              value={filters.baths}
              options={BATHS}
              onValueChange={selectChange("baths")}
            />

            <div className="grid gap-2">
              <Label
                htmlFor="filter-min-price"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Min Price
              </Label>
              <Input
                id="filter-min-price"
                type="number"
                inputMode="numeric"
                min={0}
                step={5000}
                placeholder="Min Price"
                className="h-10 rounded-none border-input bg-background"
                value={filters.minPrice}
                onChange={update("minPrice")}
                aria-invalid={rangeError ? true : undefined}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="filter-max-price"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Max Price
              </Label>
              <Input
                id="filter-max-price"
                type="number"
                inputMode="numeric"
                min={0}
                step={5000}
                placeholder="Max Price"
                className="h-10 rounded-none border-input bg-background"
                value={filters.maxPrice}
                onChange={update("maxPrice")}
                aria-invalid={rangeError ? true : undefined}
                aria-describedby={rangeError ? "price-range-error" : undefined}
              />
            </div>
          </div>

          {rangeError ? (
            <p
              id="price-range-error"
              role="alert"
              className="mt-4 text-sm text-destructive"
            >
              {rangeError}
            </p>
          ) : null}
        </form>

        <div
          ref={resultsRef}
          id="listing-results"
          className="mt-12 scroll-mt-28"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p aria-live="polite" className="text-sm text-muted-foreground">
              Showing <strong>{results.length}</strong> of{" "}
              {SAMPLE_LISTINGS.length} listings
            </p>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={resetFilters}
              className="h-auto px-0 text-xs font-semibold uppercase tracking-widest text-foreground"
            >
              Reset filters
            </Button>
          </div>

          {results.length > 0 ? (
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((listing) => (
                <Card
                  key={listing.id}
                  className="gap-0 overflow-hidden rounded-none border-border bg-card py-0 shadow-none transition-all duration-200 hover:scale-103 hover:shadow-2xl"
                >
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={`Exterior of the sample home at ${listing.address}`}
                      loading="lazy"
                      className="aspect-4/3 w-full object-cover"
                    />
                  </div>
                  <CardContent className="flex flex-1 flex-col p-5">
                    <p className="text-2xl font-black tabular-nums">
                      {priceFormatter.format(listing.price)}
                    </p>
                    <h4 className="mt-1 text-sm font-bold uppercase tracking-wide">
                      {listing.address}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {listing.city}, NV · {listing.lot}
                    </p>
                    <Separator className="mt-4" />
                    <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-wider text-muted-foreground">
                      <div className="flex gap-1">
                        <dt>Beds</dt>
                        <dd className="font-semibold text-foreground">
                          {listing.beds}
                        </dd>
                      </div>
                      <div className="flex gap-1">
                        <dt>Baths</dt>
                        <dd className="font-semibold text-foreground">
                          {listing.baths}
                        </dd>
                      </div>
                      <div className="flex gap-1">
                        <dt>Sq Ft</dt>
                        <dd className="font-semibold text-foreground">
                          {listing.sqft.toLocaleString("en-US")}
                        </dd>
                      </div>
                    </dl>
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="mt-auto justify-start px-0 pt-5 text-xs font-semibold uppercase tracking-widest text-foreground"
                    >
                      <a href="#contact">Ask about this home</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-6 items-center gap-0 rounded-none border-dashed border-border bg-transparent py-12 text-center shadow-none">
              <CardContent className="flex flex-col items-center">
                <p className="text-lg font-bold uppercase">
                  No listings match those filters
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Widen your price range or clear a filter to see the
                  inventory again.
                </p>
                <Button
                  type="button"
                  onClick={resetFilters}
                  size="lg"
                  className="mt-6 rounded-none text-xs font-semibold uppercase tracking-widest"
                >
                  Reset filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  id,
  label,
  value,
  options,
  onValueChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className="h-10 w-full rounded-none border-input bg-background"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
