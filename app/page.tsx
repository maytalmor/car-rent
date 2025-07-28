import { Hero, SearchBar, CustomFilter, CarCard } from "@/components";

import { fetchFuels, fetchYears, fetchCars, fetchLocations } from "@/utils";
import Image from "next/image";


export default async function Home({searchParams}) {



  const [fuels, yearsOfProduction, locations, allCars] = await Promise.all([
    fetchFuels(),
    fetchYears(),
    fetchLocations(),
    fetchCars({
      manufactur: searchParams.manufactur || '',
      year: searchParams.year,
      fuel: searchParams.fuel || '',
      location: searchParams.location || '',
      limit: searchParams.limit || 30,
      model: searchParams.model || '',
    }),
  ]);

const isDataEmpty = !Array.isArray(allCars) || allCars.length<1 || !allCars;


  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-3xl font-extrabold">Car Catalogue</h1>
          <p>Explore The Cars</p>
        </div>
        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
            <CustomFilter title="location" options={locations} />
          </div>
        </div>

      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car)=>(
              <CarCard
                car={car}
              />
            ))}
            
          </div>
        </section>
      ):(
        <div className="home__error-container">
          <h2>Oops, no results</h2>
          <p>{allCars?.message}</p>
        </div>
      )}
      </div>
    </main>
  );
}
