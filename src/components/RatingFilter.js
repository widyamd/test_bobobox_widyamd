import React from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ratingStyle = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const RatingFilter = ({ ratingsCount, selectedRating, setSelectedRating }) => {
  return (
    <div className="mb-3">
      <h5 className="mb-3">Filter by Rating</h5>
      <div className="d-flex flex-column">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            variant="link"
            className={`d-flex align-items-center justify-content-start btn-rating mb-1 ${
              selectedRating === rating ? "text-primary" : ""
            }`}
            onClick={() =>
              setSelectedRating(selectedRating === rating ? null : rating)
            }
          >
            <Row>
              <Col>
                <Rating
                  value={rating}
                  itemStyles={ratingStyle}
                  style={{ maxWidth: 120 }}
                  readOnly
                />
              </Col>
              <Col className="text-end text-light">
                <p className="ms-2">
                  {ratingsCount[rating] ? (
                    <p>({ratingsCount[rating]})</p>
                  ) : (
                    <p className="text-end text-light">(0)</p>
                  )}
                </p>
              </Col>
            </Row>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
