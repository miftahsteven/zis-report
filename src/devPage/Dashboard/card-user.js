import React, { useState } from "react"
import { Row, Col, Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

//Import Images
import avatar1 from "../../assets/images/man-user.webp"


const CardUser = () => {
  const [settingsMenu, setSettingsMenu] = useState(false)

  const dataUser = JSON.parse(localStorage.getItem("authUser"));

  //console.log("---<", JSON.stringify(dataUser?.data?.user_nama));
  

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <img src={avatar1} alt="" className="avatar-md rounded-circle img-thumbnail" />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <p className="mb-2">Assalamu'alaikum, Selamat Datang</p>
                        <h5 className="mb-1">{dataUser?.data?.user_nama}</h5>
                        <p className="mb-0">{dataUser?.data?.type.user_type_name}</p>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg="4" className="align-self-center">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <Row>
                      {/* <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Total Projects
                          </p>
                          <h5 className="mb-0">48</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Projects
                          </p>
                          <h5 className="mb-0">40</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Clients
                          </p>
                          <h5 className="mb-0">18</h5>
                        </div>
                      </Col> */}
                    </Row>
                  </div>
                </Col>

                <Col lg="4" className="d-none d-lg-block">
                  <div className="clearfix mt-4 mt-lg-0">
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={() => {
                        setSettingsMenu(!settingsMenu)
                      }}
                      className="float-end"
                    >
                      <DropdownToggle tag="button" className="btn btn-warning">
                        <i className="bx bxs-cog align-middle me-1" /> Setting
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">Task List</DropdownItem>                        
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CardUser
