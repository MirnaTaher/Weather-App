import Linechart from "./Linechart"
import CircularBar from "./CircularBar";
const Dashboard = ({latitude, longitude, info}) => {

    return (<>
    
        <Linechart info={info} />
        <CircularBar info={info}/>
    </>)
};

export default Dashboard;
