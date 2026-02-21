import { NextRequest, NextResponse } from 'next/server';

type GeoRow = [name: string, state: string, code: string];

const STATE_FIPS: Record<string, string> = {
  AL: '01', AK: '02', AZ: '04', AR: '05', CA: '06', CO: '08', CT: '09',
  DE: '10', DC: '11', FL: '12', GA: '13', HI: '15', ID: '16', IL: '17',
  IN: '18', IA: '19', KS: '20', KY: '21', LA: '22', ME: '23', MD: '24',
  MA: '25', MI: '26', MN: '27', MS: '28', MO: '29', MT: '30', NE: '31',
  NV: '32', NH: '33', NJ: '34', NM: '35', NY: '36', NC: '37', ND: '38',
  OH: '39', OK: '40', OR: '41', PA: '42', RI: '44', SC: '45', SD: '46',
  TN: '47', TX: '48', UT: '49', VT: '50', VA: '51', WA: '53', WV: '54',
  WI: '55', WY: '56', PR: '72',
};

const CENSUS_BASE = 'https://api.census.gov/data/2023/acs/acs5';
const KEY = process.env.CENSUS_API_KEY || '';

async function fetchJson<T = unknown>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Census ${r.status}: ${await r.text()}`);
  return r.json() as Promise<T>;
}

export async function GET(req: NextRequest) {
  try {
    const stateParam = req.nextUrl.searchParams.get('state')?.trim();
    if (!stateParam) {
      return NextResponse.json({ error: 'Missing ?state= (use 2-letter like FL or FIPS like 12).' }, { status: 400 });
    }

    const stateFips = /^[0-9]{2}$/.test(stateParam)
      ? stateParam
      : STATE_FIPS[stateParam.toUpperCase()];
    if (!stateFips) {
      return NextResponse.json({ error: `Unknown state: ${stateParam}` }, { status: 400 });
    }

    const qpCounties = new URLSearchParams({ get: 'NAME', for: 'county:*', in: `state:${stateFips}` });
    if (KEY) qpCounties.set('key', KEY);
    const countiesUrl = `${CENSUS_BASE}?${qpCounties.toString()}`;
    const countiesRows = await fetchJson<string[][]>(countiesUrl);
    const counties = (countiesRows.slice(1) as GeoRow[]).map(([name, state, county]) => ({
      name,
      stateFips: state,
      countyFips: county,
      geoid: `${state}${county}`,
    }));

    const qpPlaces = new URLSearchParams({ get: 'NAME', for: 'place:*', in: `state:${stateFips}` });
    if (KEY) qpPlaces.set('key', KEY);
    const placesUrl = `${CENSUS_BASE}?${qpPlaces.toString()}`;
    const placesRows = await fetchJson<string[][]>(placesUrl);
    const places = (placesRows.slice(1) as GeoRow[]).map(([name, state, place]) => ({
      name,
      stateFips: state,
      placeCode: place,
      geoid: `${state}${place}`,
    }));

    return NextResponse.json({
      state: stateParam,
      stateFips,
      counts: { counties: counties.length, places: places.length },
      counties,
      places,
      meta: {
        source: 'U.S. Census Bureau, ACS 5-Year (2023), Data API',
      },
    }, {
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
