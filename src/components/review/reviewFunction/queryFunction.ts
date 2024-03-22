import { supabase } from '@/shared/supabase/supabase';

import type { review_info } from '../reviewType';

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const getReview = async (id: number): Promise<review_info[]> => {
  const { data, error } = await supabase.from('review_info').select('*').eq('toilet_id', id);
  if (error) {
    throw error.message;
  }
  return data;
};

export const getReviewId = async () => {
  const { data } = await supabase.from('review_info').select('review_id');
  return data;
};

export const addReview = async (newReview: any) => {
  const { data, error } = await supabase.from('review_info').insert(newReview).select();
  if (error) {
    throw new Error(error?.message);
  }
  return data;
};

export const changeReview = async (review_id: number, changeText: string) => {
  const { data, error } = await supabase
    .from('review_info')
    .update({ review_content: changeText })
    .eq('review_id', review_id)
    .select();
  if (error) {
    throw new Error(error?.message);
  }
  return data;
};

export const deleteReview = async (review_id: number) => {
  const { error } = await supabase.from('review_info').delete().eq('review_id', review_id);
  return error;
};
