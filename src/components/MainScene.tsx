'use client'
import Keyboard from "@/components/Keyboard";
import Monitor from "@/components/Monitor";
import React from "react";
import {Canvas} from "@react-three/fiber";
import {Float} from "@react-three/drei";

export default function MainScene() {
    return <Canvas>
        <pointLight color={0xf9efff} intensity={50} position={[0, 0.9, 2.9]}/>
        <Float rotationIntensity={0.4}>
            <Monitor/>
            <Keyboard/>
        </Float>

    </Canvas>
}