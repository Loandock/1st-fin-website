// src/utils/locationData.ts
// Cities and counties for HomeSearchLive dropdown filters

// Complete city list from MLS data (437 cities)
export const FLORIDA_CITIES = [
  'Aguadilla', 'Allendale', 'Amelia', 'Anton', 'Anza', 'Arecibo', 'Asheboro', 'Asuncion',
  'Atlanta', 'Atlantis', 'Ave Maria', 'Aventura', 'Avon Park', 'Bal Harbour', 'Bani',
  'Banner Elk', 'Barranquilla', 'Bavaro', 'Bay Harbor Islands', 'Belgrade', 'Belle Glade',
  'Belleview', 'Benito Juarez', 'Berlin', 'Big Bear Lake', 'Big Pine', 'Biscayne Gardens',
  'Biscayne Park', 'Black Mountain', 'Blytheville', 'Boca Raton', 'Bogota', 'Bolivar',
  'Bonita Springs', 'Boynton Beach', 'Bradenton', 'Brandon', 'Briarcliff Manor',
  'Briny Breezes', 'Brooklyn', 'Bucaramanga', 'Buenos Aires', 'Bulkhead Ridge', 'Bunnell',
  'Cabo Rojo', 'Cabrera', 'Caesarea', 'Cali', 'Canal Point', 'Cancun', 'Cape Canaveral',
  'Cape Coral', 'Carmel', 'Carrabelle', 'Cartagena', 'Cary', 'Citrus Springs', 'Clearwater',
  'Clermont', 'Cleveland', 'Clewiston', 'Cochabamba', 'Cocoa', 'Cocoa Beach', 'Coconut Creek',
  'Coconut Grove', 'Cooper City', 'Coral Gables', 'Coral Springs', 'Cornwall', 'Costa Rica',
  'Cresent City', 'Crystal River', 'Cuenca', 'Cutler Bay', 'Dania Beach', 'Davenport',
  'Davie', 'Daytona', 'Daytona Beach', 'Deerfield Beach', 'Deland', 'Delray Beach',
  'Deltona', 'Des Moines', 'Detroit', 'Dorado', 'Doral', 'Dothan', 'Duck', 'Eagle',
  'Eastern Shores', 'Eastman', 'El Portal', 'Elizabeth', 'Englewood', 'Envigado', 'Epworth',
  'Estero', 'Everglades City', 'Falmouth', 'Fellsmere', 'Fisher Island', 'Florida City',
  'Fort Hancock', 'Fort Lauderdale', 'Fort Myers', 'Fort Pierce', 'Franklinville',
  'Frederiksted', 'Fredonia', 'Frisco', 'Frostproof', 'Gainesville', 'Gatlinburg',
  'Gibsonville', 'Girardot', 'Golden Beach', 'Goulds', 'Grant Valkaria', 'Green Acres',
  'Greendell', 'Guanacaste', 'Guarne', 'Guayaquil', 'Guaynabo', 'Gulf Stream', 'Haines City',
  'Hallandale', 'Hallandale Beach', 'Hanover', 'Haverhill', 'Hazlet', 'Heredia', 'Hettinger',
  'Hialeah', 'Hialeah Gardens', 'Highland Beach', 'Hillsboro Beach', 'Hobe Sound',
  'Hollywood', 'Homestead', 'Homosassa Springs', 'Hudson', 'Humacao', 'Hutchinson Island',
  'Hypoluxo', 'Ibiza', 'Immokalee', 'Indialantic', 'Indian Creek', 'Indian River Shores',
  'Indian Town', 'Inverness', 'Isabela', 'Islamorada', 'Jacksonville', 'Jamaica', 'Jamundi',
  'Jensen Beach', 'Juno Beach', 'Jupiter', 'Jupiter Inlet Colony', 'Jupiter Island',
  'Kendall', 'Key Biscayne', 'Key Colony', 'Key Largo', 'Key West', 'Kingston', 'Kissimmee',
  'La Belle', 'La Mesa', 'La Paz', 'La Union', 'Lackawaxen', 'Lake City', 'Lake Clarke Shores',
  'Lake Park', 'Lake Placid', 'Lake Port', 'Lake Port Twp', 'Lake Wales', 'Lake Worth',
  'Lakeland', 'Lakewood Park', 'Lanesboro', 'Lantana', 'Largo', 'Las Terrenas', 'Las Vegas',
  'Lauderdale By The Sea', 'Lauderdale Lakes', 'Lauderhill', 'Lawrenceville', 'Lazy Lake',
  'Lehigh Acres', 'Leon', 'Lighthouse Point', 'Lima', 'Little Rock', 'Little Torch Key',
  'Loiza', 'Long Key', 'Lonoke', 'Lorida', 'Lower Keys', 'Loxahatchee', 'Lutz', 'Macon',
  'Madrid', 'Malabar', 'Managua', 'Manalapan', 'Manchester', 'Mangonia Park', 'Marathon',
  'Marco Island', 'Margate', 'Mascotte', 'Mayfair', 'Medellin', 'Medley', 'Melbourne',
  'Melbourne Beach', 'Melgar', 'Memphis', 'Merida', 'Merritt Island', 'Mexico', 'Miami',
  'Miami Beach', 'Miami Gardens', 'Miami Lakes', 'Miami Shores', 'Miami Springs', 'Miches',
  'Middle Keys', 'Mims', 'Miramar', 'Monterey', 'Monteverde', 'Moore Haven', 'Morganton',
  'Moricone', 'Mount Dora', 'Mérida', 'Naples', 'Naranja', 'Nevis', 'New Port Richey',
  'New Smyrna Beach', 'New York', 'Niteroi', 'North Bay Village', 'North Bergen',
  'North Lauderdale', 'North Miami', 'North Miami Beach', 'North Palm Beach', 'North Port',
  'Oakland Park', 'Ocala', 'Ocean Ridge', 'Okeechobee', 'Opa Locka', 'Opa-locka', 'Orlando',
  'Ormond Beach', 'Other', 'Other City - In The State Of Florida', 'Other City - Not In The State Of Florida',
  'Other Country - Not In Usa', 'Other Fl Key', 'Pahokee', 'Palatka', 'Palermo', 'Palm Bay', 'Palm Beach',
  'Palm Beach Gardens', 'Palm Beach Shores', 'Palm City', 'Palm Coast', 'Palm Harbor',
  'Palm Springs', 'Palmetto Bay', 'Palmira', 'Panama', 'Panama City', 'Parkland',
  'Pembroke Park', 'Pembroke Pines', 'Pereira', 'Perrine', 'Philadelphia', 'Pinecrest',
  'Plant City', 'Plantation', 'Plantation Key', 'Plover', 'Point Pleasant Beach',
  'Pompano Beach', 'Port Charlotte', 'Port Orange', 'Port Saint Lucie', 'Port St Lucie',
  'Port St. Lucie', 'Portland', 'Progreso', 'Punta Cana', 'Punta Del Este', 'Punta Gorda',
  'Puntarenas', 'Quito', 'Raleigh', 'Randleman', 'Rio Grande', 'Rionegro', 'Riverview',
  'Riviera Beach', 'Roatan', 'Rockledge', 'Rome', 'Royal Palm Beach', 'Runaway Bay',
  'Sabaneta', 'Saint Cloud', 'Saint Lucie Village', 'Saint Lucie West', 'Saint Mary',
  'Salento', 'Salinas', 'San Antonio Del Tequendama', 'San Bernardino', 'San Carlos',
  'San Felipe', 'San Francisco', 'San Gregorio', 'San Jose', 'San Juan', 'San Luis',
  'San Pedro De Macoris', 'Sanford', 'Santa Ana', 'Santa Cruz', 'Santa Elena', 'Santa Marta',
  'Santander', 'Santiago', 'Santo Domingo', 'Santo Domingo Este', 'Sao Paulo', 'Sapphire',
  'Sarasota', 'Satellite Beach', 'Sautee Nacoochee', 'Sea Ranch Lakes', 'Seagrove',
  'Sebastian', 'Sebring', 'Seminole', 'Sewalls Point', 'Singer Island', 'South Bay',
  'South Miami', 'South Palm Beach', 'Southampton', 'Southlake', 'Southwest Ranches',
  'Spring Hill', 'St Ann', 'St Augustine', 'St Cloud', 'St Lucie West', 'St Mary',
  'St Petersburg', 'St Thomas', 'Stantonsburg', 'Starke', 'Staten Island', 'Stuart',
  'Sugarloaf', 'Summerfield', 'Sunny Isles Beach', 'Sunrise', 'Surfside', 'Sweetwater',
  'Syracuse', 'Tallahassee', 'Tamarac', 'Tampa', 'Tavernier', 'Taylor Creek', 'Tequesta',
  'The Villages', 'Thomasville', 'Tibau Do Sul', 'Titusville', 'Torch Key', 'Toronto',
  'Trinity', 'Tulum', 'Turrialba', 'Tuxtla Gutierrez', 'Ubatuba', 'Unincorporated Broward',
  'Unincorporated Broward County', 'Unincorporated Dade', 'Unincorporated Dade County',
  'Unincorporated Palm Beach County', 'Union City', 'Vega Alta', 'Venice', 'Vero Beach',
  'Virginia Beach', 'Virginia Gardens', 'Wellesley Island', 'Wellington', 'West Melbourne',
  'West Miami', 'West Palm Beach', 'West Park', 'Westlake', 'Westland', 'Westmoreland',
  'Weston', 'White Oak', 'Wildwood', 'Williams', 'Williston', 'Wilton Manors',
  'Winston Salem', 'Winter Garden', 'Winter Haven', 'Winter Park', 'Zephyrhills'
];

