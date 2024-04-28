import { SerializedError } from '@reduxjs/toolkit';
import { MessageResponse } from '../types/api-types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';

type ResponseType =
  | { data: MessageResponse }
  | { error: FetchBaseQueryError | SerializedError };

export const responseToast = (
  response: ResponseType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ('data' in response) {
    toast.success(response.data.message);
    if (navigate) {
      navigate(url);
    }
  } else {
    const error = response.error as FetchBaseQueryError;
    const messageResponse = error.data as MessageResponse;

    toast.error(messageResponse.message);
  }
};

export const getLastMonths = () => {
  const currentDate = moment();
  currentDate.date(1);
  const lastSixMonths: string[] = [];
  const lastTwelveMonths: string[] = [];

  for (let i = 1; i <= 6; i++) {
    const monthDate = currentDate.clone().subtract(i, 'months');
    const monthName = monthDate.format('MMMM');

    lastSixMonths.unshift(monthName);
  }

  for (let i = 1; i <= 12; i++) {
    const monthDate = currentDate.clone().subtract(i, 'months');
    const monthName = monthDate.format('MMMM');

    lastTwelveMonths.unshift(monthName);
  }

  return {
    lastSixMonths,
    lastTwelveMonths,
  };
};
