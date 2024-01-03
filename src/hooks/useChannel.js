//封装获取频道列表所有的逻辑
import { useState, useEffect } from "react"
import { getChannelAPI } from '../apis/articles'


function useChannel (){
    //1.获取频道列表所有数据
     //获取频道列表
     const [channelList, setChannelList] = useState([])

     /*1.useDispatch() 钩子提供了对 dispatch 函数的访问。通常在 React 组件中调用，用于触发一个动作来更新 Redux 存储。
     2.user 和token 是用redux管理的所以useEffect里要用dispatch ，而这里 channels 不是用redux管理的*/
 
     useEffect(
         () => {
             const getChannelList = async () => {
                 const res = await getChannelAPI()
                 setChannelList(res.data.channels)
             }
             getChannelList()
 
         }, [])
    //2把组件中要用到的数据return出去
    return {
        channelList
    }
}
export {useChannel}