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

  const res: Address[] = await getPlaceAutocomplete(apiKey, address);

  return res;
}
