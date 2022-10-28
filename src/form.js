import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const validation = (key, value) => {
  switch (key) {
    case "uname":
      if (!value) {
        return ("enter username")
      }
      else {
        return ""
      }
    case "email":
      if (!value) {
        return ("enter email")
      }
      else {
        return ""
      }
    case "pswd":
      if (!value) {
        return ("enter password")
      }
      else {
        return ""
      }
    case "gender":
      if (!value) {
        return ("select the gender")
      }
      else {
        return ""
      }
    case "selected":
      if (!value) {
        return ("select city")
      }
      else {
        return ("")
      }
      break;
  }
};

export default function Form() {
  // const navigate = useNavigate();
  const [input, setInput] = useState({
    uname: "",
    email: "",
    pswd: "",
    gender: "",
    selected: "",
  });
  const [isEdit, setIsEdit] = useState(-1);
  // const [srchuname, setSrchuname] = useState("");
  // const [srchemail, setSrchemail] = useState("");
  // const [srchcity, setSrchcity] = useState("");

  const[search, setSearch]=useState({});
  const [add, setAdd] = useState({});
  const[isadd, setIsadd] =useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const deleteRecord = (index) => {
    data.splice(index, 1);
    setData([...data]);
  };
  const [iseditall, setIseditall] = useState(false);
  const [issaved, setIssaved] = useState(false);
  const [saveddata, setSaveddata] = useState(
    JSON.parse(localStorage.getItem("saveddata")) || []
  );
  const [isvalid, setIsvalid] = useState(false);

  const [error, setError] = useState({
    uname: "",
    pswd: "",
    email: "",
    selected: "",
    gender: "",
  });


  // console.log(data);
  const [duplicate, setDuplicate] = useState(JSON.parse(localStorage.getItem("data")));

  const options = [
    { value: "", text: "--Choose an option" },
    { value: "Rajkot", text: "Rajkot" },
    { value: "Surat", text: "Surat" },
    { value: "Ahmedabad", text: "Ahmedabad" },
    { value: "Baroda", text: "Baroda" },
  ];

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  const handleSubmit = () => {
    //  console.log("submitted");
    if (!input["uname"]) {
      setError({ ...error, uname: "enter username" });
      return;
    } else if (!input["email"]) {
      setError({ ...error, email: "enter the Email" });
      return;
    } else if (!input["pswd"]) {
      setError({ ...error, pswd: "enter the password" });
      return;
    } else if (!input["gender"]) {
      setError({ ...error, gender: "please select the gender" });
      return;
    } else if (!input["selected"]) {
      setError({ ...error, selected: "please select the city" });
      return;
    } else {
      setError({});
    }

    if (isEdit === -1) {
      const info = input;
      setData([...data, info]);
      setDuplicate([...data, info]);
      localStorage.setItem("data", JSON.stringify([...data, info]))
    }

    clearState();
  };

  const clearState = () => {
    setInput({
      uname: "",
      pswd: "",
      gender: "",
      selected: "",
      email: "",
    });
  };

  const handleOnchange = (e) => {
    const value = e.target.value;
    setInput({ ...input, [e.target.name]: value });
    //console.log(value)
  };

  // const onfilterChange = (e) => {
  //   const { name, value } = e.target
  //   setSearch({ ...search, [name]: value })
  // }

  // const handleSearch = () => {
  //   debugger
  //   if (srchuname === "" && srchemail === "" && srchcity === "") {
  //     setData(duplicate)
  //   }
  //   else {
  //     const filtereduname = data.filter((item) => item.uname === srchuname)
  //     if (srchemail === "" && srchcity === "") {
  //       setData(filtereduname)
  //     }
  //     else {
  //       const filteredemail = filtereduname.filter((item) => item.email === srchemail)
  //       if (srchcity === "") {
  //         setData(filteredemail)
  //       }
  //       else {
  //         const filteredcity = filteredemail.filter((item) => item.selected === srchcity)
  //         setData(filteredcity)
  //       }
  //     }


  //   }
  // }
  const searchChange =(e)=>{
    setSearch({...search, [e.target.name]:e.target.value})
  }
  const handleSearch =()=> {
    let list = duplicate;
    if (search.unamefilter) {
      list = list.filter((value) =>
        value.uname.toLowerCase().includes(search.unamefilter.toLowerCase())
      );
    }
    if (search.emailfilter) {
      list = list.filter((value) =>
        value.email.toLowerCase().includes(search.emailfilter.toLowerCase())
      );
    }
    if (search.cityfilter) {
      list = list.filter((value) =>
        value.selected.toLowerCase().includes(search.cityfilter.toLowerCase())
      );
    }
    setData(list);
  }

  const editalll = () => {
    setIseditall(true);
    // console.log(iseditall);
  };

  const inputChange = (e, index) => {
    const updt = data.map((item, idx) => {
      if (idx === index) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setSaveddata(updt);
    localStorage.setItem("saveddata", JSON.stringify(saveddata));
    setData(updt);
  };

  const saveall = () => {
    const updated2 = saveddata.map((item) => {
      const errors = {}
      Object.keys(item).forEach((key) => {
        const err = validation(key, item[key])
        if (err) {
          return errors[key] = err
        }
      })

      item.errors = errors;
      return item
    })
    setSaveddata(updated2);
    setData(saveddata)

    if (updated2.some(values => Object.keys(values.errors).length)) {
      return
    } else {
      localStorage.setItem("data", JSON.stringify(saveddata));
      setData(saveddata);
      setIseditall(false);
    }
  };

  // const sortdata = (sortKey) => {
  //   debugger
  //   console.log("...");
  //   const sortlist = duplicate;
  // sortlist.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  //   setData(sortlist);
  //   setData([...duplicate])
  // }


  const sortdata =(e) =>{
  
    const{name} = e.target;
    console.log(e.target.name)
    if(name === "uname")
   { console.log("...") ;const sortlist = data.sort((a, b) => a.uname.toLowerCase()< b.uname.toLowerCase()?-1:1);
    setData([...sortlist]);
  console.log(data)}
    else if(name ==="email"){ const sortlist = data.sort((a, b) => a.email.toLowerCase()< b.email.toLowerCase()?-1:1);
      setData([...sortlist]);}
      else if(name === "pswd"){
        const sortlist =data.sort((a, b) => a.pswd.toLowerCase() < b.pswd.toLowerCase()? -1:1);
        setData([...sortlist]);
      }
      else if(name === "gender"){
        const sortlist =data.sort((a,b)=> a.gender.toLowerCase() < b.gender.toLowerCase() ?-1:1);
        setData([...sortlist]);
      }
      else if(name === 'selected'){
        const sortlist =data.sort((a,b)=> a.selected.toLowerCase() < b.selected.toLowerCase() ?-1:1);
        setData([...sortlist]);
      }
  }
 const onRecordchange =(e)=>{
  const {name, value} =e.target;
setAdd({...add, [name]:value})
 }
 const addRecord =() =>{
 setAdd(true)

 }

  return (
    <div className="App">
      <h1>Form</h1>
      <div className="form">
        <div className="row">
          <label htmlFor="uname" className="label">
            Username
          </label>
          <input
            type="text"
            id="uname"
            className="input"
            value={input.uname}
            onChange={handleOnchange}
            name="uname"
          ></input>
        </div>
        {error.uname}

        <div className="row">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={handleOnchange}
            className="input"
          ></input>
        </div>
        {error.email}

        <div className="row">
          <label htmlFor="pswd" className="label">
            Password
          </label>
          <input
            type="password"
            id="pawd"
            className="input"
            name="pswd"
            value={input.pswd}
            onChange={handleOnchange}
          ></input>
        </div>
        {error.pswd}

        <div className="row">
          <label htmlFor="gender" className="label">
            Gender:
          </label>
          <input
            type="radio"
            value={"Male"}
            className="input"
            name="gender"
            id="Male"
            checked={input.gender === "Male"}
            onChange={handleOnchange}
          ></input>
          Male
          <input
            type="radio"
            value={"Female"}
            className="input"
            name="gender"
            id="Female"
            checked={input.gender === "Female"}
            onChange={handleOnchange}
          ></input>
          Female
        </div>
        {error.gender}
        <div className="row">
          <label htmlFor="city">City</label>
          <select
            value={input.selected}
            name="selected"
            onChange={handleOnchange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        {error.selected}

        <div className="row">
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div className="row">
        <h1>Table data</h1>

        <button className="editall" onClick={editalll}>
          EditAll
        </button>
        <button className="save" onClick={saveall}>
          Save
        </button>
        <input type="text" name="unamefilter" onChange={searchChange} ></input>
        <input type="text" name="emailfilter" onChange={searchChange} ></input>
        <input type="text" name="cityfilter" onChange= {searchChange} ></input>
        <button onClick={handleSearch}>Filter</button>
        <input type ="text" name="add" onChange={ onRecordchange}></input>
        <button onClick={addRecord}>Add_Reccord</button>
        



        {iseditall ? (

          <table>
            <thead>
              <tr>
              <td>Username</td>
                <td>Email</td>
                <td>password</td>
                <td>gender</td>
                <td>City</td>
                <th>Action</th>
                {/* <td>Action</td> */}
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="uname"
                      onChange={(e) => inputChange(e, index)}
                      value={item.uname}
                    />
                    <p style={{ color: "red" }}>{item.errors?.uname || ''}</p>
                  </td>

                  <td>
                    <input
                      name="email"
                      type="text"
                      onChange={(e) => inputChange(e, index)}
                      value={item.email}
                    />
                    <p style={{ color: "red" }}>{item.errors?.email || ''}</p>
                  </td>

                  <td>
                    <input
                      name="pswd"
                      type="text"
                      onChange={(e) => inputChange(e, index)}
                      value={item.pswd}
                    />
                    <p style={{ color: "red" }}>{item.errors?.pswd || ''}</p>
                  </td>

                  <td>
                    <input
                      name="gender"
                      type="text"
                      onChange={(e) => inputChange(e, index)}
                      value={item.gender}
                    />
                    <p style={{ color: "red" }}>{item.errors?.gender || ''}</p>
                  </td>
                  <td>
                    <input
                      name="selected"
                      type="text"
                      onChange={(e) => inputChange(e, index)}
                      value={item.selected}
                    />
                    <p style={{ color: "red" }}>{item.errors?.selected || ''}</p>
                  </td>

                  <td>
                    <button className="delete" onClick={deleteRecord}>
                      delete
                    </button>
                  </td>
                  {/* <td>
                  <button className="edit" onClick={() => editRecord(index)}>
                    Edit
                  </button>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : ( isadd? ( <table>
          <thead>
            <tr>
            <th><button name="uname" onClick={sortdata}>Username</button></th>
              <th><button  name="email"onClick ={(e) => sortdata(e)}>Email</button></th>
              <th><button name="pswd" onClick ={(e) => sortdata(e)}>password</button></th>
              <th><button name="gender" onClick ={(e) => sortdata(e)}>gender</button></th>
              <th><button name= "selected" onClick={(e) => sortdata(e)}>City</button></th>
            
              <th>Action</th>
              {/* <td>Action</td> */}
            </tr>
            <tr>
              <td>
                <input type="text" name='uname' onChange={addRecord}/>
              </td>
              <td>
              <input type="text" name='email' onChange={addRecord}/>
              </td>
              <td> <input type="text" name='pswd' onChange={addRecord}/></td>
              <td>
              <input type="text" name='gender' onChange={addRecord}/>
              </td>
            </tr>
          </thead>

          <tbody>
            {[...data].map((item, index) => (
              <tr key={index}>
                <td>{item.uname}</td>

                <td>{item.email}</td>
                <td>{item.pswd}</td>
                <td>{item.gender}</td>
                <td>{item.selected}</td>
                <td>
                  <button className="delete" onClick={deleteRecord}>
                    delete
                  </button>
                </td>
                {/* <td>
                <button className="edit" onClick={() => editRecord(index)}>
                  Edit
                </button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>)
        :(  <table>
            <thead>
              <tr>
              <th><button name="uname" onClick={sortdata}>Username</button></th>
                <th><button  name="email"onClick ={(e) => sortdata(e)}>Email</button></th>
                <th><button name="pswd" onClick ={(e) => sortdata(e)}>password</button></th>
                <th><button name="gender" onClick ={(e) => sortdata(e)}>gender</button></th>
                <th><button name= "selected" onClick={(e) => sortdata(e)}>City</button></th>
              
                <th>Action</th>
                {/* <td>Action</td> */}
              </tr>
            </thead>

            <tbody>
              {[...data].map((item, index) => (
                <tr key={index}>
                  <td>{item.uname}</td>

                  <td>{item.email}</td>
                  <td>{item.pswd}</td>
                  <td>{item.gender}</td>
                  <td>{item.selected}</td>
                  <td>
                    <button className="delete" onClick={deleteRecord}>
                      delete
                    </button>
                  </td>
                  {/* <td>
                  <button className="edit" onClick={() => editRecord(index)}>
                    Edit
                  </button>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>)
        )}
      </div>
    </div>
  );
}
