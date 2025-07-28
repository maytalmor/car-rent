'use client';

import { useSearchParams } from 'next/navigation';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

export default function MapPage() {
  const searchParams = useSearchParams();
  const locationQuery = searchParams.get('location') || '';

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  // Geocode location to coordinates
  useEffect(() => {
    if (!locationQuery) return;

    const geocode = async () => {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationQuery)}&key='AIzaSyB7Fzf0p6sotwrSYEBxgZ5hdkwdBLkzGjE'`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoords({ lat, lng });
      }
    };

    geocode();
  }, [locationQuery]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="h-screen w-full">
      <h1 className="text-xl font-bold p-4">Location: {locationQuery}</h1>

      {coords ? (
        <GoogleMap
          center={coords}
          zoom={12}
          mapContainerStyle={{ width: '100%', height: '80%' }}
        >
          <Marker position={coords} />
        </GoogleMap>
      ) : (
        <p className="p-4">Geocoding location...</p>
      )}
    </div>
  );
}
