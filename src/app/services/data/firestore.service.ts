import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { announce } from 'src/app/shared/announce.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  announceListRef: AngularFireList<any>; // Reference to AngularFireList
  announceRef: AngularFireObject<any>; // Reference to AngularFireObject

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.announceListRef = this.db.list('/announce'); // Reference to the 'announce' node in the database
  }

  async createAnounce(apt: announce, coverImageFile: File, otherImagesFiles: File[]) {
    // Upload cover image to Firebase Storage
    const coverImageRef = this.storage.ref('/announce/' + apt.title + '/coverImage');
    const coverImageTask = coverImageRef.put(coverImageFile);

    // Upload other images to Firebase Storage
    const otherImagesTasks = otherImagesFiles.map((file, index) => {
      const imageRef = this.storage.ref(`/announce/${apt.title}/image_${index}`);
      return imageRef.put(file);
    });

    // Wait for all uploads to complete
    await Promise.all([coverImageTask, ...otherImagesTasks]);

    // Get download URLs of uploaded images
    const coverImageUrl = await coverImageRef.getDownloadURL().toPromise();
    const otherImagesUrls = await Promise.all(
      otherImagesTasks.map((task, index) => this.storage.ref(`/announce/${apt.title}/image_${index}`).getDownloadURL().toPromise())
    );

    // Create announcement with image URLs and push to database
    return this.announceListRef.push({
      title: apt.title,
      announceBody: apt.announceBody,
      category: apt.category,
      likes: 0,
      coverImage: coverImageUrl,
      otherImages: otherImagesUrls,
      id_user: "xkDk50haeMf1eIErw0lpHcCfvjF2",
    });
  }

  // Retrieves a single announcement by ID
  getAnounce(id: string) {
    this.announceRef = this.db.object('/announce/' + id);
    return this.announceRef;
  }

  // Retrieves a list of announcements
  getAnounceList() {
    this.announceListRef = this.db.list('/announce');
    return this.announceListRef;
  }

  // Update an announcement
  updateAnounce(id: any, apt: announce) {
    return this.announceRef.update({
      title: apt.title,
      announceBody: apt.announceBody,
      category: apt.category,
      likes: apt.likes,
      coverImage: apt.coverImage,
      otherImages: apt.otherImages,
      id_user: "xkDk50haeMf1eIErw0lpHcCfvjF2",
    });
  }

  // Delete an announcement
  deleteAnounce(id: string) {
    this.announceRef = this.db.object('/announce/' + id);
    this.announceRef.remove();
  }
}
