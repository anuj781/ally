import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [details, setdetails] = useState({
    name: '',
    mobile: '',
    purpose: '',
  });

  const [checkedServices, setCheckedServices] = useState({
    socialMedia: false,
    website: false,
    digitalMarketing: false,
    consultancy: false,
  });

  const allSelected = Object.values(checkedServices).every(Boolean);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setdetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedServices((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setCheckedServices({
      socialMedia: checked,
      website: checked,
      digitalMarketing: checked,
      consultancy: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedServices = Object.entries(checkedServices)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (!details.name || !details.mobile || !details.purpose) {
      alert("Please fill in all required fields.");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const finalData = {
      ...details,
      services: selectedServices,
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:9988/enquiry/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMsg('Enquiry submitted successfully!');
        // Optional: Reset form
        setdetails({ name: '', mobile: '', purpose: '' });
        setCheckedServices({
          socialMedia: false,
          website: false,
          digitalMarketing: false,
          consultancy: false,
        });
      } else {
        setResponseMsg(data.msg || 'Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      setResponseMsg('Server error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-amber-300 h-fit w-[600px] mt-5 flex flex-col p-5 justify-evenly gap-3'
      >
        <label>Name:
          <input value={details.name} onChange={handleChanges} name='name' type="text" className='bg-white rounded-md border-2 border-black w-full' />
        </label>

        <label>Mobile No:
          <input value={details.mobile} onChange={handleChanges} name='mobile' type='tel' className='bg-white rounded-md border-2 border-black w-full' />
        </label>

        <label>Purpose of Enquiry:
          <textarea value={details.purpose} onChange={handleChanges} name='purpose' className='bg-white rounded-md border-2 border-black w-full'></textarea>
        </label>

        <div>
          <input type="checkbox" className='mr-2' name="socialMedia" checked={checkedServices.socialMedia} onChange={handleChange} />
          <label>Social Media</label>
        </div>

        <div>
          <input type="checkbox" className='mr-2' name="website" checked={checkedServices.website} onChange={handleChange} />
          <label>Website</label>
        </div>

        <div>
          <input type="checkbox" className='mr-2' name="digitalMarketing" checked={checkedServices.digitalMarketing} onChange={handleChange} />
          <label>Digital Marketing</label>
        </div>

        <div>
          <input type="checkbox" className='mr-2' name="consultancy" checked={checkedServices.consultancy} onChange={handleChange} />
          <label>Consultancy</label>
        </div>

        <div>
          <input type="checkbox" className='mr-2' checked={allSelected} onChange={handleSelectAll} />
          <label>All Above</label>
        </div>

        <button
          type="submit"
          className='border-2 border-black mt-3 px-4 py-2 bg-white rounded-md cursor-pointer'
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {responseMsg && (
          <p className='mt-2 font-semibold text-center'>
            {responseMsg}
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
