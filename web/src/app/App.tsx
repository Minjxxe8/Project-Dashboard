import JarPage from "../features/Jar/JarPage.tsx";
import SideBar from "../shared/SideBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReviewsPage from "../features/reviews/ReviewsPage.tsx";


function App() {
  return(
      <>
          <BrowserRouter>
              <SideBar />
              <main className="relative h-screen ml-[200px] pt-10">
                  <Routes>
                      <Route path="/jars" element={<JarPage />} />
                      <Route path="/reviews" element={<ReviewsPage />} />
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}

export default App
