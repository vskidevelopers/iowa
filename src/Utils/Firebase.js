// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
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
const storage = getStorage();

// fetch firebase storage images
export function useFirebaseStorageImages() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    // const storage = getStorage(app);
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

//////////////////////////////////////////
// EVENTS RELATED FUNCTIONS    //
/////////////////////////////////////////

// Post Events Image
export const useEventsImageUploader = () => {
  const [imageURL, setImageURL] = useState("");

  const uploadImage = async (file) => {
    const storageRef = ref(storage, "eventsPage/" + file.name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    // console.log("Download Url >>", url);
    setImageURL(url);

    // console.log("Uploaded Image from useImage Upload Hook >>", imageURL);
  };

  return { imageURL, uploadImage };
};

// add Events to fireStore
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

// fetch Events from firestore
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

///////////////////////////////////////////
//  BOOKING RELATED FUNCTIONS //
//////////////////////////////////////////

export const useBookings = () => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(db, "Bookings"));
      const bookingData = querySnapshot.docs.map((doc, i) => ({
        entryNo: i + 1,
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingData);
      console.log("booking Data => ", bookingData);
      console.log("bookings => ", bookings);

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const postBooking = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const bookingRef = doc(collection(db, "Bookings"));
      await setDoc(bookingRef, data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return [postBooking, { bookings, loading, error, success }];
};

/////////////////////////////////////////
//  ROOMS RELATED FUNCTIONS //
////////////////////////////////////////

// Todo
// Fetch rooms from firebase
// Update room details in firebase
// Delete  rooms from firebase

export const useRoomImageUploader = () => {
  const [imageURL, setImageURL] = useState("");

  const storage = getStorage(app);

  const postRoomImage = async (file) => {
    try {
      const roomsStorageRef = ref(storage, "roomsPage/" + file.name);
      await uploadBytes(roomsStorageRef, file);
      console.log("Uploaded Image #", file.name);
      const roomImageUrl = await getDownloadURL(roomsStorageRef);
      console.log("Download Url >>", roomImageUrl);
      setImageURL(roomImageUrl);
    } catch (err) {
      console.error("An error occured >", err);
    }
  };

  return { imageURL, postRoomImage };
};

export const useRoomFunctions = () => {
  const [loading, setLoading] = useState(false);
  const [roomsLoading, setRoomsLoading] = useState(false);

  // const [imageURL, setImageURL] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch Rooms from DB
  const getRooms = async () => {
    setRoomsLoading(true);
    setError(false);
    const roomsRef = collection(db, "Rooms");
    try {
      const querySnapshot = await getDocs(roomsRef);
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData);
      // console.log("Rooms >>", rooms);
      setRoomsLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("An error occured >>", err);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);

  // post Image and get downloadUrl
  // Geof Quest
  // const postRoomImage = async (file) => {
  //   try {
  //     setLoading(true);
  //     setError(false);
  //     const roomsStorageRef = ref(getStorage(app), "roomsPage/" + file.name);
  //     await uploadBytes(roomsStorageRef, file);
  //     console.log("Uploaded Image #", file.name);
  //     const roomImageUrl = await getDownloadURL(roomsStorageRef);
  //     setImageURL(roomImageUrl);
  //     setLoading(false);
  //     setSuccess(true);
  //   } catch (err) {
  //     setError(err);
  //     console.error("An error occured >", err);
  //   }
  // };
  //  Add new Room to Firebase
  const addRoom = async (data) => {
    setLoading(true);
    setError(false);
    try {
      const roomRef = doc(collection(db, "Rooms"));
      await setDoc(roomRef, data);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setSuccess(false);
      setLoading(false);
      setError(err);
      console.error("Opps, an error occured while adding Room >>", err);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await deleteDoc(doc(db, "Rooms", id));
    } catch (error) {
      console.error("Oppss! the following error occured >>", error);
    }
  };

  return [
    addRoom,
    { deleteRoom, loading, error, success, rooms, roomsLoading },
  ];
};

export const useRoomDelete = () => {
  const deleteRoom = async (id) => {
    try {
      await deleteDoc(doc(db, "Rooms", id));
    } catch (error) {
      console.error("Oppss! the following error occured >>", error);
    }
  };
  return { deleteRoom };
};

///////////////////////////////////////
//  MENU RELATED FUNCTIONS //
//////////////////////////////////////

// Todo
// Add a new Menu Item
// Update an existing Menu Item
// Get Menu Items
// Delete Menu Items

export const useMenuFunctions = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const [breakfastMenu, setBreakfastMenu] = useState([]);
  const [mainCourseMenu, setMainCourseMenu] = useState([]);
  const [saladsMenu, setSaladsMenu] = useState([]);
  const [drinksMenu, setDrinksMenu] = useState([]);

  const addBreakFast = async (data) => {
    try {
      setLoading(true);
      const breakfastRef = doc(collection(db, "Breakfast"));
      await setDoc(breakfastRef, data);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err);
      console.error("An Error Occurred >>", err);
    }
  };

  const addMainCourse = async (data) => {
    try {
      setLoading(true);
      const mainCourseRef = doc(collection(db, "Main"));
      await setDoc(mainCourseRef, data);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
      console.error("An Error Occurred >>", err);
    }
  };

  const addDrinks = async (data) => {
    try {
      setLoading(true);
      const drinksRef = doc(collection(db, "Drinks"));
      await setDoc(drinksRef, data);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
      console.error("An Error Occurred >>", err);
    }
  };

  const addSalad = async (data) => {
    try {
      setLoading(true);
      const saladRef = doc(collection(db, "Salads"));
      await setDoc(saladRef, data);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
      console.error("An Error Occurred >>", err);
    }
  };

  const uploadMenuItem = async (file) => {
    try {
      setLoading(true);
      const menuItemStorageRef = ref(storage, "menuItems/" + file.name);
      await uploadBytes(menuItemStorageRef, file);
      console.log("Uploaded Image #", file.name);

      // get download url
      try {
        const url = await getDownloadURL(menuItemStorageRef);
        setImageURL(url);
        console.log("ImageURL >>", imageURL);
      } catch (err) {
        setError(err);
        console.error(
          "The following error occured during image upload >>",
          err
        );
      }
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err);
      console.error(
        "The following error occured during menuItem upload >>",
        err
      );
      setSuccess(false);
    }
  };

  const handleAddMenuItem = (data) => {
    const menuItem = {
      Title: data.title,
      Extras: data.extras,
      Price: data.price,
      Image: data.image,
    };
    const menuCategory = data.category;

    switch (menuCategory) {
      case "Breakfast":
        addBreakFast(menuItem);
        break;
      case "Main Course":
        addMainCourse(menuItem);
        break;
      case "Drinks":
        addDrinks(menuItem);
        break;
      case "Salads":
        addSalad(menuItem);
        break;
      default:
        console.log(
          "Cant upload the menu item for some undefined/unknown reason"
        );
        break;
    }
  };

  const handleDeleteMenuItem = async (id, category) => {
    if (category === "Main Course") {
      category = "Main";
    }
    try {
      setLoading(true);
      await deleteDoc(doc(db, category, id));
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err);
    }
  };

  const fetchMenuItems = async () => {
    const breakfastItems = await getDocs(collection(db, "Breakfast"));
    const breakfastData = breakfastItems.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBreakfastMenu(breakfastData);

    const mainCourseItems = await getDocs(collection(db, "Main"));
    const mainCourseData = mainCourseItems.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMainCourseMenu(mainCourseData);

    const drinksItems = await getDocs(collection(db, "Drinks"));
    const drinksData = drinksItems.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setDrinksMenu(drinksData);

    const saladsItems = await getDocs(collection(db, "Salads"));
    const saladsData = saladsItems.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setSaladsMenu(saladsData);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    handleAddMenuItem,
    uploadMenuItem,
    handleDeleteMenuItem,
    imageURL,
    success,
    loading,
    error,
    breakfastMenu,
    mainCourseMenu,
    saladsMenu,
    drinksMenu,
  };
};

