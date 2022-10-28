import React, { Component } from "react";

const options = [
  { value: "", text: "--Choose an option" },
  { value: "Rajkot", text: "Rajkot" },
  { value: "Surat", text: "Surat" },
  { value: "Ahmedabad", text: "Ahmedabad" },
  { value: "Baroda", text: "Baroda" },
];

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        uname: "",
        email: "",
        pswd: "",
        gender: "",
        selected: "",
        file: "",
        imagePreviewUrl:
          "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
      },

      item: [],
      isEdit: -1,
      isEdit1:false,
      data: JSON.parse(localStorage.getItem("data")) || [],
      duplicate: JSON.parse(localStorage.getItem("data")) || [],
      error: {
        uname: "",
        pswd: "",
        email: "",
        selected: "",
        gender: "",
      },
    };
  }

  handleOnchange = (e) => {
    this.setState({
      input: {
        ...this.state.input,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleImagechange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        input: {
          ...this.state.input,
          file: file,

          imagePreviewUrl: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = (e) => {
    var input = this.state.input;
    var error = this.state.error;

    if (!input.uname) {
      this.setState({
        error: { ...error, uname: "please enter your username" },
      });
      return;
    } else if (!input.email) {
      this.setState({
        error: { ...error, email: "please enter your email Id" },
      });
      return;
    } else if (!input.pswd) {
      this.setState({
        error: { ...error, pswd: "please enter your password" },
      });
      return;
    } else if (!input.gender) {
      this.setState({
        error: { ...error, gender: "please select gender" },
      });
      return;
    } else if (!input.selected) {
      this.setState({
        error: { ...error, selected: "please select your city" },
      });
      return;
    } else {
      this.setState(
        { error: {} }
        // this.setState({input:{}})
      );
    }

    if (this.state.isEdit === -1) {
      const info = input;
      this.setState({ data: [...this.state.data, info] });
      console.log(this.state.data);
      this.setState({ duplicate: [...this.state.data, info] });
      this.clearstate();
    } else {
      console.log("...");
      const updatedData = this.state.data.map((value, index) => {
        if (index === this.state.isEdit) {
          return input;
        }
        return value;
      });
      this.setState({ data: updatedData });
      console.log(updatedData);
      this.setState({ isEdit: -1 });
    }
    this.clearstate();
  };

  clearstate = () => {
    console.log("cleared");
    this.setState({
      input: {
        ...this.state.input,
        uname: "",
        email: "",
        pswd: "",
        gender: "",
        selected: "",
        file: "",
      },
    });
  };

  deleteRecord = (index) => {
    this.state.data.splice(index, 1);
    this.setState({ data: [...this.state.data] });
  };

  editRecord = (id) => {debugger
    const newData = this.state.data.find((value, index) => {
      return index === id;
    });
    this.setState({
      isEdit: id,
      input: {
        ...this.state.data,
        uname: newData.uname,
        email: newData.email,
        pswd: newData.pswd,
        gender: newData.gender,
        selected: newData.selected,
      },
    });
    console.log(newData);
  };



  handleSearch = (e) => {
    console.log("search");
    const value = e.target.value;
    if (!value) {
      this.setState({ data: this.state.duplicate });
      return;
    }
    const update = this.state.data.filter((item) => {
      return item.uname?.toLowerCase().includes(value?.toLowerCase());
    });
    this.setState({ data: update });
  };
  componentDidUpdate() {
    localStorage.setItem("data", JSON.stringify([...this.state.data]));
  }

  
  //  rendereditabletable=()=>{
  //   <tbody>
  //   {this.state.data.map((item, index) => (
  //     <tr key={"item" + index}>
  //       <td>
  //         <img className="image" src={item.imagePreviewUrl} />
  //       </td>
  //       <td><input type="text" value={item.uname} onChange={(index, event)=>this.handleItemchange(index)}/></td>
  //       <td><input type="text" value={item.email}/></td>
  //       <td><input type="text" value={item.pswd}/></td>
  //       <td><input type="text" value={item.gender}/></td>
  //       <td><input type="text" value={item.selected}/></td>
  
  //       <td>
  //         <button
  //           className="delete"
  //           onClick={(index) => this.deleteRecord(index)}
  //         >
  //           delete
  //         </button>
  //       </td>
  //       {/* <td>
  //         <button
  //           className="edit"
  //           onClick={() => this.editRecord(index)}
  //         >
  //           Edit
  //         </button>
  //       </td> */}
  //     </tr>
  //   ))}
  // </tbody>
  // }
  
  
    //  updateallRecords=()=>{
    //   this.setState({isEdit1:true})
    //   this.rendereditabletable()
     
    //   }

  render() {
  
    return (
      <>
        <div className="App">
          <h1>Form</h1>
          <div className="form">
            <div className="row">
              <label htmlFor="img">Choose your profile image:</label>
            <input
              className="fileInput"
              type="file"
              onChange={(e) => this.handleImagechange(e)}
            />
            </div>

            <div className="row">
              <label htmlFor="uname" className="label">
                Username
              </label>
              <input
                type="text"
                id="uname"
                className="input"
                value={this.state.input.uname}
                onChange={(e) => this.handleOnchange(e)}
                name="uname"
              ></input>
            </div>
            {this.state.error.uname}

            <div className="row">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.input.email}
                onChange={(e) => this.handleOnchange(e)}
                className="input"
              ></input>
            </div>
            {this.state.error.email}

            <div className="row">
              <label htmlFor="pswd" className="label">
                Password
              </label>
              <input
                type="password"
                id="pawd"
                className="input"
                name="pswd"
                value={this.state.input.pswd}
                onChange={(e) => this.handleOnchange(e)}
              ></input>
            </div>
            {this.state.error.pswd}

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
                checked={this.state.input.gender === "Male"}
                onChange={(e) => this.handleOnchange(e)}
              ></input>
              Male
              <input
                type="radio"
                value={"Female"}
                className="input"
                name="gender"
                id="Female"
                checked={this.state.input.gender === "Female"}
                onChange={(e) => this.handleOnchange(e)}
              ></input>
              Female
            </div>
            {this.state.error.gender}
            <div className="row">
              <label htmlFor="city">City</label>
              <select
                value={this.state.input.selected}
                name="selected"
                onChange={(e) => this.handleOnchange(e)}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            {this.state.error.selected}

            <div className="row">
              <button className="submit" onClick={(e) => this.handleSubmit(e)}>
                Submit
              </button>
            </div>
          </div>

          <div className="row">
            <h1>Table data</h1>
          {/* <button onClick={this.rendereditabletable()}>edit allrecords</button> */}
          <input type="text" onKeyUp={(e) => this.handleSearch(e)}></input>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>password</th>
                  <th>gender</th>
                  <th>City</th>
                  <th>Action</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>

              <tbody>
    {this.state.data.map((item, index) => (
      <tr key={"item" + index}>
        <td>
          <img className="image" src={item.imagePreviewUrl} />
        </td>
        <td><input type="text" value={item.uname} onChange={(e)=>this. handleItemChanged(index)}/></td>
        <td><input type="text" value={item.email}/></td>
        <td><input type="text" value={item.pswd}/></td>
        <td><input type="text" value={item.gender}/></td>
        <td><input type="text" value={item.selected}/></td>
  
        <td>
          <button
            className="delete"
            onClick={(index) => this.deleteRecord(index)}
          >
            delete
          </button>
        </td>
        {/* <td>
          <button
            className="edit"
            onClick={() => this.editRecord(index)}
          >
            Edit
          </button>
        </td> */}
      </tr>
    ))}
  </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
