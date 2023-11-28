'use server';
import axios from 'axios';

import type { villaIdsType } from '~/types/smoobu';

type RateDetails = {
  price: number | null;
  min_length_of_stay: number | null;
  available: number;
};

type Rates = Record<string, RateDetails>; // Record for dates to RateDetails

interface ApiResponse {
  data: Record<string, Rates>; // Record for villaId to Rates
}

export default async function getPricePerNight({
  villaId,
  checkIn,
  checkOut,
}: {
  villaId: villaIdsType;
  checkIn: string;
  checkOut: string;
}): Promise<number | null> {
  const url = process.env.SMOOBU_API_URL;
  const apiKey = process.env.SMOOBU_API_KEY;
  try {
    const { data } = await axios.get<ApiResponse>(url + '/rates', {
      params: {
        start_date: checkIn,
        end_date: checkOut,
        apartments: [villaId],
      },
      headers: {
        'Api-Key': apiKey,
      },
    });

    const rates = data.data[villaId];

    if (!rates) {
      throw new Error(`No rates found for ${villaId} ${checkIn} ${checkOut}`);
      return null;
    }

    return findMaxPrice(rates);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      console.error(`Stack: ${error.stack}`);
    }
    return null;
  }
}

function findMaxPrice(rates: Rates): number {
  let maxPrice = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, rate] of Object.entries(rates)) {
    if (rate?.price && rate.price > maxPrice) {
      maxPrice = rate.price;
    }
  }

  return maxPrice;
}
