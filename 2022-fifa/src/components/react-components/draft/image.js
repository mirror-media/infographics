import React from 'react' // eslint-disable-line

const styles = {
  image: {
    width: '100%',
  },
}

export function ImageBlock(entity) {
  const { desc, imageFile, resized } = entity.getData()
  return (
    <figure>
      <img
        style={styles.image}
        src={resized?.original}
        onError={(e) => (e.currentTarget.src = imageFile?.url)}
        alt=""
      />
      <figcaption>{desc}</figcaption>
    </figure>
  )
}
