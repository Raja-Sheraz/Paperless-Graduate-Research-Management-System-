import React from 'react'
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
export default function CorrdinateCommitte() {
    const { user } = useContext(UserContext);
    return (
      <div>
        <h1>Coordinate Committe Dashboard</h1>
        {!!user && (
          <h1>
            Welcome! {user.name}!<br></br> {user.email}
            {user.hashedPassword}
          </h1>
        )}
      </div>
    );
}
