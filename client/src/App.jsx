
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
import NewPostPage from "./routes/newPostPage/NewPostPage"
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loader"
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
          element:<ListPage/>,
          loader:listPageLoader
        },
        {
          path:'/:id',
          element:<SinglePage/>,
          loader:singlePageLoader
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
          element:<Profile/>,
          loader: profilePageLoader
        },
        {
          path:'/profile/update',
          element:<ProfileUpdatePage />
        },
        {
          path:'/add',
          element:<NewPostPage/>
        }

      ]
    }
    
  ])
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App