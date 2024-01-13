import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

interface ContactData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

async function sleep(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function fetchData(): Promise<ContactData[]> {
  try {
    await sleep(200);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/contacts`);
    const data = await res.json() as ContactData[];
    return data.map((d, idx) => {
      return {
      ...d,
      id: idx
      };
    });
  }
  catch (err) {
    console.log(err)
    return [];
  }
}


function App() {
  const [contactData, setContactData] = useState<ContactData[]>([]);
  const [deletedRows, setDeletedRows] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("useEffect");
    fetchData()
      .then(data => setContactData(data))
      .finally(() => setLoading(false));
  }, []);

  const contactRows = useMemo(() =>
    contactData
    .filter((card) => deletedRows.find((deletedRowIdx) => deletedRowIdx === card.id) === undefined)
    .map((card) => {
      return (
      <tr key={card.id}>
        <td>{card.name}</td>
        <td>{card.email}</td>
        <td>{card.phoneNumber}</td>
        <td>{card.address}</td>
        <td><button className="deleteButton" data-test-handle={`delete-row-${card.id}`} onClick={() => setDeletedRows([...deletedRows, card.id])}>X</button></td>
      </tr>);
    }), [deletedRows, contactData]);

  const contactTable = (
    <table className="App-table" data-test-handle="contact-table">
        <thead>
          <tr className="tableHeader">
            <th>Name</th>
            <th>Email</th>
            <th>Phone #</th>
            <th>Address</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contactRows}
        </tbody>
      </table>
  );

  const emptyTable = (
    <div data-test-handle="empty-table">
      No Contacts Found
    </div>
  )

  const content = (
    <div className="App-contents">
      {(contactRows.length > 0) ? contactTable : emptyTable}
      <div className="tableFooter">
        <div>Count: <span data-test-handle="contact-count">{contactRows.length}</span></div>
        <button 
          className="deleteButton" 
          style={{height: "30px", fontSize: "14pt"}}
          data-test-handle="delete-all"
          onClick={() => setDeletedRows([...contactData.map(c => c.id)])}>Delete All</button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <div className="App-header">
        <a href="https://tonic.ai">
          <img className="App-logo" src={"https://assets-global.website-files.com/62e28cf08913e81176ba2c39/6405c8bbc0c9cfb7af1d4d3b_logo-header-optimized.webp"} alt="logo" />
        </a>
        <div className="App-title">Contact List</div>
      </div>
      <div className="App-body">
        {loading && <div>Loading...</div>}
        {!loading && content}
      </div>
    </div>
  );
}

export default App;
