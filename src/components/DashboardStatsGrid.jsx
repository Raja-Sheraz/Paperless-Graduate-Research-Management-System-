import React, { useContext, useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { PiStudentFill } from 'react-icons/pi'
import { MdOutlinePendingActions } from 'react-icons/md'
import { FaClipboardCheck } from 'react-icons/fa'
import { PiChalkboardTeacherFill } from 'react-icons/pi'
import { GrCheckboxSelected } from 'react-icons/gr'
import { UserContext } from '../context/User'
import axios from 'axios'

export default function DashboardStatsGrid() {
    const { user } = useContext(UserContext)
    const [pdf, setPdf] = useState(null)
    const [superVisor, setSuperVisor] = useState(null)

    const role = user?.role
    console.log('hello', superVisor?.name)

    useEffect(() => {
        // Check if the user has a PDF file and set it

        const fetchPdfContent = async (pdf) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/pdf/${pdf}`)

                setPdf(response.data)
            } catch (error) {
                console.error('Error fetching PDF:', error)
            }
        }

        const getSupervisor = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/getUser1/${id}`)

                setSuperVisor(response.data)
            } catch (error) {
                console.error('Error fetching PDF:', error)
            }
        }

        if (user?.pdf) {
            fetchPdfContent(user.pdf)
        }
        if (user?.supervisor) {
            getSupervisor(user.supervisor)
        }
    }, [user])

    return (
        <>
            <div className="flex gap-4">
                {role === 'Supervisor' ? (
                    <>
                        <BoxWrapper>
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                                <PiStudentFill className="text-2xl text-white" />
                            </div>
                            <div className="pl-4">
                                <span className="text-sm text-gray-500 font-light">Total Students</span>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-400">10</span>
                                </div>
                            </div>
                        </BoxWrapper>

                        <BoxWrapper>
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                                <MdOutlinePendingActions className="text-2xl text-white" />
                            </div>
                            <div className="pl-4">
                                <span className="text-sm text-gray-500 font-light">Remaining Request</span>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-400">3</span>
                                </div>
                            </div>
                        </BoxWrapper>
                        <BoxWrapper>
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                                <MdOutlinePendingActions className="text-2xl text-white" />
                            </div>
                            <div className="pl-4">
                                <span className="text-sm text-gray-500 font-light">Remaining Request</span>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-400">3</span>
                                </div>
                            </div>
                        </BoxWrapper>

                        <BoxWrapper>
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                                <IoPeople className="text-2xl text-white" />
                            </div>
                            <div className="pl-4">
                                <span className="text-sm text-gray-500 font-light">Total Request Handled</span>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-400">7</span>
                                </div>
                            </div>
                        </BoxWrapper>
                    </>
                ) : (
                    <>
                        <BoxWrapper>
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                                <FaClipboardCheck className="text-2xl text-white" />
                            </div>
                            <div className="pl-4">
                                <span className="text-sm text-gray-500 font-light">Proposal Status</span>
                                <div className="flex items-center">
                                    {user?.pdf ? (
                                        <span className="text-sm text-green-500">Submitted</span>
                                    ) : (
                                        <span className="text-sm text-red-500">-</span>
                                    )}
                                </div>
                            </div>
                        </BoxWrapper>

                        <BoxWrapper>
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                                <GrCheckboxSelected className="text-2xl text-white" />
                            </div>
                            <div className="pl-4">
                                <span className="text-sm text-gray-500 font-light">Supervisor Selected</span>
                                <div className="flex items-center">
                                    {user?.supervisor ? (
                                        <span className="text-sm text-green-500">YES</span>
                                    ) : (
                                        <span className="text-sm text-red-500">NO</span>
                                    )}
                                </div>
                            </div>
                        </BoxWrapper>

                        <BoxWrapper>
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                                <PiChalkboardTeacherFill className="text-2xl text-white" />
                            </div>
                            <div className="pl-4">
                                <span className="text-sm text-gray-500 font-light">Supervisor Name</span>
                                <div className="flex items-center">
                                    {user?.supervisor ? (
                                        <span className="text-sm text-green-500">{superVisor?.name}</span>
                                    ) : (
                                        <span className="text-sm text-gray-300">-</span>
                                    )}
                                </div>
                            </div>
                        </BoxWrapper>
                    </>
                )}
            </div>
            {pdf?.feedback ? (
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                        <GrCheckboxSelected className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray font-light">Submission Feedback</span>
                        <div className="flex items-center">
                            {pdf.feedback ? (
                                <span className="text-sm gray">{pdf.feedback.text}</span>
                            ) : (
                                <span className="text-sm text-red-500">-</span>
                            )}
                        </div>
                    </div>
                </BoxWrapper>
            ) : null}
        </>
    )
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
