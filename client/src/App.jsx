
import HomePage from "./routes/Homepage/HomePage"
import {createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import ListPage from "./routes/listPage/listPage"
import Layout from "./routes/layout/Layout"
import SinglePage from "./routes/singlePage/SinglePage"
import Profile from "./routes/profile/Profile"
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
        },
        {
          path:'/profile',
          element:<Profile/>
        }
      ]
    }
    
  ])
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App