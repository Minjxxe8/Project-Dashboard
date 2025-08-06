//L'affichage de la page global avec les jars
import Jars from "./components/Jar.tsx";

const jarsData = [
    { name: "Souveniiiiiirs" },
    { name: "Potins" },
]

function JarPage() {
    return (
        <>
            <p className="text-center text-3xl underline">Jars</p>
            <Jars jars={jarsData} />
            <div className="underline text-blue-500 cursor-pointer hover:text-purple-500 block">History</div>
        </>
    )
}

export default JarPage;