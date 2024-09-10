import React, { useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdCancelPresentation } from 'react-icons/md';
import { FaLessThan } from 'react-icons/fa';

function App() {
  const initialData = {
    holidayName: '',
    holidayDate: '',
    location: '',
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;

  const validateForm = () => {
    let newError = {};

    if (formData.holidayName === '') {
      newError.holidayName = 'Holiday Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.holidayName)) {
      newError.holidayName = 'Holiday Name must only contain alphabets and spaces';
    } else if (formData.holidayName.length < 2 || formData.holidayName.length > 30) {
      newError.holidayName = 'Holiday Name must be between 2 and 30 characters';
    }else if (!nameRegex.test(formData.holidayName)) {
      newError.holidayName = "Must start with a Character";
    }
    
    if (formData.holidayDate === '') {
      newError.holidayDate = 'Holiday Date is required';
    }
    
    if (formData.location === '') {
      newError.location = 'Location is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.location)) {
      newError.location = 'Location Name must only contain alphabets and spaces';
    } else if (formData.location.length < 1 || formData.location.length > 30) {
      newError.location = 'Location must be between 1 and 30 characters';
    }
    else if (!nameRegex.test(formData.location)) {
      newError.location = "Must start with a Character";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleOpenPopup = (index = null) => {
    if (index !== null) {
      setFormData({ ...tableData[index] });
      setEditIndex(index);
    } else {
      setFormData({ ...initialData });
      setEditIndex(null);
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditIndex(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (editIndex !== null) {
        const updatedTableData = tableData.map((row, index) =>
          index === editIndex ? formData : row
        );
        setTableData(updatedTableData);
      } else {
        setTableData([...tableData, formData]);
      }
      handleClosePopup();
    } else {
      console.log('Failed to submit');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };

  const handleAddRow = () => {
    handleOpenPopup();
  };

  const preventManualInput = (e) => {
    if (e.key !== 'Tab') {
      e.preventDefault();
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };
  const handleNameChar = (e) => {
    const key = e.key;
    const value = e.target.value;

    if ((value === "" && key === " ") || !/[a-zA-Z\s]/.test(key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="mr-10 ml-6">
        <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
                <FaLessThan className="text-orange-500 mr-2" />
                <button><link to=''></link><span className="text font-semibold text-orange-500">Previous Page</span></button>
        </div>
      </div>
      <div className="p-4 pt-5 mt-5 ml-10 mr-10 lg:ml-48 lg:mr-48">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left bg-orange-500 text-white rounded-md" colSpan="4">
                <div className="flex justify-between items-center">
                  <span>Holidays</span>
                  <button className="bg-green-600 text-white py-1 px-4 rounded" onClick={handleAddRow} type="button">
                    Add+
                  </button>
                </div>
              </th>
            </tr>
            <tr>
              <th className="py-2 px-4 text-left border-b-black border-2 border-solid roun border-black" colSpan="4">
                Holiday Details
              </th>
            </tr>
          </thead>
          <tbody className='border border-black border-collapse'>
            <tr>
              <th className="bg-gray-400 w-1/4 py-2 border-2 border-solid border-black">Name of The Holiday</th>
              <th className="bg-gray-400 w-1/4 py-2 border-2 border-solid border-black">Date</th>
              <th className="bg-gray-400 w-1/4 py-2 border-2 border-solid border-black">Location</th>
              <th className="bg-gray-400 w-1/4 py-2 border-2 border-solid border-black">Action</th>
            </tr>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="py-5 px-4 border-b border-gray-900 border-r text-center">{row.holidayName}</td>
                <td className="py-5 px-4 border-b border-gray-900 border-r text-center">{formatDate(row.holidayDate)}</td>
                <td className="py-5 px-4 border-b border-gray-900 border-r text-center">{row.location}</td>
                <td className="py-2 px-4 border-b border-gray-900 text-center">
                  <div className='flex flex-row justify-center'>
                    <TiPencil className="inline-block mr-4 cursor-pointer text-lg" onClick={() => handleOpenPopup(index)} />
                    <RiDeleteBin6Line
                      className="inline-block cursor-pointer text-lg"
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg max-w-[700px] w-full" onClick={(e) => e.stopPropagation()}>
              <div className='flex items-center justify-between mb-4 bg-orange-500 border border-gray-950 m-2 border-radius'>
                <h2 className="p-1 m-1">{editIndex !== null ? 'Edit Holiday Details' : 'Add New Holiday'}</h2>
                <MdCancelPresentation className='text-xl mr-2 cursor-pointer' onClick={handleClosePopup} />
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-3 gap-4 p-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 mb-1">Holiday Name:</label>
                    <input
                      type="text"
                      name="holidayName"
                      value={formData.holidayName}
                      onChange={handleChange}
                      onKeyDown={handleNameChar}
                      className="p-2 border border-gray-300 rounded"
                    />
                    {errors.holidayName && <p className="text-red-500">{errors.holidayName}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 mb-1">Holiday Date:</label>
                    <input
                      type="date"
                      name="holidayDate"
                      value={formData.holidayDate}
                      onChange={handleChange}
                      onKeyDown={preventManualInput}
                      className="p-2 border border-gray-300 rounded"
                    />
                    {errors.holidayDate && <p className="text-red-500">{errors.holidayDate}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 mb-1">Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      onKeyDown={handleNameChar}
                      className="p-2 border border-gray-300 rounded"
                    />
                    {errors.location && <p className="text-red-500">{errors.location}</p>}
                  </div>
                </div>
                <div className="flex justify-end">
                <button type="submit" className="hover:bg-gray-600 bg-gray-500 text-white py-2 px-4 rounded mr-2">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleClosePopup}
                    className="hover:bg-gray-600 bg-gray-500 text-white py-2 px-4 rounded "
                  >
                    Cancel
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
