// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

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
export const db = getFirestore(app);

// fetch firebase storage images
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

// Post Events Image
export const useEventsImageUploader = () => {
  const [imageURL, setImageURL] = useState("");

  const uploadImage = async (file) => {
    const storageRef = ref(getStorage(), "eventsPage/" + file.name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    // console.log("Download Url >>", url);
    setImageURL(url);

    // console.log("Uploaded Image from useImage Upload Hook >>", imageURL);
  };

  return { imageURL, uploadImage };
};

// add Events from fireStore
export const useAddEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addEvent = async (eventData) => {
    setLoading(true);
    setError(null);

    try {
      // const eventRef = await addDoc(collection(db, "Events"), eventData);
      const eventRef = doc(collection(db, "Events"));

      await setDoc(eventRef, eventData);

      console.log("Document written with ID: ", eventRef.id);

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return [addEvent, { loading, error, success }];
};

// fetch Events from Admn
export const useFetchEvents = () => {
  const [eventsLoading, setEventsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEventsLoading(true);
    const eventsRef = collection(db, "Events");
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(eventsRef);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
        console.log("events >> ", events);
      } catch (error) {
        setError(error);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return { eventsLoading, error, events };
};

// get single Event
export const useFetchEventDetails = (eventId) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      const eventRef = doc(db, "Events", eventId);
      const eventSnap = await getDoc(eventRef);
      if (eventSnap.exists()) {
        setEvent(eventSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getEvent();
  }, [eventId]);

  return event;
};

// delete Events from Admin
export const useDeleteEvents = () => {
  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "Events", id));
    } catch (error) {
      console.log("Oppss! the following error occured >>", error);
    }
  };

  return { deleteEvent };
};

//
