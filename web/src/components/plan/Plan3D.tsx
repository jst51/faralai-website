"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { OUTRO_START, STATIONS, stopStart } from "./timing";

// "From the plan to the built thing": a flat blueprint seen from above. As the page scrolls, the
// camera tilts down and each service rises out of the plan, first strategy, then execution.
// Everything is generated from code, so there are no model files to load.

const LIME = "#c8f02c";
const VIOLET = "#8e83e8";
const WHITE = "#f6f6f2";
const STEEL = "#3a4f8f";
const PAD = "#17285a";
const BLUEPRINT = new THREE.Color("#4a60a6");

type V3 = [number, number, number];

// Serpentine layout: four strategy pads on the left, four execution pads on the right.
const SPOTS: V3[] = [
  [-7, 0, 2.4],
  [-7, 0, -2.4],
  [-2.8, 0, -2.4],
  [-2.8, 0, 2.4],
  [2.8, 0, 2.4],
  [2.8, 0, -2.4],
  [7, 0, -2.4],
  [7, 0, 2.4],
];

const ROUTE: [number, number][] = [
  [-7, 4.8], [-7, 2.4], [-7, -2.4], [-6.2, -4.2], [-3.6, -4.2], [-2.8, -2.4], [-2.8, 2.4], [-2, 4.2],
  [2, 4.2], [2.8, 2.4], [2.8, -2.4], [3.6, -4.2], [6.2, -4.2], [7, -2.4], [7, 2.4], [7, 4.8],
];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeOutBack = (x: number) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);

// Camera keys: position, target, and how much width the shot needs (narrow screens pull back).
type Key = { p: number; pos: V3; tgt: V3; width: number; lift?: number };

const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

const KEYS: Key[] = [
  { p: 0, pos: [0, 26, 0.01], tgt: [0, 0, 0], width: 1.5, lift: 9 },
  { p: 0.05, pos: [0, 26, 0.01], tgt: [0, 0, 0], width: 1.5, lift: 9 },
  ...SPOTS.flatMap((s, i): Key[] => {
    // The digital-marketing station looks past the stage in front of it, so it shoots from the side.
    const pos = add(s, i === 6 ? [7.5, 8.2, 7.2] : [2.4, 7.4, 10.2]);
    const tgt = add(s, [0, 0.75, 0.55]);
    return [
      { p: stopStart(i) + 0.012, pos, tgt, width: 0.95 },
      { p: stopStart(i) + 0.05, pos, tgt, width: 0.95 },
    ];
  }),
  { p: OUTRO_START + 0.06, pos: [10, 17, 22], tgt: [0, 0.6, 0], width: 1.5 },
  { p: 1, pos: [10, 17, 22], tgt: [0, 0.6, 0], width: 1.5 },
];

function Rig({ progress }: { progress: RefObject<number> }) {
  const { camera, size } = useThree();
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tgt = useMemo(() => new THREE.Vector3(), []);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const p = progress.current;
    let i = 0;
    while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
    const k0 = KEYS[i];
    const k1 = KEYS[i + 1];
    const u = THREE.MathUtils.smootherstep(p, k0.p, k1.p);
    pos.fromArray(k0.pos).lerp(b.fromArray(k1.pos), u);
    tgt.fromArray(k0.tgt).lerp(a.fromArray(k1.tgt), u);
    const width = THREE.MathUtils.lerp(k0.width, k1.width, u);
    const aspect = size.width / size.height;
    const fit = Math.max(1, width / aspect);
    // On tall screens the opening plan moves up, clear of the headline.
    if (aspect < 0.8) {
      const lift = THREE.MathUtils.lerp(k0.lift ?? 0, k1.lift ?? 0, u);
      tgt.z += lift;
      pos.z += lift;
    }
    camera.position.copy(a.copy(pos).sub(tgt).multiplyScalar(fit).add(tgt));
    camera.lookAt(tgt);
  });
  return null;
}

const Matte = ({ color }: { color: string }) => <meshStandardMaterial color={color} roughness={0.72} metalness={0} />;

function Box({ size, at = [0, 0, 0], color, r = 0.07 }: { size: V3; at?: V3; color: string; r?: number }) {
  const geo = useMemo(() => new RoundedBoxGeometry(size[0], size[1], size[2], 4, Math.min(r, Math.min(...size) / 2.05)), [size, r]);
  return (
    <mesh geometry={geo} position={at}>
      <Matte color={color} />
    </mesh>
  );
}

function Cyl({ r, h, at = [0, 0, 0], color }: { r: number; h: number; at?: V3; color: string }) {
  return (
    <mesh position={at}>
      <cylinderGeometry args={[r, r, h, 56]} />
      <Matte color={color} />
    </mesh>
  );
}

