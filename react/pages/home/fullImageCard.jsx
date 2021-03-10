import * as React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdbreact";

const CardExample = () => {
  return (
    <MDBCol md="4">
      <MDBCard
        className="card-image"
        style={{
          backgroundImage:
            "url('https://mdbootstrap.com/img/Photos/Horizontal/City/6-col/img%20(47).jpg')"
        }}
      >
        <div className="text-white text-center d-flex align-items-center rgba-indigo-strong py-5 px-4">
          <div>
            <h5 className="orange-text">
              <MDBIcon icon="desktop" /> Software
            </h5>
            <MDBCardTitle tag="h3" className="pt-2">
              <strong>This is card title</strong>
            </MDBCardTitle>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Repellat fugiat, laboriosam, voluptatem, optio
              vero odio nam sit officia accusamus minus error nisi
              architecto nulla ipsum dignissimos. Odit sed qui,
              dolorum!
            </p>
            <MDBBtn color="deep-orange">
              <MDBIcon icon="clone left" /> View project
            </MDBBtn>
          </div>
        </div>
      </MDBCard>
    </MDBCol>
  );
};

export default CardExample;
