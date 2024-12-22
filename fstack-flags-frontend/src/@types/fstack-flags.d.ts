// An interface that attempts to standardize services or API utilities
export interface APIUtility {
  /**
   * @readonly
   * A string representing a base url for API requests
   *
   * @example http://localhost:5101/api/some-resource
   */
  readonly baseUrl: string;

  /**
   * A function that returns request headers intended to be used with the fetch API
   *
   * @example () => {'Content-Type': 'application/json'}
   */
  headers: () => Headers;
}

// A type that represents a standard API response from the API
export type BaseAPIResponse = {
  /**
   * @readonly
   *
   * Represents the data coming from the API which can either be an object or an array of objects
   *
   * @example {id: 1, title: 'Example', content: 'Some content...', created_at: '2024-12-22...'}
   */
  readonly data: object | Array<object>;

  /**
   * @readonly
   *
   * An optional message coming from the API that will generally indicate an error
   *
   * @export 'Failed to retrieve <resource> due to invalid id'
   */
  readonly message?: string;

  /**
   * @readonly
   *
   * Indicates if the request was successful or not
   */
  readonly success: boolean;
};

// A type that represents a Note from the API
export type Note = {
  /**
   * @readonly
   *
   * A number that represents the id of the note
   *
   * @example 1
   */
  readonly id: number;

  /**
   * @readonly
   *
   * A string that represents the title of the note
   *
   * @example 'Example Note'
   */
  readonly title: string;

  /**
   * @readonly
   *
   * A string that represents the main content of the note
   *
   * @example 'Some descriptive text for a note...'
   */
  readonly content: string;

  /**
   * @readonly
   *
   * A string that represents the date the note was created in ISO format
   *
   * @example '2024-12-21T18:53:20'
   */
  readonly created_at: string;

  /**
   * @readonly
   *
   * An optional string that represents when the note was last updated
   *
   * @example '2024-12-21T18:53:20'
   */
  readonly updated_at?: string;
};

export type FStackFlagsContext = {
  /**
   * Indicates if data is loading at the app-level
   */
  dataLoading: boolean;
};
