

import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout"; // src/pages/Layout
import Login from "../pages/Login";
import { AuthRoute } from "../components/AuthRoute";
//由于 AuthRoute 是以命名导出的方式存在于 AuthRoute.js 文件中，所以你需要使用花括号 {} 来指明你想要导入的确切命名。
//如果一个模块使用了默认导出（default export），则你可以在导入时不使用花括号
import Home from '../pages/Home'
import Article from '../pages/Article'
import Publish from '../pages/Publish'

//配置路由

const router = createBrowserRouter([
    {
       
        path: "/",
        element:  <AuthRoute> <Layout /> </AuthRoute>, //Layout 是AuthRoute的子组件
        children: [//Layout 的children
            {
                //去掉path，设置index属性为true 实现默认二级路由配置
                index: true,
                element: <Home />
            },
            {
                path: 'article',
                element: <Article />
            },
            {
                path: 'publish',
                element: <Publish />
            }

        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router