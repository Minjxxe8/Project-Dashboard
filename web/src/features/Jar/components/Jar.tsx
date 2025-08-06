//Il y aura tout les compossants indépendants les un des autres pour la scalabilité
// @ts-ignore
import "../style.css";
import AddButton from "./Button.tsx";
import JarPopup from "./JarPopup.tsx";
import {useState} from "react";

type Jars = {
    name: string;
}

function Jars({jars = []}: { jars?: Jars[] }) {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedJarName, setSelectedJarName] = useState<string | null>(null);

    const handleButtonClick = (jarName: string) => {
        console.log("clicked");
        setSelectedJarName(jarName)
        setShowPopup(true);
    };


    return (
        <div className="flex justify-around mt-20">
            {jars.map((jar, index) => (
                <div key={index} className="flex flex-col items-center gap-8">
                    <h3 className="text-2xl">{jar.name}</h3>
                    <img className="h-[400px]" src="../../../../jar.png"/>
                    <AddButton onClick={() => handleButtonClick(jar.name)} />
                </div>
            ))}

            {showPopup && <JarPopup onClose={() => setShowPopup(false)} jarName={selectedJarName} />}


        </div>
    )
}

export default Jars;