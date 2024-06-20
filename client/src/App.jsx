
import HomePage from "./routes/Homepage/HomePage"
import {createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import ListPage from "./routes/listPage/listPage"
import Layout from "./routes/layout/Layout"
import SinglePage from "./routes/singlePage/SinglePage"
import Profile from "./routes/profile/Profile"
import Login from "./routes/login/Login"
import Register from "./routes/register/Register"
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
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    }
    
  ])
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App