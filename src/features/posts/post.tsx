import React, { useState } from 'react';

const ImageUpload = () => {
  // const [image, setImage] = useState<string | null>(null);

// interface ImageUploadProps {}

// interface ImageUploadState {
//     image: string | null;
// }

interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const handleImageChange = (event: ImageChangeEvent): void => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            // setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
};

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {/* {image && <img src={image} alt="Uploaded" style={{ width: 200, height: 200 }} />} */}
    </div>
  );
};

export default ImageUpload;
