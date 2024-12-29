// File:  feature-wrapper.tsx
import { type ReactNode, useContext } from "react";
import { FStackFEContext } from "../../context/fstack-fe-context.tsx";
import { FStackFlagsContext } from "../../@types/fstack-flags";
import { hasFeature } from "../../helpers/feature-helpers.ts";

type FeatureWrapperProps = {
  children: ReactNode;
  requiredFeature: string;
}

/**
 * @function FeatureWrapper
 * @param {ReactNode} children the component to render if the required feature flag is present
 * @param {string} requiredFeature the flag that is required to render the wrapped component
 * @constructor
 * @return {ReactNode}
 */
export default function FeatureWrapper({ children, requiredFeature }: FeatureWrapperProps): ReactNode {
  const { featureFlags } = useContext(FStackFEContext) as FStackFlagsContext;
  const canRender = hasFeature(requiredFeature, featureFlags);
  return canRender ? children : null;
}