//柱状图组件
import * as echarts from 'echarts';
import { useRef,useEffect } from 'react';

//封装的基础逻辑
//1. 把功能代码都放到这个组件中
//2. 把可变的部分抽象成prop参数

const BarChart = ({title}) => {

    const chartRef = useRef(null)

    useEffect(() => {
        //保证dom可用 才进行图表的渲染
        //获取要渲染图表的dom节点
        //图表初始化生成一个图标实例对象
        var myChart = echarts.init(chartRef.current);

        //准备图表参数
        var option;

        option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['vue','react','Angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150],
                    type: 'bar'
                }
            ]
        };


        //使用图表参数完成图表渲染
        option && myChart.setOption(option);

    }, [])
    //图表必须要有长宽才能显示出来
    return <div ref={chartRef} style={{width:'400px',height:'300px'}}></div>

}
export default BarChart