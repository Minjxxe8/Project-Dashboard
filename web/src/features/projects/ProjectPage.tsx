import ProjectCard from "./components/ProjectCard.tsx";
import {useNavigate} from "react-router-dom";

function ProjectPage() {
    const navigate = useNavigate();

    const handleNewProject = () => {
        navigate('/projects/new');
    }

  return (
      <div className="">
          <h1 className="text-center text-4xl">Quests</h1>
          <button onClick={handleNewProject} className="py-3 px-5 rounded-xl cursor-pointer border border-black hover:bg-black hover:text-white">+ New Project</button>
          <div className="flex flex-wrap justify-center">
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
          </div>
      </div>
  )
}

export default ProjectPage