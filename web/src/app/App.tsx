import JarPage from "../features/Jar/JarPage.tsx";
import SideBar from "../shared/SideBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReviewsPage from "../features/reviews/ReviewsPage.tsx";
import {useAuth} from "../features/authentification/api/GetUser.tsx";


function App() {

    const {isLoggedIn, isLoading, login, logout, user } = useAuth();

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
                  {isLoggedIn ? (
                      <div>
                          <div className="mb-4">
                              <p>Bienvenue {user?.email}</p>
                              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
                                  Se déconnecter
                              </button>
                          </div>
                          <Routes>
                              <Route path="/jars" element={<JarPage />} />
                              <Route path="/reviews" element={<ReviewsPage />} />
                          </Routes>
                      </div>
                  ) : (
                      <div>
                          <p>Vous devez vous connecter</p>
                          <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">
                              Se connecter avec Google
                          </button>
                      </div>
                  )}
              </main>
          </BrowserRouter>
      </>
  )
}

export default App
