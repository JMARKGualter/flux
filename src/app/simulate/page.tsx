'use client';

import dynamic from 'next/dynamic';

// Client-only: the workbench uses WebGL, localStorage, and WebAudio
const SimWorkbench = dynamic(
  () => import('@/components/simulate/SimWorkbench').then((m) => m.SimWorkbench),
  { ssr: false }
);

export default function SimulatePage() {
  return <SimWorkbench />;
}
