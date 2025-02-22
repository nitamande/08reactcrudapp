import { Button, Container, Form, Modal, Table } from 'react-bootstrap'
import React, { useState } from 'react'

function Registration() {

  
  const [show, setShow] = useState(true)

  const [allData, setAllData] = useState([{}])

  const [buttonState, setButtonState]=useState(true);

  

  const [index, setIndex]=useState(0);
  const [input, setInput] = useState({
    Fullname: "",
    Email: "",
    password: "",
    Mobilenumber: ""
  })



 

  function getInputData(e) {
    let target = e.target;
    let value = target.value;
    let key = target.name;
    //console.log(key, "",value);
    return (
      setInput((old) => {
        return {
          ...old,
          [key]: value
        }

      })

    )
  }

  let temp = {}

  const getFormData = (e) => {
    e.preventDefault();
    let form = e.target;
    //console.log(form);
    let formData = new FormData(form);

    //console.log(formData);

    //console.log(formData.get("Fullname"));
    //console.log(formData.get("email"));
    //console.log(formData.get("password"));

    //console.log(formData.get("Mobilenumber"));
    //console.log(formData.get("Profile"));

    


    for (let data of formData.entries()) {
      // console.log(data);
      let key = data[0];
      let value = data[1];
      //console.log(value);
      //console.log(typeof(value));

      if (typeof (value) == 'object') {
        value = URL.createObjectURL(value);
      }

      // console.log(value);
      temp[key] = value;
      //console.log(temp);
    }

  }
  function insertData(e){
    e.preventDefault();
    //alert("Insert Data")
    getFormData(e);

    return (

      setAllData((old) => {
        return [
          ...old,
          temp

        ]


      }),

      setShow(false),
      setInput({
        Fullname: "",
        Email: "",
        password: "",
        Mobilenumber: ""

      })
    )

  }

  


  function  updateData(e){
    e.preventDefault();
    //alert(index)
    alert("Update Data")
      getFormData(e);
        //console.log(temp);
  const tempData =[...allData];
  console.log(tempData)
  tempData[index]=temp; 
  //console.log(tempData)

   return(
    setShow(false),
    setAllData(tempData)
   )

    }



  function editData(item) {
    //alert(item.index)

    return (
      setShow(true),
      setInput(item),
      setButtonState(false),
      setIndex(item.index)
    )
    //console.log(item);

  }
  function deleteUser(index) {
    // console.log(index);
    //[...allData].slice(index);
    let tempdata = [...allData];
    //console.log(tempdata);
    tempdata.splice(index, 1);

    // window.alert("are u want to delete data");     
    //console.log(tempdata);
    return (
      setAllData(tempdata)
    )
  }


  function addButton(){
    return(
      setShow(true),
      setInput({
        Fullname: "",
        Email: "",
        password: "",
        Mobilenumber: ""

      }),
      setButtonState(true)
   

    )
  }

  function Tr({ item }) {
    // console.log(item.index)
    return (
      <>
        <tr className='textcenter'>
          <td>{item.index + 1}</td>
          <td><img src={item.Profile} alt="" width={50} height={50} className='rounded-circle' /></td>
          <td>{item.Fullname}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td>{item.Mobilenumber}</td>
          <td>
            <Button className='me-2' onClick={()=> editData(item)}>
              <i className='fa fa-edit'> </i> </Button>


            <Button variant="danger" onClick={() => { deleteUser(item.index) }}>  <i className="fa fa-trash"> </i> </Button>

          </td>
        </tr>
      </>
    )
  }
  return (
    <>
      <h1 className='text-center'>Registration Detail
      </h1>
      <Button className='bottom-0 mb-3 position-absolute end-0 me-3 rounded-circle'
       onClick={addButton}>
        <i className='fa fa-plus'></i>
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={buttonState ? insertData : updateData}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type='text'
                name='Fullname'
                placeholder='Full Name'
                onChange={getInputData}
                value={input.Fullname}
              />
            </Form.Group>


            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' placeholder='Email Id'
                onChange={getInputData}
                value={input.email} />
            </Form.Group>


            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' placeholder='Password'
                onChange={getInputData}
                value={input.password}
              />
            </Form.Group>



            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type='tel' name='Mobilenumber' placeholder='Mobile Number'
                onChange={getInputData} value={input.Mobilenumber} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type='file' name='Profile' placeholder='Insert Your Image' />
            </Form.Group>
            <br />
            
            <Form.Group className='mt-3'>

            {
              buttonState ? <Button type='submit' variant='primary' className='me-2'>Submit</Button>:
                <Button type='edit' variant='info' className='me-2'>Update</Button>

            

            }

          <Button type='reset' variant='danger' onClick={()=>setShow(false)}>Cancel</Button>
            </Form.Group>




          </Form>


          {/*<p>{JSON.stringify(input)}</p>*/}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setShow(false)}>
            Close<i className="fa fa-close"></i>
          </Button>
        </Modal.Footer>

      </Modal>
      {/*<p>{JSON.stringify(allData)}</p>*/}

      <Container>
        <Table striped="columns">
          <thead>
            <tr>

              <th>sr.No</th>
              <th>Profile</th>
              <th>Fullname</th>

              <th>Email</th>
              <th>password</th>
              <th>Mobilenumber</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
              allData.map((item, index) => {
                item['index'] = index;
                //console.log(index);
                return <Tr item={item} key={index} />

              })


            }
          </tbody>
        </Table>

      </Container>


    </>
  )
}

export default Registration
