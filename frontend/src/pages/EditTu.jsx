import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTu } from '../context/TuContext'
import Form from '../components/Form'

const EditTu = () => {
  const { id } = useParams()
  const { tataUsaha, editTu, formData, setFormData } = useTu()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const dataTu = tataUsaha.find((s) => s.id === parseInt(id))

  useEffect(() => {
    if (dataTu) {
      setFormData({
        name: dataTu.name,
        address: dataTu.address,
        city: dataTu.city,
        country: dataTu.country,
      })
    }
  }, [dataTu])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate("/dashboard/admin/daftar-tu")
    setIsLoading(true)
    try {
      await editTu(id)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form
        title={"Edit Tata Usaha"}
        onSubmit={handleSubmit}
        button={isLoading ? "Memproses..." : "Update"}
      >
        <h1 className='mt-3 font-bold'>
          {dataTu ? dataTu.name : "Tata usaha tidak ditemukan"}
        </h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Nama TU</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 mb-2">Alamat</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 mb-2">Kota</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700 mb-2">Negara</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
        </div>
      </Form>
    </>
  )
}

export default EditTu
