import {useLoader, useThree} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from "gsap";
import {useEffect, useRef} from "react";
import {Html} from "@react-three/drei";

export default function Monitor() {
    const monitor = useLoader(GLTFLoader as any, '../assets/monitor.gltf')
    const monitorRef = useRef()

    const {pointer} = useThree();

    const monitorAnimation = () => {
        monitorRef.current && gsap.fromTo(monitorRef.current["scale"], {
            x: 0,
            y: 0,
            z: 0
        }, {
            duration: 2.2,
            x: 2,
            y: 2,
            z: 2,
            ease: 'power2.out'
        });
        monitorRef.current && gsap.fromTo(monitorRef.current["rotation"], {
            y: 0
        }, {
            duration: 2.2,
            y: Math.PI * 2.5,
            ease: 'power2.out'
        });
    }

    useEffect(() => {
        monitorAnimation()
        gsap.fromTo('.htmlScreen', {
            opacity: 0
        }, {
            duration: 2.2,
            opacity: 1,
            ease: 'power2.out',
            delay: 2.2
        });
    }, [])
    return (
        <>
            <primitive object={monitor.scene}
                       position={[0, 1.3, 0]}
                       ref={monitorRef}
                       rotation={[0, Math.PI * 1.8, 0]}
                       scale={[2, 2, 2]}
            >
                <Html
                    transform
                    wrapperClass={"htmlScreen"}
                    distanceFactor={0.9}
                    position={[0, 0.03, 0]}
                    rotation={[0, -(Math.PI * 0.5), 0]}
                >
                    <iframe
                        src={"https://www.typez.dev"}/>
                </Html>
            </primitive>
        </>
    )
}