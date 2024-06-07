import React from "react";
import ContentLoader from "react-content-loader";

function SkeletonLoader() {
  return (
    <ContentLoader
      width={450}
      height={400}
      viewBox="0 0 450 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
      className="-mt-24"
    >
      <rect x="42" y="77" rx="10" ry="10" width="488" height="190" />
    </ContentLoader>
  );
}

export default SkeletonLoader;
