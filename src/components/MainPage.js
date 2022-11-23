import { Suspense } from 'react'
import Scene from "./Eye3D";
import Navbar from "./Navbar";


const MainPage = () => {
    return(
        <main>
            <Suspense fallback={(<h1>Loading</h1>)}>
                <Scene/>
            </Suspense>
            <Navbar/>
        </main>
    )
}


export default MainPage