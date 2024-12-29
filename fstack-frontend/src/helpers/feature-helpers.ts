import { FeatureFlag } from "../@types/fstack-flags";

export function hasFeature(featureName: string, featureList: Array<FeatureFlag>): boolean {
  return featureList.findIndex(feature => feature.flag === featureName) > -1;
}