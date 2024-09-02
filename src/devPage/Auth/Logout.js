import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { logoutUser } from "../../store/actions";
import {  useQueryClient } from '@tanstack/react-query';

//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser(history));
    const queryClient = useQueryClient();
    localStorage.clear();
  }, [dispatch, history]);

  return <></>;
};

Logout.propTypes = {
  history: "/auth/login" //PropTypes.object,
};

export default withRouter(Logout);