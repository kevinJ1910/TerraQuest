import {
  collection,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

/**
 * UserDAO is a data access object (DAO) class responsible for interacting with the Firestore database.
 * It provides methods for creating, retrieving, updating, and deleting user documents in the "users" collection.
 */
class UserDAO {
  constructor() {
    // Reference to the "users" collection in Firestore.
    this.collectionRef = collection(db, "users");
  }

  /**
   * Retrieves a user document by its ID.
   * @param {string} id - The ID of the user document to retrieve.
   * @returns {Promise<object>} A promise that resolves to an object containing success status and user data.
   */
  async getUserById(id) {
    await getDoc(doc(this.collectionRef, id))
      .then((userDoc) => {
        if (userDoc.exists()) {
          return { success: true, data: userDoc.data() }; // Return user data if the document exists.
        } else {
          return { success: false, data: null }; // Return null if the document does not exist.
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  /**
   * Creates a new user document in the "users" collection.
   * @param {object} userData - The data to be stored in the new user document.
   * @returns {Promise<void>} A promise that resolves when the document is successfully created.
   */
  async createUser(userData) {
    await addDoc(this.collectionRef, userData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id); // Log the document ID after successful creation.
      })
      .catch((error) => {
        console.error("Error adding document: ", error); // Log any error that occurs during the document creation.
      });
  }

  /**
   * Updates an existing user document in the "users" collection.
   * @param {string} id - The ID of the user document to update.
   * @param {object} userData - The updated data to be stored in the document.
   * @returns {Promise<void>} A promise that resolves when the document is successfully updated.
   */
  async updateUser(id, userData) {
    const userRef = doc(this.collectionRef, id);
    await updateDoc(userRef, userData)
      .then(() => {
        console.log("Document successfully updated!"); // Log a message after successful update.
      })
      .catch((error) => {
        console.error("Error updating document: ", error); // Log any error that occurs during the document update.
      });
  }

  /**
   * Deletes a user document from the "users" collection.
   * @param {string} id - The ID of the user document to delete.
   * @returns {Promise<void>} A promise that resolves when the document is successfully deleted.
   */
  async deleteUser(id) {
    await deleteDoc(doc(this.collectionRef, id))
      .then(() => {
        console.log("Document successfully deleted!"); // Log a message after successful deletion.
      })
      .catch((error) => {
        console.error("Error removing document: ", error); // Log any error that occurs during the document deletion.
      });
  }
}

// Export an instance of UserDAO for use in other parts of the application.
export default new UserDAO();
