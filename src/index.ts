import { getPlaceAutocomplete } from './maps-api';
import { Address } from './types/';

export async function getAutoCompleteDetails(
  address: string
): Promise<Address[]> {
  const apiKey = process.env.TOMTOM_API_KEY;

  if (!apiKey) {
    throw new Error(
      'TOMTOM_API_KEY is not defined in the environment variables.'
    );
  }
  // get autocomplete results
  try {
    return await getPlaceAutocomplete(apiKey, address);
  } catch (error) {
    console.error('Error fetching address autocomplete:', error);
    throw new Error('Failed to fetch address autocomplete suggestions');
  }
}
