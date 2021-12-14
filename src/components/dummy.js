import React, { useState } from 'react'
import { uuid } from 'uuidv4'
const initial = [
    { id: uuid(), charge: "rent", amount: 180 },
    { id: uuid(), charge: "car wash", amount: 180 },
    { id: uuid(), charge: "grocery bill", amount: 180 }


];
// console.log(initial)


function Dummy() {
    const result = useState(initial);
    const exp = result[0];
    const setExp = result[1];
    console.log(exp, setExp);
    return (
        <div>

        </div>
    )
}

export default Dummy
