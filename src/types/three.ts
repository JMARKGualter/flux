import { ReactThreeFiber } from '@react-three/fiber';
import { Object3D, AmbientLight, DirectionalLight, PointLight } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: ReactThreeFiber.Object3DNode<Object3D, typeof Object3D>;
      ambientLight: ReactThreeFiber.Object3DNode<AmbientLight, typeof AmbientLight>;
      directionalLight: ReactThreeFiber.Object3DNode<DirectionalLight, typeof DirectionalLight>;
      pointLight: ReactThreeFiber.Object3DNode<PointLight, typeof PointLight>;
    }
  }
}

// GLB module declaration
declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}