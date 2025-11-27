import React from 'react';
import { profileImages } from '@/config/links';

const HeroImage = () => {
  return (
    <div className='flex justify-center items-center'>
      <img
        src={profileImages.heroImage}
        alt='Hostinger Horizons'
      />
    </div>
  );
};

export default HeroImage;
