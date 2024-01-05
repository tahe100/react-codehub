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
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createArticleAPI, getArticleByID, updateArticleAPI} from '../../apis/articles'
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
                images: imageList.map(item => {
                    if(item.response){
                        //回填的图片
                        return item.response.data.url
                    }else{
                        //非回填的图片
                        return item.url
                    }
                }) //图片列表

            },
            channel_id: channel_id
        }

        //2.调用接口提交
        //处理不同的接口 新增 新增接口 ，编辑状态 更新窗口 id
        if(articleId){
            //更新窗口
            updateArticleAPI({...reqData, id: articleId})
        }else{
            createArticleAPI(reqData)

        }
    }

    const[imageList, setImageList] = useState([])
    const onChange = (value) => {
        setImageList(value.fileList)
    }

    const [imageType, setImageType] = useState([])
    const onTypeChange = (e) =>{
        setImageType(e.target.value)
    }

    //回填数据
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    //console.log(articleId)
    //获取实例
    //注意下面的form要用form={form}来绑定
    const[form] = Form.useForm()

    useEffect(() =>{
        //1.通过ID获取数据
        async function getArticleDetail(){
            const res = await getArticleByID(articleId)
            //2.调用实例方法 完成回填
            //调用Form组件实例方法setFieldsValue回显数据
            form.setFieldsValue({
                ...res.data,
                //为什么仅仅只有上面那行不能回填封面?
                //数据结构的问题 set方法 -> {type :3} {cover:{type: 3}}
                type: res.data.cover.type
            })
            //回填图片列表
            setImageType(res.data.cover.type)
            //显示图片({url:url})
            setImageList(res.data.cover.images.map(url =>{
                return {url}
            }))

            
        }
        //只有有ID的时候才能调用此函数
        if(articleId){
            getArticleDetail()
        }
        


    },[articleId, form])


    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Homepage</Link> },
                        { title: `${articleId? 'Edit':'Publish'} Article` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                    form={form}
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
                            fileList={imageList}
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