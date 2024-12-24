// File: services/notes-service.ts
import {
  type APIUtility,
  type BaseAPIResponse,
  Note,
  NoteDataSchema,
  NoteServiceDataResponse,
} from "../@types/fstack-flags";

// BASE_URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * @class NotesService
 * @implements APIUtility
 * @description this class provides a convenient way to make use of the notes api for operations such as retrieving, creating and updating notes
 */
export default class NotesService implements APIUtility {
  readonly baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/notes`;
  }

  /**
   * @function headers
   * @description convenience method for constructing headers for API requests
   * @returns {Headers}
   */
  headers(): Headers {
    return new Headers({
      "content-type": "application/json",
    });
  }

  /**
   * @async
   * @function getNotes
   * @description retrieves notes from the API
   * @returns {Promise<Array<Note>| null>}
   */
  async getNotes(): Promise<Array<Note> | null> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: this.headers(),
        method: "GET",
      });
      const jsonData = (await response.json()) as BaseAPIResponse;

      if (!jsonData.success) return null;
      return jsonData.data as Array<Note>;
    } catch (e) {
      return null;
    }
  }

  /**
   * @async
   * @function getNote
   * @param {string} noteId
   * @description retrieves a note using it's id
   * @returns {Promise<Note|null>}
   */
  async getNote(noteId: string): Promise<Note | null> {
    try {
      const url = `${this.baseUrl}/${noteId}`;
      const response = await fetch(url, {
        headers: this.headers(),
        method: "GET",
      });
      const jsonData = (await response.json()) as BaseAPIResponse;
      return jsonData.success ? (jsonData.data as Note) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * @function upsertNote
   * @param {NoteDataSchema} noteData an object that represents a note
   * @param {string} noteId an optional note id
   * @description given the presence of a noteId, attempts to update an existing note or create a new note
   * @returns {Promise<NoteServiceDataResponse>}
   */
  async upsertNote(noteData: NoteDataSchema, noteId?: string): Promise<NoteServiceDataResponse> {
    try {
      const url = noteId ? `${this.baseUrl}/${noteId}` : this.baseUrl;
      const response = await fetch(url, {
        body: JSON.stringify(noteData),
        headers: this.headers(),
        method: noteId ? "PUT" : "POST",
      });
      const jsonData = (await response.json()) as BaseAPIResponse;
      return {
        noteData: jsonData.data ? (jsonData.data as Note) : undefined,
        message: jsonData.message,
        success: jsonData.success,
      };
    } catch (e) {
      console.error("Failed to upsert note data with error: ", (e as Error).message);
      return {
        message: (e as Error).message,
        success: false,
      };
    }
  }

  /**
   * @function deleteNote
   * @param {string} noteId the identifier of the note to be deleted
   * @description Deletes a note given an id
   * @returns {Promise<NoteServiceDataResponse>}
   */
  async deleteNote(noteId: string): Promise<NoteServiceDataResponse> {
    try {
      const url = `${this.baseUrl}/${noteId}`;
      const response = await fetch(url, {
        headers: this.headers(),
        method: "DELETE",
      });
      return (await response.json()) as BaseAPIResponse;
    } catch (e) {
      return {
        message: (e as Error).message,
        success: false,
      };
    }
  }
}
