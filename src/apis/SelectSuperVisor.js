import axios from 'axios'

const selectTeacherForStudent = async (studentId, teacherId) => {
    console.log(studentId, teacherId)
    try {
        const response = await axios.post(
            `http://localhost:5000/students/select-teacher/${studentId}/${teacherId}`,
            {},

            {
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers as needed
                }
            }
        )

        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false, error: response.data }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export { selectTeacherForStudent }
