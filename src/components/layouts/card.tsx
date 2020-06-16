
import React from "react";
import {  Card,Rate } from 'antd';
import {EnvironmentOutlined,ClockCircleOutlined } from '@ant-design/icons';

interface LooseObject {
    [key: string]: any
}

// props interface
type CardProps = {
    data: LooseObject,
}

// location Icon
const prefix = (
    <EnvironmentOutlined
        style={{
        fontSize: 18,
        color: '#1890ff',
        margin: '0 5px'
        }}
    />
);

// Clock Icon
const clock = (
    <ClockCircleOutlined 
        style={{
        fontSize: 18,
        color: '#1890ff',
        margin: '0 5px'
        }}
    />
);

function CardComponent({ data }: CardProps){
    const header = (
        <div className="logo_img">
            <img
                alt="example"
                src={data.icon}
            />
            {data.name}
        </div>
      );
    return(
    <div style={{paddingBottom: "20px"}}>
        <Card title={header} style={{ cursor: 'pointer'}}>
            <div className="card">
                <div>
                    {prefix}
                    <p >{data.formatted_address?data.formatted_address:data.vicinity}</p>
                </div>
                <div>
                    {clock}  
                    <p>{data.business_status==="OPERATIONAL"?'Open':'Closed'}</p>
                </div>
                <div className="rating">
                    Ratings: <Rate disabled defaultValue={data.rating} /> ({data.user_ratings_total?data.user_ratings_total:0} reviews)
                </div>
            </div>
        </Card>
    </div>
    );
}

export default CardComponent;