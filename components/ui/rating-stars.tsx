'use client';

import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

type Props = { initialValue: number };

const RatingStars = ({ initialValue }: Props) => {
    const [ratingValue, setRatingValue] = useState(initialValue);

    const handleRating = (rate: number) => {
        setRatingValue(rate);
    };

    return (
        <Rating
            size={24}
            onClick={handleRating}
            initialValue={ratingValue}
            transition
            allowFraction
            allowHover
        />
    );
};

export default RatingStars;
