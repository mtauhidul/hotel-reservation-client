import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from './db';

// ROOM INTERFACE
// "titleEN": "Test",
// "descriptionEN": "Test Description",
// "priceEN": "35",
// "breakfastEN": true,
// "capacityEN": "2",
// "bathtubEN": true,
// "typeEN": "Deluxe",
// "petsEN": false,
// "imagesEN": [],
// "thumbnailEN": "",
// "titleFR": "Test",
// "descriptionFR": "Test desc"

interface Room {
  titleEN: string;
  descriptionEN: string;
  priceEN: string;
  breakfastEN: boolean;
  capacityEN: string;
  bathtubEN: boolean;
  typeEN: string;
  petsEN: boolean;
  imagesEN: string[];
  thumbnailEN: string;
  titleFR: string;
  descriptionFR: string;
  id?: string;
  status: string;
  priceId: string;
}

export const addRoom = async (data: Room) => {
  const images = data.imagesEN;
  const imagesUrls: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const storageRef = ref(storage, `rooms/${data.titleEN}/${i}`);
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        imagesUrls.push(url);
        if (imagesUrls.length === images.length) {
          data.imagesEN = imagesUrls;

          uploadString(storageRef, data.thumbnailEN, 'data_url').then(
            (snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                data.thumbnailEN = url;
                addDoc(collection(db, 'rooms'), data);
              });
            }
          );
        }
      });
    });
  }
};

export const getRooms = async () => {
  const rooms: Room[] = [];
  const fetchedRooms = await getDocs(collection(db, 'rooms'));
  return fetchedRooms.docs.map((doc) => {
    const room = doc.data() as Room;
    room.id = doc.id;
    rooms.push(room);
    return room;
  });
};

export const getRoom = async (id: string) => {
  const fetchedRoom = await getDoc(doc(db, 'rooms', id));
  const room = fetchedRoom.data() as Room;
  room.id = fetchedRoom.id;
  return room;
};

export const updateRoom = async (id: string, data: any) => {
  const response = await updateDoc(doc(db, 'rooms', id), data);
  return response;
};

export const deleteRoom = async (id: string) => {
  await deleteDoc(doc(db, 'rooms', id));
};

export const login = async (email: string, password: string) => {
  const admin = await getDocs(collection(db, 'admin'));
  const adminData: any = {
    email: admin.docs[0].data().email,
    password: admin.docs[0].data().password,
    id: admin.docs[0].id,
  };

  let authStatus = false;

  if (email === adminData.email && password === adminData.password) {
    sessionStorage.setItem('token', adminData.id);
    authStatus = true;
    return authStatus;
  }
  return authStatus;
};

export const logout = () => {
  sessionStorage.removeItem('token');
  return true;
};

export const addMenu = async (data: any) => {
  const allMenus = await getDocs(collection(db, 'menus'));
  const menus = allMenus.docs.map((doc) => {
    const menu = doc.data();
    menu.id = doc.id;
    return menu;
  });
  const menu = menus.find((item) => item.status === true);

  if (menu?.status === true) {
    await updateDoc(doc(db, 'menus', menu.id), {
      status: false,
    });
  }

  const result = await addDoc(collection(db, 'menus'), data);
  return result;
};

export const getMenus = async () => {
  const menus: any[] = [];
  const fetchedMenus = await getDocs(collection(db, 'menus'));
  return fetchedMenus.docs.map((doc) => {
    const menu = doc.data();
    menu.id = doc.id;
    menus.push(menu);
    return menu;
  });
};

export const deleteMenu = async (id: string) => {
  await deleteDoc(doc(db, 'menus', id));
};

export const updateMenu = async (id: string, data: any) => {
  const allMenus = await getDocs(collection(db, 'menus'));
  const menus = allMenus.docs.map((doc) => {
    const menu = doc.data();
    menu.id = doc.id;
    return menu;
  });
  const menu = menus.find((item) => item.status === true);

  if (menu?.status === true) {
    await updateDoc(doc(db, 'menus', menu.id), {
      status: false,
    });
  }

  const response = await updateDoc(doc(db, 'menus', id), data);
  return response;
};

export const getPages = async () => {
  const pages: any[] = [];
  const fetchedPages = await getDocs(collection(db, 'pages'));
  return fetchedPages.docs.map((doc) => {
    const page = doc.data();
    page.id = doc.id;
    pages.push(page);
    return page;
  });
};

export const getPage = async (id: string) => {
  const fetchedPage = await getDoc(doc(db, 'pages', id));
  const page = fetchedPage.data();
  return page;
};

export const updatePage = async (id: string, data: any) => {
  const image = data.image;
  console.log(image);
  const storageRef = ref(storage, `pages/${data.titleEN}`);
  uploadString(storageRef, image, 'data_url').then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      data.image = url;
      updateDoc(doc(db, 'pages', id), data);
    });
  });

  return true;
};

export const getBookings = async () => {
  const bookings: any[] = [];
  const fetchedRooms = await getDocs(collection(db, 'rooms'));

  fetchedRooms.docs.map((doc) => {
    const room = doc.data();
    room.bookings.map((booking: any) => {
      bookings.push({
        ...booking,
        room: room.titleEN,
        roomId: doc.id,
      });
    });
  });

  return bookings;
};

export const getBooking = async (id: string) => {
  const fetchedRooms = await getDocs(collection(db, 'rooms'));
  let booking: any = null;

  fetchedRooms.docs.map((doc) => {
    const room = doc.data();
    room.bookings.map((item: any) => {
      if (item.id === id) {
        booking = {
          ...item,
          room: room.titleEN,
          roomId: doc.id,
        };
      }
    });
  });

  return booking;
};

export const updateBooking = async (id: string, data: any) => {
  const fetchedRooms = await getDocs(collection(db, 'rooms'));

  fetchedRooms.docs.map((docu) => {
    const room = docu.data();
    room.bookings.map((item: any) => {
      if (item.id === id) {
        item = data;
        updateDoc(doc(db, 'rooms', docu.id), room);
      }
    });
  });

  return true;
};

export const deleteBooking = async (id: string) => {
  const fetchedRooms = await getDocs(collection(db, 'rooms'));

  fetchedRooms.docs.map((docu) => {
    const room = docu.data();
    room.bookings.map((item: any) => {
      if (item.id === id) {
        const index = room.bookings.indexOf(item);
        room.bookings.splice(index, 1);
        updateDoc(doc(db, 'rooms', docu.id), room);
      }
    });
  });

  return true;
};
