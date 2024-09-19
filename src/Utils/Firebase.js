/* eslint-disable default-case */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDocs,
  getDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage();
export const auth = getAuth(app);

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
  const [galleryImageURL, setGalleryImageURL] = useState(" ");
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [uploadGalleryImageProgress, setUploadGalleryImageProgress] =
    useState();
  const [images, setImages] = useState([]);

  const uploadGalleryImage = async (file) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const metadata = {
      contentType: "image/jpeg",
    };
    const galleryRef = ref(storage, "galleryPage/" + file?.name);
    try {
      setGalleryLoading(true);
      const uploadTask = uploadBytesResumable(galleryRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const galleryProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + galleryProgress + "% done");
          setUploadGalleryImageProgress(
            parseInt(parseFloat(galleryProgress).toFixed(0))
          );

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Default stuff");
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setGalleryImageURL(downloadURL);
            setGalleryLoading(false);
          });
        }
      );
    } catch (err) {
      console.log("the folloing error occured >>", err);
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

  return {
    uploadGalleryImage,
    deleteGalleryImage,
    galleryImageURL,
    uploadGalleryImageProgress,
    images,
    galleryLoading,
  };
};

// AUTHENTICATION
export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up an observer to listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      // Authenticate the user with the provided email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      // Optionally perform any additional actions after successful login
    } catch (error) {
      // Handle authentication errors
      console.error("Login failed", error);
    }
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (err) {
      console.error("failed to create a user >>", err);
    }
  };

  return { user, login, signup };
};

export const useEmail = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postEmail = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const emailRef = doc(collection(db, "Emails"));
      await setDoc(emailRef, data);
      console.log("Email document written with ID:", emailRef.id);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(db, "Emails"));
      const emailList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmails(emailList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []); // Fetch emails on component mount

  return { emails, loading, error, postEmail };
};

export const useContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postContact = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const contactRef = doc(collection(db, "ContactUs"));
      await setDoc(contactRef, data);
      console.log("Contact document written with ID:", contactRef.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(db, "ContactUs"));
      const contactList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []); // Fetch contacts on component mount

  return { contacts, loading, error, postContact };
};

export const useClockInFunctions = () => {
  const [clockInSuccess, setClockInSuccess] = useState(false);
  const [clockInError, setClockInError] = useState(null);
  const [clockInLoading, setClockInLoading] = useState(false);
  const [clockOutLoading, setClockOutLoading] = useState(false);

  // Clock In
  const clockIn = async () => {
    try {
      setClockInLoading(true);
      const timestamp = new Date();
      const userId = auth.currentUser.uid;
      const employeeEmail = auth.currentUser.email;

      // Add a new document to the "ClockInOut" collection
      await addDoc(collection(db, "ClockInOut"), {
        userId,
        timeIn: timestamp,
        employeeEmail,
        clockType: "in",
      });
      console.log("userID >>", userId);
      console.log("user email >>", employeeEmail);
      console.log("time In >>", timestamp);
      console.log("clockType : In");

      setClockInSuccess(true);
    } catch (error) {
      setClockInError(error);
    } finally {
      setClockInLoading(false);
    }
  };

  // Clock Out
  // const clockOut = async () => {
  //   try {
  //     setClockOutLoading(true);
  //     const timestamp = new Date();
  //     const userId = auth.currentUser.uid;
  //     const employeeEmail = auth.currentUser.email;

  //     // Find the corresponding clock in record for the user
  //     const querySnapshot = await getDocs(
  //       query(
  //         collection(db, "ClockInOut"),
  //         where("userId", "==", userId),
  //         where("clockType", "==", "in"),
  //         orderBy("timestamp", "desc"),
  //         limit(1)
  //       )
  //     );

  //     if (querySnapshot) {
  //       console.log("DOCUMENT FOUND!!");
  //       const clockInRecord = querySnapshot.docs[0];
  //       const clockInId = clockInRecord.id;

  //       // Update the clock in record with the clock out timestamp
  //       await updateDoc(doc(db, "ClockInOut", clockInId), {
  //         clockType: "out",
  //         timeOut: timestamp,
  //       });
  //     }
  //     console.log("userID >>", userId);
  //     console.log("user email >>", employeeEmail);
  //     console.log("time Out >>", timestamp);
  //     console.log("clockType : Out");
  //     localStorage.setItem("clockInTimestamp", timestamp.toISOString());
  //   } catch (error) {
  //     setClockInError(error);
  //   } finally {
  //     setClockOutLoading(false);
  //   }
  // };
  const clockOut = async () => {
    try {
      setClockOutLoading(true);
      const timestamp = new Date();
      const userId = auth.currentUser.uid;
      // const employeeEmail = auth.currentUser.email;

      // Find the corresponding clock in record for the user
      const querySnapshot = await getDocs(
        query(
          collection(db, "ClockInOut"),
          where("userId", "==", userId),
          where("clockType", "==", "in"),
          orderBy("timestamp", "desc"),
          limit(1)
        )
      );

      if (querySnapshot.docs.length === 1) {
        const clockInRecord = querySnapshot.docs[0];
        const clockInId = clockInRecord.id;

        // Update the clock in record with the clock out timestamp
        await updateDoc(doc(db, "ClockInOut", clockInId), {
          clockType: "out",
          timeOut: timestamp,
        });

        localStorage.setItem(
          "clockInTimestamp",
          timestamp.toDate().toISOString()
        );
        setClockInSuccess(false);
        setClockInError(null);
        setClockInSuccess(true);
      } else {
        setClockInSuccess(false);
        setClockInError("No matching clock-in record found.");
      }
    } catch (error) {
      setClockInSuccess(false);
      setClockInError(error.message);
    } finally {
      setClockOutLoading(false);
    }
  };

  return {
    clockInSuccess,
    clockInError,
    clockInLoading,
    clockOutLoading,
    clockIn,
    clockOut,
  };
};
