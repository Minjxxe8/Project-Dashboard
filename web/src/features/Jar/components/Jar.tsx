//Il y aura tout les compossants indépendants les un des autres pour la scalabilité
// @ts-ignore
import "./../style.css";
import AddButton from "./Button.tsx";

type Jars = {
    name: string;
}

function Jars({jars = []}: { jars?: Jars[] }) {
    return (
        <div className="flex justify-around mt-20">
            {jars.map((jar, index) => (
                <div key={index} className="flex flex-col items-center gap-8">
                    <h3 className="text-2xl">{jar.name}</h3>
                    <img className="h-[400px]" src="../../../../jar.png"/>
                    <AddButton/>
                </div>
            ))}

        </div>
    )
}

export default Jars;