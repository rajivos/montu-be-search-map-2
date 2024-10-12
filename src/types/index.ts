interface addressRequest {
  streetNumber: string;
  streetName: string;
  municipality: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
}

type LocationResult = {
  type?: string;
  id: string;
  address: addressRequest;
};

type Address = addressRequest & {
  placeId: string;
};

export { Address, LocationResult };
