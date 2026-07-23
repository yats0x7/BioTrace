export const PROFILE_USER = {
  name: 'Dr. Elena Rostova',
  email: 'elena.rostova@university.edu',
  bio: 'Ecologist specializing in freshwater amphibian populations and urban biodiversity adaptation. Passionate about leveraging AI for scalable eDNA tracking.',
  institution: 'Global Environmental Institute',
  country: 'Switzerland',
  memberSince: '2025-01-15T00:00:00Z',
  contributorLevel: 'Senior Researcher',
};

export const PROFILE_STATS = {
  samplesUploaded: 47,
  speciesIdentified: 12,
  projectsJoined: 2,
  reportsGenerated: 5,
  averageConfidence: 94,
  conservationContributions: 8,
  mapContributions: 47,
  totalAnalysisCompleted: 47,
};

export const PROFILE_ACHIEVEMENTS = [
  { id: '1', title: 'First Sample', description: 'Uploaded first eDNA sample', icon: 'upload', date: '2025-01-20T00:00:00Z' },
  { id: '2', title: 'Species Explorer', description: 'Identified 10 unique species', icon: 'fingerprint', date: '2025-04-12T00:00:00Z' },
  { id: '3', title: 'Project Contributor', description: 'Joined a global survey', icon: 'folder', date: '2025-02-05T00:00:00Z' },
  { id: '4', title: 'AI Pioneer', description: 'Achieved >95% ML confidence', icon: 'cpu', date: '2025-03-22T00:00:00Z' },
  { id: '5', title: 'Community Researcher', description: 'Contributed to 2 public projects', icon: 'users', date: '2025-06-18T00:00:00Z' },
  { id: '6', title: 'Map Contributor', description: 'Plotted 40+ global locations', icon: 'map', date: '2025-08-30T00:00:00Z' },
];

export const PROFILE_ACTIVITY = [
  { id: 'a1', title: 'Joined Urban Canopy Assessment', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), type: 'project' },
  { id: 'a2', title: 'Generated Biodiversity Report', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), type: 'report' },
  { id: 'a3', title: 'Detected Chinese Torrent Frog', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), type: 'species' },
  { id: 'a4', title: 'Uploaded Amazon River Sample 14', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13).toISOString(), type: 'upload' },
  { id: 'a5', title: 'Joined Global eDNA River Survey', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), type: 'project' },
];

export const PROFILE_PROJECTS = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Global eDNA River Survey',
    role: 'Lead Contributor',
    contributionPercent: 18,
    samplesSubmitted: 32,
    speciesDetected: 8,
    lastContribution: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13).toISOString(),
    progress: 75,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Urban Canopy Assessment',
    role: 'Contributor',
    contributionPercent: 5,
    samplesSubmitted: 15,
    speciesDetected: 4,
    lastContribution: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    progress: 40,
  }
];

export const PROFILE_TOP_SPECIES = [
  { name: 'Chinese Torrent Frog', confidence: 96, project: 'Global eDNA River Survey', count: 14 },
  { name: 'Mali Screeching Frog', confidence: 94, project: 'Urban Canopy Assessment', count: 8 },
  { name: 'Spiny-Back Sucker Frog', confidence: 91, project: 'Urban Canopy Assessment', count: 6 },
  { name: "Boulenger's Paa Frog", confidence: 89, project: 'Global eDNA River Survey', count: 4 },
  { name: 'Taipeh Frog', confidence: 92, project: 'Global eDNA River Survey', count: 3 },
];

export const PROFILE_MAP_COORDS = [
  { lat: -3.1190, lng: -60.0217, name: 'Amazon River Sample 14' },
  { lat: 25.3176, lng: 83.0039, name: 'Ganges Headwaters 01' },
  { lat: 28.6139, lng: 77.2090, name: 'Delhi Biodiversity Survey' },
  { lat: 40.7128, lng: -74.0060, name: 'NY Central Park Swab' },
  { lat: 51.5074, lng: -0.1278, name: 'London Hyde Park Soil' },
];
