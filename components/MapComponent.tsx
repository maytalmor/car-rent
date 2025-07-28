'use client';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface MapComponentProps {
  location: string; // address or city
}

function MapComponent({ location }: MapComponentProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB7Fzf0p6sotwrSYEBxgZ5hdkwdBLkzGjE',
  });

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const geocode = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      setCoords({ lat, lng });
    };

    if (location) geocode();
  }, [location]);

  if (!isLoaded) return <div>Loading map...</div>;
  if (!coords) return <div>Finding location...</div>;

  return (
    <div className='h-64 w-full rounded-lg overflow-hidden'>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={coords}
        zoom={12}
      >
        <Marker position={coords} />
      </GoogleMap>
    </div>
  );
}

export default MapComponent;
