import {useLoader, useFrame, useThree} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {useRef} from "react";
import gsap from "gsap";
import {clamp} from "@/utils/math";

export default function Keyboard() {
    const keyboard = useLoader(GLTFLoader as any, '../assets/keyboard.gltf')
    const keyboardRef = useRef()
    const {pointer} = useThree();

    const initialKeyboardRotationState = {
        x: 0,
        y: 3.15,
        z: 0
    };
    const SPEED = 0.8

    const updateKeyboardPosition = () => {
        keyboardRef.current && gsap.to(keyboardRef.current["rotation"], {
            duration: 2.2,
            x: clamp(pointer.y * -1 * SPEED, 0.3, 0.5),
            y: clamp(initialKeyboardRotationState.y + pointer.x * SPEED, 2.9, 3.4),
            z: 0,
            ease: 'power2.out'
        });
    };

    useFrame((state, delta) => {
        updateKeyboardPosition()
    })

    return (
        <primitive object={keyboard.scene}
                   position={[0.2, -2, 1]}
                   scale={[0.8, 0.8, 0.8]}
                   rotation={initialKeyboardRotationState}
                   center={[0, 0, 0]}
                   ref={keyboardRef}/>

    )
}