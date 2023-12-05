'use client'
import Keyboard from "@/components/Keyboard";
import React from "react";
import {Canvas} from "@react-three/fiber";

export default function MainScene() {
    return <Canvas>
        <pointLight color={'#f9efff'} intensity={50} position={[0, 0.9, 2.9]} wireFrame={true}/>
        <Keyboard/>
    </Canvas>
}