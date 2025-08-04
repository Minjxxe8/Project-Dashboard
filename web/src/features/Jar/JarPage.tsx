//L'affichage de la page global avec les jars
import Jars from "./components/Jar.tsx";

const jarsData = [
    { name: "Souvenirs" },
    { name: "Potins" },
]

function JarPage() {
    return (
        <>
            <p className="text-center text-3xl underline">Jars</p>
            <Jars jars={jarsData} />
            <div>History</div> ///Rajouter un composant pour l'historique
        </>
    )
}

export default JarPage;