// Complete Florida counties list (67 counties)
export const FLORIDA_COUNTIES = [
  'Alachua', 'Baker', 'Bay', 'Bradford', 'Brevard', 'Broward', 'Calhoun', 'Charlotte',
  'Citrus', 'Clay', 'Collier', 'Columbia', 'DeSoto', 'Dixie', 'Duval', 'Escambia',
  'Flagler', 'Franklin', 'Gadsden', 'Gilchrist', 'Glades', 'Gulf', 'Hamilton', 'Hardee',
  'Hendry', 'Hernando', 'Highlands', 'Hillsborough', 'Holmes', 'Indian River', 'Jackson',
  'Jefferson', 'Lafayette', 'Lake', 'Lee', 'Leon', 'Levy', 'Liberty', 'Madison', 'Manatee',
  'Marion', 'Martin', 'Miami-Dade', 'Monroe', 'Nassau', 'Okaloosa', 'Okeechobee', 'Orange',
  'Osceola', 'Palm Beach', 'Pasco', 'Pinellas', 'Polk', 'Putnam', 'Santa Rosa', 'Sarasota',
  'Seminole', 'St. Johns', 'St. Lucie', 'Sumter', 'Suwannee', 'Taylor', 'Union', 'Volusia',
  'Wakulla', 'Walton', 'Washington'
];

// Legacy export for backward compatibility
export const FLORIDA_LOCATIONS = FLORIDA_CITIES;

// Combined list for typeahead
export const ALL_LOCATIONS = [
  ...FLORIDA_COUNTIES.map(county => ({ name: county, type: 'county' as const })),
  ...FLORIDA_LOCATIONS.map(city => ({ name: city, type: 'city' as const }))
].sort((a, b) => a.name.localeCompare(b.name));

// Filter function for typeahead
export function filterLocations(query: string, limit: number = 10) {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return ALL_LOCATIONS
    .filter(location => 
      location.name.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit);
}

// Reusable list of US states for dropdowns
export const US_STATES: Array<{ code: string; name: string }> = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'PR', name: 'Puerto Rico' },
];
