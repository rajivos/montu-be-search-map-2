import axios, { AxiosError } from 'axios';
import { Address, LocationResult } from './types';


const API_BASE_URL = 'https://api.tomtom.com/search/2';
const SEARCH_ENDPOINT = 'search';

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  address: string
): Promise<Address[]> {

  if (!address || address.trim().length === 0) {
    throw Error('Address is required');
  }

  const encodedAddress = encodeURIComponent(address);

  try {

    const response = await axios.get(
      `${API_BASE_URL}/${SEARCH_ENDPOINT}/${encodedAddress}.json`,
      {
        params: {
          key,
          limit: 100,
          countrySet: process.env.COUNTRY_SET || 'AU',
        },
      }
    );

    const results: Array<LocationResult> = response.data.results;

    return results.map(({ id, address }: LocationResult): Address => {
      return {
        placeId: id,
        streetName: address.streetName,
        streetNumber: address.streetNumber,
        countryCode: address.countryCode,
        country: address.country,
        freeformAddress: address.freeformAddress,
        municipality: address.municipality,
      };
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(`Failed to fetch autocomplete results: ${axiosError.message}`);
    }
    throw new Error('An unexpected error occurred while fetching autocomplete results');
  }
}