function Ball({ r, at, color }: { r: number; at: V3; color: string }) {
  return (
    <mesh position={at}>
      <sphereGeometry args={[r, 40, 28]} />
      <Matte color={color} />
    </mesh>
  );
}

function Link({ from, to, color }: { from: V3; to: V3; color: string }) {
  const { mid, length, quat } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    return {
      mid: a.clone().add(b).multiplyScalar(0.5),
      length: dir.length(),
      quat: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()),
    };
  }, [from, to]);
  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[0.05, 0.05, length, 16]} />
      <Matte color={color} />
    </mesh>
  );
}

function Quarter({ s, h, at, turn, color }: { s: number; h: number; at: V3; turn: number; color: string }) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(s, 0);
    shape.absarc(0, 0, s, 0, Math.PI / 2, false);
    shape.lineTo(0, 0);
    const g = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false, curveSegments: 40 });
    g.rotateX(-Math.PI / 2);
    g.center();
    g.translate(0, 0, 0);
    return g;
  }, [s, h]);
  return (
    <mesh geometry={geo} position={at} rotation={[0, turn, 0]}>
      <Matte color={color} />
    </mesh>
  );
}

// One service: starts squashed flat in blueprint colour, then rises and takes its real colours.
function Piece({ index, smooth, children }: { index: number; smooth: RefObject<number>; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const parts = useRef<{ mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; target: THREE.Color }[]>([]);

  useLayoutEffect(() => {
    const found: typeof parts.current = [];
    group.current?.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.receiveShadow = true;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      found.push({ mesh, mat, target: mat.color.clone() });
    });
    parts.current = found;
  }, []);

  useFrame(() => {
    const start = stopStart(index) - 0.035;
    const t = clamp01((smooth.current - start) / 0.07);
    if (group.current) group.current.scale.y = Math.max(0.012, t === 0 ? 0 : easeOutBack(t));
    const c = clamp01(t * 1.5);
    parts.current.forEach(({ mesh, mat, target }) => {
      mat.color.copy(BLUEPRINT).lerp(target, c);
      mesh.castShadow = t > 0.02;
    });
  });

  return (
    <group ref={group} position={add(SPOTS[index], [0, 0.09, 0])}>
      {children}
    </group>
  );
}

// The eight services, in the order of the services list.
const DataAnalytics = () => (
  <group position={[0, 0.08, 0]}>
    {[0.7, 1.25, 0.95, 2.05, 1.5].map((h, i) => (
      <Box key={i} size={[0.42, h, 1]} at={[-1.04 + i * 0.52, h / 2, 0]} color={i === 3 ? VIOLET : WHITE} />
    ))}
    <mesh position={[0.52, 2.2, 0.7]} rotation={[-0.3, 0, 0]}>
      <torusGeometry args={[0.44, 0.085, 20, 64]} />
      <Matte color={LIME} />
    </mesh>
    <Link from={[0.84, 1.88, 0.8]} to={[1.3, 1.36, 0.95]} color={LIME} />
  </group>
);

const NODES: V3[] = [[-1.15, 1.6, -0.75], [1.15, 1.9, -0.7], [1.2, 1.1, 0.85], [-1.1, 0.85, 0.95], [0, 2.5, -1.05]];
const Consulting = () => (
  <group position={[0, 0.08, 0]}>
    <Cyl r={0.08} h={1.1} at={[0, 0.55, 0]} color={STEEL} />
    {NODES.map((n, i) => (
      <group key={i}>
        <Link from={[0, 1.35, 0]} to={n} color={STEEL} />
        <Ball r={i % 2 ? 0.24 : 0.32} at={n} color={i === 1 ? VIOLET : WHITE} />
      </group>
    ))}
    <Ball r={0.62} at={[0, 1.35, 0]} color={LIME} />
  </group>
);

const MarketingPlan = () => {
  const rows = [
    { x: -0.55, w: 1.5, h: 0.4, z: 1, c: WHITE },
    { x: -0.15, w: 1.9, h: 0.85, z: 0.34, c: VIOLET },
    { x: 0.3, w: 1.7, h: 1.35, z: -0.32, c: WHITE },
    { x: 0.6, w: 1.4, h: 1.95, z: -0.98, c: LIME },
  ];
  return (
    <group position={[0, 0.08, 0]}>
      {rows.map((r, i) => (
        <Box key={i} size={[r.w, r.h, 0.52]} at={[r.x, r.h / 2, r.z]} color={r.c} r={0.12} />
      ))}
    </group>
  );
};

