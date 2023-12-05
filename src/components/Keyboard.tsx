import {useLoader, useFrame, useThree} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {useRef, useState} from "react";
import gsap from "gsap";

export default function Keyboard() {
    const keyboard = useLoader(GLTFLoader as any, '../assets/keyboard.gltf')
    const enter = keyboard.nodes['Enter']
    const initialEnterYposition = enter.position.y
    const [enterPosition, setEnterPosition] = useState(initialEnterYposition)

    const initialKeyboardRotationState = {
        x: 0,
        y: 3.15,
        z: 0
    };

    const SPEED = 0.6

    const keyboardRef = useRef()
    const {pointer} = useThree();

    const handleEnterDown = () => {
        setEnterPosition(0.05)
    }
    const handleEnterUp = () => {
        setEnterPosition(initialEnterYposition)
    }

    document.addEventListener('keydown', (event) => {
        const keyPressed = event.key
        if (keyPressed === 'Enter') {
            handleEnterDown()
        }
    })
    document.addEventListener('keyup', (event) => {
        const keyPressed = event.key
        if (keyPressed === 'Enter') {
            handleEnterUp()
        }
    })


    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    const updateKeyboardPosition = () => {
        gsap.to(keyboardRef.current["rotation"], {
            duration: 2.2,
            x: clamp(pointer.y * -1 * SPEED, 0.2, 0.5),
            y: clamp(initialKeyboardRotationState.y + pointer.x * SPEED, 2.9, 3.4),
            z: 0,
            ease: 'power2.out'
        });
    };


    useFrame((state, delta) => {
        enter.position.setY(enterPosition)

        updateKeyboardPosition()
    })

    return (
        <>
            <primitive object={keyboard.scene} position={[0, -1.8, 0.7]} rotation={initialKeyboardRotationState}
                       ref={keyboardRef}/>
        </>
    )
}