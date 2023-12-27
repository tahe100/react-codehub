import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserInfo, clearUserInfo } from '../../store/modules/user'



const { Header, Sider } = Layout


const items = [
  {
    label: 'Homepage',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Articles',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Publish',
    key: '/publish',
    icon: <EditOutlined />,
  },
]



const GeekLayout = () => {

  const navigate = useNavigate()

  const onMenuClick = (e) =>{
    const path = e.key
    navigate(path)
  }

  //反向高亮
  //1.获取当前路由路径 useLocation()
  const location = useLocation()
  const selectedKey = location.pathname

  //触发个人用户信息的action
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  //获取redux里面的数据用来渲染用户名
  const name = useSelector(state => state.user.userInfo.name)

  //退出登录确认回调
  const onConfirm = () => {
    console.log("确认退出")
    dispatch(clearUserInfo())
    navigate('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="layout-sider-background" >
          <Menu
            mode="inline"
            theme="light"
            selectedKeys={selectedKey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/*二级路由的出口, 它在哪里二级路由的内容就会渲染在哪里*/}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout