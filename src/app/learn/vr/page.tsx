'use client';

import dynamic from 'next/dynamic';

// The VR experience touches browser-only APIs (WebXR, the XR store), so it is
// loaded client-side only — keeps the static-export prerender clean.
const VRExperience = dynamic(
  () => import('@/components/vr/VRExperience').then((m) => m.VRExperience),
  { ssr: false }
);

export default function VRPage() {
  return <VRExperience />;
}
