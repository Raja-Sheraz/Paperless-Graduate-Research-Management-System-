import axios from 'axios'

const uploadPDF = async (pdfName) => {
    const formData = new FormData()
    formData.append('pdfFile', pdfName)

    try {
        const response = await axios.post('http://localhost:5000/api/pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
                // Add any other headers as needed
            }
        })

        if (response.status === 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false, error: response.data }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export { uploadPDF }
