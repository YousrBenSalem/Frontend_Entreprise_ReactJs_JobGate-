import React from 'react'

const AddTest = () => {
  return (
<div className="wrapper">
  <div className="content-page">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">New User Information</h4>
              </div>
            </div>
            <div className="card-body">
              <div className="new-user-info">
                <form>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="fname">First Name:</label>
                      <input type="text" className="form-control" id="fname" placeholder="First Name" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lname">Last Name:</label>
                      <input type="text" className="form-control" id="lname" placeholder="Last Name" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="add1">Street Address 1:</label>
                      <input type="text" className="form-control" id="add1" placeholder="Street Address 1" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="add2">Street Address 2:</label>
                      <input type="text" className="form-control" id="add2" placeholder="Street Address 2" />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="cname">Company Name:</label>
                      <input type="text" className="form-control" id="cname" placeholder="Company Name" />
                    </div>
                    <div className="form-group col-sm-12">
                      <label>Country:</label>
                      <select name="type" className="selectpicker form-control" data-style="py-0">
                        <option>Select Country</option>
                        <option>Caneda</option>
                        <option>Noida</option>
                        <option>USA</option>
                        <option>India</option>
                        <option>Africa</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="mobno">Mobile Number:</label>
                      <input type="text" className="form-control" id="mobno" placeholder="Mobile Number" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="altconno">Alternate Contact:</label>
                      <input type="text" className="form-control" id="altconno" placeholder="Alternate Contact" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Email:</label>
                      <input type="email" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="pno">Pin Code:</label>
                      <input type="text" className="form-control" id="pno" placeholder="Pin Code" />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="city">Town/City:</label>
                      <input type="text" className="form-control" id="city" placeholder="Town/City" />
                    </div>
                  </div>
                  <hr />
                  <h5 className="mb-3">Security</h5>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label htmlFor="uname">User Name:</label>
                      <input type="text" className="form-control" id="uname" placeholder="User Name" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="pass">Password:</label>
                      <input type="password" className="form-control" id="pass" placeholder="Password" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="rpass">Repeat Password:</label>
                      <input type="password" className="form-control" id="rpass" placeholder="Repeat Password " />
                    </div>
                  </div>
                  <div className="checkbox">
                    <label><input className="mr-2" type="checkbox" />Enable Two-Factor-Authentication</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Add New User</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default AddTest
