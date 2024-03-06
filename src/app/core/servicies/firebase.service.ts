import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  addDoc,
  collection,
  updateDoc,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  Unsubscribe,
  DocumentData,
  deleteDoc,
  Firestore,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  FirebaseStorage,
} from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signOut,
  signInWithEmailAndPassword,
  initializeAuth,
  indexedDBLocalPersistence,
  UserCredential,
  Auth,
  User,
} from 'firebase/auth';
import { Pokemon, PokemonF } from '../interfaces/pokemon';
import { TeamData, TeamDataF } from '../interfaces/pokemon-team';

export interface FirebaseStorageFile {
  path: string;
  file: string;
}

export interface FirebaseDocument {
  id: string;
  data: DocumentData;
}

export interface FirebaseUserCredential {
  user: UserCredential;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _app!: FirebaseApp;
  private _db!: Firestore;
  private _auth!: Auth;
  private _webStorage!: FirebaseStorage;
  private _user: User | null = null;
  private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLogged$: Observable<boolean> = this._isLogged.asObservable();

  constructor(@Inject('firebase-config') config: any) {
    this.init(config);
  }
  public mapPokemon(el:FirebaseDocument):PokemonF {
    return{
      id:el.data['pokemon_id'],
      name: el.data['name'],
      hp: el.data['hp'],
      atk: el.data['atk'],
      def: el.data['def'],
      speAtk: el.data['speAtk'],
      speDef: el.data['speDef'],
      speed: el.data['speed'],
      bst: el.data['bst']
    }
  }
  //TODO
  public mapTeam(el:FirebaseDocument):TeamDataF{
    return{
      team_id:el.id,
      title:el.data['title'],
      pokemon_1:{
        id: el.data['pokemon_1'].pokemon_id,
        name: el.data['pokemon_1'].name,
        hp: el.data['pokemon_1'].hp,
        atk: el.data['pokemon_1'].atk,
        def: el.data['pokemon_1'].def,
        speAtk: el.data['pokemon_1'].speAtk,
        speDef: el.data['pokemon_1'].speDef,
        speed: el.data['pokemon_1'].speed,
        bst: el.data['pokemon_1'].bst
      },
      pokemon_2:{
        id: el.data['pokemon_2'].pokemon_id,
        name: el.data['pokemon_2'].name,
        hp: el.data['pokemon_2'].hp,
        atk: el.data['pokemon_2'].atk,
        def: el.data['pokemon_2'].def,
        speAtk: el.data['pokemon_2'].speAtk,
        speDef: el.data['pokemon_2'].speDef,
        speed: el.data['pokemon_2'].speed,
        bst: el.data['pokemon_2'].bst
      },
      pokemon_3:{
        id: el.data['pokemon_3'].pokemon_id,
        name: el.data['pokemon_3'].name,
        hp: el.data['pokemon_3'].hp,
        atk: el.data['pokemon_3'].atk,
        def: el.data['pokemon_3'].def,
        speAtk: el.data['pokemon_3'].speAtk,
        speDef: el.data['pokemon_3'].speDef,
        speed: el.data['pokemon_3'].speed,
        bst: el.data['pokemon_3'].bst
      },
      pokemon_4:{
        id: el.data['pokemon_4'].pokemon_id,
        name: el.data['pokemon_4'].name,
        hp: el.data['pokemon_4'].hp,
        atk: el.data['pokemon_4'].atk,
        def: el.data['pokemon_4'].def,
        speAtk: el.data['pokemon_4'].speAtk,
        speDef: el.data['pokemon_4'].speDef,
        speed: el.data['pokemon_4'].speed,
        bst: el.data['pokemon_4'].bst
      },
      pokemon_5:{
        id: el.data['pokemon_5'].pokemon_id,
        name: el.data['pokemon_5'].name,
        hp: el.data['pokemon_5'].hp,
        atk: el.data['pokemon_5'].atk,
        def: el.data['pokemon_5'].def,
        speAtk: el.data['pokemon_5'].speAtk,
        speDef: el.data['pokemon_5'].speDef,
        speed: el.data['pokemon_5'].speed,
        bst: el.data['pokemon_5'].bst
      },
      pokemon_6:{
        id: el.data['pokemon_6'].pokemon_id,
        name: el.data['pokemon_6'].name,
        hp: el.data['pokemon_6'].hp,
        atk: el.data['pokemon_6'].atk,
        def: el.data['pokemon_6'].def,
        speAtk: el.data['pokemon_6'].speAtk,
        speDef: el.data['pokemon_6'].speDef,
        speed: el.data['pokemon_6'].speed,
        bst: el.data['pokemon_6'].bst
      }

    }
    
  }
  public async init(firebaseConfig: any) {
    // Initialize Firebase
    this._app = initializeApp(firebaseConfig);
    this._db = getFirestore(this._app);
    this._webStorage = getStorage(this._app);
    this._auth = initializeAuth(getApp(), {
      persistence: indexedDBLocalPersistence,
    });
    this._auth.onAuthStateChanged(async (user) => {
      this._user = user;
      if (user) {
        if (user.uid && user.email) {
          this._isLogged.next(true);
        }
      } else {
        this._isLogged.next(false);
      }
    });
  }
  /*
  public fileUpload(blob: Blob, mimeType:string, path:string, prefix:string, extension:string):Promise<FirebaseStorageFile>{
    return new Promise(async (resolve, reject) => {
        if(!this._webStorage || !this._auth)
            reject({
                msg: "Not connected to FireStorage"
            });
        var freeConnection = false;
        if(this._auth && !this._auth.currentUser){
            try {
                await signInAnonymously(this._auth);
                freeConnection = true;
            } catch (error) {
                reject(error);
            }
        }
        const url = path+"/"+prefix+"-"+Date.now() + extension;
        const storageRef = ref(this._webStorage!, url);
        const metadata = {
            contentType: mimeType,
        };
        uploadBytes(storageRef, blob).then(async (snapshot) => {
            getDownloadURL(storageRef).then(async downloadURL => {
              if(freeConnection)
                  await signOut(this._auth!);
              resolve({
                  path,
                  file: downloadURL,
              });
            }).catch(async error=>{
              if(freeConnection)
                  await signOut(this._auth!);
              reject(error);
            });
        }).catch(async (error) => {
            if(freeConnection)
                await signOut(this._auth!);
            reject(error);
        });
    });
  }

  public imageUpload(blob: Blob): Promise<any> {
    return this.fileUpload(blob,'image/jpeg', 'images', 'image', ".jpg");
  }
*/

