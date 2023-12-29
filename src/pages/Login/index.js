import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../store/modules/user'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log('Success:', values);

        //触发异步action fetchLogin
        await dispatch(fetchLogin(values))

        // 1. 跳转到首页
        navigate('/')

        // 2. 提示下用户
        message.success("Login successful")
    };

    return (
        <div className="login">
            <Card className="login-container">
                < img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a valid phone number!',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: 'Please enter a valid chinese phone number!',
                            }
                        ]}>
                        <Input size="large" placeholder="Please input your phone number" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the 6- digit verification code!(hier must be 246810)',
                            },
                            {
                                pattern: /^[0-9]{6}$/,
                                message: 'Please input the 6-digit verification code! (It must be 246810)'
                            }
                            
                        ]}>
                        <Input size="large" placeholder="Please enter the verification code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" htmlType="submit" size="large" block>
                            LOGIN
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

//export default Login 是为了将 Layout 这个组件导出，以便在其他文件中使用它。
export default Login