import {React,useState} from 'react';
import {Modal} from 'antd';
import "./css/index.css";
import {crossIcon,deleteIcon} from "../../assets";
export default function creatorEarningModal({ isOpen, onRequestClose }) {

    const [tableData, setTableData] = useState([]);

    const addNewLine = () => {
        const newLine = { id: tableData.length + 1, wallet: 'New Person', percentage: 0 };
        setTableData([...tableData, newLine]);
        console.log(tableData)
      };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Example Modal"
    className="Modal"
    overlayClassName="Overlay"
  >
    <div className="p-8">
    <div className=" flex justify-between mx-0 bg-black w-full">
<p className=" text-white text-[20px] font-bold">Creator Earnings</p>
<img className=" w-6 h-6" src={crossIcon} alt="" onClick={onRequestClose}/>
</div>

<div>


<div class="relative w-full mt-2">
    <table class="w-full text-sm border-b text-left">
        <thead class="text-xs text-white border-b w-full  bg-black">
            <tr>
                <th scope="col" class="px-6 py-3 text-white font-semibold text-base">
                    S.no
                </th>
                <th scope="col" class="px-3 py-3 text-white font-semibold text-base">
                    Wallet address
                </th>
                <th scope="col" class="px-0 py-3 text-white font-semibold text-base">
                    Percentage
                </th>
                <th scope="col" class="px-0 py-3 text-white font-semibold text-base">
                    Action
                </th>
                <div className='w-full h-1 bg-white'></div>
            </tr>
        </thead>
        <tbody>
{
    tableData.map((row)=>(
        <tr  key={row.id} class="bg-black border-b">
                <th scope="row" class="px-6 py-2 font-light text-[#CCCCCC] whitespace-nowrap dark:text-white">
                 {row.id}
                </th>
                <td class="px-0 py-4">
                    <input className='border bg-black border-[#cccccc] font-light rounded-lg w-[366px] h-[48px] p-4' type="text" placeholder='0xF2F107A8470ccC495E1acD4d4c93aF3A523e3C85'/>
                </td>
                <td class="px-0 py-4">
                <input className='border bg-black border-[#cccccc] font-light text-[18px] rounded-lg w-[143px] text-center h-[48px] p-4' type="text" placeholder='25%'/>
                </td>
                <td class="px-6 py-2">
                    <img src={deleteIcon} alt='' className='w-4'/>
                </td>
            </tr>
    )
       
    )
}

        </tbody>
    </table>
</div>

<div className=' flex justify-between mt-8'>
<p className=' text-[#DF4747] font-normal text-base rounded-lg px-2 py-0.5 whitespace-nowrap border border-[#DF4747] cursor-pointer'onClick={addNewLine}>Add adddress</p>
<p className=' text-white font-normal text-base rounded-lg px-2 py-0.5 bg-[#DF4747] cursor-pointer' onClick={onRequestClose}>Done</p>
</div>

</div>

    </div>
  </Modal>
  )
}