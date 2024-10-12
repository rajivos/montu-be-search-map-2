import axios from 'axios';
import { Address, LocationResult } from './types';

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  address: string
): Promise<Address[]> {
  try {
    if (!address.trim()) {
      throw Error('Address is required');
    }
    const response = await axios.get(
      `https://api.tomtom.com/search/2/search/${address}.json`,
      {
        params: {
          key,
          limit: 100,
          countrySet: 'AU',
        },
      }
    );

    const results: Array<LocationResult> = response.data.results;

    return results.map((result: LocationResult): Address => {
      return {
        placeId: result.id,
        streetName: result.address.streetName,
        streetNumber: result.address.streetNumber,
        countryCode: result.address.countryCode,
        country: result.address.country,
        freeformAddress: result.address.freeformAddress,
        municipality: result.address.municipality,
      };
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch autocomplete results: ${error?.message}`);
  }
}
