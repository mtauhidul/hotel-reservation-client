import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import app from './firebase.config';

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
