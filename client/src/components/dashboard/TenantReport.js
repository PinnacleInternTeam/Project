import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTenantReportYearMonth,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
} from "../../actions/tenants";
import { Modal } from "react-bootstrap";
import RenewTenentAgreement from "./RenewTenentAgreement";

const TenantReport = ({
  auth: { expReport, isAuthenticated, user, users, finalDataRep },
  getTenantReportYearMonth,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const [userData, setUserData] = useState(null);
  const onRenewal = (tenants) => {
    setShowEditModal(true);
    setUserData(tenants);
  };
  const onReportModalChange = (e) => {
    if (e) {
      handleEditModalClose();
      const finalDataReport = {
        monthSearch: finalDataRep.monthSearch,
        yearSearch: finalDataRep.yearSearch,
      };
      const finalData = {
        selectedY: finalDataRep.yearSearch,
      };

      var dt = new Date(
        finalDataRep.yearSearch + "-" + finalDataRep.monthSearch
      );
      const finalData1 = {
        selectedVal: dt,
      };
      getTenantReportYearMonth(finalDataReport);
      getMonthExpCountFilter(finalData);
      getPreviousYearsExpCount(finalData1);
    }
  };
  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-10 col-md-11 col-sm-11 col-11 ">
              <h2 className="heading_color">Tenant Reports </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11 col-md-11 col-sm-11 col-11 text-center ">
              <section className="body">
                <div className="body-inner no-padding  table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Door No</th>
                        <th>File No</th>
                        <th>Expiry Date</th>
                        <th>Rent</th>
                        <th>Rewised Rent</th>
                        <th>Stamp Duty</th>
                        <th>Agreement Status</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expReport &&
                        expReport[0] &&
                        expReport.map((expReportVal, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{expReportVal.tenantName}</td>
                              <td>{expReportVal.tenantDoorNo}</td>
                              <td>{expReportVal.tenantFileNo}</td>
                              <td>{expReportVal.tenantLeaseEndDate}</td>
                              <td>{expReportVal.tenantRentAmount}</td>
                              <td>{expReportVal.chargesCal.toFixed(2)}</td>
                              <td>{expReportVal.stampDuty.toFixed(2)}</td>
                              <td>{expReportVal.AgreementStatus}</td>
                              {expReportVal.AgreementStatus === "Expired" ? (
                                <td>
                                  <center>
                                    <button
                                      variant="success"
                                      className="btn sub_form"
                                      onClick={() =>
                                        onRenewal(expReportVal, idx)
                                      }
                                    >
                                      Renewal
                                    </button>
                                  </center>
                                </td>
                              ) : (
                                <td></td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h4
                className="modal-title text-center"
                style={{ fontWeight: "bold" }}
              >
                Renewal Tenant Agreement
              </h4>
            </div>
            <div className="col-lg-2">
              <button onClick={handleEditModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <RenewTenentAgreement
              tenantsData={userData}
              onReportModalChange={onReportModalChange}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

TenantReport.propTypes = {
  auth: PropTypes.object.isRequired,
  getTenantReportYearMonth: PropTypes.func.isRequired,
  getMonthExpCountFilter: PropTypes.func.isRequired,
  getPreviousYearsExpCount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getTenantReportYearMonth,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
})(TenantReport);