const Brand = () => (
  <group position={[0, 0.08, 0]}>
    <Cyl r={0.5} h={0.22} at={[0, 0.11, 0.2]} color={STEEL} />
    <Link from={[0, 0.2, 0.2]} to={[0, 1.3, 0]} color={STEEL} />
    <group position={[0, 1.55, 0]} rotation={[1.08, 0, 0]}>
      <Cyl r={1.18} h={0.26} color={LIME} />
      <Box size={[1.09, 0.14, 0.18]} at={[0, 0.17, -0.33]} color={VIOLET} r={0.07} />
      <Box size={[1, 0.14, 0.18]} at={[-0.05, 0.17, 0]} color={VIOLET} r={0.07} />
      <Box size={[0.57, 0.14, 0.18]} at={[-0.26, 0.17, 0.33]} color={VIOLET} r={0.07} />
    </group>
  </group>
);

// Project management: a task board, three columns from "to do" to "done", with the done column ticked.
const ProjectBoard = () => {
  const columns = [
    { x: -0.95, cards: [WHITE, WHITE, VIOLET] },
    { x: 0, cards: [VIOLET, WHITE] },
    { x: 0.95, cards: [LIME, LIME, LIME, LIME] },
  ];
  return (
    <group position={[0, 0.08, 0]}>
      <Box size={[3, 0.12, 2.6]} at={[0, 0.06, 0]} color={STEEL} r={0.06} />
      {columns.map((c) =>
        c.cards.map((color, i) => <Box key={`${c.x}-${i}`} size={[0.78, 0.26, 0.5]} at={[c.x, 0.27 + i * 0.3, 0.6 - i * 0.02]} color={color} r={0.07} />),
      )}
      <group position={[0.85, 1.75, 0.6]}>
        <group position={[-0.15, 0.17, 0]} rotation={[0, 0, 0.75]}>
          <Box size={[0.2, 0.5, 0.2]} color={LIME} r={0.09} />
        </group>
        <group position={[0.24, 0.35, 0]} rotation={[0, 0, -0.6]}>
          <Box size={[0.2, 0.9, 0.2]} color={LIME} r={0.09} />
        </group>
      </group>
    </group>
  );
};

const Web = () => (
  <group position={[0, 0.08, 0]}>
    <Box size={[1.5, 0.2, 0.9]} at={[0, 0.1, 0.1]} color={STEEL} />
    <Box size={[0.32, 0.7, 0.2]} at={[0, 0.5, -0.1]} color={STEEL} />
    <group position={[0, 1.55, 0]} rotation={[1.2, 0, 0]}>
      <Box size={[3.1, 0.14, 2.1]} color={WHITE} r={0.07} />
      <Box size={[3.1, 0.06, 0.28]} at={[0, 0.09, -0.91]} color={VIOLET} r={0.03} />
      <Box size={[1.4, 0.07, 1.3]} at={[-0.68, 0.11, 0.12]} color={LIME} r={0.035} />
      <Box size={[1.15, 0.07, 0.18]} at={[0.72, 0.11, -0.32]} color={STEEL} r={0.035} />
      <Box size={[0.9, 0.07, 0.18]} at={[0.6, 0.11, 0]} color={STEEL} r={0.035} />
      <Box size={[0.7, 0.08, 0.3]} at={[0.5, 0.11, 0.48]} color={VIOLET} r={0.04} />
    </group>
  </group>
);

const Graphic = () => (
  <group position={[0, 0.08, 0]}>
    <Quarter s={1.25} h={1.5} at={[-0.68, 0.75, -0.68]} turn={0} color={LIME} />
    <Quarter s={1.25} h={0.75} at={[0.68, 0.375, -0.68]} turn={-Math.PI / 2} color={VIOLET} />
    <Cyl r={0.62} h={1.1} at={[-0.68, 0.55, 0.68]} color={WHITE} />
    <mesh position={[0.68, 0.3, 0.68]}>
      <torusGeometry args={[0.42, 0.2, 24, 60]} />
      <Matte color={LIME} />
    </mesh>
  </group>
);

// Events and experiential: a stage with a backdrop, a lighting truss and two spotlights.
const Events = () => (
  <group position={[0, 0.08, 0]}>
    <Box size={[3, 0.32, 1.9]} at={[0, 0.16, 0.25]} color={WHITE} r={0.08} />
    <Box size={[2.6, 1.7, 0.14]} at={[0, 1.15, -0.7]} color={VIOLET} r={0.06} />
    <Cyl r={0.42} h={0.14} at={[0, 1.25, -0.6]} color={LIME} />
    <Cyl r={0.07} h={2.7} at={[-1.4, 1.35, 1.0]} color={STEEL} />
    <Cyl r={0.07} h={2.7} at={[1.4, 1.35, 1.0]} color={STEEL} />
    <Box size={[2.95, 0.14, 0.14]} at={[0, 2.68, 1.0]} color={STEEL} r={0.05} />
    {[-0.7, 0.7].map((x) => (
      <mesh key={x} position={[x, 2.35, 1.0]} rotation={[-0.6, 0, 0]}>
        <coneGeometry args={[0.24, 0.5, 32]} />
        <Matte color={LIME} />
      </mesh>
    ))}
    <Box size={[0.5, 0.75, 0.4]} at={[0.75, 0.7, 0.45]} color={STEEL} r={0.08} />
  </group>
);

const PIECES = [DataAnalytics, Consulting, MarketingPlan, Brand, ProjectBoard, Graphic, Web, Events];

function Route({ smooth }: { smooth: RefObject<number> }) {
  const live = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(ROUTE.map(([x, z]) => new THREE.Vector3(x, 0.13, z)), false, "centripetal");
    return new THREE.TubeGeometry(curve, 500, 0.06, 8, false);
  }, []);
  const full = geo.index?.count ?? 0;
  const liveGeo = useMemo(() => geo.clone(), [geo]);

  useFrame(() => {
    const f = clamp01((smooth.current - 0.06) / (stopStart(STATIONS - 1) + 0.06));
    liveGeo.setDrawRange(0, Math.floor((full * f) / 6) * 6);
    if (live.current) live.current.visible = f > 0;
  });

  return (
    <>
      <mesh geometry={geo}>
        <meshBasicMaterial color="#33467f" />
      </mesh>
      <mesh ref={live} geometry={liveGeo} position={[0, 0.01, 0]}>
        <meshBasicMaterial color={LIME} />
      </mesh>
    </>
  );
}

// The "+" between the two halves appears last.
function Plus({ smooth }: { smooth: RefObject<number> }) {
  const g = useRef<THREE.Group>(null);
  useFrame(() => {
    const t = clamp01((smooth.current - OUTRO_START) / 0.06);
    if (g.current) g.current.scale.setScalar(t === 0 ? 0.0001 : easeOutBack(t));
  });
  return (
    <group ref={g} position={[0, 0.5, -2.1]}>
      <Box size={[1.9, 0.5, 0.56]} color={LIME} r={0.12} />
      <Box size={[0.56, 0.5, 1.9]} color={LIME} r={0.12} />
    </group>
  );
}

// Keeps the scene smooth on slower devices: first lowers the resolution, then drops the shadows.
function Governor({ light }: { light: RefObject<THREE.DirectionalLight | null> }) {
  const setDpr = useThree((s) => s.setDpr);
  const sample = useRef({ total: 0, frames: 0, level: 0 });
  useFrame((_, delta) => {
    const m = sample.current;
    if (m.level >= 2 || delta > 0.25) return;
    m.total += delta;
    m.frames += 1;
    if (m.frames < 90) return;
    if (m.total / m.frames > 1 / 30) {
      m.level += 1;
      if (m.level === 1) setDpr(1);
      else if (light.current) light.current.castShadow = false;
    }
    m.total = 0;
    m.frames = 0;
  });
  return null;
}

function Scene({ progress }: { progress: RefObject<number> }) {
  const smooth = useRef(0);
  const light = useRef<THREE.DirectionalLight>(null);
  const invalidate = useThree((s) => s.invalidate);

  // The scene only redraws while the page scrolls or the pieces are still catching up.
  useEffect(() => {
    const redraw = () => invalidate();
    window.addEventListener("scroll", redraw, { passive: true });
    window.addEventListener("resize", redraw);
    return () => {
      window.removeEventListener("scroll", redraw);
      window.removeEventListener("resize", redraw);
    };
  }, [invalidate]);

  useFrame((state, delta) => {
    smooth.current = THREE.MathUtils.damp(smooth.current, progress.current, 7, Math.min(delta, 1 / 30));
    if (Math.abs(smooth.current - progress.current) > 0.0004) state.invalidate();
  });

  return (
    <>
      <Rig progress={smooth} />
      <Governor light={light} />
      <ambientLight intensity={1.75} />
      <directionalLight
        ref={light}
        position={[-9, 18, 9]}
        intensity={2.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-far={50}
        shadow-bias={-0.0004}
      />
      <gridHelper args={[60, 60, "#1c2d60", "#1c2d60"]} position={[0, 0.001, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <shadowMaterial opacity={0.42} />
      </mesh>
      {SPOTS.map((s, i) => (
        <group key={i} position={s}>
          <Box size={[3.5, 0.08, 3.5]} at={[0, 0.04, 0]} color={PAD} r={0.04} />
        </group>
      ))}
      <Route smooth={smooth} />
      {PIECES.map((P, i) => (
        <Piece key={i} index={i} smooth={smooth}>
          <P />
        </Piece>
      ))}
      <Plus smooth={smooth} />
    </>
  );
}

export default function Plan3D({ progress, active }: { progress: RefObject<number>; active: boolean }) {
  return (
    <Canvas
      flat
      shadows
      frameloop={active ? "demand" : "never"}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 28, near: 0.5, far: 260, position: [0, 26, 0.01] }}
      className="!absolute inset-0"
    >
      <Scene progress={progress} />
    </Canvas>
  );
}
