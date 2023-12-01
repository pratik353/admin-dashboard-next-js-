// server actions in next js
import React from 'react'

const Test = () => {
  // you can direct access inputs fieldData in form data variable
    const handleForm = async(formData) => {
      "use server";
      const username = formData.get("username");
    }
  return (
    <div>
        <form action={handleForm}>
            <input type="text" name="username"/>
            <button >Send</button>
        </form>
    </div>
  )
}

export default Test