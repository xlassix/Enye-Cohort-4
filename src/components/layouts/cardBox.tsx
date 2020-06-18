import React from "react";
import { BankOutlined } from '@ant-design/icons';
import CardComponent from "./card"


//hospital icon
const hospital = (
  <BankOutlined
    style={{
      fontSize: 18,
      color: '#1890ff',
      margin: '0 5px'
    }}
  />
);

//inference defination
type Props = {
  data: LooseObject,
  CardClick: Function
}
interface LooseObject {
  [key: string]: any
}

function CardBox({ data, CardClick }: Props) {
  const items = [<h3> {hospital} {data.length} Health facilities found</h3>]
  for (const value in Object.keys(data)) {
    items.push(
      <div onClick={() => CardClick(data[value].id)} key={data[value].id}  >
        <CardComponent data={data[value]} />
      </div>
    )
  }
  return (
    <div >
      {items}
    </div>
  );
}
export default CardBox