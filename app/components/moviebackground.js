import React, { useEffect, useState } from "react";
import { useRandomMovies } from "../utils/userandommovies"; 
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const moveLeftToRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export function MovieBackground() {
  const { backgroundImages, loading, error } = useRandomMovies();
  const [imagesPerRow, setImagesPerRow] = useState(5);
  const [imagesPerColumn, setImagesPerColumn] = useState(2);

  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const imageWidth = width / imagesPerRow;
      const imageHeight = height / imagesPerColumn;
  
      setImagesPerRow(Math.floor(width / imageWidth));
      setImagesPerColumn(Math.floor(height / imageHeight));
    };
  
    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, [imagesPerRow, imagesPerColumn]);  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies.</div>;

  return (
    <Box
    sx={{
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: -1,
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: `repeat(${imagesPerRow}, 1fr)`,
    gridTemplateRows: `repeat(${imagesPerColumn}, 1fr)`,
    gap: '10px',
    padding: '20px',
  }}
>

      {backgroundImages.slice(0, imagesPerRow * imagesPerColumn).map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`Movie image ${index + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            objectFit: 'cover',
            animation: `${fadeIn} 0.5s ease-in-out, ${moveLeftToRight} 20s linear infinite`,
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      ))}
    </Box>
  );
}
