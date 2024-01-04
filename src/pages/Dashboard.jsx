import React, { useContext } from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import { UserContext } from '../context/User'

import UserProfileDashboard from '../components/Profile/UserProfileDashBoard'
import Progress from '../components/Dashboard/Progress'

export default function Dashboard() {
    const { user } = useContext(UserContext)

    const role = user?.role
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 w-full">
                <UserProfileDashboard className=" flex-1" />
            </div>
            <DashboardStatsGrid />

            {role !== 'Supervisor' ? <Progress /> : null}
        </div>
    )
}
