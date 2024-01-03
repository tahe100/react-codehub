import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createArticleAPI} from '../../apis/articles'
import { useChannel } from '../../hooks/useChannel'

const { Option } = Select

const Publish = () => {


    const {channelList}= useChannel()

    //提交表单
    const onFinish = (formValue) => {
        //1.按照接口文档的格式处理收集到的表单数据
        if(imageList.length != imageType) return message.warning("封面类型和图片数量不匹配")
        const { title, content, channel_id } = formValue
        const reqData = {
            title: title,
            content: content,
            cover: {
                type: imageType,
                images: imageList.map(item => item.response.data.url) //图片列表

            },
            channel_id: channel_id
        }

        //2.调用接口提交

        createArticleAPI(reqData)
    }

    const[imageList, setImageList] = useState([])
    const onChange = (value) => {
        setImageList(value.fileList)
    }

    const [imageType, setImageType] = useState([])
    const onTypeChange = (e) =>{
        setImageType(e.target.value)
    }


    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Homepage</Link> },
                        { title: 'publish a article' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {/*1.必须要有key保持保持唯一性一般是ID。 2.value属性用户选中后会自动收集起来作为接口的提交字段*/}
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&  <Upload
                            listType="picture-card"
                            showUploadList
                            /*接口文档的参数key叫什么这个name就叫什么*/
                            name='image'
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onChange}
                            maxCount={imageType}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
                       
                    </Form.Item>




                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}>
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish