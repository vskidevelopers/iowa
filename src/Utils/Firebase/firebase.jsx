/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
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
import formatTime from "../FomartTime";

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
const storage = getStorage(app);
export const auth = getAuth(app);

// useGalleryFunctions
export const useGalleryFunctions = () => {
  const [galleryError, setGalleryError] = useState(null);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryImageURL, setGalleryImageURL] = useState(null);
  const [uploadGalleryImageProgress, setUploadGalleryImageProgress] =
    useState(null);
  const [allGalleryImages, setAllGalleryImages] = useState([]);

  // fetch Images
  // eslint-disable-next-line no-undef
  const galleryRef = file
    ? // eslint-disable-next-line no-undef
      ref(storage, "galleryPage/" + file.name)
    : ref(storage, "galleryPage/");

  const fetchGalleryImages = () => {
    setGalleryLoading(true);
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
          setAllGalleryImages(fetchedImages);
        });
        setGalleryLoading(false);
      })
      .catch((err) => {
        setGalleryError(err);
        console.error(
          "The following error occured during fetchin images >>",
          galleryError
        );
      });
  };
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  //   post Image
  const uploadGalleryImage = async (file) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const metadata = {
      contentType: "image/jpeg",
    };
    // const galleryRef = ref(storage, "galleryPage/" + file?.name);
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
      setGalleryError(err);
      console.log(
        "the folloing error occured during upload of gallery image >>",
        err
      );
    }
  };

  //   delete Gallery Image
  const deleteGalleryImage = (file) => {
    setGalleryLoading(true);
    deleteObject(galleryRef)
      .then(() => {
        console.log(" File deleted successfully");
        setGalleryLoading(false);
      })
      .catch((err) => {
        setGalleryError(err);
        console.error(
          "Uh-oh, an error occurred while deleting the gallery image! >>",
          err
        );
      });
  };
  return {
    galleryError,
    galleryLoading,
    galleryImageURL,
    uploadGalleryImageProgress,
    allGalleryImages,
    uploadGalleryImage,
    deleteGalleryImage,
  };
};

// useEventsFunctions
export const useEventsFunctions = () => {
  const [eventsSuccess, setEventsSuccess] = useState(false);
  const [eventsError, setEventsError] = useState(null);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventImageURL, setEventImageURL] = useState(null);
  const [uploadEventProgress, setUploadEventProgress] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({});

  // fetch Events data
  const eventsRef = collection(db, "Events");
  const getEventsData = async () => {
    try {
      setEventsLoading(true);
      const eventsSnapshot = await getDocs(eventsRef);

      // fetch all events
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // TODO:
      // fetch passed events

      console.log("setting doc items into serviceItemsData. ..");
      setAllEvents(eventsData);
      setEventsLoading(false);
    } catch (error) {
      setEventsError(error);
      console.error(
        "the following error occured while fetching events >>",
        error
      );
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    try {
      getEventsData();
    } catch (error) {
      setEventsError(error);
      console.log(
        "The following error occured during fetching events >>",
        error
      );
    }
  }, []);

  const getEventDetails = async (eventId) => {
    setEventsLoading(true);
    const eventRef = doc(db, "Events", eventId);
    const eventSnap = await getDoc(eventRef);
    if (eventSnap.exists()) {
      setEventDetails(eventSnap.data());
    } else {
      console.log("No such document!");
    }
    setEventsLoading(false);
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  // Post Data

  const uploadEventPoster = async (file) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const metadata = {
      contentType: "image/jpeg",
    };
    const eventStorageRef = ref(storage, "eventsPage/" + file.name);
    try {
      setEventsLoading(true);
      const uploadTask = uploadBytesResumable(eventStorageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const eventProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + eventProgress + "% done");
          setUploadEventProgress(
            parseInt(parseFloat(eventProgress).toFixed(0))
          );

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
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
            setEventImageURL(downloadURL);
          });
          setEventsLoading(false);
        }
      );
    } catch (err) {
      setEventsError(err);
      console.log(
        "the folloing error occured while uploading Event Poster>>",
        err
      );
    }
  };

  const handlePostEvent = async (data) => {
    try {
      setEventsLoading(true);
      const eventRef = doc(collection(db, "Events"));
      await setDoc(eventRef, data);
      setEventsLoading(false);
      setEventsSuccess(true);
    } catch (err) {
      setEventsError(err);
      console.error(
        "the following Error Occurred while adding an event >>",
        err
      );
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      setEventsLoading(true);
      await deleteDoc(doc(db, "Event", id));
      setEventsLoading(false);
      setEventsSuccess(true);
    } catch (err) {
      setEventsError(err);
    }
  };

  return {
    eventsSuccess,
    eventsError,
    eventsLoading,
    eventImageURL,
    uploadEventProgress,
    allEvents,
    eventDetails,
    uploadEventPoster,
    handlePostEvent,
    handleDeleteEvent,
  };
};

// useBookingsFunctions
export const useBookingsFunctions = () => {
  const [bookings, setBookings] = useState(null);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);
  const [bookingsSuccess, setBookingsSuccess] = useState(false);

  // fetch Bookings
  const fetchBookings = async () => {
    setBookingsLoading(true);
    setBookingsError(null);

    try {
      const querySnapshot = await getDocs(collection(db, "Bookings"));
      const bookingsData = querySnapshot.docs.map((doc, i) => ({
        entryNo: i + 1,
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
      console.log("booking Data => ", bookingsData);
      console.log("bookings => ", bookings);

      setBookingsSuccess(true);
      setBookingsLoading(false);
    } catch (error) {
      setBookingsError(error);
      console.log(
        "The foolowing error occured while fetching bookings >>",
        error
      );
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Post a Booking
  const handlePostBooking = async (data) => {
    setBookingsLoading(true);
    setBookingsError(null);

    try {
      const bookingRef = doc(collection(db, "Bookings"));
      await setDoc(bookingRef, data);
      setBookingsSuccess(true);
      setBookingsLoading(false);
    } catch (error) {
      setBookingsError(error);
      console.log(
        "The foolowing error occured while posting a booking >>",
        error
      );
      setBookingsLoading(false);
    }
  };

  //   delete Booking
  const handleDeleteBooking = (id) => {
    const bookingRef = doc(db, "Bookings", id);
    setBookingsLoading(true);
    deleteObject(bookingRef)
      .then(() => {
        console.log(" File deleted successfully");
        setBookingsLoading(false);
      })
      .catch((err) => {
        setBookingsError(err);
        console.error(
          "Uh-oh, an error occurred while deleting a booking! >>",
          err
        );
      });
  };

  return {
    bookings,
    bookingsLoading,
    bookingsError,
    bookingsSuccess,
    handlePostBooking,
    handleDeleteBooking,
  };
};

// useRoomFunctions
export const useRoomFunctions = () => {
  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsError, setRoomsError] = useState(null);
  const [roomsSuccess, setRoomsSuccess] = useState(false);
  const [roomImageURL, setRoomImageURL] = useState(false);
  const [uploadRoomsProgress, setUploadRoomsProgress] = useState(false);

  // Fetch Rooms from DB
  const getRooms = async () => {
    setRoomsLoading(true);
    setRoomsError(false);
    const roomsRef = collection(db, "Rooms");
    try {
      const querySnapshot = await getDocs(roomsRef);
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData);
      console.log("Rooms >>", rooms);
      setRoomsLoading(false);
    } catch (err) {
      setRoomsError(err);
      console.error("An error occured while fetching rooms >>", err);
      setRoomsLoading(false);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);

  const getRoomDetails = async (roomId) => {
    const roomRef = doc(db, "Rooms", roomId);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      setRoomDetails(roomSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  // Post Room Data
  const uploadRoomImage = async (file) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const metadata = {
      contentType: "image/jpeg",
    };
    const roomsStorageRef = ref(storage, "roomsPage/" + file.name);
    try {
      setRoomsLoading(true);
      const uploadTask = uploadBytesResumable(roomsStorageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const roomsProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + roomsProgress + "% done");
          setUploadRoomsProgress(
            parseInt(parseFloat(roomsProgress).toFixed(0))
          );

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
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
            setRoomImageURL(downloadURL);
            setRoomsLoading(false);
          });
        }
      );
    } catch (err) {
      setRoomsError(err);
      console.log(
        "the following error occured while adding room image >>",
        err
      );
    }
  };

  const handleAddRoom = async (data) => {
    setRoomsLoading(true);
    setRoomsError(false);
    try {
      const roomDocRef = doc(collection(db, "Rooms"));
      await setDoc(roomDocRef, data);
      setRoomsSuccess(true);
      setRoomsLoading(false);
    } catch (err) {
      setRoomsError(err);
      setRoomsSuccess(false);
      setRoomsLoading(false);
      console.error("Opps, an error occured while adding Room >>", err);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      setRoomsLoading(true);
      await deleteDoc(doc(db, "Room", roomId));
      setRoomsLoading(false);
      setRoomsSuccess(true);
    } catch (err) {
      setRoomsError(err);
      console.error("Oppss! the following error occured >>", err);
    }
  };

  return {
    rooms,
    roomDetails,
    roomsLoading,
    roomsError,
    roomsSuccess,
    roomImageURL,
    uploadRoomsProgress,
    uploadRoomImage,
    handleAddRoom,
    handleDeleteRoom,
  };
};

// useMenuFunction
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
          "Can't upload the menu item for some undefined/unknown reason"
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

// AUTHENTICATION
export const useAuthFunctions = () => {
  const [user, setUser] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState();

  useEffect(() => {
    // Set up an observer to listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  // const login = async (email, password) => {
  //   setAuthLoading(true);

  //   try {
  //     // Authenticate the user with the provided email and password
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     setUser(userCredential.user);
  //     setAuthLoading(false);

  //     // Optionally perform any additional actions after successful login
  //   } catch (error) {
  //     // Handle authentication errors
  //     console.error("Login failed", error.code);
  //     setAuthError(error.code);
  //     setAuthLoading(false);
  //   }
  // };

  const login = async (email, password) => {
    setAuthLoading(true);

    try {
      // Authenticate the user with the provided email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setAuthLoading(false);

      // Check if the logged-in user is an admin
      const isAdminUser = await checkAdminStatus(userCredential.user.uid);

      // Set a local storage key to indicate admin status
      if (isAdminUser) {
        localStorage.setItem("isAdmin", "true");
      } else {
        localStorage.removeItem("isAdmin");
      }

      // Optionally perform any additional actions after successful login
    } catch (error) {
      // Handle authentication errors
      console.error("Login failed", error.code);
      setAuthError(error.code);
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
  };

  // Todo
  // Create Admin User
  // Create Employee User
  // create AdminUserModel instance with the following fields: name, email, phoneNumber,UserId, AdminUser:true.
  // create EmployeeUserModel instance with the following fields: name, email, phoneNumber,UserId .
  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCreatedUser(userCredential.user);
      return userCredential;
    } catch (err) {
      console.error("failed to create a user >>", err);
      throw err;
    }
  };

  const createAdminUser = async (data) => {
    console.log("Creating Admin User...");
    let userCredential;
    try {
      userCredential = await signup(data.email, data.password);
      console.log("user credentials >>", userCredential);
      const createdUser = userCredential.user;
      console.log("created user >>", userCredential);
      if (createdUser) {
        const adminData = {
          name: data.name,
          email: data.email,
          phone_number: data.phoneNumber,
          userId: createdUser.uid,
        }; // Use the user's UID as the document ID
        await setDoc(doc(db, "AdminUsers", createdUser.uid), adminData);
      }
    } catch (err) {
      console.log("err >>", err);
    }
  };
  const createEmployeeUser = async (data) => {
    console.log("Creating Employee User...");
    let userCredential;
    try {
      userCredential = await signup(data.email, data.password);
      console.log("user credentials >>", userCredential);
      const createdUser = userCredential.user;
      console.log("created user >>", userCredential);
      if (createdUser) {
        console.log("Created Employee User >>", createdUser.uid);
        const employeeData = {
          name: data.name,
          email: data.email,
          phone_number: data.phoneNumber,
          userId: createdUser.uid,
        };

        await setDoc(doc(db, "Employees", createdUser.uid), employeeData);
      }
    } catch (err) {
      console.log("err >>", err);
    }
  };

  const createUser = async (data) => {
    console.log("Recieved User Data");
    console.log("Checking Admin Status...");

    if (data.isAdmin) {
      await createAdminUser(data);
    } else {
      await createEmployeeUser(data);
    }
  };

  const checkAdminStatus = async (uid) => {
    const adminDocRef = doc(db, "AdminUsers", uid);

    try {
      const docSnapshot = await getDoc(adminDocRef);
      return docSnapshot.exists(); // Return true if the document exists, indicating admin status
    } catch (error) {
      console.error("Error checking admin status:", error);
      throw error;
    }
  };

  return {
    user,
    authError,
    authLoading,
    createdUser,
    login,
    signup,
    createUser,
    logout,
    checkAdminStatus,
  };
};

// useEmail
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
  const [clockInReport, setClockInReport] = useState([]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const displayMonth = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate().toString().padStart(2, "0"); // Add leading zero if needed
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if needed
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours() % 12 || 12; // Convert 0 to 12 for 12-hour format
  const minutes = currentDate.getMinutes().toString().padStart(2, "0"); // Add leading zero if needed
  const seconds = currentDate.getSeconds().toString().padStart(2, "0"); // Add leading zero if needed
  const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";

  const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  const formattedDate = `${day}-${month}-${year}`;

  // Fetch ClockIn Report
  const fetchClockInReport = async () => {
    const clockinOutReportRef = await getDocs(collection(db, "ClockInOut"));
    const clockinOutReportData = clockinOutReportRef.docs.map((doc, i) => {
      const data = doc.data();
      const timestampIn = data.timeIn ? data.timeIn.toDate() : null; // Convert Firebase Timestamp to JavaScript Date object
      const timestampOut = data.timeOut ? data.timeOut.toDate() : null; // Convert Firebase Timestamp to JavaScript Date object
      const formattedTimeIn = timestampIn ? formatTime(timestampIn) : null; // Use the function from previous responses to format the time
      const formattedTimeOut = timestampOut ? formatTime(timestampOut) : null; // Use the function from previous responses to format the time
      return {
        entryNo: i + 1,
        id: doc.id,
        ...data,
        timeIn: formattedTimeIn,
        timeOut: formattedTimeOut,
      };
    });
    setClockInReport(clockinOutReportData);
  };

  useEffect(() => {
    fetchClockInReport();
    console.log("Clockin Report >>", clockInReport);
  }, []);
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
        timeIn: formattedTime,
        employeeEmail,
        month: displayMonth,
        date: formattedDate,
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

  const clockOut = async () => {
    console.log("Clicked Clock Out");

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

          // orderBy("timestamp", "desc"),
          limit(1)
        )
      );

      if (querySnapshot.docs.length === 1) {
        console.log("Document Exists");
        const clockInRecord = querySnapshot.docs[0];
        const clockInId = clockInRecord.id;

        // Update the clock in record with the clock out timestamp
        await updateDoc(doc(db, "ClockInOut", clockInId), {
          timeOut: formattedTime,
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
    clockInReport,
    clockIn,
    clockOut,
  };
};
