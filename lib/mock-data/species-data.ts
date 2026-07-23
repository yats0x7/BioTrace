export interface SpeciesDetail {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  genus: string;
  order: string;
  conservationStatus: string;
  habitat: string;
  geographicRange: string;
  description: string;
  averageConfidence: number;
  detectedSamples: number;
  projectIds: string[];
  projectNames: string[];
  recentDetections: {
    sampleName: string;
    projectName: string;
    confidence: number;
    date: string;
  }[];
}

const RIVER_PROJECT_ID = '11111111-1111-1111-1111-111111111111';
const RIVER_PROJECT_NAME = 'Global eDNA River Survey';

const URBAN_PROJECT_ID = '22222222-2222-2222-2222-222222222222';
const URBAN_PROJECT_NAME = 'Urban Canopy Assessment';

export const MOCK_SPECIES_DB: SpeciesDetail[] = [
  {
    id: 'chinese-torrent-frog',
    commonName: 'Chinese Torrent Frog',
    scientificName: 'Amolops chunganensis',
    family: 'Ranidae',
    genus: 'Amolops',
    order: 'Anura',
    conservationStatus: 'Endangered',
    habitat: 'Fast-flowing mountain streams and adjacent forests.',
    geographicRange: 'Southern China',
    description: 'A species of true frog found in mountainous regions. Known for its ability to cling to wet rocks in fast-flowing streams. eDNA detections often indicate high water quality and undisturbed stream habitats.',
    averageConfidence: 96,
    detectedSamples: 42,
    projectIds: [RIVER_PROJECT_ID],
    projectNames: [RIVER_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'Yangtze Tributary 04', projectName: RIVER_PROJECT_NAME, confidence: 98, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
      { sampleName: 'Mountain Stream B', projectName: RIVER_PROJECT_NAME, confidence: 94, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
    ]
  },
  {
    id: 'mali-screeching-frog',
    commonName: 'Mali Screeching Frog',
    scientificName: 'Arthroleptis palavanensis',
    family: 'Arthroleptidae',
    genus: 'Arthroleptis',
    order: 'Anura',
    conservationStatus: 'Vulnerable',
    habitat: 'Tropical moist lowland forests.',
    geographicRange: 'Sub-Saharan Africa',
    description: 'A small terrestrial frog known for its distinct, high-pitched vocalizations. Detection usually points to moist leaf litter presence, which is highly sensitive to canopy reduction and climate shifts.',
    averageConfidence: 94,
    detectedSamples: 28,
    projectIds: [RIVER_PROJECT_ID, URBAN_PROJECT_ID],
    projectNames: [RIVER_PROJECT_NAME, URBAN_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'Delhi Biodiversity Survey 1', projectName: URBAN_PROJECT_NAME, confidence: 94, date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
      { sampleName: 'Nile Basin 11', projectName: RIVER_PROJECT_NAME, confidence: 95, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString() },
    ]
  },
  {
    id: 'spiny-back-sucker-frog',
    commonName: 'Spiny-Back Sucker Frog',
    scientificName: 'Pseudis paradoxa',
    family: 'Hylidae',
    genus: 'Pseudis',
    order: 'Anura',
    conservationStatus: 'Least Concern',
    habitat: 'Lakes, ponds, and slow-moving rivers.',
    geographicRange: 'South America',
    description: 'Unique amphibian known for its massive tadpole stage. Often found in stagnant or slow-moving water bodies. Their widespread eDNA signatures help track aquatic ecosystem connectivity.',
    averageConfidence: 91,
    detectedSamples: 85,
    projectIds: [RIVER_PROJECT_ID, URBAN_PROJECT_ID],
    projectNames: [RIVER_PROJECT_NAME, URBAN_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'Central Park Lake', projectName: URBAN_PROJECT_NAME, confidence: 91, date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
      { sampleName: 'Amazon River Sample 14', projectName: RIVER_PROJECT_NAME, confidence: 89, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
    ]
  },
  {
    id: 'boulengers-paa-frog',
    commonName: "Boulenger's Paa Frog",
    scientificName: 'Quasipaa boulengeri',
    family: 'Dicroglossidae',
    genus: 'Quasipaa',
    order: 'Anura',
    conservationStatus: 'Near Threatened',
    habitat: 'Hill streams and high altitude wetlands.',
    geographicRange: 'Southeast Asia',
    description: 'A robust frog preferring clear, cold water streams. Declining populations due to habitat loss make eDNA monitoring crucial for determining their remaining strongholds.',
    averageConfidence: 89,
    detectedSamples: 15,
    projectIds: [RIVER_PROJECT_ID],
    projectNames: [RIVER_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'Ganges Headwaters 01', projectName: RIVER_PROJECT_NAME, confidence: 89, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString() },
    ]
  },
  {
    id: 'taipeh-frog',
    commonName: 'Taipeh Frog',
    scientificName: 'Hylarana taipehensis',
    family: 'Ranidae',
    genus: 'Hylarana',
    order: 'Anura',
    conservationStatus: 'Least Concern',
    habitat: 'Swamps, marshes, and agricultural land.',
    geographicRange: 'East and Southeast Asia',
    description: 'Highly adaptable frog that can survive in human-modified landscapes. High eDNA concentrations in agricultural runoff often correlate with this species.',
    averageConfidence: 92,
    detectedSamples: 56,
    projectIds: [RIVER_PROJECT_ID],
    projectNames: [RIVER_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'Yangtze Delta 44', projectName: RIVER_PROJECT_NAME, confidence: 93, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString() },
    ]
  },
  {
    id: 'urban-fox',
    commonName: 'Urban Fox',
    scientificName: 'Vulpes vulpes',
    family: 'Canidae',
    genus: 'Vulpes',
    order: 'Carnivora',
    conservationStatus: 'Least Concern',
    habitat: 'Urban and suburban environments.',
    geographicRange: 'Northern Hemisphere',
    description: 'Highly adaptable mammal that thrives in urban areas. eDNA traces are commonly found in parks, gardens, and urban water features.',
    averageConfidence: 97,
    detectedSamples: 112,
    projectIds: [URBAN_PROJECT_ID],
    projectNames: [URBAN_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'London Hyde Park Soil', projectName: URBAN_PROJECT_NAME, confidence: 98, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString() },
      { sampleName: 'NY Central Park Swab', projectName: URBAN_PROJECT_NAME, confidence: 96, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
    ]
  },
  {
    id: 'peregrine-falcon',
    commonName: 'Peregrine Falcon',
    scientificName: 'Falco peregrinus',
    family: 'Falconidae',
    genus: 'Falco',
    order: 'Falconiformes',
    conservationStatus: 'Least Concern',
    habitat: 'Tall city buildings and bridges.',
    geographicRange: 'Cosmopolitan',
    description: 'A raptor that has adapted to hunting pigeons in cities, nesting on skyscrapers. eDNA usually recovered from rooftop swab samples and water baths.',
    averageConfidence: 94,
    detectedSamples: 34,
    projectIds: [URBAN_PROJECT_ID],
    projectNames: [URBAN_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'Tokyo Tower Array', projectName: URBAN_PROJECT_NAME, confidence: 94, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString() },
    ]
  },
  {
    id: 'eastern-gray-squirrel',
    commonName: 'Eastern Gray Squirrel',
    scientificName: 'Sciurus carolinensis',
    family: 'Sciuridae',
    genus: 'Sciurus',
    order: 'Rodentia',
    conservationStatus: 'Least Concern',
    habitat: 'Urban parks and woodlands.',
    geographicRange: 'Eastern North America (Native), Europe (Introduced)',
    description: 'Common urban rodent. Massive amounts of eDNA are shed into park soils and urban canopies where they reside.',
    averageConfidence: 99,
    detectedSamples: 205,
    projectIds: [URBAN_PROJECT_ID],
    projectNames: [URBAN_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'NY Central Park Swab', projectName: URBAN_PROJECT_NAME, confidence: 99, date: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
      { sampleName: 'London Regents Park', projectName: URBAN_PROJECT_NAME, confidence: 98, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
    ]
  },
  {
    id: 'common-raccoon',
    commonName: 'Common Raccoon',
    scientificName: 'Procyon lotor',
    family: 'Procyonidae',
    genus: 'Procyon',
    order: 'Carnivora',
    conservationStatus: 'Least Concern',
    habitat: 'Urban and suburban areas, forests.',
    geographicRange: 'North America, introduced elsewhere',
    description: 'Nocturnal omnivores adapted tightly to human settlements. Readily leaves eDNA traces near urban water sources and refuse areas.',
    averageConfidence: 92,
    detectedSamples: 165,
    projectIds: [URBAN_PROJECT_ID],
    projectNames: [URBAN_PROJECT_NAME],
    recentDetections: [
      { sampleName: 'NY Alley Water Runoff', projectName: URBAN_PROJECT_NAME, confidence: 92, date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
    ]
  }
];

export const SPECIES_STATISTICS = {
  totalSpecies: 585,
  threatenedSpecies: 142,
  projectsCovered: 2,
  totalSamples: 539,
};
