// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcSgYV9MyerQjZi3KH-wRBFZydxEX11Eo",
  authDomain: "iowa-a4fe8.firebaseapp.com",
  projectId: "iowa-a4fe8",
  storageBucket: "iowa-a4fe8.appspot.com",
  messagingSenderId: "863319571454",
  appId: "1:863319571454:web:a8bc208712b8110cad5eaf",
  measurementId: "G-CYLHDC2PY8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export function useFirebaseStorageImages() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const storage = getStorage(app);
    const imagesRef = ref(storage, "galleryPage/");

    listAll(imagesRef)
      .then((res) => {
        const imagePromises = res.items.map((item) => {
          console.log("item >> ", item);
          // const downloadUrl = ;
          return getDownloadURL(item).then((url) => {
            return {
              id: item.name,
              url: url,
            };
          });
        });
        Promise.all(imagePromises).then((fetchedImages) => {
          console.log("imagePromises >> ", imagePromises);
          console.log("fetchedImages >> ", fetchedImages);
          setImages(fetchedImages);
        });
        // setImages(item._location.path);
        // return item._location.path;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return images;
}
