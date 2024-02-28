import './Dashboard.css'
import ContentWrap from './ContentWrap'
import MenuWrap from './MenuWrap'

function DashBoard(){
    return(
        <div className="dashboard">
            <MenuWrap/>
            <ContentWrap/>
        </div>
    )
}

export default DashBoard