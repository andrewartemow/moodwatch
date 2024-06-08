import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CardMood from '../components/CardMood';

import { MOODCARDSDATA } from '../data';

interface HomeInterface {
  onClick: (ids: string) => void;
}

const Home = ({ onClick }: HomeInterface) => {
  const navigate = useNavigate();

  const redirectToMoviePage = () => {
    navigate('/movie');
  };

  return (
    <div className="h-full py-20 text-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-5xl font-bold text-center max-w-xl">
            Find great new movies that suit your mood{' '}
            <span className="text-secondary">perfectly</span>.
          </h1>
          <h3 className="text-xl text-secondary font-medium text-center mt-5">
            How do you feel right now?
          </h3>
        </div>
        <ul className="flex gap-3 flex-wrap justify-center mb-20">
          {MOODCARDSDATA.map((data) => (
            <CardMood
              text={data.name}
              key={data.name}
              onClick={() => {
                localStorage.setItem('moodIDS', data.ids);
                onClick(data.ids);
                redirectToMoviePage();
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