  public async createDocument(collectionName: string, data: any){
    if (this._db) {
      const collectionRef = collection(this._db!, collectionName);
      const documentRef = await addDoc(collectionRef, data);
      var doc_id = documentRef.id;
      if(collectionName == "pokemon")
        await setDoc(documentRef, { ...data, pokemon_id: doc_id });
      else
        await setDoc(documentRef, { ...data, team_id: doc_id });
      console.log('Document created with id: ' + doc_id);
    }
    else console.log('Error creating document, the database is not connected');
  }

  public createDocumentWithId(
    collectionName: string,
    data: any,
    docId: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        reject({
          msg: 'Database is not connected',
        });
      }
      const docRef = doc(this._db!, collectionName, docId);
      setDoc(docRef, data)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  public updateDocument(
    collectionName: string,
    document: string,
    data: any
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const collectionRef = collection(this._db!, collectionName);
      updateDoc(doc(collectionRef, document), data)
        .then((docRef) => resolve())
        .catch((err) => reject(err));
    });
  }

  public getDocuments(collectionName: string): Promise<FirebaseDocument[]> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const querySnapshot = await getDocs(
        collection(this._db!, collectionName)
      );
      resolve(
        querySnapshot.docs.map<FirebaseDocument>((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });
  }

  public getDocument(
    collectionName: string,
    document: string
  ): Promise<FirebaseDocument> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const docRef = doc(this._db!, collectionName, document);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resolve({ id: docSnap.id, data: docSnap.data() });
      } else {
        // doc.data() will be undefined in this case
        reject('document does not exists');
      }
    });
  }

  public getDocumentsBy(
    collectionName: string,
    field: string,
    value: any
  ): Promise<FirebaseDocument[]> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const q = query(
        collection(this._db!, collectionName),
        where(field, '==', value)
      );

      const querySnapshot = await getDocs(q);
      resolve(
        querySnapshot.docs.map<FirebaseDocument>((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });
  }

  public deleteDocument(collectionName: string, docId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      resolve(await deleteDoc(doc(this._db!, collectionName, docId)));
    });
  }

  /*
  public subscribeToCollection(
    collectionName: string,
    subject: BehaviorSubject<any[]>,
    mapFunction: (el: DocumentData) => any
  ): Unsubscribe | null {
    if (!this._db) return null;
    return onSnapshot(
      collection(this._db, collectionName),
      (snapshot) => {
        subject.next(snapshot.docs.map<any>((doc) => mapFunction(doc.data)));
      },
      (error) => {}
    );
  }*/
  public subscribeToCollection(
    collectionName: string,
    subject: BehaviorSubject<any[]>,
    mapFunction: (el: FirebaseDocument) => any
  ): Unsubscribe | null {
    if (!this._db) return null;
    return onSnapshot(
      collection(this._db, collectionName),
      (snapshot) => {
        subject.next(
          //Aqui es donde hace el mapeo del documento que le le llega
          snapshot.docs
            .map<FirebaseDocument>((doc) => {
              return { id: doc.id, data: doc.data() };
            })
            .map(mapFunction)
        );
      },
      (error) => {}
    );
  }

  public async signOut(signInAnon: boolean = false): Promise<void> {
    new Promise<void>(async (resolve, reject) => {
      if (this._auth)
        try {
          await this._auth.signOut();
          if (signInAnon) await this.connectAnonymously();
          resolve();
        } catch (error) {
          reject(error);
        }
    });
  }

  public isUserConnected(): Promise<boolean> {
    const response = new Promise<boolean>(async (resolve, reject) => {
      if (!this._auth) resolve(false);
      resolve(this._auth!.currentUser != null);
    });
    return response;
  }

  public isUserConnectedAnonymously(): Promise<boolean> {
    const response = new Promise<boolean>(async (resolve, reject) => {
      if (!this._auth) resolve(false);
      resolve(
        this._auth!.currentUser != null && this._auth!.currentUser.isAnonymous
      );
    });
    return response;
  }

  public async connectAnonymously(): Promise<void> {
    const response = new Promise<void>(async (resolve, reject) => {
      if (!this._auth) resolve();
      if (
        !(await this.isUserConnected()) &&
        !(await this.isUserConnectedAnonymously())
      ) {
        await signInAnonymously(this._auth!).catch((error) => reject(error));
        resolve();
      } else if (await this.isUserConnectedAnonymously()) resolve();
      else reject({ msg: 'An user is already connected' });
    });
    return response;
  }

  public async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseUserCredential | null> {
    return new Promise(async (resolve, reject) => {
      if (!this._auth) resolve(null);
      try {
        resolve({
          user: await createUserWithEmailAndPassword(
            this._auth!,
            email,
            password
          ),
        });
      } catch (error: any) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(`Email address ${email} already in use.`);
            break;
          case 'auth/invalid-email':
            console.log(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            console.log(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            console.log(
              'Password is not strong enough. Add additional characters including special characters and numbers.'
            );
            break;
          default:
            console.log(error.message);
            break;
        }
        reject(error);
      }
    });
  }

  public async connectUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseUserCredential | null> {
    return new Promise<FirebaseUserCredential | null>(
      async (resolve, reject) => {
        if (!this._auth) resolve(null);
        resolve({
          user: await signInWithEmailAndPassword(this._auth!, email, password),
        });
      }
    );
  }

  public deleteUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this._user) reject();
      resolve(deleteUser(this._user!));
    });
  }

  public updateDocumentField(
    collectionName: string,
    document: string,
    fieldName: string,
    fieldValue: any
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this._db) {
        reject({
          msg: 'Database is not connected',
        });
      }

      const documentRef = doc(this._db as Firestore, collectionName, document);
      const fieldUpdate = { [fieldName]: fieldValue }; // Crear un objeto con el campo a actualizar

      try {
        await updateDoc(documentRef, fieldUpdate);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
