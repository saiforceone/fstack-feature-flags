import { type APIUtility, BaseAPIResponse, FeatureFlag } from "../@types/fstack-flags";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default class FeatureFlagsService implements APIUtility {
  readonly baseUrl: string;
  constructor() {
    this.baseUrl = `${BASE_URL}/features`;
  }

  headers(): Headers {
    return new Headers({
      'content-type': 'application/json',
    })
  }

  /**
   * @function getFeatures
   * @description retrieves the available features from the API
   * @returns {Promise<Array<FeatureFlag> | null>}
   */
  async getFeatures(): Promise<Array<FeatureFlag>|null> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: this.headers(),
      })
      const jsonData = (await response.json()) as BaseAPIResponse;
      if (!jsonData.success) return null;
      return jsonData.data as FeatureFlag[];
    } catch (e) {
      console.error(`Failed to retrieve feature flags with error: ${(e as Error).message}`);
      return null;
    }
  }
}