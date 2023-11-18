import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { BlackMarketType } from '../state/black-markets';

export async function deleteProfilePicture(filename: string) {
  try {
    await deleteObject(ref(storage, `profile-pictures/${filename}`));
  } catch (e: any) {
    if (e.code === 'storage/object-not-found') {
      console.error('Could not delete profile picture.');
      return;
    }
    throw new Error(e);
  }
}

export async function uploadProfilePicture(file: File, filename: string) {
  await uploadBytes(ref(storage, `profile-pictures/${filename}`), file);
}

export async function getProfilePictureUrl(filename: string): Promise<string> {
  try {
    return await getDownloadURL(ref(storage, `profile-pictures/${filename}`));
  } catch (e: any) {
    if (e.code === 'storage/object-not-found') {
      console.error('Could not load profile picture.');
      return Promise.resolve('');
    }
    throw new Error(e);
  }
}

export async function getAllBlackMarketUrlsForType(type: BlackMarketType): Promise<string[]> {
  try {
    const files = await listAll(ref(storage, `black-markets/${type}`));
    const urls = [];

    for (const file of files.items) {
      urls.push(await getDownloadURL(ref(storage, file.fullPath)))
    }

    return urls;
  } catch (e: any) {
    if (e.code === 'storage/object-not-found') {
      console.error('Could not load black market picture.');
      return Promise.resolve([]);
    }
    throw new Error(e);
  }
}