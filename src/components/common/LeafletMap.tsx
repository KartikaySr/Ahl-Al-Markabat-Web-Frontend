import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Provider } from '../../types';
import { useApp } from '../../context/AppContext';
import { COUNTRIES_CONFIG, ALL_COMBINED_CITIES } from '../../data/mockData';
import {
  MapPin,
  Layers,
  Globe,
  Navigation,
  Sparkles,
  ShieldCheck,
  Phone,
  Clock,
  Star,
  ExternalLink,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

interface LeafletMapProps {
  providers?: Provider[];
  center?: [number, number];
  zoom?: number;
  selectedProviderId?: string;
  onSelectProvider?: (provider: Provider) => void;
  userLocation?: [number, number];
  emergencyLocation?: { lat: number; lng: number; title: string };
  rescueTruckLocation?: { lat: number; lng: number; title: string };
  height?: string;
  showCountrySelector?: boolean;
  activeCountryId?: string;
  onCountrySelect?: (countryId: string) => void;
}

// Google Maps Tile Engines
const GOOGLE_TILE_LAYERS = {
  roadmap: {
    id: 'roadmap',
    nameAr: 'خريطة جوجل (شوارع)',
    nameEn: 'Google Roadmap',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
    maxZoom: 20,
  },
  hybrid: {
    id: 'hybrid',
    nameAr: 'قمر صناعي (مع الشوارع)',
    nameEn: 'Google Satellite Hybrid',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps Imagery',
    maxZoom: 20,
  },
  terrain: {
    id: 'terrain',
    nameAr: 'تضاريس جوجل',
    nameEn: 'Google Terrain',
    url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps Terrain',
    maxZoom: 20,
  },
};

// Country focal presets for smooth navigation
const COUNTRY_MAP_PRESETS: Record<
  string,
  { center: [number, number]; zoom: number; nameAr: string; nameEn: string; flag: string }
> = {
  ps: { center: [31.9038, 35.2034], zoom: 12, nameAr: 'فلسطين', nameEn: 'Palestine', flag: '🇵🇸' },
  jo: { center: [31.9539, 35.8506], zoom: 12, nameAr: 'الأردن', nameEn: 'Jordan', flag: '🇯🇴' },
  sa: { center: [24.7136, 46.6753], zoom: 11, nameAr: 'السعودية', nameEn: 'Saudi Arabia', flag: '🇸🇦' },
  ae: { center: [25.1300, 55.2300], zoom: 11, nameAr: 'الإمارات', nameEn: 'UAE', flag: '🇦🇪' },
  qa: { center: [25.2854, 51.5310], zoom: 12, nameAr: 'قطر', nameEn: 'Qatar', flag: '🇶🇦' },
  eg: { center: [30.0444, 31.2357], zoom: 11, nameAr: 'مصر', nameEn: 'Egypt', flag: '🇪🇬' },
};

export const LeafletMap: React.FC<LeafletMapProps> = ({
  providers: customProviders,
  center: customCenter,
  zoom: customZoom,
  selectedProviderId,
  onSelectProvider,
  userLocation,
  emergencyLocation,
  rescueTruckLocation,
  height = '100%',
  showCountrySelector = true,
  activeCountryId,
  onCountrySelect,
}) => {
  const {
    language,
    selectedCountry: globalCountry,
    setSelectedCountryId,
    selectedCity: globalSelectedCity,
    setSelectedCity: setGlobalSelectedCity,
    providers: appProviders,
    setSelectedProviderModal,
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // State for active map layer (Roadmap, Satellite/Hybrid, Terrain)
  const [activeMapLayer, setActiveMapLayer] = useState<'roadmap' | 'hybrid' | 'terrain'>('roadmap');

  // Country selection state (synced with parent or global context)
  const effectiveCountryId = activeCountryId || globalCountry.id || 'ps';
  const currentCountryConfig =
    COUNTRIES_CONFIG.find((c) => c.id === effectiveCountryId) || COUNTRIES_CONFIG[0];
  const countryPreset = COUNTRY_MAP_PRESETS[effectiveCountryId] || COUNTRY_MAP_PRESETS.ps;

  // City helper
  const findCityByQuery = (cityName: string) => {
    if (!cityName || cityName === 'all') return null;
    const q = cityName.toLowerCase().trim();
    return ALL_COMBINED_CITIES.find(
      (c) =>
        c.id.toLowerCase() === q ||
        c.nameEn.toLowerCase() === q ||
        c.nameEn.toLowerCase().includes(q) ||
        q.includes(c.nameEn.toLowerCase()) ||
        c.nameAr.includes(cityName) ||
        cityName.includes(c.nameAr) ||
        (q.includes('hebron') && c.id === 'hebron') ||
        (q.includes('خليل') && c.id === 'hebron') ||
        (q.includes('dubai') && c.id === 'dubai') ||
        (q.includes('دبي') && c.id === 'dubai') ||
        (q.includes('abu dhabi') && c.id === 'abudhabi') ||
        (q.includes('أبوظبي') && c.id === 'abudhabi') ||
        (q.includes('sharjah') && c.id === 'sharjah') ||
        (q.includes('الشارقة') && c.id === 'sharjah') ||
        (q.includes('ramallah') && c.id === 'ramallah') ||
        (q.includes('رام الله') && c.id === 'ramallah') ||
        (q.includes('nablus') && c.id === 'nablus') ||
        (q.includes('نابلس') && c.id === 'nablus') ||
        (q.includes('jerusalem') && c.id === 'jerusalem') ||
        (q.includes('القدس') && c.id === 'jerusalem') ||
        (q.includes('bethlehem') && c.id === 'bethlehem') ||
        (q.includes('بيت لحم') && c.id === 'bethlehem') ||
        (q.includes('jenin') && c.id === 'jenin') ||
        (q.includes('جنين') && c.id === 'jenin') ||
        (q.includes('tulkarm') && c.id === 'tulkarm') ||
        (q.includes('طولكرم') && c.id === 'tulkarm') ||
        (q.includes('gaza') && c.id === 'gaza') ||
        (q.includes('غزة') && c.id === 'gaza') ||
        (q.includes('riyadh') && c.id === 'riyadh') ||
        (q.includes('الرياض') && c.id === 'riyadh') ||
        (q.includes('jeddah') && c.id === 'jeddah') ||
        (q.includes('جدة') && c.id === 'jeddah') ||
        (q.includes('dammam') && c.id === 'dammam') ||
        (q.includes('الدمام') && c.id === 'dammam') ||
        (q.includes('amman') && c.id === 'amman') ||
        (q.includes('عمان') && c.id === 'amman') ||
        (q.includes('zarqa') && c.id === 'zarqa') ||
        (q.includes('الزرقاء') && c.id === 'zarqa') ||
        (q.includes('irbid') && c.id === 'irbid') ||
        (q.includes('إربد') && c.id === 'irbid') ||
        (q.includes('doha') && c.id === 'doha') ||
        (q.includes('الدوحة') && c.id === 'doha') ||
        (q.includes('cairo') && c.id === 'cairo') ||
        (q.includes('القاهرة') && c.id === 'cairo') ||
        (q.includes('alexandria') && c.id === 'alexandria') ||
        (q.includes('الإسكندرية') && c.id === 'alexandria')
    );
  };

  const initialMatchedCity = findCityByQuery(globalSelectedCity);

  // Selected city filter within active country
  const [selectedCityId, setSelectedCityId] = useState<string>(
    initialMatchedCity ? initialMatchedCity.id : 'all'
  );

  // Effective center & zoom
  const currentCenter: [number, number] =
    customCenter || (initialMatchedCity ? [initialMatchedCity.lat, initialMatchedCity.lng] : countryPreset.center);
  const currentZoom = customZoom || (initialMatchedCity ? 13.5 : countryPreset.zoom);

  // Sync map center and city pill when globalSelectedCity changes
  useEffect(() => {
    if (!globalSelectedCity || globalSelectedCity === 'all') {
      setSelectedCityId('all');
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(countryPreset.center, 8.5, { duration: 1.0 });
      }
      return;
    }
    const matched = findCityByQuery(globalSelectedCity);
    if (matched) {
      setSelectedCityId(matched.id);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([matched.lat, matched.lng], 13.5, { duration: 1.0 });
      }
    }
  }, [globalSelectedCity]);

  // Filter providers across all regions
  const effectiveProviders = useMemo(() => {
    const list = customProviders || appProviders;
    if (selectedCityId === 'all') return list;

    const cityObj = ALL_COMBINED_CITIES.find((c) => c.id === selectedCityId);
    if (!cityObj) return list;

    return list.filter((p) => {
      const matchAr = p.cityAr.includes(cityObj.nameAr) || cityObj.nameAr.includes(p.cityAr);
      const matchEn =
        p.cityEn.toLowerCase().includes(cityObj.nameEn.toLowerCase()) ||
        cityObj.nameEn.toLowerCase().includes(p.cityEn.toLowerCase()) ||
        (cityObj.id === 'hebron' && (p.cityEn.toLowerCase().includes('hebron') || p.cityAr.includes('الخليل'))) ||
        (cityObj.id === 'ramallah' && (p.cityEn.toLowerCase().includes('ramallah') || p.cityAr.includes('رام الله'))) ||
        (cityObj.id === 'nablus' && (p.cityEn.toLowerCase().includes('nablus') || p.cityAr.includes('نابلس'))) ||
        (cityObj.id === 'jerusalem' && (p.cityEn.toLowerCase().includes('jerusalem') || p.cityAr.includes('القدس'))) ||
        (cityObj.id === 'bethlehem' && (p.cityEn.toLowerCase().includes('bethlehem') || p.cityAr.includes('بيت لحم'))) ||
        (cityObj.id === 'jenin' && (p.cityEn.toLowerCase().includes('jenin') || p.cityAr.includes('جنين'))) ||
        (cityObj.id === 'tulkarm' && (p.cityEn.toLowerCase().includes('tulkarm') || p.cityAr.includes('طولكرم'))) ||
        (cityObj.id === 'gaza' && (p.cityEn.toLowerCase().includes('gaza') || p.cityAr.includes('غزة'))) ||
        (cityObj.id === 'amman' && (p.cityEn.toLowerCase().includes('amman') || p.cityAr.includes('عمان'))) ||
        (cityObj.id === 'zarqa' && (p.cityEn.toLowerCase().includes('zarqa') || p.cityAr.includes('الزرقاء'))) ||
        (cityObj.id === 'irbid' && (p.cityEn.toLowerCase().includes('irbid') || p.cityAr.includes('إربد'))) ||
        (cityObj.id === 'riyadh' && (p.cityEn.toLowerCase().includes('riyadh') || p.cityAr.includes('الرياض'))) ||
        (cityObj.id === 'jeddah' && (p.cityEn.toLowerCase().includes('jeddah') || p.cityAr.includes('جدة'))) ||
        (cityObj.id === 'dammam' && (p.cityEn.toLowerCase().includes('dammam') || p.cityAr.includes('الدمام'))) ||
        (cityObj.id === 'dubai' && (p.cityEn.toLowerCase().includes('dubai') || p.cityAr.includes('دبي'))) ||
        (cityObj.id === 'abudhabi' && (p.cityEn.toLowerCase().includes('abu dhabi') || p.cityAr.includes('أبوظبي'))) ||
        (cityObj.id === 'sharjah' && (p.cityEn.toLowerCase().includes('sharjah') || p.cityAr.includes('الشارقة'))) ||
        (cityObj.id === 'doha' && (p.cityEn.toLowerCase().includes('doha') || p.cityAr.includes('الدوحة'))) ||
        (cityObj.id === 'cairo' && (p.cityEn.toLowerCase().includes('cairo') || p.cityAr.includes('القاهرة'))) ||
        (cityObj.id === 'alexandria' && (p.cityEn.toLowerCase().includes('alexandria') || p.cityAr.includes('الإسكندرية')));
      return matchAr || matchEn;
    });
  }, [customProviders, appProviders, selectedCityId]);

  // Handle switching city within all combined cities
  const handleCitySelect = (cityId: string, lat?: number, lng?: number, cityNameEn?: string) => {
    setSelectedCityId(cityId);
    if (cityNameEn && setGlobalSelectedCity) {
      setGlobalSelectedCity(cityNameEn);
    } else if (cityId === 'all' && setGlobalSelectedCity) {
      setGlobalSelectedCity('all');
    }
    if (cityId === 'all') {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(countryPreset.center, 8.5, { duration: 1.0 });
      }
    } else if (lat && lng && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 13.5, { duration: 1.0 });
    }
  };

  // Initialize Leaflet Map with Google Maps Tiles
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: currentCenter,
        zoom: currentZoom,
        zoomControl: false, // We place custom controls
        scrollWheelZoom: false,
        dragging: true,
        touchZoom: true,
      });

      // Create Initial Google Tile Layer
      const initialLayerConfig = GOOGLE_TILE_LAYERS[activeMapLayer];
      const tileLayer = L.tileLayer(initialLayerConfig.url, {
        attribution: initialLayerConfig.attribution,
        maxZoom: initialLayerConfig.maxZoom,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        tileLayerRef.current = null;
        markersRef.current = [];
      }
    };
  }, []);

  // Update Tile Layer when layer style changes (Roadmap vs Satellite Hybrid vs Terrain)
  useEffect(() => {
    if (!tileLayerRef.current || !mapInstanceRef.current) return;
    const config = GOOGLE_TILE_LAYERS[activeMapLayer];
    tileLayerRef.current.setUrl(config.url);
  }, [activeMapLayer]);

  // Center/Zoom updates when props or country change
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(currentCenter, currentZoom);
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 100);
    }
  }, [currentCenter[0], currentCenter[1], currentZoom]);

  // Render Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Helper: Google Maps style pin
    const createGoogleMarker = (prov: Provider, isSelected: boolean) => {
      const pinColor = isSelected ? '#F59E0B' : '#0B1528';
      const label = language === 'ar' ? prov.businessNameAr : prov.businessNameEn;
      const shortLabel = label.length > 18 ? label.slice(0, 18) + '...' : label;

      return L.divIcon({
        className: 'google-map-marker-pin',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s;">
            <div style="background-color: ${pinColor}; color: #ffffff; padding: 4px 9px; border-radius: 20px; font-weight: 800; font-size: 11px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 2px solid #ffffff; white-space: nowrap;">
              <span style="color: #F59E0B;">★</span>
              <span>${prov.rating.toFixed(1)}</span>
              <span style="color: rgba(255,255,255,0.4);">|</span>
              <span>${shortLabel}</span>
            </div>
            <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 7px solid ${pinColor}; margin-top: -1px;"></div>
          </div>
        `,
        iconSize: [140, 36],
        iconAnchor: [70, 34],
        popupAnchor: [0, -32],
      });
    };

    // Add Providers to Map
    effectiveProviders.forEach((prov) => {
      const isSelected = prov.id === selectedProviderId;
      const marker = L.marker([prov.lat, prov.lng], {
        icon: createGoogleMarker(prov, isSelected),
      }).addTo(map);

      // Rich Google Maps InfoWindow Popup
      const popupHtml = `
        <div style="font-family: inherit; direction: ${language === 'ar' ? 'rtl' : 'ltr'}; text-align: ${language === 'ar' ? 'right' : 'left'}; min-width: 220px; max-width: 260px; padding: 2px;">
          <div style="position: relative; height: 100px; border-radius: 10px; overflow: hidden; margin-bottom: 8px; background: #0B1528;">
            <img src="${prov.image}" alt="${prov.businessNameAr}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/images/categories/gasoline_engine.jpg'" />
            <div style="position: absolute; top: 6px; ${language === 'ar' ? 'right: 6px;' : 'left: 6px;'} background: #0284C7; color: #fff; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 6px;">
              ✓ ${language === 'ar' ? 'معتمد' : 'Verified'}
            </div>
            <div style="position: absolute; bottom: 6px; ${language === 'ar' ? 'right: 6px;' : 'left: 6px;'} background: rgba(11,21,40,0.85); color: #FCD34D; font-size: 11px; font-weight: bold; padding: 2px 6px; border-radius: 6px;">
              ★ ${prov.rating} (${prov.reviewCount})
            </div>
          </div>
          <h4 style="font-weight: 900; font-size: 13px; color: #0F172A; margin: 0 0 4px 0; line-height: 1.3;">
            ${language === 'ar' ? prov.businessNameAr : prov.businessNameEn}
          </h4>
          <p style="font-size: 11px; color: #64748B; margin: 0 0 6px 0;">
            📍 ${language === 'ar' ? prov.addressAr : prov.addressEn}
          </p>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; border-top: 1px solid #E2E8F0; padding-top: 6px; margin-top: 6px;">
            <span style="color: #10B981; font-weight: bold;">● ${language === 'ar' ? 'مفتوح الآن' : 'Open Now'}</span>
            <a href="tel:${prov.phone}" style="color: #2563EB; font-weight: bold; text-decoration: none;">📞 ${prov.phone}</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: true,
        className: 'google-infowindow-popup',
      });

      marker.on('click', () => {
        if (onSelectProvider) onSelectProvider(prov);
        else setSelectedProviderModal(prov);
      });

      markersRef.current.push(marker);
    });

    // Add User Location Pulse Pin
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-radar-pin',
        html: `
          <div style="position: relative; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 22px; height: 22px; border-radius: 50%; background: #3B82F6; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 14px; height: 14px; border-radius: 50%; background: #2563EB; border: 2.5px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      const userMarker = L.marker(userLocation, { icon: userIcon }).addTo(map);
      userMarker.bindPopup(`<strong>${language === 'ar' ? '📍 موقعك الحالي' : '📍 Your Current Location'}</strong>`);
      markersRef.current.push(userMarker);
    }

    // Add Emergency Location Beacon
    if (emergencyLocation) {
      const emgIcon = L.divIcon({
        className: 'emergency-sos-pin',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="background: #DC2626; color: white; padding: 4px 8px; border-radius: 9999px; font-weight: 900; font-size: 11px; box-shadow: 0 4px 10px rgba(220,38,38,0.5); border: 2px solid white; display: flex; align-items: center; gap: 4px;">
              <span>🚨</span>
              <span>${emergencyLocation.title}</span>
            </div>
            <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 7px solid #DC2626;"></div>
          </div>
        `,
        iconSize: [120, 36],
        iconAnchor: [60, 34],
      });
      const emgMarker = L.marker([emergencyLocation.lat, emergencyLocation.lng], { icon: emgIcon }).addTo(map);
      markersRef.current.push(emgMarker);
    }

    // Add Rescue Tow Truck Marker
    if (rescueTruckLocation) {
      const truckIcon = L.divIcon({
        className: 'rescue-truck-pin',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="background: #059669; color: white; padding: 4px 8px; border-radius: 9999px; font-weight: 900; font-size: 11px; box-shadow: 0 4px 10px rgba(5,150,105,0.5); border: 2px solid white; display: flex; align-items: center; gap: 4px;">
              <span>🚚</span>
              <span>${rescueTruckLocation.title}</span>
            </div>
            <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 7px solid #059669;"></div>
          </div>
        `,
        iconSize: [140, 36],
        iconAnchor: [70, 34],
      });
      const truckMarker = L.marker([rescueTruckLocation.lat, rescueTruckLocation.lng], { icon: truckIcon }).addTo(map);
      markersRef.current.push(truckMarker);
    }
  }, [effectiveProviders, selectedProviderId, userLocation, emergencyLocation, rescueTruckLocation, language]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 flex flex-col isolate">
      {/* Top Floating Control Bar: Combined Cities & Google Map Layer Toggle */}
      {showCountrySelector && (
        <div className="absolute top-3 start-3 end-3 z-20 pointer-events-auto flex flex-wrap items-center justify-between gap-2">
          {/* City Filter Pills for All Combined Cities */}
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-[calc(100%-180px)]">
            <span className="text-[11px] font-black text-slate-700 ps-1 shrink-0 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'ar' ? 'المدينة:' : 'City:'}</span>
            </span>

            <button
              type="button"
              onClick={() => handleCitySelect('all')}
              className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedCityId === 'all'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {language === 'ar' ? 'كافة المناطق' : 'All Regions'} ({selectedCityId === 'all' ? effectiveProviders.length : appProviders.length})
            </button>

            {ALL_COMBINED_CITIES.map((city) => {
              const isCityActive = selectedCityId === city.id;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleCitySelect(city.id, city.lat, city.lng, city.nameEn)}
                  className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    isCityActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-[10px]">{city.countryFlag}</span>
                  <span>{language === 'ar' ? city.nameAr : city.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Google Map Mode Toggle (Roadmap / Satellite / Terrain) */}
          <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-1 ms-auto">
            <button
              type="button"
              onClick={() => setActiveMapLayer('roadmap')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                activeMapLayer === 'roadmap'
                  ? 'bg-blue-600 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Google Maps Roadmap View"
            >
              <span>🗺️</span>
              <span>{language === 'ar' ? 'شوارع' : 'Roadmap'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMapLayer('hybrid')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                activeMapLayer === 'hybrid'
                  ? 'bg-blue-600 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Google Maps Satellite Hybrid View"
            >
              <span>🛰️</span>
              <span>{language === 'ar' ? 'قمر صناعي' : 'Satellite'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMapLayer('terrain')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                activeMapLayer === 'terrain'
                  ? 'bg-blue-600 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Google Maps Terrain Topography View"
            >
              <span>🏔️</span>
              <span>{language === 'ar' ? 'تضاريس' : 'Terrain'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Map Container */}
      <div
        ref={mapContainerRef}
        style={{ height, width: '100%' }}
        className="w-full flex-1 h-full z-0"
      />

      {/* Google Maps Authentic Watermark Logo (Bottom Left) */}
      <div className="absolute bottom-2 start-3 z-10 pointer-events-none flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm border border-slate-200/80">
        <span className="text-[12px] font-black tracking-tight" style={{ fontFamily: 'Product Sans, Roboto, sans-serif' }}>
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </span>
        <span className="text-[10px] text-slate-500 font-medium">Maps</span>
      </div>

      {/* Bottom Center Country Indicator Pill */}
      <div className="absolute bottom-2 end-3 z-10 pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-white text-[11px] font-bold flex items-center gap-2 shadow-lg">
        <span>{currentCountryConfig.flag}</span>
        <span>{language === 'ar' ? currentCountryConfig.nameAr : currentCountryConfig.nameEn}</span>
        <span className="text-amber-400 font-mono">({effectiveProviders.length} {language === 'ar' ? 'مركز معتمد' : 'Centers'})</span>
      </div>
    </div>
  );
};
