import React from "react";
import Bootstrap, {Card, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function InformationPopup() {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Title>
                    This is the Title
                </Card.Title>
                <Card.Text>
                    This is the Body.
                </Card.Text>
                <Button>Button</Button>
            </Card.Body>
        </Card>
    )
}

export default InformationPopup