import { Route, Routes } from 'react-router-dom'
import Login from './Auth/Login'
import Tracker from './Tracker/Tracker'
import ExpenseTable from './ExpenseTable/Expensetable'
import ExpenseChart from './TrackCharts/Charts'
function AppRoutes() {
  return (
    <div>
        <Routes>
            {/* <Route path='/' element={<Login/>}></Route> */}
            <Route path='/' element={<Tracker/>}></Route>
            <Route path='/table' element={<ExpenseTable/>}></Route>
            <Route path='/chart' element={<ExpenseChart/>}></Route>
        </Routes>
    </div>
  )
}

export default AppRoutes