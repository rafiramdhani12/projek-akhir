import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Tabel from "../components/Tabel"
import { useTu } from "../context/TuContext"

const DaftarTu = () => {

    const {tataUsaha , hapusTu} = useTu()

    const navigate = useNavigate()

    const handleBack = () => {
        navigate("/dashboard/admin")
    }

    const handleAdd = () => {
        navigate("/dashboard/admin/tambah-tu")
    }

    const handleEdit = (id) =>{
        navigate(`/dashboard/admin/edit-tata-usaha/${id}`)
    }

  return (
   <>
    <Button onClick={handleBack} className={"btn btn-error text-white"} content={"back"} />
   <div>
    <div>
        <Button className={"primary"} content={"tambah tu"} onClick={handleAdd} />
    </div>
  <Tabel
    headers={["No", "Name", "address", "city", "country","password","Aksi"]}
    data={tataUsaha}	
    searchKeys={["name", "address", "city" , "country" , "password"]}
    renderRow={(currentData) =>
        currentData.map((item, index) => (
            <tr key={item.id}>
                {console.log(item)}
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.country}</td>
                <td>{item.password}</td>
                <td>
                    <div className="flex gap-3">
                    <Button content={"update"} className={"primary"} onClick={() => handleEdit(item.id)}/>
                    <Button content={"delete"} className={"error"} onClick={() => hapusTu(item.id)} />
                    </div>
                </td>
            </tr>
        ))
    }
/>
   </div>
   </>
  )
}

export default DaftarTu