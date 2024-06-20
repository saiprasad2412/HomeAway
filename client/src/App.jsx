
import HomePage from "./routes/Homepage/HomePage"
import {createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import ListPage from "./routes/listPage/listPage"
import  {Layout, RequireAuth } from "./routes/layout/Layout"
import SinglePage from "./routes/singlePage/SinglePage"
import Profile from "./routes/profile/Profile"
import Login from "./routes/login/Login"
import Register from "./routes/register/Register"
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage"
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
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:'/profile',
          element:<Profile/>
        },
        {
          path:'/profile/update',
          element:<ProfileUpdatePage />
        },

      ]
    }
    
  ])
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App