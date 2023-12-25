import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '../../assets/logo.png'

const Login = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
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
                                pattern: /^\d{10}$/,
                                message: 'Please enter a 10-digit number!',
                            }
                        ]}>
                        <Input size="large" placeholder="Please input your phone number" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the verification code!',
                            },
                        ]}>
                        <Input size="large" placeholder="Please enter the verification code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
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