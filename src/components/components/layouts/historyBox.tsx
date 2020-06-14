import React,{useEffect,useState} from "react";
import { List,Spin } from 'antd';
import {DoubleLeftOutlined,ClockCircleOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux"

interface LooseObject {
  [key: string]: any
}

//Arrow down icon

  const clock = (
    <ClockCircleOutlined 
        style={{
        fontSize: 14,
        color: '#1890ff',
        margin: '0 5px'
        }}
    />
);
type Props = {
    ListItemClick: Function
}


function HistoryBox({ ListItemClick }: Props){
  const [loading,setLoading]=useState<boolean>(false);
    const arrowDown = (
        <DoubleLeftOutlined
          style={{
            fontSize: 14,
            color: '#1890ff',
            margin: "0 5px",
            transform: 'rotate(-90deg)',
            transition: '500ms',
          }}
          className="animate_rotate"
        />
      );
    const toggleclass=()=>{
        var el:any = document.querySelector('.history ul');
        var el2:any = document.querySelector('.animate_rotate');
        var el3:any = document.querySelector('.history');
        el.classList.toggle('hide');
        el2.classList.toggle('rotate');
        el3.classList.toggle('round');
    }
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {  setLoading(false); },1000);
    }, []);
    const data=useSelector((state:LooseObject)=>{return(state.history.data)})

    return(
        <div className="history">
          <Spin tip="Fetching..." spinning={loading}>
            <List
                  size="small"
                  header={<div onClick={toggleclass}>{clock}Previous searches {arrowDown}</div>}
                  dataSource={data}
                  renderItem={(item:LooseObject) => <List.Item  onClick={()=>{ListItemClick(item)}}>place: {item.query} radius: {item.radius}</List.Item>}
              />
          </Spin>
    </div>
  );
}
export default HistoryBox