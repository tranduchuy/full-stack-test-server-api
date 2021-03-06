import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class FireBaseService {
  private firestore: Firestore | null = null;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        databaseURL: process.env.FIRESTORE_DB,
      });

      this.firestore = admin.firestore();
    }
  }

  async findUser(email: string): Promise<UserRecord | null> {
    try {
      return await admin.auth().getUserByEmail(email);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async createByEmailPassword(
    email: string,
    password: string,
  ): Promise<UserRecord | null> {
    try {
      const user = await admin.auth().createUser({
        email,
        emailVerified: true,
        password,
        disabled: false,
      });

      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async validateToken(token: string): Promise<string | null> {
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      return decoded.email;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  setRecord(collectionName: string, id: string, data: any) {
    return this.firestore.collection(collectionName).doc(id).set(data);
  }

  deleteRecord(collectionName: string, id: string) {
    return this.firestore?.collection(collectionName).doc(id).delete();
  }
}
