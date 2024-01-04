import { useState } from "react";
import React from "react";

const SendDocuments = () => {
  const [data, setData] = React.useState({
    name: "Muhammad Umar",
    dept: "Computer Science",
    supervisor: "Dr zia-Ur-Rehman",
    title: "PaperLess Graduate Research Managment System",
    pdf:"Download",
    Action: "Forward To Deen",
  });

  return (
    <>
      <div className="title2"> Send Documents</div>
      <div>
        <table className="tableData">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Department</th>
              <th>Supervisor</th>
              <th>Project Title</th>
              <th>PDF</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.name}</td>
              <td>{data.dept}</td>
              <td>{data.supervisor}</td>
              <td>{data.title}</td>
              <td>
                <button className="addstd">{data.pdf}</button>
              </td>
              <td>
                <button className="addstd">{data.Action}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SendDocuments;
