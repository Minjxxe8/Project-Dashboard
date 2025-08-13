//L'affichage de la page global avec les jars
import Jars from "./components/Jar.tsx";
import JarTable from "./components/JarTable.tsx";

const jarsData = [
    { name: "Souvenirs" },
    { name: "Potins" },
]

function JarPage() {
    return (
        <>
            <p className="text-center text-3xl underline">Jars</p>
            <Jars jars={jarsData} />
            <JarTable />
        </>
    )
}

export default JarPage;