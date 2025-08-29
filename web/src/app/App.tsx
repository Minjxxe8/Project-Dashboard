import JarPage from "../features/Jar/JarPage.tsx";
import SideBar from "../shared/SideBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReviewsPage from "../features/reviews/ReviewsPage.tsx";
import {useAuth} from "../features/authentification/api/GetUser.tsx";
import ProjectPage from "../features/projects/ProjectPage.tsx";
import NewProjectPage from "../features/projects/components/NewProjectPage.tsx";


function App() {

    const {isLoggedIn, isLoading} = useAuth();

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (isLoggedIn) {
        console.log("User logged in");
    }
    return(
      <>
          <BrowserRouter>
              <SideBar />
              <main className="relative h-screen ml-[200px] pt-10">
                  <Routes>
                      <Route path="/jars" element={<JarPage />} />
                      <Route path="/reviews" element={<ReviewsPage />} />
                      <Route path="/projects" element={<ProjectPage />} />
                        <Route path="/projects/new" element={<NewProjectPage />} />
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}

export default App
