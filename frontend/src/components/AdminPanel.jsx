import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('http://localhost:9988/enquiry/all');
      const data = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  if (loading) return <p>Loading enquiries...</p>;

  return (
    <div className="p-5">
      <div className='flex items-center w-[90vw] justify-between p-5'><h2 className="text-2xl font-bold mb-4">All Enquiries</h2>
      <button 
  onClick={async () => {
    const res = await fetch('http://localhost:9988/enquiry/send-email', {
      method: 'POST',
    });
    const data = await res.json();
    alert(data.msg);
  }}
  className="bg-green-500 text-white px-4 py-2 rounded mt-3 cursor-pointer"
>
  Send All to Gmail
</button></div>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Purpose</th>
            <th className="border px-4 py-2">Services</th>
            {/* <th className="border px-4 py-2">Date</th> */}
          </tr>
        </thead>
        <tbody>
          {enquiries.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.mobile}</td>
              <td className="border px-4 py-2">{item.purpose}</td>
              <td className="border px-4 py-2">
                {Array.isArray(item.services) ? item.services.join(', ') : ''}
              </td>
              {/* <td className="border px-4 py-2">
                {new Date(item.createdAt).toLocaleString()}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
