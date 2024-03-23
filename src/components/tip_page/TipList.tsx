'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import TipCard from './TipCard';
import TipModal from './TipModal';
import { getTips } from '@/util/tip_page/api';

export type Tip = {
  id: string;
  create_at: string;
  title: string;
  content: string;
  tip_photos: string;
};

const TipList = () => {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //데이터 세팅
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tips'],
    queryFn: getTips,
  });

  //가로 스크롤 관련 로직
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right'): void => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth + 200;
      container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  const handleCardClick = (tip: Tip) => {
    setSelectedTip(tip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }

  console.log(data);

  return (
    <div className="flex justify-center items-center mt-12">
      <button onClick={() => handleScroll('left')} className="mr-2 text-4xl">
        {'<'}
      </button>
      <div className="w-4/5 flex gap-4 overflow-x-hidden" ref={scrollContainerRef}>
        {data?.map((item) => (
          <TipCard key={item.id} tip={item} handleCardClick={() => handleCardClick(item)} />
        ))}
      </div>
      <button onClick={() => handleScroll('right')} className="ml-2 text-4xl">
        {'>'}
      </button>
      {isModalOpen && selectedTip && <TipModal tip={selectedTip} handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default TipList;