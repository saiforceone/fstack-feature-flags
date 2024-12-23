// File: services/notes-service.ts
import { type APIUtility, type BaseAPIResponse, Note } from "../@types/fstack-flags";

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
}
