
import HomePage from "./routes/Homepage/HomePage"
import {createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import ListPage from "./routes/listPage/listPage"
import Layout from "./routes/layout/Layout"
import SinglePage from "./routes/singlePage/SinglePage"
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children: [
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:'/list',
          element:<ListPage/>
        },
        {
          path:'/:id',
          element:<SinglePage/>
        }
      ]
    }
    
  ])
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App