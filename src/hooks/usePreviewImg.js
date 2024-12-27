import { useState } from "react";
import { useShowToast } from "./useShowToast";

export const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();

  const maxFileSize = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        showToast("Ошибка", "Размер файла должен быть меньше 2 Мб", " error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
      return;
    }
    showToast("Ошибка", "Пожалуйста, выберите изображение", " error");
    setSelectedFile(null);
  };

  return { handleImageChange, selectedFile, setSelectedFile };
};
