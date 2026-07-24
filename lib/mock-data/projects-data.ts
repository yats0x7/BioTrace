// Shared Mock Data for Community Projects

export const MOCK_STATS: Record<string, any> = {
  '11111111-1111-1111-1111-111111111111': {
    category: 'Freshwater',
    region: 'Global',
    status: 'Active',
    target_samples: 1000,
    current_samples: 347,
    member_count: 128,
    species_count: 412,
    image_url: '/river.png',
  },
  '22222222-2222-2222-2222-222222222222': {
    category: 'Urban Ecology',
    region: 'Worldwide',
    status: 'Active',
    target_samples: 500,
    current_samples: 192,
    member_count: 64,
    species_count: 173,
    image_url: '/urban.png',
  }
};

export const PROJECT_MOCK_DATA: Record<string, any> = {
  '11111111-1111-1111-1111-111111111111': {
    species: [
      { name: 'Chinese Torrent Frog', confidence: 0.98, status: 'Endangered' },
      { name: 'Mali Screeching Frog', confidence: 0.95, status: 'Vulnerable' },
      { name: 'Spiny-Back Sucker Frog', confidence: 0.91, status: 'Least Concern' },
      { name: 'Boulenger\'s Paa Frog', confidence: 0.89, status: 'Near Threatened' }
    ],
    activity: [
      { user: 'Aarav', action: 'uploaded 5 freshwater samples', time: '2 hours ago' },
      { user: 'Emma', action: 'identified 3 new amphibians', time: '5 hours ago' },
      { user: 'Sophia', action: 'joined the project', time: '1 day ago' },
      { user: 'Noah', action: 'uploaded Amazon River sequences', time: '2 days ago' }
    ],
    members: [
      { name: 'Dr. Jane Smith', role: 'Lead Researcher', contributions: 142 },
      { name: 'Aarav Patel', role: 'Contributor', contributions: 89 },
      { name: 'Emma Wilson', role: 'Contributor', contributions: 56 },
      { name: 'Noah Garcia', role: 'Contributor', contributions: 24 }
    ]
  },
  '22222222-2222-2222-2222-222222222222': {
    species: [
      { name: 'Urban Fox', confidence: 0.97, status: 'Least Concern' },
      { name: 'Peregrine Falcon', confidence: 0.94, status: 'Least Concern' },
      { name: 'Eastern Gray Squirrel', confidence: 0.99, status: 'Least Concern' },
      { name: 'Common Raccoon', confidence: 0.92, status: 'Least Concern' }
    ],
    activity: [
      { user: 'Liam', action: 'uploaded 12 park soil samples', time: '3 hours ago' },
      { user: 'Olivia', action: 'identified 2 bird species', time: '6 hours ago' },
      { user: 'Ethan', action: 'joined the project', time: '1 day ago' },
      { user: 'Mia', action: 'uploaded city lake water sequences', time: '3 days ago' }
    ],
    members: [
      { name: 'Dr. Robert Chen', role: 'Lead Ecologist', contributions: 215 },
      { name: 'Liam Johnson', role: 'Contributor', contributions: 112 },
      { name: 'Olivia Martinez', role: 'Contributor', contributions: 78 },
      { name: 'Ethan Davis', role: 'Contributor', contributions: 45 }
    ]
  }
};
