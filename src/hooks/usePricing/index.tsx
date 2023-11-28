'use client';
import { useEffect } from 'react';
import getPricePerNight from '~/actions/smoobu/getPricePerNight';

// This is a hook to manage the pricing of the reservation

import type { villaIdsType } from '~/types/smoobu';
import { calculateDiscount, daysBetweenDates } from '~/utils/calculations';
import logError from '~/utils/logError';

// It will accept checkIn, checkOut, villaId, discounts?
const usePricing = ({
  checkIn,
  checkOut,
  villaId,
}: {
  checkIn: string;
  checkOut: string;
  villaId: villaIdsType;
}) => {
  // add a use effect, where when any of these props change then run these functions:
  // getPricePerNight
  // calculateNumDays
  // calculateDiscount
  // calculateTaxes
  // calculateTotal

  useEffect(() => {
    const calculateTotals = async () => {
      const pricePerNight = await getPricePerNight({
        checkIn,
        checkOut,
        villaId,
      });
      const numDays = daysBetweenDates(checkIn, checkOut);
      if (pricePerNight) {
        const discount = pricePerNight * 0.1;
        const taxes = pricePerNight * 0.11;
        const total = (pricePerNight - discount + taxes) * numDays;

        // then save all of these values to the zustand state
      } else {
        throw new Error(`No price found for ${villaId} ${checkIn} ${checkOut}`);
      }
    };

    calculateTotals().catch((error) => {
      logError('Error calculating totals', error);
    });
  }, [checkIn, checkOut, villaId]);

  // then save all of these values to the zustand state
  // return the values
};
