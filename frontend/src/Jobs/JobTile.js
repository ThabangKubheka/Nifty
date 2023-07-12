import React from 'react'

export const JobTile = ({ image, title }) => {
  return (
    <div className="job-tile">
      <img src={image} alt={title} />
      <h2>{title}</h2>
    </div>
  )
}
