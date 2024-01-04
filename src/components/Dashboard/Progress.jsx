import React, { useContext } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { PiStudentFill } from 'react-icons/pi'
import { MdOutlinePendingActions } from 'react-icons/md'
import { FaClipboardCheck } from 'react-icons/fa'
import { PiChalkboardTeacherFill } from 'react-icons/pi'
import { GrCheckboxSelected } from 'react-icons/gr'
import { UserContext } from '../../context/User'
import { SiGoogleclassroom } from 'react-icons/si'

export default function Progress() {
    const { user } = useContext(UserContext)

    const role = user?.role

    return (
        <div className="flex gap-4">
            <>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                        <SiGoogleclassroom className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Supervisor committee Acceptance</span>
                        <div className="flex items-center">
                            <span className="text-sm text-green-500">Accepted</span>
                        </div>
                    </div>
                </BoxWrapper>

                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-400">
                        <FaClipboardCheck className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">DAC Members Acceptance</span>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-300">Pending</span>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                        <PiChalkboardTeacherFill className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Dean Acceptance</span>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-300">Pending</span>
                        </div>
                    </div>
                </BoxWrapper>
            </>
        </div>
    )
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
