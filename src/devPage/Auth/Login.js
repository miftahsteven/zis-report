import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Input, Label, FormFeedback, Toast, ToastHeader,ToastBody, Spinner } from "reactstrap";
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import useMutateLogin from '../../hooks/useMutateLogin';
// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import logouniversal from "../../assets/images/zis-logo.png"
import CarouselPage from "./CarouselPage";
import { data } from "autoprefixer";

const Login2 = () => {
  const { mutate, isLoading } = useMutateLogin();
  const [passwordShow, setPasswordShow] = useState(false);
  const [toast, setToast] = useState(false);
  const [auth, setAuth] = useState(false);
  const [labelToast, setLabelToast]  = useState();
  const toggleToast = (q) => {    
    setToast(!toast);
  };  
  const navigate = useNavigate();
  //meta title
  document.title = "Login Dashboard ZISWAF INDOSAT";
  const queryClient = useQueryClient();
  // Form validation 
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username belum benar"),
      password: Yup.string().required("Password belum benar"),
    }),
    onSubmit: (values) => {      
      mutate(values , 
        { 
          onSuccess : (data) => {
              const message = data.message
              //console.log("TEST", message);              
              setLabelToast(message);
              toggleToast(message);
              setAuth(true)
              localStorage.setItem("authUser", JSON.stringify(data));
              setTimeout(() => navigate("/dashboard"), 2000)
          },
          onError :(error) => {
              const message = error.response.data.message
              //console.log("TOS", error.response.data.message);    
              setAuth(false);
              setLabelToast(message);                        
              toggleToast(message);
          }
        }
      );         
      
    }
    
  });
  return (
    <React.Fragment>
      <div>          
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/dashboard" className="d-block card-logo">
                        <img
                          src={logouniversal}
                          alt=""
                          height="40"
                          className="logo-dark-element"
                        />
                        <img
                          src={logouniversal}
                          alt=""
                          height="18"
                          className="logo-light-element"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Selamat Datang !</h5>
                        <p className="text-muted">
                          Silakan Login Masuk Dashboard ZISWAF
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            
                            return false;
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Username</Label>
                            <Input
                              name="username"
                              className="form-control"
                              placeholder="Masukan username"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.username || ""}
                              invalid={
                                validation.touched.username && validation.errors.username ? true : false
                              }
                            />
                            {validation.touched.username && validation.errors.username ? (
                              <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <div className="float-end">
                              <Link to="/auth-recoverpw-2" className="text-muted">Lupa Password?</Link>
                            </div>
                            <Label className="form-label">Password</Label>
                            <div className="input-group auth-pass-inputgroup">
                              <Input
                                name="password"
                                value={validation.values.password || ""}
                                type={passwordShow ? "text" : "password"}
                                placeholder="Masukan Password"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  validation.touched.password && validation.errors.password ? true : false
                                }
                              />
                              <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light " type="button" id="password-addon">
                                <i className="mdi mdi-eye-outline"></i></button>
                            </div>
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="auth-remember-check"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="auth-remember-check"
                            >
                              Ingat Saya
                            </label>
                          </div>

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                            >
                              Masuk
                            </button>
                          </div>

                          <div className="position-fixed top-0 end-0 p-3" >
                              <Toast isOpen={toast}>
                                  <ToastHeader className="background-black" toggle={toggleToast}>
                                      <img src={logouniversal} alt="" className="me-2" height="18" />
                                      Dashboard ZISWAF
                                  </ToastHeader>
                                  <ToastBody style={{ color: auth? 'black':'red' }}>
                                      {labelToast} { auth? <Spinner className="ms-2" color="warning" />:""  }
                                  </ToastBody>
                              </Toast>
                          </div>

                        </Form>

                        {/* <Form action="dashboard">
                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">
                              Sign in with
                            </h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary me-1"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-info text-white border-info me-1"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form> */}
                        {/* <div className="mt-5 text-center">
                          <p>
                            Don&apos;t have an account ?  <Link
                              to="pages-register-2"
                              className="fw-medium text-primary"
                            >
                              Signup now
                            </Link>
                          </p>
                        </div> */}
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Dashboard ZISWAF. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        SOLUSI DIGITAL EKOSISTEM
                      </p>
                    </div>                    
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>       
      </div>      
    </React.Fragment>
  );
};

export default Login2;
