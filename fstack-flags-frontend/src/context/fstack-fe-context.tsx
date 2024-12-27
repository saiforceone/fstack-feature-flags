import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import type { FeatureFlag, FStackFlagsContext } from "../@types/fstack-flags";
import FeatureFlagsService from "../services/feature-flags-service.ts";

export const FStackFEContext = createContext<FStackFlagsContext | null>(null);

export default function FStackFeContextProvider({ children }: { children: ReactNode }): ReactNode {
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [features, setFeatures] = useState<Array<FeatureFlag>>([]);

  const fetchFeatures = useCallback(() => {
    const _exec = async () => {
      const featureFlagsService = new FeatureFlagsService();
      const featureResponse = await featureFlagsService.getFeatures();
      if (!featureResponse) return;
      setFeatures(featureResponse);
    };

    setDataLoading(true);
    _exec().then().finally(() => setDataLoading(false));
  }, []);

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  return <FStackFEContext.Provider
    value={{ dataLoading, featureFlags: features }}>{children}</FStackFEContext.Provider>;
}
