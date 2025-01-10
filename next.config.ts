import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns:[
    {
      protocol:"https",
      hostname:"utfs.io",
      port:""
    },
    {
      protocol:"https",
      hostname:"qbn4m7pc4t.ufs.sh",
      port:""
    }
  ]
 }
};

export default nextConfig;