/////////////////////////////////////////
// GALLERY RELATED FUNCTIONS //
////////////////////////////////////////

// Todo
// Fetch Gallery Images
// Add Gallery Images
// Delete Gallery Images
export const useGalleryFunctions = () => {
  const [imageURL, setImageURL] = useState(" ");
  const [images, setImages] = useState([]);

  const addGalleryImage = async (file) => {
    try {
      const galleryRef = ref(storage, "galleryPage/" + file?.name);
      await uploadBytes(galleryRef, file);
      console.log("Uploaded Image #", file.name);
      try {
        const url = await getDownloadURL(galleryRef);
        setImageURL(url);
      } catch (err) {
        console.error(
          "An error Occured while fetching the download Url >>",
          err
        );
      }
    } catch (err) {
      console.error(
        "An error Occured while adding an image to the Gallery Page >>",
        err
      );
    }
  };

  const fetchGalleryImages = () => {
    const galleryRef = ref(storage, "galleryPage/");
    listAll(galleryRef)
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
      .catch((err) => {
        console.error("An error occured during fetching Gallery Images");
      });
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const deleteGalleryImage = (file) => {
    const imageRef = ref(storage, "galleryPage/" + file.id);
    deleteObject(imageRef)
      .then(() => {
        console.log(" File deleted successfully");
      })
      .catch((err) => {
        console.error("Uh-oh, an error occurred! >>", err);
      });
  };

  return { addGalleryImage, deleteGalleryImage, imageURL, images };
};
