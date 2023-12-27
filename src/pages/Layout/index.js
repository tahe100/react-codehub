import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate } from 'react-router-dom'



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

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">柴柴老师</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
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
            defaultSelectedKeys={['1']}
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