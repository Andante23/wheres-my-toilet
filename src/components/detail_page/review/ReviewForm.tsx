'use client';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addReview, getUser } from '../../../api/reviewQuery/queryFunction';

function ReviewForm({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const [toiletRate, setToiletRate] = useState({
    cleanRate: 0,
    locationRate: 0,
    popRate: 0,
  });
  const [reviewContent, setReviewContent] = useState('');

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const addMutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
      setReviewContent('');
      setToiletRate({
        cleanRate: 0,
        locationRate: 0,
        popRate: 0,
      });
    },
  });

  const handleAddReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!toiletRate.cleanRate || !toiletRate.locationRate || !toiletRate.popRate || !reviewContent) {
      alert('리뷰를 남겨주세요!');
      return;
    }
    const newReview = {
      review_id: Math.floor(Math.random() * 500),
      user_id: data?.user_metadata.email,
      review_content: reviewContent,
      toilet_id: id,
      user_nickname: data?.user_metadata.display_name,
      toilet_clean_rate: toiletRate.cleanRate,
      toilet_loc_rate: toiletRate.locationRate,
      toilet_pop_rate: toiletRate.popRate,
    };

    if (data) {
      addMutation.mutate(newReview);
    }
  };

  return (
    <>
      <h2 className="w-60 h-14 text-center py-4  bg-black text-white rounded-xl my-4 ml-auto mr-auto">사용자 리뷰</h2>
      <form className="flex flex-col items-center" onSubmit={handleAddReview}>
        <label className="w-4/6 mb-2">
          청결도 :&nbsp;
          <select
            value={toiletRate.cleanRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletRate((prev) => ({ ...prev, cleanRate: +value }));
            }}
          >
            <option>점수를 주세요</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </label>
        <label className="w-4/6 mb-2">
          위치 :&nbsp;
          <select
            value={toiletRate.locationRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletRate((prev) => ({ ...prev, locationRate: +value }));
            }}
          >
            <option>위치 점수를&nbsp;주세요</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </label>
        <label className="w-4/6 mb-2">
          인구밀도 :&nbsp;
          <select
            value={toiletRate.popRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletRate((prev) => ({ ...prev, popRate: +value }));
            }}
          >
            <option>인구밀도 정도를&nbsp;매겨주세요</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </label>
        <div>
          <input
            type="text"
            value={reviewContent}
            placeholder="리뷰를 입력해주세요~"
            onChange={(e) => {
              setReviewContent(e.target.value);
            }}
          />
          <button>리뷰를 올려 주세요</button>
        </div>
      </form>
    </>
  );
}

export default ReviewForm;