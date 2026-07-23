export interface MapSample {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  species: string;
  confidence: number;
  date: string;
  uploadedBy: string;
  lat: number;
  lng: number;
}

const RIVER_LOCATIONS = [
  { name: 'Amazon River', lat: -3.1190, lng: -60.0217, range: 2.0 },
  { name: 'Ganges River', lat: 25.3176, lng: 83.0039, range: 1.5 },
  { name: 'Mississippi River', lat: 29.9511, lng: -90.0715, range: 1.0 },
  { name: 'Nile River', lat: 30.0444, lng: 31.2357, range: 1.5 },
  { name: 'Yangtze River', lat: 31.2304, lng: 121.4737, range: 1.0 }
];

const CITY_LOCATIONS = [
  { name: 'New York', lat: 40.7128, lng: -74.0060, range: 0.1 },
  { name: 'London', lat: 51.5074, lng: -0.1278, range: 0.1 },
  { name: 'Delhi', lat: 28.6139, lng: 77.2090, range: 0.1 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, range: 0.05 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, range: 0.1 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, range: 0.1 }
];

const RIVER_SPECIES = ['Chinese Torrent Frog', 'Mali Screeching Frog', 'Spiny-Back Sucker Frog', "Boulenger's Paa Frog"];
const CITY_SPECIES = ['Urban Fox', 'Peregrine Falcon', 'Eastern Gray Squirrel', 'Common Raccoon'];
const UPLOADERS = ['Aarav', 'Emma', 'Sophia', 'Noah', 'Liam', 'Olivia', 'Ethan', 'Mia'];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

export const generateMockSamples = (): MapSample[] => {
  const samples: MapSample[] = [];
  
  // Generate River Samples (Global eDNA River Survey)
  for (let i = 0; i < 12; i++) {
    const loc = RIVER_LOCATIONS[getRandomInt(0, RIVER_LOCATIONS.length - 1)];
    const date = new Date();
    date.setDate(date.getDate() - getRandomInt(0, 365));
    
    samples.push({
      id: `r-${i}`,
      name: `${loc.name} Sample ${i + 1}`,
      projectId: '11111111-1111-1111-1111-111111111111',
      projectName: 'Global eDNA River Survey',
      species: RIVER_SPECIES[getRandomInt(0, RIVER_SPECIES.length - 1)],
      confidence: getRandomInt(60, 99),
      date: date.toISOString(),
      uploadedBy: UPLOADERS[getRandomInt(0, 3)],
      lat: loc.lat + getRandomFloat(-loc.range, loc.range),
      lng: loc.lng + getRandomFloat(-loc.range, loc.range),
    });
  }

  // Generate City Samples (Urban Canopy Assessment)
  for (let i = 0; i < 12; i++) {
    const loc = CITY_LOCATIONS[getRandomInt(0, CITY_LOCATIONS.length - 1)];
    const date = new Date();
    date.setDate(date.getDate() - getRandomInt(0, 365));

    samples.push({
      id: `u-${i}`,
      name: `${loc.name} Biodiversity Survey`,
      projectId: '22222222-2222-2222-2222-222222222222',
      projectName: 'Urban Canopy Assessment',
      species: CITY_SPECIES[getRandomInt(0, CITY_SPECIES.length - 1)],
      confidence: getRandomInt(60, 99),
      date: date.toISOString(),
      uploadedBy: UPLOADERS[getRandomInt(4, 7)],
      lat: loc.lat + getRandomFloat(-loc.range, loc.range),
      lng: loc.lng + getRandomFloat(-loc.range, loc.range),
    });
  }

  return samples;
};

// Generate static list so it doesn't bounce around on re-renders
export const MOCK_MAP_SAMPLES = generateMockSamples();

export const MAP_STATISTICS = {
  totalSamples: 539,
  totalProjects: 2,
  totalSpecies: 585,
  totalMembers: 192,
};
