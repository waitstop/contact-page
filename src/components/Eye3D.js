import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import {TextureLoader} from 'three/src/loaders/TextureLoader'
import eyeTexture from '../img/eye-texture.png'
import {useEffect, useMemo, useRef, useState} from "react";
import { AsciiEffect } from 'three-stdlib'


function AsciiRenderer({ renderIndex = 1, characters = ' .:-+*=%@#', ...options }) {
    // Reactive state
    const { size, gl, scene, camera } = useThree()

    // Create effect
    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characters, options)
        effect.domElement.style.position = 'absolute'
        effect.domElement.style.top = '0px'
        effect.domElement.style.left = '-2.5%'
        effect.domElement.style.color = 'white'
        effect.domElement.style.backgroundColor = '#191919'
        effect.domElement.style.pointerEvents = 'none'
        return effect
    }, [characters, gl, options])

    // Append on mount, remove on unmount
    useEffect(() => {
        gl.domElement.parentNode.appendChild(effect.domElement)
        return () => gl.domElement.parentNode.removeChild(effect.domElement)
    }, [effect, gl])

    // Set size
    useEffect(() => {
        effect.setSize(size.width, size.height)
    }, [effect, size])

    // Take over render-loop (that is what the index is for)
    useFrame((state) => {
        effect.render(scene, camera)
    }, renderIndex)

    // This component returns nothing, it has no view, it is a purely logical
}

const Eye3D = () => {
    const colorMap = useLoader(TextureLoader, eyeTexture)
    const meshRef = useRef(null)
    const [globalCoords, setGlobalCoords] = useState({x: 0.25, y: 0.25});

    useFrame(({ clock }) => {
        if (meshRef.current.position.z <= 1) meshRef.current.position.z = clock.getElapsedTime()*5 - 3
        meshRef.current.position.y = Math.sin(clock.getElapsedTime()*5)/10
    })

    useEffect(() => {
        const handleWindowMouseMove = event => {
             let timeout = setTimeout(()=>{
                setGlobalCoords({
                    x: (event.clientX / window.innerWidth) - .5,
                    y: (event.clientY / window.innerHeight) - .5,
                })
            }, 250)
            return () => clearTimeout(timeout)
        };
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, []);

    return (
        <>
            <mesh ref={meshRef} position={[0, 0, -10]} rotation={[globalCoords.y, globalCoords.x, 0]}>
                <sphereGeometry args={[1, 32, 32]}/>
                <meshPhysicalMaterial map={colorMap} metalness={0.2} roughness={0.1} transmission={0.15}/>
            </mesh>
        </>
    )
}

const Scene = () => {
    return(
        <Canvas shadows>
            <ambientLight intensity={0.3}/>
            <directionalLight color={"#fff"} intensity={0.6} position={[3, 2, 1]}/>
            <Eye3D/>
            <AsciiRenderer/>
        </Canvas>
    )
}

export default Scene