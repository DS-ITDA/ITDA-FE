import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Children } from 'react';
import { createContext } from 'react';

export const ImageContext = createContext(undefined);

export const ImageProvider = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    return () => {
      if (selectedImg) {
        URL.revokeObjectURL(selectedImg.thumbnail);
      }
    };
  }, [selectedImg]);

  const handleUpload = (e) => {
    const fileList = e.target.files;

    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setSelectedImg({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.split('/')[0],
      });
    }
  };

  return (
    <ImageContext.Provider value={{ selectedImg, setSelectedImg, handleUpload }}>{Children}</ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error('ImageProvider를 감싸야 함');
  }

  return context;
};
