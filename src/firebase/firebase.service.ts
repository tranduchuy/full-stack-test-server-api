import {Injectable} from "@nestjs/common";
import admin from 'firebase-admin';
import {Firestore} from '@google-cloud/firestore';

@Injectable()
export class FireBaseService {
    private firestore: Firestore | null = null;

    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
                }),
                databaseURL: "https://fir-firebase-3f024.firebaseio.com"
            });

            this.firestore = admin.firestore();
        }
    }
}
