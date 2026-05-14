import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LocationsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const { toast } = useToast();

  const locations = [
    {
      id: 'new-york',
      name: 'New York Branch',
      coordinates: [-73.8648, 40.6782] as [number, number],
      address: '546 Liberty Avenue, Brooklyn NY 11207',
      phone: '+1 (555) 123-4567',
      pastor: 'Pastor Durojaiye and funmi olorunlana',
      services: 'Sunday: 10:00 AM EST',
      isHeadquarters: true
    },
    {
      id: 'lagos',
      name: 'Lagos Branch',
      coordinates: [3.5106, 6.5795] as [number, number],
      address: '52 Kokoro Abu, Ikorodu, Lagos',
      phone: '+234 801 234 5678',
      pastor: 'Pastor Ayokunle Ashogbon',
      services: 'Sunday: 8:00 AM & 6:00 PM WAT'
    },
    {
      id: 'akure',
      name: 'Akure Headquarters',
      coordinates: [5.1931, 7.2571] as [number, number],
      address: 'Iloro, Akure, Ondo State',
      phone: '+234 802 345 6789',
      pastor: 'prophet ajetunmobi joshua',
      services: 'Sunday: 7:00 AM & 5:00 PM WAT',
    }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 2,
        center: [0, 20],
        pitch: 30,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        'top-right'
      );

      map.current.scrollZoom.enable();

      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(245, 245, 255)',
          'horizon-blend': 0.1,
        });

        locations.forEach((location) => {
          const markerElement = document.createElement('div');
          markerElement.className = location.isHeadquarters
            ? 'w-8 h-8 bg-divine-gold rounded-full border-4 border-white shadow-divine cursor-pointer'
            : 'w-6 h-6 bg-prayer-blue rounded-full border-3 border-white shadow-prayer cursor-pointer';
          markerElement.style.animation = 'pulse 2s infinite';

          const marker = new mapboxgl.Marker({
            element: markerElement,
            anchor: 'center'
          })
            .setLngLat(location.coordinates)
            .addTo(map.current!);

          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: true,
            closeOnClick: false,
            className: 'custom-popup'
          }).setHTML(`
            <div class="p-4 min-w-64">
              <div class="flex items-center gap-2 mb-3">
                ${location.isHeadquarters
                  ? '<div class="w-3 h-3 bg-yellow-400 rounded-full"></div>'
                  : '<div class="w-3 h-3 bg-blue-600 rounded-full"></div>'
                }
                <h3 class="font-bold text-lg text-gray-800">${location.name}</h3>
                ${location.isHeadquarters ? '<span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">HQ</span>' : ''}
              </div>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-start gap-2">
                  <svg class="w-4 h-4 mt-0.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>${location.address}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span>${location.phone}</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-4 h-4 mt-0.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  <span>${location.services}</span>
                </div>
                <div class="pt-2 border-t border-gray-200">
                  <p class="font-medium text-gray-800">${location.pastor}</p>
                </div>
                <div class="pt-3">
                  <button onclick="window.open('https://maps.google.com/maps?daddr=${encodeURIComponent(location.address)}', '_blank')" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                    </svg>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          `);

          markerElement.addEventListener('click', () => {
            popup.addTo(map.current!);
            map.current!.flyTo({
              center: location.coordinates,
              zoom: 10,
              duration: 2000
            });
          });
        });
      });

      setMapInitialized(true);

      toast({
        title: "Map Loaded Successfully",
        description: "Click on location markers to view details",
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Failed to load the map",
        variant: "destructive"
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [toast]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div
          ref={mapContainer}
          className={`w-full h-96 rounded-xl shadow-divine ${!mapInitialized ? 'bg-gradient-holy' : ''}`}
        />

        {!mapInitialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-holy rounded-xl">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-prayer-blue mx-auto mb-4" />
              <p className="text-muted-foreground">Loading interactive map...</p>
            </div>
          </div>
        )}
      </div>

      {mapInitialized && (
        <div className="grid md:grid-cols-3 gap-4">
          {locations.map((location) => (
            <Button
              key={location.id}
              variant={location.isHeadquarters ? "divine" : "prayer"}
              size="sm"
              className="h-auto p-4 flex-col items-start"
              onClick={() => {
                if (map.current) {
                  map.current.flyTo({
                    center: location.coordinates,
                    zoom: 12,
                    duration: 2000
                  });
                }
                window.open(
                  `https://maps.google.com/maps?daddr=${encodeURIComponent(location.address)}`,
                  '_blank'
                );
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">{location.name}</span>
              </div>
              <span className="text-xs opacity-90">{location.address}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationsMap;