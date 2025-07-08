import { useEffect, useState } from 'react';

const useImgUpload = () => {
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

  return {
    selectedImg,
    setSelectedImg,
    handleUpload,
  };
};

export default useImgUpload;
