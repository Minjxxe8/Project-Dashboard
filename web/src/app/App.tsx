import JarPage from "../features/Jar/JarPage.tsx";
import SideBar from "../shared/SideBar.tsx";


function App() {
  return(
      <>
        <SideBar />
          <main className="relative h-screen ml-[200px] pt-10">
              <JarPage />
          </main>
      </>
  )
}

export default App
