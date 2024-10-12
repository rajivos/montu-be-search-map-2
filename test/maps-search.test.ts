import { config } from 'dotenv';
import { describe } from '@jest/globals';
import { getPlaceAutocomplete } from '../src/maps-api';
import { getAutoCompleteDetails } from '../src';

config();

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  describe('getAutoCompleteDetails', () => {
    it('returns a promise', async () => {
      const res = getAutoCompleteDetails('Charlotte Street');
      expect(res).toBeInstanceOf(Promise);
    });

    it('can fetch from the autocomplete api', async () => {
      const res = await getAutoCompleteDetails('Charlotte Street');
      const firstRes = res[0];
      expect(firstRes).toHaveProperty('placeId');
      expect(firstRes).toHaveProperty('streetName');
      expect(firstRes).toHaveProperty('countryCode');
      expect(firstRes).toHaveProperty('country');
      expect(firstRes).toHaveProperty('freeformAddress');
      expect(firstRes).toHaveProperty('municipality');
    });
  });

  describe('getPlaceAutocomplete', () => {
    const apiKey: string = process.env.TOMTOM_API_KEY as string;

    beforeAll(() => {
      if (!apiKey) {
        throw new Error(
          'TOMTOM_API_KEY is not defined in the environment variables.'
        );
      }
    });

    it('handles no results', async () => {
      const res = await getPlaceAutocomplete(apiKey, 'asfasffasfasafsafs');
      expect(res).toStrictEqual([]);
    });

    it('handles error', async () => {
      await expect(getPlaceAutocomplete(apiKey, '')).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining('Address is required'),
        })
      );
    });
  });
});
