import React from 'react';

const MoodDisplay = ({ mood }) => {
  return (
    <div className={`mood-display ${mood}`}>
      <h2>Detected Mood: {mood}</h2>
      {/* Optionally, you can add more styling based on the mood */}
    </div>
  );
};

export default MoodDisplay;
