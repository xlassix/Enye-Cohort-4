import React, { useEffect } from "react";
import { List, Spin,message } from 'antd';
import { DoubleLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { updateUserHistories } from "../../store/user/actions"

const GET_HISTORIES = gql`
query Histories($user :  String){
  getHistories(userId:$user){
    radius
    query
  }
}
`;
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
  loaded: Boolean
}

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


function HistoryBox({ ListItemClick, loaded }: Props) {

  //const [loading,setLoading]=useState<boolean>(false);
  const { userId } = useSelector((state: LooseObject) => { return (state.user) })
  const { loading, error, data, refetch } = useQuery(GET_HISTORIES, {
    variables: { user: userId },
  })

  //handle simple animation with css
  const toggleclass = () => {
    var el: any = document.querySelector('.history ul');
    var el2: any = document.querySelector('.animate_rotate');
    var el3: any = document.querySelector('.history');
    el.classList.toggle('hide');
    el2.classList.toggle('rotate');
    el3.classList.toggle('round');
  }

  //useEffect to reflect history on submit
  useEffect(() => {
    refetch()
    if (!loading){
      updateUserHistories({userId:userId,histories:data.getHistories.reverse()})
    }
  }, [loaded]);

  if (error){
    message.error(error,5)
  }

  return (
    <div className="history">
      <Spin tip="Fetching..." spinning={loading}>
        {loading ?
          <List
            size="small"
            header={<div onClick={toggleclass}>{clock}Previous searches {arrowDown}</div>}
            dataSource={[]}
            renderItem={(item: LooseObject) => <List.Item onClick={() => { ListItemClick(item) }}>place: {item.query} radius: {item.radius}</List.Item>}
          />
          :
          <List
            size="small"
            header={<div onClick={toggleclass}>{clock}Previous searches {arrowDown}</div>}
            dataSource={data.getHistories.reverse()}
            renderItem={(item: LooseObject) => <List.Item onClick={() => { ListItemClick(item) }}>place: {item.query} radius: {item.radius}</List.Item>}
          />}
      </Spin>
    </div>
  );
}
export default HistoryBox