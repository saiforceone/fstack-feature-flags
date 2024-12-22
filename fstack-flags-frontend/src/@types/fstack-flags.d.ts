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

export type FStackFlagsContext = {
  /**
   * Indicates if data is loading at the app-level
   */
  dataLoading: boolean;
};
